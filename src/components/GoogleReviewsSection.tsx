'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SITE_CONFIG, type Locale } from '@/config/site';
import { GOOGLE_REVIEWS, REVIEWS_SECTION_COPY } from '@/data/reviews';

const REVIEWS_PER_PAGE = 3;

const PAGINATION_ARIA: Record<
  Locale,
  { prev: string; next: string; page: (p: number, t: number) => string }
> = {
  fr: {
    prev: 'Avis précédents',
    next: 'Avis suivants',
    page: (p, t) => `${p} / ${t}`,
  },
  nl: {
    prev: 'Vorige reviews',
    next: 'Volgende reviews',
    page: (p, t) => `${p} / ${t}`,
  },
  en: {
    prev: 'Previous reviews',
    next: 'Next reviews',
    page: (p, t) => `${p} / ${t}`,
  },
  ro: {
    prev: 'Recenziile anterioare',
    next: 'Recenziile următoare',
    page: (p, t) => `${p} / ${t}`,
  },
};

function GoogleGLogo({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
      />
    </svg>
  );
}

export function GoogleReviewsSection({ locale }: { locale: Locale }) {
  const copy = REVIEWS_SECTION_COPY[locale] ?? REVIEWS_SECTION_COPY.fr;
  const navCopy = PAGINATION_ARIA[locale] ?? PAGINATION_ARIA.fr;

  const sectionRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(GOOGLE_REVIEWS.length / REVIEWS_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const visibleReviews = GOOGLE_REVIEWS.slice(
    safePage * REVIEWS_PER_PAGE,
    (safePage + 1) * REVIEWS_PER_PAGE
  );

  const goToPage = (nextPage: number) => {
    const clamped = Math.max(0, Math.min(totalPages - 1, nextPage));
    setPage(clamped);
    // Scroll smoothly back to the top of the reviews section (accounting for sticky navbar)
    if (sectionRef.current) {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      sectionRef.current.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="google-reviews-heading"
      className="scroll-mt-16 border-b border-white/10 bg-[#070D17] py-14 sm:scroll-mt-20 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Clean Editorial Header */}
        <div className="mb-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#C8A96A]">
            <GoogleGLogo className="h-4 w-4 shrink-0" />
            <span>{copy.kicker}</span>
          </div>
          <h2
            id="google-reviews-heading"
            className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
          >
            {copy.title}
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-[#C8D4E6]">
            {copy.subtitle}
          </p>
        </div>

        {/* 3 Cards at Once: 1 per row on Mobile, 3 across on Desktop */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {visibleReviews.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0C1524] shadow-xl transition-colors hover:border-[#C8A96A]/40"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#050911]">
                <Image
                  src={item.image}
                  alt={`${item.tag[locale]} — ${item.dish[locale]}`}
                  fill
                  loading="lazy"
                  quality={75}
                  sizes="(max-width: 767px) 92vw, 360px"
                  style={{ objectPosition: item.objectPosition }}
                  className="object-cover transition-transform duration-500 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#0C1524] to-transparent" />
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div
                      role="img"
                      aria-label={copy.starsAria}
                      className="flex items-center gap-0.5"
                    >
                      {[0, 1, 2, 3, 4].map((s) => (
                        <Star
                          key={s}
                          className="h-3.5 w-3.5 fill-[#C8A96A] text-[#C8A96A]"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#C8A96A]">
                      {item.tag[locale]}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-base font-extrabold tracking-tight text-white">
                    {item.highlight[locale]}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#D8E2F0]">
                    &ldquo;{item.quote[locale]}&rdquo;
                  </p>
                </div>

                <p className="mt-4 border-t border-white/10 pt-3 text-xs font-medium text-white/70">
                  {item.dish[locale]}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Controls + Single Read All on Google CTA below */}
        <div className="mt-8 flex flex-col items-center gap-5">
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 0}
                aria-label={navCopy.prev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0C1524] text-white transition-colors hover:border-[#C8A96A] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-0.5 rounded-xl border border-white/10 bg-[#0C1524] px-2 py-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goToPage(idx)}
                    aria-label={navCopy.page(idx + 1, totalPages)}
                    className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg px-1"
                  >
                    <span
                      className={`h-2 rounded-full transition-all ${
                        idx === safePage
                          ? 'w-5 bg-[#C8A96A]'
                          : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-1 pr-1.5 text-xs font-bold tabular-nums text-[#DFC286]">
                  {navCopy.page(safePage + 1, totalPages)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage >= totalPages - 1}
                aria-label={navCopy.next}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0C1524] text-white transition-colors hover:border-[#C8A96A] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          <a
            href={SITE_CONFIG.address.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#C8A96A] px-6 text-sm font-extrabold text-[#070D17] shadow-lg transition-colors hover:bg-[#DFC286] sm:w-auto"
          >
            <GoogleGLogo className="h-4 w-4 shrink-0" />
            <span>{copy.readAllCta}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
