import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, type Locale } from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';
import { buildRestaurantJsonLd, buildWebSiteJsonLd } from '@/lib/schema';
import { HTML_LANG_MAP } from '@/lib/seo';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) return {};
  return {
    other: {
      'content-language': HTML_LANG_MAP[locale as Locale],
    },
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);
  const restaurantJsonLd = buildRestaurantJsonLd(validLocale);
  const websiteJsonLd = buildWebSiteJsonLd(validLocale);

  return (
    <div className="flex min-h-screen flex-col bg-obsidian text-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Navbar locale={validLocale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer locale={validLocale} dict={dict} />
    </div>
  );
}

