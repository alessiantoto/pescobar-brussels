'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import type { Locale } from '@/config/site';
import {
  BADGE_LABELS,
  MENU_BADGES,
  MENU_LOCALES,
  type MenuBadge,
  type MenuCategoryRow,
  type MenuItemRow,
} from '@/lib/menu-contract';

const LOCALE_NAMES: Record<Locale, string> = {
  fr: 'FR · Français',
  nl: 'NL · Nederlands',
  en: 'EN · English',
  ro: 'RO · Română',
};

export default function GeneralTab({
  item,
  categories,
  isNew,
  onChange,
}: {
  item: MenuItemRow;
  categories: MenuCategoryRow[];
  isNew: boolean;
  onChange: Dispatch<SetStateAction<MenuItemRow>>;
}) {
  const [lang, setLang] = useState<Locale>('fr');

  const toggleBadge = (badge: MenuBadge) => {
    onChange((prev) => {
      const exists = prev.badges.includes(badge);
      return {
        ...prev,
        badges: exists
          ? prev.badges.filter((b) => b !== badge)
          : [...prev.badges, badge],
      };
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Multilingual texts */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900">
            Conținut multilingv
          </h2>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {MENU_LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition ${
                  lang === l
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-500">
          Editezi limba: <strong>{LOCALE_NAMES[lang]}</strong>
        </p>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Nume preparat ({lang.toUpperCase()}) *
          </label>
          <input
            type="text"
            value={item.names[lang]}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                names: { ...prev.names, [lang]: e.target.value },
              }))
            }
            placeholder="Ex: Poulpe grillé à la méditerranéenne"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Descriere scurtă ({lang.toUpperCase()})
          </label>
          <textarea
            rows={3}
            value={item.descriptions[lang]}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                descriptions: { ...prev.descriptions, [lang]: e.target.value },
              }))
            }
            placeholder="Descriere apetisantă vizibilă pe site și QR Menu..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Notă opțională bucătar ({lang.toUpperCase()})
          </label>
          <input
            type="text"
            value={item.chef_notes[lang]}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                chef_notes: { ...prev.chef_notes, [lang]: e.target.value },
              }))
            }
            placeholder="Ex: Recomandat cu vin alb sec sau sos vierge"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Badges */}
        <div className="pt-2 border-t border-slate-100">
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Etichete / Badge-uri preparat
          </label>
          <div className="flex flex-wrap gap-2">
            {MENU_BADGES.map((badge) => {
              const active = item.badges.includes(badge);
              return (
                <button
                  key={badge}
                  type="button"
                  onClick={() => toggleBadge(badge)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    active
                      ? 'bg-amber-500 text-slate-950 border-amber-500'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {BADGE_LABELS[badge].ro}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Category, ordering, channels */}
      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <h2 className="text-sm font-bold text-slate-900">
            Organizare &amp; Categorie
          </h2>

          {isNew && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Slug / ID unic (opțional)
              </label>
              <input
                type="text"
                value={item.id}
                onChange={(e) =>
                  onChange((prev) => ({ ...prev, id: e.target.value }))
                }
                placeholder="Se generează automat din numele FR"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Categorie
            </label>
            <select
              value={item.category_id}
              onChange={(e) => {
                const cat = categories.find((c) => c.id === e.target.value);
                onChange((prev) => ({
                  ...prev,
                  category_id: e.target.value,
                  type: cat?.type ?? prev.type,
                }));
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.names.fr} ({c.type})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tip
              </label>
              <select
                value={item.type}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    type: e.target.value as 'food' | 'drink',
                  }))
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
              >
                <option value="food">Mâncare</option>
                <option value="drink">Băutură</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ordine afișare
              </label>
              <input
                type="number"
                value={item.sort_order}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    sort_order: Number(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Channels */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-900">
            Canale unde apare
          </h2>

          {[
            { key: 'show_site', label: 'Site public (/menu)' },
            { key: 'show_qr', label: 'QR Menu la masă (/qr-menu)' },
            { key: 'show_takeaway', label: 'Takeaway / Delivery' },
            {
              key: 'show_business_lunch',
              label: 'Business Lunch (12:00–15:00)',
            },
          ].map((ch) => {
            const k = ch.key as keyof Pick<
              MenuItemRow,
              'show_site' | 'show_qr' | 'show_takeaway' | 'show_business_lunch'
            >;
            return (
              <label
                key={ch.key}
                className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={item[k]}
                  onChange={(e) =>
                    onChange((prev) => ({ ...prev, [k]: e.target.checked }))
                  }
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span>{ch.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

