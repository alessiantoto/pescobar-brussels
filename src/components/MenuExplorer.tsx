'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  LayoutGrid,
  List,
  Search,
  X,
} from 'lucide-react';
import type { Locale } from '@/config/site';
import type { MenuTag } from '@/data/menu';
import { AllergenIcon } from '@/components/BrandIcons';
import { DeliveryCtaBar } from '@/components/DeliveryCtaBar';
import { OctopusDivider } from '@/components/OctopusAccents';
import {
  ALL_LEGEND_ALLERGENS,
  ALLERGEN_TRANSLATIONS,
  CATEGORY_COVER_IMAGES,
  type LocalizedMenuCategory,
  type LocalizedMenuItem,
  type MenuExplorerLabels,
} from '@/lib/menuDisplay';
import {
  MenuDishCard,
  MenuDishModal,
  type ModalDishState,
} from '@/components/MenuDishCardModal';

interface MenuExplorerProps {
  locale: Locale;
  categories: LocalizedMenuCategory[];
  items: LocalizedMenuItem[];
  labels: MenuExplorerLabels;
  qrMode?: boolean;
  initialTag?: MenuTag | null;
}

const UI_TEXT: Record<
  Locale,
  {
    foodTab: string;
    drinkTab: string;
    categoriesView: string;
    allItemsView: string;
    backToCategories: string;
    allergenLegendTitle: string;
    itemsCount: (n: number) => string;
  }
> = {
  fr: {
    foodTab: 'Nourriture',
    drinkTab: 'Boissons',
    categoriesView: 'Catégories',
    allItemsView: 'Tout voir',
    backToCategories: 'Catégories',
    allergenLegendTitle: 'Guide des icônes allergènes UE',
    itemsCount: (n) => `${n} ${n === 1 ? 'produit' : 'produits'}`,
  },
  nl: {
    foodTab: 'Gerechten',
    drinkTab: 'Dranken',
    categoriesView: 'Categorieën',
    allItemsView: 'Alles tonen',
    backToCategories: 'Categorieën',
    allergenLegendTitle: 'Gids voor EU-allergeeniconen',
    itemsCount: (n) => `${n} ${n === 1 ? 'item' : 'items'}`,
  },
  en: {
    foodTab: 'Food',
    drinkTab: 'Drinks',
    categoriesView: 'Categories',
    allItemsView: 'View All',
    backToCategories: 'Categories',
    allergenLegendTitle: 'EU Allergen Icons Guide',
    itemsCount: (n) => `${n} ${n === 1 ? 'item' : 'items'}`,
  },
  ro: {
    foodTab: 'Mâncare',
    drinkTab: 'Băuturi',
    categoriesView: 'Categorii',
    allItemsView: 'Vezi tot',
    backToCategories: 'Categorii',
    allergenLegendTitle: 'Ghidul iconițelor pentru alergeni UE',
    itemsCount: (n) => `${n} ${n === 1 ? 'produs' : 'produse'}`,
  },
};

