import type { Locale } from '@/config/site';
import { getCachedFullMenuData } from '@/lib/admin/menu-repo';
import {
  effectiveStatus,
  isChannelVisible,
  todayInBrussels,
} from '@/lib/menu-contract';
import type { Dictionary } from '@/i18n/dictionaries';
import type { MenuTag } from '@/data/menu';
import type {
  LocalizedMenuCategory,
  LocalizedMenuItem,
  MenuExplorerLabels,
} from '@/lib/menuDisplay';

// Order follows how a guest actually orders: signature dishes first, then
// starters, mains by type, and finally sides, sauces and dessert.
const FOOD_CATEGORY_ORDER = [
  'pescobar-seafood-boil',
  'plateaux',
  'la-pieuvre-de-pescobar',
  'business-lunch',
  'aperitifs',
  'soupes',
  'delices-marins',
  'poisson',
  'cuisine-avec-talent',
  'specialites',
  'pates',
  'viande',
  'garniture',
  'sauces',
  'dessert',
];

const DRINK_CATEGORY_ORDER = [
  'vins',
  'mousseux',
  'cocktails',
  'cocktails-petillants',
  'gin-tonic',
  'cocktails-sans-alcool',
  'biere',
  'boissons-fortes',
  'boissons-naturelles',
  'boissons-gazeuses',
  'cafe-boissons-chaudes',
];

