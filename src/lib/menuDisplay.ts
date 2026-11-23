import type { Locale } from '@/config/site';
import type { MenuItem, MenuTag } from '@/data/menu';

export interface LocalizedMenuCategory {
  id: string;
  type: 'food' | 'drink';
  name: string;
  subtitle?: string;
}

export interface MenuExplorerLabels {
  searchPlaceholder: string;
  verifyPriceNotice: string;
  reservationTitle: string;
  reserveCta: string;
  noResults: string;
  clearFilters: string;
}

export interface LocalizedMenuItem {
  id: string;
  postId: string;
  categoryId: string;
  type: 'food' | 'drink';
  priceEur: number;
  priceFormatted: string;
  weight: string;
  image: string | null;
  allergens: string[];
  tags: MenuTag[];
  name: string;
  description: string;
  nutrition?: string;
  isSoldOut?: boolean;
  chefNote?: string;
}

export type DishCardItem = LocalizedMenuItem | MenuItem;

export function getDishTranslation(
  item: DishCardItem,
  locale: Locale
): { name: string; description: string; nutrition?: string } {
  if ('translations' in item) {
    return item.translations[locale];
  }
  return {
    name: item.name,
    description: item.description,
    nutrition: item.nutrition,
  };
}

// All 26 Official Category Cover Photos from pescobaroctopus.com/pescobar-bruxelles-qr-menu/
export const CATEGORY_COVER_IMAGES: Record<string, string> = {
  // 15 Nourriture
  'pescobar-seafood-boil':
    '/images/catalog/seafood-boil-1.jpg',
  'business-lunch':
    '/images/catalog/pescobar-octopus-taverna-racilor-supe.jpg',
  aperitifs:
    '/images/catalog/salata-de-icre-creveti-1.jpg',
  'delices-marins':
    '/images/catalog/pescobar-octopus-taverna-racilor-seafood-snacks.jpg',
  'cuisine-avec-talent':
    '/images/catalog/pescobar-octopus-taverna-racilor-gatite-cu-talent.jpg',
  soupes:
    '/images/catalog/pescobar-octopus-taverna-racilor-supe.jpg',
  viande:
    '/images/catalog/pescobar-bruxelles-preparate-traditionale-vita-si-oaie.jpg',
  pates:
    '/images/catalog/pescobar-octopus-taverna-racilor-paste.jpg',
  specialites:
    '/images/catalog/pescobar-octopus-taverna-racilor-specialitati.jpg',
  'la-pieuvre-de-pescobar':
    '/images/catalog/caracatita-intreaga-taverna-racilor-ab41.jpg',
  poisson:
    '/images/catalog/pescobar-octopus-taverna-racilor-peste.jpg',
  plateaux:
    '/images/catalog/pescobar-octopus-taverna-racilor-platouri.jpg',
  garniture:
    '/images/catalog/pescobar-octopus-london-rice.jpg',
  sauces:
    '/images/catalog/pescobar-octopus-taverna-racilor-sosuri.jpg',
  dessert:
    '/images/catalog/pescobar-octopus-taverna-racilor-desert.jpg',
  // 11 Boissons
  'cafe-boissons-chaudes':
    '/images/catalog/pescobar-octopus-taverna-racilor-coffee.jpg',
  'boissons-gazeuses':
    '/images/catalog/pescobar-octopus-taverna-racilor-soft-drinks.jpg',
  'boissons-naturelles':
    '/images/catalog/pescobar-bruxelles-natural-drinks.jpg',
  'cocktails-sans-alcool':
    '/images/catalog/pescobar-bruxelles-mocktails.jpg',
  cocktails:
    '/images/catalog/pescobar-octopus-taverna-racilor-cocktails.jpg',
  'boissons-fortes':
    '/images/catalog/pescobar-octopus-taverna-racilor-strong-stuff.jpg',
  'gin-tonic':
    '/images/catalog/pescobar-bruxelles-gin-tonic.jpg',
  vins:
    '/images/catalog/pescobar-octopus-taverna-racilor-wines.jpg',
  'cocktails-petillants':
    '/images/catalog/pescobar-bruxelles-sparkling-cocktails.jpg',
  biere:
    '/images/catalog/pescobar-octopus-taverna-racilor-beer.jpg',
  mousseux:
    '/images/catalog/pescobar-bruxelles-sparkling.jpg',
};

