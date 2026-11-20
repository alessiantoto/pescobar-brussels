'use client';

import React, { useMemo, useRef, useState } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Locale } from '@/config/site';

interface ModernDatePickerProps {
  locale: Locale;
  value: string; // YYYY-MM-DD or ''
  onChange: (dateStr: string) => void;
  minDate?: string; // YYYY-MM-DD
  allowClear?: boolean;
  id?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

interface CalendarCopy {
  months: string[];
  monthsShort: string[];
  weekdaysShort: string[];
  mondayFirstLabels: [string, string, string, string, string, string, string];
  placeholder: string;
  todayBtn: string;
  clearBtn: string;
  closeBtn: string;
}

const CALENDAR_COPY: Record<Locale, CalendarCopy> = {
  fr: {
    months: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ],
    monthsShort: ['jan.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
    weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    mondayFirstLabels: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    placeholder: 'Choisir une date',
    todayBtn: 'Aujourd’hui',
    clearBtn: 'Effacer',
    closeBtn: 'Fermer',
  },
  nl: {
    months: [
      'Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
      'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December',
    ],
    monthsShort: ['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
    weekdaysShort: ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'],
    mondayFirstLabels: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
    placeholder: 'Kies een datum',
    todayBtn: 'Vandaag',
    clearBtn: 'Wissen',
    closeBtn: 'Sluiten',
  },
  en: {
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    mondayFirstLabels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    placeholder: 'Select a date',
    todayBtn: 'Today',
    clearBtn: 'Clear',
    closeBtn: 'Close',
  },
  ro: {
    months: [
      'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
      'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie',
    ],
    monthsShort: ['ian.', 'feb.', 'mar.', 'apr.', 'mai', 'iun.', 'iul.', 'aug.', 'sep.', 'oct.', 'noi.', 'dec.'],
    weekdaysShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'],
    mondayFirstLabels: ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'],
    placeholder: 'Alege data',
    todayBtn: 'Astăzi',
    clearBtn: 'Șterge',
    closeBtn: 'Închide',
  },
};

function parseDateStr(str: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function formatShortLocalizedDate(dateStr: string, locale: Locale): string {
  const copy = CALENDAR_COPY[locale] ?? CALENDAR_COPY.fr;
  const d = parseDateStr(dateStr);
  if (!d) return '';
  return `${d.getDate()} ${copy.monthsShort[d.getMonth()]}`;
}

export function ModernDatePicker({
  locale,
  value,
  onChange,
  minDate,
  allowClear = false,
  id,
  open: controlledOpen,
  onOpenChange,
  hideTrigger = false,
}: ModernDatePickerProps) {
  const copy = CALENDAR_COPY[locale] ?? CALENDAR_COPY.fr;

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);
  const todayIso = toIsoDate(today);
  const minIso = minDate || todayIso;

  const parsedSelected = parseDateStr(value);
  const initialRef = parsedSelected ?? today;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const [viewYear, setViewYear] = useState(initialRef.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialRef.getMonth());

  const handleToggle = () => {
    if (!isOpen) {
      if (parsedSelected) {
        setViewYear(parsedSelected.getFullYear());
        setViewMonth(parsedSelected.getMonth());
      }
      if (!hideTrigger) {
        setTimeout(() => {
          containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 60);
      }
    }
    setOpen(!isOpen);
  };

  const formatDisplayDate = (dateStr: string): string => {
    const d = parseDateStr(dateStr);
    if (!d) return copy.placeholder;
    const weekday = copy.weekdaysShort[d.getDay()];
    const month = copy.monthsShort[d.getMonth()];
    return `${weekday} ${d.getDate()} ${month} ${d.getFullYear()}`;
  };

  const canGoPrev =
    viewYear > today.getFullYear() ||
    (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const goPrevMonth = () => {
    if (!canGoPrev) return;
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Build Monday-first 42-cell month matrix
  const calendarDays = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const startOffset = (firstOfMonth.getDay() + 6) % 7; // 0 = Monday ... 6 = Sunday
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: Array<{ iso: string; day: number; inMonth: boolean; disabled: boolean }> = [];

    // Leading filler cells (kept visually subtle)
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(viewYear, viewMonth - 1, prevMonthDays - i);
      const iso = toIsoDate(d);
      cells.push({ iso, day: d.getDate(), inMonth: false, disabled: true });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(viewYear, viewMonth, day);
      const iso = toIsoDate(d);
      cells.push({
        iso,
        day,
        inMonth: true,
        disabled: iso < minIso,
      });
    }

    // Trailing filler cells to complete weeks cleanly
    const remainder = cells.length % 7;
    if (remainder !== 0) {
      const need = 7 - remainder;
      for (let i = 1; i <= need; i++) {
        const d = new Date(viewYear, viewMonth + 1, i);
        cells.push({ iso: toIsoDate(d), day: i, inMonth: false, disabled: true });
      }
    }

    return cells;
  }, [viewYear, viewMonth, minIso]);

  return (
    <div ref={containerRef} className="w-full">
      {!hideTrigger && (
        <button
          id={id}
          type="button"
          onClick={handleToggle}
          aria-expanded={isOpen}
          className={`flex h-11 w-full items-center justify-between gap-2 rounded-xl border px-3.5 text-left text-xs font-bold transition-all sm:text-sm ${
            isOpen
              ? 'border-[#C8A96A] bg-[#070D17] text-white shadow-[0_0_0_1px_rgba(200,169,106,0.35)]'
              : 'border-white/15 bg-[#070D17] text-white hover:border-[#C8A96A]/55'
          }`}
        >
          <span className="flex items-center gap-2 truncate">
            <Calendar className="h-4 w-4 shrink-0 text-[#C8A96A]" />
            <span className={value ? 'tabular-nums text-white' : 'text-white/45'}>
              {formatDisplayDate(value)}
            </span>
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[#DFC286] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      )}

      {/* Expandable Inline Midnight-Marine & Champagne Calendar Sheet */}
      {isOpen && (
        <div className="mt-2 rounded-xl border border-[#C8A96A]/45 bg-[#070D17] p-3 shadow-2xl">
          {/* Calendar Header: Prev / Month Year / Next */}
          <div className="mb-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={goPrevMonth}
              disabled={!canGoPrev}
              aria-label="Previous month"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0C1524] text-white transition-colors hover:border-[#C8A96A] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-xs font-extrabold tracking-wide text-white sm:text-sm">
              {copy.months[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={goNextMonth}
              aria-label="Next month"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-[#0C1524] text-white transition-colors hover:border-[#C8A96A]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday Headers (Monday First) */}
          <div className="mb-1 grid grid-cols-7 gap-1 text-center">
            {copy.mondayFirstLabels.map((wd) => (
              <span
                key={wd}
                className="py-0.5 text-[10px] font-bold tracking-wider uppercase text-[#C8A96A]"
              >
                {wd}
              </span>
            ))}
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((cell, idx) => {
              if (!cell.inMonth) {
                return (
                  <span
                    key={`empty-${idx}`}
                    className="flex h-8 items-center justify-center rounded-lg text-xs tabular-nums text-white/15"
                  >
                    {cell.day}
                  </span>
                );
              }

              const isSelected = value === cell.iso;
              const isToday = cell.iso === todayIso;

              return (
                <button
                  key={cell.iso}
                  type="button"
                  disabled={cell.disabled}
                  onClick={() => {
                    onChange(cell.iso);
                    setOpen(false);
                  }}
                  className={`flex h-8 items-center justify-center rounded-lg text-xs tabular-nums transition-all ${
                    isSelected
                      ? 'bg-[#C8A96A] font-extrabold text-[#070D17] shadow-md'
                      : cell.disabled
                      ? 'cursor-not-allowed text-white/20'
                      : isToday
                      ? 'border border-[#C8A96A]/60 bg-[#0C1524] font-bold text-[#DFC286] hover:bg-[#C8A96A]/20'
                      : 'bg-[#0C1524]/70 font-semibold text-white hover:border hover:border-[#C8A96A]/50 hover:bg-[#101C30]'
                  }`}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          {/* Calendar Action Footer */}
          <div className="mt-2 flex items-center justify-between gap-2 border-t border-white/10 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setViewYear(today.getFullYear());
                  setViewMonth(today.getMonth());
                  onChange(todayIso);
                  setOpen(false);
                }}
                className="inline-flex h-7 items-center rounded-lg border border-[#C8A96A]/35 bg-[#0C1524] px-2.5 text-xs font-bold text-[#DFC286] transition-colors hover:border-[#C8A96A] hover:text-white"
              >
                {copy.todayBtn}
              </button>

              {allowClear && value && (
                <button
                  type="button"
                  onClick={() => {
                    onChange('');
                    setOpen(false);
                  }}
                  className="inline-flex h-7 items-center rounded-lg border border-white/10 bg-[#0C1524] px-2.5 text-xs font-semibold text-white/70 transition-colors hover:text-white"
                >
                  {copy.clearBtn}
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={copy.closeBtn}
              className="inline-flex h-7 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-white/65 transition-colors hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
              <span>{copy.closeBtn}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
