'use server';

import { getAdminSession } from '@/app/actions/admin-auth';
import { fail, ok, roleAtLeast, type ActionResult } from '@/lib/admin/types';
import { writeAuditLog } from '@/lib/audit';
import { revalidateMenuAndPublicSite } from '@/lib/revalidate';
import type { RestaurantSettingsBundle } from '@/lib/settings-contract';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';

export async function adminSaveSettingsSection<
  K extends keyof RestaurantSettingsBundle,
>(key: K, value: RestaurantSettingsBundle[K]): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!roleAtLeast(session.role, 'admin')) {
    return fail('Doar managerii sau super-adminii pot modifica setările.');
  }
  if (!isSupabaseConfigured()) {
    return fail('Supabase nu este configurat încă (.env.local).');
  }

  const { error } = await supabaseAdmin.from('site_settings').upsert(
    {
      key,
      value,
      updated_by: session.email,
    },
    { onConflict: 'key' }
  );

  if (error) return fail(`Eroare salvare setări: ${error.message}`);

  await writeAuditLog({
    actorEmail: session.email,
    action: 'settings.update',
    entity: 'settings',
    entityId: key,
    summary: `Setări actualizate: ${key}`,
  });

  revalidateMenuAndPublicSite();
  return ok();
}

export async function purgeAllSiteCache(): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');

  revalidateMenuAndPublicSite();

  await writeAuditLog({
    actorEmail: session.email,
    action: 'cache.purge',
    entity: 'cache',
    summary: 'Cache site public & QR Menu revalidat manual',
  });

  return ok();
}

