'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { CalendarPlus, Phone, Plus, Save, Users, X } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  adminCreateManualReservation,
  adminUpdateReservationNotes,
  adminUpdateReservationStatus,
} from '@/app/actions/admin-reservations';
import {
  RESERVATION_STATUSES,
  RESERVATION_STATUS_LABELS,
  RESERVATION_ZONES,
  ZONE_LABELS,
  type ReservationRow,
  type ReservationService,
  type ReservationStatus,
  type ReservationZone,
} from '@/lib/reservations-contract';

type DateScope = 'today' | 'tomorrow' | 'upcoming' | 'all';

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
  const [statusFilter, setStatusFilter] = useState<ReservationStatus | 'all'>('all');
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

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (scope === 'today' && r.reservation_date !== today) return false;
      if (scope === 'tomorrow' && r.reservation_date !== tomorrow) return false;
      if (scope === 'upcoming' && r.reservation_date < today) return false;
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      return true;
    });
  }, [rows, scope, statusFilter, today, tomorrow]);

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
    toast.success(`Rezervare marcată: ${RESERVATION_STATUS_LABELS[status].label}`);
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
      {/* Top Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              ['today', `Azi (${today})`],
              ['tomorrow', 'Mâine'],
              ['upcoming', 'Viitoare'],
              ['all', `Toate (${rows.length})`],
            ] as [DateScope, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setScope(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                scope === key
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as ReservationStatus | 'all')
            }
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
          >
            <option value="all">Toate statusurile</option>
            {RESERVATION_STATUSES.map((st) => (
              <option key={st} value={st}>
                {RESERVATION_STATUS_LABELS[st].label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setShowNew(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition"
          >
            <Plus className="w-4 h-4" />
            Rezervare telefonică
          </button>
        </div>
      </div>

      {/* Reservations List */}
      <div className="space-y-3">
        {filtered.map((r) => {
          const stInfo = RESERVATION_STATUS_LABELS[r.status];
          const isBusy = busyId === r.id;
          const draft = notesDraft[r.id] ?? r.internal_notes ?? '';

          return (
            <div
              key={r.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-900">
                      {r.reservation_date} · {r.reservation_time.slice(0, 5)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold">
                      <Users className="w-3.5 h-3.5" />
                      {r.party_size} pers.
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-sky-50 text-sky-800 text-xs font-semibold">
                      {ZONE_LABELS[r.zone]}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${stInfo.badgeClass}`}
                    >
                      {stInfo.label}
                    </span>
                  </div>

                  <p className="mt-1.5 text-sm font-semibold text-slate-900">
                    {r.first_name} {r.last_name}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-3 flex-wrap mt-0.5">
                    <span className="inline-flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {r.phone}
                    </span>
                    {r.email && <span>{r.email}</span>}
                    {r.occasion && (
                      <span className="text-amber-700 font-medium">
                        Ocazie: {r.occasion}
                      </span>
                    )}
                  </p>

                  {r.notes && (
                    <p className="mt-2 text-xs bg-amber-50 text-amber-900 border border-amber-200 rounded-xl px-3 py-1.5">
                      <strong>Notă client / alergii:</strong> {r.notes}
                    </p>
                  )}
                </div>

                {/* 1-click status transitions */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {(
                    [
                      'confirmed',
                      'seated',
                      'completed',
                      'no_show',
                      'cancelled',
                    ] as ReservationStatus[]
                  ).map((target) => (
                    <button
                      key={target}
                      type="button"
                      disabled={isBusy || r.status === target}
                      onClick={() => handleStatus(r.id, target)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition disabled:opacity-40 ${
                        r.status === target
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {RESERVATION_STATUS_LABELS[target].label}
                    </button>
                  ))}
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
                  placeholder="Notă internă (ex: Masa 12 lângă geam, VIP)..."
                  className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                />
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleSaveNotes(r.id)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold"
                >
                  <Save className="w-3.5 h-3.5" />
                  Salvează notă
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
            Nicio rezervare găsită pentru intervalul și statusul selectat.
          </div>
        )}
      </div>

      {/* Modal: Manual Reservation */}
      {showNew && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 text-amber-600" />
                Adaugă rezervare telefonică
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
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
              <input
                type="text"
                required
                placeholder="Prenume *"
                value={newForm.first_name}
                onChange={(e) =>
                  setNewForm((f) => ({ ...f, first_name: e.target.value }))
                }
                className="px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
              <input
                type="text"
                placeholder="Nume"
                value={newForm.last_name}
                onChange={(e) =>
                  setNewForm((f) => ({ ...f, last_name: e.target.value }))
                }
                className="px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="tel"
                required
                placeholder="Telefon *"
                value={newForm.phone}
                onChange={(e) =>
                  setNewForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
              <input
                type="email"
                placeholder="Email (opțional)"
                value={newForm.email}
                onChange={(e) =>
                  setNewForm((f) => ({ ...f, email: e.target.value }))
                }
                className="px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <textarea
              rows={2}
              placeholder="Note / alergii..."
              value={newForm.notes}
              onChange={(e) =>
                setNewForm((f) => ({ ...f, notes: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowNew(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700"
              >
                Anulează
              </button>
              <button
                type="submit"
                disabled={creating}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold disabled:opacity-50"
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