export function MenuExplorer({
  locale,
  categories,
  items,
  labels,
  qrMode = false,
}: MenuExplorerProps) {
  const ui = UI_TEXT[locale] ?? UI_TEXT.fr;
  const [activeTab, setActiveTab] = useState<'food' | 'drink'>('food');
  // null = Visual Category Photo Cards Grid
  // string = Selected category ID (or 'ALL' when user wants to scroll all categories)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [showAllergenLegend, setShowAllergenLegend] = useState(false);
  const [modalItem, setModalItem] = useState<ModalDishState | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('cat');
    if (!catParam) return;
    const found = categories.find((c) => c.id === catParam);
    if (found) {
      setActiveTab(found.type);
      setSelectedCategoryId(found.id);
    }
  }, [categories]);

  const orderedCategories = useMemo(
    () => categories.filter((cat) => cat.type === activeTab),
    [categories, activeTab]
  );

  const itemCountByCategory = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      counts.set(item.categoryId, (counts.get(item.categoryId) ?? 0) + 1);
    }
    return counts;
  }, [items]);

  const query = searchQuery.trim().toLowerCase();
  const isSearching = query.length > 0;

  // Map items by category (only for the active tab & search query)
  const itemsByCategory = useMemo(() => {
    const map = new Map<string, LocalizedMenuItem[]>();
    for (const cat of orderedCategories) {
      const catNameLower = cat.name.toLowerCase();
      const catItems = items.filter((item) => {
        if (item.categoryId !== cat.id) return false;
        if (!isSearching) return true;
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          catNameLower.includes(query)
        );
      });
      if (catItems.length > 0) {
        map.set(cat.id, catItems);
      }
    }
    return map;
  }, [orderedCategories, items, isSearching, query]);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Whether we are currently showing the Visual Category Photo Cards Grid
  const showCategoryPhotoGrid = !isSearching && selectedCategoryId === null;

  return (
    <div className="min-h-screen bg-[#070D17]">
      {/* STICKY CONTROL BAR: Clean Nourriture | Boissons Tabs + Context Bar */}
      <div
        className={`sticky z-40 border-b border-white/10 bg-[#070D17]/95 backdrop-blur-xl ${
          qrMode ? 'top-16' : 'top-16 sm:top-20'
        }`}
      >
        <div className="mx-auto max-w-5xl">
          <div
            role="tablist"
            aria-label={`${ui.foodTab} / ${ui.drinkTab}`}
            className="grid grid-cols-2 border-b border-white/10 bg-[#0C1524]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'food'}
              onClick={() => {
                setActiveTab('food');
                setSelectedCategoryId(null);
              }}
              className={`relative py-3.5 text-center text-sm font-extrabold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#DFC286] sm:text-base ${
                activeTab === 'food'
                  ? 'text-[#DFC286]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <span>{ui.foodTab}</span>
              {activeTab === 'food' && (
                <span className="absolute right-0 bottom-0 left-0 h-[2.5px] bg-[#C8A96A]" />
              )}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'drink'}
              onClick={() => {
                setActiveTab('drink');
                setSelectedCategoryId(null);
              }}
              className={`relative py-3.5 text-center text-sm font-extrabold tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#DFC286] sm:text-base ${
                activeTab === 'drink'
                  ? 'text-[#DFC286]'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <span>{ui.drinkTab}</span>
              {activeTab === 'drink' && (
                <span className="absolute right-0 bottom-0 left-0 h-[2.5px] bg-[#C8A96A]" />
              )}
            </button>
          </div>

          {/* Sub-Bar: When inside a category, show [← Catégories] + Full-Width Category Pills */}
          {!showCategoryPhotoGrid && (
            <div className="flex items-center gap-2 px-3 py-2.5 sm:px-6">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryId(null);
                  setSearchQuery('');
                }}
                className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-xl border border-[#C8A96A]/50 bg-[#0C1524] px-3 text-xs font-bold text-[#DFC286] transition-colors hover:bg-[#C8A96A] hover:text-[#070D17] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC286]"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{ui.backToCategories}</span>
              </button>

              <div className="no-scrollbar flex flex-1 items-center gap-1.5 overflow-x-auto">
                {orderedCategories.map((cat) => {
                  const isActive = selectedCategoryId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`h-9 shrink-0 rounded-xl px-3.5 text-xs font-bold tracking-wide uppercase transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC286] ${
                        isActive
                          ? 'bg-[#C8A96A] text-[#070D17] shadow-sm'
                          : 'border border-white/10 bg-[#0C1524]/70 text-white/80 hover:border-white/25 hover:text-white'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
        {/* Search Input + View Mode Toggle (Categories Photo Grid vs. Full List) */}
        <div className="mb-6 flex items-center gap-2.5">
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#C8A96A]"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              aria-label={labels.searchPlaceholder}
              className="h-11 w-full rounded-xl border border-white/15 bg-[#0C1524] pr-9 pl-10 text-sm text-white placeholder:text-white/60 focus:border-[#C8A96A] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label={labels.clearFilters}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-lg p-1 text-white/75 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC286]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              setSelectedCategoryId((prev) => (prev === null ? 'ALL' : null))
            }
            className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/15 bg-[#0C1524] px-3.5 text-xs font-bold text-white/90 transition-colors hover:border-[#C8A96A] hover:text-[#DFC286] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC286]"
          >
            {showCategoryPhotoGrid ? (
              <>
                <List className="h-4 w-4 text-[#C8A96A]" aria-hidden="true" />
                <span>{ui.allItemsView}</span>
              </>
            ) : (
              <>
                <LayoutGrid className="h-4 w-4 text-[#C8A96A]" aria-hidden="true" />
                <span>{ui.categoriesView}</span>
              </>
            )}
          </button>
        </div>

        {/* VIEW 1: VISUAL CATEGORY PHOTO CARDS GRID */}
        {showCategoryPhotoGrid ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {orderedCategories.map((cat, idx) => {
              const coverImg =
                CATEGORY_COVER_IMAGES[cat.id] ||
                '/images/catalog/seafood-boil-1.jpg';
              const count = itemCountByCategory.get(cat.id) ?? 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0C1524] text-center shadow-xl transition-all hover:border-[#C8A96A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC286]"
                >
                  <Image
                    src={coverImg}
                    alt={cat.name}
                    fill
                    priority={idx < 2}
                    fetchPriority={idx < 2 ? 'high' : undefined}
                    loading={idx < 2 ? undefined : idx < 4 ? 'eager' : 'lazy'}
                    quality={74}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 340px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Dark atmospheric overlay so white uppercase title + arrow pop cleanly */}
                  <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />

                  <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
                    <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-wider uppercase text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-xl">
                      <span>{cat.name}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </h2>
                    {cat.subtitle && (
                      <p className="mt-1.5 max-w-[90%] text-xs font-medium leading-snug text-white/95 drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)] sm:text-sm">
                        {cat.subtitle}
                      </p>
                    )}
                    <span className="mt-2 rounded-full bg-black/70 px-3 py-0.5 text-[11px] font-semibold text-[#DFC286] backdrop-blur-sm">
                      {ui.itemsCount(count)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* VIEW 2: CATEGORY DISHES / DRINKS LIST */
          <div className="space-y-12">
            {isSearching && itemsByCategory.size === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#0C1524] p-8 text-center">
                <p className="text-sm font-medium text-white/80">
                  {labels.noResults}
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-4 inline-flex min-h-[40px] items-center justify-center rounded-xl border border-[#C8A96A]/50 bg-[#070D17] px-4 py-2 text-xs font-bold text-[#DFC286] transition-colors hover:bg-[#C8A96A] hover:text-[#070D17] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC286]"
                >
                  {labels.clearFilters}
                </button>
              </div>
            ) : (
              orderedCategories.map((cat) => {
                if (
                  !isSearching &&
                  selectedCategoryId !== null &&
                  selectedCategoryId !== 'ALL' &&
                  selectedCategoryId !== cat.id
                ) {
                  return null;
                }

                const catItems = itemsByCategory.get(cat.id);
                if (!catItems || catItems.length === 0) return null;

                return (
                  <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-32">
                    {/* Category Banner Header inside Detail View */}
                    <div className="relative mb-6 overflow-hidden rounded-2xl border border-[#C8A96A]/30 bg-[#0C1524] p-6 sm:p-8">
                      {CATEGORY_COVER_IMAGES[cat.id] && (
                        <Image
                          src={CATEGORY_COVER_IMAGES[cat.id]}
                          alt=""
                          fill
                          loading="lazy"
                          sizes="(max-width: 1024px) 100vw, 976px"
                          className="object-cover opacity-25"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#070D17] via-[#070D17]/80 to-transparent" />
                      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#C8A96A]">
                            PESCOBAR BRUXELLES • {activeTab === 'food' ? ui.foodTab : ui.drinkTab}
                          </p>
                          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                            {cat.name}
                          </h2>
                        </div>
                        <div className="flex items-center gap-3">
                          {cat.id === 'vins' && (
                            <div className="hidden items-center gap-2 rounded-xl border border-[#C8A96A]/35 bg-[#070D17]/90 px-3 py-1.5 sm:flex">
                              <div className="relative h-12 w-10 shrink-0">
                                <Image
                                  src="/images/aerosoli-wines-transparent.png"
                                  alt="Vin Aerosoli Murfatlar"
                                  fill
                                  loading="lazy"
                                  sizes="40px"
                                  className="object-contain"
                                />
                              </div>
                              <div className="text-[11px] leading-tight">
                                <p className="font-bold text-[#DFC286]">Aerosoli Murfatlar</p>
                                <p className="text-white/80">Alb & Rosé</p>
                              </div>
                            </div>
                          )}
                          <span className="rounded-full border border-[#C8A96A]/40 bg-[#070D17]/80 px-3.5 py-1 text-xs font-bold text-[#DFC286]">
                            {ui.itemsCount(catItems.length)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {catItems.map((item) => (
                        <MenuDishCard
                          key={item.id}
                          item={item}
                          locale={locale}
                          isExpanded={Boolean(expandedItems[item.id])}
                          onToggleExpand={() => toggleExpand(item.id)}
                          onSelect={(imageUrl) =>
                            setModalItem({
                              item,
                              imageUrl,
                              categoryName: cat.name,
                            })
                          }
                        />
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </div>
        )}

        {/* Bottom Collapsible EU Allergen Legend */}
        <div className="mt-10 overflow-hidden rounded-xl border border-white/10 bg-[#0C1524]">
          <button
            type="button"
            aria-expanded={showAllergenLegend}
            onClick={() => setShowAllergenLegend((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-semibold text-white/85 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#DFC286]"
          >
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4 text-[#C8A96A]" aria-hidden="true" />
              <span>{ui.allergenLegendTitle}</span>
            </span>
            {showAllergenLegend ? (
              <ChevronUp className="h-4 w-4 text-[#C8A96A]" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[#C8A96A]" aria-hidden="true" />
            )}
          </button>

          {showAllergenLegend && (
            <div className="grid grid-cols-2 gap-2.5 border-t border-white/10 bg-[#070D17] p-4 sm:grid-cols-3 md:grid-cols-4">
              {ALL_LEGEND_ALLERGENS.map((alg) => (
                <div
                  key={alg}
                  className="flex min-w-0 items-center gap-2.5 rounded-xl border border-white/10 bg-[#0C1524] px-3 py-2 text-xs font-medium text-white/90"
                >
                  <AllergenIcon allergen={alg} />
                  <span className="truncate">
                    {ALLERGEN_TRANSLATIONS[alg]?.[locale] ?? alg}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subtle Reservation Link at Bottom of Menu */}
        {!qrMode && (
          <>
            <OctopusDivider className="mt-8" />
            <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#C8A96A]/30 bg-[#0C1524] p-6 sm:flex-row">
              <div>
                <h2 className="text-base font-bold text-white sm:text-lg">
                  {labels.reservationTitle}
                </h2>
                <p className="text-xs text-white/75">
                  Rue Jourdan 18, 1060 Saint-Gilles • 12:00 – 23:00
                </p>
              </div>
              <Link
                href={`/${locale}/reservations`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#C8A96A] px-6 py-2.5 text-xs font-extrabold text-[#070D17] hover:bg-[#DFC286] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC286]"
              >
                {labels.reserveCta} →
              </Link>
            </div>
            <DeliveryCtaBar locale={locale} variant="card" />
          </>
        )}

        <p className="mt-6 text-center text-xs text-white/70">
          {labels.verifyPriceNotice}
        </p>
      </div>

      {/* Dish Detail & Allergens Lightbox Modal */}
      <MenuDishModal
        modalItem={modalItem}
        locale={locale}
        onClose={() => setModalItem(null)}
      />
    </div>
  );
}
