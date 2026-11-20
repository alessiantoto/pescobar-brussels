import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Mail,
  MessageSquare,
  Phone,
  Users,
} from 'lucide-react';
import {
  SITE_CONFIG,
  type Locale,
} from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';
import {
  buildBreadcrumbJsonLd,
  buildServiceOfferJsonLd,
} from '@/lib/schema';
import { buildPageMetadata } from '@/lib/seo';
import { OctopusCornerTentacles } from '@/components/OctopusAccents';
import {
  PrivateEventsWizard,
  type PrivateEventsWizardCopy,
} from '@/components/PrivateEventsWizard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: '/private-events',
    title: dict.seo.privateEvents.title,
    description: dict.seo.privateEvents.description,
    pageKey: 'privateEvents',
  });
}

interface PrivateEventsLocaleCopy extends PrivateEventsWizardCopy {
  heroTitle: string;
  heroSubtitle: string;
  sidebarTitle: string;
  keyFacts: Array<{ label: string; value: string; highlight?: boolean }>;
  img1Badge: string;
  img1Caption: string;
  img2Badge: string;
  img2Caption: string;
}

const PRIVATE_EVENTS_COPY: Record<Locale, PrivateEventsLocaleCopy> = {
  fr: {
    heroTitle: 'Événements privés & repas d’affaires',
    heroSubtitle:
      'Menus de groupe sur mesure, grands plateaux de fruits de mer et facturation TVA — réponse rapide.',
    sidebarTitle: 'Infos pratiques',
    keyFacts: [
      { label: 'Formules', value: 'Groupes & Privatisation', highlight: true },
      { label: 'Ouvert 7j/7', value: '12:00 – 23:00' },
      { label: 'Facturation TVA', value: SITE_CONFIG.vatNumber },
      { label: 'Adresse', value: 'Rue Jourdan 18, 1060' },
    ],
    img1Badge: 'Rue Jourdan 18',
    img1Caption: 'Salle modulable',
    img2Badge: 'Vins & Champagnes',
    img2Caption: 'Accords sur mesure',
    eventTypeLabel: 'Type d’événement',
    eventTypes: [
      'Repas d’affaires / Corporate',
      'Anniversaire / Fête privée',
      'Dîner de groupe',
      'Privatisation',
    ],
    dateLabel: 'Date souhaitée',
    guestsLabel: 'Nombre d’invités',
    guestsPlaceholder: 'Ex. 15',
    nameLabel: 'Nom / Société',
    namePlaceholder: 'Votre nom ou entreprise',
    phoneLabel: 'Téléphone',
    emailLabel: 'E-mail',
    messageLabel: 'Message / Souhaits',
    messagePlaceholder:
      'Précisez vos préférences de menu, vins ou demandes particulières...',
    sendEmailCta: 'Envoyer par E-mail',
    sendWhatsappCta: 'Envoyer sur WhatsApp Direct',
    directNote: `Envoi direct à ${SITE_CONFIG.email} ou au ${SITE_CONFIG.phone}.`,
  },
  nl: {
    heroTitle: 'Privé-evenementen & zakenlunches',
    heroSubtitle:
      'Groepsmenu’s op maat, royale zeevruchtenschotels en btw-facturatie — snel voorstel op maat.',
    sidebarTitle: 'Praktische info',
    keyFacts: [
      { label: 'Formules', value: 'Groepen & Privatisering', highlight: true },
      { label: '7/7 Geopend', value: '12:00 – 23:00' },
      { label: 'Btw-facturatie', value: SITE_CONFIG.vatNumber },
      { label: 'Adres', value: 'Rue Jourdan 18, 1060' },
    ],
    img1Badge: 'Rue Jourdan 18',
    img1Caption: 'Flexibele zaal',
    img2Badge: 'Wijnen & Champagnes',
    img2Caption: 'Pairings op maat',
    eventTypeLabel: 'Type evenement',
    eventTypes: [
      'Zakendiner / Corporate',
      'Verjaardag / Privéfeest',
      'Groepsdiner',
      'Privatisering',
    ],
    dateLabel: 'Gewenste datum',
    guestsLabel: 'Aantal gasten',
    guestsPlaceholder: 'Bijv. 15',
    nameLabel: 'Naam / Bedrijf',
    namePlaceholder: 'Uw naam of bedrijfsnaam',
    phoneLabel: 'Telefoonnummer',
    emailLabel: 'E-mailadres',
    messageLabel: 'Bericht / Wensen',
    messagePlaceholder:
      'Beschrijf uw menuvoorkeuren, wijnen of speciale wensen...',
    sendEmailCta: 'Versturen via E-mail',
    sendWhatsappCta: 'Versturen via WhatsApp Direct',
    directNote: `Rechtstreeks naar ${SITE_CONFIG.email} of ${SITE_CONFIG.phone}.`,
  },
  en: {
    heroTitle: 'Private events & corporate dining',
    heroSubtitle:
      'Tailored group menus, signature seafood platters and Belgian VAT invoicing — fast turnaround.',
    sidebarTitle: 'Practical Details',
    keyFacts: [
      { label: 'Formats', value: 'Groups & Venue Buyout', highlight: true },
      { label: 'Open daily', value: '12:00 – 23:00' },
      { label: 'VAT invoicing', value: SITE_CONFIG.vatNumber },
      { label: 'Address', value: 'Rue Jourdan 18, 1060' },
    ],
    img1Badge: 'Rue Jourdan 18',
    img1Caption: 'Adaptable dining room',
    img2Badge: 'Wines & Champagnes',
    img2Caption: 'Curated pairings',
    eventTypeLabel: 'Event type',
    eventTypes: [
      'Corporate Dining / Business',
      'Birthday / Celebration',
      'Group Dinner',
      'Venue Privatization',
    ],
    dateLabel: 'Preferred date',
    guestsLabel: 'Number of guests',
    guestsPlaceholder: 'e.g. 15',
    nameLabel: 'Name / Company',
    namePlaceholder: 'Your name or company',
    phoneLabel: 'Phone',
    emailLabel: 'E-mail',
    messageLabel: 'Event notes & wishes',
    messagePlaceholder:
      'Share your preferred platters, wine pairings or special requests...',
    sendEmailCta: 'Send via E-mail',
    sendWhatsappCta: 'Send via WhatsApp Direct',
    directNote: `Sent directly to ${SITE_CONFIG.email} or ${SITE_CONFIG.phone}.`,
  },
  ro: {
    heroTitle: 'Evenimente private & mese corporate',
    heroSubtitle:
      'Meniuri dedicate de grup, platouri signature și facturare TVA — ofertă rapidă.',
    sidebarTitle: 'Informații utile',
    keyFacts: [
      { label: 'Opțiuni', value: 'Grupuri & Privatizare', highlight: true },
      { label: 'Deschis zilnic', value: '12:00 – 23:00' },
      { label: 'Facturare TVA', value: SITE_CONFIG.vatNumber },
      { label: 'Adresă', value: 'Rue Jourdan 18, 1060' },
    ],
    img1Badge: 'Rue Jourdan 18',
    img1Caption: 'Sală configurabilă',
    img2Badge: 'Vinuri & Șampanie',
    img2Caption: 'Meniuri dedicate',
    eventTypeLabel: 'Tipul evenimentului',
    eventTypes: [
      'Masă de afaceri / Corporate',
      'Aniversare / Petrecere',
      'Cină de grup',
      'Privatizare completă',
    ],
    dateLabel: 'Data dorită',
    guestsLabel: 'Număr de persoane',
    guestsPlaceholder: 'Ex: 15',
    nameLabel: 'Nume / Companie',
    namePlaceholder: 'Numele tău sau al companiei',
    phoneLabel: 'Telefon',
    emailLabel: 'E-mail',
    messageLabel: 'Mesaj / Preferințe',
    messagePlaceholder:
      'Scrie preferințele de meniu, vinuri sau alte detalii pentru eveniment...',
    sendEmailCta: 'Trimite prin E-mail',
    sendWhatsappCta: 'Trimite pe WhatsApp Direct',
    directNote: `Trimitere directă la ${SITE_CONFIG.email} sau ${SITE_CONFIG.phone}.`,
  },
};

