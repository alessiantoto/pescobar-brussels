import fs from 'node:fs';
import path from 'node:path';
import { SITE_CONFIG, type Locale, getCanonicalUrl } from '@/config/site';
import { MENU_CATEGORIES, MENU_ITEMS } from '@/data/menu';
import { HERO_VIDEO, VIDEO_CLIPS } from '@/data/videos';
import type { FaqItem } from '@/i18n/dictionaries';

const RESTAURANT_DESCRIPTIONS: Record<Locale, string> = {
  fr: 'Restaurant de fruits de mer à Bruxelles (Rue Jourdan 18, 1060 Saint-Gilles, à 150 m de l’Avenue Louise) : Seafood Boil, poulpe entier grillé, plateaux à partager et Business Lunch.',
  nl: 'Vis- en zeevruchtenrestaurant in Brussel (Jourdanstraat 18, 1060 Sint-Gillis, op 150 m van de Louizalaan): Seafood Boil, hele gegrilde octopus, schotels om te delen en Business Lunch.',
  en: 'Seafood restaurant in Brussels (Rue Jourdan 18, 1060 Saint-Gilles, 150m from Avenue Louise): Seafood Boil, whole grilled octopus, sharing platters, and weekday Business Lunch.',
  ro: 'Restaurant cu fructe de mare în Bruxelles (Rue Jourdan 18, 1060 Saint-Gilles, la 150 m de Avenue Louise): Seafood Boil, caracatiță întreagă la grătar, platouri de împărțit și Business Lunch.',
};

const CONTACT_PAGE_COPY: Record<Locale, { name: string; description: string }> = {
  fr: {
    name: 'Contact & Accès — Pescobar Seafood Bruxelles',
    description:
      'Adresse (Rue Jourdan 18, 1060 Saint-Gilles), téléphone (+32 499 00 70 22), horaires quotidiens 12:00–23:00 dans le quartier Louise.',
  },
  nl: {
    name: 'Contact & Bereikbaarheid — Pescobar Seafood Brussel',
    description:
      'Adres (Jourdanstraat 18, 1060 Sint-Gillis), telefoon (+32 499 00 70 22), dagelijkse openingsuren 12:00–23:00 in de Louizawijk.',
  },
  en: {
    name: 'Contact & Directions — Pescobar Seafood Brussels',
    description:
      'Address (Rue Jourdan 18, 1060 Saint-Gilles), phone (+32 499 00 70 22), daily hours 12:00–23:00 in the Louise district.',
  },
  ro: {
    name: 'Contact & Acces — Pescobar Seafood Bruxelles',
    description:
      'Adresă (Rue Jourdan 18, 1060 Saint-Gilles), telefon (+32 499 00 70 22), program zilnic 12:00–23:00 în cartierul Louise.',
  },
};

export function buildRestaurantJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Restaurant', 'SeafoodRestaurant'],
    '@id': `${SITE_CONFIG.domain}/#restaurant`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    description: RESTAURANT_DESCRIPTIONS[locale],
    url: getCanonicalUrl(locale),
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    vatID: SITE_CONFIG.vatNumber,
    priceRange: SITE_CONFIG.priceRange,
    currenciesAccepted: 'EUR',
    servesCuisine: ['Seafood', 'Mediterranean', 'Seafood Boil', 'Fish & Shellfish'],
    knowsLanguage: ['fr', 'nl', 'en', 'ro'],
    acceptsReservations: true,
    hasMenu: getCanonicalUrl(locale, '/menu'),
    hasMap: SITE_CONFIG.address.googleMapsUrl,
    image: [
      `${SITE_CONFIG.domain}/images/catalog/caracatita-intreaga-taverna-racilor.jpg`,
      `${SITE_CONFIG.domain}/images/catalog/pescobar-octopus-taverna-racilor-platouri.jpg`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: 'Saint-Gilles',
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    areaServed: [
      { '@type': 'Place', name: 'Saint-Gilles' },
      { '@type': 'Place', name: 'Avenue Louise' },
      { '@type': 'Place', name: 'Place Stéphanie' },
      { '@type': 'Place', name: 'Ixelles' },
      { '@type': 'Place', name: 'Uccle' },
      { '@type': 'Place', name: 'Brussels' },
    ],
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Weekday Business Lunch (Monday–Friday, 12:00–15:00)',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Private Group Dining',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Sharing Seafood Boil Platters',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wine Included on Selected Platters',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'EU Allergen Transparency',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Avenue Louise District',
        value: true,
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Delivery via Uber Eats, Deliveroo & Takeaway + Direct Takeaway Pickup',
        value: true,
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.phone,
      email: SITE_CONFIG.email,
      contactType: 'reservations and customer service',
      availableLanguage: ['fr', 'nl', 'en', 'ro'],
      areaServed: 'BE',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: SITE_CONFIG.hours.daily.open,
        closes: SITE_CONFIG.hours.daily.close,
      },
    ],
    potentialAction: [
      {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: getCanonicalUrl(locale, '/reservations'),
          inLanguage: locale,
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        },
        result: {
          '@type': 'FoodEstablishmentReservation',
          name: 'Table Reservation at Pescobar Seafood Bruxelles',
        },
      },
      {
        '@type': 'OrderAction',
        target: [
          SITE_CONFIG.delivery.uberEats,
          SITE_CONFIG.delivery.deliveroo,
          SITE_CONFIG.delivery.takeaway,
        ].map((url) => ({
          '@type': 'EntryPoint',
          urlTemplate: url,
          inLanguage: locale,
          actionPlatform: [
            'http://schema.org/DesktopWebPlatform',
            'http://schema.org/MobileWebPlatform',
          ],
        })),
        deliveryMethod: [
          'http://purl.org/goodrelations/v1#DeliveryModePickUp',
          'http://purl.org/goodrelations/v1#DeliveryModeFreight',
        ],
      },
    ],
    sameAs: [
      SITE_CONFIG.socials.instagram,
      SITE_CONFIG.socials.tiktok,
      SITE_CONFIG.socials.facebook,
      SITE_CONFIG.address.googleMapsUrl,
    ],
  };
}

