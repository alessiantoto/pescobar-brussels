/**
 * Idempotent Supabase seed script:
 * Imports all categories & 185 dishes from `src/data/menu.ts` + default
 * restaurant settings from `SITE_CONFIG` into Supabase Postgres.
 *
 * Usage (once `.env.local` has NEXT_PUBLIC_SUPABASE_URL & SUPABASE_SERVICE_ROLE_KEY):
 *   node scripts/seed-supabase.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const k = trimmed.slice(0, eq).trim();
    let v = trimmed.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!process.env[k]) process.env[k] = v;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key || url.includes('placeholder') || key.includes('placeholder')) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local.');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

// Read menu.ts via tsx / dynamic evaluation-free JSON extraction
const menuSrc = fs.readFileSync(path.join(process.cwd(), 'src/data/menu.ts'), 'utf8');
const catMatch = menuSrc.match(/export const MENU_CATEGORIES[^=]*=\s*(\[[\s\S]*?\n\]);/);
const itemMatch = menuSrc.match(/export const MENU_ITEMS[^=]*=\s*(\[[\s\S]*?\n\]);/);
if (!catMatch || !itemMatch) {
  console.error('Could not parse MENU_CATEGORIES or MENU_ITEMS from src/data/menu.ts');
  process.exit(1);
}

const MENU_CATEGORIES = JSON.parse(catMatch[1]);
const MENU_ITEMS = JSON.parse(itemMatch[1]);

const CATEGORY_COVERS = {
  'pescobar-seafood-boil': '/images/catalog/seafood-boil-1.jpg',
  'business-lunch': '/images/catalog/pescobar-octopus-taverna-racilor-supe.jpg',
  aperitifs: '/images/catalog/salata-de-icre-creveti-1.jpg',
  'delices-marins': '/images/catalog/pescobar-octopus-taverna-racilor-seafood-snacks.jpg',
  'cuisine-avec-talent': '/images/catalog/pescobar-octopus-taverna-racilor-gatite-cu-talent.jpg',
  soupes: '/images/catalog/pescobar-octopus-taverna-racilor-supe.jpg',
  viande: '/images/catalog/pescobar-bruxelles-preparate-traditionale-vita-si-oaie.jpg',
  pates: '/images/catalog/pescobar-octopus-taverna-racilor-paste.jpg',
  specialites: '/images/catalog/pescobar-octopus-taverna-racilor-specialitati.jpg',
  'la-pieuvre-de-pescobar': '/images/catalog/caracatita-intreaga-taverna-racilor.jpg',
  poisson: '/images/catalog/pescobar-octopus-taverna-racilor-peste.jpg',
  plateaux: '/images/catalog/pescobar-octopus-taverna-racilor-platouri.jpg',
  garniture: '/images/catalog/pescobar-octopus-london-rice.jpg',
  sauces: '/images/catalog/pescobar-octopus-taverna-racilor-sosuri.jpg',
  dessert: '/images/catalog/pescobar-octopus-taverna-racilor-desert.jpg',
};

function parseWeight(raw) {
  const m = String(raw || '')
    .trim()
    .match(/^(\d+(?:[.,]\d+)?)\s*(kg|g|ml|cl|pcs|buc|pers\.?|persons?)/i);
  if (!m) return { weight_value: null, weight_unit: 'g' };
  const weight_value = parseFloat(m[1].replace(',', '.'));
  const u = m[2].toLowerCase();
  if (u === 'kg') return { weight_value, weight_unit: 'kg' };
  if (u === 'ml') return { weight_value, weight_unit: 'ml' };
  if (u === 'cl') return { weight_value, weight_unit: 'cl' };
  if (u === 'pcs' || u === 'buc') return { weight_value, weight_unit: 'pcs' };
  if (u.startsWith('pers')) return { weight_value, weight_unit: 'persons' };
  return { weight_value, weight_unit: 'g' };
}

console.log(`Seeding ${MENU_CATEGORIES.length} categories...`);
const catRows = MENU_CATEGORIES.map((c, idx) => ({
  id: c.id,
  type: c.type,
  names: c.names,
  subtitles: { fr: '', nl: '', en: '', ro: '' },
  cover_image: CATEGORY_COVERS[c.id] || null,
  sort_order: idx,
  is_visible: true,
}));
const { error: catErr } = await supabase
  .from('menu_categories')
  .upsert(catRows, { onConflict: 'id' });
if (catErr) throw catErr;

console.log(`Seeding ${MENU_ITEMS.length} dishes...`);
const itemRows = MENU_ITEMS.map((item, idx) => {
  const { weight_value, weight_unit } = parseWeight(item.weight);
  return {
    id: item.id,
    legacy_post_id: item.postId || null,
    category_id: item.categoryId,
    type: item.type,
    sort_order: idx,
    status: 'available',
    sold_out_on: null,
    names: {
      fr: item.translations?.fr?.name || '',
      nl: item.translations?.nl?.name || '',
      en: item.translations?.en?.name || '',
      ro: item.translations?.ro?.name || '',
    },
    descriptions: {
      fr: item.translations?.fr?.description || '',
      nl: item.translations?.nl?.description || '',
      en: item.translations?.en?.description || '',
      ro: item.translations?.ro?.description || '',
    },
    chef_notes: { fr: '', nl: '', en: '', ro: '' },
    ingredients: { fr: [], nl: [], en: [], ro: [] },
    origin: { fr: '', nl: '', en: '', ro: '' },
    nutrition: {
      fr: item.translations?.fr?.nutrition || '',
      nl: item.translations?.nl?.nutrition || '',
      en: item.translations?.en?.nutrition || '',
      ro: item.translations?.ro?.nutrition || '',
    },
    price_eur: item.priceEur ?? 0,
    old_price_eur: null,
    vat_rate: item.type === 'drink' ? 21 : 12,
    weight_value,
    weight_unit,
    kcal: null,
    variants: [],
    addons: [],
    allergens: item.allergens || [],
    badges: item.tags?.includes('featured') ? ['signature'] : [],
    show_site: true,
    show_qr: true,
    show_takeaway: true,
    show_business_lunch: item.categoryId === 'business-lunch' || Boolean(item.tags?.includes('lunch')),
    image: item.image || null,
    gallery: [],
    clip_url: null,
  };
});

for (let i = 0; i < itemRows.length; i += 50) {
  const batch = itemRows.slice(i, i + 50);
  const { error } = await supabase
    .from('menu_items')
    .upsert(batch, { onConflict: 'id' });
  if (error) throw error;
}

console.log('Seed completed successfully.');

