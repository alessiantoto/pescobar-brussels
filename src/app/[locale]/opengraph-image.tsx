import { ImageResponse } from 'next/og';
import { SITE_CONFIG, LOCALES, type Locale } from '@/config/site';
import { getDictionary } from '@/i18n/dictionaries';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const alt =
  'Pescobar Seafood Bruxelles — Seafood Boil, Poulpe Grillé & Plateaux (Avenue Louise)';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#142238',
          padding: '64px',
          color: '#FFFFFF',
          border: '3px solid rgba(201, 176, 95, 0.45)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
            paddingBottom: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 40,
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: '#C9B05F',
              }}
            >
              PESCOBAR SEAFOOD BRUXELLES
            </span>
            <span
              style={{
                fontSize: 16,
                letterSpacing: '0.24em',
                color: '#D5DFEE',
                marginTop: 4,
              }}
            >
              QUARTIER AVENUE LOUISE • SAINT-GILLES
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#C9B05F',
              color: '#0F1A2C',
              padding: '12px 24px',
              borderRadius: '14px',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: '0.08em',
            }}
          >
            {`${SITE_CONFIG.address.streetAddress.toUpperCase()} • 1060`}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              letterSpacing: '0.22em',
              color: '#C9B05F',
              textTransform: 'uppercase',
            }}
          >
            {dict.hero.kicker}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#FFFFFF',
            }}
          >
            {dict.hero.titleLine1}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 48,
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#C9B05F',
            }}
          >
            {dict.hero.titleAccent}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: '24px',
            fontSize: 20,
            color: '#D5DFEE',
          }}
        >
          <span>Business Lunch (12:00–15:00) • Plateaux jusqu’à 5 kg</span>
          <span style={{ color: '#C9B05F', fontWeight: 800 }}>
            pescobarseafoodbruxelles.be
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
