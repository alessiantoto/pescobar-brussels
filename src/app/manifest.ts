import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: 'Pescobar',
    description:
      'Restaurant de fruits de mer à Bruxelles (Rue Jourdan 18, 1060 Saint-Gilles / Avenue Louise) : Seafood Boil, poulpe grillé & Business Lunch.',
    start_url: '/fr',
    display: 'standalone',
    background_color: '#070D17',
    theme_color: '#070D17',
    lang: 'fr-BE',
    categories: ['food', 'restaurant'],
    icons: [
      {
        src: '/images/pescobar-logo-transparent.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/images/pescobar-logo-vector.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}

