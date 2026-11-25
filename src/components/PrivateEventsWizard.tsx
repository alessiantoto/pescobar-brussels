'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  PenLine,
  Phone,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { SITE_CONFIG, type Locale } from '@/config/site';
import {
  OctopusCornerTentacles,
  OctopusTentacleSide,
} from '@/components/OctopusAccents';
import { OctopusTentacleProgress } from '@/components/OctopusTentacleProgress';
import { ModernDatePicker } from '@/components/ModernDatePicker';
import {
  focusFirstInvalidField,
  getFieldBorderClass,
  getFieldLabelClass,
  INVALID_EMAIL_ERROR,
  isValidEmail,
  REQUIRED_FIELD_ERROR,
  scrollToElementBelowNavbar,
} from '@/lib/formValidation';

export interface PrivateEventsWizardCopy {
  eventTypeLabel: string;
  eventTypes: [string, string, string, string];
  dateLabel: string;
  guestsLabel: string;
  guestsPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  emailLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  sendEmailCta: string;
  sendWhatsappCta: string;
  directNote: string;
}

interface WizardUiCopy {
  stepLabels: [string, string, string];
  stepProgressLabel: string;
  tablistAriaLabel: string;
  guestPresets: string[];
  continueBtn: string;
  backBtn: string;
  reviewBtn: string;
  editBtn: string;
  firstNameLabel: string;
  firstNamePlaceholder: string;
  lastNameLabel: string;
  lastNamePlaceholder: string;
  companyOptionalLabel: string;
  companyPlaceholder: string;
  emailPlaceholder: string;
  summaryKicker: string;
  summaryTitle: string;
  summarySubtitle: string;
  nameDisplayLabel: string;
  notesDisplayLabel: string;
  nextKicker: string;
  nextTitle: string;
  menuTitle: string;
  menuDesc: string;
  menuBtn: string;
  addressTitle: string;
  addressDesc: string;
  addressBtn: string;
  mapsBtn: string;
}

