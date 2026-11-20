import type { MetadataRoute } from 'next';
import { SITE_CONFIG, LOCALES } from '@/config/site';

const INDEXABLE_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/menu', priority: 0.95, changeFrequency: 'daily' as const },
  { path: '/business-lunch', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/delivery', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/private-events', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/reservations', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/mentions-legales', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/cookies', priority: 0.3, changeFrequency: 'yearly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of INDEXABLE_ROUTES) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_CONFIG.domain}/${locale}${route.path}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            'fr-BE': `${SITE_CONFIG.domain}/fr${route.path}`,
            'nl-BE': `${SITE_CONFIG.domain}/nl${route.path}`,
            en: `${SITE_CONFIG.domain}/en${route.path}`,
            ro: `${SITE_CONFIG.domain}/ro${route.path}`,
          },
        },
      });
    }
  }

  return entries;
}

