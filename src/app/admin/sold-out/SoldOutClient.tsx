'use client';

import { useMemo, useState } from 'react';
import { Ban, CheckCircle2, EyeOff, Search, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  adminSetDishStatus,
  adminToggleBusinessLunch,
} from '@/app/actions/admin-menu';
import { adminSaveSettingsSection } from '@/app/actions/admin-settings';
import {
  effectiveStatus,
  type MenuCategoryRow,
  type MenuItemRow,
  type MenuItemStatus,
} from '@/lib/menu-contract';
import type { RestaurantSettingsBundle } from '@/lib/settings-contract';

export default function SoldOutClient({
  initialItems,
  categories,
  today,
  initialHours,
}: {
  initialItems: MenuItemRow[];
  categories: MenuCategoryRow[];
  today: string;
  initialHours: RestaurantSettingsBundle['hours'];
}) {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState('');
  const [onlySoldOut, setOnlySoldOut] = useState(false);
  const [onlyLunch, setOnlyLunch] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const [hours, setHours] = useState(initialHours);
  const [savingLunch, setSavingLunch] = useState(false);

  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c.names.fr || c.names.ro])),
    [categories]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const eff = effectiveStatus(item, today);
      if (onlySoldOut && eff !== 'sold_out') return false;
      if (onlyLunch && !item.show_business_lunch) return false;
      if (!q) return true;
      return (
        item.names.fr.toLowerCase().includes(q) ||
        item.names.ro.toLowerCase().includes(q) ||
        item.names.en.toLowerCase().includes(q) ||
        (categoryMap.get(item.category_id) || '').toLowerCase().includes(q)
      );
    });
  }, [items, query, onlySoldOut, onlyLunch, today, categoryMap]);

  const handleStatusChange = async (id: string, nextStatus: MenuItemStatus) => {
    setBusyId(id);
    const res = await adminSetDishStatus(id, nextStatus);
    setBusyId(null);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: res.data.status, sold_out_on: res.data.sold_out_on }
          : item
      )
    );
    toast.success('Status actualizat live!');
  };

  const handleBusinessLunchToggle = async (id: string, nextVal: boolean) => {
    setBusyId(id);
    const res = await adminToggleBusinessLunch(id, nextVal);
    setBusyId(null);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, show_business_lunch: nextVal } : item
      )
    );
    toast.success(
      nextVal ? 'Adăugat în Business Lunch' : 'Scos din Business Lunch'
    );
  };

  const saveLunchSettings = async () => {
    setSavingLunch(true);
    const res = await adminSaveSettingsSection('hours', hours);
    setSavingLunch(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success('Configurația Business Lunch a fost salvată!');
  };

  const soldOutCount = items.filter(
    (i) => effectiveStatus(i, today) === 'sold_out'
  ).length;

  return (
    <div className="space-y-6">
      {/* Quick Business Lunch Config Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Business Lunch ({hours.businessLunchStart} –{' '}
                {hours.businessLunchEnd})
              </h2>
              <p className="text-xs text-slate-500">
                Activează/dezactivează formula de prânz și prețul standard
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={hours.businessLunchActive}
                onChange={(e) =>
                  setHours((h) => ({ ...h, businessLunchActive: e.target.checked }))
                }
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
              />
              Activ azi
            </label>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500">Preț €</span>
              <input
                type="number"
                step="0.5"
                value={hours.businessLunchPriceEur}
                onChange={(e) =>
                  setHours((h) => ({
                    ...h,
                    businessLunchPriceEur: Number(e.target.value) || 0,
                  }))
                }
                className="w-20 px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm font-semibold"
              />
            </div>

            <button
              type="button"
              onClick={saveLunchSettings}
              disabled={savingLunch}
              className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 disabled:opacity-50"
            >
              {savingLunch ? 'Se salvează...' : 'Salvează Lunch'}
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Caută rapid preparat (FR / RO / EN)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        <button
          type="button"
          onClick={() => setOnlySoldOut((v) => !v)}
          className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition ${
            onlySoldOut
              ? 'bg-rose-600 text-white border-rose-600'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Doar Epuizate ({soldOutCount})
        </button>

        <button
          type="button"
          onClick={() => setOnlyLunch((v) => !v)}
          className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition ${
            onlyLunch
              ? 'bg-amber-500 text-slate-950 border-amber-500'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Doar Business Lunch
        </button>
      </div>

      {/* Ultra-fast tap list */}
      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
        {filtered.map((item) => {
          const eff = effectiveStatus(item, today);
          const isBusy = busyId === item.id;

          return (
            <div
              key={item.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-sm text-slate-900">
                    {item.names.fr}
                  </p>
                  <span className="text-xs font-semibold text-slate-500">
                    €{item.price_eur.toFixed(2)}
                  </span>
                  {eff === 'sold_out' && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">
                      EPUIZAT AZI
                    </span>
                  )}
                  {eff === 'hidden' && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                      ASCUNS
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                  {categoryMap.get(item.category_id) || item.category_id}
                  {item.names.ro !== item.names.fr ? ` · RO: ${item.names.ro}` : ''}
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleStatusChange(item.id, 'available')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    eff === 'available'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-emerald-50'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Disponibil
                </button>

                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleStatusChange(item.id, 'sold_out_today')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    eff === 'sold_out'
                      ? 'bg-rose-600 text-white border-rose-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-rose-50'
                  }`}
                >
                  <Ban className="w-3.5 h-3.5" />
                  86&apos;d Azi
                </button>

                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() => handleStatusChange(item.id, 'hidden')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    eff === 'hidden'
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  Ascuns
                </button>

                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() =>
                    handleBusinessLunchToggle(item.id, !item.show_business_lunch)
                  }
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    item.show_business_lunch
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-white text-slate-500 border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  Lunch
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500">
            Niciun preparat găsit pentru filtrul curent.
          </div>
        )}
      </div>
    </div>
  );
}

