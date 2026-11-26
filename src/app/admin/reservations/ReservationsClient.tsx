'use client';

import { useMemo, useState, type FormEvent } from 'react';
import {
  Calendar,
  CalendarPlus,
  ChevronLeft,
  ChevronRight,
  Filter,
  MessageCircle,
  Phone,
  Plus,
  Save,
  Search,
  Users,
  X,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  adminCreateManualReservation,
  adminUpdateReservationNotes,
  adminUpdateReservationStatus,
} from '@/app/actions/admin-reservations';
import {
  RESERVATION_ZONES,
  ZONE_LABELS,
  type ReservationRow,
  type ReservationService,
  type ReservationStatus,
  type ReservationZone,
} from '@/lib/reservations-contract';

type DateScope = 'today' | 'tomorrow' | 'upcoming' | 'all';
type StatusFilter = 'all' | 'active' | 'cancelled';

const PAGE_SIZE = 15;

function addDaysIso(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function ReservationsClient({
  initialRows,
  today,
}: {
  initialRows: ReservationRow[];
  today: string;
}) {
  const tomorrow = addDaysIso(today, 1);
  const [rows, setRows] = useState(initialRows);
  const [scope, setScope] = useState<DateScope>('today');
  const [customDate, setCustomDate] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});

  // Manual reservation modal
  const [showNew, setShowNew] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newForm, setNewForm] = useState({
    reservation_date: today,
    reservation_time: '19:30',
    service: 'dinner' as ReservationService,
    party_size: 4,
    zone: 'main' as ReservationZone,
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    notes: '',
  });

  // Scope counters for badges (only count ACTIVE reservations, exclude cancelled)
  const scopeCounts = useMemo(() => {
    let todayCount = 0;
    let tomorrowCount = 0;
    let upcomingCount = 0;
    let allCount = 0;

    for (const r of rows) {
      if (r.status === 'cancelled') continue;
      if (r.reservation_date === today) todayCount++;
      if (r.reservation_date === tomorrow) tomorrowCount++;
      if (r.reservation_date >= today) upcomingCount++;
      allCount++;
    }

    return {
      today: todayCount,
      tomorrow: tomorrowCount,
      upcoming: upcomingCount,
      all: allCount,
    };
  }, [rows, today, tomorrow]);

  // Filtered reservations
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      // Date filter: if customDate is selected, use it; otherwise use quick scope pills
      if (customDate) {
        if (r.reservation_date !== customDate) return false;
      } else {
        if (scope === 'today' && r.reservation_date !== today) return false;
        if (scope === 'tomorrow' && r.reservation_date !== tomorrow) return false;
        if (scope === 'upcoming' && r.reservation_date < today) return false;
      }

      // Status filter: simplified to All / Active / Cancelled
      if (statusFilter === 'active' && r.status === 'cancelled') return false;
      if (statusFilter === 'cancelled' && r.status !== 'cancelled') return false;

      if (!q) return true;

      const fullName = `${r.first_name} ${r.last_name}`.toLowerCase();
      const phone = (r.phone ?? '').toLowerCase();
      const email = (r.email ?? '').toLowerCase();
      const notes = (r.notes ?? '').toLowerCase();
      const internalNotes = (r.internal_notes ?? '').toLowerCase();

      return (
        fullName.includes(q) ||
        phone.includes(q) ||
        email.includes(q) ||
        notes.includes(q) ||
        internalNotes.includes(q)
      );
    });
  }, [rows, customDate, scope, statusFilter, search, today, tomorrow]);

  // Pagination calculation
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedRows = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const handleScopeChange = (newScope: DateScope) => {
    setCustomDate('');
    setScope(newScope);
    setCurrentPage(1);
  };

  const handleCustomDateChange = (date: string) => {
    setCustomDate(date);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (newStatus: StatusFilter) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatus = async (id: string, status: ReservationStatus) => {
    setBusyId(id);
    const res = await adminUpdateReservationStatus(id, status);
    setBusyId(null);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    if (status === 'cancelled') {
      toast.success('Rezervarea a fost anulată.');
    } else {
      toast.success('Rezervarea a fost reactivată.');
    }
  };

  const handleSaveNotes = async (id: string) => {
    const val = notesDraft[id] ?? '';
    setBusyId(id);
    const res = await adminUpdateReservationNotes(id, val);
    setBusyId(null);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, internal_notes: val } : r))
    );
    toast.success('Notă internă salvată.');
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setCreating(true);
    const res = await adminCreateManualReservation({
      ...newForm,
      status: 'confirmed',
      source: 'admin_manual',
    });
    setCreating(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setRows((prev) => [res.data, ...prev]);
    setShowNew(false);
    setNewForm((f) => ({ ...f, first_name: '', last_name: '', phone: '', email: '', notes: '' }));
    toast.success('Rezervare manuală adăugată!');
  };

  return (
    <div className="space-y-5">
      {/* Top Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4 shadow-2xs">
        {/* Row 1: Segmented Date Pills, Custom Date Picker & New Reservation CTA */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Segmented Pill Bar & Date Picker */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/60">
              {(
                [
                  ['today', `Azi (${scopeCounts.today})`],
                  ['tomorrow', `Mâine (${scopeCounts.tomorrow})`],
                  ['upcoming', `Viitoare (${scopeCounts.upcoming})`],
                  ['all', `Toate (${scopeCounts.all})`],
                ] as [DateScope, string][]
              ).map(([key, label]) => {
                const isActive = !customDate && scope === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleScopeChange(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition ${
                      isActive
                        ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Custom Date Input with clear button */}
            <div className="flex items-center gap-1.5">
              <input
                type="date"
                value={customDate}
                onChange={(e) => handleCustomDateChange(e.target.value)}
                className={`px-2.5 py-1.5 rounded-xl bg-white text-slate-800 border text-xs font-semibold focus:outline-none focus:border-slate-400 cursor-pointer shadow-xs ${
                  customDate ? 'border-slate-800 ring-1 ring-slate-800 text-slate-900 font-bold' : 'border-slate-200'
                }`}
                title="Alege o dată specifică"
              />
              {customDate && (
                <button
                  type="button"
                  onClick={() => handleCustomDateChange('')}
                  className="inline-flex items-center gap-1 px-2 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition"
                  title="Revino la filtre rapide"
                >
                  <X className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Șterge</span>
                </button>
              )}
            </div>
          </div>

          {/* Action button: + Rezervare manuală */}
          <button
            type="button"
            onClick={() => setShowNew(true)}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            Rezervare manuală
          </button>
        </div>

        {/* Row 2: Search Input & Status Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 border-t border-slate-100">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Caută oaspete (nume, telefon, email, note)..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-xs sm:text-sm focus:border-slate-400 focus:outline-none placeholder:text-slate-400"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Simplified Status Select */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) =>
                  handleStatusFilterChange(e.target.value as StatusFilter)
                }
                className="px-3 py-2 pr-8 rounded-xl bg-white text-slate-900 border border-slate-200 text-xs font-semibold focus:border-slate-400 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">Toate rezervările</option>
                <option value="active">Doar Active</option>
                <option value="cancelled">Doar Anulate</option>
              </select>
              <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {(search || statusFilter !== 'all' || scope !== 'today' || customDate) && (
              <button
                type="button"
                onClick={() => {
                  setCustomDate('');
                  setScope('today');
                  setStatusFilter('all');
                  setSearch('');
                  setCurrentPage(1);
                }}
                className="px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              >
                Resetează filtre
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pagination Top Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs text-slate-500">
        <p>
          {totalItems === 0 ? (
            <span>0 rezervări găsite</span>
          ) : (
            <span>
              Afișare{' '}
              <strong className="text-slate-800">
                {startIndex + 1} - {Math.min(startIndex + PAGE_SIZE, totalItems)}
              </strong>{' '}
              din <strong className="text-slate-800">{totalItems}</strong> rezervări
            </span>
          )}
        </p>

        {totalPages > 1 && (
          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Pagina anterioară"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 py-1 text-xs font-bold text-slate-700 bg-slate-100 rounded-md">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Pagina următoare"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Reservations List */}
      <div className="space-y-3">
        {paginatedRows.map((r) => {
          const isBusy = busyId === r.id;
          const isCancelled = r.status === 'cancelled';
          const draft = notesDraft[r.id] ?? r.internal_notes ?? '';
          const cleanPhone = (r.phone || '').replace(/[^0-9+]/g, '');

          return (
            <div
              key={r.id}
              className={`rounded-2xl border p-4 sm:p-5 space-y-3 shadow-2xs transition ${
                isCancelled
                  ? 'opacity-65 bg-slate-50/80 border-slate-200 text-slate-500'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header row: Date, time, party size, zone, status badge */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {r.reservation_date} · {r.reservation_time.slice(0, 5)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      {r.party_size} pers.
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-sky-50 text-sky-800 text-xs font-semibold">
                      {ZONE_LABELS[r.zone]}
                    </span>
                    {isCancelled ? (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-rose-50 text-rose-700 border-rose-200">
                        Anulată
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
                        Activă
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-base font-bold ${
                      isCancelled
                        ? 'line-through decoration-slate-400 text-slate-500'
                        : 'text-slate-900'
                    }`}
                  >
                    {r.first_name} {r.last_name}
                  </p>

                  <div className="text-xs text-slate-500 flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                      <Phone className="w-3 h-3 text-slate-400" /> {r.phone}
                    </span>
                    {r.email && <span className="text-slate-500 font-mono text-[11px]">{r.email}</span>}
                    {r.occasion && (
                      <span className="text-slate-700 font-medium bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                        Ocazie: {r.occasion}
                      </span>
                    )}
                  </div>

                  {r.notes && (
                    <p className="mt-2 text-xs bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-3 py-1.5">
                      <strong className="text-slate-900">Notă client / cerințe / alergii:</strong> {r.notes}
                    </p>
                  )}
                </div>

                {/* Direct Action Contacts (Call & WhatsApp) */}
                <div className="flex items-center gap-2 shrink-0">
                  {cleanPhone && (
                    <a
                      href={`https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(
                        `Bună ziua ${r.first_name}, vă contactăm de la Pescobar Seafood Restaurant Bruxelles cu privire la rezervarea dumneavoastră din data de ${r.reservation_date} la ora ${r.reservation_time.slice(0, 5)}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp
                    </a>
                  )}

                  {r.phone && (
                    <a
                      href={`tel:${r.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      Sună
                    </a>
                  )}
                </div>
              </div>

              {/* Status Action Row: 1-click simple toggle */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Status:</span>
                  {isCancelled ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600">
                      <XCircle className="w-3.5 h-3.5" />
                      Anulată
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Activă
                    </span>
                  )}
                </div>

                <div>
                  {isCancelled ? (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleStatus(r.id, 'confirmed')}
                      className="inline-flex items-center gap-1.5 text-emerald-700 hover:bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 text-xs font-medium transition disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Reactivează rezervarea
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isBusy}
                      onClick={() => handleStatus(r.id, 'cancelled')}
                      className="inline-flex items-center gap-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg px-2.5 py-1 text-xs font-medium transition disabled:opacity-50"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Anulează rezervarea
                    </button>
                  )}
                </div>
              </div>

              {/* Internal staff notes */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) =>
                    setNotesDraft((prev) => ({ ...prev, [r.id]: e.target.value }))
                  }
                  placeholder="Notă internă (ex: Masa 12 lângă geam, VIP, atenție vin)..."
                  className="flex-1 px-3 py-1.5 rounded-xl bg-white text-slate-900 border border-slate-200 text-xs focus:border-slate-400 focus:outline-none placeholder:text-slate-400"
                />
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleSaveNotes(r.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
                >
                  <Save className="w-3.5 h-3.5 text-slate-600" />
                  Salvează
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-2">
            <Calendar className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">Nicio rezervare găsită.</p>
            <p className="text-xs text-slate-400">
              Modifică filtrele de dată sau termenul de căutare pentru a vizualiza rezervări.
            </p>
          </div>
        )}
      </div>

      {/* Pagination Bottom Bar */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
          <p className="text-xs text-slate-500">
            Afișare{' '}
            <strong className="text-slate-800">
              {startIndex + 1} - {Math.min(startIndex + PAGE_SIZE, totalItems)}
            </strong>{' '}
            din <strong className="text-slate-800">{totalItems}</strong> rezervări (pagina {safePage} din {totalPages})
          </p>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Înapoi
            </button>

            {/* Numeric page pills */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - safePage) <= 1)
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev && p - prev > 1;
                  return (
                    <div key={p} className="flex items-center gap-1">
                      {showEllipsis && <span className="text-xs text-slate-400 px-1">…</span>}
                      <button
                        type="button"
                        onClick={() => setCurrentPage(p)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition ${
                          safePage === p
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {p}
                      </button>
                    </div>
                  );
                })}
            </div>

            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Înainte
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modal: Manual Reservation */}
      {showNew && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 text-slate-700" />
                Adaugă rezervare manuală
              </h3>
              <button
                type="button"
                onClick={() => setShowNew(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Data *
                </label>
                <input
                  type="date"
                  required
                  value={newForm.reservation_date}
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, reservation_date: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ora *
                </label>
                <input
                  type="time"
                  required
                  value={newForm.reservation_time}
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, reservation_time: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Persoane *
                </label>
                <input
                  type="number"
                  min={1}
                  max={40}
                  value={newForm.party_size}
                  onChange={(e) =>
                    setNewForm((f) => ({
                      ...f,
                      party_size: Number(e.target.value) || 2,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Zonă
                </label>
                <select
                  value={newForm.zone}
                  onChange={(e) =>
                    setNewForm((f) => ({
                      ...f,
                      zone: e.target.value as ReservationZone,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:border-slate-400 focus:outline-none"
                >
                  {RESERVATION_ZONES.map((z) => (
                    <option key={z} value={z}>
                      {ZONE_LABELS[z]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Prenume *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Prenume *"
                  value={newForm.first_name}
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, first_name: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nume de familie
                </label>
                <input
                  type="text"
                  placeholder="Nume"
                  value={newForm.last_name}
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, last_name: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Telefon *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+32 ... *"
                  value={newForm.phone}
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email (opțional)"
                  value={newForm.email}
                  onChange={(e) =>
                    setNewForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:border-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Note / alergii / cerințe speciale
              </label>
              <textarea
                rows={2}
                placeholder="Ex: Alergie la crustacee, masă retrasă..."
                value={newForm.notes}
                onChange={(e) =>
                  setNewForm((f) => ({ ...f, notes: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:border-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowNew(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Anulează
              </button>
              <button
                type="submit"
                disabled={creating}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition disabled:opacity-50 shadow-xs"
              >
                {creating ? 'Se salvează...' : 'Confirmă rezervarea'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