const CATEGORY_SUBTITLES: Record<string, Record<Locale, string>> = {
  'pescobar-seafood-boil': {
    fr: 'Plateau chaud, 5 à 6 personnes',
    nl: 'Warme schotel, 5 à 6 personen',
    en: 'Hot platter, 5 to 6 guests',
    ro: 'Platou cald, 5–6 persoane',
  },
  plateaux: {
    fr: 'À partager, de 2 à 6 personnes',
    nl: 'Om te delen, 2 tot 6 personen',
    en: 'To share, 2 to 6 guests',
    ro: 'De împărțit, 2–6 persoane',
  },
  'la-pieuvre-de-pescobar': {
    fr: 'Poulpe grillé, entier ou en assiette',
    nl: 'Gegrilde octopus, hele of per bord',
    en: 'Grilled octopus, whole or plated',
    ro: 'Caracatiță la grătar, întreagă sau în farfurie',
  },
  'business-lunch': {
    fr: 'Soupe de fruits de mer + plat • 12h–15h',
    nl: 'Zeevruchtensoep + gerecht • 12u–15u',
    en: 'Seafood soup + main course • 12:00–15:00',
    ro: 'Supă fructe de mare + fel principal • 12:00–15:00',
  },
  aperitifs: {
    fr: 'Huîtres, caviar, salades et houmous',
    nl: 'Oesters, kaviaar, salades en hummus',
    en: 'Oysters, caviar, salads and hummus',
    ro: 'Stridii, caviar, salate și hummus',
  },
  soupes: {
    fr: 'Soupe de fruits de mer',
    nl: 'Zeevruchtensoep',
    en: 'Seafood soup',
    ro: 'Supă de fructe de mare',
  },
  'delices-marins': {
    fr: 'Fritto misto, crevettes et calamar panés',
    nl: 'Fritto misto, gepaneerde garnalen en calamari',
    en: 'Fritto misto, breaded shrimp and calamari',
    ro: 'Fritto misto, creveți și calamar pane',
  },
  poisson: {
    fr: 'Turbot, dorade, saumon, redfish',
    nl: 'Tarbot, dorade, zalm, roodbaars',
    en: 'Turbot, sea bream, salmon, redfish',
    ro: 'Calcan, dorada, somon, sebaste',
  },
  'cuisine-avec-talent': {
    fr: 'Paella, moules, crevettes et poêlées',
    nl: 'Paella, mosselen, garnalen en pannetjes',
    en: 'Paella, mussels, prawns and skillets',
    ro: 'Paella, midii, creveți și tigăi',
  },
  specialites: {
    fr: 'Calamar farci, crevettes sauce douce épicée',
    nl: 'Gevulde calamari, garnalen in zoetpikante saus',
    en: 'Stuffed calamari, shrimp in sweet chili sauce',
    ro: 'Calamar umplut, creveți în sos dulce-picant',
  },
  pates: {
    fr: 'Spaghetti au homard et aux fruits de mer',
    nl: 'Spaghetti met kreeft en zeevruchten',
    en: 'Spaghetti with lobster and seafood',
    ro: 'Spaghete cu homar și fructe de mare',
  },
  viande: {
    fr: 'Faux-filet, agneau, burger, poulet',
    nl: 'Ribeye, lam, burger, kip',
    en: 'Ribeye, lamb, burger, chicken',
    ro: 'Antricot, miel, burger, pui',
  },
  garniture: {
    fr: 'Frites, riz, polenta, salade',
    nl: 'Frieten, rijst, polenta, salade',
    en: 'Fries, rice, polenta, salad',
    ro: 'Cartofi prăjiți, orez, mămăligă, salată',
  },
  sauces: {
    fr: 'Aïoli, sriracha, sweet chili et plus',
    nl: 'Aïoli, sriracha, sweet chili en meer',
    en: 'Aioli, sriracha, sweet chili and more',
    ro: 'Aioli, sriracha, sweet chili și altele',
  },
  dessert: {
    fr: 'Le dessert du jour',
    nl: 'Dessert van de dag',
    en: 'Dessert of the day',
    ro: 'Desertul zilei',
  },
  vins: {
    fr: 'Bouteille ou verre, blanc, rosé, rouge',
    nl: 'Fles of glas, wit, rosé, rood',
    en: 'By the bottle or glass, white, rosé, red',
    ro: 'Sticlă sau pahar, alb, rose, roșu',
  },
  mousseux: {
    fr: 'Champagne, cava et prosecco',
    nl: 'Champagne, cava en prosecco',
    en: 'Champagne, cava and prosecco',
    ro: 'Șampanie, cava și prosecco',
  },
  cocktails: {
    fr: 'Margarita, mojito, espresso martini',
    nl: 'Margarita, mojito, espresso martini',
    en: 'Margarita, mojito, espresso martini',
    ro: 'Margarita, mojito, espresso martini',
  },
  'cocktails-petillants': {
    fr: 'Aperol, Campari, Limoncello, Hugo',
    nl: 'Aperol, Campari, Limoncello, Hugo',
    en: 'Aperol, Campari, Limoncello, Hugo',
    ro: 'Aperol, Campari, Limoncello, Hugo',
  },
  'gin-tonic': {
    fr: 'Nos gin & tonic',
    nl: 'Onze gin & tonics',
    en: 'Our gin & tonics',
    ro: 'Gin & tonic-urile noastre',
  },
  'cocktails-sans-alcool': {
    fr: 'Cocktails sans alcool',
    nl: 'Alcoholvrije cocktails',
    en: 'Alcohol-free cocktails',
    ro: 'Cocktailuri fără alcool',
  },
  biere: {
    fr: 'Bières pression et bouteille',
    nl: 'Bieren van het vat en op fles',
    en: 'Draught and bottled beers',
    ro: 'Beri la halbă și la sticlă',
  },
  'boissons-fortes': {
    fr: 'Whisky, cognac, vodka, tequila, rhum',
    nl: 'Whisky, cognac, wodka, tequila, rum',
    en: 'Whisky, cognac, vodka, tequila, rum',
    ro: 'Whisky, coniac, vodcă, tequila, rom',
  },
  'boissons-naturelles': {
    fr: 'Limonades et jus maison',
    nl: 'Huisgemaakte limonades en sappen',
    en: 'House lemonades and juices',
    ro: 'Limonade și sucuri de casă',
  },
  'boissons-gazeuses': {
    fr: 'Sodas, eaux et boissons énergisantes',
    nl: 'Frisdranken, water en energiedranken',
    en: 'Soft drinks, water and energy drinks',
    ro: 'Răcoritoare, apă și băuturi energizante',
  },
  'cafe-boissons-chaudes': {
    fr: 'Café, thé et boissons chaudes',
    nl: 'Koffie, thee en warme dranken',
    en: 'Coffee, tea and hot drinks',
    ro: 'Cafea, ceai și băuturi calde',
  },
};

