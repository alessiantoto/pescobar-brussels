import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  ExternalLink,
  MapPin,
  MessageSquare,
  Phone,
  ShoppingBag,
} from 'lucide-react';
import { SITE_CONFIG, type Locale } from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';
import {
  buildBreadcrumbJsonLd,
  buildServiceOfferJsonLd,
} from '@/lib/schema';
import { buildPageMetadata } from '@/lib/seo';
import {
  DELIVERY_PLATFORMS,
  DeliveryPlatformLogo,
} from '@/components/DeliveryCtaBar';
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
    path: '/delivery',
    title: dict.seo.delivery.title,
    description: dict.seo.delivery.description,
    pageKey: 'delivery',
  });
}

interface ShowcaseDish {
  title: string;
  priceHint: string;
  image: string;
  catId: string;
}

interface DeliveryPageCopy {
  breadcrumbName: string;
  title: string;
  subtitle: string;
  pillHours: string;
  pillArea: string;
  platformsKicker: string;
  platformsHeading: string;
  orderCta: string;
  pickupKicker: string;
  pickupTitle: string;
  pickupInfo: string;
  callPickupCta: string;
  whatsappPickupCta: string;
  mapsCta: string;
  visualsKicker: string;
  visualsTitle: string;
  menuLinkCta: string;
  showcase: [ShowcaseDish, ShowcaseDish, ShowcaseDish, ShowcaseDish];
  zonesTitle: string;
  zones: string[];
}

