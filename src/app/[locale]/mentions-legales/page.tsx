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
    title: dict.seo.legal.title,
    description: dict.seo.legal.description,
    alternates: getAlternates(locale, '/mentions-legales'),
  };
}

export default async function MentionsLegalesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#C9B05F]">
        BELGIQUE / BELGIË • CODE DE DROIT ÉCONOMIQUE (LIVRE XII)
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
        {dict.footer.mentionsLegales}
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-4 text-sm leading-relaxed text-[#C8D4E6]">
        <div className="rounded-2xl border border-[#C8A96A]/25 bg-[#0C1524] p-7">
          <h2 className="font-display text-xl text-[#DFC286]">
            1. Identification de la Société (BCE / KBO Belgique)
          </h2>
          <p className="mt-2 space-y-1">
            <strong className="text-white">Dénomination sociale :</strong> {SITE_CONFIG.legalName}
            <br />
            <strong className="text-white">Nom commercial :</strong> {SITE_CONFIG.name}
            <br />
            <strong className="text-white">Siège social :</strong> {SITE_CONFIG.registeredOffice}
            <br />
            <strong className="text-white">Unité d’établissement (Restaurant) :</strong>{' '}
            {SITE_CONFIG.address.full}
            <br />
            <strong className="text-white">Numéro d’entreprise (BCE / KBO) :</strong>{' '}
            {SITE_CONFIG.bceNumber}
            <br />
            <strong className="text-white">Numéro de TVA / BTW :</strong> {SITE_CONFIG.vatNumber}
            <br />
            <strong className="text-white">Registre des Personnes Morales :</strong>{' '}
            {SITE_CONFIG.rpmJurisdiction}
            <br />
            <strong className="text-white">Téléphone :</strong> {SITE_CONFIG.phone}
            <br />
            <strong className="text-white">E-mail :</strong> {SITE_CONFIG.email}
          </p>
        </div>

        <div className="rounded-2xl border border-[#C8A96A]/25 bg-[#0C1524] p-7">
          <h2 className="font-display text-xl text-[#DFC286]">
            2. Information Consommateur, Prix & Allergènes (AFSCA / FAVV)
          </h2>
          <p className="mt-2">
            Conformément au Règlement (UE) n° 1169/2011 et aux directives de l’AFSCA / FAVV
            (Agence fédérale pour la sécurité de la chaîne alimentaire), tous les prix
            affichés sur <strong className="text-white">{SITE_CONFIG.domain}</strong> sont
            indiqués en euros (€), TVA et service compris. Les 14 allergènes majeurs UE
            ainsi que les grammages nets par ingrédient sont détaillés sur notre carte
            interactive.
          </p>
        </div>
      </div>
    </section>
  );
}