export function getDishImage(
  item: DishCardItem,
  imageOverride?: string
): string | null {
  if (imageOverride) return imageOverride;
  if (item.image) return item.image;
  if (item.type === 'drink') {
    if ('translations' in item) {
      if (
        /aerosoli/i.test(item.translations.fr.name) ||
        /aerosoli/i.test(item.translations.ro.name)
      ) {
        return '/images/aerosoli-wines-transparent.png';
      }
    } else if (/aerosoli/i.test(item.name)) {
      return '/images/aerosoli-wines-transparent.png';
    }
    return null;
  }
  return CATEGORY_COVER_IMAGES[item.categoryId] ?? null;
}

export function hasAerosoliPairing(
  item: DishCardItem,
  locale: Locale
): boolean {
  const t = getDishTranslation(item, locale);
  return /aerosoli/i.test(t.name) || /aerosoli/i.test(t.description);
}

export function formatMenuPrice(item: DishCardItem, locale: Locale): string {
  if (item.priceEur > 0) return item.priceFormatted;
  const free: Record<Locale, string> = {
    fr: 'Offert',
    nl: 'Gratis',
    en: 'Free',
    ro: 'Gratuit',
  };
  return free[locale];
}

export function normalizeAllergenKey(raw: string): string {
  const lower = raw.trim().toLowerCase();
  if (lower.includes('egg') || lower.includes('oeuf')) return 'Eggs';
  if (lower.includes('soya') || lower.includes('soy')) return 'Soya';
  if (lower.includes('sulf') || lower.includes('sulph')) return 'Sulphites';
  if (lower.includes('crust')) return 'Crustaceans';
  if (lower.includes('moll')) return 'Molluscs';
  if (lower.includes('fish') || lower.includes('poiss')) return 'Fish';
  if (lower.includes('glut')) return 'Gluten';
  if (lower.includes('milk') || lower.includes('lait')) return 'Milk';
  if (lower.includes('celer')) return 'Celery';
  if (lower.includes('must') || lower.includes('mout')) return 'Mustard';
  if (lower.includes('sesam')) return 'Sesame';
  return raw.trim();
}

export const ALLERGEN_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  Gluten: { fr: 'Gluten', nl: 'Gluten', en: 'Gluten', ro: 'Gluten' },
  Crustaceans: { fr: 'Crustacés', nl: 'Schaaldieren', en: 'Crustaceans', ro: 'Crustacee' },
  Fish: { fr: 'Poisson', nl: 'Vis', en: 'Fish', ro: 'Pește' },
  Soya: { fr: 'Soja', nl: 'Soja', en: 'Soy', ro: 'Soia' },
  Celery: { fr: 'Céleri', nl: 'Selderij', en: 'Celery', ro: 'Țelină' },
  Molluscs: { fr: 'Mollusques', nl: 'Weekdieren', en: 'Molluscs', ro: 'Moluște' },
  Milk: { fr: 'Lait', nl: 'Melk', en: 'Dairy / Milk', ro: 'Lapte' },
  Eggs: { fr: 'Œufs', nl: 'Eieren', en: 'Eggs', ro: 'Ouă' },
  Mustard: { fr: 'Moutarde', nl: 'Mosterd', en: 'Mustard', ro: 'Muștar' },
  Sesame: { fr: 'Sésame', nl: 'Sesam', en: 'Sesame', ro: 'Susan' },
  Sulphites: { fr: 'Sulfites', nl: 'Sulfieten', en: 'Sulphites', ro: 'Sulfiți' },
};

export const ALL_LEGEND_ALLERGENS = [
  'Crustaceans',
  'Molluscs',
  'Fish',
  'Gluten',
  'Milk',
  'Eggs',
  'Soya',
  'Celery',
  'Mustard',
  'Sesame',
  'Sulphites',
];

export interface MenuCardUiCopy {
  allergenLabel: string;
  showDetails: string;
  hideDetails: string;
  tapForAllergens: string;
  allergensTitle: string;
  noAllergensLabel: string;
  ingredientsTitle: string;
  nutritionTitle: string;
  allergySafetyNote: string;
  closeModalBtn: string;
  includedWineTitle: string;
  includedWineDesc: string;
}

