'use client';

import React, { useState } from 'react';
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
  UtensilsCrossed,
} from 'lucide-react';
import { SITE_CONFIG, type Locale } from '@/config/site';
import {
  OctopusCornerTentacles,
  OctopusTentacleSide,
} from '@/components/OctopusAccents';
import { OctopusTentacleProgress } from '@/components/OctopusTentacleProgress';
import {
  focusFirstInvalidField,
  getFieldBorderClass,
  getFieldLabelClass,
  INVALID_EMAIL_ERROR,
  isValidEmail,
  REQUIRED_FIELD_ERROR,
} from '@/lib/formValidation';

export interface ContactWizardCopy {
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
  confirmKicker: string;
  confirmTitle: string;
  confirmSubtitle: string;
  sendEmailCta: string;
  sendWhatsappCta: string;
  editMessageCta: string;
}

interface WizardUiCopy {
  stepLabels: [string, string];
  stepProgressLabel: string;
  backBtn: string;
  exploreKicker: string;
  menuTitle: string;
  menuDesc: string;
  reserveTitle: string;
  reserveDesc: string;
  mapsLabel: string;
}

const UI_COPY: Record<Locale, WizardUiCopy> = {
  fr: {
    stepLabels: ['01. Votre message', '02. Envoi & Accès'],
    stepProgressLabel: 'Étape',
    backBtn: 'Modifier',
    exploreKicker: 'AVANT VOTRE VISITE',
    menuTitle: 'Consulter la carte',
    menuDesc: 'Seafood Boil, poulpe grillé et plateaux à partager.',
    reserveTitle: 'Réserver une table',
    reserveDesc: 'Ouvert 7/7 • 12:00 – 23:00.',
    mapsLabel: 'Google Maps',
  },
  nl: {
    stepLabels: ['01. Uw bericht', '02. Verzenden & Info'],
    stepProgressLabel: 'Stap',
    backBtn: 'Wijzigen',
    exploreKicker: 'VOOR UW BEZOEK',
    menuTitle: 'Bekijk de menukaart',
    menuDesc: 'Seafood Boil, gegrilde octopus en schotels om te delen.',
    reserveTitle: 'Tafel reserveren',
    reserveDesc: '7/7 open • 12:00 – 23:00.',
    mapsLabel: 'Google Maps',
  },
  en: {
    stepLabels: ['01. Your Message', '02. Send & Visit'],
    stepProgressLabel: 'Step',
    backBtn: 'Edit',
    exploreKicker: 'BEFORE YOUR VISIT',
    menuTitle: 'Explore the Menu',
    menuDesc: 'Seafood Boil, grilled octopus and sharing platters.',
    reserveTitle: 'Reserve a Table',
    reserveDesc: 'Open daily 12:00 – 23:00.',
    mapsLabel: 'Google Maps',
  },
  ro: {
    stepLabels: ['01. Mesajul tău', '02. Trimitere & Acces'],
    stepProgressLabel: 'Pasul',
    backBtn: 'Modifică',
    exploreKicker: 'ÎNAINTE DE VIZITĂ',
    menuTitle: 'Consultă Meniul',
    menuDesc: 'Seafood Boil, caracatiță la grătar și platouri de împărțit.',
    reserveTitle: 'Rezervă o Masă',
    reserveDesc: 'Deschis zilnic 12:00 – 23:00.',
    mapsLabel: 'Google Maps',
  },
};

