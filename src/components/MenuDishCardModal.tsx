'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, X, ZoomIn } from 'lucide-react';
import type { Locale } from '@/config/site';
import type { MenuItem } from '@/data/menu';
import { AllergenIcon } from '@/components/BrandIcons';
import {
  ALLERGEN_TRANSLATIONS,
  type DishCardItem,
  formatMenuPrice,
  getDishImage,
  getDishTranslation,
  hasAerosoliPairing,
  MENU_CARD_UI,
  normalizeAllergenKey,
  parseMenuDescription,
} from '@/lib/menuDisplay';

export interface ModalDishState {
  item: DishCardItem;
  imageUrl: string | null;
  categoryName: string;
}

export function MenuDishCard({
  item,
  locale,
  imageOverride,
  isExpanded,
  onToggleExpand,
  onSelect,
}: {
  item: DishCardItem;
  locale: Locale;
  imageOverride?: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSelect: (imageUrl: string | null) => void;
}) {
  const ui = MENU_CARD_UI[locale] ?? MENU_CARD_UI.fr;
  const t = getDishTranslation(item, locale);
  const dishImage = getDishImage(item, imageOverride);
  const isAerosoli = hasAerosoliPairing(item, locale);
  const isDrinkWineBottle = item.type === 'drink' && isAerosoli;
  const parsed = parseMenuDescription(t.description);
  const normalizedAllergens = Array.from(
    new Set(item.allergens.map(normalizeAllergenKey))
  );

  return (
    <article
      data-dish-card="true"
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0C1524] shadow-lg transition-all hover:border-[#C8A96A]/55 focus-within:border-[#C8A96A] focus-within:ring-2 focus-within:ring-[#C8A96A]/50"
    >
      <div>
        {/* Food photo banner vs. Aerosoli bottle showcase */}
        {dishImage && !isDrinkWineBottle && (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050911]">
            <Image
              src={dishImage}
              alt={t.name}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1524] via-transparent to-transparent opacity-70" />
            <span
              aria-hidden="true"
              className="absolute right-3 bottom-3 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/70 text-white backdrop-blur-md transition-colors group-hover:bg-[#C8A96A] group-hover:text-[#070D17]"
            >
              <ZoomIn className="h-4 w-4" />
            </span>
          </div>
        )}

        {isDrinkWineBottle && (
          <div className="flex items-center justify-between border-b border-[#C8A96A]/20 bg-gradient-to-r from-[#070D17] via-[#0F1B30] to-[#070D17] px-5 py-3">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#DFC286]">
              Murfatlar • Aerosoli D.O.C.
            </span>
            <div className="relative h-14 w-12 shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/aerosoli-wines-transparent.png"
                alt={t.name}
                fill
                loading="lazy"
                sizes="48px"
                className="object-contain drop-shadow-[0_4px_10px_rgba(200,169,106,0.28)]"
              />
            </div>
          </div>
        )}

        <div className="p-5">
          {/* Title & Luminous Gold Price */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-base font-extrabold leading-snug text-white sm:text-lg">
              <button
                type="button"
                onClick={() => onSelect(dishImage)}
                className="text-left transition-colors hover:text-[#DFC286] focus:outline-none after:absolute after:inset-0 after:z-0 after:cursor-pointer"
              >
                {t.name}
              </button>
            </h3>
            <span
              data-dish-price="true"
              className="shrink-0 whitespace-nowrap text-lg font-extrabold tabular-nums text-[#DFC286] sm:text-xl"
            >
              {formatMenuPrice(item, locale)}
            </span>
          </div>

          {/* Weight / Volume Pill + Combo Highlight + Sold Out Today */}
          {(item.weight ||
            (parsed.highlightBadge && !isAerosoli) ||
            ('isSoldOut' in item && item.isSoldOut)) && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {'isSoldOut' in item && item.isSoldOut && (
                <span className="rounded-full border border-rose-500/40 bg-rose-500/15 px-2.5 py-0.5 text-xs font-bold text-rose-300">
                  {locale === 'fr'
                    ? 'Épuisé aujourd’hui'
                    : locale === 'nl'
                      ? 'Vandaag uitverkocht'
                      : locale === 'ro'
                        ? 'Epuizat azi'
                        : 'Sold out today'}
                </span>
              )}
              {item.weight && (
                <span className="rounded-full border border-white/15 bg-[#070D17] px-2.5 py-0.5 text-xs font-semibold tabular-nums text-white/90">
                  {item.weight}
                </span>
              )}
              {parsed.highlightBadge && !isAerosoli && (
                <span className="rounded-full border border-[#C8A96A]/40 bg-[#C8A96A]/10 px-2.5 py-0.5 text-xs font-bold text-[#DFC286]">
                  {parsed.highlightBadge}
                </span>
              )}
            </div>
          )}

          {/* Bespoke Wine-Included Pairing Visual Strip for Food Platters */}
          {item.type === 'food' && isAerosoli && (
            <div
              data-aerosoli-strip="true"
              className="mt-3 flex items-center gap-3 rounded-xl border border-[#C8A96A]/40 bg-gradient-to-r from-[#C8A96A]/15 via-[#070D17] to-[#070D17] px-3 py-2"
            >
              <div className="relative h-12 w-10 shrink-0">
                <Image
                  src="/images/aerosoli-wines-transparent.png"
                  alt="Vin Aerosoli Murfatlar Alb și Rosé"
                  fill
                  loading="lazy"
                  sizes="40px"
                  className="object-contain drop-shadow-[0_2px_8px_rgba(223,194,134,0.35)]"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-extrabold text-[#DFC286]">
                  {ui.includedWineTitle}
                </p>
                <p className="truncate text-[11px] text-white/80">
                  {ui.includedWineDesc}
                </p>
              </div>
            </div>
          )}

          {/* Clean Ingredient Summary & Expandable Details */}
          {parsed.summary && (
            <div className="mt-3 text-xs leading-relaxed text-white/80 sm:text-sm">
              <p
                className={
                  parsed.hasExtraDetails && !isExpanded ? 'line-clamp-2' : ''
                }
              >
                {parsed.summary}
              </p>

              {isExpanded && t.nutrition && (
                <p className="mt-2 border-t border-white/10 pt-2 text-[11px] tabular-nums text-white/75">
                  {t.nutrition}
                </p>
              )}

              {(parsed.hasExtraDetails || t.nutrition) && (
                <button
                  type="button"
                  onClick={onToggleExpand}
                  className="relative z-10 mt-2 inline-flex items-center gap-1 rounded py-0.5 text-xs font-bold text-[#DFC286] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A96A]"
                >
                  <span>{isExpanded ? ui.hideDetails : ui.showDetails}</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Colorful EU Allergen Icons Row + Clear Tap-for-Details Hint */}
      <div
        data-dish-allergen-bar="true"
        className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 bg-[#070D17]/60 px-5 py-2.5"
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {normalizedAllergens.length > 0 ? (
            <>
              <span className="mr-0.5 text-[11px] font-medium text-white/75">
                {ui.allergenLabel}
              </span>
              {normalizedAllergens.map((alg) => {
                const label = ALLERGEN_TRANSLATIONS[alg]?.[locale] ?? alg;
                return (
                  <span
                    key={alg}
                    className="group/alg relative z-10 inline-flex items-center"
                  >
                    <AllergenIcon allergen={alg} />
                    <span className="pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-md border border-[#C8A96A]/40 bg-[#050911] px-2 py-0.5 text-[10px] font-semibold text-white opacity-0 shadow-md transition-opacity group-hover/alg:opacity-100">
                      {label}
                    </span>
                  </span>
                );
              })}
            </>
          ) : (
            <span className="text-[11px] text-white/70">
              {ui.noAllergensLabel}
            </span>
          )}
        </div>

        <span
          aria-hidden="true"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DFC286] transition-colors group-hover:text-white"
        >
          <span>{ui.tapForAllergens}</span>
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </article>
  );
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MenuDishModal({
  modalItem,
  locale,
  onClose,
}: {
  modalItem: ModalDishState | null;
  locale: Locale;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const isOpen = modalItem !== null;

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const rafId = window.requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
        ).filter((el) => el.offsetParent !== null);

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (
            document.activeElement === first ||
            !dialogRef.current.contains(document.activeElement)
          ) {
            e.preventDefault();
            last.focus();
          }
        } else if (
          document.activeElement === last ||
          !dialogRef.current.contains(document.activeElement)
        ) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [isOpen]);

  if (!modalItem) return null;

  const ui = MENU_CARD_UI[locale] ?? MENU_CARD_UI.fr;
  const modalTrans = getDishTranslation(modalItem.item, locale);
  const modalParsed = parseMenuDescription(modalTrans.description);
  const modalAllergens = Array.from(
    new Set(modalItem.item.allergens.map(normalizeAllergenKey))
  );
  const isAerosoli = hasAerosoliPairing(modalItem.item, locale);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-md"
      />
      <div
        ref={dialogRef}
        className="relative z-10 max-h-[88dvh] w-full max-w-xl overflow-y-auto rounded-2xl border border-[#C8A96A]/45 bg-[#0C1524] shadow-2xl"
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label={ui.closeModalBtn}
          className="sticky top-3 float-right z-20 m-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/75 text-white backdrop-blur-md transition-colors hover:bg-[#C8A96A] hover:text-[#070D17] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC286]"
        >
          <X className="h-5 w-5" />
        </button>

        {modalItem.imageUrl && (
          <div className="relative aspect-[16/10] w-full bg-[#050911]">
            <Image
              src={modalItem.imageUrl}
              alt={modalTrans.name}
              fill
              sizes="(max-width: 640px) 100vw, 576px"
              className={
                modalItem.imageUrl === '/images/aerosoli-wines-transparent.png'
                  ? 'object-contain p-4'
                  : 'object-cover'
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1524] via-transparent to-transparent opacity-60" />
          </div>
        )}

        <div className="clear-both space-y-5 p-5 sm:p-6">
          <div>
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#C8A96A]">
              {modalItem.categoryName}
            </span>

            <div className="mt-1 flex items-baseline justify-between gap-4">
              <h2
                id="dish-modal-title"
                className="text-xl font-extrabold leading-snug text-white sm:text-2xl"
              >
                {modalTrans.name}
              </h2>
              <span
                data-dish-price="true"
                className="shrink-0 whitespace-nowrap text-xl font-extrabold tabular-nums text-[#DFC286] sm:text-2xl"
              >
                {formatMenuPrice(modalItem.item, locale)}
              </span>
            </div>

            {(modalItem.item.weight ||
              (modalParsed.highlightBadge && !isAerosoli)) && (
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                {modalItem.item.weight && (
                  <span className="rounded-full border border-white/15 bg-[#070D17] px-3 py-1 text-xs font-semibold tabular-nums text-white/90">
                    {modalItem.item.weight}
                  </span>
                )}
                {modalParsed.highlightBadge && !isAerosoli && (
                  <span className="rounded-full border border-[#C8A96A]/45 bg-[#C8A96A]/15 px-3 py-1 text-xs font-bold text-[#DFC286]">
                    {modalParsed.highlightBadge}
                  </span>
                )}
              </div>
            )}
          </div>

          {modalItem.item.type === 'food' && isAerosoli && (
            <div className="flex items-center gap-4 rounded-xl border border-[#C8A96A]/45 bg-gradient-to-r from-[#C8A96A]/20 via-[#070D17] to-[#070D17] p-3.5 shadow-inner">
              <div className="relative h-20 w-16 shrink-0">
                <Image
                  src="/images/aerosoli-wines-transparent.png"
                  alt="Vin Aerosoli Murfatlar Alb și Rosé inclus"
                  fill
                  sizes="64px"
                  className="object-contain drop-shadow-[0_4px_12px_rgba(223,194,134,0.35)]"
                />
              </div>
              <div className="min-w-0">
                <span className="inline-block rounded-full border border-[#C8A96A]/50 bg-[#C8A96A] px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase text-[#070D17]">
                  {ui.includedWineTitle}
                </span>
                <p className="mt-1.5 text-xs leading-relaxed text-white/85">
                  {ui.includedWineDesc}
                </p>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-[#C8A96A]/30 bg-[#070D17] p-4">
            <p className="mb-2.5 text-[11px] font-bold tracking-[0.16em] uppercase text-[#C8A96A]">
              {ui.allergensTitle}
            </p>

            {modalAllergens.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {modalAllergens.map((alg) => (
                  <div
                    key={alg}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-[#0C1524] px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    <AllergenIcon allergen={alg} />
                    <span>{ALLERGEN_TRANSLATIONS[alg]?.[locale] ?? alg}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-medium text-white/75">
                {ui.noAllergensLabel}
              </p>
            )}
          </div>

          {(modalParsed.summary || modalTrans.description) && (
            <div>
              <p className="mb-1.5 text-[11px] font-bold tracking-[0.16em] uppercase text-[#C8A96A]">
                {ui.ingredientsTitle}
              </p>
              <p className="text-xs leading-relaxed text-white/85 sm:text-sm">
                {modalParsed.summary || modalTrans.description}
              </p>
            </div>
          )}

          {modalTrans.nutrition && (
            <div className="rounded-xl border border-white/10 bg-[#070D17]/75 px-4 py-3">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-white/75">
                {ui.nutritionTitle}
              </p>
              <p className="mt-1 text-xs tabular-nums text-white/90">
                {modalTrans.nutrition}
              </p>
            </div>
          )}

          <div className="flex flex-col justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
            <p className="text-[11px] leading-relaxed text-white/75">
              {ui.allergySafetyNote}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex min-h-[42px] shrink-0 items-center justify-center rounded-xl bg-[#C8A96A] px-5 py-2 text-xs font-extrabold uppercase tracking-wider text-[#070D17] transition-colors hover:bg-[#DFC286] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC286]"
            >
              {ui.closeModalBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive grid section reusing the exact Menu card + detail modal on dedicated landing pages.
 */
export function MenuDishSectionGrid({
  items,
  locale,
  categoryName,
  imageOverrides,
}: {
  items: MenuItem[];
  locale: Locale;
  categoryName: string;
  imageOverrides?: Record<string, string>;
}) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [modalItem, setModalItem] = useState<ModalDishState | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <MenuDishCard
            key={item.id}
            item={item}
            locale={locale}
            imageOverride={imageOverrides?.[item.id]}
            isExpanded={Boolean(expandedItems[item.id])}
            onToggleExpand={() =>
              setExpandedItems((prev) => ({
                ...prev,
                [item.id]: !prev[item.id],
              }))
            }
            onSelect={(imageUrl) =>
              setModalItem({
                item,
                imageUrl,
                categoryName,
              })
            }
          />
        ))}
      </div>

      <MenuDishModal
        modalItem={modalItem}
        locale={locale}
        onClose={() => setModalItem(null)}
      />
    </>
  );
}