const DELIVERY_PAGE_COPY: Record<Locale, DeliveryPageCopy> = {
  fr: {
    breadcrumbName: 'Livraison & Takeaway',
    title: 'Livraison & Takeaway Bruxelles',
    subtitle:
      'Commandez en ligne via nos partenaires ou directement à emporter au restaurant.',
    pillHours: 'Cuisine 12:00 – 22:30',
    pillArea: 'Rue Jourdan 18, 1060 Saint-Gilles',
    platformsKicker: 'COMMANDER EN LIGNE',
    platformsHeading: 'Partenaires de livraison',
    orderCta: 'Commander',
    pickupKicker: 'TAKEAWAY DIRECT',
    pickupTitle: 'Retrait au comptoir',
    pickupInfo: 'Commandez par téléphone ou WhatsApp et retirez au comptoir.',
    callPickupCta: 'Appeler',
    whatsappPickupCta: 'WhatsApp',
    mapsCta: 'Maps',
    visualsKicker: 'À LA CARTE',
    visualsTitle: 'Plats populaires',
    menuLinkCta: 'Tout le menu',
    showcase: [
      {
        title: 'Seafood Boil',
        priceHint: '130 €',
        image:
          '/images/catalog/seafood-boil-1.jpg',
        catId: 'pescobar-seafood-boil',
      },
      {
        title: 'Poulpe grillé',
        priceHint: 'Dès 14 €',
        image:
          '/images/catalog/caracatita-intreaga-taverna-racilor-ab41.jpg',
        catId: 'la-pieuvre-de-pescobar',
      },
      {
        title: 'Fritto Misto',
        priceHint: '25 €',
        image:
          '/images/catalog/taverna-racilor-60.jpg',
        catId: 'delices-marins',
      },
      {
        title: 'Plateaux à partager',
        priceHint: '64 € – 184 €',
        image:
          '/images/catalog/pescobar-octopus-taverna-racilor-platouri.jpg',
        catId: 'plateaux',
      },
    ],
    zonesTitle: 'Secteurs à Bruxelles',
    zones: [
      '1060 Saint-Gilles',
      'Avenue Louise',
      '1050 Ixelles',
      '1000 Bruxelles',
      '1180 Uccle',
      '1190 Forest',
      '1040 Etterbeek',
    ],
  },
  nl: {
    breadcrumbName: 'Bezorging & Afhalen',
    title: 'Bezorging & Takeaway Brussel',
    subtitle:
      'Bestel online via onze bezorgpartners of haal rechtstreeks af in het restaurant.',
    pillHours: 'Keuken 12:00 – 22:30',
    pillArea: 'Jourdanstraat 18, 1060 Sint-Gillis',
    platformsKicker: 'ONLINE BESTELLEN',
    platformsHeading: 'Bezorgpartners',
    orderCta: 'Bestel',
    pickupKicker: 'TAKEAWAY DIRECT',
    pickupTitle: 'Afhalen aan de balie',
    pickupInfo: 'Bestel per telefoon of WhatsApp en haal direct af.',
    callPickupCta: 'Bellen',
    whatsappPickupCta: 'WhatsApp',
    mapsCta: 'Maps',
    visualsKicker: 'OP DE KAART',
    visualsTitle: 'Populaire gerechten',
    menuLinkCta: 'Volledige kaart',
    showcase: [
      {
        title: 'Seafood Boil',
        priceHint: '130 €',
        image:
          '/images/catalog/seafood-boil-1.jpg',
        catId: 'pescobar-seafood-boil',
      },
      {
        title: 'Gegrilde octopus',
        priceHint: 'Vanaf 14 €',
        image:
          '/images/catalog/caracatita-intreaga-taverna-racilor-ab41.jpg',
        catId: 'la-pieuvre-de-pescobar',
      },
      {
        title: 'Fritto Misto',
        priceHint: '25 €',
        image:
          '/images/catalog/taverna-racilor-60.jpg',
        catId: 'delices-marins',
      },
      {
        title: 'Schotels om te delen',
        priceHint: '64 € – 184 €',
        image:
          '/images/catalog/pescobar-octopus-taverna-racilor-platouri.jpg',
        catId: 'plateaux',
      },
    ],
    zonesTitle: 'Regio Brussel',
    zones: [
      '1060 Sint-Gillis',
      'Louizalaan',
      '1050 Elsene',
      '1000 Brussel',
      '1180 Ukkel',
      '1190 Vorst',
      '1040 Etterbeek',
    ],
  },
  en: {
    breadcrumbName: 'Delivery & Takeaway',
    title: 'Brussels Delivery & Takeaway',
    subtitle:
      'Order online via our delivery partners or call ahead for direct restaurant pickup.',
    pillHours: 'Kitchen 12:00 – 22:30',
    pillArea: 'Rue Jourdan 18, 1060 Saint-Gilles',
    platformsKicker: 'ORDER ONLINE',
    platformsHeading: 'Delivery partners',
    orderCta: 'Order',
    pickupKicker: 'TAKEAWAY DIRECT',
    pickupTitle: 'Direct counter pickup',
    pickupInfo: 'Call or message on WhatsApp and pick up at the counter.',
    callPickupCta: 'Call',
    whatsappPickupCta: 'WhatsApp',
    mapsCta: 'Maps',
    visualsKicker: 'ON THE MENU',
    visualsTitle: 'Popular dishes',
    menuLinkCta: 'Full menu',
    showcase: [
      {
        title: 'Seafood Boil',
        priceHint: '130 €',
        image:
          '/images/catalog/seafood-boil-1.jpg',
        catId: 'pescobar-seafood-boil',
      },
      {
        title: 'Grilled Octopus',
        priceHint: 'From 14 €',
        image:
          '/images/catalog/caracatita-intreaga-taverna-racilor-ab41.jpg',
        catId: 'la-pieuvre-de-pescobar',
      },
      {
        title: 'Fritto Misto',
        priceHint: '25 €',
        image:
          '/images/catalog/taverna-racilor-60.jpg',
        catId: 'delices-marins',
      },
      {
        title: 'Sharing Platters',
        priceHint: '64 € – 184 €',
        image:
          '/images/catalog/pescobar-octopus-taverna-racilor-platouri.jpg',
        catId: 'plateaux',
      },
    ],
    zonesTitle: 'Brussels coverage',
    zones: [
      '1060 Saint-Gilles',
      'Avenue Louise',
      '1050 Ixelles',
      '1000 Brussels',
      '1180 Uccle',
      '1190 Forest',
      '1040 Etterbeek',
    ],
  },
  ro: {
    breadcrumbName: 'Livrare & Takeaway',
    title: 'Livrare & Takeaway Bruxelles',
    subtitle:
      'Comandă prin aplicațiile de livrare sau telefonic cu ridicare directă din restaurant.',
    pillHours: 'Bucătărie 12:00 – 22:30',
    pillArea: 'Rue Jourdan 18, 1060 Saint-Gilles',
    platformsKicker: 'COMANDĂ ONLINE',
    platformsHeading: 'Platforme de livrare',
    orderCta: 'Comandă',
    pickupKicker: 'TAKEAWAY DIRECT',
    pickupTitle: 'Ridicare din restaurant',
    pickupInfo: 'Comandă telefonic sau pe WhatsApp și ridică direct la pachet.',
    callPickupCta: 'Sună',
    whatsappPickupCta: 'WhatsApp',
    mapsCta: 'Maps',
    visualsKicker: 'DIN MENIU',
    visualsTitle: 'Preparate populare',
    menuLinkCta: 'Tot meniul',
    showcase: [
      {
        title: 'Seafood Boil',
        priceHint: '130 €',
        image:
          '/images/catalog/seafood-boil-1.jpg',
        catId: 'pescobar-seafood-boil',
      },
      {
        title: 'Caracatiță la grătar',
        priceHint: 'De la 14 €',
        image:
          '/images/catalog/caracatita-intreaga-taverna-racilor-ab41.jpg',
        catId: 'la-pieuvre-de-pescobar',
      },
      {
        title: 'Fritto Misto',
        priceHint: '25 €',
        image:
          '/images/catalog/taverna-racilor-60.jpg',
        catId: 'delices-marins',
      },
      {
        title: 'Platouri de împărțit',
        priceHint: '64 € – 184 €',
        image:
          '/images/catalog/pescobar-octopus-taverna-racilor-platouri.jpg',
        catId: 'plateaux',
      },
    ],
    zonesTitle: 'Zone Bruxelles',
    zones: [
      '1060 Saint-Gilles',
      'Avenue Louise',
      '1050 Ixelles',
      '1000 Bruxelles',
      '1180 Uccle',
      '1190 Forest',
      '1040 Etterbeek',
    ],
  },
};