const UI_COPY: Record<Locale, WizardUiCopy> = {
  fr: {
    stepLabels: ['01. Format & Date', '02. Coordonnées & Brief', '03. Envoi & Accès'],
    stepProgressLabel: 'Étape',
    tablistAriaLabel: 'Étapes de demande événementielle',
    guestPresets: ['8–12', '12–20', '20–35', '35–50+'],
    continueBtn: 'Continuer',
    backBtn: 'Retour',
    reviewBtn: 'Vérifier la demande',
    editBtn: 'Modifier',
    firstNameLabel: 'Prénom',
    firstNamePlaceholder: 'Ex : Jean',
    lastNameLabel: 'Nom',
    lastNamePlaceholder: 'Ex : Dupont',
    companyOptionalLabel: 'Société (optionnel)',
    companyPlaceholder: 'Ex : Cabinet Horizon',
    emailPlaceholder: 'contact@entreprise.com',
    summaryKicker: 'DOSSIER ÉVÉNEMENT PRÊT',
    summaryTitle: 'Votre demande sur mesure est prête',
    summarySubtitle:
      'Envoyez-la en un clic sur WhatsApp Direct ou par e-mail officiel pour recevoir notre proposition personnalisée.',
    nameDisplayLabel: 'Contact / Société',
    notesDisplayLabel: 'Détails & souhaits',
    nextKicker: 'PRÉPARER VOTRE ÉVÉNEMENT',
    nextTitle: 'Explorez le menu et réservez votre événement • Rue Jourdan 18',
    menuTitle: 'Consulter toute la carte',
    menuDesc: 'Seafood Boil, plateaux royaux, vins et champagnes pour vos invités.',
    menuBtn: 'Voir le menu',
    addressTitle: 'Visiter Rue Jourdan 18',
    addressDesc: 'Rue Jourdan 18, 1060 Saint-Gilles • Ouvert 7j/7 (12:00 – 23:00).',
    addressBtn: 'Adresse & accès',
    mapsBtn: 'Google Maps',
  },
  nl: {
    stepLabels: ['01. Formule & Datum', '02. Gegevens & Wensen', '03. Verzending & Adres'],
    stepProgressLabel: 'Stap',
    tablistAriaLabel: 'Stappen evenementaanvraag',
    guestPresets: ['8–12', '12–20', '20–35', '35–50+'],
    continueBtn: 'Doorgaan',
    backBtn: 'Terug',
    reviewBtn: 'Aanvraag nakijken',
    editBtn: 'Wijzigen',
    firstNameLabel: 'Voornaam',
    firstNamePlaceholder: 'Bijv. Jan',
    lastNameLabel: 'Achternaam',
    lastNamePlaceholder: 'Bijv. Peeters',
    companyOptionalLabel: 'Bedrijf (optioneel)',
    companyPlaceholder: 'Bijv. Horizon Partners',
    emailPlaceholder: 'contact@bedrijf.be',
    summaryKicker: 'AANVRAAG KLAAR',
    summaryTitle: 'Uw groepsaanvraag is voorbereid',
    summarySubtitle:
      'Verstuur uw aanvraag in één klik via WhatsApp of e-mail en ontvang snel een voorstel op maat.',
    nameDisplayLabel: 'Contactpersoon / Bedrijf',
    notesDisplayLabel: 'Details & menuwensen',
    nextKicker: 'VOORBEREIDING',
    nextTitle: 'Ontdek het menu en boek uw evenement • Rue Jourdan 18',
    menuTitle: 'Menukaart bekijken',
    menuDesc: 'Seafood Boil, koninklijke schotels, wijnen en champagnes voor uw gasten.',
    menuBtn: 'Naar de kaart',
    addressTitle: 'Bezoek Rue Jourdan 18',
    addressDesc: 'Rue Jourdan 18, 1060 Sint-Gillis • 7/7 geopend (12:00 – 23:00).',
    addressBtn: 'Adres & route',
    mapsBtn: 'Google Maps',
  },
  en: {
    stepLabels: ['01. Event & Date', '02. Contact & Brief', '03. Send & Location'],
    stepProgressLabel: 'Step',
    tablistAriaLabel: 'Event inquiry steps',
    guestPresets: ['8–12', '12–20', '20–35', '35–50+'],
    continueBtn: 'Continue',
    backBtn: 'Back',
    reviewBtn: 'Review inquiry',
    editBtn: 'Edit',
    firstNameLabel: 'First Name',
    firstNamePlaceholder: 'E.g. John',
    lastNameLabel: 'Last Name',
    lastNamePlaceholder: 'E.g. Smith',
    companyOptionalLabel: 'Company (optional)',
    companyPlaceholder: 'E.g. Horizon Group',
    emailPlaceholder: 'contact@company.com',
    summaryKicker: 'EVENT BRIEF READY',
    summaryTitle: 'Your bespoke group inquiry is ready',
    summarySubtitle:
      'Send your brief directly via WhatsApp or official email to receive a tailored proposal.',
    nameDisplayLabel: 'Contact / Company',
    notesDisplayLabel: 'Notes & preferences',
    nextKicker: 'PLAN YOUR GATHERING',
    nextTitle: 'Explore the Menu & Book Your Event • Rue Jourdan 18',
    menuTitle: 'Browse the Full Menu',
    menuDesc: 'Explore Seafood Boil pots, signature platters, wines and champagne options.',
    menuBtn: 'View Menu',
    addressTitle: 'Visit Rue Jourdan 18',
    addressDesc: 'Rue Jourdan 18, 1060 Saint-Gilles • Open daily 12:00 – 23:00.',
    addressBtn: 'Address & Access',
    mapsBtn: 'Google Maps',
  },
  ro: {
    stepLabels: ['01. Format & Dată', '02. Contact & Detalii', '03. Trimitere & Acces'],
    stepProgressLabel: 'Pasul',
    tablistAriaLabel: 'Pașii solicitării de eveniment',
    guestPresets: ['8–12', '12–20', '20–35', '35–50+'],
    continueBtn: 'Continuă',
    backBtn: 'Înapoi',
    reviewBtn: 'Verifică cererea',
    editBtn: 'Modifică',
    firstNameLabel: 'Prenume',
    firstNamePlaceholder: 'Ex: Andrei',
    lastNameLabel: 'Nume',
    lastNamePlaceholder: 'Ex: Popescu',
    companyOptionalLabel: 'Companie (opțional)',
    companyPlaceholder: 'Ex: Horizon Partners',
    emailPlaceholder: 'contact@companie.com',
    summaryKicker: 'CERERE PREGĂTITĂ',
    summaryTitle: 'Solicitarea ta pentru eveniment este gata',
    summarySubtitle:
      'Trimite detaliile printr-un singur click pe WhatsApp Direct sau prin e-mail pentru o propunere personalizată.',
    nameDisplayLabel: 'Nume / Companie',
    notesDisplayLabel: 'Detalii & preferințe',
    nextKicker: 'PREGĂTEȘTE EVENIMENTUL',
    nextTitle: 'Descoperă meniul și rezervă evenimentul • Rue Jourdan 18',
    menuTitle: 'Descoperă Meniul Complet',
    menuDesc: 'Seafood Boil, platouri regale, vinuri și șampanii pentru invitații tăi.',
    menuBtn: 'Vezi Meniul',
    addressTitle: 'Vizitează Rue Jourdan 18',
    addressDesc: 'Rue Jourdan 18, 1060 Saint-Gilles • Deschis zilnic 12:00 – 23:00.',
    addressBtn: 'Adresă & acces',
    mapsBtn: 'Google Maps',
  },
};

