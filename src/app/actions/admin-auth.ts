'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';
import { checkRateLimit, getClientIpFromHeaders, rateLimiters } from '@/lib/ratelimit';
import type { AdminRole, AdminSession } from '@/lib/admin/types';

const DEFAULT_ADMIN_EMAILS = [
  'pescobarbrussels@gmail.com',
  'pescobarseafoodbrussels@gmail.com',
] as const;

function isDefaultAdminEmail(email: string): boolean {
  const clean = email.toLowerCase().trim();
  if ((DEFAULT_ADMIN_EMAILS as readonly string[]).includes(clean)) return true;
  const envAdmins = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return envAdmins.includes(clean);
}

function normalizeRole(raw: unknown): AdminRole {
  if (raw === 'super_admin' || raw === 'staff') return raw;
  return 'admin';
}

/**
 * Resolves the authenticated & whitelisted admin session from cookies + `admin_users`.
 * Returns null if unauthenticated, inactive, missing from whitelist, or DB not configured.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.ALLOW_DEV_ADMIN_BYPASS === 'true'
  ) {
    return {
      email: 'pescobarbrussels@gmail.com',
      role: 'super_admin',
      fullName: 'Pescobar Brussels Owner',
    };
  }

  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) return null;

    const cleanEmail = user.email.toLowerCase().trim();
    const isDefaultAdmin = isDefaultAdminEmail(cleanEmail);

    const { data: adminRow } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, full_name, role, is_active')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (!adminRow) {
      if (isDefaultAdmin) {
        try {
          await supabaseAdmin.from('admin_users').insert({
            email: cleanEmail,
            full_name:
              cleanEmail === 'pescobarbrussels@gmail.com'
                ? 'Pescobar Brussels Owner'
                : 'Pescobar Seafood Brussels',
            role: 'super_admin',
            is_active: true,
          });
        } catch {
          // ignore duplicate race
        }

        return {
          email: cleanEmail,
          role: 'super_admin',
          fullName:
            cleanEmail === 'pescobarbrussels@gmail.com'
              ? 'Pescobar Brussels Owner'
              : 'Pescobar Seafood Brussels',
        };
      }
      return null;
    }

    if (adminRow.is_active === false) {
      return null;
    }

    return {
      email: cleanEmail,
      role: normalizeRole(adminRow.role),
      fullName: adminRow.full_name ?? null,
    };
  } catch (error: unknown) {
    const e = error as { digest?: string; message?: string };
    if (
      e?.digest === 'DYNAMIC_SERVER_USAGE' ||
      e?.message?.includes('Dynamic server usage')
    ) {
      throw error;
    }
    console.error('Admin auth verification error:', error);
    return null;
  }
}

/**
 * Boolean convenience check matching TrenZone's `isAdminAuthorized()`.
 */
export async function isAdminAuthorized(): Promise<boolean> {
  const session = await getAdminSession();
  return Boolean(session);
}

/**
 * Rate-limited pre-login whitelist check called by `/admin/login`.
 */
export async function verifyAdminEmail(email: string): Promise<{
  allowed: boolean;
  rateLimited?: boolean;
  notConfigured?: boolean;
}> {
  if (!isSupabaseConfigured()) {
    return { allowed: false, notConfigured: true };
  }

  let ip = '127.0.0.1';
  try {
    const hdrs = await headers();
    ip = getClientIpFromHeaders(hdrs);
  } catch {
    // Ignore when headers unavailable
  }

  const rl = await checkRateLimit(
    rateLimiters.adminLogin,
    `admin-login:${ip}`,
    'adminLogin'
  );
  if (!rl.allowed) {
    return { allowed: false, rateLimited: true };
  }

  const cleanEmail = String(email || '').toLowerCase().trim().slice(0, 150);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return { allowed: false };
  }

  if (isDefaultAdminEmail(cleanEmail)) {
    return { allowed: true };
  }

  const { data: adminRow } = await supabaseAdmin
    .from('admin_users')
    .select('id, is_active')
    .eq('email', cleanEmail)
    .maybeSingle();

  return { allowed: Boolean(adminRow && adminRow.is_active !== false) };
}

export async function recordAdminLoginTimestamp(email: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    await supabaseAdmin
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('email', email.toLowerCase().trim());
  } catch {
    // non-fatal
  }
}

export async function logoutAdmin() {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  redirect('/admin/login');
}

