/**
 * Menu domain CONTRACT shared by:
 *  - the DB (supabase/migrations/001_pescobar_core.sql)
 *  - server code (menu repo, Server Actions, seed script)
 *  - admin UI (list, 86'd screen, 3-tab editor)
 *  - the public site / QR menu
 *
 * Server AND client safe: no server-only imports here.
 * Row types intentionally use snake_case = exact DB column names.
 */
import type { Locale } from '@/config/site';

export const MENU_LOCALES: readonly Locale[] = ['fr', 'nl', 'en', 'ro'] as const;

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export function emptyLocalized(): LocalizedText {
  return { fr: '', nl: '', en: '', ro: '' };
}
export function emptyLocalizedList(): LocalizedList {
  return { fr: [], nl: [], en: [], ro: [] };
}

/* ---------------------------------------------------------------- allergens */

/** The 14 EU allergens (Reg. 1169/2011 — mandatory in Belgium, AFSCA/FAVV). */
export const EU_ALLERGENS = [
  'gluten',
  'crustaceans',
  'eggs',
  'fish',
  'peanuts',
  'soy',
  'milk',
  'nuts',
  'celery',
  'mustard',
  'sesame',
  'sulphites',
  'lupin',
  'molluscs',
] as const;
export type AllergenCode = (typeof EU_ALLERGENS)[number];

export const ALLERGEN_LABELS: Record<AllergenCode, LocalizedText> = {
  gluten: { fr: 'Gluten', nl: 'Gluten', en: 'Gluten', ro: 'Gluten' },
  crustaceans: { fr: 'Crustacés', nl: 'Schaaldieren', en: 'Crustaceans', ro: 'Crustacee' },
  eggs: { fr: 'Œufs', nl: 'Eieren', en: 'Eggs', ro: 'Ouă' },
  fish: { fr: 'Poisson', nl: 'Vis', en: 'Fish', ro: 'Pește' },
  peanuts: { fr: 'Arachides', nl: 'Pinda’s', en: 'Peanuts', ro: 'Arahide' },
  soy: { fr: 'Soja', nl: 'Soja', en: 'Soy', ro: 'Soia' },
  milk: { fr: 'Lait', nl: 'Melk', en: 'Milk', ro: 'Lactate' },
  nuts: { fr: 'Fruits à coque', nl: 'Noten', en: 'Tree nuts', ro: 'Fructe cu coajă' },
  celery: { fr: 'Céleri', nl: 'Selderij', en: 'Celery', ro: 'Țelină' },
  mustard: { fr: 'Moutarde', nl: 'Mosterd', en: 'Mustard', ro: 'Muștar' },
  sesame: { fr: 'Sésame', nl: 'Sesam', en: 'Sesame', ro: 'Susan' },
  sulphites: { fr: 'Sulfites', nl: 'Sulfiet', en: 'Sulphites', ro: 'Sulfiți' },
  lupin: { fr: 'Lupin', nl: 'Lupine', en: 'Lupin', ro: 'Lupin' },
  molluscs: { fr: 'Mollusques', nl: 'Weekdieren', en: 'Molluscs', ro: 'Moluște' },
};

export function isAllergenCode(value: string): value is AllergenCode {
  return (EU_ALLERGENS as readonly string[]).includes(value);
}

/* ------------------------------------------------------------------- badges */

export const MENU_BADGES = [
  'signature',
  'chefs_choice',
  'catch_of_the_day',
  'spicy',
  'sharing',
  'new',
] as const;
export type MenuBadge = (typeof MENU_BADGES)[number];

export const BADGE_LABELS: Record<MenuBadge, LocalizedText> = {
  signature: { fr: 'Signature', nl: 'Signature', en: 'Signature', ro: 'Signature' },
  chefs_choice: { fr: 'Choix du chef', nl: 'Keuze van de chef', en: 'Chef’s Choice', ro: 'Alegerea bucătarului' },
  catch_of_the_day: { fr: 'Pêche du jour', nl: 'Vangst van de dag', en: 'Catch of the Day', ro: 'Captura zilei' },
  spicy: { fr: 'Épicé', nl: 'Pittig', en: 'Spicy', ro: 'Picant' },
  sharing: { fr: 'À partager (2–3 pers.)', nl: 'Om te delen (2–3 pers.)', en: 'Sharing (2–3 guests)', ro: 'De împărțit (2–3 pers.)' },
  new: { fr: 'Nouveau', nl: 'Nieuw', en: 'New', ro: 'Nou' },
};