export function PrivateEventsWizard({
  locale,
  copy,
}: {
  locale: Locale;
  copy: PrivateEventsWizardCopy;
}) {
  const ui = UI_COPY[locale] ?? UI_COPY.fr;
  const wizardCardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [eventType, setEventType] = useState<string>(copy.eventTypes[0]);
  const [date, setDate] = useState<string>('');
  const [guests, setGuests] = useState<string>('12–20');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showStep1Errors, setShowStep1Errors] = useState<boolean>(false);
  const [showStep2Errors, setShowStep2Errors] = useState<boolean>(false);

  const guestsInvalid = !guests.trim();
  const guestsMissing = showStep1Errors && guestsInvalid;

  const firstNameInvalid = !firstName.trim();
  const lastNameInvalid = !lastName.trim();
  const phoneInvalid = !phone.trim();
  const emailInvalid = Boolean(email.trim()) && !isValidEmail(email);

  const firstNameMissing = showStep2Errors && firstNameInvalid;
  const lastNameMissing = showStep2Errors && lastNameInvalid;
  const phoneMissing = showStep2Errors && phoneInvalid;
  const emailHasError = showStep2Errors && emailInvalid;

  const step2ValidationFields = () => [
    { id: 'pe-first-name', invalid: !firstName.trim() },
    { id: 'pe-last-name', invalid: !lastName.trim() },
    { id: 'pe-phone', invalid: !phone.trim() },
    {
      id: 'pe-email',
      invalid: Boolean(email.trim()) && !isValidEmail(email),
    },
  ];

  const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');
  const contactDisplay = company.trim()
    ? `${fullName} (${company.trim()})`
    : fullName;

  const buildSummaryText = () => {
    return [
      `Pescobar Seafood — ${eventType}`,
      date ? `• ${copy.dateLabel}: ${date}` : '',
      guests ? `• ${copy.guestsLabel}: ${guests}` : '',
      contactDisplay ? `• ${copy.nameLabel}: ${contactDisplay}` : '',
      phone ? `• ${copy.phoneLabel}: ${phone}` : '',
      email ? `• ${copy.emailLabel}: ${email}` : '',
      message.trim() ? `\n${message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const mailtoUrl = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
    `Pescobar — ${eventType}${date ? ` (${date})` : ''}${contactDisplay ? ` — ${contactDisplay}` : ''}`
  )}&body=${encodeURIComponent(buildSummaryText())}`;

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    buildSummaryText()
  )}`;

  const goToStep = (nextStep: 1 | 2 | 3) => {
    setStep(nextStep);
    scrollToElementBelowNavbar(wizardCardRef.current);
  };

  const handleStep1Next = () => {
    if (guestsInvalid) {
      setShowStep1Errors(true);
      focusFirstInvalidField([{ id: 'pe-guests', invalid: true }]);
      return;
    }
    setShowStep1Errors(false);
    goToStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstNameInvalid || lastNameInvalid || phoneInvalid || emailInvalid) {
      setShowStep2Errors(true);
      focusFirstInvalidField(step2ValidationFields());
      return;
    }
    setShowStep2Errors(false);

    // Send private event notification to restaurant and receipt to customer
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'private_event',
        event_type: eventType,
        event_date: date || null,
        guests_count: guests || null,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        company: company.trim() || null,
        email: email.trim() || null,
        phone: phone.trim(),
        message: message.trim() || null,
        locale,
      }),
    }).catch(() => {});

    goToStep(3);
  };

  const handleTabClick = (targetStep: 1 | 2 | 3) => {
    if (targetStep === 1) {
      goToStep(1);
      return;
    }
    if (guestsInvalid) {
      setStep(1);
      setShowStep1Errors(true);
      setTimeout(
        () => focusFirstInvalidField([{ id: 'pe-guests', invalid: true }]),
        20
      );
      return;
    }
    setShowStep1Errors(false);
    if (targetStep === 2) {
      goToStep(2);
      return;
    }
    if (firstNameInvalid || lastNameInvalid || phoneInvalid || emailInvalid) {
      setStep(2);
      setShowStep2Errors(true);
      setTimeout(() => focusFirstInvalidField(step2ValidationFields()), 20);
      return;
    }
    setShowStep2Errors(false);
    goToStep(3);
  };

  return (
    <div
      ref={wizardCardRef}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] p-4 shadow-2xl sm:p-7 lg:p-8"
    >
      <OctopusTentacleSide side="right" className="opacity-20" />

      {/* Compact Interactive Progress Header */}
      <div className="relative z-10 mb-5 space-y-2 border-b border-white/10 pb-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-xs font-bold">
            <span className="text-[#DFC286]">
              {ui.stepProgressLabel} {step}/3
            </span>
            <span className="text-white/30">•</span>
            <span className="text-white">{ui.stepLabels[step - 1]}</span>
          </h2>
          <span className="hidden rounded-lg border border-[#C8A96A]/30 bg-[#070D17] px-2.5 py-1 text-[11px] font-semibold tabular-nums text-[#DFC286] sm:inline-block">
            {SITE_CONFIG.vatNumber}
          </span>
        </div>

        <OctopusTentacleProgress step={step} totalSteps={3} />

        <div
          role="tablist"
          aria-label={ui.tablistAriaLabel}
          className="grid grid-cols-3 gap-1.5 rounded-xl border border-white/10 bg-[#070D17] p-1"
        >
          {ui.stepLabels.map((label, idx) => {
            const s = (idx + 1) as 1 | 2 | 3;
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

      {/* STEP 1: Format, Guests & Date */}
      {step === 1 && (
        <div className="relative z-10 space-y-6">
          {/* Event Format Cards */}
          <div>
            <label className="mb-2.5 block text-xs font-bold tracking-[0.12em] uppercase text-[#B8C7DC]">
              {copy.eventTypeLabel}
            </label>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {copy.eventTypes.map((typeOption) => {
                const active = eventType === typeOption;
                return (
                  <button
                    key={typeOption}
                    type="button"
                    onClick={() => setEventType(typeOption)}
                    className={`min-h-[52px] rounded-xl border px-4 py-3 text-left text-xs font-bold transition-all sm:text-sm ${
                      active
                        ? 'border-[#C8A96A] bg-[#C8A96A] text-[#070D17] shadow-md'
                        : 'border-white/15 bg-[#070D17] text-white hover:border-[#C8A96A]/50'
                    }`}
                  >
                    {typeOption}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guest Count + Preferred Date */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <label
                htmlFor="pe-guests"
                className={`mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                  guestsMissing
                )}`}
              >
                <Users
                  className={`h-3.5 w-3.5 ${
                    guestsMissing ? 'text-rose-400' : 'text-[#C8A96A]'
                  }`}
                />
                <span>{copy.guestsLabel}</span>
              </label>
              <div className="mb-2 grid grid-cols-4 gap-2">
                {ui.guestPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setGuests(preset)}
                    className={`h-10 rounded-xl border text-xs font-bold tabular-nums transition-all ${
                      guests === preset
                        ? 'border-[#C8A96A] bg-[#C8A96A] text-[#070D17]'
                        : 'border-white/15 bg-[#070D17] text-[#B8C7DC] hover:border-[#C8A96A]/50 hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <input
                id="pe-guests"
                type="text"
                aria-invalid={guestsMissing}
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                placeholder={copy.guestsPlaceholder}
                className={`h-11 w-full rounded-xl border px-3.5 text-sm font-medium tabular-nums text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:outline-none ${getFieldBorderClass(
                  guestsMissing
                )}`}
              />
              {guestsMissing && (
                <p className="mt-1.5 text-xs font-medium text-rose-400">
                  {REQUIRED_FIELD_ERROR[locale]}
                </p>
              )}
            </div>

            <div className="sm:col-span-5">
              <label
                htmlFor="pe-date"
                className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-[#B8C7DC]"
              >
                <Calendar className="h-3.5 w-3.5 text-[#C8A96A]" />
                <span>{copy.dateLabel}</span>
              </label>
              <ModernDatePicker
                id="pe-date"
                locale={locale}
                value={date}
                onChange={setDate}
                allowClear
              />
            </div>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={handleStep1Next}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-6 text-sm font-bold text-[#070D17] shadow-lg transition-all hover:bg-[#DFC286]"
            >
              <span>{ui.continueBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Contact & Event Brief */}
      {step === 2 && (
        <form
          onSubmit={handleStep2Submit}
          noValidate
          className="relative z-10 space-y-5"
        >
          {/* Recap pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#C8A96A]/35 bg-[#070D17] px-4 py-3">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold text-white">
              <span className="text-[#DFC286]">{eventType}</span>
              <span className="text-white/30">•</span>
              <span className="tabular-nums">{guests || '12'}</span>
              {date && (
                <>
                  <span className="text-white/30">•</span>
                  <span className="tabular-nums text-[#B8C7DC]">{date}</span>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="rounded-lg border border-white/15 bg-[#0C1524] px-3 py-1 text-xs font-bold text-[#DFC286] hover:border-[#C8A96A]"
            >
              {ui.editBtn}
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="pe-first-name"
                className={`mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                  firstNameMissing
                )}`}
              >
                {ui.firstNameLabel}
              </label>
              <input
                id="pe-first-name"
                type="text"
                required
                aria-invalid={firstNameMissing}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={ui.firstNamePlaceholder}
                className={`min-h-[48px] w-full rounded-xl border px-3.5 py-2.5 text-sm text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:outline-none ${getFieldBorderClass(
                  firstNameMissing
                )}`}
              />
              {firstNameMissing && (
                <p className="mt-1.5 text-xs font-medium text-rose-400">
                  {REQUIRED_FIELD_ERROR[locale]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="pe-last-name"
                className={`mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                  lastNameMissing
                )}`}
              >
                {ui.lastNameLabel}
              </label>
              <input
                id="pe-last-name"
                type="text"
                required
                aria-invalid={lastNameMissing}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={ui.lastNamePlaceholder}
                className={`min-h-[48px] w-full rounded-xl border px-3.5 py-2.5 text-sm text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:outline-none ${getFieldBorderClass(
                  lastNameMissing
                )}`}
              />
              {lastNameMissing && (
                <p className="mt-1.5 text-xs font-medium text-rose-400">
                  {REQUIRED_FIELD_ERROR[locale]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="pe-company"
                className="mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase text-[#B8C7DC]"
              >
                {ui.companyOptionalLabel}
              </label>
              <input
                id="pe-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={ui.companyPlaceholder}
                className="min-h-[48px] w-full rounded-xl border border-white/15 bg-[#070D17] px-3.5 py-2.5 text-sm text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:border-[#C8A96A] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="pe-phone"
                className={`mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                  phoneMissing
                )}`}
              >
                {copy.phoneLabel}
              </label>
              <input
                id="pe-phone"
                type="tel"
                required
                aria-invalid={phoneMissing}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+32 4..."
                className={`min-h-[48px] w-full rounded-xl border px-3.5 py-2.5 text-sm tabular-nums text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:outline-none ${getFieldBorderClass(
                  phoneMissing
                )}`}
              />
              {phoneMissing && (
                <p className="mt-1.5 text-xs font-medium text-rose-400">
                  {REQUIRED_FIELD_ERROR[locale]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="pe-email"
                className={`mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                  emailHasError
                )}`}
              >
                {copy.emailLabel}
              </label>
              <input
                id="pe-email"
                type="email"
                aria-invalid={emailHasError}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={ui.emailPlaceholder}
                className={`min-h-[48px] w-full rounded-xl border px-3.5 py-2.5 text-sm text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:outline-none ${getFieldBorderClass(
                  emailHasError
                )}`}
              />
              {emailHasError && (
                <p className="mt-1.5 text-xs font-medium text-rose-400">
                  {INVALID_EMAIL_ERROR[locale]}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="pe-message"
              className="mb-1.5 flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-[#B8C7DC]"
            >
              <PenLine className="h-3.5 w-3.5 text-[#C8A96A]" />
              <span>{copy.messageLabel}</span>
            </label>
            <textarea
              id="pe-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={copy.messagePlaceholder}
              className="w-full rounded-xl border border-white/10 bg-[#070D17] p-3.5 text-sm leading-relaxed text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:border-[#C8A96A] focus:outline-none"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row">
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-[#070D17] px-6 text-xs font-bold uppercase tracking-wider text-white hover:border-[#C8A96A]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{ui.backBtn}</span>
            </button>

            <button
              type="submit"
              className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-6 text-sm font-bold text-[#070D17] shadow-lg transition-all hover:bg-[#DFC286] sm:w-auto sm:flex-1"
            >
              <span>{ui.reviewBtn}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: Send & Final CTAs to Menu & Address */}
      {step === 3 && (
        <div className="relative z-10 space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-[#C8A96A]/40 bg-[#070D17] p-6 sm:p-8">
            <OctopusCornerTentacles position="bottom-right" className="opacity-30" />

            <div className="relative z-10 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-start">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C8A96A]/15 text-[#C8A96A]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C8A96A]">
                    {ui.summaryKicker}
                  </span>
                  <h3 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">
                    {ui.summaryTitle}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#B8C7DC] sm:text-sm">
                    {ui.summarySubtitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => goToStep(2)}
                className="self-start rounded-lg border border-white/15 bg-[#0C1524] px-3 py-1.5 text-xs font-bold text-[#DFC286] hover:border-[#C8A96A]"
              >
                {ui.editBtn}
              </button>
            </div>

            <div className="relative z-10 mt-5 grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-[#0C1524] p-4 text-xs sm:grid-cols-3">
              <div>
                <span className="text-[#B8C7DC]">{copy.eventTypeLabel}</span>
                <p className="mt-1 font-bold text-[#DFC286]">{eventType}</p>
              </div>
              <div>
                <span className="text-[#B8C7DC]">{copy.guestsLabel}</span>
                <p className="mt-1 font-bold tabular-nums text-white">
                  {guests || '12'} {date ? `• ${date}` : ''}
                </p>
              </div>
              <div>
                <span className="text-[#B8C7DC]">{ui.nameDisplayLabel}</span>
                <p className="mt-1 font-bold text-white">
                  {contactDisplay || '—'} {phone ? `• ${phone}` : ''}
                </p>
              </div>
            </div>

            {message.trim() && (
              <div className="relative z-10 mt-3 rounded-xl border border-[#C8A96A]/25 bg-[#0C1524] p-4 text-xs">
                <span className="font-bold uppercase tracking-wider text-[#C8A96A]">
                  {ui.notesDisplayLabel}
                </span>
                <p className="mt-1 whitespace-pre-line text-sm text-white/90">
                  “{message.trim()}”
                </p>
              </div>
            )}

            <p className="relative z-10 mt-4 text-xs text-[#B8C7DC]">
              {copy.directNote}
            </p>

            {/* Primary Send Actions */}
            <div className="relative z-10 mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[52px] w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-[#070D17] transition-colors hover:bg-[#DFC286] sm:w-auto sm:flex-1"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{copy.sendWhatsappCta}</span>
              </a>

              <a
                href={mailtoUrl}
                className="inline-flex min-h-[52px] w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-[#C8A96A]/45 bg-[#0C1524] px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-[#DFC286] transition-colors hover:border-[#C8A96A] sm:w-auto sm:flex-1"
              >
                <Mail className="h-4 w-4" />
                <span>{copy.sendEmailCta}</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#0C1524] px-5 py-3.5 text-xs font-bold tabular-nums text-white transition-colors hover:border-[#C8A96A]"
              >
                <Phone className="h-4 w-4 text-[#C8A96A]" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
            </div>

            {/* Final Step Useful CTAs: Menu & Address / Directions */}
            <div className="relative z-10 mt-7 border-t border-white/10 pt-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C8A96A]">
                  {ui.nextKicker}
                </span>
                <span className="text-xs text-[#B8C7DC]">— {ui.nextTitle}</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Link
                  href={`/${locale}/menu`}
                  className="group flex flex-col justify-between rounded-xl border border-[#C8A96A]/35 bg-[#0C1524] p-4 transition-all hover:border-[#C8A96A]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8A96A]/15 text-[#DFC286]">
                        <UtensilsCrossed className="h-4 w-4" />
                      </span>
                      <ArrowRight className="h-4 w-4 text-[#C8A96A] transition-transform group-hover:translate-x-1" />
                    </div>
                    <h4 className="mt-3 text-sm font-extrabold text-white">
                      {ui.menuTitle}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#B8C7DC]">
                      {ui.menuDesc}
                    </p>
                  </div>
                  <span className="mt-3 text-xs font-bold tracking-wider uppercase text-[#DFC286]">
                    {ui.menuBtn} →
                  </span>
                </Link>

                <div className="flex flex-col justify-between rounded-xl border border-white/15 bg-[#0C1524] p-4">
                  <div>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#C8A96A]/15 text-[#DFC286]">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <h4 className="mt-3 text-sm font-extrabold text-white">
                      {ui.addressTitle}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-[#B8C7DC]">
                      {ui.addressDesc}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/${locale}/contact`}
                      className="text-xs font-bold tracking-wider uppercase text-[#DFC286] hover:text-white"
                    >
                      {ui.addressBtn} →
                    </Link>
                    <a
                      href={SITE_CONFIG.address.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-white/80 hover:text-[#DFC286]"
                    >
                      <span>{ui.mapsBtn}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