export default async function DeliveryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const c = DELIVERY_PAGE_COPY[locale] ?? DELIVERY_PAGE_COPY.fr;

  const serviceJsonLd = buildServiceOfferJsonLd(locale, {
    path: '/delivery',
    name: dict.seo.delivery.title,
    description: dict.seo.delivery.description,
    serviceType: 'Seafood Delivery and Takeaway Pickup in Brussels',
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: SITE_CONFIG.name, path: '' },
    { name: c.breadcrumbName, path: '/delivery' },
  ]);

  return (
    <div className="min-h-screen bg-[#070D17] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 1. Compact Header (Hours & Address stated once cleanly) */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#070D17] py-5 sm:py-7">
        <OctopusCornerTentacles position="top-right" className="opacity-40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <nav
            aria-label="Breadcrumb"
            className="mb-1.5 text-[11px] text-[#B8C7DC]"
          >
            <ol className="flex items-center gap-1.5">
              <li>
                <Link
                  href={`/${locale}`}
                  className="transition-colors hover:text-white"
                >
                  Pescobar
                </Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="font-semibold text-[#C8A96A]">
                {c.breadcrumbName}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                {c.title}
              </h1>
              <p className="mt-1.5 text-sm leading-relaxed text-[#B8C7DC]">
                {c.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#C8A96A]/40 bg-[#C8A96A]/15 px-3 py-1.5 font-bold text-[#DFC286]">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                {c.pillHours}
              </span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-white/15 bg-[#0C1524] px-3 py-1.5 font-semibold text-white/85">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
                {c.pillArea}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Logical 7 / 5 Layout: Delivery Platforms + Direct Pickup (Left) | Popular Dishes + Coverage (Right) */}
      <section className="py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-12 lg:gap-8">
            {/* Left 7 cols: Partner Platform Rows + Direct Takeaway */}
            <div className="space-y-5 lg:col-span-7">
              <div>
                <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A96A]">
                  {c.platformsKicker}
                </span>
                <h2 className="mt-1 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  {c.platformsHeading}
                </h2>
              </div>

              <div className="space-y-3">
                {DELIVERY_PLATFORMS.map((p) => (
                  <a
                    key={p.key}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative z-20 flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/12 bg-[#0C1524] p-4 transition-all hover:-translate-y-0.5 sm:px-5 sm:py-4 ${p.borderHover}`}
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4">
                      <DeliveryPlatformLogo platform={p.key} size="lg" />
                      <h3 className="text-base font-extrabold text-white sm:text-lg">
                        {p.label}
                      </h3>
                    </div>

                    <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-white/15 bg-[#070D17] px-3.5 py-2 text-xs font-extrabold text-[#DFC286] transition-colors group-hover:border-[#C8A96A] group-hover:text-white sm:px-4">
                      <span>{c.orderCta}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                    </span>
                  </a>
                ))}
              </div>

              {/* Direct Takeaway Card */}
              <div className="relative z-20 rounded-2xl border border-[#C8A96A]/30 bg-[#0C1524] p-4 sm:p-6">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#C8A96A]/35 bg-[#C8A96A]/15 px-3 py-1 text-[10px] font-extrabold tracking-wider uppercase text-[#DFC286]">
                  <ShoppingBag className="h-3 w-3 shrink-0" />
                  {c.pickupKicker}
                </span>

                <h2 className="mt-3 text-lg font-extrabold text-white sm:text-xl">
                  {c.pickupTitle}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#C8D4E6] sm:text-sm">
                  {c.pickupInfo}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-2.5">
                  <a
                    href={`tel:${SITE_CONFIG.phoneRaw}`}
                    className="relative z-20 inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-[#C8A96A] px-2.5 text-xs font-extrabold text-[#070D17] transition-colors hover:bg-[#DFC286]"
                  >
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <span>{c.callPickupCta}</span>
                  </a>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-2.5 text-xs font-bold text-emerald-300 transition-colors hover:bg-emerald-500/25"
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                    <span>{c.whatsappPickupCta}</span>
                  </a>
                  <a
                    href={SITE_CONFIG.address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-white/15 bg-[#070D17] px-2.5 text-xs font-bold text-white transition-colors hover:border-[#C8A96A] hover:text-[#DFC286]"
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
                    <span>{c.mapsCta}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right 5 cols: 2x2 Dish Visuals + Brussels Districts */}
            <aside className="space-y-4 lg:col-span-5">
              <div className="flex items-end justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A96A]">
                    {c.visualsKicker}
                  </span>
                  <h2 className="mt-1 text-xl font-extrabold tracking-tight text-white">
                    {c.visualsTitle}
                  </h2>
                </div>
                <Link
                  href={`/${locale}/menu`}
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[#DFC286] transition-colors hover:text-white"
                >
                  <span>{c.menuLinkCta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {c.showcase.map((dish) => (
                  <Link
                    key={dish.catId}
                    href={`/${locale}/menu?cat=${dish.catId}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] transition-colors hover:border-[#C8A96A]/60"
                  >
                    <Image
                      src={dish.image}
                      alt={dish.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 240px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050911] via-[#050911]/30 to-transparent" />
                    <div className="pointer-events-none absolute inset-x-3 bottom-2.5">
                      <span className="text-[10px] font-bold uppercase text-[#DFC286]">
                        {dish.priceHint}
                      </span>
                      <p className="mt-0.5 text-xs font-extrabold leading-tight text-white sm:text-sm">
                        {dish.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Clean Brussels Districts Card */}
              <div className="rounded-2xl border border-white/10 bg-[#0C1524] p-4 sm:p-5">
                <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#C8A96A]">
                  {c.zonesTitle}
                </h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.zones.map((z) => (
                    <span
                      key={z}
                      className="whitespace-nowrap rounded-lg border border-white/10 bg-[#070D17] px-2.5 py-1 text-[11px] font-semibold text-[#C8D4E6]"
                    >
                      {z}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
