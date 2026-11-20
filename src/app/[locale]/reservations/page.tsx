import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  MessageSquare,
  ExternalLink,
  Clock,
  MapPin,
  Users,
  ArrowRight,
} from 'lucide-react';
import {
  SITE_CONFIG,
  type Locale,
} from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';
import { buildBreadcrumbJsonLd } from '@/lib/schema';
import { buildPageMetadata } from '@/lib/seo';
import { ReservationWidget } from '@/components/ReservationWidget';
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
    path: '/reservations',
    title: dict.seo.reservations.title,
    description: dict.seo.reservations.description,
    pageKey: 'reservations',
  });
}

const PAGE_COPY: Record<
  Locale,
  {
    hoursTitle: string;
    dailyLabel: string;
    dailyValue: string;
    lunchLabel: string;
    lunchValue: string;
    groupKicker: string;
    groupTitle: string;
    groupText: string;
    groupCta: string;
    districtTitle: string;
    districtSub: string;
    placeTitle: string;
    placeSub: string;
    parkingTitle: string;
    parkingSub: string;
    directionsCta: string;
  }
> = {
  fr: {
    hoursTitle: 'Horaires d’Ouverture',
    dailyLabel: 'Ouvert 7j/7',
    dailyValue: '12:00 – 23:00',
    lunchLabel: 'Business Lunch',
    lunchValue: '12:00 – 15:00',
    groupKicker: 'GROUPES & PRIVATISATION',
    groupTitle: 'Groupes & Événements Privés',
    groupText:
      'Vous organisez un repas d’équipe, un anniversaire ou une grande tablée ? Découvrez nos formules dédiées aux groupes et privatisations.',
    groupCta: 'Groupes & Événements Privés',
    districtTitle: 'Quartier Louise',
    districtSub: 'À 150 m de l’Avenue Louise',
    placeTitle: 'Place Stéphanie',
    placeSub: 'Saint-Gilles • 1060 Bruxelles',
    parkingTitle: 'Parking Stéphanie-Louise',
    parkingSub: 'Avenue Louise 83 (2 min)',
    directionsCta: 'Ouvrir dans Google Maps',
  },
  nl: {
    hoursTitle: 'Openingsuren',
    dailyLabel: '7/7 Geopend',
    dailyValue: '12:00 – 23:00',
    lunchLabel: 'Business Lunch',
    lunchValue: '12:00 – 15:00',
    groupKicker: 'GROEPEN & PRIVÉ-EVENTS',
    groupTitle: 'Groepen & Privé-evenementen',
    groupText:
      'Organiseert u een bedrijfsdiner, verjaardag of gezellig groepsdiner? Bekijk onze formules voor groepen en privé-evenementen.',
    groupCta: 'Groepen & Privé-evenementen',
    districtTitle: 'Louizawijk',
    districtSub: 'Op 150 m van de Louizalaan',
    placeTitle: 'Stefaniaplein',
    placeSub: 'Sint-Gillis • 1060 Brussel',
    parkingTitle: 'Parking Stefania-Louiza',
    parkingSub: 'Louizalaan 83 (2 min)',
    directionsCta: 'Openen in Google Maps',
  },
  en: {
    hoursTitle: 'Opening Hours',
    dailyLabel: 'Open Daily',
    dailyValue: '12:00 – 23:00',
    lunchLabel: 'Business Lunch',
    lunchValue: '12:00 – 15:00',
    groupKicker: 'GROUPS & PRIVATE EVENTS',
    groupTitle: 'Groups & Private Events',
    groupText:
      'Planning a corporate dinner, birthday celebration, or festive group table? Explore our tailored options for groups and private dining.',
    groupCta: 'Groups & Private Events',
    districtTitle: 'Louise District',
    districtSub: '150 m from Avenue Louise',
    placeTitle: 'Place Stéphanie',
    placeSub: 'Saint-Gilles • 1060 Brussels',
    parkingTitle: 'Stéphanie-Louise Parking',
    parkingSub: 'Avenue Louise 83 (2 min)',
    directionsCta: 'Open in Google Maps',
  },
  ro: {
    hoursTitle: 'Program de Funcționare',
    dailyLabel: 'Deschis Zilnic',
    dailyValue: '12:00 – 23:00',
    lunchLabel: 'Business Lunch',
    lunchValue: '12:00 – 15:00',
    groupKicker: 'GRUPURI & EVENIMENTE PRIVATE',
    groupTitle: 'Grupuri & Evenimente Private',
    groupText:
      'Organizați o aniversare, o cină corporate sau o masă festivă? Descoperiți opțiunile noastre dedicate pentru grupuri și evenimente.',
    groupCta: 'Grupuri & Evenimente Private',
    districtTitle: 'Cartierul Louise',
    districtSub: 'La 150 m de Avenue Louise',
    placeTitle: 'Place Stéphanie',
    placeSub: 'Saint-Gilles • 1060 Bruxelles',
    parkingTitle: 'Parcare Stéphanie-Louise',
    parkingSub: 'Avenue Louise 83 (2 min)',
    directionsCta: 'Deschide în Google Maps',
  },
};

