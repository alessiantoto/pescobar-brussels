'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Phone,
  UtensilsCrossed,
  CalendarCheck,
  MapPin,
  MessageSquare,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { SITE_CONFIG, type Locale } from '@/config/site';
import type { Dictionary } from '@/i18n/dictionaries';
import { LanguageDropdown } from '@/components/LanguageDropdown';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PescobarBrandLogo } from '@/components/PescobarBrandLogo';
import {
  DELIVERY_PLATFORMS,
  DeliveryPlatformLogo,
} from '@/components/DeliveryCtaBar';

interface NavbarProps {
  locale: Locale;
  dict: Dictionary;
  compact?: boolean;
}

interface DrawerCopy {
  menuCardSub: string;
  reserveCardSub: string;
  exploreLabel: string;
  wineNav: string;
  plattersTitle: string;
  plattersSub: string;
  lunchSub: string;
  eventsTitle: string;
  eventsSub: string;
  deliveryNav: string;
  deliverySection: string;
  deliveryGuide: string;
  contactBtn: string;
  hoursText: string;
  callBtn: string;
  whatsappBtn: string;
  followLabel: string;
}

const DRAWER_COPY: Record<Locale, DrawerCopy> = {
  fr: {
    menuCardSub: 'Carte complète & prix',
    reserveCardSub: 'Table en 4 étapes',
    exploreLabel: 'Découvrir',
    wineNav: 'Vin offert',
    plattersTitle: 'Plateaux & Vin offert',
    plattersSub: 'Bouteille Aerosoli offerte sur sélection',
    lunchSub: 'Lun–Ven • 12h–15h • Soupe & plat',
    eventsTitle: 'Événements Privés',
    eventsSub: 'Groupes, anniversaires & affaires',
    deliveryNav: 'Livraison',
    deliverySection: 'Livraison & Takeaway',
    deliveryGuide: 'Voir options →',
    contactBtn: 'Contact & Plan',
    hoursText: 'Ouvert tous les jours • 12:00 – 23:00',
    callBtn: 'Appeler',
    whatsappBtn: 'WhatsApp',
    followLabel: 'Suivez-nous',
  },
  nl: {
    menuCardSub: 'Volledige kaart & prijzen',
    reserveCardSub: 'Tafel in 4 stappen',
    exploreLabel: 'Ontdekken',
    wineNav: 'Wijn cadeau',
    plattersTitle: 'Schotels & Wijn cadeau',
    plattersSub: 'Fles Aerosoli inbegrepen bij selecte schotels',
    lunchSub: 'Ma–Vr • 12u–15u • Soep & hoofdgerecht',
    eventsTitle: 'Privé-evenementen',
    eventsSub: 'Groepen, verjaardagen & zakelijk',
    deliveryNav: 'Bezorging',
    deliverySection: 'Bezorging & Takeaway',
    deliveryGuide: 'Opties →',
    contactBtn: 'Contact & Kaart',
    hoursText: 'Dagelijks geopend • 12:00 – 23:00',
    callBtn: 'Bellen',
    whatsappBtn: 'WhatsApp',
    followLabel: 'Volg ons',
  },
  en: {
    menuCardSub: 'Full menu & prices',
    reserveCardSub: 'Book in 4 steps',
    exploreLabel: 'Explore',
    wineNav: 'Wine Included',
    plattersTitle: 'Platters & Wine Included',
    plattersSub: 'Complimentary Aerosoli wine on select platters',
    lunchSub: 'Mon–Fri • 12:00–15:00 • Soup & main',
    eventsTitle: 'Private Events',
    eventsSub: 'Groups, birthdays & corporate',
    deliveryNav: 'Delivery',
    deliverySection: 'Delivery & Takeaway',
    deliveryGuide: 'View all →',
    contactBtn: 'Contact & Map',
    hoursText: 'Open daily • 12:00 – 23:00',
    callBtn: 'Call',
    whatsappBtn: 'WhatsApp',
    followLabel: 'Follow us',
  },
  ro: {
    menuCardSub: 'Meniu complet & prețuri',
    reserveCardSub: 'Masă în 4 pași',
    exploreLabel: 'Descoperă',
    wineNav: 'Vin inclus',
    plattersTitle: 'Platouri & Vin inclus',
    plattersSub: 'Sticlă Aerosoli inclusă la platouri selectate',
    lunchSub: 'Lun–Vin • 12:00–15:00 • Supă & fel principal',
    eventsTitle: 'Evenimente Private',
    eventsSub: 'Grupuri, aniversări & corporate',
    deliveryNav: 'Livrare',
    deliverySection: 'Livrare & Takeaway',
    deliveryGuide: 'Vezi opțiuni →',
    contactBtn: 'Contact & Hartă',
    hoursText: 'Deschis zilnic • 12:00 – 23:00',
    callBtn: 'Sună',
    whatsappBtn: 'WhatsApp',
    followLabel: 'Urmărește-ne',
  },
};

