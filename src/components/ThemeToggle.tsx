'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Palette, Moon, Waves, Sun, Check, ChevronDown, X } from 'lucide-react';
import type { Locale } from '@/config/site';

export type AppTheme = 'default' | 'ocean' | 'light';

interface ThemeOption {
  id: AppTheme;
  icon: typeof Moon;
  dotBg: string;
  dotBorder: string;
  labels: Record<Locale, { title: string; desc: string }>;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'default',
    icon: Moon,
    dotBg: '#070D17',
    dotBorder: '#C8A96A',
    labels: {
      fr: { title: 'Nuit Sombre', desc: 'Ambiance intime · Noir & Or' },
      nl: { title: 'Donkere Nacht', desc: 'Klassiek · Zwart & Goud' },
      en: { title: 'Midnight Dark', desc: 'Default · Black & Gold' },
      ro: { title: 'Noapte Închisă', desc: 'Original · Negru & Aur' },
    },
  },
  {
    id: 'ocean',
    icon: Waves,
    dotBg: '#0B192C',
    dotBorder: '#38BDF8',
    labels: {
      fr: { title: 'Bleu Océan', desc: 'Bleu marine · Haute lisibilité' },
      nl: { title: 'Oceaanblauw', desc: 'Marineblauw · Hoge leesbaarheid' },
      en: { title: 'Ocean Navy', desc: 'Marine blue · High visibility' },
      ro: { title: 'Albastru Ocean', desc: 'Bleumarin · Vizibilitate sporită' },
    },
  },
  {
    id: 'light',
    icon: Sun,
    dotBg: '#FFFFFF',
    dotBorder: '#1E40AF',
    labels: {
      fr: { title: 'Clair & Bleu', desc: 'Fond lumineux · Contours bleus' },
      nl: { title: 'Helder & Blauw', desc: 'Lichte achtergrond · Blauwe lijnen' },
      en: { title: 'Pearl & Blue', desc: 'Light background · Blue contours' },
      ro: { title: 'Perlă & Albastru', desc: 'Fundal deschis · Contur albastru' },
    },
  },
];

export interface ThemeToggleProps {
  locale: Locale;
  variant?: 'nav' | 'drawer';
}

export function ThemeToggle({ locale, variant = 'nav' }: ThemeToggleProps) {
  const [currentTheme, setCurrentTheme] = useState<AppTheme>('default');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync with current theme on mount
  useEffect(() => {
    const saved = (localStorage.getItem('pescobar_theme') as AppTheme) || 'default';
    setCurrentTheme(saved);
    if (saved !== 'default') {
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectTheme = (theme: AppTheme) => {
    setCurrentTheme(theme);
    localStorage.setItem('pescobar_theme', theme);
    document.cookie = `pescobar_theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;

    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    setOpen(false);
  };

  const activeOption = THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];
  const ActiveIcon = activeOption.icon;

  // Drawer variant: full-width segmented selector for mobile drawer
  if (variant === 'drawer') {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#0C1524] p-3 shadow-lg theme-drawer-card">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/80">
            <Palette className="h-3.5 w-3.5 text-[#C8A96A]" />
            <span>Thème & Contraste</span>
          </span>
          <span className="text-[10px] text-[#C8A96A] font-semibold">
            {activeOption.labels[locale]?.title || activeOption.labels.fr.title}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {THEME_OPTIONS.map((opt) => {
            const isSelected = opt.id === currentTheme;
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectTheme(opt.id)}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2.5 text-center transition-all ${
                  isSelected
                    ? 'border border-[#C8A96A] bg-[#C8A96A]/15 text-white shadow-md'
                    : 'border border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white'
                }`}
              >
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full border shadow-inner"
                  style={{ backgroundColor: opt.dotBg, borderColor: opt.dotBorder }}
                >
                  <Icon className="h-3 w-3" style={{ color: opt.dotBorder }} />
                </div>
                <span className="text-[11px] font-bold leading-tight">
                  {opt.labels[locale]?.title.split(' ')[0] || opt.labels.fr.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Nav variant: compact toggle button in header
  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Changer le contraste et le thème de couleur"
        title="Contraste & Thème de couleur"
        className="inline-flex h-9 items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-2 text-xs font-bold text-white/90 transition-colors hover:border-[#C8A96A]/50 hover:text-white sm:gap-1.5 sm:px-2.5"
      >
        <div
          className="flex h-5 w-5 items-center justify-center rounded-full border shadow-sm transition-transform duration-200"
          style={{ backgroundColor: activeOption.dotBg, borderColor: activeOption.dotBorder }}
        >
          <ActiveIcon className="h-2.5 w-2.5" style={{ color: activeOption.dotBorder }} />
        </div>
        <ChevronDown
          className={`h-3 w-3 text-[#C8A96A] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <>
          {/* Mobile backdrop so tapping outside closes cleanly */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown Menu:
              - Mobile (< sm): fixed inset-x-3 top-16 to NEVER cut off or overflow screen width!
              - Desktop (sm:): absolute right-0 top-full mt-2 w-[270px]
          */}
          <div
            role="listbox"
            aria-label="Options de contraste et thèmes"
            className="theme-dropdown-menu fixed inset-x-3 top-16 z-50 mt-2 origin-top overflow-hidden rounded-2xl border border-[#C8A96A]/40 bg-[#0C1524] p-2 shadow-2xl backdrop-blur-2xl sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:min-w-[270px] sm:origin-top-right sm:p-2"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/60">
              <span>
                {locale === 'nl'
                  ? 'Leesbaarheid & Contrast'
                  : locale === 'en'
                  ? 'Readability & Contrast'
                  : locale === 'ro'
                  ? 'Vizibilitate & Contrast'
                  : 'Lisibilité & Contraste'}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/40 hover:text-white sm:hidden"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-1.5 space-y-1">
              {THEME_OPTIONS.map((opt) => {
                const isSelected = opt.id === currentTheme;
                const Icon = opt.icon;
                const copy = opt.labels[locale] ?? opt.labels.fr;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectTheme(opt.id)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-all ${
                      isSelected
                        ? 'border border-[#C8A96A]/60 bg-[#C8A96A]/20 text-white shadow-sm'
                        : 'border border-transparent text-white/80 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border shadow-sm"
                        style={{ backgroundColor: opt.dotBg, borderColor: opt.dotBorder }}
                      >
                        <Icon className="h-3.5 w-3.5" style={{ color: opt.dotBorder }} />
                      </div>
                      <div>
                        <p className="font-bold text-white leading-tight">{copy.title}</p>
                        <p className="mt-0.5 text-[10px] leading-tight text-white/60">{copy.desc}</p>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="h-4 w-4 shrink-0 text-[#DFC286]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
