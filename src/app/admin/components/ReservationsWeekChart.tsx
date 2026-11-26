'use client';

import Link from 'next/link';
import { Calendar, Users, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';

export interface DayReservationStat {
  date: string;
  dayName: string;
  dayNumber: string;
  tablesCount: number;
  coversCount: number;
  isToday: boolean;
  isWeekend: boolean;
}

interface Props {
  stats: DayReservationStat[];
}

export default function ReservationsWeekChart({ stats }: Props) {
  const totalCovers = stats.reduce((sum, d) => sum + d.coversCount, 0);
  const totalTables = stats.reduce((sum, d) => sum + d.tablesCount, 0);
  const maxCovers = Math.max(...stats.map((d) => d.coversCount), 10);

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-2xs space-y-4">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#C8A96A]" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Evoluție Rezervări (Următoarele 7 Zile)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Prognoză mese &amp; flux de oaspeți pentru sală și bucătărie
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#0B192C]/5 border border-[#DFC286]/30 text-xs font-bold text-slate-800">
            <Users className="w-3.5 h-3.5 text-[#C8A96A]" />
            <span>{totalCovers} oaspeți</span>
            <span className="text-slate-400 font-normal">({totalTables} mese)</span>
          </div>

          <Link
            href="/admin/reservations"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0B192C] hover:text-[#C8A96A] transition ml-1"
          >
            Vezi tot <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Bar Chart Grid */}
      <div className="pt-4 pb-2">
        <div className="grid grid-cols-7 gap-1.5 sm:gap-3 items-end h-44 sm:h-52">
          {stats.map((d) => {
            const heightPercent = Math.max(
              Math.round((d.coversCount / maxCovers) * 100),
              d.coversCount > 0 ? 15 : 6
            );

            return (
              <Link
                key={d.date}
                href={`/admin/reservations`}
                className="group flex flex-col items-center justify-end h-full focus:outline-none"
              >
                {/* Count badge above bar */}
                <div className="mb-1 text-center transition-transform group-hover:-translate-y-1">
                  <span
                    className={`text-[10px] sm:text-xs font-bold block ${
                      d.isToday
                        ? 'text-[#0B192C] bg-[#DFC286]/40 px-1 rounded'
                        : d.coversCount > 0
                        ? 'text-slate-900'
                        : 'text-slate-400'
                    }`}
                  >
                    {d.coversCount}p
                  </span>
                  {d.tablesCount > 0 && (
                    <span className="text-[9px] text-slate-400 hidden sm:block">
                      {d.tablesCount}m
                    </span>
                  )}
                </div>

                {/* Vertical Bar */}
                <div className="w-full max-w-[42px] bg-slate-100 rounded-t-xl overflow-hidden relative flex flex-col justify-end p-0.5 group-hover:bg-slate-200 transition">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg transition-all duration-500 relative ${
                      d.isToday
                        ? 'bg-gradient-to-t from-[#B9975B] via-[#DFC286] to-[#ECE0C6] shadow-sm'
                        : d.coversCount > 0
                        ? 'bg-gradient-to-t from-[#0B192C] to-[#1E3A5F]'
                        : 'bg-slate-200/60'
                    }`}
                  >
                    {d.isToday && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0B192C] rounded-full ring-2 ring-white animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Day label underneath */}
                <div className="mt-2 text-center">
                  <span
                    className={`block text-[11px] sm:text-xs font-bold uppercase tracking-tight ${
                      d.isToday
                        ? 'text-[#C8A96A]'
                        : d.isWeekend
                        ? 'text-slate-800'
                        : 'text-slate-500'
                    }`}
                  >
                    {d.isToday ? 'Azi' : d.dayName}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    {d.dayNumber}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Legend & quick helper */}
      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-[#B9975B] to-[#DFC286]" />
            Azi
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#0B192C]" />
            Zile viitoare
          </span>
        </div>
        <p className="text-[11px] text-slate-400">
          Apasă pe o zi pentru a vedea detaliile rezervărilor
        </p>
      </div>
    </div>
  );
}
