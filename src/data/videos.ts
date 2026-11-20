import type { Locale } from '@/config/site';

export interface VideoClipItem {
  id: string;
  poster: string;
  video: string;
  title: Record<Locale, string>;
  caption: Record<Locale, string>;
}

export const HERO_VIDEO: VideoClipItem = {
  id: 'hero-seafood',
  poster: '/images/video-posters/hero.jpg',
  video: '/videos/video_hero.mp4',
  title: {
    fr: 'Pescobar Seafood Bruxelles — Cuisine fruits de mer près de l’Avenue Louise',
    nl: 'Pescobar Seafood Brussel — Zeevruchtenkeuken bij de Louizalaan',
    en: 'Pescobar Seafood Brussels — Live kitchen off Avenue Louise',
    ro: 'Pescobar Seafood Bruxelles — Bucătărie fructe de mare lângă Avenue Louise',
  },
  caption: {
    fr: 'Seafood Boil, homard, poulpe grillé et grands plateaux servis chauds à Saint-Gilles.',
    nl: 'Seafood Boil, kreeft, gegrilde octopus en royale schotels in Sint-Gillis.',
    en: 'Seafood Boil, lobster, grilled octopus and hot sharing platters in Saint-Gilles.',
    ro: 'Seafood Boil, homar, caracatiță la grătar și platouri calde servite în Saint-Gilles.',
  },
};

// Ordered strictly 1 -> 8 matching public/videos/video_carusel_1..8.mp4
export const VIDEO_CLIPS: VideoClipItem[] = [
  {
    id: 'carusel-1',
    poster: '/images/video-posters/carusel_1.jpg',
    video: '/videos/video_carusel_1.mp4',
    title: {
      fr: 'Grand Plateau Signature',
      nl: 'Signature Zeevruchtenschotel',
      en: 'Signature Seafood Platter',
      ro: 'Platou Signature',
    },
    caption: {
      fr: 'Homard, poulpe grillé, gambas & sauces',
      nl: 'Kreeft, gegrilde octopus, gamba’s & sauzen',
      en: 'Lobster, grilled octopus, prawns & sauces',
      ro: 'Homar, caracatiță la grătar, creveți & sosuri',
    },
  },
  {
    id: 'carusel-2',
    poster: '/images/video-posters/carusel_2.jpg',
    video: '/videos/video_carusel_2.mp4',
    title: {
      fr: 'Le Sommet du Monde',
      nl: 'Top of the World',
      en: 'Top of the World',
      ro: 'Top of the World',
    },
    caption: {
      fr: 'Plateau 5 kg • Vin inclus',
      nl: 'Schotel 5 kg • Wijn inbegrepen',
      en: '5 kg seafood feast • Wine included',
      ro: 'Platou 5 kg • Vin inclus',
    },
  },
  {
    id: 'carusel-3',
    poster: '/images/video-posters/carusel_3.jpg',
    video: '/videos/video_carusel_3.mp4',
    title: {
      fr: 'L’expérience Seafood Boil',
      nl: 'De Seafood Boil-beleving',
      en: 'The Seafood Boil Ritual',
      ro: 'Experiența Seafood Boil',
    },
    caption: {
      fr: 'Gants noirs & sauces maison',
      nl: 'Zwarte handschoenen & huissauzen',
      en: 'Black gloves & signature spices',
      ro: 'Mănuși negre & sosuri aromate',
    },
  },
  {
    id: 'carusel-4',
    poster: '/images/video-posters/carusel_4.jpg',
    video: '/videos/video_carusel_4.mp4',
    title: {
      fr: 'Dîner & Ambiance Live',
      nl: 'Diner & Live Sfeer',
      en: 'Dinner & Live Violin Vibe',
      ro: 'Cină & Atmosferă Live',
    },
    caption: {
      fr: 'Soirées conviviales Rue Jourdan',
      nl: 'Gezellige avonden in de Jourdanstraat',
      en: 'Lively evenings on Rue Jourdan',
      ro: 'Seri cu muzică și platouri pe Rue Jourdan',
    },
  },
  {
    id: 'carusel-5',
    poster: '/images/video-posters/carusel_5.jpg',
    video: '/videos/video_carusel_5.mp4',
    title: {
      fr: 'Grandes tablées à Bruxelles',
      nl: 'Grote tafels in Brussel',
      en: 'Feasts & Celebrations',
      ro: 'Mese mari în Bruxelles',
    },
    caption: {
      fr: 'Anniversaires, groupes & dîners',
      nl: 'Verjaardagen, groepen & diners',
      en: 'Birthdays, groups & corporate tables',
      ro: 'Aniversări, prieteni & evenimente',
    },
  },
  {
    id: 'carusel-6',
    poster: '/images/video-posters/carusel_6.jpg',
    video: '/videos/video_carusel_6.mp4',
    title: {
      fr: 'Service aux grands plateaux',
      nl: 'Groepsschotels aan tafel',
      en: 'Group Platter Service',
      ro: 'Platouri mari pentru grupuri',
    },
    caption: {
      fr: 'Plateaux de 2 à 6 convives',
      nl: 'Schotels voor 2 tot 6 gasten',
      en: 'Sharing platters for 2–6 guests',
      ro: 'Platouri de împărțit (2–6 pers.)',
    },
  },
  {
    id: 'carusel-7',
    poster: '/images/video-posters/carusel_7.jpg',
    video: '/videos/video_carusel_7.mp4',
    title: {
      fr: 'Poulpe entier grillé',
      nl: 'Hele gegrilde octopus',
      en: 'Whole grilled octopus',
      ro: 'Caracatiță întreagă la grătar',
    },
    caption: {
      fr: '950g • Pommes grenailles & vin inclus',
      nl: '950g • Krieltjes & wijn inbegrepen',
      en: '950g • Roasted potatoes & wine included',
      ro: '950g • Cartofi copți & vin inclus',
    },
  },
  {
    id: 'carusel-8',
    poster: '/images/video-posters/carusel_8.jpg',
    video: '/videos/video_carusel_8.mp4',
    title: {
      fr: 'Seafood Boil à table',
      nl: 'Seafood Boil aan tafel',
      en: 'Tableside Seafood Boil',
      ro: 'Seafood Boil servit la masă',
    },
    caption: {
      fr: 'Servi fumant pour 5–6 personnes',
      nl: 'Warm geserveerd voor 5–6 personen',
      en: 'Served steaming hot for 5–6 guests',
      ro: 'Servit fierbinte pentru 5–6 persoane',
    },
  },
];
