import React from 'react';
import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Compass,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from 'lucide-react';
import {
  SITE_CONFIG,
  type Locale,
} from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';
import { buildFaqJsonLd, buildVideoObjectsJsonLd } from '@/lib/schema';
import { buildPageMetadata } from '@/lib/seo';
import { HERO_VIDEO, VIDEO_CLIPS } from '@/data/videos';
import { VideoClipsSection } from '@/components/VideoClipsSection';
import {
  OctopusCornerTentacles,
  OctopusDivider,
} from '@/components/OctopusAccents';
import { DeliveryCtaBar } from '@/components/DeliveryCtaBar';
import { GoogleReviewsSection } from '@/components/GoogleReviewsSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: '',
    title: dict.seo.home.title,
    description: dict.seo.home.description,
    pageKey: 'home',
  });
}

interface CategoryCardMeta {
  label: string;
  priceHint: string;
  catId: string;
}

interface HomeCopy {
  location: string;
  heroCategory: string;
  title: string;
  reserve: string;
  menu: string;
  tags: [string, string, string];
  menuTitle: string;
  menuAll: string;
  categories: [
    CategoryCardMeta,
    CategoryCardMeta,
    CategoryCardMeta,
    CategoryCardMeta,
    CategoryCardMeta,
    CategoryCardMeta,
  ];
  wineBadge: string;
  wineTitle: string;
  wineText: string;
  wineCta: string;
  lunchBadge: string;
  lunchTitle: string;
  lunchText: string;
  lunchCta: string;
  locationKicker: string;
  addressTitle: string;
  addressCity: string;
  directionsCta: string;
  callCta: string;
  whatsappCta: string;
  events: string;
  contact: string;
}

