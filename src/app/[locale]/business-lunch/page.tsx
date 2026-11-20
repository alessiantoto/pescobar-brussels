import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import {
  SITE_CONFIG,
  type Locale,
} from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';
import { getItemsByCategory } from '@/data/menu';
import {
  buildBreadcrumbJsonLd,
  buildServiceOfferJsonLd,
} from '@/lib/schema';
import { buildPageMetadata } from '@/lib/seo';
import { OctopusCornerTentacles } from '@/components/OctopusAccents';
import { MenuDishSectionGrid } from '@/components/MenuDishCardModal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: '/business-lunch',
    title: dict.seo.businessLunch.title,
    description: dict.seo.businessLunch.description,
    pageKey: 'businessLunch',
  });
}

const LUNCH_IMAGES = [
  '/images/catalog/taverna-racilor-57.jpg',
  '/images/catalog/creveti-la-gratar-taverna-racilor.jpg',
  '/images/catalog/taverna-racilor-29.jpg',
  '/images/catalog/taverna-racilor-107.jpg',
];

const LUNCH_COPY: Record<
  Locale,
  {
    kicker: string;
    title: string;
    subtitle: string;
    pillPrice: string;
    pillHours: string;
    heroReserveCta: string;
    heroPrivateCta: string;
    sectionKicker: string;
    sectionTitle: string;
    closingKicker: string;
    closingTitle: string;
    closingSubtitle: string;
    reserveLunchCta: string;
    corporateLunchCta: string;
  }
> = {
  fr: {
    kicker: 'DÉJEUNER • 12:00 – 15:00',
    title: 'Business Lunch',
    subtitle: 'Soupe aux fruits de mer (400g) et plat au choix.',
    pillPrice: 'Soupe + Plat au choix',
    pillHours: 'Lun – Ven • 12:00 – 15:00',
    heroReserveCta: 'Réserver',
    heroPrivateCta: 'Groupes & Entreprises',
    sectionKicker: '4 FORMULES AU CHOIX',
    sectionTitle: 'Choisissez votre menu du midi',
    closingKicker: 'RUE JOURDAN 18 • SAINT-GILLES',
    closingTitle: 'Réservez votre table pour le déjeuner',
    closingSubtitle:
      'Servi tous les midis de 12:00 à 15:00 — idéal pour un déjeuner rapide ou un repas d’affaires.',
    reserveLunchCta: 'Réserver une table',
    corporateLunchCta: 'Événements privés',
  },
  nl: {
    kicker: 'LUNCH • 12:00 – 15:00',
    title: 'Business Lunch',
    subtitle: 'Zeevruchtensoep (400g) en hoofdgerecht naar keuze.',
    pillPrice: 'Soep + Hoofdgerecht',
    pillHours: 'Ma – Vr • 12:00 – 15:00',
    heroReserveCta: 'Reserveren',
    heroPrivateCta: 'Groepen & Bedrijven',
    sectionKicker: '4 FORMULES NAAR KEUZE',
    sectionTitle: 'Kies uw lunchmenu',
    closingKicker: 'RUE JOURDAN 18 • SINT-GILLIS',
    closingTitle: 'Reserveer uw lunchtafel',
    closingSubtitle:
      'Elke middag geserveerd van 12:00 tot 15:00 — vlot en verzorgd voor uw lunch of zakenafspraak.',
    reserveLunchCta: 'Tafel reserveren',
    corporateLunchCta: 'Privé-evenementen',
  },
  en: {
    kicker: 'LUNCH SERVICE • 12:00 – 15:00',
    title: 'Business Lunch',
    subtitle: 'Seafood soup (400g) followed by a main course of your choice.',
    pillPrice: 'Soup + Main Course',
    pillHours: 'Mon – Fri • 12:00 – 15:00',
    heroReserveCta: 'Book Lunch',
    heroPrivateCta: 'Corporate & Groups',
    sectionKicker: '4 LUNCH OPTIONS',
    sectionTitle: 'Choose your Business Lunch',
    closingKicker: 'RUE JOURDAN 18 • SAINT-GILLES',
    closingTitle: 'Book your lunch table',
    closingSubtitle:
      'Served daily from 12:00 to 15:00 — quick service right off Avenue Louise.',
    reserveLunchCta: 'Book a Table',
    corporateLunchCta: 'Private Events',
  },
  ro: {
    kicker: 'PRÂNZ • 12:00 – 15:00',
    title: 'Business Lunch',
    subtitle: 'Supă cu fructe de mare (400g) și fel principal la alegere.',
    pillPrice: 'Supă + Fel principal',
    pillHours: 'Lun – Vin • 12:00 – 15:00',
    heroReserveCta: 'Rezervă masă',
    heroPrivateCta: 'Corporate & Grupuri',
    sectionKicker: '4 VARIANTE LA ALEGERE',
    sectionTitle: 'Alege meniul de prânz',
    closingKicker: 'RUE JOURDAN 18 • SAINT-GILLES',
    closingTitle: 'Rezervă masa pentru prânz',
    closingSubtitle:
      'Servit zilnic între 12:00 și 15:00 — rapid și complet pentru prânzul tău sau o întâlnire de afaceri.',
    reserveLunchCta: 'Rezervă o masă',
    corporateLunchCta: 'Evenimente private',
  },
};