export function getMenuExplorerLabels(dict: Dictionary): MenuExplorerLabels {
  return {
    searchPlaceholder: dict.menuPage.searchPlaceholder,
    verifyPriceNotice: dict.menuPage.verifyPriceNotice,
    reservationTitle: dict.reservationForm.title,
    reserveCta: dict.nav.reserveCta,
    noResults: dict.menuPage.noResults,
    clearFilters: dict.menuPage.clearFilters,
  };
}

/**
 * Server-only mapper backed by `getCachedFullMenuData()` (Supabase + static fallback),
 * stripping unused languages, filtering hidden/channel-disabled items, and exposing `isSoldOut`.
 */
export async function getLocalizedMenuData(
  locale: Locale,
  channel: 'site' | 'qr' = 'site'
): Promise<{
  categories: LocalizedMenuCategory[];
  items: LocalizedMenuItem[];
}> {
  const { categories: rawCategories, items: rawItems } =
    await getCachedFullMenuData();
  const today = todayInBrussels();

  const orderedRawCategories = [...rawCategories]
    .filter((cat) => cat.is_visible)
    .sort((a, b) => {
      if (a.type !== b.type) return a.type === 'food' ? -1 : 1;
      const order = a.type === 'food' ? FOOD_CATEGORY_ORDER : DRINK_CATEGORY_ORDER;
      const ai = order.indexOf(a.id);
      const bi = order.indexOf(b.id);
      if (ai !== -1 && bi !== -1) return ai - bi;
      if (ai !== -1) return -1;
      if (bi !== -1) return 1;
      return a.sort_order - b.sort_order;
    });

  const visibleCatIds = new Set(orderedRawCategories.map((c) => c.id));

  const categories: LocalizedMenuCategory[] = orderedRawCategories.map((cat) => {
    const subtitle =
      cat.subtitles?.[locale] || CATEGORY_SUBTITLES[cat.id]?.[locale];
    return {
      id: cat.id,
      type: cat.type,
      name: cat.names[locale] || cat.names.fr,
      ...(subtitle ? { subtitle } : {}),
    };
  });

  const items: LocalizedMenuItem[] = rawItems
    .filter((item) => {
      if (!visibleCatIds.has(item.category_id)) return false;
      if (!isChannelVisible(item, channel)) return false;
      return effectiveStatus(item, today) !== 'hidden';
    })
    .map((item) => {
      const name = item.names[locale] || item.names.fr;
      const description = item.descriptions[locale] || item.descriptions.fr || '';
      const nutrition = item.nutrition?.[locale] || undefined;
      const chefNote = item.chef_notes?.[locale] || undefined;

      const resolvedDrinkImage =
        item.type === 'drink' &&
        !item.image &&
        (/aerosoli/i.test(item.names.fr) || /aerosoli/i.test(item.names.ro))
          ? '/images/aerosoli-wines-transparent.png'
          : null;

      const weight =
        item.weight_value !== null && item.weight_value !== undefined
          ? `${item.weight_value}${item.weight_unit}`
          : '';

      const priceStr = Number.isInteger(item.price_eur)
        ? `${item.price_eur}€`
        : `${item.price_eur.toFixed(2).replace('.', ',')}€`;

      return {
        id: item.id,
        postId: item.legacy_post_id || item.id,
        categoryId: item.category_id,
        type: item.type,
        priceEur: item.price_eur,
        priceFormatted: priceStr,
        weight,
        image: item.image ?? resolvedDrinkImage,
        allergens: item.allergens,
        tags: item.badges as unknown as MenuTag[],
        name,
        description,
        isSoldOut: effectiveStatus(item, today) === 'sold_out',
        ...(chefNote ? { chefNote } : {}),
        ...(nutrition ? { nutrition } : {}),
      };
    });

  return { categories, items };
}
