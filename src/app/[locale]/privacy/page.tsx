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
    title: dict.seo.privacy.title,
    description: dict.seo.privacy.description,
    alternates: getAlternates(locale, '/privacy'),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#C9B05F]">
        RGPD / AVG • AUTORITÉ DE PROTECTION DES DONNÉES (APD / GBA BELGIQUE)
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
        {dict.footer.privacy}
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-4 text-sm leading-relaxed text-[#C8D4E6]">
        <div className="rounded-2xl border border-[#C8A96A]/25 bg-[#0C1524] p-7">
          <h2 className="font-display text-xl text-[#DFC286]">
            1. Responsable du Traitement
          </h2>
          <p className="mt-2">
            <strong className="text-white">{SITE_CONFIG.legalName}</strong> ({SITE_CONFIG.name}),{' '}
            {SITE_CONFIG.address.full} — {SITE_CONFIG.email} / {SITE_CONFIG.phone}.
          </p>
        </div>

        <div className="rounded-2xl border border-[#C8A96A]/25 bg-[#0C1524] p-7">
          <h2 className="font-display text-xl text-[#DFC286]">
            2. Vos Droits & Recours auprès de l’APD / GBA (Belgique)
          </h2>
          <p className="mt-2">
            Conformément au RGPD (UE 2016/679) et à la loi belge du 30 juillet 2018, vous
            disposez d’un droit d’accès, de rectification et d’effacement en écrivant à{' '}
            {SITE_CONFIG.email}. Autorité de contrôle :{' '}
            <strong className="text-white">Autorité de protection des données (APD / GBA)</strong>,
            Rue de la Presse 35, 1000 Bruxelles.
          </p>
        </div>
      </div>
    </section>
  );
}