export default async function BusinessLunchPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const copy = LUNCH_COPY[locale] ?? LUNCH_COPY.fr;
  const lunchItems = getItemsByCategory('business-lunch');
  const lunchImageOverrides = Object.fromEntries(
    lunchItems.map((item, idx) => [item.id, LUNCH_IMAGES[idx] ?? LUNCH_IMAGES[0]])
  );

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: SITE_CONFIG.name, path: '' },
    { name: dict.nav.businessLunch, path: '/business-lunch' },
  ]);
  const serviceJsonLd = buildServiceOfferJsonLd(locale, {
    path: '/business-lunch',
    name: dict.seo.businessLunch.title,
    description: dict.seo.businessLunch.description,
    priceEur: '19.00',
    serviceType: 'Business Lunch Menu',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Compact Header aligned with Reservations / Contact / Menu UX */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#070D17] py-5 sm:py-7">
        <OctopusCornerTentacles position="top-right" className="opacity-40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <nav aria-label="Breadcrumb" className="mb-1.5 text-[11px] text-[#B8C7DC]">
                <ol className="flex items-center gap-1.5">
                  <li>
                    <Link href={`/${locale}`} className="transition-colors hover:text-white">
                      Pescobar
                    </Link>
                  </li>
                  <li className="text-white/30">/</li>
                  <li className="font-semibold text-[#C8A96A]">
                    {dict.nav.businessLunch}
                  </li>
                </ol>
              </nav>

              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                {copy.title}
              </h1>

              <p className="mt-1.5 text-sm leading-relaxed text-[#B8C7DC]">
                {copy.subtitle}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-lg border border-[#C8A96A]/40 bg-[#C8A96A]/15 px-3 py-1 font-bold text-[#DFC286]">
                  {copy.pillPrice}
                </span>
                <span className="rounded-lg border border-white/15 bg-[#0C1524] px-3 py-1 font-semibold tabular-nums text-white/85">
                  {copy.pillHours}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:shrink-0 sm:items-center">
              <Link
                href={`/${locale}/reservations`}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#C8A96A] px-4 text-xs font-bold tracking-wider uppercase text-[#070D17] transition-colors hover:bg-[#DFC286] sm:px-6"
              >
                <span className="truncate">{copy.heroReserveCta}</span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
              </Link>
              <Link
                href={`/${locale}/private-events`}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-[#0C1524] px-4 text-xs font-bold tracking-wider uppercase text-[#DFC286] transition-colors hover:border-[#C8A96A] sm:px-5"
              >
                <span className="truncate">{copy.heroPrivateCta}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Business Lunch Cards (Immediately visible above/near fold, identical design to Menu) */}
      <section className="border-b border-white/10 bg-[#070D17] py-7 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A96A]">
                {copy.sectionKicker}
              </span>
              <h2 className="mt-1 text-xl font-extrabold tracking-tight text-white sm:text-3xl">
                {copy.sectionTitle}
              </h2>
            </div>
            <Link
              href={`/${locale}/menu`}
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-[#C8A96A] transition-colors hover:text-white"
            >
              <span>{dict.signatures.exploreAllCta}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <MenuDishSectionGrid
            items={lunchItems}
            locale={locale}
            categoryName={dict.nav.businessLunch}
            imageOverrides={lunchImageOverrides}
          />
        </div>
      </section>

      {/* Compact Closing Card */}
      <section className="bg-[#070D17] py-8 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-2xl border border-white/10 bg-[#0C1524] p-6 sm:p-8">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A96A]">
                {copy.closingKicker}
              </span>
              <h2 className="mt-1.5 text-xl font-extrabold tracking-tight text-white sm:text-3xl">
                {copy.closingTitle}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#B8C7DC]">
                {copy.closingSubtitle}
              </p>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:flex sm:flex-wrap sm:items-center">
              <Link
                href={`/${locale}/reservations`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-6 text-xs font-bold tracking-wider uppercase text-[#070D17] transition-colors hover:bg-[#DFC286]"
              >
                <span>{copy.reserveLunchCta}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={`/${locale}/private-events`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#C8A96A]/40 bg-[#070D17] px-5 text-xs font-bold tracking-wider uppercase text-[#DFC286] transition-colors hover:border-[#C8A96A]"
              >
                <span>{copy.corporateLunchCta}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#070D17] px-5 text-xs font-bold tabular-nums text-white transition-colors hover:border-[#C8A96A]"
              >
                <Phone className="h-4 w-4 text-[#C8A96A]" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