export const MENU_CARD_UI: Record<Locale, MenuCardUiCopy> = {
  fr: {
    allergenLabel: 'Allergènes :',
    showDetails: 'Détails & ingrédients +',
    hideDetails: 'Masquer les détails −',
    tapForAllergens: 'Voir fiche & allergènes',
    allergensTitle: 'Allergènes présents',
    noAllergensLabel: 'Aucun allergène majeur UE déclaré',
    ingredientsTitle: 'Composition & ingrédients',
    nutritionTitle: 'Valeurs nutritionnelles',
    allergySafetyNote:
      'Allergie sévère ? Prévenez notre équipe avant de commander pour toute précaution en cuisine.',
    closeModalBtn: 'Fermer',
    includedWineTitle: 'Vin Aerosoli inclus (Blanc ou Rosé)',
    includedWineDesc: 'Murfatlar D.O.C. — Sauvignon Blanc & Fetească Regală ou Rosé Pinot Noir',
  },
  nl: {
    allergenLabel: 'Allergenen:',
    showDetails: 'Details & ingrediënten +',
    hideDetails: 'Verberg details −',
    tapForAllergens: 'Details & allergenen',
    allergensTitle: 'Aanwezige allergenen',
    noAllergensLabel: 'Geen grote EU-allergenen gemeld',
    ingredientsTitle: 'Samenstelling & ingrediënten',
    nutritionTitle: 'Voedingswaarden',
    allergySafetyNote: 'Ernstige allergie? Informeer ons team vóór u bestelt.',
    closeModalBtn: 'Sluiten',
    includedWineTitle: 'Aerosoli wijn inbegrepen (Wit of Rosé)',
    includedWineDesc: 'Murfatlar D.O.C. — Witte of rosé fles naar keuze inbegrepen',
  },
  en: {
    allergenLabel: 'Allergens:',
    showDetails: 'Details & ingredients +',
    hideDetails: 'Hide details −',
    tapForAllergens: 'Details & allergens',
    allergensTitle: 'Allergens',
    noAllergensLabel: 'No major EU allergens declared',
    ingredientsTitle: 'Ingredients & details',
    nutritionTitle: 'Nutritional information',
    allergySafetyNote: 'Severe allergy? Please inform our team before ordering.',
    closeModalBtn: 'Close',
    includedWineTitle: 'Includes Aerosoli Wine (White or Rosé)',
    includedWineDesc: 'Murfatlar D.O.C. — Choice of White or Rosé bottle served with your platter',
  },
  ro: {
    allergenLabel: 'Alergeni:',
    showDetails: 'Detalii & ingrediente +',
    hideDetails: 'Ascunde detalii −',
    tapForAllergens: 'Vezi detalii & alergeni',
    allergensTitle: 'Alergeni prezenți',
    noAllergensLabel: 'Fără alergeni majori UE declarați',
    ingredientsTitle: 'Ingrediente & compoziție',
    nutritionTitle: 'Valori nutriționale',
    allergySafetyNote:
      'Aveți o alergie severă? Anunțați echipa noastră înainte de a comanda.',
    closeModalBtn: 'Închide',
    includedWineTitle: 'Include 1 sticlă Vin Aerosoli (Alb sau Rosé)',
    includedWineDesc: 'Murfatlar D.O.C. — Fetească Regală & Sauvignon Blanc sau Rosé Pinot Noir',
  },
};

// Smart parser to extract a clean culinary summary vs. technical AFSCA gram breakdown
export function parseMenuDescription(raw: string): {
  highlightBadge: string | null;
  summary: string;
  hasExtraDetails: boolean;
} {
  if (!raw) return { highlightBadge: null, summary: '', hasExtraDetails: false };

  let text = raw.trim();
  let highlightBadge: string | null = null;

  const aerosoliMatch = text.match(
    /^(\+?\s*[12]\s*(?:bouteilles?|flessen?|fles|bottles?|sticl[ăa]|sticle)\s*(?:de\s*vin\s*)?(?:of\s*)?aerosoli(?:\s+(?:white\/ros[eé]|blanc\/ros[eé]|alb\/ros[eé]|alb\/rose|vin|wijn|wine))*(?:\s*(?:bottle|fles))?)[.,]*\s*/i
  );
  if (aerosoliMatch) {
    highlightBadge = aerosoliMatch[1].trim();
    text = text.slice(aerosoliMatch[0].length).trim();
  } else {
    const wineMatch = text.match(
      /^(\+?\s*[12]\s*(?:bouteilles?|flessen?|fles|bottles?|sticl[ăa]|sticle)[^.]+|(?:Comprend|Includes|Inclusief|Include)[^.]+)\.\s*/i
    );
    if (wineMatch) {
      highlightBadge = wineMatch[1].trim();
      text = text.slice(wineMatch[0].length).trim();
    }
  }

  // Extract "Soup + Main Course" combo prefix on Business Lunch style descriptions
  const firstDotIdx = text.indexOf('. ');
  if (firstDotIdx > 0 && firstDotIdx < 85 && text.includes('+')) {
    const comboTitle = text.slice(0, firstDotIdx).trim();
    const rest = text.slice(firstDotIdx + 2).trim();
    return {
      highlightBadge: comboTitle,
      summary: rest,
      hasExtraDetails: rest.length > 110,
    };
  }

  return {
    highlightBadge,
    summary: text,
    hasExtraDetails: text.length > 125,
  };
}