export default async function PrivateEventsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const copy = PRIVATE_EVENTS_COPY[locale] ?? PRIVATE_EVENTS_COPY.fr;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: SITE_CONFIG.name, path: '' },
    { name: dict.nav.privateEvents, path: '/private-events' },
  ]);
  const serviceJsonLd = buildServiceOfferJsonLd(locale, {
    path: '/private-events',
    name: dict.seo.privateEvents.title,
    description: dict.seo.privateEvents.description,
    serviceType: 'Private Events & Corporate Group Dining',
  });

  const whatsappDirectUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `${SITE_CONFIG.name} — ${dict.nav.privateEvents}`
  )}`;

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

      {/* Compact, Punchy Header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#070D17] py-4 sm:py-6">
        <OctopusCornerTentacles position="top-right" className="opacity-45" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="max-w-3xl">
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
                    {dict.nav.privateEvents}
                  </li>
                </ol>
              </nav>

              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                {copy.heroTitle}
              </h1>

              <p className="mt-1 text-xs font-medium leading-relaxed text-[#B8C7DC] sm:text-sm">
                {copy.heroSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#C8A96A] px-3.5 text-xs font-bold tracking-wider uppercase text-[#070D17] transition-all hover:bg-[#DFC286]"
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-[#0C1524] px-3.5 text-xs font-bold tabular-nums text-white transition-colors hover:border-[#C8A96A]"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
                <span className="truncate">{SITE_CONFIG.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Layout: 8-Col Wizard + 4-Col Key Facts & Visuals Sidebar */}
      <section
        id="private-event-inquiry"
        className="bg-[#070D17] py-5 sm:py-9"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Left Column: 3-Step Private Events Wizard */}
            <div className="lg:col-span-8">
              <PrivateEventsWizard locale={locale} copy={copy} />
            </div>

            {/* Right Column: Compact Key Facts & Visuals Sidebar */}
            <aside className="space-y-5 lg:col-span-4">
              {/* 1. Key Facts Card */}
              <div className="rounded-2xl border border-white/10 bg-[#0C1524] p-5 sm:p-6">
                <div className="flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] uppercase text-[#C8A96A]">
                  <Users className="h-4 w-4" />
                  <span>{copy.sidebarTitle}</span>
                </div>

                <div className="mt-4 space-y-2.5 text-xs">
                  {copy.keyFacts.map((fact, idx) => (
                    <div
                      key={fact.label}
                      className={`flex items-center justify-between ${
                        idx < copy.keyFacts.length - 1
                          ? 'border-b border-white/10 pb-2.5'
                          : ''
                      }`}
                    >
                      <span className="text-[#B8C7DC]">{fact.label}</span>
                      {fact.highlight ? (
                        <span className="rounded-md bg-[#C8A96A]/15 px-2.5 py-1 font-bold tabular-nums text-[#DFC286]">
                          {fact.value}
                        </span>
                      ) : (
                        <span className="font-bold tabular-nums text-white">
                          {fact.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-2 truncate text-[#B8C7DC] transition-colors hover:text-[#DFC286]"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
                    <span className="truncate">{SITE_CONFIG.email}</span>
                  </a>
                  <Link
                    href={`/${locale}/menu`}
                    className="inline-flex items-center gap-1.5 font-bold tracking-wider uppercase text-[#C8A96A] transition-colors hover:text-white"
                  >
                    <span>{dict.nav.viewMenuCta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* 2. Compact Dual Visuals */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative h-36 overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] sm:h-44">
                  <Image
                    src="/images/pescobar-storefront-bruxelles.jpg"
                    alt="Pescobar Seafood Bruxelles — Rue Jourdan 18"
                    fill
                    priority
                    sizes="(max-width: 1024px) 50vw, 185px"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070D17] via-[#070D17]/85 to-transparent p-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#C8A96A]">
                      {copy.img1Badge}
                    </span>
                    <p className="mt-0.5 text-xs font-bold leading-snug text-white">
                      {copy.img1Caption}
                    </p>
                  </div>
                </div>

                <div className="relative h-36 overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] sm:h-44">
                  <Image
                    src="/images/cocktails-wine.jpg"
                    alt="Vins, champagnes et cocktails Pescobar Seafood Bruxelles"
                    fill
                    priority
                    sizes="(max-width: 1024px) 50vw, 185px"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070D17] via-[#070D17]/85 to-transparent p-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#C8A96A]">
                      {copy.img2Badge}
                    </span>
                    <p className="mt-0.5 text-xs font-bold leading-snug text-white">
                      {copy.img2Caption}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
