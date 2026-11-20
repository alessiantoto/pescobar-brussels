import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Phone,
  Mail,
  ExternalLink,
  MapPin,
  Clock,
} from 'lucide-react';
import {
  SITE_CONFIG,
  type Locale,
} from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';
import {
  buildBreadcrumbJsonLd,
  buildContactPageJsonLd,
} from '@/lib/schema';
import { buildPageMetadata } from '@/lib/seo';
import { OctopusCornerTentacles } from '@/components/OctopusAccents';
import { ContactWizard } from '@/components/ContactWizard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: '/contact',
    title: dict.seo.contact.title,
    description: dict.seo.contact.description,
    pageKey: 'contact',
  });
}

const CONTACT_COPY: Record<
  Locale,
  {
    pageKicker: string;
    pageSubtitle: string;
    addressHeadline: string;
    addressDistrict: string;
    coordinatesTitle: string;
    phoneLabel: string;
    emailLabel: string;
    hoursTitle: string;
    dailyLabel: string;
    kitchenNote: string;
    lunchLabel: string;
    accessTitle: string;
    districtTitle: string;
    districtSub: string;
    placeTitle: string;
    placeSub: string;
    parkingTitle: string;
    parkingSub: string;
    formKicker: string;
    formTitle: string;
    formSubtitle: string;
    firstNameLabel: string;
    firstNamePlaceholder: string;
    lastNameLabel: string;
    lastNamePlaceholder: string;
    emailFieldLabel: string;
    emailFieldPlaceholder: string;
    phoneFieldLabel: string;
    phoneFieldPlaceholder: string;
    subjectLabel: string;
    subjects: [string, string, string, string];
    messageLabel: string;
    messagePlaceholder: string;
    submitCta: string;
    directNotice: string;
    confirmKicker: string;
    confirmTitle: string;
    confirmSubtitle: string;
    sendEmailCta: string;
    sendWhatsappCta: string;
    editMessageCta: string;
    quickLinksTitle: string;
    tableBookingLink: string;
    privateEventsLink: string;
    mapKicker: string;
    mapTitle: string;
    mapSubtitle: string;
    openMapsCta: string;
  }
