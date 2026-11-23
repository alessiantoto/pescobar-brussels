import type { Locale } from '@/config/site';

export const RESERVATION_STATUSES = [
  'pending',
  'confirmed',
  'seated',
  'completed',
  'no_show',
  'cancelled',
] as const;
export type ReservationStatus = (typeof RESERVATION_STATUSES)[number];

export const RESERVATION_STATUS_LABELS: Record<
  ReservationStatus,
  { label: string; badgeClass: string }
> = {
  pending: {
    label: 'În așteptare',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  confirmed: {
    label: 'Confirmată',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  seated: {
    label: 'La masă',
    badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  completed: {
    label: 'Finalizată',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
  },
  no_show: {
    label: 'No-Show',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
  },
  cancelled: {
    label: 'Anulată',
    badgeClass: 'bg-zinc-100 text-zinc-600 border-zinc-200',
  },
};

export const RESERVATION_ZONES = ['main', 'window_terrace', 'lounge'] as const;
export type ReservationZone = (typeof RESERVATION_ZONES)[number];

export const ZONE_LABELS: Record<ReservationZone, string> = {
  main: 'Salon Principal',
  window_terrace: 'Fereastră / Terasă',
  lounge: 'Lounge / Grupuri',
};

export type ReservationService = 'lunch' | 'dinner';

export interface ReservationRow {
  id: string;
  created_at: string;
  updated_at: string;
  reservation_date: string; // YYYY-MM-DD
  reservation_time: string; // HH:mm or HH:mm:ss
  service: ReservationService;
  party_size: number;
  zone: ReservationZone;
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  occasion: string | null;
  notes: string | null;
  locale: Locale;
  status: ReservationStatus;
  source: string;
  internal_notes: string | null;
  confirmed_at: string | null;
  updated_by: string | null;
}

export interface CreateReservationInput {
  reservation_date: string;
  reservation_time: string;
  service: ReservationService;
  party_size: number;
  zone: ReservationZone;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string | null;
  occasion?: string | null;
  notes?: string | null;
  locale?: Locale;
  status?: ReservationStatus;
  source?: string;
}

