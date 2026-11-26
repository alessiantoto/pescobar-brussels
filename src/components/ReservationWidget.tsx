'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Phone,
  MessageSquare,
  CheckCircle2,
  Mail,
  Calendar,
  Clock,
  Users,
  MapPin,
  PenLine,
  ArrowLeft,
  ArrowRight,
  UtensilsCrossed,
  ExternalLink,
} from 'lucide-react';
import { SITE_CONFIG, type Locale } from '@/config/site';
import type { Dictionary } from '@/i18n/dictionaries';
import {
  OctopusCornerTentacles,
  OctopusTentacleSide,
} from '@/components/OctopusAccents';
import { OctopusTentacleProgress } from '@/components/OctopusTentacleProgress';
import {
  formatShortLocalizedDate,
  ModernDatePicker,
} from '@/components/ModernDatePicker';
import {
  focusFirstInvalidField,
  getFieldBorderClass,
  getFieldLabelClass,
  REQUIRED_FIELD_ERROR,
  scrollToElementBelowNavbar,
} from '@/lib/formValidation';

export interface ReservationWidgetProps {
  dict: Dictionary;
  locale?: Locale;
}

const ALL_TIME_SLOTS = [
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
] as const;

const GUEST_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

type ZoneKey = 'mainDining' | 'terrace' | 'groupTable';

interface WizardCopy {
  stepLabels: [string, string, string, string];
  stepProgressLabel: string;
  guestsTitle: string;
  guestsUnit: string;
  group9Note: string;
  dateTitle: string;
  todayBtn: string;
  tomorrowBtn: string;
  pickDateBtn: string;
  timeTitle: string;
  zoneTitle: string;
  zones: Record<ZoneKey, { title: string; subtitle: string }>;
  continueBtn: string;
  summaryModifyBtn: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  occasionLabel: string;
  occasionPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  backBtn: string;
  validateBtn: string;
  passKicker: string;
  passTitle: string;
  passSubtitle: string;
  passGuestLabel: string;
  passContactLabel: string;
  passOccasionLabel: string;
  passMessageLabel: string;
  directionsBtn: string;
  calendarBtn: string;
  helpLabel: string;
  helpWhatsApp: string;
  helpCall: string;
  newReservationBtn: string;
  beforeVisitKicker: string;
  beforeVisitTitle: string;
  menuCtaTitle: string;
  menuCtaDesc: string;
  menuCtaBtn: string;
  addressCtaTitle: string;
  addressCtaDesc: string;
  addressCtaBtn: string;
  mapsCtaBtn: string;
}

