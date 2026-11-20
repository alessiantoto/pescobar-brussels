'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Check } from 'lucide-react';
import { LOCALES, type Locale } from '@/config/site';

const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'Français',
  nl: 'Nederlands',
  en: 'English',
  ro: 'Română',
};

export interface LanguageDropdownProps {
  locale: Locale;
}

export function LanguageDropdown({ locale }: LanguageDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getLocalizedPath = (targetLocale: Locale): string => {
    const segments = pathname.split('/');
    if (segments.length > 1 && LOCALES.includes(segments[1] as Locale)) {
      segments[1] = targetLocale;
      return segments.join('/') || `/${targetLocale}`;
    }
    const suffix = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return `/${targetLocale}${suffix === '/' ? '' : suffix}`;
  };

  const handleSelectLocale = (targetLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
    setOpen(false);
    if (targetLocale !== locale) {
      router.push(getLocalizedPath(targetLocale));
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${locale.toUpperCase()} — Select language`}
        className="inline-flex h-9 items-center justify-center gap-1 rounded-lg px-2 text-xs font-bold tracking-wider uppercase text-white/85 transition-colors hover:bg-white/5 hover:text-white"
      >
        <span>{locale.toUpperCase()}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[#C8A96A] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Available languages"
          className="absolute right-0 z-50 mt-2 min-w-[148px] origin-top-right overflow-hidden rounded-xl border border-[#C8A96A]/35 bg-[#0C1524] p-1 shadow-2xl backdrop-blur-xl"
        >
          {LOCALES.map((loc) => {
            const isSelected = loc === locale;
            return (
              <button
                key={loc}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelectLocale(loc)}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors ${
                  isSelected
                    ? 'bg-[#C8A96A] text-[#070D17]'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`inline-block w-5 text-[11px] font-bold uppercase ${
                      isSelected ? 'text-[#070D17]' : 'text-[#C8A96A]'
                    }`}
                  >
                    {loc}
                  </span>
                  <span>{LOCALE_LABELS[loc]}</span>
                </span>
                {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;
