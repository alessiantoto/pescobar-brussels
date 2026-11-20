import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site';

const PUBLIC_DISALLOW = [
  '/api/',
  '/fr/qr-menu',
  '/nl/qr-menu',
  '/en/qr-menu',
  '/ro/qr-menu',
  '/*/qr-menu',
];

const AI_AND_SEARCH_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'bingbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PUBLIC_DISALLOW,
      },
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: PUBLIC_DISALLOW,
      })),
    ],
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
    host: SITE_CONFIG.domain,
  };
}