const WIZARD_COPY: Record<Locale, WizardCopy> = {
  fr: {
    stepLabels: ['01. Convives & Date', '02. Heure & Espace', '03. Coordonnées', '04. Confirmation'],
    stepProgressLabel: 'Étape',
    guestsTitle: 'Nombre de convives',
    guestsUnit: 'convives',
    group9Note:
      'Pour 9 convives et plus, notre équipe prépare une grande table sur mesure. Vous pourrez préciser le nombre exact à l’étape 3.',
    dateTitle: 'Date souhaitée',
    todayBtn: 'Aujourd’hui',
    tomorrowBtn: 'Demain',
    pickDateBtn: 'Choisir',
    timeTitle: 'Créneau horaire',
    zoneTitle: 'Espace préféré',
    zones: {
      mainDining: {
        title: 'Salle Principale',
        subtitle: 'Cadre chaleureux & ambiance Pescobar',
      },
      terrace: {
        title: 'Côté Fenêtre / Terrasse',
        subtitle: 'Lumineux • Terrasse selon météo',
      },
      groupTable: {
        title: 'Grande Table Partage',
        subtitle: 'Idéal pour Seafood Boil & plateaux',
      },
    },
    continueBtn: 'Continuer',
    summaryModifyBtn: 'Modifier',
    firstNameLabel: 'Prénom *',
    firstNamePlaceholder: 'Ex. Jean-Philippe',
    lastNameLabel: 'Nom *',
    lastNamePlaceholder: 'Ex. Martin',
    phoneLabel: 'Téléphone mobile *',
    phonePlaceholder: '+32 499 00 00 00',
    emailLabel: 'E-mail (pour confirmation)',
    emailPlaceholder: 'jean.dupont@example.com',
    occasionLabel: 'Occasion (optionnel)',
    occasionPlaceholder: 'Ex : Anniversaire, dîner d’affaires...',
    messageLabel: 'Remarques (optionnel)',
    messagePlaceholder:
      'Allergies, table famille / place poussette & bébé, précommande...',
    backBtn: 'Retour',
    validateBtn: 'Valider la réservation',
    passKicker: 'RÉSERVATION CONFIRMÉE',
    passTitle: 'Votre table est réservée !',
    passSubtitle:
      'Nous nous réjouissons de vous accueillir chez Pescobar Seafood Bruxelles. Votre réservation a bien été enregistrée dans notre système.',
    passGuestLabel: 'Convives',
    passContactLabel: 'Réservé au nom de',
    passOccasionLabel: 'Occasion',
    passMessageLabel: 'Remarques & souhaits',
    directionsBtn: 'Ouvrir l’itinéraire (Google Maps)',
    calendarBtn: 'Ajouter au calendrier',
    helpLabel: 'Une question ou une modification ?',
    helpWhatsApp: 'Écrire sur WhatsApp',
    helpCall: 'Appeler le restaurant',
    newReservationBtn: 'Réserver une autre table',
    beforeVisitKicker: 'AVANT VOTRE VENUE',
    beforeVisitTitle: 'Préparez votre passage à Bruxelles',
    menuCtaTitle: 'Parcourir la carte',
    menuCtaDesc: 'Découvrez nos Seafood Boil, poulpe grillé et plateaux à partager avant d’arriver.',
    menuCtaBtn: 'Voir le menu',
    addressCtaTitle: 'Adresse & accès',
    addressCtaDesc: 'Rue Jourdan 18, 1060 Saint-Gilles • À 2 min de l’Avenue Louise.',
    addressCtaBtn: 'Infos & accès',
    mapsCtaBtn: 'Google Maps',
  },
  nl: {
    stepLabels: ['01. Gasten & Datum', '02. Tijdstip & Tafel', '03. Gegevens', '04. Bevestiging'],
    stepProgressLabel: 'Stap',
    guestsTitle: 'Aantal gasten',
    guestsUnit: 'gasten',
    group9Note:
      'Voor 9 of meer gasten bereidt ons team een grote tafel op maat voor. U kunt het exacte aantal bij stap 3 vermelden.',
    dateTitle: 'Gewenste datum',
    todayBtn: 'Vandaag',
    tomorrowBtn: 'Morgen',
    pickDateBtn: 'Datum',
    timeTitle: 'Tijdstip',
    zoneTitle: 'Tafelvoorkeur',
    zones: {
      mainDining: {
        title: 'Salle Principale (Zaal)',
        subtitle: 'Sfeervol & centraal in het restaurant',
      },
      terrace: {
        title: 'Raamzijde / Terras',
        subtitle: 'Veel licht • Terras volgens weer',
      },
      groupTable: {
        title: 'Grote Deeltafel',
        subtitle: 'Ideaal voor Seafood Boil & schotels',
      },
    },
    continueBtn: 'Doorgaan',
    summaryModifyBtn: 'Wijzigen',
    firstNameLabel: 'Voornaam *',
    firstNamePlaceholder: 'Bijv. Jan',
    lastNameLabel: 'Achternaam *',
    lastNamePlaceholder: 'Bijv. Peeters',
    phoneLabel: 'Mobiel telefoonnummer *',
    phonePlaceholder: '+32 499 00 00 00',
    emailLabel: 'E-mail (voor bevestiging)',
    emailPlaceholder: 'jan.peeters@example.com',
    occasionLabel: 'Gelegenheid (optioneel)',
    occasionPlaceholder: 'Bijv. Verjaardag, zakendiner...',
    messageLabel: 'Opmerkingen (optioneel)',
    messagePlaceholder:
      'Allergieën, familietafel / plek voor kinderwagen & baby...',
    backBtn: 'Terug',
    validateBtn: 'Reservatie bevestigen',
    passKicker: 'RESERVATIE BEVESTIGD',
    passTitle: 'Uw tafel is gereserveerd!',
    passSubtitle:
      'We kijken ernaar uit u te verwelkomen bij Pescobar Seafood Brussel. Uw reservatie is succesvol opgeslagen in ons systeem.',
    passGuestLabel: 'Gasten',
    passContactLabel: 'Gereserveerd op naam van',
    passOccasionLabel: 'Gelegenheid',
    passMessageLabel: 'Opmerkingen & wensen',
    directionsBtn: 'Route openen (Google Maps)',
    calendarBtn: 'Toevoegen aan agenda',
    helpLabel: 'Vragen of wijzigingen?',
    helpWhatsApp: 'Stuur een WhatsApp',
    helpCall: 'Bel het restaurant',
    newReservationBtn: 'Nog een tafel reserveren',
    beforeVisitKicker: 'VOOR UW BEZOEK',
    beforeVisitTitle: 'Bereid uw bezoek in Brussel voor',
    menuCtaTitle: 'Bekijk de menukaart',
    menuCtaDesc: 'Ontdek onze Seafood Boil, gegrilde octopus en volledige kaart met prijzen.',
    menuCtaBtn: 'Naar de kaart',
    addressCtaTitle: 'Adres & bereikbaarheid',
    addressCtaDesc: 'Rue Jourdan 18, 1060 Sint-Gillis • Op 2 min van de Louizalaan.',
    addressCtaBtn: 'Adres & info',
    mapsCtaBtn: 'Google Maps',
  },
  en: {
    stepLabels: ['01. Guests & Date', '02. Time & Seating', '03. Your Details', '04. Confirmation'],
    stepProgressLabel: 'Step',
    guestsTitle: 'Number of Guests',
    guestsUnit: 'guests',
    group9Note:
      'For 9+ guests, our team prepares a custom group table. Specify your exact headcount in the notes at step 3.',
    dateTitle: 'Select Date',
    todayBtn: 'Today',
    tomorrowBtn: 'Tomorrow',
    pickDateBtn: 'Calendar',
    timeTitle: 'Preferred Time',
    zoneTitle: 'Seating Preference',
    zones: {
      mainDining: {
        title: 'Main Dining Room',
        subtitle: 'Warm atmosphere & main room',
      },
      terrace: {
        title: 'Window / Terrace',
        subtitle: 'Bright seating • Weather permitting',
      },
      groupTable: {
        title: 'Large Sharing Table',
        subtitle: 'Ideal for Seafood Boil & platters',
      },
    },
    continueBtn: 'Continue',
    summaryModifyBtn: 'Edit',
    firstNameLabel: 'First Name *',
    firstNamePlaceholder: 'e.g. Alexander',
    lastNameLabel: 'Last Name *',
    lastNamePlaceholder: 'e.g. Sterling',
    phoneLabel: 'Mobile Phone *',
    phonePlaceholder: '+32 499 00 00 00',
    emailLabel: 'Email (for confirmation)',
    emailPlaceholder: 'alexander@example.com',
    occasionLabel: 'Occasion (optional)',
    occasionPlaceholder: 'e.g. Birthday, business dinner...',
    messageLabel: 'Special requests (optional)',
    messagePlaceholder:
      'Allergies, family table with stroller / baby space, pre-orders...',
    backBtn: 'Back',
    validateBtn: 'Review & Confirm',
    passKicker: 'RESERVATION CONFIRMED',
    passTitle: 'Your table is booked!',
    passSubtitle:
      'We look forward to welcoming you to Pescobar Seafood Brussels. Your reservation has been successfully confirmed in our system.',
    passGuestLabel: 'Guests',
    passContactLabel: 'Reserved under',
    passOccasionLabel: 'Occasion',
    passMessageLabel: 'Special requests & notes',
    directionsBtn: 'Open Directions (Google Maps)',
    calendarBtn: 'Add to Calendar',
    helpLabel: 'Need to adjust or have a question?',
    helpWhatsApp: 'Message on WhatsApp',
    helpCall: 'Call the restaurant',
    newReservationBtn: 'Book another table',
    beforeVisitKicker: 'BEFORE YOU ARRIVE',
    beforeVisitTitle: 'Plan your evening in Brussels',
    menuCtaTitle: 'Explore the Menu',
    menuCtaDesc: 'Preview our Seafood Boil pots, whole octopus, wines and cocktails.',
    menuCtaBtn: 'Browse Menu',
    addressCtaTitle: 'Restaurant Address',
    addressCtaDesc: 'Rue Jourdan 18, 1060 Saint-Gilles • 2 min from Avenue Louise.',
    addressCtaBtn: 'Address & Access',
    mapsCtaBtn: 'Google Maps',
  },
  ro: {
    stepLabels: ['01. Persoane & Dată', '02. Oră & Zonă', '03. Date & Mesaj', '04. Confirmare'],
    stepProgressLabel: 'Pasul',
    guestsTitle: 'Număr de persoane',
    guestsUnit: 'persoane',
    group9Note:
      'Pentru 9+ persoane, echipa noastră pregătește o masă mare dedicată. Puteți scrie numărul exact la pasul 3.',
    dateTitle: 'Data rezervării',
    todayBtn: 'Astăzi',
    tomorrowBtn: 'Mâine',
    pickDateBtn: 'Altă zi',
    timeTitle: 'Interval orar',
    zoneTitle: 'Zona preferată',
    zones: {
      mainDining: {
        title: 'Sala Principală',
        subtitle: 'Atmosferă caldă & vibrantă',
      },
      terrace: {
        title: 'Lângă Fereastră / Terasă',
        subtitle: 'Luminos • Terasă în funcție de vreme',
      },
      groupTable: {
        title: 'Masă Mare de Grup',
        subtitle: 'Ideală pentru Seafood Boil & platouri',
      },
    },
    continueBtn: 'Continuă',
    summaryModifyBtn: 'Modifică',
    firstNameLabel: 'Prenume *',
    firstNamePlaceholder: 'Ex. Alexandru',
    lastNameLabel: 'Nume *',
    lastNamePlaceholder: 'Ex. Popescu',
    phoneLabel: 'Telefon mobil *',
    phonePlaceholder: '+32 499 00 00 00',
    emailLabel: 'Email (pentru confirmare)',
    emailPlaceholder: 'alexandru.popescu@example.com',
    occasionLabel: 'Ocazie (opțional)',
    occasionPlaceholder: 'Ex: Aniversare, cină de afaceri...',
    messageLabel: 'Observații (opțional)',
    messagePlaceholder:
      'Alergii, masă de familie cu loc pentru cărucior / bebe, preferințe...',
    backBtn: 'Înapoi',
    validateBtn: 'Validează rezervarea',
    passKicker: 'REZERVARE CONFIRMATĂ',
    passTitle: 'Masa dumneavoastră este rezervată!',
    passSubtitle:
      'Vă așteptăm cu drag la Pescobar Seafood Bruxelles (Rue Jourdan 18). Rezervarea a fost înregistrată cu succes.',
    passGuestLabel: 'Persoane',
    passContactLabel: 'Rezervat pe numele',
    passOccasionLabel: 'Ocazie',
    passMessageLabel: 'Observații & preferințe',
    directionsBtn: 'Deschide Traseul pe Hartă',
    calendarBtn: 'Adaugă în Calendar',
    helpLabel: 'Doriți să modificați sau aveți o întrebare?',
    helpWhatsApp: 'Scrie pe WhatsApp',
    helpCall: 'Sună restaurantul',
    newReservationBtn: 'Fă o altă rezervare',
    beforeVisitKicker: 'ÎNAINTE SĂ AJUNGEȚI',
    beforeVisitTitle: 'Pregătește vizita ta la Pescobar',
    menuCtaTitle: 'Răsfoiește Meniul',
    menuCtaDesc: 'Descoperă Seafood Boil, caracatița la grătar și platourile de împărțit.',
    menuCtaBtn: 'Vezi Meniul',
    addressCtaTitle: 'Adresă & Indicații',
    addressCtaDesc: 'Rue Jourdan 18, 1060 Saint-Gilles • La 2 min de Avenue Louise.',
    addressCtaBtn: 'Adresă & Acces',
    mapsCtaBtn: 'Google Maps',
  },
};

