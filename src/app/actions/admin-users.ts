'use server';

import crypto from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { getAdminSession } from '@/app/actions/admin-auth';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';
import { writeAuditLog } from '@/lib/audit';
import { fail, ok, roleAtLeast, type ActionResult, type AdminRole } from '@/lib/admin/types';

export interface AdminUserRecord {
  id: string;
  email: string;
  full_name: string | null;
  role: AdminRole;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
}

export async function getAdminUsers(): Promise<AdminUserRecord[]> {
  const session = await getAdminSession();
  if (!session) throw new Error('Unauthorized');
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .select('id, email, full_name, role, is_active, last_login, created_at')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error loading admin_users:', error);
    return [];
  }
  return (data ?? []) as AdminUserRecord[];
}

export async function addAdminUser(
  email: string,
  fullName: string,
  role: AdminRole = 'admin'
): Promise<ActionResult<AdminUserRecord>> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!roleAtLeast(session.role, 'admin')) return fail('Permisiuni insuficiente.');
  if (!isSupabaseConfigured()) return fail('Supabase nu este configurat (.env.local).');

  const cleanEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return fail('Adresa de email este invalidă.');
  }

  const safeRole: AdminRole =
    role === 'super_admin' && session.role !== 'super_admin' ? 'admin' : role;

  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .insert({
      email: cleanEmail,
      full_name: fullName.trim() || null,
      role: safeRole,
      is_active: true,
    })
    .select('id, email, full_name, role, is_active, last_login, created_at')
    .single();

  if (error) return fail(error.message);

  // Ensure account exists in Supabase Auth so owner can set/reset password cleanly
  try {
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const exists = usersData?.users?.some(
      (u) => u.email?.toLowerCase() === cleanEmail
    );
    if (!exists) {
      await supabaseAdmin.auth.admin.createUser({
        email: cleanEmail,
        password: crypto.randomBytes(24).toString('hex'),
        email_confirm: true,
        user_metadata: { role: safeRole, full_name: fullName.trim() },
      });
    }
  } catch (authErr) {
    console.warn('Supabase Auth createUser skipped:', authErr);
  }

  await writeAuditLog({
    actorEmail: session.email,
    action: 'admin_user.add',
    entity: 'admin_user',
    entityId: data.id,
    summary: `Adăugat administrator: ${cleanEmail} (${safeRole})`,
  });

  revalidatePath('/admin/settings');
  return ok(data as AdminUserRecord);
}

export async function toggleAdminUserActive(
  id: string,
  isActive: boolean
): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!roleAtLeast(session.role, 'admin')) return fail('Permisiuni insuficiente.');
  if (!isSupabaseConfigured()) return fail('Supabase nu este configurat.');

  const { data: target } = await supabaseAdmin
    .from('admin_users')
    .select('email')
    .eq('id', id)
    .maybeSingle();

  if (target?.email === session.email && !isActive) {
    return fail('Nu îți poți dezactiva propriul cont activ.');
  }

  const { error } = await supabaseAdmin
    .from('admin_users')
    .update({ is_active: isActive })
    .eq('id', id);

  if (error) return fail(error.message);

  await writeAuditLog({
    actorEmail: session.email,
    action: 'admin_user.toggle',
    entity: 'admin_user',
    entityId: id,
    summary: `${isActive ? 'Activat' : 'Dezactivat'} admin: ${target?.email ?? id}`,
  });

  revalidatePath('/admin/settings');
  return ok();
}

export async function removeAdminUser(id: string): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!roleAtLeast(session.role, 'super_admin')) {
    return fail('Doar un super_admin poate șterge administratori.');
  }
  if (!isSupabaseConfigured()) return fail('Supabase nu este configurat.');

  const { data: target } = await supabaseAdmin
    .from('admin_users')
    .select('email')
    .eq('id', id)
    .maybeSingle();

  if (target?.email === session.email) {
    return fail('Nu îți poți șterge propriul cont.');
  }

  const { error } = await supabaseAdmin.from('admin_users').delete().eq('id', id);
  if (error) return fail(error.message);

  await writeAuditLog({
    actorEmail: session.email,
    action: 'admin_user.remove',
    entity: 'admin_user',
    entityId: id,
    summary: `Șters admin: ${target?.email ?? id}`,
  });

  revalidatePath('/admin/settings');
  return ok();
}

