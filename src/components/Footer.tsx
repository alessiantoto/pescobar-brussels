import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';
import { SITE_CONFIG, type Locale } from '@/config/site';
import type { Dictionary } from '@/i18n/dictionaries';
import { OctopusDivider, OctopusFooterMural } from '@/components/OctopusAccents';
import { PescobarBrandLogo } from '@/components/PescobarBrandLogo';
import { DELIVERY_PLATFORMS } from '@/components/DeliveryCtaBar';

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

const PRIVATE_EVENTS_FOOTER_LABEL: Record<Locale, string> = {
  fr: 'Événements Privés & Groupes',
  nl: 'Privé-evenementen & Groepen',
  en: 'Private Events & Groups',
  ro: 'Evenimente Private & Grupuri',
};

export function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-[#C8A96A]/20 bg-[#050911] pb-10 text-sm text-[#C8D4E6] sm:pb-12">
      <OctopusFooterMural />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand, Socials & Legal Entity */}
          <div className="space-y-4">
            <PescobarBrandLogo size="footer" />
            <p className="text-xs leading-relaxed text-[#8FA1BC]">
              {dict.footer.tagline}
            </p>
            <div className="flex items-center gap-2">
              <a
                href={SITE_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Pescobar Brussels"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#0C1524] text-[#C8D4E6] transition-colors hover:border-[#C8A96A] hover:text-[#DFC286]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-4 w-4" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Pescobar Brussels"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#0C1524] text-[#C8D4E6] transition-colors hover:border-[#C8A96A] hover:text-[#DFC286]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Pescobar Bruxelles"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#0C1524] text-[#C8D4E6] transition-colors hover:border-[#C8A96A] hover:text-[#DFC286]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </a>
            </div>
            <div className="border-t border-white/10 pt-3 text-[11px] leading-relaxed text-[#8FA1BC]">
              <p className="font-semibold text-white">{SITE_CONFIG.legalName}</p>
              <p>BCE / KBO : {SITE_CONFIG.bceNumber}</p>
              <p>TVA / BTW : {SITE_CONFIG.vatNumber}</p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#C8A96A]">
              {dict.footer.navigationTitle}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href={`/${locale}/menu`} className="hover:text-[#DFC286]">
                  {dict.nav.menu}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/business-lunch`} className="hover:text-[#DFC286]">
                  {dict.nav.businessLunch}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/private-events`} className="hover:text-[#DFC286]">
                  {PRIVATE_EVENTS_FOOTER_LABEL[locale]}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/reservations`} className="hover:text-[#DFC286]">
                  {dict.nav.reservations}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-[#DFC286]">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href={`/${locale}/delivery`}
                className="inline-block text-[10px] font-bold tracking-[0.18em] uppercase text-[#C8A96A] hover:text-[#DFC286]"
              >
                Delivery &amp; Takeaway →
              </Link>
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#C8D4E6]">
                {DELIVERY_PLATFORMS.map((p) => (
                  <a
                    key={p.key}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#DFC286]"
                  >
                    {p.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3: Location & Hours */}
          <div className="space-y-3 text-xs">
            <h3 className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#C8A96A]">
              {dict.footer.accessTitle}
            </h3>
            <div className="space-y-2.5">
              <p className="flex items-start gap-2 text-white">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A96A]" />
                <span>
                  {SITE_CONFIG.address.streetAddress}, {SITE_CONFIG.address.postalCode}{' '}
                  Saint-Gilles (Avenue Louise)
                </span>
              </p>
              <div className="flex items-start gap-2 text-[#C8D4E6]">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#C8A96A]" />
                <div className="space-y-1.5">
                  <p className="font-bold tabular-nums text-white">12:00 – 23:00</p>
                  <p className="inline-block rounded-md border border-[#C8A96A]/30 bg-[#C8A96A]/15 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-[#DFC286]">
                    Business Lunch: 12:00 – 15:00
                  </p>
                </div>
              </div>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#C8A96A]" />
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="font-bold tabular-nums text-white hover:text-[#DFC286]"
                >
                  {SITE_CONFIG.phone}
                </a>
              </p>
              <p className="text-[11px] text-[#8FA1BC]">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-[#DFC286]"
                >
                  {SITE_CONFIG.email}
                </a>
              </p>
            </div>
          </div>

          {/* Col 4: Belgian Legal & Hreflang */}
          <div className="space-y-3 text-xs">
            <h3 className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#C8A96A]">
              {dict.footer.legalTitle}
            </h3>
            <ul className="space-y-2 text-[#8FA1BC]">
              <li>
                <Link href={`/${locale}/mentions-legales`} className="hover:text-white">
                  {dict.footer.mentionsLegales}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-white">
                  {dict.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`} className="hover:text-white">
                  {dict.footer.cookies}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <OctopusDivider className="mt-10" />

        <div className="mt-6 flex flex-col items-center justify-between gap-3 pt-4 text-xs text-[#8FA1BC] sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name} ({SITE_CONFIG.legalName}) • Rue Jourdan 18, 1060 Bruxelles.
          </p>
          <p className="tracking-widest uppercase text-[#C8A96A]">pescobarseafoodbruxelles.be</p>
        </div>
      </div>
    </footer>
  );
}
