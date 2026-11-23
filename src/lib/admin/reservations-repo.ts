import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';
import { todayInBrussels } from '@/lib/menu-contract';
import type { ReservationRow } from '@/lib/reservations-contract';

export async function getAdminReservations(filter?: {
  scope?: 'today' | 'tomorrow' | 'upcoming' | 'all';
  status?: string;
}): Promise<{
  rows: ReservationRow[];
  source: 'supabase' | 'static_fallback';
}> {
  if (!isSupabaseConfigured()) {
    return { rows: [], source: 'static_fallback' };
  }

  try {
    let query = supabaseAdmin
      .from('reservations')
      .select('*')
      .order('reservation_date', { ascending: true })
      .order('reservation_time', { ascending: true });

    const today = todayInBrussels();
    if (filter?.scope === 'today') {
      query = query.eq('reservation_date', today);
    } else if (filter?.scope === 'tomorrow') {
      const d = new Date(`${today}T12:00:00Z`);
      d.setUTCDate(d.getUTCDate() + 1);
      query = query.eq('reservation_date', d.toISOString().slice(0, 10));
    } else if (filter?.scope === 'upcoming') {
      query = query.gte('reservation_date', today);
    }

    if (filter?.status && filter.status !== 'all') {
      query = query.eq('status', filter.status);
    }

    const { data, error } = await query.limit(300);
    if (error || !data) {
      return { rows: [], source: 'supabase' };
    }
    return { rows: data as ReservationRow[], source: 'supabase' };
  } catch (err) {
    console.error('Error loading reservations:', err);
    return { rows: [], source: 'static_fallback' };
  }
}