export default async function ReservationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const copy = PAGE_COPY[locale] ?? PAGE_COPY.fr;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: SITE_CONFIG.name, path: '' },
    { name: dict.nav.reservations, path: '/reservations' },
  ]);

  const whatsappDirectUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Pescobar Bruxelles — ${dict.reservationForm.title} (Rue Jourdan 18)`
  )}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Ultra-Compact Header so the Reservation Form starts immediately above the fold */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#070D17] py-4 sm:py-6">
        <OctopusCornerTentacles position="top-right" className="opacity-45" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <nav aria-label="Breadcrumb" className="mb-1 text-[11px] text-[#B8C7DC]">
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
                    {dict.nav.reservations}
                  </li>
                </ol>
              </nav>

              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                {dict.reservationForm.title}
              </h1>
              <p className="mt-0.5 text-xs font-medium text-[#B8C7DC]">
                Rue Jourdan 18, 1060 Saint-Gilles • {dict.nav.openHoursBadge}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#C8A96A] px-3.5 py-2 text-xs font-bold tracking-wider uppercase text-[#070D17] transition-all hover:bg-[#DFC286]"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-white/15 bg-[#0C1524] px-3.5 py-2 text-xs font-bold tabular-nums text-white transition-colors hover:border-[#C8A96A]"
              >
                <Phone className="h-3.5 w-3.5 text-[#C8A96A]" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main 4-Step Reservation Wizard + Side/Bottom Info Column */}
      <section className="bg-[#070D17] py-5 sm:py-9">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left Column: 3-Step Reservation Widget */}
            <div className="lg:col-span-8">
              <ReservationWidget dict={dict} locale={locale} />
            </div>

            {/* Right / Side Info Column */}
            <aside className="space-y-6 lg:col-span-4">
              {/* 1. Opening Hours Card */}
              <div className="rounded-2xl border border-white/10 bg-[#0C1524] p-6">
                <div className="flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#C8A96A]">
                  <Clock className="h-4 w-4" />
                  <span>{copy.hoursTitle}</span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="font-semibold text-white">
                      {copy.dailyLabel}
                    </span>
                    <span className="rounded-md border border-white/10 bg-[#070D17] px-2.5 py-1 font-bold tabular-nums text-white">
                      {copy.dailyValue}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#DFC286]">
                      {copy.lunchLabel}
                    </span>
                    <span className="rounded-md border border-[#C8A96A]/30 bg-[#C8A96A]/15 px-2.5 py-1 font-bold tabular-nums text-[#DFC286]">
                      {copy.lunchValue}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Groups & Private Events Card */}
              <div className="rounded-2xl border border-[#C8A96A]/35 bg-[#0C1524] p-6">
                <div className="flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#C8A96A]">
                  <Users className="h-4 w-4" />
                  <span>{copy.groupKicker}</span>
                </div>

                <h2 className="mt-2 text-base font-extrabold text-white">
                  {copy.groupTitle}
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-[#B8C7DC]">
                  {copy.groupText}
                </p>

                <Link
                  href={`/${locale}/private-events`}
                  className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-[#C8A96A]/50 bg-[#070D17] px-4 py-2.5 text-xs font-bold text-[#DFC286] transition-all hover:bg-[#C8A96A] hover:text-[#070D17]"
                >
                  <span>{copy.groupCta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* 3. Rue Jourdan 18 Storefront & Access Card */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] p-5">
                <div className="relative h-44 w-full overflow-hidden rounded-xl">
                  <Image
                    src="/images/pescobar-storefront-bruxelles.jpg"
                    alt="Pescobar Bruxelles — Rue Jourdan 18, 1060 Saint-Gilles"
                    fill
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070D17] via-[#070D17]/80 to-transparent p-3.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#DFC286]">
                      <MapPin className="h-3.5 w-3.5 text-[#C8A96A]" />
                      <span>Rue Jourdan 18, 1060 Saint-Gilles</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#070D17] px-3.5 py-2.5">
                    <span className="font-bold text-white">
                      {copy.districtTitle}
                    </span>
                    <span className="text-[11px] text-[#B8C7DC]">
                      {copy.districtSub}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#070D17] px-3.5 py-2.5">
                    <span className="font-bold text-white">
                      {copy.placeTitle}
                    </span>
                    <span className="text-[11px] text-[#B8C7DC]">
                      {copy.placeSub}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#070D17] px-3.5 py-2.5">
                    <span className="font-bold text-white">
                      {copy.parkingTitle}
                    </span>
                    <span className="text-[11px] text-[#B8C7DC]">
                      {copy.parkingSub}
                    </span>
                  </div>
                </div>

                <a
                  href={SITE_CONFIG.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-4 py-2.5 text-xs font-bold tracking-wider uppercase text-[#070D17] transition-all hover:bg-[#DFC286]"
                >
                  <span>{copy.directionsCta}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </aside>
          </div>

          {/* Embedded Interactive Map */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] p-2.5">
            <iframe
              title="Google Maps — Pescobar Bruxelles Rue Jourdan 18"
              src={SITE_CONFIG.address.googleMapsEmbedUrl}
              className="h-72 w-full rounded-xl border-0 sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
