import { unstable_cache } from 'next/cache';
import { MENU_CATEGORIES, MENU_ITEMS, type MenuItem } from '@/data/menu';
import { CATEGORY_COVER_IMAGES } from '@/lib/menuDisplay';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';
import {
  emptyLocalized,
  emptyLocalizedList,
  isAllergenCode,
  isMenuBadge,
  MENU_CACHE_TAG,
  type AllergenCode,
  type MenuAddon,
  type MenuBadge,
  type MenuCategoryRow,
  type MenuItemRow,
  type MenuVariant,
  type VatRate,
  type WeightUnit,
} from '@/lib/menu-contract';

/** Parses a human weight string like "950g" or "5 kg" or "75 cl" into value + unit. */
export function parseStaticWeight(raw: string): {
  value: number | null;
  unit: WeightUnit;
} {
  const clean = (raw || '').trim();
  if (!clean) return { value: null, unit: 'g' };
  const m = clean.match(/^(\d+(?:[.,]\d+)?)\s*(kg|g|ml|cl|pcs|buc|pers\.?|persons?)/i);
  if (!m) return { value: null, unit: 'g' };
  const value = parseFloat(m[1].replace(',', '.'));
  const u = m[2].toLowerCase();
  if (u === 'kg') return { value, unit: 'kg' };
  if (u === 'ml') return { value, unit: 'ml' };
  if (u === 'cl') return { value, unit: 'cl' };
  if (u === 'pcs' || u === 'buc') return { value, unit: 'pcs' };
  if (u.startsWith('pers')) return { value, unit: 'persons' };
  return { value, unit: 'g' };
}

function mapStaticItem(item: MenuItem, index: number): MenuItemRow {
  const { value: weight_value, unit: weight_unit } = parseStaticWeight(item.weight);
  const badges: MenuBadge[] = [];
  if (item.tags.includes('featured')) badges.push('signature');

  const vat_rate: VatRate = item.type === 'drink' ? 21 : 12;

  return {
    id: item.id,
    legacy_post_id: item.postId,
    category_id: item.categoryId,
    type: item.type,
    sort_order: index,
    status: 'available',
    sold_out_on: null,
    names: {
      fr: item.translations.fr?.name || '',
      nl: item.translations.nl?.name || '',
      en: item.translations.en?.name || '',
      ro: item.translations.ro?.name || '',
    },
    descriptions: {
      fr: item.translations.fr?.description || '',
      nl: item.translations.nl?.description || '',
      en: item.translations.en?.description || '',
      ro: item.translations.ro?.description || '',
    },
    chef_notes: emptyLocalized(),
    ingredients: emptyLocalizedList(),
    origin: emptyLocalized(),
    nutrition: {
      fr: item.translations.fr?.nutrition || '',
      nl: item.translations.nl?.nutrition || '',
      en: item.translations.en?.nutrition || '',
      ro: item.translations.ro?.nutrition || '',
    },
    price_eur: item.priceEur,
    old_price_eur: null,
    vat_rate,
    weight_value,
    weight_unit,
    kcal: null,
    variants: [],
    addons: [],
    allergens: item.allergens.filter(isAllergenCode),
    badges,
    show_site: true,
    show_qr: true,
    show_takeaway: true,
    show_business_lunch: item.categoryId === 'business-lunch' || item.tags.includes('lunch'),
    image: item.image,
    gallery: [],
    clip_url: null,
  };
}

export function getStaticCategoriesFallback(): MenuCategoryRow[] {
  return MENU_CATEGORIES.map((c, idx) => ({
    id: c.id,
    type: c.type,
    names: { ...c.names },
    subtitles: emptyLocalized(),
    cover_image: CATEGORY_COVER_IMAGES[c.id] || null,
    sort_order: idx,
    is_visible: true,
  }));
}

export function getStaticItemsFallback(): MenuItemRow[] {
  return MENU_ITEMS.map((item, idx) => mapStaticItem(item, idx));
}

