'use server';

import { getAdminSession } from '@/app/actions/admin-auth';
import { fail, ok, roleAtLeast, type ActionResult } from '@/lib/admin/types';
import { writeAuditLog } from '@/lib/audit';
import {
  MENU_ITEM_STATUSES,
  todayInBrussels,
  type MenuCategoryRow,
  type MenuItemInput,
  type MenuItemRow,
  type MenuItemStatus,
} from '@/lib/menu-contract';
import { revalidateMenuAndPublicSite } from '@/lib/revalidate';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';

function slugifyId(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);
}

export async function adminSetDishStatus(
  id: string,
  status: MenuItemStatus
): Promise<ActionResult<{ id: string; status: MenuItemStatus; sold_out_on: string | null }>> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!isSupabaseConfigured()) {
    return fail('Supabase nu este configurat încă (.env.local).');
  }
  if (!MENU_ITEM_STATUSES.includes(status)) {
    return fail('Status invalid.');
  }

  const soldOutOn = status === 'sold_out_today' ? todayInBrussels() : null;
  const { error } = await supabaseAdmin
    .from('menu_items')
    .update({
      status,
      sold_out_on: soldOutOn,
      updated_by: session.email,
    })
    .eq('id', id);

  if (error) return fail(`Eroare DB: ${error.message}`);

  await writeAuditLog({
    actorEmail: session.email,
    action: 'menu_item.status',
    entity: 'menu_item',
    entityId: id,
    summary: `Status schimbat în "${status}" pentru ${id}`,
    diff: { status, sold_out_on: soldOutOn },
  });

  revalidateMenuAndPublicSite();
  return ok({ id, status, sold_out_on: soldOutOn });
}

export async function adminToggleBusinessLunch(
  id: string,
  enabled: boolean
): Promise<ActionResult<{ id: string; show_business_lunch: boolean }>> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!isSupabaseConfigured()) {
    return fail('Supabase nu este configurat încă (.env.local).');
  }

  const { error } = await supabaseAdmin
    .from('menu_items')
    .update({
      show_business_lunch: Boolean(enabled),
      updated_by: session.email,
    })
    .eq('id', id);

  if (error) return fail(`Eroare DB: ${error.message}`);

  await writeAuditLog({
    actorEmail: session.email,
    action: 'menu_item.business_lunch',
    entity: 'menu_item',
    entityId: id,
    summary: `${enabled ? 'Activat' : 'Dezactivat'} în Business Lunch: ${id}`,
  });

  revalidateMenuAndPublicSite();
  return ok({ id, show_business_lunch: Boolean(enabled) });
}

export async function adminSaveDish(
  input: MenuItemInput,
  isNew = false
): Promise<ActionResult<{ id: string }>> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!roleAtLeast(session.role, 'admin')) {
    return fail('Doar managerii sau super-adminii pot modifica structura meniului.');
  }
  if (!isSupabaseConfigured()) {
    return fail('Supabase nu este configurat încă (.env.local).');
  }

  const frName = input.names.fr?.trim() || input.names.en?.trim() || input.names.ro?.trim();
  if (!frName) {
    return fail('Completează cel puțin numele preparatului (FR sau EN).');
  }
  if (!input.category_id) {
    return fail('Selectează o categorie.');
  }
  const price = Number(input.price_eur);
  if (!Number.isFinite(price) || price < 0) {
    return fail('Prețul trebuie să fie un număr valid (>= 0).');
  }

  const targetId = isNew
    ? slugifyId(input.id?.trim() || frName) || `dish-${Date.now()}`
    : input.id.trim();

  if (!targetId) return fail('ID invalid pentru preparat.');

  const soldOutOn =
    input.status === 'sold_out_today' ? input.sold_out_on || todayInBrussels() : null;

  const payload = {
    id: targetId,
    legacy_post_id: input.legacy_post_id ?? null,
    category_id: input.category_id,
    type: input.type === 'drink' ? 'drink' : 'food',
    sort_order: Math.max(0, Math.round(Number(input.sort_order) || 0)),
    status: input.status,
    sold_out_on: soldOutOn,
    names: {
      fr: input.names.fr?.trim() || frName,
      nl: input.names.nl?.trim() || frName,
      en: input.names.en?.trim() || frName,
      ro: input.names.ro?.trim() || frName,
    },
    descriptions: input.descriptions,
    chef_notes: input.chef_notes,
    ingredients: input.ingredients,
    origin: input.origin,
    nutrition: input.nutrition,
    price_eur: Number(price.toFixed(2)),
    old_price_eur:
      input.old_price_eur !== null &&
      input.old_price_eur !== undefined &&
      Number.isFinite(Number(input.old_price_eur))
        ? Number(Number(input.old_price_eur).toFixed(2))
        : null,
    vat_rate: input.vat_rate,
    weight_value:
      input.weight_value !== null &&
      input.weight_value !== undefined &&
      Number.isFinite(Number(input.weight_value))
        ? Number(input.weight_value)
        : null,
    weight_unit: input.weight_unit,
    kcal:
      input.kcal !== null && input.kcal !== undefined && Number.isFinite(Number(input.kcal))
        ? Math.round(Number(input.kcal))
        : null,
    variants: input.variants ?? [],
    addons: input.addons ?? [],
    allergens: input.allergens ?? [],
    badges: input.badges ?? [],
    show_site: Boolean(input.show_site),
    show_qr: Boolean(input.show_qr),
    show_takeaway: Boolean(input.show_takeaway),
    show_business_lunch: Boolean(input.show_business_lunch),
    image: input.image?.trim() || null,
    gallery: (input.gallery ?? []).filter(Boolean),
    clip_url: input.clip_url?.trim() || null,
    updated_by: session.email,
  };

  if (isNew) {
    const { data: existing } = await supabaseAdmin
      .from('menu_items')
      .select('id')
      .eq('id', targetId)
      .maybeSingle();

    const finalId = existing ? `${targetId}-${Date.now().toString().slice(-4)}` : targetId;
    const { error } = await supabaseAdmin
      .from('menu_items')
      .insert({ ...payload, id: finalId });

    if (error) return fail(`Eroare creare preparat: ${error.message}`);

    await writeAuditLog({
      actorEmail: session.email,
      action: 'menu_item.create',
      entity: 'menu_item',
      entityId: finalId,
      summary: `Preparat creat: ${payload.names.fr} (€${payload.price_eur})`,
    });

    revalidateMenuAndPublicSite();
    return ok({ id: finalId });
  }

  const { error } = await supabaseAdmin
    .from('menu_items')
    .update(payload)
    .eq('id', targetId);

  if (error) return fail(`Eroare salvare preparat: ${error.message}`);

  await writeAuditLog({
    actorEmail: session.email,
    action: 'menu_item.update',
    entity: 'menu_item',
    entityId: targetId,
    summary: `Preparat actualizat: ${payload.names.fr} (€${payload.price_eur})`,
  });

  revalidateMenuAndPublicSite();
  return ok({ id: targetId });
}