export function Navbar({ locale, dict }: NavbarProps) {
  const pathname = usePathname() || `/${locale}`;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const d = DRAWER_COPY[locale] ?? DRAWER_COPY.fr;

  // Close drawer on route change and lock background scroll when open
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { href: `/${locale}/menu`, label: dict.nav.menu },
    { href: `/${locale}/business-lunch`, label: 'Business Lunch' },
    { href: `/${locale}/private-events`, label: d.eventsTitle },
    { href: `/${locale}/menu?cat=plateaux`, label: d.wineNav },
    { href: `/${locale}/delivery`, label: d.deliveryNav },
    { href: `/${locale}/contact`, label: 'Contact' },
  ];

  const experienceRows = [
    {
      href: `/${locale}/menu?cat=plateaux`,
      title: d.plattersTitle,
      subtitle: d.plattersSub,
      image: '/images/aerosoli-wines-transparent.png',
      containImage: true,
    },
    {
      href: `/${locale}/business-lunch`,
      title: 'Business Lunch',
      subtitle: d.lunchSub,
      image:
        '/images/catalog/creveti-la-gratar-taverna-racilor.jpg',
      containImage: false,
    },
    {
      href: `/${locale}/private-events`,
      title: d.eventsTitle,
      subtitle: d.eventsSub,
      image:
        '/images/catalog/pescobar-octopus-taverna-racilor-platouri.jpg',
      containImage: false,
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070D17]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:h-20 sm:px-6">
        {/* Left: Crisp Vector Brand Logo */}
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center focus:outline-none"
        >
          <PescobarBrandLogo
            size="nav"
            className="!h-9 sm:!h-10 xl:!h-12"
          />
        </Link>

        {/* Center: Desktop Editorial Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-3.5 xl:gap-6 lg:flex"
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative whitespace-nowrap py-1 text-[11px] font-semibold tracking-wide uppercase transition-colors xl:text-xs xl:tracking-wider ${
                  isActive
                    ? 'text-[#DFC286]'
                    : 'text-white/75 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute right-0 bottom-0 left-0 h-[1.5px] bg-[#C8A96A]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Clean Uncrowded Control Cluster */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2 xl:gap-2.5">
          <ThemeToggle locale={locale} />
          <LanguageDropdown locale={locale} />

          <Link
            href={`/${locale}/reservations`}
            className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-xl bg-[#C8A96A] px-3 text-xs font-bold tracking-wide text-[#070D17] transition-colors hover:bg-[#DFC286] sm:h-10 sm:px-3.5 xl:h-11 xl:px-5 xl:text-sm"
          >
            {dict.nav.reserveCta}
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/90 transition-colors hover:border-[#C8A96A]/50 hover:text-white sm:h-10 sm:w-10 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-[#C8A96A]" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      </header>

      {/* Full-Height Opaque Mobile Navigation Drawer (Sibling outside backdrop-blur header) */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-[60] overflow-y-auto border-t border-[#C8A96A]/20 bg-[#070D17] px-4 pt-3 pb-5 sm:top-20 lg:hidden">
          <div className="mx-auto flex max-w-md flex-col gap-3">
            {/* Theme & Contrast Selector for 40-50+ accessibility */}
            <ThemeToggle locale={locale} variant="drawer" />

            {/* 1. Primary 2-Card Action Grid (Menu & Reserve) */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href={`/${locale}/menu`}
                onClick={() => setMobileMenuOpen(false)}
                className={`group relative z-20 flex cursor-pointer flex-col justify-between rounded-2xl border p-3.5 transition-all ${
                  pathname.includes('/menu') && !pathname.includes('/qr-menu')
                    ? 'border-[#C8A96A] bg-[#101C30]'
                    : 'border-white/15 bg-[#0C1524] hover:border-[#C8A96A]/60'
                }`}
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#C8A96A]/15 text-[#DFC286]">
                  <UtensilsCrossed className="h-4 w-4" />
                </span>
                <div className="mt-2.5">
                  <p className="text-sm font-extrabold text-white">
                    {dict.nav.menu}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-white/65">
                    {d.menuCardSub}
                  </p>
                </div>
              </Link>

              <Link
                href={`/${locale}/reservations`}
                onClick={() => setMobileMenuOpen(false)}
                className="group relative z-20 flex cursor-pointer flex-col justify-between rounded-2xl bg-gradient-to-br from-[#C8A96A] to-[#DFC286] p-3.5 text-[#070D17] shadow-lg transition-transform active:scale-[0.98]"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#070D17]/15 text-[#070D17]">
                  <CalendarCheck className="h-4 w-4" />
                </span>
                <div className="mt-2.5">
                  <p className="text-sm font-extrabold">{dict.nav.reservations}</p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-snug text-[#070D17]/80">
                    {d.reserveCardSub}
                  </p>
                </div>
              </Link>
            </div>

            {/* 2. Signature Experience Cards with Real Dish Thumbnails */}
            <div>
              <p className="mb-2 px-1 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A96A]">
                {d.exploreLabel}
              </p>
              <div className="space-y-2">
                {experienceRows.map((row) => {
                  const isActive =
                    pathname === row.href || pathname.startsWith(`${row.href}/`);
                  return (
                    <Link
                      key={row.href}
                      href={row.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`relative z-20 flex cursor-pointer items-center gap-3 rounded-2xl border p-2.5 transition-all ${
                        isActive
                          ? 'border-[#C8A96A] bg-[#101C30]'
                          : 'border-white/10 bg-[#0C1524] hover:border-[#C8A96A]/45'
                      }`}
                    >
                      <div
                        className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border ${
                          row.containImage
                            ? 'border-[#C8A96A]/40 bg-[#070D17] p-1'
                            : 'border-white/10'
                        }`}
                      >
                        <Image
                          src={row.image}
                          alt={row.title}
                          fill
                          sizes="44px"
                          className={
                            row.containImage ? 'object-contain' : 'object-cover'
                          }
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold leading-tight text-white">
                          {row.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-snug text-white/65">
                          {row.subtitle}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-[#C8A96A]" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 2b. Compact Delivery & Takeaway Row (Uber Eats, Deliveroo, Takeaway) */}
            <div>
              <div className="mb-1.5 flex items-center justify-between gap-2 px-1">
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A96A]">
                  {d.deliverySection}
                </p>
                <Link
                  href={`/${locale}/delivery`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative z-20 shrink-0 cursor-pointer text-[11px] font-bold whitespace-nowrap text-[#DFC286] hover:text-white"
                >
                  {d.deliveryGuide}
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {DELIVERY_PLATFORMS.map((p) => (
                  <a
                    key={p.key}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative z-20 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-white/15 bg-[#0C1524] px-1.5 py-2 text-[11px] font-extrabold text-white transition-colors ${p.borderHover}`}
                  >
                    <DeliveryPlatformLogo platform={p.key} size="sm" />
                    <span className="whitespace-nowrap">{p.shortLabel}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* 3. Single Unified Address, Contact Link & Concierge Card */}
            <div className="rounded-2xl border border-[#C8A96A]/25 bg-[#0C1524] p-3.5">
              <div className="space-y-1 text-xs">
                <p className="flex items-center gap-1.5 font-bold text-white">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
                  <span>Rue Jourdan 18, 1060 Saint-Gilles</span>
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/65">
                  <Clock className="h-3 w-3 shrink-0 text-[#C8A96A]" />
                  <span>{d.hoursText}</span>
                </p>
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="relative z-20 inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#C8A96A] px-3 text-xs font-extrabold text-[#070D17]"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>{d.callBtn}</span>
                </a>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-20 inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-emerald-500/35 bg-emerald-500/15 px-3 text-xs font-bold text-emerald-300"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>{d.whatsappBtn}</span>
                </a>
              </div>

              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="relative z-20 mt-2 inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-[#070D17] px-4 text-xs font-bold text-[#DFC286] transition-colors hover:border-[#C8A96A]"
              >
                <span>{d.contactBtn}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-white/10 pt-2.5">
                <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#C8A96A]">
                  {d.followLabel}
                </span>
                <div className="flex items-center gap-1.5">
                  <a
                    href={SITE_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="relative z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-[#070D17] text-white/80 transition-colors hover:border-[#C8A96A] hover:text-[#DFC286]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href={SITE_CONFIG.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="relative z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-[#070D17] text-white/80 transition-colors hover:border-[#C8A96A] hover:text-[#DFC286]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.8a8.26 8.26 0 0 0 4.76 1.5v-3.4a4.85 4.85 0 0 1-1-.21z" />
                    </svg>
                  </a>
                  <a
                    href={SITE_CONFIG.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="relative z-20 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/15 bg-[#070D17] text-white/80 transition-colors hover:border-[#C8A96A] hover:text-[#DFC286]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
