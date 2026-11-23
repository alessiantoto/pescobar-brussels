import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis =
  REDIS_URL && REDIS_TOKEN
    ? new Redis({ url: REDIS_URL, token: REDIS_TOKEN })
    : null;

interface MemoryLimitRecord {
  timestamps: number[];
  resetAt: number;
}

const MAX_MEMORY_ENTRIES = 10000;
const memoryStore = new Map<string, MemoryLimitRecord>();

function pruneMemoryStore(now: number) {
  for (const [k, v] of memoryStore.entries()) {
    if (v.resetAt <= now) memoryStore.delete(k);
  }
  while (memoryStore.size >= MAX_MEMORY_ENTRIES) {
    const oldest = memoryStore.keys().next().value;
    if (!oldest) break;
    memoryStore.delete(oldest);
  }
}

function memoryLimit(
  key: string,
  limit: number,
  windowMs: number
): { success: boolean; limit: number; reset: number; remaining: number } {
  const now = Date.now();
  const windowStart = now - windowMs;
  const record = memoryStore.get(key);

  if (memoryStore.size >= MAX_MEMORY_ENTRIES) {
    pruneMemoryStore(now);
  }

  if (!record || record.resetAt <= now) {
    memoryStore.set(key, { timestamps: [now], resetAt: now + windowMs });
    return {
      success: true,
      limit,
      reset: now + windowMs,
      remaining: Math.max(0, limit - 1),
    };
  }

  const active = record.timestamps.filter((ts) => ts > windowStart);
  if (active.length >= limit) {
    const reset = (active[0] ?? now) + windowMs;
    record.timestamps = active;
    record.resetAt = reset;
    return { success: false, limit, reset, remaining: 0 };
  }

  active.push(now);
  record.timestamps = active;
  record.resetAt = (active[0] ?? now) + windowMs;
  return {
    success: true,
    limit,
    reset: record.resetAt,
    remaining: Math.max(0, limit - active.length),
  };
}

export const rateLimiters = {
  adminLogin: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '1 m'),
        prefix: 'rl:admin-login',
      })
    : null,
  reservation: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(6, '5 m'),
        prefix: 'rl:reservation',
      })
    : null,
  contact: redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(4, '5 m'),
        prefix: 'rl:contact',
      })
    : null,
};

const FALLBACK_CONFIGS = {
  adminLogin: { limit: 5, windowMs: 60 * 1000 },
  reservation: { limit: 6, windowMs: 5 * 60 * 1000 },
  contact: { limit: 4, windowMs: 5 * 60 * 1000 },
  admin: { limit: 60, windowMs: 60 * 1000 },
} as const;

export type RateLimitFallbackType = keyof typeof FALLBACK_CONFIGS | (string & {});

export function getClientIpFromHeaders(headersList: {
  get: (name: string) => string | null;
}): string {
  const cfIp = headersList.get('cf-connecting-ip')?.trim();
  if (cfIp) return cfIp.slice(0, 64);

  const realIp = headersList.get('x-real-ip')?.trim();
  if (realIp) return realIp.slice(0, 64);

  const xForwardedFor = headersList.get('x-forwarded-for');
  if (xForwardedFor) {
    const first = xForwardedFor.split(',')[0]?.trim();
    if (first) return first.slice(0, 64);
  }

  return '127.0.0.1';
}

export async function checkRateLimit(
  limiter: Ratelimit | null,
  identifier: string,
  fallbackType: RateLimitFallbackType = 'admin'
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const safeId =
    String(identifier || '127.0.0.1').trim().slice(0, 160) || '127.0.0.1';

  if (limiter) {
    try {
      const { success, reset } = await limiter.limit(safeId);
      if (!success) {
        return {
          allowed: false,
          retryAfter: Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
        };
      }
      return { allowed: true };
    } catch (err) {
      console.error('Redis rate limiter fallback:', err);
    }
  }

  const cfg =
    FALLBACK_CONFIGS[fallbackType as keyof typeof FALLBACK_CONFIGS] || {
      limit: 10,
      windowMs: 60 * 1000,
    };
  const { success, reset } = memoryLimit(
    `${String(fallbackType)}:${safeId}`,
    cfg.limit,
    cfg.windowMs
  );

  if (!success) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((reset - Date.now()) / 1000)),
    };
  }
  return { allowed: true };
}

