'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Check,
  CheckCircle2,
  Copy,
  Edit3,
  Eye,
  EyeOff,
  Search,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  adminDuplicateDish,
  adminSetDishStatus,
} from '@/app/actions/admin-menu';
import {
  effectiveStatus,
  type MenuCategoryRow,
  type MenuItemRow,
  type MenuItemStatus,
} from '@/lib/menu-contract';

export default function DishesListClient({
  initialItems,
  categories,
  today,
}: {
  initialItems: MenuItemRow[];
  categories: MenuCategoryRow[];
  today: string;
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'food' | 'drink'>('all');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'available' | 'hidden'
  >('all');
  const [busyId, setBusyId] = useState<string | null>(null);

  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (categoryId !== 'all' && item.category_id !== categoryId) return false;
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;
      const eff = effectiveStatus(item, today);
      if (statusFilter !== 'all' && eff !== statusFilter) return false;
      if (!q) return true;
      return (
        item.names.fr.toLowerCase().includes(q) ||
        item.names.nl.toLowerCase().includes(q) ||
        item.names.en.toLowerCase().includes(q) ||
        item.names.ro.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    });
  }, [items, search, categoryId, typeFilter, statusFilter, today]);

  const handleQuickStatus = async (id: string, status: MenuItemStatus) => {
    setBusyId(id);
    const res = await adminSetDishStatus(id, status);
    setBusyId(null);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: res.data.status, sold_out_on: res.data.sold_out_on }
          : i
      )
    );
    toast.success('Status actualizat!');
  };

  const handleDuplicate = async (id: string) => {
    setBusyId(id);
    const res = await adminDuplicateDish(id);
    setBusyId(null);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success('Preparat duplicat! Deschidem copia...');
    router.push(`/admin/dishes/${res.data.id}`);
  };

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Caută preparat (FR/NL/EN/RO)..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
        >
          <option value="all">Toate categoriile ({categories.length})</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.names.fr} ({c.type})
            </option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value as 'all' | 'food' | 'drink')
          }
          className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
        >
          <option value="all">Mâncare & Băuturi</option>
          <option value="food">Doar Mâncare</option>
          <option value="drink">Doar Băuturi</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value as 'all' | 'available' | 'hidden'
            )
          }
          className="px-3 py-2 rounded-xl border border-slate-200 text-sm bg-white"
        >
          <option value="all">Toate preparatele ({items.length})</option>
          <option value="available">Vizibile pe site</option>
          <option value="hidden">Ascunse de pe site</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 px-1">
        Se afișează <strong>{filtered.length}</strong> din {items.length} preparate
      </p>

      {/* Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map((item) => {
            const eff = effectiveStatus(item, today);
            const cat = categoryMap.get(item.category_id);
            const isBusy = busyId === item.id;

            return (
              <div
                key={item.id}
                className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 hover:bg-slate-50/60 transition"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.names.fr}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-slate-400 font-semibold">
                        Fără poză
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/admin/dishes/${item.id}`}
                        className="font-semibold text-sm text-slate-900 hover:text-amber-700 truncate"
                      >
                        {item.names.fr}
                      </Link>
                      <span className="text-xs font-bold text-slate-800">
                        €{item.price_eur.toFixed(2)}
                      </span>
                      {item.variants.length > 0 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                          {item.variants.length} variante
                        </span>
                      )}
                      {item.allergens.length > 0 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-800">
                          {item.allergens.length} alergeni
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      {cat?.names.fr || item.category_id} · TVA {item.vat_rate}% ·{' '}
                      {item.show_site ? 'Site ' : ''}
                      {item.show_qr ? '· QR ' : ''}
                      {item.show_takeaway ? '· Takeaway ' : ''}
                      {item.show_business_lunch ? '· Lunch' : ''}
                    </p>
                  </div>
                </div>

                {/* 1-click Visibility Toggle & Actions */}
                <div className="flex items-center gap-2 flex-wrap shrink-0">
                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() =>
                      handleQuickStatus(
                        item.id,
                        eff === 'hidden' ? 'available' : 'hidden'
                      )
                    }
                    title={
                      eff === 'hidden'
                        ? 'Apasă pentru a afișa preparatul pe site'
                        : 'Apasă pentru a ascunde preparatul de pe site'
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                      eff === 'hidden'
                        ? 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300'
                    }`}
                  >
                    {eff === 'hidden' ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                        Ascuns
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Vizibil pe site
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isBusy}
                    onClick={() => handleDuplicate(item.id)}
                    title="Duplică preparat"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/admin/dishes/${item.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Editează
                  </Link>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-10 text-center text-sm text-slate-500">
              Niciun preparat nu corespunde filtrelor selectate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