export function buildWebSiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.domain}/#website`,
    url: SITE_CONFIG.domain,
    name: SITE_CONFIG.name,
    description: RESTAURANT_DESCRIPTIONS[locale],
    inLanguage: ['fr-BE', 'nl-BE', 'en', 'ro'],
    publisher: {
      '@id': `${SITE_CONFIG.domain}/#restaurant`,
    },
  };
}

export function buildMenuJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${getCanonicalUrl(locale, '/menu')}#menu`,
    name: `${SITE_CONFIG.name} — Menu (${locale.toUpperCase()})`,
    url: getCanonicalUrl(locale, '/menu'),
    inLanguage: locale,
    hasMenuSection: MENU_CATEGORIES.map((category) => {
      const items = MENU_ITEMS.filter((i) => i.categoryId === category.id);
      return {
        '@type': 'MenuSection',
        name: category.names[locale],
        hasMenuItem: items.map((item) => {
          const t = item.translations[locale];
          return {
            '@type': 'MenuItem',
            name: t.name,
            description: t.description || undefined,
            image: item.image ? (item.image.startsWith('http') ? item.image : `${SITE_CONFIG.domain}${item.image}`) : undefined,
            nutrition: t.nutrition
              ? {
                  '@type': 'NutritionInformation',
                  description: t.nutrition,
                }
              : undefined,
            offers:
              item.priceEur > 0
                ? {
                    '@type': 'Offer',
                    price: item.priceEur.toFixed(2),
                    priceCurrency: 'EUR',
                    availability: 'https://schema.org/InStock',
                  }
                : undefined,
          };
        }),
      };
    }),
  };
}

export function buildServiceOfferJsonLd(
  locale: Locale,
  opts: {
    path: string;
    name: string;
    description: string;
    priceEur?: string;
    serviceType: string;
  }
) {
  const url = getCanonicalUrl(locale, opts.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url,
    inLanguage: locale,
    provider: {
      '@id': `${SITE_CONFIG.domain}/#restaurant`,
    },
    areaServed: [
      { '@type': 'Place', name: 'Saint-Gilles' },
      { '@type': 'Place', name: 'Avenue Louise' },
      { '@type': 'Place', name: 'Brussels' },
    ],
    offers: opts.priceEur
      ? {
          '@type': 'Offer',
          price: opts.priceEur,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock',
          url,
        }
      : undefined,
  };
}

export function buildContactPageJsonLd(locale: Locale) {
  const url = getCanonicalUrl(locale, '/contact');
  const copy = CONTACT_PAGE_COPY[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#contact`,
    name: copy.name,
    description: copy.description,
    url,
    inLanguage: locale,
    mainEntity: {
      '@id': `${SITE_CONFIG.domain}/#restaurant`,
    },
  };
}

export function buildFaqJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  locale: Locale,
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: getCanonicalUrl(locale, item.path),
    })),
  };
}

/**
 * Emits schema.org/VideoObject nodes only for video assets present on disk under public/
 * to avoid advertising unreachable video URLs to Google Search Console.
 */
export function buildVideoObjectsJsonLd(locale: Locale) {
  const publicRoot = path.join(process.cwd(), 'public');
  const homeUrl = getCanonicalUrl(locale);

  return [HERO_VIDEO, ...VIDEO_CLIPS]
    .map((clip) => {
      if (!clip.video) return null;
      const relPath = clip.video.replace(/^\/+/, '');
      const fullPath = path.join(publicRoot, relPath);
      if (!fs.existsSync(fullPath)) return null;

      const stat = fs.statSync(fullPath);
      if (!stat.isFile() || stat.size === 0) return null;

      const uploadDate = stat.mtime.toISOString();
      return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        '@id': `${homeUrl}#video-${clip.id}`,
        name: clip.title[locale],
        description: clip.caption[locale],
        thumbnailUrl: clip.poster,
        contentUrl: `${SITE_CONFIG.domain}${clip.video}`,
        embedUrl: homeUrl,
        uploadDate,
        inLanguage: locale,
        publisher: {
          '@id': `${SITE_CONFIG.domain}/#restaurant`,
        },
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
}