function toDateInputString(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function resolveLocale(dict: Dictionary, explicitLocale?: Locale): Locale {
  if (explicitLocale) return explicitLocale;
  const name = dict.localeName.toLowerCase();
  if (name.includes('nederlands')) return 'nl';
  if (name.includes('english')) return 'en';
  if (name.includes('rom')) return 'ro';
  return 'fr';
}

export function ReservationWidget({ dict, locale }: ReservationWidgetProps) {
  const activeLocale = resolveLocale(dict, locale);
  const copy = WIZARD_COPY[activeLocale] ?? WIZARD_COPY.fr;

  const now = new Date();
  const todayStr = toDateInputString(now);

  const tomorrowDate = new Date(now);
  tomorrowDate.setDate(now.getDate() + 1);
  const tomorrowStr = toDateInputString(tomorrowDate);

  const wizardCardRef = useRef<HTMLDivElement>(null);
  const dateActionEndRef = useRef<HTMLDivElement>(null);
  const seatingSectionRef = useRef<HTMLDivElement>(null);
  const step2ActionsRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [guests, setGuests] = useState<number>(2);
  const [customGuests, setCustomGuests] = useState<number>(10);
  const [date, setDate] = useState<string>(todayStr);
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [time, setTime] = useState<string>('19:30');
  const [zone, setZone] = useState<ZoneKey>('mainDining');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [showStep3Errors, setShowStep3Errors] = useState<boolean>(false);

  const firstNameInvalid = !firstName.trim();
  const lastNameInvalid = !lastName.trim();
  const phoneInvalid = !phone.trim();

  const firstNameMissing = showStep3Errors && firstNameInvalid;
  const lastNameMissing = showStep3Errors && lastNameInvalid;
  const phoneMissing = showStep3Errors && phoneInvalid;

  const step3ValidationFields = () => [
    { id: 'res-first-name', invalid: !firstName.trim() },
    { id: 'res-last-name', invalid: !lastName.trim() },
    { id: 'res-phone', invalid: !phone.trim() },
  ];

  const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');
  const resolvedGuests = guests === 9 ? Math.max(9, customGuests) : guests;
  const guestsDisplay = `${resolvedGuests}`;
  const zoneDisplay = copy.zones[zone].title;
  const occasionDisplay = occasion.trim() || null;
  const cleanFilter = (val: string) => {
    const v = val.trim();
    if (!v) return null;
    const low = v.toLowerCase();
    if (['nu', 'non', 'no', 'none', '-', 'da', 'ok', 'n/a'].includes(low)) return null;
    return v;
  };
  const meaningfulOccasion = cleanFilter(occasion);
  const meaningfulNotes = cleanFilter(notes);

  const goToStep = (nextStep: 1 | 2 | 3 | 4) => {
    setDatePickerOpen(false);
    setStep(nextStep);
    scrollToElementBelowNavbar(wizardCardRef.current);
  };

  const handleSelectTime = (slot: string) => {
    setTime(slot);
    if (typeof window === 'undefined' || !step2ActionsRef.current) return;
    const rect = step2ActionsRef.current.getBoundingClientRect();
    if (rect.bottom > window.innerHeight - 16) {
      step2ActionsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };

  const handleSelectZone = (zoneKey: ZoneKey) => {
    setZone(zoneKey);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstNameInvalid || lastNameInvalid || phoneInvalid) {
      setShowStep3Errors(true);
      focusFirstInvalidField(step3ValidationFields());
      return;
    }
    setShowStep3Errors(false);

    // Persist online reservation to Postgres when Supabase is configured (non-blocking)
    const mappedZone =
      zone === 'terrace'
        ? 'window_terrace'
        : zone === 'groupTable'
          ? 'lounge'
          : 'main';
    fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reservation_date: date,
        reservation_time: time,
        service: Number(time.split(':')[0]) < 16 ? 'lunch' : 'dinner',
        party_size: Number(guestsDisplay) || 2,
        zone: mappedZone,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        occasion: occasionDisplay || null,
        notes: notes.trim() || null,
        locale,
      }),
    }).catch(() => {});

    goToStep(4);
  };

  const buildSummaryText = () => {
    return [
      `Pescobar Bruxelles — ${dict.reservationForm.title} (Rue Jourdan 18)`,
      `• ${dict.reservationForm.dateLabel}: ${date}`,
      `• ${dict.reservationForm.timeLabel}: ${time}`,
      `• ${copy.passGuestLabel}: ${guestsDisplay} ${copy.guestsUnit}`,
      `• ${dict.reservationForm.zoneLabel}: ${zoneDisplay}`,
      fullName ? `• ${copy.passContactLabel}: ${fullName}` : '',
      phone ? `• ${dict.reservationForm.phoneLabel}: ${phone}` : '',
      email.trim() ? `• E-mail: ${email.trim()}` : '',
      occasionDisplay ? `• ${copy.passOccasionLabel}: ${occasionDisplay}` : '',
      notes.trim() ? `• ${copy.passMessageLabel}: ${notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const buildGoogleCalendarUrl = () => {
    if (!date || !time) return '#';
    const cleanDate = date.replace(/-/g, '');
    const [hh, mm] = time.split(':');
    const startHour = Number(hh) || 19;
    const endHour = Math.min(23, startHour + 2);
    const startStr = `${cleanDate}T${String(startHour).padStart(2, '0')}${mm || '00'}00`;
    const endStr = `${cleanDate}T${String(endHour).padStart(2, '0')}${mm || '00'}00`;
    const title = encodeURIComponent(
      `Pescobar Seafood Brussels — Rezervare masă (${guestsDisplay} pers.)`
    );
    const details = encodeURIComponent(
      `Rezervare masă la Pescobar Seafood Brussels.\nOaspete: ${fullName || 'Client'}\nZonă: ${zoneDisplay}\nTelefon: ${phone}\nAdresă: ${SITE_CONFIG.address.full}`
    );
    const location = encodeURIComponent(SITE_CONFIG.address.full);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
  };

  const buildWhatsAppHelpUrl = () => {
    const text = encodeURIComponent(
      `Bonjour Pescobar ! J'ai une réservation au nom de ${fullName || 'Client'} (${date} à ${time}, ${guestsDisplay} pers.). J'ai une question : `
    );
    return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`;
  };

  const zoneKeys: ZoneKey[] = ['mainDining', 'terrace', 'groupTable'];

  const handleTabClick = (targetStep: 1 | 2 | 3 | 4) => {
    if (targetStep === 4) {
      if (!firstNameInvalid && !lastNameInvalid && !phoneInvalid) {
        setShowStep3Errors(false);
        goToStep(4);
      } else {
        setDatePickerOpen(false);
        setStep(3);
        setShowStep3Errors(true);
        setTimeout(() => focusFirstInvalidField(step3ValidationFields()), 20);
      }
      return;
    }
    goToStep(targetStep);
  };

  return (
    <div
      ref={wizardCardRef}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] p-4 shadow-2xl sm:p-7 lg:p-8"
    >
      <OctopusTentacleSide side="right" className="opacity-20" />

      {/* Compact Interactive Progress Header (Single Octopus + Progressive Long Tentacle) */}
      <div className="relative z-10 mb-5 space-y-2 border-b border-white/10 pb-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-[#DFC286]">
              {copy.stepProgressLabel} {step}/4
            </span>
            <span className="text-white/30">•</span>
            <span className="text-white">{copy.stepLabels[step - 1]}</span>
          </div>
          <span className="hidden rounded-lg border border-[#C8A96A]/30 bg-[#070D17] px-2.5 py-1 text-[11px] font-semibold tabular-nums text-[#DFC286] sm:inline-block">
            {dict.nav.openHoursBadge}
          </span>
        </div>

        {/* Progressive Animated Octopus Tentacle Meter */}
        <OctopusTentacleProgress step={step} totalSteps={4} />

        <div
          role="tablist"
          aria-label="Étapes de réservation"
          className="grid grid-cols-4 gap-1.5 rounded-xl border border-white/10 bg-[#070D17] p-1"
        >
          {copy.stepLabels.map((label, index) => {
            const s = (index + 1) as 1 | 2 | 3 | 4;
            const isActive = step === s;
            const isDone = step > s;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabClick(s)}
                className={`flex min-h-[36px] items-center justify-center rounded-lg px-2 py-1.5 text-center text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#C8A96A] text-[#070D17] shadow-sm'
                    : isDone
                    ? 'bg-white/5 text-[#DFC286] hover:bg-white/10'
                    : 'text-white/55 hover:bg-white/5 hover:text-white/85'
                }`}
              >
                <span className="sm:hidden">0{s}</span>
                <span className="hidden truncate sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Guests & Date */}
      {step === 1 && (
        <div className="relative z-10 space-y-7">
          {/* 1. Number of Guests (1 to 9+) */}
          <div>
            <div className="mb-2.5 flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-[#B8C7DC]">
                <Users className="h-3.5 w-3.5 text-[#C8A96A]" />
                <span>{copy.guestsTitle}</span>
              </label>
              <span className="text-xs font-semibold text-[#DFC286]">
                {guestsDisplay} {copy.guestsUnit}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:grid-cols-9">
              {GUEST_COUNTS.map((num) => {
                const isActive = guests === num;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      setGuests(num);
                      if (num >= 5) setZone('groupTable');
                    }}
                    className={`h-11 rounded-xl border text-sm tabular-nums transition-all ${
                      isActive
                        ? 'border-[#C8A96A] bg-[#C8A96A] font-bold text-[#070D17] shadow-md'
                        : 'border-white/15 bg-[#070D17] font-semibold text-[#B8C7DC] hover:border-[#C8A96A]/50 hover:text-white'
                    }`}
                  >
                    {num === 9 ? '9+' : num}
                  </button>
                );
              })}
            </div>

            {guests === 9 && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#C8A96A]/40 bg-[#070D17] px-4 py-3">
                <span className="text-xs font-bold text-[#DFC286]">
                  {activeLocale === 'nl'
                    ? 'Exact aantal gasten'
                    : activeLocale === 'en'
                    ? 'Exact number of guests'
                    : activeLocale === 'ro'
                    ? 'Număr exact de persoane'
                    : 'Nombre exact de convives'}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomGuests((c) => Math.max(9, c - 1))}
                    aria-label="-"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#0C1524] text-base font-bold text-white transition-colors hover:border-[#C8A96A]"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={9}
                    max={120}
                    value={customGuests}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setCustomGuests(Number.isNaN(val) ? 9 : Math.min(120, Math.max(9, val)));
                    }}
                    className="h-10 w-16 rounded-lg border border-[#C8A96A]/50 bg-[#0C1524] text-center text-sm font-extrabold tabular-nums text-white focus:border-[#C8A96A] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setCustomGuests((c) => Math.min(120, c + 1))}
                    aria-label="+"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-[#0C1524] text-base font-bold text-white transition-colors hover:border-[#C8A96A]"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. Date Selection: Astăzi | Mâine | Alege data (+ modern calendar) */}
          <div ref={dateActionEndRef} className="scroll-mb-4 space-y-7">
            <div>
              <div className="mb-2.5 flex items-center justify-between gap-2">
                <label
                  htmlFor="res-date"
                  className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-[#B8C7DC]"
                >
                  <Calendar className="h-3.5 w-3.5 text-[#C8A96A]" />
                  <span>{copy.dateTitle}</span>
                </label>
                <span className="text-xs font-semibold tabular-nums text-[#DFC286]">
                  {formatShortLocalizedDate(date, activeLocale)}
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setDate(todayStr);
                      setDatePickerOpen(false);
                    }}
                    className={`h-11 rounded-xl border px-3 text-xs font-bold transition-all ${
                      date === todayStr && !datePickerOpen
                        ? 'border-[#C8A96A] bg-[#C8A96A] text-[#070D17]'
                        : 'border-white/15 bg-[#070D17] text-white/80 hover:border-[#C8A96A]/50 hover:text-white'
                    }`}
                  >
                    {copy.todayBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDate(tomorrowStr);
                      setDatePickerOpen(false);
                    }}
                    className={`h-11 rounded-xl border px-3 text-xs font-bold transition-all ${
                      date === tomorrowStr && !datePickerOpen
                        ? 'border-[#C8A96A] bg-[#C8A96A] text-[#070D17]'
                        : 'border-white/15 bg-[#070D17] text-white/80 hover:border-[#C8A96A]/50 hover:text-white'
                    }`}
                  >
                    {copy.tomorrowBtn}
                  </button>
                  <button
                    id="res-date"
                    type="button"
                    aria-expanded={datePickerOpen}
                    onClick={() => {
                      const nextOpen = !datePickerOpen;
                      setDatePickerOpen(nextOpen);
                      if (nextOpen) {
                        setTimeout(
                          () =>
                            dateActionEndRef.current?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'end',
                            }),
                          70
                        );
                      }
                    }}
                    className={`flex h-11 items-center justify-center gap-1 rounded-xl border px-1.5 text-[11px] font-bold whitespace-nowrap transition-all sm:gap-1.5 sm:px-3 sm:text-xs ${
                      datePickerOpen || (date !== todayStr && date !== tomorrowStr)
                        ? 'border-[#C8A96A] bg-[#C8A96A] text-[#070D17]'
                        : 'border-white/15 bg-[#070D17] text-white/80 hover:border-[#C8A96A]/50 hover:text-white'
                    }`}
                  >
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span>
                      {date !== todayStr && date !== tomorrowStr
                        ? formatShortLocalizedDate(date, activeLocale)
                        : copy.pickDateBtn}
                    </span>
                  </button>
                </div>

                <ModernDatePicker
                  locale={activeLocale}
                  value={date}
                  onChange={setDate}
                  minDate={todayStr}
                  open={datePickerOpen}
                  onOpenChange={setDatePickerOpen}
                  hideTrigger
                />
              </div>
            </div>

            {/* Step 1 -> Step 2 CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => goToStep(2)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-6 text-sm font-bold text-[#070D17] shadow-lg transition-all hover:bg-[#DFC286]"
              >
                <span>{copy.continueBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Time & Zone */}
      {step === 2 && (
        <div className="relative z-10 space-y-4 sm:space-y-6">
          {/* Compact Step 1 Recap Bar */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-[#C8A96A]/35 bg-[#070D17] px-3.5 py-2.5 sm:px-4 sm:py-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold sm:text-sm">
              <span className="inline-flex items-center gap-1.5 font-bold tabular-nums text-[#DFC286]">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
                {formatShortLocalizedDate(date, activeLocale)}
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-white">
                <Users className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
                {guestsDisplay} {copy.guestsUnit}
              </span>
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="shrink-0 rounded-lg border border-white/15 bg-[#0C1524] px-3 py-1.5 text-xs font-bold text-[#DFC286] transition-colors hover:border-[#C8A96A] hover:text-white"
            >
              {copy.summaryModifyBtn}
            </button>
          </div>

          {/* Continuous Time Slot Grid */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-[#B8C7DC] sm:mb-2.5">
              <Clock className="h-3.5 w-3.5 text-[#C8A96A]" />
              <span>{copy.timeTitle}</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7 sm:gap-2">
              {ALL_TIME_SLOTS.map((slot) => {
                const isActive = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => handleSelectTime(slot)}
                    className={`h-9 rounded-xl border text-xs tabular-nums transition-all sm:h-11 ${
                      isActive
                        ? 'border-[#C8A96A] bg-[#C8A96A] font-bold text-[#070D17] shadow-sm'
                        : 'border-white/15 bg-[#070D17] font-semibold text-[#B8C7DC] hover:border-[#C8A96A]/50 hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seating Preference (3 Clean Cards) */}
          <div ref={seatingSectionRef}>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase text-[#B8C7DC] sm:mb-2.5">
              <MapPin className="h-3.5 w-3.5 text-[#C8A96A]" />
              <span>{copy.zoneTitle}</span>
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-2.5">
              {zoneKeys.map((zoneKey) => {
                const isActive = zone === zoneKey;
                const zoneInfo = copy.zones[zoneKey];
                return (
                  <button
                    key={zoneKey}
                    type="button"
                    onClick={() => handleSelectZone(zoneKey)}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all sm:p-4 ${
                      isActive
                        ? 'border-[#C8A96A] bg-[#C8A96A] text-[#070D17] shadow-md'
                        : 'border-white/15 bg-[#070D17] text-white hover:border-[#C8A96A]/50'
                    }`}
                  >
                    <span className="text-xs font-extrabold sm:text-sm">
                      {zoneInfo.title}
                    </span>
                    <span
                      className={`mt-1 text-[11px] leading-snug ${
                        isActive ? 'text-[#070D17]/80' : 'text-[#B8C7DC]'
                      }`}
                    >
                      {zoneInfo.subtitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2 Nav Buttons */}
          <div
            ref={step2ActionsRef}
            className="flex flex-col-reverse gap-3 scroll-mb-6 pt-1 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-[#070D17] px-6 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-[#C8A96A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{copy.backBtn}</span>
            </button>

            <button
              type="button"
              onClick={() => goToStep(3)}
              className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-6 text-sm font-bold text-[#070D17] shadow-lg transition-all hover:bg-[#DFC286] sm:w-auto sm:flex-1"
            >
              <span>{copy.continueBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Contact, Occasion & Notes */}
      {step === 3 && (
        <form
          onSubmit={handleStep3Submit}
          noValidate
          className="relative z-10 space-y-6"
        >
          {/* Live Selection Summary Bar */}
          <div className="flex items-center justify-between gap-3 rounded-xl border border-[#C8A96A]/35 bg-[#070D17] px-3.5 py-3 sm:px-4">
            <div className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-1.5 text-xs font-semibold sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:text-sm">
              <span className="inline-flex items-center gap-1.5 font-bold tabular-nums text-[#DFC286]">
                <Calendar className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
                <span className="truncate">{formatShortLocalizedDate(date, activeLocale)}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold tabular-nums text-white">
                <Clock className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
                <span>{time}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-white">
                <Users className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
                <span className="truncate">{guestsDisplay} {copy.guestsUnit}</span>
              </span>
              <span className="inline-flex min-w-0 items-center gap-1.5 text-[#C8D4E6]">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
                <span className="truncate">{zoneDisplay}</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => goToStep(2)}
              className="shrink-0 rounded-lg border border-white/15 bg-[#0C1524] px-3 py-1.5 text-xs font-bold text-[#DFC286] transition-colors hover:border-[#C8A96A] hover:text-white"
            >
              {copy.summaryModifyBtn}
            </button>
          </div>

          {/* Guest Contact Inputs: Compact 2-Column Names on Mobile & Desktop */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label
                htmlFor="res-first-name"
                className={`mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                  firstNameMissing
                )}`}
              >
                {copy.firstNameLabel}
              </label>
              <input
                id="res-first-name"
                type="text"
                required
                aria-invalid={firstNameMissing}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={copy.firstNamePlaceholder}
                className={`h-11 w-full rounded-xl border px-3 text-sm text-white placeholder:text-white/30 transition-colors focus:outline-none sm:h-12 sm:px-4 ${getFieldBorderClass(
                  firstNameMissing
                )}`}
              />
              {firstNameMissing && (
                <p className="mt-1.5 text-xs font-medium text-rose-400">
                  {REQUIRED_FIELD_ERROR[activeLocale]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="res-last-name"
                className={`mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                  lastNameMissing
                )}`}
              >
                {copy.lastNameLabel}
              </label>
              <input
                id="res-last-name"
                type="text"
                required
                aria-invalid={lastNameMissing}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={copy.lastNamePlaceholder}
                className={`h-11 w-full rounded-xl border px-3 text-sm text-white placeholder:text-white/30 transition-colors focus:outline-none sm:h-12 sm:px-4 ${getFieldBorderClass(
                  lastNameMissing
                )}`}
              />
              {lastNameMissing && (
                <p className="mt-1.5 text-xs font-medium text-rose-400">
                  {REQUIRED_FIELD_ERROR[activeLocale]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div>
              <label
                htmlFor="res-phone"
                className={`mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                  phoneMissing
                )}`}
              >
                {copy.phoneLabel}
              </label>
              <input
                id="res-phone"
                type="tel"
                required
                aria-invalid={phoneMissing}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={copy.phonePlaceholder}
                className={`h-11 w-full rounded-xl border px-3.5 text-sm tabular-nums text-white placeholder:text-white/30 transition-colors focus:outline-none sm:h-12 sm:px-4 ${getFieldBorderClass(
                  phoneMissing
                )}`}
              />
              {phoneMissing && (
                <p className="mt-1.5 text-xs font-medium text-rose-400">
                  {REQUIRED_FIELD_ERROR[activeLocale]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="res-email"
                className="mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase text-[#B8C7DC]"
              >
                {copy.emailLabel}
              </label>
              <input
                id="res-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.emailPlaceholder}
                className="h-11 w-full rounded-xl border border-white/15 bg-[#070D17] px-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-[#C8A96A] focus:outline-none sm:h-12 sm:px-4"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="res-occasion"
              className="mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase text-[#B8C7DC]"
            >
              {copy.occasionLabel}
            </label>
            <input
              id="res-occasion"
              type="text"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder={copy.occasionPlaceholder}
              className="h-11 w-full rounded-xl border border-white/15 bg-[#070D17] px-3.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-[#C8A96A] focus:outline-none sm:h-12 sm:px-4"
            />
          </div>

          {/* Concise Special Requests Note */}
          <div>
            <label
              htmlFor="res-notes"
              className="mb-1.5 flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-[#B8C7DC]"
            >
              <PenLine className="h-3.5 w-3.5 text-[#C8A96A]" />
              <span>{copy.messageLabel}</span>
            </label>

            <textarea
              id="res-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={copy.messagePlaceholder}
              className="w-full rounded-xl border border-white/15 bg-[#070D17] p-3.5 text-sm leading-relaxed text-white placeholder:text-white/35 transition-colors focus:border-[#C8A96A] focus:outline-none sm:p-4"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-[#070D17] px-6 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:border-[#C8A96A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{copy.backBtn}</span>
            </button>

            <button
              type="submit"
              className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-6 text-sm font-bold text-[#070D17] shadow-lg transition-all hover:bg-[#DFC286] sm:w-auto sm:flex-1"
            >
              <span>{copy.validateBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: Luxury Confirmation Pass & Direct Guest Utility */}
      {step === 4 && (
        <div className="relative z-10 space-y-6">
          <div className="relative overflow-hidden rounded-3xl border border-[#C8A96A]/35 bg-gradient-to-b from-[#0E1A2C] via-[#09111E] to-[#050912] p-5 sm:p-8 md:p-10 shadow-2xl">
            <OctopusCornerTentacles position="bottom-right" className="opacity-20 pointer-events-none" />

            {/* Success Header with Glowing Badge */}
            <div className="relative z-10 flex flex-col items-center text-center pb-6 sm:pb-8 border-b border-white/10">
              <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500/20 via-[#C8A96A]/20 to-transparent border border-emerald-400/40 text-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.25)]">
                <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400 animate-in zoom-in-50 duration-300" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                </span>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-bold tracking-[0.2em] uppercase text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>{copy.passKicker}</span>
              </div>

              <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl lg:text-4xl tracking-tight">
                {copy.passTitle}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#B8C7DC] max-w-xl">
                {copy.passSubtitle}
              </p>
            </div>

            {/* Ticket Details Grid */}
            <div className="relative z-10 mt-5 grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-[#0C1524] p-4 text-xs sm:grid-cols-4">
              <div>
                <span className="text-[#B8C7DC]">
                  {dict.reservationForm.dateLabel}
                </span>
                <p className="mt-1 text-sm font-extrabold tabular-nums text-white">
                  {formatShortLocalizedDate(date, activeLocale)}
                </p>
              </div>
              <div>
                <span className="text-[#B8C7DC]">
                  {dict.reservationForm.timeLabel}
                </span>
                <p className="mt-1 text-sm font-extrabold tabular-nums text-[#DFC286]">
                  {time}
                </p>
              </div>
              <div>
                <span className="text-[#B8C7DC]">{copy.passGuestLabel}</span>
                <p className="mt-1 text-sm font-extrabold tabular-nums text-white">
                  {guestsDisplay} {copy.guestsUnit}
                </p>
              </div>
              <div>
                <span className="text-[#B8C7DC]">
                  {dict.reservationForm.zoneLabel}
                </span>
                <p className="mt-1 text-sm font-extrabold text-white">
                  {zoneDisplay}
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-4 rounded-xl border border-white/10 bg-[#0C1524]/70 p-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-medium text-[#8E9EB5]">
                    {copy.passContactLabel}
                  </span>
                  <p className="text-sm font-extrabold text-white">
                    {fullName || '—'}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-0.5">
                    {phone && (
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="inline-flex items-center gap-1.5 font-semibold tabular-nums text-[#DFC286] hover:underline"
                      >
                        <Phone className="h-3 w-3" />
                        <span>{phone}</span>
                      </a>
                    )}
                    {email && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] text-[#A6B6CC]">
                        <Mail className="h-3 w-3 text-[#C8A96A]" />
                        <span>{email}</span>
                      </span>
                    )}
                  </div>
                </div>

                {meaningfulOccasion && (
                  <div className="sm:text-right">
                    <span className="text-[11px] font-medium text-[#8E9EB5]">
                      {copy.passOccasionLabel}
                    </span>
                    <p className="mt-0.5 text-xs sm:text-sm font-bold text-white">
                      {meaningfulOccasion}
                    </p>
                  </div>
                )}
              </div>

              {meaningfulNotes && (
                <div className="mt-3.5 rounded-lg border border-white/10 bg-[#070D17]/70 p-3">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#C8A96A]">
                    <MessageSquare className="h-3 w-3" />
                    {copy.passMessageLabel}
                  </span>
                  <p className="mt-1 text-xs italic leading-relaxed text-white/90">
                    “{meaningfulNotes}”
                  </p>
                </div>
              )}
            </div>

            {/* Direct High-Value Actions (Map Directions & Calendar) */}
            <div className="relative z-10 mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={SITE_CONFIG.address.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#C8A96A] to-[#DFC286] px-5 py-3 text-xs sm:text-sm font-black text-[#070D17] shadow-lg transition-all hover:brightness-105 active:scale-[0.99]"
              >
                <MapPin className="h-4 w-4" />
                <span>{copy.directionsBtn}</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href={buildGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-[#0C1524] px-5 py-3 text-xs sm:text-sm font-bold text-white transition-all hover:border-[#C8A96A] hover:bg-[#101C30] active:scale-[0.99]"
              >
                <Calendar className="h-4 w-4 text-[#C8A96A]" />
                <span>{copy.calendarBtn}</span>
              </a>
            </div>

            {/* Discreet Support Row */}
            <div className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0C1524]/40 px-4 py-2.5 text-xs text-[#8E9EB5]">
              <span>{copy.helpLabel}</span>
              <div className="flex items-center gap-2">
                <a
                  href={buildWhatsAppHelpUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 flex items-center gap-1"
                >
                  <MessageSquare className="h-3 w-3" />
                  <span>{copy.helpWhatsApp}</span>
                </a>
                <span>•</span>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="font-bold text-[#DFC286] hover:text-white underline underline-offset-2 flex items-center gap-1"
                >
                  <Phone className="h-3 w-3" />
                  <span>{copy.helpCall}</span>
                </a>
              </div>
            </div>

            {/* Final Step Useful Pre-Visit CTAs: Menu & Address / Directions */}
            <div className="relative z-10 mt-7 border-t border-white/10 pt-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C8A96A]">
                  {copy.beforeVisitKicker}
                </span>
                <span className="text-xs font-medium text-[#B8C7DC]">
                  — {copy.beforeVisitTitle}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {/* CTA 1: Browse the Menu */}
                <Link
                  href={`/${activeLocale}/menu`}
                  className="group flex flex-col justify-between rounded-xl border border-[#C8A96A]/35 bg-[#0C1524] p-4 transition-all hover:border-[#C8A96A] hover:bg-[#101C30]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8A96A]/15 text-[#DFC286]">
                        <UtensilsCrossed className="h-4 w-4" />
                      </span>
                      <ArrowRight className="h-4 w-4 text-[#C8A96A] transition-transform group-hover:translate-x-1" />
                    </div>
                    <h4 className="mt-3 text-sm font-extrabold text-white">
                      {copy.menuCtaTitle}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#B8C7DC]">
                      {copy.menuCtaDesc}
                    </p>
                  </div>
                  <span className="mt-3 text-xs font-bold tracking-wider uppercase text-[#DFC286]">
                    {copy.menuCtaBtn} →
                  </span>
                </Link>

                {/* CTA 2: Restaurant Address & Directions */}
                <div className="flex flex-col justify-between rounded-xl border border-white/15 bg-[#0C1524] p-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8A96A]/15 text-[#DFC286]">
                        <MapPin className="h-4 w-4" />
                      </span>
                    </div>
                    <h4 className="mt-3 text-sm font-extrabold text-white">
                      {copy.addressCtaTitle}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#B8C7DC]">
                      {copy.addressCtaDesc}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/${activeLocale}/contact`}
                      className="text-xs font-bold tracking-wider uppercase text-[#DFC286] transition-colors hover:text-white"
                    >
                      {copy.addressCtaBtn} →
                    </Link>
                    <a
                      href={SITE_CONFIG.address.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 transition-colors hover:text-[#DFC286]"
                    >
                      <span>{copy.mapsCtaBtn}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-6 flex justify-center border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => {
                  setGuests(2);
                  setDate(todayStr);
                  setTime('19:30');
                  setZone('mainDining');
                  setFirstName('');
                  setLastName('');
                  setPhone('');
                  setEmail('');
                  setOccasion('');
                  setNotes('');
                  goToStep(1);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8E9EB5] transition-colors hover:text-[#DFC286]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{copy.newReservationBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
