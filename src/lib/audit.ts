import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';

export interface AuditEntryInput {
  actorEmail: string;
  action: string;
  entity: 'menu_item' | 'menu_category' | 'reservation' | 'settings' | 'admin_user' | 'cache';
  entityId?: string | null;
  summary: string;
  diff?: Record<string, unknown> | null;
}

export async function writeAuditLog(entry: AuditEntryInput): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    await supabaseAdmin.from('audit_log').insert({
      actor_email: entry.actorEmail,
      action: entry.action,
      entity: entry.entity,
      entity_id: entry.entityId ?? null,
      summary: entry.summary,
      diff: entry.diff ?? null,
    });
  } catch (err) {
    // Audit logging must never block operational mutations
    console.warn('Audit log insert skipped:', err);
  }
}

export async function getRecentAuditLogs(limit = 30) {
  if (!isSupabaseConfigured()) return [];
  try {
    const { data, error } = await supabaseAdmin
      .from('audit_log')
      .select('id, at, actor_email, action, entity, entity_id, summary')
      .order('at', { ascending: false })
      .limit(limit);
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

