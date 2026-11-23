'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Locale } from '@/config/site';
import { VIDEO_CLIPS, type VideoClipItem } from '@/data/videos';
import { OctopusCardCrest, OctopusCornerTentacles } from '@/components/OctopusAccents';

const CLIPS_PER_PAGE = 4;

const HEADER_COPY: Record<
  Locale,
  {
    kicker: string;
    title: string;
    prevLabel: string;
    nextLabel: string;
    pageLabel: (page: number, total: number) => string;
  }
> = {
  fr: {
    kicker: 'EN DIRECT DE LA CUISINE',
    title: 'Préparé minute, servi brûlant à table',
    prevLabel: 'Clips précédents',
    nextLabel: 'Clips suivants',
    pageLabel: (page, total) => `${page} / ${total}`,
  },
  nl: {
    kicker: 'VERS UIT ONZE KEUKEN',
    title: 'À la minute bereid, warm aan tafel geserveerd',
    prevLabel: 'Vorige video’s',
    nextLabel: 'Volgende video’s',
    pageLabel: (page, total) => `${page} / ${total}`,
  },
  en: {
    kicker: 'LIVE FROM THE KITCHEN',
    title: 'Cooked to order, served piping hot',
    prevLabel: 'Previous clips',
    nextLabel: 'Next clips',
    pageLabel: (page, total) => `${page} / ${total}`,
  },
  ro: {
    kicker: 'DIRECT DIN BUCĂTĂRIE',
    title: 'Gătit pe loc, servit fierbinte la masă',
    prevLabel: 'Clipurile anterioare',
    nextLabel: 'Clipurile următoare',
    pageLabel: (page, total) => `${page} / ${total}`,
  },
};

function AmbientClipCard({
  clip,
  locale,
  hasVideo,
}: {
  clip: VideoClipItem;
  locale: Locale;
  hasVideo: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enforce muted inline playback only when clip MP4 exists, card is visible, and reduced motion is off
  useEffect(() => {
    if (!hasVideo) return;
    const el = videoRef.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;

    const reducedMotionMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionMq.matches) {
      el.pause();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.play().catch(() => {
              // Poster image remains seamlessly visible if browser restricts autoplay or clip is loading
            });
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        el.pause();
      }
    };
    reducedMotionMq.addEventListener('change', handleMotionChange);

    return () => {
      observer.disconnect();
      reducedMotionMq.removeEventListener('change', handleMotionChange);
      el.pause();
    };
  }, [hasVideo, clip.video]);

  return (
    <article
      data-clip-card="true"
      className="group relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0C1524] shadow-xl"
    >
      <Image
        src={clip.poster}
        alt={clip.title[locale]}
        fill
        loading="lazy"
        sizes="(max-width: 640px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />

      {hasVideo && (
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          poster={clip.poster}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        >
          <source src={clip.video} type="video/mp4" />
        </video>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050911]/95 via-[#050911]/20 to-transparent" />

      <div className="pointer-events-none absolute right-3.5 bottom-3.5 left-3.5">
        <p className="text-sm font-extrabold leading-snug text-white sm:text-base">
          {clip.title[locale]}
        </p>
        <p className="mt-0.5 text-xs text-white/80">{clip.caption[locale]}</p>
      </div>
    </article>
  );
}

export function VideoClipsSection({
  locale,
  availableClipIds = [],
}: {
  locale: Locale;
  availableClipIds?: string[];
}) {
  const [page, setPage] = useState(0);
  const copy = HEADER_COPY[locale] || HEADER_COPY.fr;
  const availableSet = useMemo(() => new Set(availableClipIds), [availableClipIds]);

  const totalPages = Math.max(1, Math.ceil(VIDEO_CLIPS.length / CLIPS_PER_PAGE));
  const safePage = Math.min(page, totalPages - 1);
  const visibleClips = VIDEO_CLIPS.slice(
    safePage * CLIPS_PER_PAGE,
    (safePage + 1) * CLIPS_PER_PAGE
  );

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#070D17] py-12 sm:py-16">
      <OctopusCornerTentacles position="top-left" className="opacity-35" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Clean Editorial Section Header */}
        <div className="mb-8 text-center sm:mb-10">
          <OctopusCardCrest className="mb-2" />
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#C8A96A]">
            {copy.kicker}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
            {copy.title}
          </h2>
        </div>

        {/* 2x2 Grid on Mobile / 4-Col on Desktop of Silent Auto-Playing 9:16 Ambient Reels */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {visibleClips.map((clip) => (
            <AmbientClipCard
              key={clip.id}
              clip={clip}
              locale={locale}
              hasVideo={availableSet.has(clip.id)}
            />
          ))}
        </div>

        {/* Automatic Clean Pagination whenever > 4 Video Clips exist */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={safePage === 0}
              aria-label={copy.prevLabel}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0C1524] text-white transition-colors hover:border-[#C8A96A] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-0.5 rounded-xl border border-white/10 bg-[#0C1524] px-2 py-1">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPage(idx)}
                  aria-label={copy.pageLabel(idx + 1, totalPages)}
                  className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg px-1"
                >
                  <span
                    className={`h-2 rounded-full transition-all ${
                      idx === safePage
                        ? 'w-6 bg-[#C8A96A]'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-1 pr-1.5 text-xs font-bold tabular-nums text-[#DFC286]">
                {copy.pageLabel(safePage + 1, totalPages)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={safePage >= totalPages - 1}
              aria-label={copy.nextLabel}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#0C1524] text-white transition-colors hover:border-[#C8A96A] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
