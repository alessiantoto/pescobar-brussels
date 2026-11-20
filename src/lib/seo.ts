import type { Metadata } from 'next';
import {
  LOCALES,
  SITE_CONFIG,
  getAlternates,
  getCanonicalUrl,
  type Locale,
} from '@/config/site';

export const OG_LOCALE_MAP: Record<Locale, string> = {
  fr: 'fr_BE',
  nl: 'nl_BE',
  en: 'en_BE',
  ro: 'ro_RO',
};

export const HTML_LANG_MAP: Record<Locale, string> = {
  fr: 'fr-BE',
  nl: 'nl-BE',
  en: 'en',
  ro: 'ro',
};

export type SeoPageKey =
  | 'home'
  | 'menu'
  | 'businessLunch'
  | 'delivery'
  | 'privateEvents'
  | 'reservations'
  | 'contact';

export const PAGE_KEYWORDS: Record<SeoPageKey, Record<Locale, string[]>> = {
  home: {
    fr: [
      'restaurant bruxelles',
      'restaurant avenue louise',
      'restaurant saint-gilles bruxelles',
      'restaurant fruits de mer bruxelles',
      'seafood boil bruxelles',
      'poulpe grillé bruxelles',
      'plateau fruits de mer avenue louise',
      'pescobar bruxelles',
    ],
    nl: [
      'restaurant brussel',
      'restaurant louizalaan',
      'restaurant sint-gillis brussel',
      'visrestaurant brussel',
      'zeevruchten brussel',
      'seafood boil brussel',
      'gegrilde octopus brussel',
      'zeevruchtenschotel louizalaan',
    ],
    en: [
      'restaurant brussels',
      'best restaurant brussels',
      'restaurant avenue louise',
      'seafood restaurant brussels',
      'seafood boil brussels',
      'grilled octopus brussels',
      'fish restaurant saint-gilles',
      'pescobar brussels saint-gilles',
    ],
    ro: [
      'restaurant bruxelles',
      'restaurant luiza bruxelles',
      'restaurant avenue louise bruxelles',
      'restaurant romanesc bruxelles',
      'restaurant fructe de mare bruxelles',
      'seafood boil bruxelles',
      'caracatita la gratar bruxelles',
      'pescobar bruxelles',
    ],
  },
  menu: {
    fr: [
      'carte restaurant fruits de mer bruxelles',
      'menu seafood boil bruxelles',
      'poulpe entier grillé bruxelles prix',
      'plateau top of the world pescobar',
      'crevettes black tiger avenue louise',
      'homard grillé saint-gilles',
    ],
    nl: [
      'menu visrestaurant brussel',
      'seafood boil brussel prijs',
      'gegrilde octopus brussel menu',
      'zeevruchtenschotel brussel kaart',
      'kreeft en garnalen louizalaan',
      'pescobar brussel menu',
    ],
    en: [
      'seafood menu brussels',
      'seafood boil platter price brussels',
      'whole grilled octopus brussels',
      'lobster and shrimp platter avenue louise',
      'pescobar brussels menu',
      'shellfish allergen menu saint-gilles',
    ],
    ro: [
      'meniu fructe de mare bruxelles',
      'pret seafood boil bruxelles',
      'caracatita la gratar pret bruxelles',
      'platou top of the world pescobar',
      'creveti si homar bruxelles',
      'meniu pescobar bruxelles',
    ],
  },
  businessLunch: {
    fr: [
      'business lunch fruits de mer bruxelles',
      'business lunch avenue louise',
      'lunch fruits de mer saint-gilles',
      'déjeuner d affaires place stéphanie',
      'formule midi poisson bruxelles',
      'menu midi fruits de mer louise',
    ],
    nl: [
      'business lunch zeevruchten brussel',
      'business lunch louizalaan',
      'zakenlunch zeevruchten brussel',
      'middagmenu vis sint-gillis',
      'lunch stefaniaplein brussel',
      'dagmenu visrestaurant louiza',
    ],
    en: [
      'business lunch avenue louise',
      'seafood business lunch brussels',
      'seafood lunch menu saint-gilles',
      'quick business lunch place stephanie',
      'weekday seafood lunch brussels',
      'lunch near louise metro brussels',
    ],
    ro: [
      'business lunch fructe de mare bruxelles',
      'meniu de pranz fructe de mare bruxelles',
      'pranz de afaceri avenue louise',
      'meniu pranz saint-gilles',
      'supa fructe de mare pranz bruxelles',
      'pranz pescobar bruxelles',
    ],
  },
  delivery: {
    fr: [
      'livraison fruits de mer bruxelles',
      'uber eats pescobar bruxelles',
      'takeaway fruits de mer bruxelles',
      'deliveroo saint-gilles bruxelles',
      'seafood boil livraison bruxelles',
      'restaurant à emporter avenue louise',
    ],
    nl: [
      'zeevruchten bezorgen brussel',
      'uber eats pescobar brussel',
      'takeaway visrestaurant brussel',
      'deliveroo sint-gillis brussel',
      'afhalen seafood boil brussel',
      'visgerechten aan huis louizalaan',
    ],
    en: [
      'seafood delivery brussels',
      'uber eats pescobar brussels',
      'takeaway seafood avenue louise',
      'deliveroo saint-gilles brussels',
      'order seafood boil brussels',
      'fish restaurant pickup brussels',
    ],
    ro: [
      'livrare fructe de mare bruxelles',
      'uber eats pescobar bruxelles',
      'takeaway restaurant bruxelles',
      'deliveroo bruxelles luiza',
      'comanda seafood boil bruxelles',
      'mancare la pachet saint-gilles',
    ],
  },
  privateEvents: {
    fr: [
      'restaurant groupe bruxelles fruits de mer',
      'privatisation restaurant avenue louise',
      'dîner entreprise saint-gilles',
      'anniversaire restaurant bruxelles',
      'événement privé plateau fruits de mer',
      'repas groupe place stéphanie',
    ],
    nl: [
      'groepsdiner zeevruchten brussel',
      'privé dining louizalaan',
      'bedrijfsdiner sint-gillis brussel',
      'verjaardagsdiner visrestaurant brussel',
      'afhuren restaurant brussel centrum',
      'groepsmenu zeevruchten brussel',
    ],
    en: [
      'private dining saint-gilles',
      'group seafood dinner brussels',
      'corporate dinner avenue louise',
      'private event restaurant brussels',
      'birthday seafood platter brussels',
      'group reservation place stephanie',
    ],
    ro: [
      'evenimente private bruxelles restaurant',
      'cina de grup fructe de mare bruxelles',
      'petrecere privata restaurant bruxelles',
      'rezervare grup avenue louise',
      'cina corporate saint-gilles',
      'aniversare pescobar bruxelles',
    ],
  },
  reservations: {
    fr: [
      'réserver une table bruxelles',
      'réserver restaurant bruxelles',
      'réserver restaurant avenue louise',
      'réservation table pescobar bruxelles',
      'réserver restaurant fruits de mer bruxelles',
      'table seafood boil bruxelles',
      'restaurant ouvert dimanche bruxelles',
    ],
    nl: [
      'tafel reserveren brussel',
      'restaurant reserveren louizalaan',
      'tafel boeken sint-gillis',
      'reserveren pescobar brussel',
      'visrestaurant brussel reserveren',
      'seafood boil reserveren brussel',
      'restaurant open op zondag brussel',
    ],
    en: [
      'book a table brussels',
      'book restaurant avenue louise',
      'reserve table brussels',
      'book seafood restaurant brussels',
      'pescobar brussels reservation',
      'dinner reservation saint-gilles',
      'restaurant open sunday brussels',
    ],
    ro: [
      'rezervare masa bruxelles',
      'rezerva restaurant bruxelles',
      'rezervare restaurant luiza bruxelles',
      'rezervare masa pescobar bruxelles',
      'rezerva restaurant fructe de mare bruxelles',
      'rezervare seafood boil bruxelles',
      'program pescobar bruxelles',
    ],
  },
  contact: {
    fr: [
      'pescobar bruxelles adresse rue jourdan 18',
      'téléphone pescobar seafood bruxelles',
      'horaires restaurant fruits de mer saint-gilles',
      'parking stéphanie louise restaurant',
      'métro louise restaurant fruits de mer',
      'contact pescobar bruxelles',
    ],
    nl: [
      'pescobar brussel adres jourdanstraat 18',
      'telefoon pescobar brussel',
      'openingsuren visrestaurant sint-gillis',
      'parking stefania louiza restaurant',
      'metro louiza visrestaurant',
      'contact pescobar brussel',
    ],
    en: [
      'pescobar brussels address rue jourdan 18',
      'pescobar brussels phone number',
      'opening hours seafood restaurant saint-gilles',
      'parking near avenue louise restaurant',
      'louise metro seafood restaurant',
      'contact pescobar brussels',
    ],
    ro: [
      'adresa pescobar bruxelles rue jourdan 18',
      'telefon pescobar bruxelles',
      'program pescobar seafood bruxelles',
      'parcare avenue louise pescobar',
      'metrou louise restaurant romanesc',
      'contact pescobar bruxelles',
    ],
  },
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  pageKey,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  pageKey: SeoPageKey;
}): Metadata {
  const canonicalUrl = getCanonicalUrl(locale, path);
  const ogImageUrl = `/${locale}/opengraph-image`;
  const alternateLocale = LOCALES.filter((l) => l !== locale).map(
    (l) => OG_LOCALE_MAP[l]
  );

  return {
    title,
    description,
    keywords: PAGE_KEYWORDS[pageKey][locale],
    alternates: getAlternates(locale, path),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: OG_LOCALE_MAP[locale],
      alternateLocale,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