export function ContactWizard({
  locale,
  copy,
}: {
  locale: Locale;
  copy: ContactWizardCopy;
}) {
  const ui = UI_COPY[locale] ?? UI_COPY.fr;
  const [step, setStep] = useState<1 | 2>(1);
  const [subject, setSubject] = useState<string>(copy.subjects[0]);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const firstNameInvalid = !firstName.trim();
  const lastNameInvalid = !lastName.trim();
  const emailEmpty = !email.trim();
  const emailInvalid = emailEmpty || !isValidEmail(email);
  const messageInvalid = !message.trim();

  const firstNameMissing = showErrors && firstNameInvalid;
  const lastNameMissing = showErrors && lastNameInvalid;
  const emailHasError = showErrors && emailInvalid;
  const messageMissing = showErrors && messageInvalid;

  const step1ValidationFields = () => [
    { id: 'contact-first-name', invalid: !firstName.trim() },
    { id: 'contact-last-name', invalid: !lastName.trim() },
    { id: 'contact-email', invalid: !email.trim() || !isValidEmail(email) },
    { id: 'contact-message', invalid: !message.trim() },
  ];

  const fullName = [firstName.trim(), lastName.trim()].filter(Boolean).join(' ');

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstNameInvalid || lastNameInvalid || emailInvalid || messageInvalid) {
      setShowErrors(true);
      focusFirstInvalidField(step1ValidationFields());
      return;
    }
    setShowErrors(false);

    // Send email notification to restaurant and confirmation to customer
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'contact',
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        subject: subject || 'Contact',
        message: message.trim(),
        locale,
      }),
    }).catch(() => {});

    setStep(2);
  };

  const buildLines = () => {
    return [
      'Pescobar Seafood — Rue Jourdan 18, 1060 Saint-Gilles',
      '',
      `• ${fullName || '—'}`,
      `• ${copy.emailFieldLabel}: ${email.trim() || '—'}`,
      phone.trim() ? `• ${copy.phoneFieldLabel}: ${phone.trim()}` : '',
      `• ${copy.subjectLabel}: ${subject || '—'}`,
      '',
      message.trim() || '—',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const mailSubject = `Pescobar — ${subject || 'Contact'}${
    fullName ? ` (${fullName})` : ''
  }`;
  const mailtoUrl = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
    mailSubject
  )}&body=${encodeURIComponent(buildLines())}`;
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    buildLines()
  )}`;
  const directWhatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Pescobar Seafood — Rue Jourdan 18'
  )}`;

  const canGoStep2 = Boolean(
    firstName.trim() && lastName.trim() && isValidEmail(email) && message.trim()
  );

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] p-5 shadow-2xl sm:p-7">
      <OctopusTentacleSide side="right" className="opacity-20" />

      {/* Compact 2-Step Octopus Progress Header */}
      <div className="relative z-10 mb-5 space-y-2 border-b border-white/10 pb-4">
        <div className="flex items-center justify-between gap-2 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="text-[#DFC286]">
              {ui.stepProgressLabel} {step}/2
            </span>
            <span className="text-white/30">•</span>
            <span className="text-white">{ui.stepLabels[step - 1]}</span>
          </div>
        </div>

        <OctopusTentacleProgress step={step} totalSteps={2} />

        <div
          role="tablist"
          aria-label="Contact steps"
          className="grid grid-cols-2 gap-1.5 rounded-xl border border-white/10 bg-[#070D17] p-1"
        >
          {ui.stepLabels.map((label, idx) => {
            const s = (idx + 1) as 1 | 2;
            const isActive = step === s;
            const isDone = step > s;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  if (s === 1) {
                    setStep(1);
                  } else if (canGoStep2) {
                    setShowErrors(false);
                    setStep(2);
                  } else {
                    setStep(1);
                    setShowErrors(true);
                    setTimeout(() => focusFirstInvalidField(step1ValidationFields()), 20);
                  }
                }}
                className={`flex min-h-[36px] items-center justify-center rounded-lg px-2 py-1.5 text-center text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#C8A96A] text-[#070D17] shadow-sm'
                    : isDone
                    ? 'bg-white/5 text-[#DFC286] hover:bg-white/10'
                    : 'text-white/55 hover:bg-white/5 hover:text-white/85'
                }`}
              >
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Fast Single-View Contact Form with Separate First & Last Name */}
      {step === 1 && (
        <form
          onSubmit={handleStep1Submit}
          noValidate
          className="relative z-10 space-y-4"
        >
          <div>
            <label className="mb-2 block text-xs font-bold tracking-[0.12em] uppercase text-[#B8C7DC]">
              {copy.subjectLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {copy.subjects.map((subjectOption) => {
                const isActive = subject === subjectOption;
                return (
                  <button
                    key={subjectOption}
                    type="button"
                    onClick={() => setSubject(subjectOption)}
                    className={`min-h-[42px] rounded-xl border px-3 py-2 text-left text-xs font-bold transition-all ${
                      isActive
                        ? 'border-[#C8A96A] bg-[#C8A96A] text-[#070D17]'
                        : 'border-white/10 bg-[#070D17] text-white/85 hover:border-[#C8A96A]/50'
                    }`}
                  >
                    {subjectOption}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Separate First Name & Last Name Fields */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-first-name"
                className={`mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                  firstNameMissing
                )}`}
              >
                {copy.firstNameLabel}
              </label>
              <input
                id="contact-first-name"
                type="text"
                required
                aria-invalid={firstNameMissing}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder={copy.firstNamePlaceholder}
                className={`h-11 w-full rounded-xl border px-3.5 text-sm text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:outline-none ${getFieldBorderClass(
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
                htmlFor="contact-last-name"
                className={`mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                  lastNameMissing
                )}`}
              >
                {copy.lastNameLabel}
              </label>
              <input
                id="contact-last-name"
                type="text"
                required
                aria-invalid={lastNameMissing}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder={copy.lastNamePlaceholder}
                className={`h-11 w-full rounded-xl border px-3.5 text-sm text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:outline-none ${getFieldBorderClass(
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

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-email"
                className={`mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                  emailHasError
                )}`}
              >
                {copy.emailFieldLabel}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                aria-invalid={emailHasError}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={copy.emailFieldPlaceholder}
                className={`h-11 w-full rounded-xl border px-3.5 text-sm text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:outline-none ${getFieldBorderClass(
                  emailHasError
                )}`}
              />
              {emailHasError && (
                <p className="mt-1.5 text-xs font-medium text-rose-400">
                  {emailEmpty
                    ? REQUIRED_FIELD_ERROR[locale]
                    : INVALID_EMAIL_ERROR[locale]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-phone"
                className="mb-1.5 block text-xs font-bold tracking-[0.12em] uppercase text-[#B8C7DC]"
              >
                {copy.phoneFieldLabel}
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={copy.phoneFieldPlaceholder}
                className="h-11 w-full rounded-xl border border-white/15 bg-[#070D17] px-3.5 text-sm tabular-nums text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:border-[#C8A96A] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className={`mb-1.5 flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase transition-colors ${getFieldLabelClass(
                messageMissing
              )}`}
            >
              <PenLine
                className={`h-3.5 w-3.5 ${
                  messageMissing ? 'text-rose-400' : 'text-[#C8A96A]'
                }`}
              />
              <span>{copy.messageLabel}</span>
            </label>
            <textarea
              id="contact-message"
              rows={3}
              required
              aria-invalid={messageMissing}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={copy.messagePlaceholder}
              className={`w-full rounded-xl border p-3.5 text-sm leading-relaxed text-white placeholder:text-[#B8C7DC]/40 transition-colors focus:outline-none ${getFieldBorderClass(
                messageMissing
              )}`}
            />
            {messageMissing && (
              <p className="mt-1.5 text-xs font-medium text-rose-400">
                {REQUIRED_FIELD_ERROR[locale]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2.5 pt-1 sm:flex-row">
            <button
              type="submit"
              className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-6 text-xs font-bold tracking-wider uppercase text-[#070D17] transition-colors hover:bg-[#DFC286] sm:w-auto sm:flex-1"
            >
              <span>{copy.submitCta}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <a
              href={directWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#C8A96A]/40 bg-[#070D17] px-5 text-xs font-bold tracking-wider uppercase text-[#DFC286] transition-colors hover:border-[#C8A96A]"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </form>
      )}

      {/* STEP 2: One-Click Send + Pre-Visit Menu, Reservation & Address CTAs */}
      {step === 2 && (
        <div className="relative z-10 space-y-5">
          <div className="relative overflow-hidden rounded-xl border border-[#C8A96A]/35 bg-[#070D17] p-5 sm:p-6">
            <OctopusCornerTentacles position="bottom-right" className="opacity-25" />

            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C8A96A]/15 text-[#DFC286]">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A96A]">
                    {copy.confirmKicker}
                  </span>
                  <h3 className="mt-0.5 text-lg font-bold tracking-tight text-white sm:text-xl">
                    {copy.confirmTitle}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#B8C7DC]">{copy.confirmSubtitle}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/15 bg-[#0C1524] px-3 py-1.5 text-xs font-bold text-[#DFC286] hover:border-[#C8A96A]"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>{ui.backBtn}</span>
              </button>
            </div>

            <div className="relative z-10 mt-4 space-y-2 rounded-xl border border-white/10 bg-[#0C1524] p-3.5 text-xs">
              <p className="font-bold text-[#DFC286]">{subject}</p>
              <p className="font-semibold text-white">
                {fullName || '—'} • {email}
                {phone ? ` • ${phone}` : ''}
              </p>
              <p className="whitespace-pre-line text-white/85">{message}</p>
            </div>

            <div className="relative z-10 mt-4 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={mailtoUrl}
                className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-5 text-xs font-bold tracking-wider uppercase text-[#070D17] transition-colors hover:bg-[#DFC286] sm:w-auto sm:flex-1"
              >
                <Mail className="h-4 w-4" />
                <span>{copy.sendEmailCta}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-[#C8A96A]/40 bg-[#0C1524] px-5 text-xs font-bold tracking-wider uppercase text-[#DFC286] transition-colors hover:border-[#C8A96A] sm:w-auto sm:flex-1"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{copy.sendWhatsappCta}</span>
              </a>
            </div>

            <div className="relative z-10 mt-5 border-t border-white/10 pt-4">
              <p className="mb-2.5 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A96A]">
                {ui.exploreKicker}
              </p>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <Link
                  href={`/${locale}/menu`}
                  className="group flex flex-col justify-between rounded-xl border border-[#C8A96A]/35 bg-[#0C1524] p-3.5 transition-all hover:border-[#C8A96A]"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-xs font-extrabold text-white">
                      <UtensilsCrossed className="h-4 w-4 text-[#DFC286]" />
                      <span>{ui.menuTitle}</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#C8A96A]" />
                  </div>
                  <p className="mt-1 text-[11px] text-[#B8C7DC]">{ui.menuDesc}</p>
                </Link>

                <div className="flex flex-col justify-between rounded-xl border border-white/15 bg-[#0C1524] p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={`/${locale}/reservations`}
                      className="inline-flex items-center gap-2 text-xs font-extrabold text-white hover:text-[#DFC286]"
                    >
                      <Calendar className="h-4 w-4 text-[#DFC286]" />
                      <span>{ui.reserveTitle}</span>
                    </Link>
                    <a
                      href={SITE_CONFIG.address.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DFC286] hover:underline"
                    >
                      <MapPin className="h-3 w-3" />
                      <span>{ui.mapsLabel}</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                  <p className="mt-1 text-[11px] text-[#B8C7DC]">{ui.reserveDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
