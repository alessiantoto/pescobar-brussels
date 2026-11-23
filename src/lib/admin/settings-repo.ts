import { unstable_cache } from 'next/cache';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase/admin';
import { SETTINGS_CACHE_TAG } from '@/lib/menu-contract';
import {
  DEFAULT_RESTAURANT_SETTINGS,
  type RestaurantSettingsBundle,
} from '@/lib/settings-contract';

async function fetchSettingsUncached(): Promise<{
  settings: RestaurantSettingsBundle;
  source: 'supabase' | 'static_fallback';
}> {
  if (!isSupabaseConfigured()) {
    return {
      settings: structuredClone(DEFAULT_RESTAURANT_SETTINGS),
      source: 'static_fallback',
    };
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('key, value');

    if (error || !data || data.length === 0) {
      return {
        settings: structuredClone(DEFAULT_RESTAURANT_SETTINGS),
        source: 'static_fallback',
      };
    }

    const merged = structuredClone(DEFAULT_RESTAURANT_SETTINGS);
    for (const row of data) {
      const k = row.key as keyof RestaurantSettingsBundle;
      if (k === 'closed_days' && Array.isArray(row.value)) {
        merged.closed_days = row.value;
      } else if (k in merged && row.value && typeof row.value === 'object') {
        // Merge section object safely over defaults
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (merged as any)[k] = {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(merged as any)[k],
          ...row.value,
        };
      }
    }

    return { settings: merged, source: 'supabase' };
  } catch (err) {
    console.warn('Settings repo fallback:', err);
    return {
      settings: structuredClone(DEFAULT_RESTAURANT_SETTINGS),
      source: 'static_fallback',
    };
  }
}

export const getCachedRestaurantSettings = unstable_cache(
  fetchSettingsUncached,
  ['pescobar-restaurant-settings-v1'],
  { tags: [SETTINGS_CACHE_TAG], revalidate: 300 }
);

export async function getAdminRestaurantSettings() {
  return fetchSettingsUncached();
}

