import React from 'react';
import type { Metadata } from 'next';
import {
  SITE_CONFIG,
  type Locale,
} from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';
import {
  buildMenuJsonLd,
  buildBreadcrumbJsonLd,
} from '@/lib/schema';
import { buildPageMetadata } from '@/lib/seo';
import {
  getLocalizedMenuData,
  getMenuExplorerLabels,
} from '@/lib/menuLocale';
import { MenuExplorer } from '@/components/MenuExplorer';
import { OctopusCornerTentacles } from '@/components/OctopusAccents';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: '/menu',
    title: dict.seo.menu.title,
    description: dict.seo.menu.description,
    pageKey: 'menu',
  });
}

const MENU_META_LINE: Record<Locale, string> = {
  fr: 'Carte complète • 185 spécialités • Grammages & allergènes UE',
  nl: 'Volledige menukaart • 185 specialiteiten • Gewichten & EU-allergenen',
  en: 'Full menu • 185 specialties • Net weights & EU allergens',
  ro: 'Meniu complet • 185 de specialități • Gramaje & alergeni UE',
};

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { categories, items } = await getLocalizedMenuData(locale, 'site');
  const labels = getMenuExplorerLabels(dict);
  const menuJsonLd = buildMenuJsonLd(locale);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: SITE_CONFIG.name, path: '' },
    { name: dict.nav.menu, path: '/menu' },
  ]);

  return (
    <div className="min-h-screen bg-[#070D17] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Ultra-Compact Top Page Header — Mobile-First Instant Dish Visibility */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#070D17] py-4">
        <OctopusCornerTentacles position="top-right" className="opacity-55" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-1 px-4 sm:flex-row sm:items-end sm:gap-2 sm:px-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C8A96A]">
              {dict.menuPage.kicker}
            </p>
            <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
              {dict.menuPage.title}
            </h1>
          </div>
          <p className="text-xs font-medium text-[#B8C7DC]/80">
            {MENU_META_LINE[locale] ?? MENU_META_LINE.fr}
          </p>
        </div>
      </section>

      <MenuExplorer
        locale={locale}
        categories={categories}
        items={items}
        labels={labels}
      />
    </div>
  );
}
