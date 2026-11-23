/**
 * Restaurant configuration CONTRACT (`site_settings` key -> typed value).
 * Server AND client safe: defaults mirror `SITE_CONFIG`.
 */
import { SITE_CONFIG } from '@/config/site';
import type { LocalizedText } from '@/lib/menu-contract';

export type DayOfWeekKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export const DAYS_OF_WEEK: { key: DayOfWeekKey; labelRo: string }[] = [
  { key: 'monday', labelRo: 'Luni' },
  { key: 'tuesday', labelRo: 'Marți' },
  { key: 'wednesday', labelRo: 'Miercuri' },
  { key: 'thursday', labelRo: 'Joi' },
  { key: 'friday', labelRo: 'Vineri' },
  { key: 'saturday', labelRo: 'Sâmbătă' },
  { key: 'sunday', labelRo: 'Duminică' },
];

export interface DaySchedule {
  is_open: boolean;
  open: string; // HH:mm
  close: string;
  kitchen_close: string;
}

export interface ClosedDayEntry {
  date: string; // YYYY-MM-DD
  reason: string;
}

export interface RestaurantSettingsBundle {
  identity: {
    brandName: string;
    legalName: string;
    phone: string;
    whatsappNumber: string;
    email: string;
    eventsEmail: string;
    vatNumber: string;
  };
  address: {
    streetAddress: string;
    postalCode: string;
    city: string;
    district: string;
    googleMapsUrl: string;
    wazeUrl: string;
    latitude: number;
    longitude: number;
    accessNote: string;
  };
  hours: {
    days: Record<DayOfWeekKey, DaySchedule>;
    businessLunchStart: string;
    businessLunchEnd: string;
    businessLunchPriceEur: number;
    businessLunchActive: boolean;
  };
  closed_days: ClosedDayEntry[];
  social: {
    instagram: string;
    tiktok: string;
    facebook: string;
  };
  delivery: {
    uberEatsUrl: string;
    uberEatsEnabled: boolean;
    deliverooUrl: string;
    deliverooEnabled: boolean;
    takeawayUrl: string;
    takeawayEnabled: boolean;
  };
  reservation_rules: {
    onlineBookingsEnabled: boolean;
    maxCapacityPerSlot: number;
    slotDurationMinutes: number;
    largeGroupThreshold: number;
    requiresDepositAboveThreshold: boolean;
  };
  announcement: {
    enabled: boolean;
    text: LocalizedText;
    href: string;
  };
  maintenance: {
    enabled: boolean;
    message: string;
  };
}

const DEFAULT_DAY: DaySchedule = {
  is_open: true,
  open: SITE_CONFIG.hours.daily.open,
  close: SITE_CONFIG.hours.daily.close,
  kitchen_close: SITE_CONFIG.hours.daily.kitchenClose,
};

export const DEFAULT_RESTAURANT_SETTINGS: RestaurantSettingsBundle = {
  identity: {
    brandName: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    phone: SITE_CONFIG.phone,
    whatsappNumber: SITE_CONFIG.whatsappNumber,
    email: SITE_CONFIG.email,
    eventsEmail: SITE_CONFIG.email,
    vatNumber: SITE_CONFIG.vatNumber,
  },
  address: {
    streetAddress: SITE_CONFIG.address.streetAddress,
    postalCode: SITE_CONFIG.address.postalCode,
    city: SITE_CONFIG.address.addressLocality,
    district: SITE_CONFIG.address.district,
    googleMapsUrl: SITE_CONFIG.address.googleMapsUrl,
    wazeUrl: `https://waze.com/ul?ll=${SITE_CONFIG.geo.latitude},${SITE_CONFIG.geo.longitude}&navigate=yes`,
    latitude: SITE_CONFIG.geo.latitude,
    longitude: SITE_CONFIG.geo.longitude,
    accessNote: `${SITE_CONFIG.transport.metro} • ${SITE_CONFIG.transport.parking[0]}`,
  },
  hours: {
    days: {
      monday: { ...DEFAULT_DAY },
      tuesday: { ...DEFAULT_DAY },
      wednesday: { ...DEFAULT_DAY },
      thursday: { ...DEFAULT_DAY },
      friday: { ...DEFAULT_DAY },
      saturday: { ...DEFAULT_DAY },
      sunday: { ...DEFAULT_DAY },
    },
    businessLunchStart: SITE_CONFIG.hours.businessLunch.open,
    businessLunchEnd: SITE_CONFIG.hours.businessLunch.close,
    businessLunchPriceEur: SITE_CONFIG.hours.businessLunch.priceEur,
    businessLunchActive: true,
  },
  closed_days: [],
  social: {
    instagram: SITE_CONFIG.socials.instagram,
    tiktok: SITE_CONFIG.socials.tiktok,
    facebook: SITE_CONFIG.socials.facebook,
  },
  delivery: {
    uberEatsUrl: SITE_CONFIG.delivery.uberEats,
    uberEatsEnabled: true,
    deliverooUrl: SITE_CONFIG.delivery.deliveroo,
    deliverooEnabled: true,
    takeawayUrl: SITE_CONFIG.delivery.takeaway,
    takeawayEnabled: true,
  },
  reservation_rules: {
    onlineBookingsEnabled: true,
    maxCapacityPerSlot: 24,
    slotDurationMinutes: 120,
    largeGroupThreshold: 8,
    requiresDepositAboveThreshold: false,
  },
  announcement: {
    enabled: false,
    text: {
      fr: '',
      nl: '',
      en: '',
      ro: '',
    },
    href: '',
  },
  maintenance: {
    enabled: false,
    message: 'Site en maintenance — réservations par téléphone au +32 499 00 70 22.',
  },
};