function coerceDbItem(raw: Record<string, unknown>): MenuItemRow {
  const allergensRaw = Array.isArray(raw.allergens) ? (raw.allergens as string[]) : [];
  const badgesRaw = Array.isArray(raw.badges) ? (raw.badges as string[]) : [];

  return {
    id: String(raw.id),
    legacy_post_id: raw.legacy_post_id ? String(raw.legacy_post_id) : null,
    category_id: String(raw.category_id),
    type: raw.type === 'drink' ? 'drink' : 'food',
    sort_order: Number(raw.sort_order ?? 0),
    status:
      raw.status === 'sold_out_today' || raw.status === 'hidden'
        ? raw.status
        : 'available',
    sold_out_on: raw.sold_out_on ? String(raw.sold_out_on).slice(0, 10) : null,
    names: { ...emptyLocalized(), ...(raw.names as Record<string, string>) },
    descriptions: { ...emptyLocalized(), ...(raw.descriptions as Record<string, string>) },
    chef_notes: { ...emptyLocalized(), ...(raw.chef_notes as Record<string, string>) },
    ingredients: {
      ...emptyLocalizedList(),
      ...(raw.ingredients as Record<string, string[]>),
    },
    origin: { ...emptyLocalized(), ...(raw.origin as Record<string, string>) },
    nutrition: { ...emptyLocalized(), ...(raw.nutrition as Record<string, string>) },
    price_eur: Number(raw.price_eur ?? 0),
    old_price_eur:
      raw.old_price_eur !== null && raw.old_price_eur !== undefined
        ? Number(raw.old_price_eur)
        : null,
    vat_rate: raw.vat_rate === 6 || raw.vat_rate === 21 ? raw.vat_rate : 12,
    weight_value:
      raw.weight_value !== null && raw.weight_value !== undefined
        ? Number(raw.weight_value)
        : null,
    weight_unit: (['g', 'kg', 'ml', 'cl', 'pcs', 'persons'].includes(
      String(raw.weight_unit)
    )
      ? String(raw.weight_unit)
      : 'g') as WeightUnit,
    kcal:
      raw.kcal !== null && raw.kcal !== undefined ? Number(raw.kcal) : null,
    variants: Array.isArray(raw.variants) ? (raw.variants as MenuVariant[]) : [],
    addons: Array.isArray(raw.addons) ? (raw.addons as MenuAddon[]) : [],
    allergens: allergensRaw.filter(isAllergenCode) as AllergenCode[],
    badges: badgesRaw.filter(isMenuBadge) as MenuBadge[],
    show_site: raw.show_site !== false,
    show_qr: raw.show_qr !== false,
    show_takeaway: raw.show_takeaway !== false,
    show_business_lunch: Boolean(raw.show_business_lunch),
    image: raw.image ? String(raw.image) : null,
    gallery: Array.isArray(raw.gallery) ? (raw.gallery as string[]) : [],
    clip_url: raw.clip_url ? String(raw.clip_url) : null,
    updated_at: raw.updated_at ? String(raw.updated_at) : undefined,
    updated_by: raw.updated_by ? String(raw.updated_by) : null,
  };
}

export interface FullMenuDataResult {
  categories: MenuCategoryRow[];
  items: MenuItemRow[];
  source: 'supabase' | 'static_fallback';
}

async function fetchFullMenuUncached(): Promise<FullMenuDataResult> {
  if (!isSupabaseConfigured()) {
    return {
      categories: getStaticCategoriesFallback(),
      items: getStaticItemsFallback(),
      source: 'static_fallback',
    };
  }

  try {
    const [{ data: cats, error: catErr }, { data: rows, error: itemErr }] =
      await Promise.all([
        supabaseAdmin
          .from('menu_categories')
          .select('*')
          .order('sort_order', { ascending: true }),
        supabaseAdmin
          .from('menu_items')
          .select('*')
          .order('sort_order', { ascending: true }),
      ]);

    if (catErr || itemErr || !rows || rows.length === 0) {
      return {
        categories: getStaticCategoriesFallback(),
        items: getStaticItemsFallback(),
        source: 'static_fallback',
      };
    }

    const categories: MenuCategoryRow[] = (cats ?? []).map((c) => ({
      id: String(c.id),
      type: c.type === 'drink' ? 'drink' : 'food',
      names: { ...emptyLocalized(), ...(c.names || {}) },
      subtitles: { ...emptyLocalized(), ...(c.subtitles || {}) },
      cover_image: c.cover_image ? String(c.cover_image) : null,
      sort_order: Number(c.sort_order ?? 0),
      is_visible: c.is_visible !== false,
    }));

    return {
      categories,
      items: rows.map((r) => coerceDbItem(r as Record<string, unknown>)),
      source: 'supabase',
    };
  } catch (err) {
    console.warn('Menu repo DB fallback to static:', err);
    return {
      categories: getStaticCategoriesFallback(),
      items: getStaticItemsFallback(),
      source: 'static_fallback',
    };
  }
}

export const getCachedFullMenuData = unstable_cache(
  fetchFullMenuUncached,
  ['pescobar-full-menu-v1'],
  { tags: [MENU_CACHE_TAG], revalidate: 300 }
);

/** Uncached read for Admin UI so edits show immediately without stale reads. */
export async function getAdminMenuData(): Promise<FullMenuDataResult> {
  return fetchFullMenuUncached();
}

export async function getAdminMenuItemById(id: string): Promise<{
  item: MenuItemRow | null;
  categories: MenuCategoryRow[];
  source: 'supabase' | 'static_fallback';
}> {
  const full = await fetchFullMenuUncached();
  const item = full.items.find((i) => i.id === id) ?? null;
  return { item, categories: full.categories, source: full.source };
}

