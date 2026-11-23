import { revalidatePath, revalidateTag } from 'next/cache';
import { LOCALES } from '@/config/site';
import { MENU_CACHE_TAG, SETTINGS_CACHE_TAG } from '@/lib/menu-contract';

const LOCALE_PUBLIC_PATHS = [
  '',
  '/menu',
  '/qr-menu',
  '/business-lunch',
  '/reservations',
  '/contact',
  '/delivery',
  '/private-events',
];

/**
 * Instantly purge ISR/data cache for public site & table QR menus
 * whenever a price, 86'd availability, or restaurant setting changes.
 */
export function revalidateMenuAndPublicSite(): void {
  try {
    revalidateTag(MENU_CACHE_TAG);
    revalidateTag(SETTINGS_CACHE_TAG);
  } catch {
    // Safe fallback outside request context
  }

  for (const locale of LOCALES) {
    for (const sub of LOCALE_PUBLIC_PATHS) {
      revalidatePath(`/${locale}${sub}`);
    }
  }
  revalidatePath('/admin');
  revalidatePath('/admin/dishes');
  revalidatePath('/admin/sold-out');
  revalidatePath('/admin/reservations');
  revalidatePath('/admin/settings');
}