const COPY: Record<Locale, HomeCopy> = {
  fr: {
    location: 'Rue Jourdan 18 • Quartier Louise',
    heroCategory: 'Fruits de Mer • Bruxelles',
    title: 'Restaurant Seafood Boil, poulpe & plateaux à Bruxelles',
    reserve: 'Réserver une table',
    menu: 'Voir la carte',
    tags: ['Tous les jours 12h – 23h', 'Business Lunch 12h – 15h', 'Vin offert sur sélection'],
    menuTitle: 'La carte',
    menuAll: 'Toutes les catégories',
    categories: [
      { label: 'Seafood Boil', priceHint: '130 € • 5–6 pers.', catId: 'pescobar-seafood-boil' },
      { label: 'Plateaux à partager', priceHint: '64 € – 184 €', catId: 'plateaux' },
      { label: 'La pieuvre de Pescobar', priceHint: 'Dès 14 € • 10 plats', catId: 'la-pieuvre-de-pescobar' },
      { label: 'Poissons', priceHint: '14 € – 33 €', catId: 'poisson' },
      { label: 'Pâtes & fruits de mer', priceHint: 'Dès 14 €', catId: 'pates' },
      { label: 'Vins & bulles', priceHint: 'Dès 8 € le verre', catId: 'vins' },
    ],
    wineBadge: 'Vin inclus',
    wineTitle: 'Une bouteille de vin Aerosoli offerte',
    wineText: 'Avec une sélection de grands plateaux et le poulpe entier grillé.',
    wineCta: 'Voir les plateaux',
    lunchBadge: '12h – 15h • Menu du midi',
    lunchTitle: 'Business Lunch',
    lunchText: 'Soupe de fruits de mer + plat au choix.',
    lunchCta: 'Voir les 4 formules',
    locationKicker: 'Ouvert 7j/7 • 12h00 – 23h00',
    addressTitle: 'Rue Jourdan 18',
    addressCity: '1060 Saint-Gilles • Quartier Louise',
    directionsCta: 'Itinéraire Maps',
    callCta: 'Appeler',
    whatsappCta: 'WhatsApp',
    events: 'Événements',
    contact: 'Contact & plan',
  },
  nl: {
    location: 'Jourdanstraat 18 • Louizawijk',
    heroCategory: 'Vis & Zeevruchten • Brussel',
    title: 'Visrestaurant Seafood Boil, octopus & schotels in Brussel',
    reserve: 'Tafel reserveren',
    menu: 'Bekijk de kaart',
    tags: ['Dagelijks 12u – 23u', 'Business Lunch 12u – 15u', 'Wijn cadeau bij selectie'],
    menuTitle: 'De kaart',
    menuAll: 'Alle categorieën',
    categories: [
      { label: 'Seafood Boil', priceHint: '130 € • 5–6 pers.', catId: 'pescobar-seafood-boil' },
      { label: 'Schotels om te delen', priceHint: '64 € – 184 €', catId: 'plateaux' },
      { label: 'Octopus van Pescobar', priceHint: 'Vanaf 14 € • 10 gerechten', catId: 'la-pieuvre-de-pescobar' },
      { label: 'Visgerechten', priceHint: '14 € – 33 €', catId: 'poisson' },
      { label: 'Pasta & zeevruchten', priceHint: 'Vanaf 14 €', catId: 'pates' },
      { label: 'Wijnen & bubbels', priceHint: 'Vanaf 8 € per glas', catId: 'vins' },
    ],
    wineBadge: 'Wijn inbegrepen',
    wineTitle: 'Een fles Aerosoli wijn cadeau',
    wineText: 'Bij een selectie grote schotels en de hele gegrilde octopus.',
    wineCta: 'Bekijk de schotels',
    lunchBadge: '12u – 15u • Weekdagen',
    lunchTitle: 'Business Lunch',
    lunchText: 'Zeevruchtensoep + hoofdgerecht naar keuze.',
    lunchCta: 'Bekijk de 4 formules',
    locationKicker: 'Dagelijks open • 12u00 – 23u00',
    addressTitle: 'Jourdanstraat 18',
    addressCity: '1060 Sint-Gillis • Louizawijk',
    directionsCta: 'Route Maps',
    callCta: 'Bellen',
    whatsappCta: 'WhatsApp',
    events: 'Privé-events',
    contact: 'Contact & route',
  },
  en: {
    location: 'Rue Jourdan 18 • Louise District',
    heroCategory: 'Seafood Restaurant • Brussels',
    title: 'Brussels Restaurant: Seafood Boil, octopus & platters',
    reserve: 'Reserve a table',
    menu: 'See the menu',
    tags: ['Daily 12:00 – 23:00', 'Business Lunch 12:00 – 15:00', 'Complimentary wine on selection'],
    menuTitle: 'The menu',
    menuAll: 'All categories',
    categories: [
      { label: 'Seafood Boil', priceHint: '130 € • 5–6 guests', catId: 'pescobar-seafood-boil' },
      { label: 'Sharing platters', priceHint: '64 € – 184 €', catId: 'plateaux' },
      { label: "Pescobar's octopus", priceHint: 'From 14 € • 10 dishes', catId: 'la-pieuvre-de-pescobar' },
      { label: 'Fresh fish', priceHint: '14 € – 33 €', catId: 'poisson' },
      { label: 'Seafood pasta', priceHint: 'From 14 €', catId: 'pates' },
      { label: 'Wines & sparkling', priceHint: 'From 8 € a glass', catId: 'vins' },
    ],
    wineBadge: 'Wine included',
    wineTitle: 'A bottle of Aerosoli wine on us',
    wineText: 'With selected large platters and the whole grilled octopus.',
    wineCta: 'See the platters',
    lunchBadge: '12:00 – 15:00 • Weekdays',
    lunchTitle: 'Business Lunch',
    lunchText: 'Seafood soup + a main of your choice.',
    lunchCta: 'See the 4 options',
    locationKicker: 'Open daily • 12:00 – 23:00',
    addressTitle: 'Rue Jourdan 18',
    addressCity: '1060 Saint-Gilles • Louise District',
    directionsCta: 'Google Maps',
    callCta: 'Call',
    whatsappCta: 'WhatsApp',
    events: 'Private events',
    contact: 'Contact & map',
  },
  ro: {
    location: 'Rue Jourdan 18 • Cartierul Louise',
    heroCategory: 'Fructe de Mare • Bruxelles',
    title: 'Restaurant Bruxelles: Seafood Boil, caracatiță & platouri',
    reserve: 'Rezervă o masă',
    menu: 'Vezi meniul',
    tags: ['Zilnic 12:00 – 23:00', 'Business Lunch 12:00 – 15:00', 'Vin cadou la selecție'],
    menuTitle: 'Meniul',
    menuAll: 'Toate categoriile',
    categories: [
      { label: 'Seafood Boil', priceHint: '130 € • 5–6 pers.', catId: 'pescobar-seafood-boil' },
      { label: 'Platouri de împărțit', priceHint: '64 € – 184 €', catId: 'plateaux' },
      { label: 'Caracatița lui Pescobar', priceHint: 'De la 14 € • 10 rețete', catId: 'la-pieuvre-de-pescobar' },
      { label: 'Pește', priceHint: '14 € – 33 €', catId: 'poisson' },
      { label: 'Paste cu fructe de mare', priceHint: 'De la 14 €', catId: 'pates' },
      { label: 'Vinuri & spumante', priceHint: 'De la 8 € paharul', catId: 'vins' },
    ],
    wineBadge: 'Vin inclus',
    wineTitle: 'O sticlă de vin Aerosoli cadou',
    wineText: 'La o selecție de platouri mari și la caracatița întreagă la grătar.',
    wineCta: 'Vezi platourile',
    lunchBadge: '12:00 – 15:00 • Luni – Vineri',
    lunchTitle: 'Business Lunch',
    lunchText: 'Supă de fructe de mare + fel principal la alegere.',
    lunchCta: 'Vezi cele 4 variante',
    locationKicker: 'Deschis zilnic • 12:00 – 23:00',
    addressTitle: 'Rue Jourdan 18',
    addressCity: '1060 Saint-Gilles • Cartierul Louise',
    directionsCta: 'Deschide Harta',
    callCta: 'Sună',
    whatsappCta: 'WhatsApp',
    events: 'Evenimente',
    contact: 'Contact & hartă',
  },
};

