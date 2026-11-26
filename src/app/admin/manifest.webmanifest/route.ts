import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      name: 'Pescobar Admin',
      short_name: 'Pescobar Admin',
      description: 'Panou Administrare Pescobar Seafood Brussels SRL',
      start_url: '/admin',
      scope: '/admin',
      display: 'standalone',
      background_color: '#070D17',
      theme_color: '#070D17',
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
    },
    {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      },
    }
  );
}
