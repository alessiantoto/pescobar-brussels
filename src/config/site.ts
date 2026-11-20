export const LOCALES = ['fr', 'nl', 'en', 'ro'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

export const HREFLANG_MAP: Record<Locale, string> = {
  fr: 'fr-BE',
  nl: 'nl-BE',
  en: 'en',
  ro: 'ro',
};

export const SITE_CONFIG = {
  name: 'Pescobar Seafood Bruxelles',
  legalName: 'Pescobar Seafood Brussels SRL',
  registeredOffice: 'Avenue Louise 209/A/7, 1050 Ixelles (Bruxelles), Belgique',
  rpmJurisdiction: 'RPM Bruxelles (Tribunal de l’entreprise francophone de Bruxelles)',
  domain: 'https://pescobarseafoodbruxelles.be',
  phone: '+32 499 00 70 22',
  phoneRaw: '+32499007022',
  whatsappNumber: '32499007022',
  email: 'pescobarseafoodbrussels@gmail.com',
  priceRange: '€€–€€€',
  averageLunchPrice: '19 €',
  bceNumber: '1022.567.070',
  vatNumber: 'BE 1022.567.070',
  address: {
    streetAddress: 'Rue Jourdan 18',
    postalCode: '1060',
    addressLocality: 'Saint-Gilles (Bruxelles)',
    addressLocalityNl: 'Sint-Gillis (Brussel)',
    district: 'Quartier Louise / Place Stéphanie',
    districtNl: 'Louizawijk / Stefaniaplein',
    addressRegion: 'Bruxelles-Capitale',
    addressCountry: 'BE',
    full: 'Rue Jourdan 18, 1060 Saint-Gilles (Avenue Louise), Bruxelles, Belgique',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Pescobar+Seafood+Brussels+Rue+Jourdan+18+1060+Saint-Gilles',
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=Rue+Jourdan+18,+1060+Saint-Gilles,+Brussels,+Belgium&output=embed',
  },
  geo: {
    latitude: 50.83312,
    longitude: 4.35684,
  },
  hours: {
    daily: {
      open: '12:00',
      close: '23:00',
      kitchenClose: '22:30',
    },
    businessLunch: {
      open: '12:00',
      close: '15:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      priceEur: 19,
    },
  },
  transport: {
    metro: 'Station Louise (Lignes 2 & 6) — 3 min à pied (250m via Goulet Louise)',
    tram: 'Arrêt Stéphanie / Louise (Trams 8, 92, 93, 97) — 2 min à pied',
    parking: [
      'Interparking Stéphanie-Louise (Avenue Louise 83 — 2 min à pied)',
      'Interparking Toison d’Or (Avenue de la Toison d’Or 20 — 4 min à pied)',
      'Parking Poelaert (Place Poelaert — 5 min à pied)',
    ],
  },
  socials: {
    instagram: 'https://www.instagram.com/pescobar.brussels/',
    tiktok: 'https://www.tiktok.com/@pescobar.brussels',
    facebook: 'https://www.facebook.com/pescobar.bruxelles/',
  },
  delivery: {
    uberEats:
      'https://www.ubereats.com/be/store/pescobar-seafood-brussels/OS1Nzd9EXuOVstxPV2FdAg',
    takeaway:
      'https://www.takeaway.com/be-fr/menu/pescobar-seafood-brussels-bruxelles',
    deliveroo:
      'https://deliveroo.be/nl-be/menu/brussels/st-gilles/pescobar-seafood-brussels',
  },
} as const;

export function getCanonicalUrl(locale: Locale, path = ''): string {
  const cleanPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  return `${SITE_CONFIG.domain}/${locale}${cleanPath}`;
}

export function getAlternates(locale: Locale, path = '') {
  const cleanPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  return {
    canonical: `${SITE_CONFIG.domain}/${locale}${cleanPath}`,
    languages: {
      'fr-BE': `${SITE_CONFIG.domain}/fr${cleanPath}`,
      'nl-BE': `${SITE_CONFIG.domain}/nl${cleanPath}`,
      en: `${SITE_CONFIG.domain}/en${cleanPath}`,
      ro: `${SITE_CONFIG.domain}/ro${cleanPath}`,
      'x-default': `${SITE_CONFIG.domain}/fr${cleanPath}`,
    },
  };
}