const CATEGORY_IMAGES: [string, string, string, string, string, string] = [
  '/images/catalog/seafood-boil-1.jpg',
  '/images/catalog/pescobar-octopus-taverna-racilor-platouri.jpg',
  '/images/catalog/caracatita-intreaga-taverna-racilor-ab41.jpg',
  '/images/catalog/pescobar-octopus-taverna-racilor-peste.jpg',
  '/images/catalog/pescobar-octopus-taverna-racilor-paste.jpg',
  '/images/catalog/pescobar-octopus-taverna-racilor-wines.jpg',
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const c = COPY[locale] ?? COPY.fr;
  const faqJsonLd = buildFaqJsonLd(dict.faq.items);
  const videoJsonLd = buildVideoObjectsJsonLd(locale);
  const publicRoot = path.join(process.cwd(), 'public');
  const hasHeroVideo = fs.existsSync(
    path.join(publicRoot, HERO_VIDEO.video.replace(/^\/+/, ''))
  );
  const availableClipIds = VIDEO_CLIPS.filter((clip) =>
    fs.existsSync(path.join(publicRoot, clip.video.replace(/^\/+/, '')))
  ).map((clip) => clip.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {videoJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
        />
      )}

      {/* 1. HERO: full-bleed video, atmospheric vignette, clean typography & CTAs */}
      <section
        id="hero"
        data-hero-section="true"
        className="relative flex min-h-[82dvh] flex-col justify-between overflow-hidden border-b border-white/10 bg-[#050911] sm:min-h-[85dvh]"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={HERO_VIDEO.poster}
            alt="Pescobar Seafood Boil Bruxelles"
            fill
            priority
            fetchPriority="high"
            quality={75}
            sizes="100vw"
            className={
              hasHeroVideo
                ? 'object-cover object-center'
                : 'animate-hero-slow-zoom object-cover object-center'
            }
          />
          {hasHeroVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              disablePictureInPicture
              aria-hidden="true"
              poster={HERO_VIDEO.poster}
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={HERO_VIDEO.video} type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D17]/80 via-[#070D17]/20 to-[#070D17]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,13,23,0.68)_0%,rgba(7,13,23,0.28)_48%,transparent_78%)]" />
        </div>

        <div className="relative z-10 flex justify-center px-4 pt-6 sm:pt-9">
          <span className="hero-location-badge inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/20 bg-[#070D17]/70 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-white/95 backdrop-blur-md shadow-lg">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
            <span>{c.location}</span>
          </span>
        </div>

        <div className="relative z-10 mx-auto my-auto w-full max-w-2xl px-5 py-10 text-center sm:py-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#DFC286] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-xs">
            {c.heroCategory}
          </p>
          <div className="mx-auto mt-3 h-px w-12 bg-gradient-to-r from-transparent via-[#C8A96A]/80 to-transparent" />
          <h1 className="hero-title mt-3.5 text-3xl font-extrabold leading-[1.12] tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.92)] sm:text-5xl">
            {c.title}
          </h1>
          <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:mt-8 sm:max-w-md sm:flex-row">
            <Link
              href={`/${locale}/reservations`}
              className="inline-flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-6 text-sm font-extrabold text-[#070D17] shadow-[0_12px_32px_rgba(200,169,106,0.28)] transition-colors hover:bg-[#DFC286]"
            >
              <span>{c.reserve}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/menu`}
              className="hero-secondary-btn inline-flex min-h-[52px] flex-1 items-center justify-center rounded-xl border border-white/30 bg-[#070D17]/55 px-6 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-[#C8A96A] hover:bg-[#070D17]/75"
            >
              {c.menu}
            </Link>
          </div>
        </div>

        <div className="hero-tags-bar relative z-10 border-t border-white/10 bg-[#070D17]/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-1.5 px-4 py-3 text-xs font-semibold text-white/85">
            {c.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8A96A]" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. VIDEO CLIPS (9:16) */}
      <VideoClipsSection locale={locale} availableClipIds={availableClipIds} />

      {/* 3. MENU: six photo categories, no paragraphs */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#070D17] py-14 sm:py-16">
        <OctopusCornerTentacles position="top-right" className="opacity-70" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {c.menuTitle}
            </h2>
            <Link
              href={`/${locale}/menu`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#C8A96A] hover:text-[#DFC286]"
            >
              {c.menuAll}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {c.categories.map((cat, i) => (
              <Link
                key={cat.catId}
                href={`/${locale}/menu?cat=${cat.catId}`}
                data-media-card="true"
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] transition-colors hover:border-[#C8A96A]/60"
              >
                <Image
                  src={CATEGORY_IMAGES[i]}
                  alt={cat.label}
                  fill
                  loading="lazy"
                  quality={72}
                  sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 352px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 flex flex-col">
                  <span className="text-[11px] font-bold tabular-nums text-[#DFC286]">
                    {cat.priceHint}
                  </span>
                  <span className="mt-0.5 text-sm font-extrabold leading-tight text-white sm:text-base">
                    {cat.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TWO OFFERS: photo + title + one line + one button */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0C1524] py-14 sm:py-16">
        <OctopusCornerTentacles position="bottom-left" className="opacity-65" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <OctopusDivider className="mb-10" />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Link
              href={`/${locale}/menu?cat=plateaux`}
              data-media-card="true"
              className="home-offer-card group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl border border-[#C8A96A]/35 bg-[#070D17]"
            >
              <Image
                src="/images/catalog/pescobar-octopus-taverna-racilor-platouri.jpg"
                alt={c.wineTitle}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-left transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070D17]/95 via-[#070D17]/70 to-[#070D17]/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D17] via-[#070D17]/40 to-transparent" />

              {/* Dual Aerosoli bottles poised beside the seafood platter */}
              <div className="pointer-events-none absolute right-2 bottom-2 z-10 h-44 w-28 transition-transform duration-500 group-hover:scale-105 sm:right-4 sm:bottom-3 sm:h-60 sm:w-44">
                <Image
                  src="/images/aerosoli-wines-transparent.png"
                  alt="Vin Aerosoli Murfatlar Blanc et Rosé"
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 112px, 176px"
                  className="object-contain object-bottom drop-shadow-[0_14px_26px_rgba(0,0,0,0.92)]"
                />
              </div>

              <div className="relative z-20 p-5 pr-32 sm:p-6 sm:pr-48">
                <span className="inline-block rounded-full bg-[#C8A96A] px-3 py-1 text-[11px] font-extrabold tracking-wider uppercase text-[#070D17]">
                  {c.wineBadge}
                </span>
                <h3 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
                  {c.wineTitle}
                </h3>
                <p className="mt-1 text-sm text-white/85">{c.wineText}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#DFC286]">
                  {c.wineCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            <Link
              href={`/${locale}/business-lunch`}
              data-media-card="true"
              className="home-offer-card group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl border border-white/15"
            >
              <Image
                src="/images/catalog/pescobar-octopus-taverna-racilor-supe.jpg"
                alt={c.lunchTitle}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D17] via-[#070D17]/60 to-transparent" />
              <div className="relative p-6">
                <span className="inline-block rounded-full bg-[#C8A96A] px-3 py-1 text-[11px] font-extrabold tracking-wider uppercase text-[#070D17]">
                  {c.lunchBadge}
                </span>
                <h3 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">
                  {c.lunchTitle}
                </h3>
                <p className="mt-1 text-sm text-white/80">{c.lunchText}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#DFC286]">
                  {c.lunchCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
          <DeliveryCtaBar locale={locale} variant="card" />
        </div>
      </section>

      {/* 5. GOOGLE REVIEWS: authentic diner photos (vibe first) + Read All CTA */}
      <GoogleReviewsSection locale={locale} />

      {/* 6. LOCATION: storefront card, structured address, contact & CTAs */}
      <section className="bg-[#070D17] py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-[#C8A96A]/25 bg-[#0C1524] shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:grid-cols-2">
            <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] lg:min-h-[420px]">
              <Image
                src="/images/pescobar-storefront-bruxelles.jpg"
                alt="Pescobar Seafood Bruxelles, Rue Jourdan 18"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070D17]/75 via-transparent to-transparent" />
              <a
                href={SITE_CONFIG.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-[#C8A96A]/35 bg-[#070D17]/85 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-colors hover:border-[#C8A96A] hover:text-[#DFC286]"
              >
                <MapPin className="h-3.5 w-3.5 text-[#C8A96A]" />
                <span>{c.directionsCta}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#C8A96A]" />
              </a>
            </div>
            <div className="flex flex-col justify-center gap-6 p-6 sm:p-10">
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#C8A96A]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8A96A]" />
                  {c.locationKicker}
                </span>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {c.addressTitle}
                </h2>
                <p className="mt-1.5 text-sm font-medium text-white/75">
                  {c.addressCity}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  aria-label={`${c.callCta}: ${SITE_CONFIG.phone}`}
                  className="inline-flex min-h-[46px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-[#C8A96A]/30 bg-[#070D17]/75 px-2.5 text-[12px] font-bold tabular-nums text-[#DFC286] transition-colors hover:border-[#C8A96A] hover:bg-[#070D17] sm:gap-2 sm:px-4 sm:text-sm"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-emerald-500/35 bg-emerald-500/12 px-2.5 text-[12px] font-bold text-emerald-300 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/20 sm:gap-2 sm:px-4 sm:text-sm"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>{c.whatsappCta}</span>
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href={`/${locale}/reservations`}
                  className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-6 text-sm font-extrabold text-[#070D17] shadow-[0_10px_28px_rgba(200,169,106,0.22)] transition-colors hover:bg-[#DFC286]"
                >
                  <span>{c.reserve}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href={`/${locale}/private-events`}
                    className="inline-flex min-h-[46px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-white/15 bg-white/[0.03] px-2.5 text-xs font-bold text-white/90 transition-colors hover:border-[#C8A96A]/60 hover:bg-white/[0.06] hover:text-white sm:gap-2 sm:px-4 sm:text-sm"
                  >
                    <Users className="h-3.5 w-3.5 shrink-0 text-[#C8A96A] sm:h-4 sm:w-4" />
                    <span>{c.events}</span>
                  </Link>
                  <Link
                    href={`/${locale}/contact`}
                    className="inline-flex min-h-[46px] items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-white/15 bg-white/[0.03] px-2.5 text-xs font-bold text-white/90 transition-colors hover:border-[#C8A96A]/60 hover:bg-white/[0.06] hover:text-white sm:gap-2 sm:px-4 sm:text-sm"
                  >
                    <Compass className="h-3.5 w-3.5 shrink-0 text-[#C8A96A] sm:h-4 sm:w-4" />
                    <span>{c.contact}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COLLAPSIBLE AEO FAQ (Matches FAQPage JSON-LD 100% cleanly) */}
      <section
        aria-labelledby="home-faq-heading"
        className="border-t border-white/10 bg-[#070D17] py-10 sm:py-14"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-7 text-center">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C8A96A]">
              {dict.faq.kicker}
            </span>
            <h2
              id="home-faq-heading"
              className="mt-1.5 text-xl font-extrabold tracking-tight text-white sm:text-3xl"
            >
              {dict.faq.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:items-start">
            {dict.faq.items.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-white/12 bg-[#0C1524] transition-colors hover:border-white/20 open:border-[#C8A96A]/50"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 text-sm font-bold leading-snug text-white select-none sm:px-5 sm:py-4 [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#C8A96A] transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="border-t border-white/10 px-4 py-3.5 sm:px-5">
                  <p className="border-l-2 border-[#C8A96A]/65 pl-3 text-[13.5px] leading-relaxed text-[#D8E2F0] sm:text-sm">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
