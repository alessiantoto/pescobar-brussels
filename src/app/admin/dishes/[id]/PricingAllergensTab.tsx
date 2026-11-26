'use client';

import { useState, type Dispatch, type SetStateAction } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Locale } from '@/config/site';
import {
  ALLERGEN_LABELS,
  EU_ALLERGENS,
  MENU_LOCALES,
  VAT_HELP,
  VAT_RATES,
  WEIGHT_UNITS,
  emptyLocalized,
  type AllergenCode,
  type MenuAddon,
  type MenuItemRow,
  type MenuVariant,
  type VatRate,
  type WeightUnit,
} from '@/lib/menu-contract';

export default function PricingAllergensTab({
  item,
  onChange,
}: {
  item: MenuItemRow;
  onChange: Dispatch<SetStateAction<MenuItemRow>>;
}) {
  const [ingLang, setIngLang] = useState<Locale>('fr');

  const toggleAllergen = (code: AllergenCode) => {
    onChange((prev) => {
      const exists = prev.allergens.includes(code);
      return {
        ...prev,
        allergens: exists
          ? prev.allergens.filter((a) => a !== code)
          : [...prev.allergens, code],
      };
    });
  };

  const addVariant = () => {
    const v: MenuVariant = {
      id: `var-${Date.now()}`,
      label: { fr: '500g', nl: '500g', en: '500g', ro: '500g' },
      weight_value: 500,
      weight_unit: 'g',
      price_eur: item.price_eur || 0,
      status: 'available',
    };
    onChange((prev) => ({ ...prev, variants: [...prev.variants, v] }));
  };

  const addAddon = () => {
    const a: MenuAddon = {
      id: `addon-${Date.now()}`,
      label: {
        fr: 'Extra sauce',
        nl: 'Extra saus',
        en: 'Extra sauce',
        ro: 'Extra sos',
      },
      price_eur: 3,
      is_available: true,
    };
    onChange((prev) => ({ ...prev, addons: [...prev.addons, a] }));
  };

  return (
    <div className="space-y-6">
      {/* Pricing, VAT, Weight */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h2 className="text-sm font-bold text-slate-900 mb-4">
          Preț, TVA Belgia &amp; Gramaj
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Preț curent (€) *
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={item.price_eur}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  price_eur: Number(e.target.value) || 0,
                }))
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Preț vechi / Promo (€)
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={item.old_price_eur ?? ''}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  old_price_eur: e.target.value ? Number(e.target.value) : null,
                }))
              }
              placeholder="Opțional"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Cotă TVA Belgia
            </label>
            <select
              value={item.vat_rate}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  vat_rate: Number(e.target.value) as VatRate,
                }))
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
            >
              {VAT_RATES.map((rate) => (
                <option key={rate} value={rate}>
                  {VAT_HELP[rate]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Gramaj &amp; Unitate
            </label>
            <div className="flex gap-1.5">
              <input
                type="number"
                value={item.weight_value ?? ''}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    weight_value: e.target.value ? Number(e.target.value) : null,
                  }))
                }
                placeholder="350"
                className="w-full px-2.5 py-2 rounded-xl border border-slate-200 text-sm"
              />
              <select
                value={item.weight_unit}
                onChange={(e) =>
                  onChange((prev) => ({
                    ...prev,
                    weight_unit: e.target.value as WeightUnit,
                  }))
                }
                className="px-2 py-2 rounded-xl border border-slate-200 text-sm bg-white"
              >
                {WEIGHT_UNITS.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Kcal (opțional)
            </label>
            <input
              type="number"
              value={item.kcal ?? ''}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  kcal: e.target.value ? Number(e.target.value) : null,
                }))
              }
              placeholder="Ex: 520"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Variants & Addons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Variants */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Variante / Porții
              </h2>
              <p className="text-xs text-slate-500">
                Ex: 500g — €24 / 1kg — €44 / Platou 2–3 pers.
              </p>
            </div>
            <button
              type="button"
              onClick={addVariant}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Adaugă variantă
            </button>
          </div>

          {item.variants.length === 0 ? (
            <p className="text-xs text-slate-400 italic">
              Nicio variantă — se folosește prețul standard (€
              {item.price_eur.toFixed(2)}).
            </p>
          ) : (
            <div className="space-y-3">
              {item.variants.map((v, idx) => (
                <div
                  key={v.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={v.label.fr}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange((prev) => ({
                          ...prev,
                          variants: prev.variants.map((row, i) =>
                            i === idx
                              ? {
                                  ...row,
                                  label: {
                                    ...row.label,
                                    fr: val,
                                    nl: row.label.nl || val,
                                    en: row.label.en || val,
                                    ro: row.label.ro || val,
                                  },
                                }
                              : row
                          ),
                        }));
                      }}
                      placeholder="Etichetă (ex: Platou 2 pers.)"
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onChange((prev) => ({
                          ...prev,
                          variants: prev.variants.filter((_, i) => i !== idx),
                        }))
                      }
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="number"
                      step="0.5"
                      value={v.price_eur}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          variants: prev.variants.map((row, i) =>
                            i === idx
                              ? { ...row, price_eur: Number(e.target.value) || 0 }
                              : row
                          ),
                        }))
                      }
                      placeholder="Preț €"
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
                    />
                    <input
                      type="number"
                      value={v.weight_value ?? ''}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          variants: prev.variants.map((row, i) =>
                            i === idx
                              ? {
                                  ...row,
                                  weight_value: e.target.value
                                    ? Number(e.target.value)
                                    : null,
                                }
                              : row
                          ),
                        }))
                      }
                      placeholder="Gramaj"
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                    />
                    <select
                      value={v.status}
                      onChange={(e) =>
                        onChange((prev) => ({
                          ...prev,
                          variants: prev.variants.map((row, i) =>
                            i === idx
                              ? {
                                  ...row,
                                  status: e.target.value as 'available' | 'sold_out',
                                }
                              : row
                          ),
                        }))
                      }
                      className="px-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs"
                    >
                      <option value="available">Disponibil</option>
                      <option value="sold_out">Epuizat</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add-ons */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Extra-uri / Add-on-uri
              </h2>
              <p className="text-xs text-slate-500">
                Ex: Extra sos unt cu usturoi (+€3), Extra creveți (+€6)
              </p>
            </div>
            <button
              type="button"
              onClick={addAddon}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" /> Adaugă extra
            </button>
          </div>

          {item.addons.length === 0 ? (
            <p className="text-xs text-slate-400 italic">
              Niciun add-on configurat pentru acest preparat.
            </p>
          ) : (
            <div className="space-y-2.5">
              {item.addons.map((addon, idx) => (
                <div
                  key={addon.id}
                  className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={addon.label.fr}
                    onChange={(e) => {
                      const val = e.target.value;
                      onChange((prev) => ({
                        ...prev,
                        addons: prev.addons.map((row, i) =>
                          i === idx
                            ? {
                                ...row,
                                label: {
                                  ...(row.label || emptyLocalized()),
                                  fr: val,
                                  nl: row.label?.nl || val,
                                  en: row.label?.en || val,
                                  ro: row.label?.ro || val,
                                },
                              }
                            : row
                        ),
                      }));
                    }}
                    placeholder="Denumire extra"
                    className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
                  />
                  <input
                    type="number"
                    step="0.5"
                    value={addon.price_eur}
                    onChange={(e) =>
                      onChange((prev) => ({
                        ...prev,
                        addons: prev.addons.map((row, i) =>
                          i === idx
                            ? { ...row, price_eur: Number(e.target.value) || 0 }
                            : row
                        ),
                      }))
                    }
                    className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onChange((prev) => ({
                        ...prev,
                        addons: prev.addons.filter((_, i) => i !== idx),
                      }))
                    }
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ingredients & Origin */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-slate-900">
            Ce conține (Ingrediente) &amp; Origine
          </h2>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {MENU_LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setIngLang(l)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                  ingLang === l
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Ingrediente ({ingLang.toUpperCase()}) — separate prin virgulă
            </label>
            <input
              type="text"
              value={item.ingredients[ingLang].join(', ')}
              onChange={(e) => {
                const list = e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean);
                onChange((prev) => ({
                  ...prev,
                  ingredients: { ...prev.ingredients, [ingLang]: list },
                }));
              }}
              placeholder="Ex: Poulpe, huile d'olive, ail, persil, citron"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Origine ({ingLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={item.origin[ingLang]}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  origin: { ...prev.origin, [ingLang]: e.target.value },
                }))
              }
              placeholder="Ex: Caracatiță proaspătă de Mediterana"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
        </div>
      </div>

      {/* 14 EU Allergens (AFSCA/FAVV) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Cei 14 Alergeni UE (obligatoriu legal Belgia · AFSCA/FAVV)
          </h2>
          <p className="text-xs text-slate-500">
            Selectează toți alergenii prezenți în preparat sau în sosurile sale.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {EU_ALLERGENS.map((code) => {
            const active = item.allergens.includes(code);
            return (
              <button
                key={code}
                type="button"
                onClick={() => toggleAllergen(code)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left transition ${
                  active
                    ? 'bg-[#0B1526] text-white border-[#0B1526] shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {ALLERGEN_LABELS[code].ro}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