export async function adminDuplicateDish(
  id: string
): Promise<ActionResult<{ id: string }>> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!roleAtLeast(session.role, 'admin')) {
    return fail('Doar managerii pot duplica preparate.');
  }
  if (!isSupabaseConfigured()) {
    return fail('Supabase nu este configurat încă (.env.local).');
  }

  const { data: original, error: fetchError } = await supabaseAdmin
    .from('menu_items')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (fetchError || !original) {
    return fail('Preparatul nu a fost găsit.');
  }

  const copy = original as MenuItemRow;
  const newId = `${copy.id}-copy-${Date.now().toString().slice(-4)}`;

  const { error: insertError } = await supabaseAdmin.from('menu_items').insert({
    ...copy,
    id: newId,
    legacy_post_id: null,
    status: 'hidden',
    sold_out_on: null,
    names: {
      fr: `${copy.names.fr} (Copie)`,
      nl: `${copy.names.nl} (Kopie)`,
      en: `${copy.names.en} (Copy)`,
      ro: `${copy.names.ro} (Copie)`,
    },
    sort_order: copy.sort_order + 1,
    updated_by: session.email,
  });

  if (insertError) return fail(`Eroare duplicare: ${insertError.message}`);

  await writeAuditLog({
    actorEmail: session.email,
    action: 'menu_item.duplicate',
    entity: 'menu_item',
    entityId: newId,
    summary: `Preparat duplicat din ${id} -> ${newId}`,
  });

  revalidateMenuAndPublicSite();
  return ok({ id: newId });
}

export async function adminDeleteDish(id: string): Promise<ActionResult> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!roleAtLeast(session.role, 'admin')) {
    return fail('Doar managerii pot șterge preparate.');
  }
  if (!isSupabaseConfigured()) {
    return fail('Supabase nu este configurat încă (.env.local).');
  }

  const { error } = await supabaseAdmin.from('menu_items').delete().eq('id', id);
  if (error) return fail(`Eroare ștergere: ${error.message}`);

  await writeAuditLog({
    actorEmail: session.email,
    action: 'menu_item.delete',
    entity: 'menu_item',
    entityId: id,
    summary: `Preparat șters: ${id}`,
  });

  revalidateMenuAndPublicSite();
  return ok();
}

export async function adminSaveCategory(
  cat: MenuCategoryRow
): Promise<ActionResult<{ id: string }>> {
  const session = await getAdminSession();
  if (!session) return fail('Neautorizat.');
  if (!roleAtLeast(session.role, 'admin')) {
    return fail('Doar managerii pot modifica categoriile.');
  }
  if (!isSupabaseConfigured()) {
    return fail('Supabase nu este configurat încă (.env.local).');
  }

  const cleanId = slugifyId(cat.id || cat.names.fr || '');
  if (!cleanId) return fail('ID categorie invalid.');

  const { error } = await supabaseAdmin.from('menu_categories').upsert(
    {
      id: cleanId,
      type: cat.type === 'drink' ? 'drink' : 'food',
      names: cat.names,
      subtitles: cat.subtitles,
      cover_image: cat.cover_image || null,
      sort_order: Math.max(0, Math.round(Number(cat.sort_order) || 0)),
      is_visible: Boolean(cat.is_visible),
    },
    { onConflict: 'id' }
  );

  if (error) return fail(`Eroare salvare categorie: ${error.message}`);

  await writeAuditLog({
    actorEmail: session.email,
    action: 'menu_category.upsert',
    entity: 'menu_category',
    entityId: cleanId,
    summary: `Categorie salvată: ${cat.names.fr}`,
  });

  revalidateMenuAndPublicSite();
  return ok({ id: cleanId });
}