export function isMenuBadge(value: string): value is MenuBadge {
  return (MENU_BADGES as readonly string[]).includes(value);
}

/* ------------------------------------------------------------- units / VAT */

export const VAT_RATES = [6, 12, 21] as const;
export type VatRate = (typeof VAT_RATES)[number];
/** 6% takeaway, 12% dine-in food, 21% alcoholic drinks (Belgium). */
export const VAT_HELP: Record<VatRate, string> = {
  6: '6% — takeaway / livraison',
  12: '12% — sur place (nourriture)',
  21: '21% — boissons alcoolisées',
};

export const WEIGHT_UNITS = ['g', 'kg', 'ml', 'cl', 'pcs', 'persons'] as const;
export type WeightUnit = (typeof WEIGHT_UNITS)[number];

/* ------------------------------------------------------------------ status */

export const MENU_ITEM_STATUSES = ['available', 'sold_out_today', 'hidden'] as const;
export type MenuItemStatus = (typeof MENU_ITEM_STATUSES)[number];

export type VariantStatus = 'available' | 'sold_out';

export interface MenuVariant {
  id: string;
  label: LocalizedText;
  weight_value: number | null;
  weight_unit: WeightUnit;
  price_eur: number;
  status: VariantStatus;
}

export interface MenuAddon {
  id: string;
  label: LocalizedText;
  price_eur: number;
  is_available: boolean;
}

/* -------------------------------------------------------------------- rows */

export interface MenuCategoryRow {
  id: string;
  type: 'food' | 'drink';
  names: LocalizedText;
  subtitles: LocalizedText;
  cover_image: string | null;
  sort_order: number;
  is_visible: boolean;
}

export interface MenuItemRow {
  id: string;
  legacy_post_id: string | null;
  category_id: string;
  type: 'food' | 'drink';
  sort_order: number;

  status: MenuItemStatus;
  /** ISO date (YYYY-MM-DD, Europe/Brussels). `sold_out_today` only counts when equal to today. */
  sold_out_on: string | null;

  names: LocalizedText;
  descriptions: LocalizedText;
  chef_notes: LocalizedText;
  ingredients: LocalizedList;
  origin: LocalizedText;
  nutrition: LocalizedText;

  price_eur: number;
  old_price_eur: number | null;
  vat_rate: VatRate;
  weight_value: number | null;
  weight_unit: WeightUnit;
  kcal: number | null;
  variants: MenuVariant[];
  addons: MenuAddon[];

  allergens: AllergenCode[];
  badges: MenuBadge[];

  show_site: boolean;
  show_qr: boolean;
  show_takeaway: boolean;
  show_business_lunch: boolean;

  image: string | null;
  gallery: string[];
  clip_url: string | null;

  updated_at?: string;
  updated_by?: string | null;
}

/** Channels where a dish can appear. */
export const MENU_CHANNELS = ['site', 'qr', 'takeaway', 'business_lunch'] as const;
export type MenuChannel = (typeof MENU_CHANNELS)[number];

/* ----------------------------------------------------------------- helpers */

/** Today's date in Brussels as YYYY-MM-DD (the restaurant's business day). */
export function todayInBrussels(now: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Brussels',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

/** 'sold_out_today' automatically expires at midnight Brussels time. */
export type EffectiveStatus = 'available' | 'sold_out' | 'hidden';

export function effectiveStatus(
  row: Pick<MenuItemRow, 'status' | 'sold_out_on'>,
  today: string = todayInBrussels()
): EffectiveStatus {
  if (row.status === 'hidden') return 'hidden';
  if (row.status === 'sold_out_today' && row.sold_out_on === today) return 'sold_out';
  return 'available';
}

export function isChannelVisible(
  row: Pick<MenuItemRow, 'show_site' | 'show_qr' | 'show_takeaway' | 'show_business_lunch'>,
  channel: MenuChannel
): boolean {
  switch (channel) {
    case 'site':
      return row.show_site;
    case 'qr':
      return row.show_qr;
    case 'takeaway':
      return row.show_takeaway;
    case 'business_lunch':
      return row.show_business_lunch;
  }
}

/** Payload accepted by `adminSaveMenuItem` (create when `id` is empty/new). */
export type MenuItemInput = Omit<MenuItemRow, 'updated_at' | 'updated_by' | 'legacy_post_id'> & {
  legacy_post_id?: string | null;
};

/** Cache tags — every menu mutation MUST call revalidate for these. */
export const MENU_CACHE_TAG = 'menu';
export const SETTINGS_CACHE_TAG = 'settings';

