import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG, getAlternates, type Locale } from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.seo.cookies.title,
    description: dict.seo.cookies.description,
    alternates: getAlternates(locale, '/cookies'),
  };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#C9B05F]">
        E-PRIVACY & TRANSPARENCE TECHNIQUE • BELGIQUE
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
        {dict.footer.cookies}
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-4 text-sm leading-relaxed text-[#C8D4E6]">
        <div className="rounded-2xl border border-[#C8A96A]/25 bg-[#0C1524] p-7">
          <h2 className="font-display text-xl text-[#DFC286]">
            1. Cookie de Préférence Linguistique (NEXT_LOCALE)
          </h2>
          <p className="mt-2">
            Le site <strong className="text-white">{SITE_CONFIG.domain}</strong> utilise un
            cookie technique (<code>NEXT_LOCALE</code>) afin de mémoriser votre langue
            favorite (<code>fr</code>, <code>nl</code>, <code>en</code>, <code>ro</code>)
            après détection automatique de la langue de votre navigateur.
          </p>
        </div>
      </div>
    </section>
  );
}
