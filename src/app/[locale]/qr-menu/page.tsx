import React from 'react';
import type { Metadata } from 'next';
import { getAlternates, type Locale } from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';
import {
  getLocalizedMenuData,
  getMenuExplorerLabels,
} from '@/lib/menuLocale';
import { MenuExplorer } from '@/components/MenuExplorer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.seo.qrMenu.title,
    description: dict.seo.qrMenu.description,
    alternates: getAlternates(locale, '/menu'),
    robots: {
      index: false,
      follow: true,
      nocache: true,
    },
  };
}

export default async function QrMenuPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { categories, items } = await getLocalizedMenuData(locale, 'qr');
  const labels = getMenuExplorerLabels(dict);

  return (
    <div className="min-h-screen bg-[#070D17] text-white">
      {/* Ultra-compact Table Strip — Instant category & dish access */}
      <h1 className="border-b border-white/10 bg-[#0C1524] px-4 py-2 text-center text-[11px] font-bold tracking-[0.18em] uppercase text-[#E5C158]">
        {dict.seo.qrMenu.title} • RUE JOURDAN 18
      </h1>
      <MenuExplorer
        locale={locale}
        categories={categories}
        items={items}
        labels={labels}
        qrMode={true}
      />
    </div>
  );
}
