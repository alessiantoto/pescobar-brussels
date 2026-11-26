'use server';

import { getAdminSession } from '@/app/actions/admin-auth';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';

export interface AdminMessageItem {
  id: string;
  type: 'contact' | 'private_event';
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  eventType?: string;
  eventDate?: string;
  guestsCount?: string;
  company?: string;
}

export async function getAdminMessages(): Promise<{
  ok: boolean;
  messages: AdminMessageItem[];
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { ok: false, messages: [], error: 'Sesiune neautorizată.' };
  }

  if (!isSupabaseConfigured()) {
    return { ok: true, messages: [] };
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('audit_log')
      .select('id, at, action, diff')
      .ilike('action', 'contact.%')
      .order('at', { ascending: false })
      .limit(100);

    if (error) {
      console.warn('getAdminMessages error:', error);
      return { ok: true, messages: [] };
    }

    const messages: AdminMessageItem[] = (data || []).map((row) => {
      const diff = (row.diff || {}) as Record<string, unknown>;
      const isPrivateEvent = row.action === 'contact.private_event';

      return {
        id: String(row.id),
        type: isPrivateEvent ? 'private_event' : 'contact',
        createdAt: row.at ? new Date(row.at).toLocaleString('ro-RO') : '',
        firstName: String(diff.firstName || 'Oaspete'),
        lastName: String(diff.lastName || ''),
        email: String(diff.email || ''),
        phone: String(diff.phone || ''),
        subject: String(diff.subject || (isPrivateEvent ? 'Cerere Eveniment Privat' : 'Mesaj Contact')),
        message: String(diff.message || ''),
        eventType: isPrivateEvent ? String(diff.eventType || 'Eveniment Privat') : undefined,
        eventDate: isPrivateEvent ? String(diff.eventDate || '') : undefined,
        guestsCount: isPrivateEvent ? String(diff.guestsCount || '') : undefined,
        company: isPrivateEvent ? String(diff.company || '') : undefined,
      };
    });

    return { ok: true, messages };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Eroare la încărcarea mesajelor.';
    return { ok: false, messages: [], error: msg };
  }
}
