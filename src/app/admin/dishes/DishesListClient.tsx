'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Edit3,
  EyeOff,
  RotateCcw,
  Search,
  X,
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number | 'all'>(20);

  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories]
  );

  const isFiltered = Boolean(
    search.trim() ||
      categoryId !== 'all' ||
      typeFilter !== 'all' ||
      statusFilter !== 'all'
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

  // Handlers that reset to page 1
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setCategoryId(val);
    setCurrentPage(1);
  };

  const handleTypeChange = (val: 'all' | 'food' | 'drink') => {
    setTypeFilter(val);
    setCurrentPage(1);
  };

  const handleStatusChange = (val: 'all' | 'available' | 'hidden') => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategoryId('all');
    setTypeFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  // Pagination metrics
  const totalCount = filtered.length;
  const numericPageSize = pageSize === 'all' ? (totalCount || 1) : pageSize;
  const totalPages = Math.max(1, Math.ceil(totalCount / numericPageSize));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (validCurrentPage - 1) * numericPageSize;
  const endIndex =
    pageSize === 'all'
      ? totalCount
      : Math.min(startIndex + numericPageSize, totalCount);
  const paginatedItems =
    pageSize === 'all' ? filtered : filtered.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (validCurrentPage <= 4) {
      return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
    }
    if (validCurrentPage >= totalPages - 3) {
      return [
        1,
        'ellipsis',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      'ellipsis',
      validCurrentPage - 1,
      validCurrentPage,
      validCurrentPage + 1,
      'ellipsis',
      totalPages,
    ];
  };

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
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input with Clear Button */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Caută preparat (FR/NL/EN/RO)..."
              className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
            />
            {search && (
              <button
                type="button"
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                title="Șterge căutarea"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-4">
            <select
              value={categoryId}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
            >
              <option value="all">Toate categoriile ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.names.fr || c.names.ro} ({c.type})
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) =>
                handleStatusChange(
                  e.target.value as 'all' | 'available' | 'hidden'
                )
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-white text-slate-900 border border-slate-200 text-sm focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition"
            >
              <option value="all">Toate statusurile</option>
              <option value="available">Vizibile pe site</option>
              <option value="hidden">Ascunse de pe site</option>
            </select>
          </div>
        </div>

        {/* Row 2: Type Segmented Pills & Clear Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Tip:</span>
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => handleTypeChange('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  typeFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Toate
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('food')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  typeFilter === 'food'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mâncare
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('drink')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                  typeFilter === 'drink'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Băuturi
              </button>
            </div>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              Resetează filtre
            </button>
          )}
        </div>
      </div>

      {/* Results count & Page size selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs text-slate-500">
        <div>
          {totalCount === 0 ? (
            <span>Niciun preparat găsit</span>
          ) : (
            <span>
              Afișare <strong>{startIndex + 1}–{endIndex}</strong> din{' '}
              <strong>{totalCount}</strong> preparate
              {items.length !== totalCount && ` (filtrate din ${items.length})`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span>Afișează:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              const val =
                e.target.value === 'all' ? 'all' : Number(e.target.value);
              setPageSize(val);
              setCurrentPage(1);
            }}
            className="px-2.5 py-1 rounded-lg bg-white text-slate-900 border border-slate-200 text-xs font-semibold focus:border-slate-400 focus:ring-1 focus:ring-slate-300"
          >
            <option value={20}>20 / pagină</option>
            <option value={50}>50 / pagină</option>
            <option value="all">Toate ({totalCount})</option>
          </select>
        </div>
      </div>

      {/* Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {paginatedItems.map((item) => {
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
                        className="font-semibold text-sm text-slate-900 hover:text-slate-600 truncate transition"
                      >
                        {item.names.fr || item.names.ro}
                      </Link>
                      <span className="text-xs font-bold text-slate-900">
                        €{item.price_eur.toFixed(2)}
                      </span>
                      {item.variants.length > 0 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          {item.variants.length} variante
                        </span>
                      )}
                      {item.allergens.length > 0 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
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
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/admin/dishes/${item.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0B1526] hover:bg-[#132A4A] text-white transition shadow-xs"
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

      {/* Smart Pagination Controls */}
      {pageSize !== 'all' && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 order-2 sm:order-1">
            Pagina <strong>{validCurrentPage}</strong> din{' '}
            <strong>{totalPages}</strong> ({totalCount} preparate)
          </p>

          <div className="flex items-center gap-1.5 order-1 sm:order-2 flex-wrap justify-center">
            <button
              type="button"
              disabled={validCurrentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-xs font-semibold transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((p, idx) => {
                if (p === 'ellipsis') {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="w-7 text-center text-xs text-slate-400 select-none"
                    >
                      …
                    </span>
                  );
                }
                const isActive = p === validCurrentPage;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPage(p as number)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                      isActive
                        ? 'bg-[#0B1526] text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={validCurrentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-xs font-semibold transition"
            >
              <span>Următor</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
