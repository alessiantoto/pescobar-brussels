'use server';

import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/app/actions/admin-auth';
import { fail, ok, type ActionResult } from '@/lib/admin/types';
import { writeAuditLog } from '@/lib/audit';
import {
  RESERVATION_STATUSES,
  type CreateReservationInput,
  type ReservationRow,
  type ReservationStatus,
} from '@/lib/reservations-contract';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';
import { sendReservationStatusUpdateEmail } from '@/lib/email';

export async function adminUpdateReservationStatus(
  id: string,
  status: ReservationStatus
): Promise<ActionResult<{ id: string; status: ReservationStatus }>> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!isSupabaseConfigured()) {
    return fail('Supabase nu este configurat încă (.env.local).');
  }
  if (!RESERVATION_STATUSES.includes(status)) {
    return fail('Status rezervare invalid.');
  }

  const updateData: Record<string, unknown> = {
    status,
    updated_by: session.email,
  };
  if (status === 'confirmed') {
    updateData.confirmed_at = new Date().toISOString();
  }

  const { data: updatedRow, error } = await supabaseAdmin
    .from('reservations')
    .update(updateData)
    .eq('id', id)
    .select('first_name, last_name, email, reservation_date, reservation_time, party_size, locale')
    .maybeSingle();

  if (error) return fail(`Eroare DB: ${error.message}`);

  if (updatedRow?.email) {
    sendReservationStatusUpdateEmail(updatedRow as any, status).catch(() => {});
  }

  await writeAuditLog({
    actorEmail: session.email,
    action: 'reservation.status',
    entity: 'reservation',
    entityId: id,
    summary: `Rezervare ${id.slice(0, 8)} -> ${status}`,
    diff: { status },
  });

  revalidatePath('/admin');
  revalidatePath('/admin/reservations');
  return ok({ id, status });
}

export async function adminUpdateReservationNotes(
  id: string,
  internalNotes: string
): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!isSupabaseConfigured()) {
    return fail('Supabase nu este configurat încă (.env.local).');
  }

  const { error } = await supabaseAdmin
    .from('reservations')
    .update({
      internal_notes: internalNotes.trim() || null,
      updated_by: session.email,
    })
    .eq('id', id);

  if (error) return fail(`Eroare DB: ${error.message}`);

  revalidatePath('/admin/reservations');
  return ok();
}

export async function adminCreateManualReservation(
  input: CreateReservationInput
): Promise<ActionResult<ReservationRow>> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!isSupabaseConfigured()) {
    return fail('Supabase nu este configurat încă (.env.local).');
  }

  if (!input.first_name?.trim() || !input.phone?.trim() || !input.reservation_date) {
    return fail('Numele, telefonul și data sunt obligatorii.');
  }

  const { data, error } = await supabaseAdmin
    .from('reservations')
    .insert({
      reservation_date: input.reservation_date,
      reservation_time: input.reservation_time || '19:30',
      service: input.service || 'dinner',
      party_size: Math.max(1, Math.min(40, Number(input.party_size) || 2)),
      zone: input.zone || 'main',
      first_name: input.first_name.trim(),
      last_name: input.last_name?.trim() || '-',
      phone: input.phone.trim(),
      email: input.email?.trim() || null,
      occasion: input.occasion?.trim() || null,
      notes: input.notes?.trim() || null,
      locale: input.locale || 'fr',
      status: input.status || 'confirmed',
      source: input.source || 'admin_manual',
      confirmed_at:
        (input.status || 'confirmed') === 'confirmed'
          ? new Date().toISOString()
          : null,
      updated_by: session.email,
    })
    .select('*')
    .single();

  if (error || !data) {
    return fail(`Eroare salvare rezervare: ${error?.message || 'necunoscută'}`);
  }

  await writeAuditLog({
    actorEmail: session.email,
    action: 'reservation.create_manual',
    entity: 'reservation',
    entityId: data.id,
    summary: `Rezervare manuală: ${data.first_name} ${data.last_name} (${data.party_size} pers., ${data.reservation_date} ${data.reservation_time})`,
  });

  revalidatePath('/admin');
  revalidatePath('/admin/reservations');
  return ok(data as ReservationRow);
}