> = {
  fr: {
    pageKicker: 'RUE JOURDAN 18, 1060 SAINT-GILLES — QUARTIER AVENUE LOUISE',
    pageSubtitle:
      'Coordonnées directes, formulaire de contact et accès depuis l’Avenue Louise et la Place Stéphanie.',
    addressHeadline: 'Rue Jourdan 18, 1060 Saint-Gilles — Quartier Avenue Louise',
    addressDistrict: 'Bruxelles • À 150 m de la Place Stéphanie et du Goulet Louise',
    coordinatesTitle: 'Coordonnées directes',
    phoneLabel: 'Téléphone & WhatsApp',
    emailLabel: 'E-mail officiel',
    hoursTitle: 'Horaires d’ouverture',
    dailyLabel: 'Lundi – Dimanche (service continu)',
    kitchenNote: 'Cuisine ouverte de 12:00 à 22:30 • Restaurant jusqu’à 23:00',
    lunchLabel: 'Business Lunch (en semaine)',
    accessTitle: 'Accès & Parking',
    districtTitle: 'Quartier Louise',
    districtSub: 'À 150 m de l’Avenue Louise',
    placeTitle: 'Place Stéphanie',
    placeSub: 'Saint-Gilles • 1060 Bruxelles',
    parkingTitle: 'Interparking Stéphanie-Louise',
    parkingSub: 'Avenue Louise 83 — 2 min à pied',
    formKicker: 'NOUS ÉCRIRE',
    formTitle: 'Nous écrire',
    formSubtitle:
      'Envoyez-nous votre message pour toute demande d’information, question sur la carte ou projet d’événement.',
    firstNameLabel: 'Prénom *',
    firstNamePlaceholder: 'Votre prénom',
    lastNameLabel: 'Nom *',
    lastNamePlaceholder: 'Votre nom',
    emailFieldLabel: 'E-mail',
    emailFieldPlaceholder: 'votre@email.com',
    phoneFieldLabel: 'Téléphone',
    phoneFieldPlaceholder: '+32 499 00 70 22',
    subjectLabel: 'Sujet',
    subjects: [
      'Demande d’information',
      'Réservation de groupe / Événement privé',
      'Question sur la carte / Allergènes',
      'Autre',
    ],
    messageLabel: 'Message',
    messagePlaceholder: 'Votre message...',
    submitCta: 'Préparer & envoyer le message',
    directNotice:
      'Pour une réservation de table immédiate, utilisez notre page Réservations ou contactez-nous au +32 499 00 70 22.',
    confirmKicker: 'MESSAGE PRÊT À L’ENVOI',
    confirmTitle: 'Choisissez votre canal d’envoi',
    confirmSubtitle:
      'Votre message est formaté. Envoyez-le en un clic par e-mail officiel ou via WhatsApp direct.',
    sendEmailCta: 'Envoyer par E-mail',
    sendWhatsappCta: 'Envoyer via WhatsApp',
    editMessageCta: 'Modifier le message',
    quickLinksTitle: 'Accès direct aux réservations',
    tableBookingLink: 'Réserver une table',
    privateEventsLink: 'Événements privés & groupes',
    mapKicker: 'LOCALISATION & ITINÉRAIRE',
    mapTitle: 'Plan d’accès — Quartier Avenue Louise',
    mapSubtitle:
      'Rue Jourdan 18, 1060 Saint-Gilles, Bruxelles (entre l’Avenue Louise et la Place Jean Jacobs).',
    openMapsCta: 'Ouvrir dans Google Maps',
  },
  nl: {
    pageKicker: 'JOURDANSTRAAT 18, 1060 SINT-GILLIS',
    pageSubtitle:
      'Rechtstreekse contactgegevens, berichtformulier en bereikbaarheid vanaf de Louizalaan en het Stefaniaplein.',
    addressHeadline: 'Jourdanstraat 18, 1060 Sint-Gillis',
    addressDistrict: 'Brussel • Op 150 m van het Stefaniaplein en de Louizalaan',
    coordinatesTitle: 'Rechtstreeks contact',
    phoneLabel: 'Telefoon & WhatsApp',
    emailLabel: 'Officieel e-mailadres',
    hoursTitle: 'Openingsuren',
    dailyLabel: 'Maandag – Zondag (doorlopend)',
    kitchenNote: 'Keuken open van 12:00 tot 22:30 • Restaurant tot 23:00',
    lunchLabel: 'Business Lunch (weekdagen)',
    accessTitle: 'Bereikbaarheid & Parking',
    districtTitle: 'Louizawijk',
    districtSub: 'Op 150 m van de Louizalaan',
    placeTitle: 'Stefaniaplein',
    placeSub: 'Sint-Gillis • 1060 Brussel',
    parkingTitle: 'Interparking Stéphanie-Louise',
    parkingSub: 'Louizalaan 83 — 2 min stappen',
    formKicker: 'CONTACTEER ONS',
    formTitle: 'Contacteer ons',
    formSubtitle:
      'Stuur ons een bericht voor informatie, vragen over de menukaart en allergenen of groepsaanvragen.',
    firstNameLabel: 'Voornaam *',
    firstNamePlaceholder: 'Uw voornaam',
    lastNameLabel: 'Achternaam *',
    lastNamePlaceholder: 'Uw achternaam',
    emailFieldLabel: 'E-mail',
    emailFieldPlaceholder: 'uw@email.com',
    phoneFieldLabel: 'Telefoon',
    phoneFieldPlaceholder: '+32 499 00 70 22',
    subjectLabel: 'Onderwerp',
    subjects: [
      'Informatieaanvraag',
      'Groep of Privé-evenement',
      'Menukaart & Allergenen',
      'Andere vraag',
    ],
    messageLabel: 'Bericht',
    messagePlaceholder: 'Uw bericht...',
    submitCta: 'Bericht voorbereiden',
    directNotice:
      'Voor een directe tafelreservatie kunt u terecht op onze pagina Reserveren of bellen naar +32 499 00 70 22.',
    confirmKicker: 'BERICHT KLAAR VOOR VERZENDING',
    confirmTitle: 'Kies uw verzendkanaal',
    confirmSubtitle:
      'Uw bericht staat klaar. Verstuur het met één klik via e-mail of rechtstreeks via WhatsApp.',
    sendEmailCta: 'Versturen via E-mail',
    sendWhatsappCta: 'Versturen via WhatsApp',
    editMessageCta: 'Bericht aanpassen',
    quickLinksTitle: 'Direct naar reserveringen',
    tableBookingLink: 'Tafel reserveren',
    privateEventsLink: 'Privé-evenementen & groepen',
    mapKicker: 'LOCATIE & ROUTE',
    mapTitle: 'Toegangsplan — Louizawijk',
    mapSubtitle:
      'Jourdanstraat 18, 1060 Sint-Gillis, Brussel (vlak bij de Louizalaan en het Stefaniaplein).',
    openMapsCta: 'Openen in Google Maps',
  },
  en: {
    pageKicker: 'RUE JOURDAN 18, 1060 SAINT-GILLES — AVENUE LOUISE',
    pageSubtitle:
      'Direct contact details, enquiry form and directions from Avenue Louise and Place Stéphanie.',
    addressHeadline: 'Rue Jourdan 18, 1060 Saint-Gilles',
    addressDistrict: 'Brussels • 150 m from Place Stéphanie and Avenue Louise',
    coordinatesTitle: 'Direct Contact',
    phoneLabel: 'Phone & WhatsApp',
    emailLabel: 'Official Email',
    hoursTitle: 'Opening Hours',
    dailyLabel: 'Monday – Sunday (all-day dining)',
    kitchenNote: 'Kitchen open 12:00 – 22:30 • Dining room until 23:00',
    lunchLabel: 'Business Lunch (weekdays)',
    accessTitle: 'Getting Here & Parking',
    districtTitle: 'Louise District',
    districtSub: '150 m from Avenue Louise',
    placeTitle: 'Place Stéphanie',
    placeSub: 'Saint-Gilles • 1060 Brussels',
    parkingTitle: 'Interparking Stéphanie-Louise',
    parkingSub: 'Avenue Louise 83 — 2 min walk',
    formKicker: 'CONTACT US',
    formTitle: 'Send Us a Message',
    formSubtitle:
      'Reach our team directly for general enquiries, menu & allergen questions, or private dining requests.',
    firstNameLabel: 'First Name *',
    firstNamePlaceholder: 'Your first name',
    lastNameLabel: 'Last Name *',
    lastNamePlaceholder: 'Your last name',
    emailFieldLabel: 'E-mail',
    emailFieldPlaceholder: 'your@email.com',
    phoneFieldLabel: 'Phone',
    phoneFieldPlaceholder: '+32 499 00 70 22',
    subjectLabel: 'Subject',
    subjects: [
      'General Enquiry',
      'Group or Private Event',
      'Menu & Allergens',
      'Other',
    ],
    messageLabel: 'Message',
    messagePlaceholder: 'Your message...',
    submitCta: 'Prepare Message',
    directNotice:
      'For immediate table bookings, please visit our Reservations page or call +32 499 00 70 22.',
    confirmKicker: 'MESSAGE READY TO SEND',
    confirmTitle: 'Send Your Message in One Click',
    confirmSubtitle:
      'Your enquiry has been formatted. Choose whether to send it via official e-mail or WhatsApp.',
    sendEmailCta: 'Send via E-mail',
    sendWhatsappCta: 'Send via WhatsApp',
    editMessageCta: 'Edit message',
    quickLinksTitle: 'Direct Booking Links',
    tableBookingLink: 'Book a Table',
    privateEventsLink: 'Private Events & Groups',
    mapKicker: 'LOCATION & DIRECTIONS',
    mapTitle: 'Interactive Map',
    mapSubtitle:
      'Rue Jourdan 18, 1060 Saint-Gilles, Brussels (steps from Avenue Louise and Place Stéphanie).',
    openMapsCta: 'Open in Google Maps',
  },
  ro: {
    pageKicker: 'RUE JOURDAN 18, 1060 SAINT-GILLES — AVENUE LOUISE',
    pageSubtitle:
      'Date de contact directe, formular de mesaj și indicații de acces.',
    addressHeadline: 'Rue Jourdan 18, 1060 Saint-Gilles',
    addressDistrict: 'Bruxelles • La 150 m de Place Stéphanie și Avenue Louise',
    coordinatesTitle: 'Date de contact',
    phoneLabel: 'Telefon & WhatsApp',
    emailLabel: 'E-mail oficial',
    hoursTitle: 'Program de funcționare',
    dailyLabel: 'Luni – Duminică (program continuu)',
    kitchenNote: 'Bucătărie deschisă 12:00 – 22:30 • Restaurant până la 23:00',
    lunchLabel: 'Business Lunch (luni – vineri)',
    accessTitle: 'Acces & Parcare',
    districtTitle: 'Cartierul Louise',
    districtSub: 'La 150 m de Avenue Louise',
    placeTitle: 'Place Stéphanie',
    placeSub: 'Saint-Gilles • 1060 Bruxelles',
    parkingTitle: 'Interparking Stéphanie-Louise',
    parkingSub: 'Avenue Louise 83 — 2 min pe jos',
    formKicker: 'CONTACTEAZĂ-NE',
    formTitle: 'Trimite-ne un mesaj',
    formSubtitle:
      'Scrie-ne pentru informații generale, întrebări despre meniu și alergeni sau evenimente private.',
    firstNameLabel: 'Prenume *',
    firstNamePlaceholder: 'Prenumele tău',
    lastNameLabel: 'Nume *',
    lastNamePlaceholder: 'Numele tău',
    emailFieldLabel: 'E-mail',
    emailFieldPlaceholder: 'adresa@email.com',
    phoneFieldLabel: 'Telefon',
    phoneFieldPlaceholder: '+32 499 00 70 22',
    subjectLabel: 'Subiect',
    subjects: [
      'Solicitare informații',
      'Grup sau Eveniment privat',
      'Meniu & Alergeni',
      'Alt subiect',
    ],
    messageLabel: 'Mesaj',
    messagePlaceholder: 'Mesajul dumneavoastră...',
    submitCta: 'Pregătește mesajul',
    directNotice:
      'Pentru rezervarea unei mese, accesați pagina Rezervări sau sunați direct la +32 499 00 70 22.',
    confirmKicker: 'MESAJ PREGĂTIT',
    confirmTitle: 'Trimite mesajul cu un singur click',
    confirmSubtitle:
      'Alegeți trimiterea prin e-mail oficial sau direct pe WhatsApp.',
    sendEmailCta: 'Trimite prin E-mail',
    sendWhatsappCta: 'Trimite pe WhatsApp',
    editMessageCta: 'Modifică mesajul',
    quickLinksTitle: 'Linkuri rapide rezervări',
    tableBookingLink: 'Rezervă o masă',
    privateEventsLink: 'Evenimente private & grupuri',
    mapKicker: 'LOCALIZARE & INDICAȚII',
    mapTitle: 'Hartă interactivă',
    mapSubtitle:
      'Rue Jourdan 18, 1060 Saint-Gilles (lângă Avenue Louise și Place Stéphanie).',
    openMapsCta: 'Deschide în Google Maps',
  },
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const copy = CONTACT_COPY[locale] ?? CONTACT_COPY.fr;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(locale, [
    { name: SITE_CONFIG.name, path: '' },
    { name: dict.nav.contact, path: '/contact' },
  ]);
  const contactJsonLd = buildContactPageJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* Compact Header */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[#070D17] py-5 sm:py-7">
        <OctopusCornerTentacles position="top-right" className="opacity-45" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <nav aria-label="Breadcrumb" className="mb-1 text-[11px] text-[#B8C7DC]">
                <ol className="flex items-center gap-1.5">
                  <li>
                    <Link href={`/${locale}`} className="transition-colors hover:text-white">
                      Pescobar
                    </Link>
                  </li>
                  <li className="text-white/30">/</li>
                  <li className="font-semibold text-[#C8A96A]">{dict.nav.contact}</li>
                </ol>
              </nav>

              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                {dict.nav.contact}
              </h1>
              <p className="mt-0.5 text-xs text-[#B8C7DC]">
                {copy.addressHeadline} • {SITE_CONFIG.hours.daily.open} – {SITE_CONFIG.hours.daily.close}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-[#C8A96A] px-4 py-2 text-xs font-bold tracking-wider uppercase tabular-nums text-[#070D17] transition-colors hover:bg-[#DFC286]"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <Link
                href={`/${locale}/reservations`}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-[#C8A96A]/40 bg-[#0C1524] px-4 py-2 text-xs font-bold tracking-wider uppercase text-[#DFC286] transition-colors hover:border-[#C8A96A]"
              >
                <span>{dict.nav.reserveCta}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Layout: Contact Form FIRST on Mobile (order-1 lg:order-2), Unified Compact Info Card Beside/Below */}
      <section className="border-b border-white/10 bg-[#070D17] py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            {/* Compact Contact Form (Top on Mobile, Right 7 cols on Desktop) */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <ContactWizard locale={locale} copy={copy} />
            </div>

            {/* Single Unified Compact Venue, Hours & Access Sidebar Card */}
            <div className="order-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] p-5 lg:order-1 lg:col-span-5">
              <div className="relative h-44 w-full overflow-hidden rounded-xl sm:h-52">
                <Image
                  src="/images/pescobar-storefront-bruxelles.jpg"
                  alt="Pescobar Seafood — Rue Jourdan 18"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 460px"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 rounded-md bg-[#070D17]/90 px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase text-[#DFC286]">
                  12:00 – 23:00
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A96A]" />
                  <div>
                    <h2 className="text-base font-extrabold text-white">
                      {copy.addressHeadline}
                    </h2>
                    <p className="mt-0.5 text-xs text-[#B8C7DC]">
                      {copy.addressDistrict}
                    </p>
                  </div>
                </div>

                {/* Direct Coordinates */}
                <div className="space-y-2 border-t border-white/10 pt-3.5 text-xs">
                  <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#070D17] px-3.5 py-2.5">
                    <span className="flex items-center gap-2 text-[#B8C7DC]">
                      <Phone className="h-3.5 w-3.5 text-[#C8A96A]" />
                      <span>{copy.phoneLabel}</span>
                    </span>
                    <a
                      href={`tel:${SITE_CONFIG.phoneRaw}`}
                      className="font-bold tabular-nums text-white hover:text-[#DFC286]"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>

                  <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#070D17] px-3.5 py-2.5">
                    <span className="flex items-center gap-2 text-[#B8C7DC]">
                      <Mail className="h-3.5 w-3.5 text-[#C8A96A]" />
                      <span>{copy.emailLabel}</span>
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="truncate font-bold text-white hover:text-[#DFC286]"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Hours & Quick Access */}
                <div className="space-y-2.5 border-t border-white/10 pt-3.5 text-xs">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="flex items-center gap-1.5 font-semibold text-white">
                      <Clock className="h-3.5 w-3.5 text-[#C8A96A]" />
                      <span>{copy.dailyLabel}</span>
                    </span>
                    <span className="rounded-md border border-white/10 bg-[#070D17] px-2.5 py-1 font-bold tabular-nums text-white">
                      {SITE_CONFIG.hours.daily.open} – {SITE_CONFIG.hours.daily.close}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#DFC286]">
                      {copy.lunchLabel}
                    </span>
                    <span className="rounded-md border border-[#C8A96A]/30 bg-[#C8A96A]/15 px-2.5 py-1 font-bold tabular-nums text-[#DFC286]">
                      {SITE_CONFIG.hours.businessLunch.open} –{' '}
                      {SITE_CONFIG.hours.businessLunch.close}
                    </span>
                  </div>
                  <p className="pt-1 text-[11px] text-[#B8C7DC]">
                    {copy.districtTitle} • {copy.placeTitle} • {copy.parkingTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Interactive Google Maps Embed */}
      <section className="bg-[#070D17] py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#C8A96A]">
                {copy.mapKicker}
              </span>
              <h2 className="mt-1 text-xl font-extrabold tracking-tight text-white sm:text-3xl">
                {copy.mapTitle}
              </h2>
            </div>

            <a
              href={SITE_CONFIG.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[42px] shrink-0 items-center gap-2 self-start rounded-xl bg-[#C8A96A] px-4 py-2 text-xs font-bold tracking-wider uppercase text-[#070D17] transition-colors hover:bg-[#DFC286] sm:self-auto"
            >
              <span>{copy.openMapsCta}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] p-2.5">
            <iframe
              title="Google Maps — Pescobar Rue Jourdan 18"
              src={SITE_CONFIG.address.googleMapsEmbedUrl}
              className="h-[280px] w-full rounded-xl border-0 sm:h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
