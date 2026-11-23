import { NextResponse } from 'next/server';
import { getCachedRestaurantSettings } from '@/lib/admin/settings-repo';
import {
  checkRateLimit,
  getClientIpFromHeaders,
  rateLimiters,
} from '@/lib/ratelimit';
import type {
  ReservationService,
  ReservationZone,
} from '@/lib/reservations-contract';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';

const VALID_ZONES: ReservationZone[] = ['main', 'window_terrace', 'lounge'];
const VALID_LOCALES = ['fr', 'nl', 'en', 'ro'] as const;

export async function POST(request: Request) {
  const ip = getClientIpFromHeaders(request.headers);
  const rl = await checkRateLimit(rateLimiters.reservation, ip, 'reservation');
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many reservation attempts. Please wait a moment.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const reservationDate = String(body.reservation_date ?? '').trim();
  const reservationTime = String(body.reservation_time ?? '').trim();
  const firstName = String(body.first_name ?? '').trim();
  const lastName = String(body.last_name ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const email = String(body.email ?? '').trim() || null;
  const occasion = String(body.occasion ?? '').trim() || null;
  const notes = String(body.notes ?? '').trim() || null;
  const partySize = Math.max(1, Math.min(30, Number(body.party_size) || 2));
  const service: ReservationService =
    body.service === 'lunch' ? 'lunch' : 'dinner';
  const zone: ReservationZone = VALID_ZONES.includes(
    body.zone as ReservationZone
  )
    ? (body.zone as ReservationZone)
    : 'main';
  const locale = (VALID_LOCALES as readonly string[]).includes(
    String(body.locale ?? '')
  )
    ? String(body.locale)
    : 'fr';

  if (!/^\d{4}-\d{2}-\d{2}$/.test(reservationDate)) {
    return NextResponse.json({ ok: false, error: 'Invalid date.' }, { status: 400 });
  }
  if (!reservationTime || !firstName || !phone) {
    return NextResponse.json(
      { ok: false, error: 'Name, phone, and time are required.' },
      { status: 400 }
    );
  }

  const { settings } = await getCachedRestaurantSettings();
  if (!settings.reservation_rules.onlineBookingsEnabled) {
    return NextResponse.json(
      { ok: false, error: 'Online bookings are temporarily disabled.' },
      { status: 409 }
    );
  }

  const isClosedDay = settings.closed_days.some((d) => d.date === reservationDate);
  if (isClosedDay) {
    return NextResponse.json(
      { ok: false, error: 'The restaurant is closed on this date.' },
      { status: 409 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({
      ok: true,
      savedToDb: false,
      message: 'Supabase not configured yet; WhatsApp/email flow continues.',
    });
  }

  const { data, error } = await supabaseAdmin
    .from('reservations')
    .insert({
      reservation_date: reservationDate,
      reservation_time: reservationTime,
      service,
      party_size: partySize,
      zone,
      first_name: firstName.slice(0, 80),
      last_name: (lastName || '-').slice(0, 80),
      phone: phone.slice(0, 40),
      email: email ? email.slice(0, 120) : null,
      occasion: occasion ? occasion.slice(0, 120) : null,
      notes: notes ? notes.slice(0, 600) : null,
      locale,
      status: 'pending',
      source: 'website',
    })
    .select('id')
    .single();

  if (error) {
    console.error('Reservation DB insert error:', error.message);
    return NextResponse.json(
      { ok: false, error: 'Could not save reservation.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, savedToDb: true, id: data?.id ?? null });
}

