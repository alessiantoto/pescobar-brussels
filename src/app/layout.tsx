import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { SITE_CONFIG } from '@/config/site';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#070D17',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default:
      'Pescobar Seafood Bruxelles | Seafood Boil, Poulpe Grillé & Fruits de Mer',
    template: '%s',
  },
  description:
    'Fruits de mer frais, Seafood Boil, poulpe grillé et plateaux à partager à Bruxelles (Rue Jourdan 18, 1060 Saint-Gilles / Avenue Louise).',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/images/pescobar-logo-vector.svg', type: 'image/svg+xml' },
      { url: '/images/pescobar-logo-transparent.png', type: 'image/png' },
    ],
    apple: '/images/pescobar-logo-transparent.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Pescobar Bruxelles',
    statusBarStyle: 'black-translucent',
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-BE" className={`${jakarta.variable} dark`}>
      <body className="min-h-screen bg-[#070D17] font-sans text-white antialiased selection:bg-[#C8A96A] selection:text-[#070D17]">
        {children}
      </body>
    </html>
  );
}
