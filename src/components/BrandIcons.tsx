import React from 'react';

export function PescobarFishLogo({ className = 'h-7 w-14' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 39C38 7 110 -1 164 25C194 40 223 43 252 29C225 49 193 49 161 34C108 9 39 16 6 39Z"
        fill="#E5DFD3"
      />
      <path
        d="M6 45C30 79 109 83 163 53C193 36 222 36 249 52C222 41 193 41 165 57C110 89 32 84 6 45Z"
        fill="#C9C0B0"
      />
      <ellipse
        cx="33"
        cy="36"
        rx="6.2"
        ry="5.5"
        transform="rotate(-14 33 36)"
        fill="#EFECE6"
      />
    </svg>
  );
}

export function AllergenIcon({
  allergen,
  showLabel = false,
  className = '',
}: {
  allergen: string;
  showLabel?: boolean;
  className?: string;
}) {
  const key = allergen.trim().toLowerCase();

  const renderSvg = () => {
    switch (key) {
      case 'gluten':
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 21V5" />
            <path d="M12 17c-2.5 0-4.5-1.5-4.5-4 2.5 0 4.5 1.5 4.5 4Z" />
            <path d="M12 17c2.5 0 4.5-1.5 4.5-4-2.5 0-4.5 1.5-4.5 4Z" />
            <path d="M12 12.5c-2.5 0-4.5-1.5-4.5-4 2.5 0 4.5 1.5 4.5 4Z" />
            <path d="M12 12.5c2.5 0 4.5-1.5 4.5-4-2.5 0-4.5 1.5-4.5 4Z" />
            <path d="M12 8c-2-1-3-2.8-2.5-5 2 1 3 2.8 2.5 5Z" />
            <path d="M12 8c2-1 3-2.8 2.5-5-2 1-3 2.8-2.5 5Z" />
          </svg>
        );

      case 'crustaceans':
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#F97316"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M17 8c0-2.8-2.5-5-6-5C6.5 3 4 6.2 4 10.5c0 4.5 3.2 7.5 7.5 7.5 2.5 0 4.5-1.2 4.5-3 0-1.5-1.3-2.5-3-2.5-1.5 0-2.5.8-2.5 2" />
            <path d="M17 8c2-.5 3.5-2 4-4" />
            <path d="M17 8c2 .5 3.5 1.8 4 3.5" />
            <path d="M7.5 7.5v5" />
            <path d="M10.5 6.5v5.5" />
            <path d="M10.5 18l-2 3m3.5-3l1 3" />
          </svg>
        );

      case 'fish':
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 12s4-6 10-6c4.5 0 7.5 3.5 10 6-2.5 2.5-5.5 6-10 6-6 0-10-6-10-6Z" />
            <path d="M18 12l4-4v8l-4-4Z" />
            <circle cx="7.5" cy="11" r="1" fill="#93C5FD" />
            <path d="M11 9.5c-.8 1.5-.8 3.5 0 5" />
          </svg>
        );

      case 'soya':
      case 'soybeans':
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#4ADE80"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 19c4.5 1 10.5-2 13.5-7.5S20 3.5 18 3c-4.5-1-10.5 2-13.5 7.5S3 18.5 5 19Z" />
            <circle cx="8.5" cy="14.5" r="1.6" />
            <circle cx="12" cy="11.2" r="1.6" />
            <circle cx="15.3" cy="7.8" r="1.5" />
          </svg>
        );

      case 'celery':
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#22C55E"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 21v-9c0-2-1.5-3.5-3-4.5" />
            <path d="M14 21v-9c0-2 1.5-3.5 3-4.5" />
            <path d="M12 21V8" />
            <path d="M12 8c-2-2.5-1-5 0-5s2 2.5 0 5Z" />
            <path d="M7 7.5C5 6.5 4.5 4.5 6 3.5c1.5-1 3 .5 3 3" />
            <path d="M17 7.5c2-1 2.5-3 1-4-1.5-1-3 .5-3 3" />
          </svg>
        );

      case 'molluscs':
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#F43F5E"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 20c0-5 2-10 6-13 3-2.2 6.5-1.5 7.5 1 .8 2-.5 4.5-2.8 4.5-1.8 0-2.7-1.4-2.2-2.8" />
            <path d="M11 20c.5-3.5 2-6.5 4.5-8" />
            <circle cx="7.5" cy="15.5" r="0.9" fill="#F43F5E" />
            <circle cx="9" cy="12" r="0.9" fill="#F43F5E" />
            <circle cx="11.5" cy="9.2" r="0.9" fill="#F43F5E" />
          </svg>
        );

      case 'milk':
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 3h6" />
            <path d="M10 3v3l-2.5 3.5v9.5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V9.5L14 6V3" />
            <path d="M7.5 13.5c1.5-1 3-1 4.5 0s3 1 4.5 0" />
          </svg>
        );

      case 'eggs':
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#FACC15"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3C8 3 5 8.5 5 14a7 7 0 0 0 14 0c0-5.5-3-11-7-11Z" />
            <circle cx="12" cy="14.5" r="2.5" />
          </svg>
        );

      case 'mustard':
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#EAB308"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2l1.5 4h-3L12 2Z" />
            <path d="M9.5 6h5l1.5 3v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9l1.5-3Z" />
            <path d="M8 13h8" />
            <path d="M8 16.5h8" />
          </svg>
        );

      case 'sesame':
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#D6D3D1"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 5c-1.5 1.8-1.5 4.2 0 5.5 1.5-1.3 1.5-3.7 0-5.5Z" />
            <path d="M16 5c-1.5 1.8-1.5 4.2 0 5.5 1.5-1.3 1.5-3.7 0-5.5Z" />
            <path d="M12 10c-1.5 1.8-1.5 4.2 0 5.5 1.5-1.3 1.5-3.7 0-5.5Z" />
            <path d="M7.5 14.5c-1.5 1.8-1.5 4.2 0 5.5 1.5-1.3 1.5-3.7 0-5.5Z" />
            <path d="M16.5 14.5c-1.5 1.8-1.5 4.2 0 5.5 1.5-1.3 1.5-3.7 0-5.5Z" />
          </svg>
        );

      case 'sulphites':
      case 'sulfites':
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#C084FC"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 3h8l-1 6a4 4 0 0 1-6 0L8 3Z" />
            <path d="M12 12v6" />
            <path d="M9 18h6" />
            <text
              x="12"
              y="22.5"
              textAnchor="middle"
              fill="#C084FC"
              stroke="none"
              fontSize="5.5"
              fontWeight="700"
            >
              SO₂
            </text>
          </svg>
        );

      default:
        return (
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="#C9B05F"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4.5" />
            <circle cx="12" cy="16" r="0.8" fill="#C9B05F" />
          </svg>
        );
    }
  };

  if (showLabel) {
    return (
      <span
        title={allergen}
        className={`inline-flex items-center gap-1.5 rounded-md border border-[#C9B05F]/25 bg-[#132238]/90 px-2 py-0.5 text-[11px] font-medium text-[#F4F1EA] ${className}`}
      >
        {renderSvg()}
        <span>{allergen}</span>
      </span>
    );
  }

  return (
    <span
      title={allergen}
      aria-label={allergen}
      className={`inline-flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-[#132238]/80 transition-transform hover:scale-110 ${className}`}
    >
      {renderSvg()}
    </span>
  );
}

export function CategoryIcon({
  categoryId,
  className = 'h-[18px] w-[18px]',
}: {
  categoryId: string;
  className?: string;
}) {
  const svgProps = {
    viewBox: '0 0 24 24',
    width: 18,
    height: 18,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true as const,
  };

  switch (categoryId) {
    case 'pescobar-seafood-boil':
      return (
        <svg {...svgProps}>
          <path d="M4 11h16v4a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6v-4Z" />
          <path d="M2 11h20" />
          <path d="M9 7c0-1.5 1.5-2.5 1.5-4" />
          <path d="M14.5 7c0-1.5 1.5-2.5 1.5-4" />
          <path d="M8 15c1.5-1.5 6.5-1.5 8 0" />
        </svg>
      );

    case 'business-lunch':
      return (
        <svg {...svgProps}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
          <path d="M12 11v3" />
        </svg>
      );

    case 'aperitifs':
      return (
        <svg {...svgProps}>
          <path d="M4 18h16" />
          <path d="M6 18a6 6 0 0 1 12 0" />
          <circle cx="12" cy="9" r="2.2" />
          <path d="M12 3v3.8" />
        </svg>
      );

    case 'delices-marins':
      return (
        <svg {...svgProps}>
          <path d="M12 20c5 0 9-4 9-9 0-3.5-2-6.5-4.5-7.5L12 11 7.5 3.5C5 4.5 3 7.5 3 11c0 5 4 9 9 9Z" />
          <path d="M12 20V11" />
          <path d="M8 18.5L12 11l4 7.5" />
        </svg>
      );

    case 'soupes':
      return (
        <svg {...svgProps}>
          <path d="M4 12h16a8 8 0 0 1-16 0Z" />
          <path d="M7 20h10" />
          <path d="M9 8c0-1.2 1-2 1-3.2" />
          <path d="M14 8c0-1.2 1-2 1-3.2" />
          <path d="M16 10l4-4" />
        </svg>
      );

    case 'cuisine-avec-talent':
      return (
        <svg {...svgProps}>
          <path d="M6 14h12v5H6z" />
          <path d="M6 14c-2 0-3.5-1.5-3.5-3.5S4 7 6 7c.5-2.2 2.5-3.8 5-3.8s4.5 1.6 5 3.8c2 0 3.5 1.5 3.5 3.5S18 14 16 14" />
          <path d="M9 19v2m6-2v2" />
        </svg>
      );

    case 'viande':
      return (
        <svg {...svgProps}>
          <path d="M15.5 4C11 4 5 7.5 5 13.5 5 17.5 8 20 12 20c5.5 0 8-3.5 8-8 0-4.5-1.5-8-4.5-8Z" />
          <circle cx="13.5" cy="11.5" r="2.5" />
          <path d="M8.5 15.5c1 1 2.5 1.5 4 1" />
        </svg>
      );

    case 'pates':
      return (
        <svg {...svgProps}>
          <path d="M4 15h16a6 6 0 0 1-6 5h-4a6 6 0 0 1-6-5Z" />
          <path d="M7 11c2-2 8-2 10 0" />
          <path d="M8 13c2-1.5 6-1.5 8 0" />
          <path d="M12 3v6m-2.5-6v5m5-5v5" />
        </svg>
      );

    case 'la-pieuvre-de-pescobar':
      return (
        <svg {...svgProps}>
          <path d="M8 10a4 4 0 1 1 8 0c0 2-1 3.5-1 3.5H9S8 12 8 10Z" />
          <path d="M9 13.5c-1.5 2-4 2.5-5 1.5-.8-.8-.2-2.2 1-2" />
          <path d="M10.5 13.5c-.5 3-2 5.5-3.5 6.5" />
          <path d="M13.5 13.5c.5 3 2 5.5 3.5 6.5" />
          <path d="M15 13.5c1.5 2 4 2.5 5 1.5.8-.8.2-2.2-1-2" />
        </svg>
      );

    case 'specialites':
      return (
        <svg {...svgProps}>
          <path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.4 6.7 19.1l1-5.8-4.2-4.1 5.9-.9L12 3Z" />
        </svg>
      );

    case 'poisson':
      return (
        <svg {...svgProps}>
          <path d="M2 12s4-6 10-6c4.5 0 7.5 3.5 10 6-2.5 2.5-5.5 6-10 6-6 0-10-6-10-6Z" />
          <path d="M18 12l4-4v8l-4-4Z" />
          <circle cx="7.5" cy="11" r="1" fill="currentColor" />
        </svg>
      );

    case 'plateaux':
      return (
        <svg {...svgProps}>
          <path d="M3 19h18" />
          <path d="M5 13h14" />
          <path d="M7 7h10" />
          <path d="M12 4v17" />
          <path d="M8 21h8" />
        </svg>
      );

    case 'garniture':
      return (
        <svg {...svgProps}>
          <path d="M4 14h16a7 7 0 0 1-7 6h-2a7 7 0 0 1-7-6Z" />
          <path d="M8 14c0-3 2.5-5.5 5.5-5.5 0 3-2.5 5.5-5.5 5.5Z" />
          <path d="M12 14c1-2.5 3.5-4 6-3.5-.5 2.5-3 4-6 3.5Z" />
        </svg>
      );

    case 'sauces':
      return (
        <svg {...svgProps}>
          <path d="M3 11h13c2 0 4 1.5 4 3.5S18 18 16 18H8c-3 0-5-2.5-5-7Z" />
          <path d="M6 18l-1 3h12l-1-3" />
          <path d="M15 11l3-6" />
        </svg>
      );

    case 'dessert':
      return (
        <svg {...svgProps}>
          <path d="M4 18h16v2H4z" />
          <path d="M5 12l14-4v10H5V12Z" />
          <path d="M5 15h14" />
          <circle cx="12" cy="6" r="1.8" />
        </svg>
      );

    case 'cafe-boissons-chaudes':
      return (
        <svg {...svgProps}>
          <path d="M17 8h1a3 3 0 0 1 0 6h-1" />
          <path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" />
          <path d="M3 21h15" />
          <path d="M8 5c0-1 .8-1.5.8-2.5M12 5c0-1 .8-1.5.8-2.5" />
        </svg>
      );

    case 'boissons-gazeuses':
      return (
        <svg {...svgProps}>
          <path d="M7 7h10l-1.2 13H8.2L7 7Z" />
          <path d="M13 7l1.5-4H18" />
          <circle cx="10.5" cy="13" r="0.9" fill="currentColor" />
          <circle cx="13.5" cy="15.5" r="0.9" fill="currentColor" />
          <circle cx="11.5" cy="17" r="0.8" fill="currentColor" />
        </svg>
      );

    case 'boissons-naturelles':
      return (
        <svg {...svgProps}>
          <path d="M7 8h10l-1 12H8L7 8Z" />
          <path d="M17 8a3.5 3.5 0 1 0-3-5" />
          <path d="M9 13h6" />
        </svg>
      );

    case 'cocktails':
      return (
        <svg {...svgProps}>
          <path d="M5 4h14l-7 8-7-8Z" />
          <path d="M12 12v8" />
          <path d="M8 20h8" />
          <path d="M14 4l3-2" />
        </svg>
      );

    case 'cocktails-sans-alcool':
      return (
        <svg {...svgProps}>
          <path d="M7 7h10l-1 13H8L7 7Z" />
          <path d="M6 7a3 3 0 1 1 3-3" />
          <path d="M14 7l2.5-4" />
          <path d="M8 12c2-1 6-1 8 0" />
        </svg>
      );

    case 'boissons-fortes':
      return (
        <svg {...svgProps}>
          <path d="M6 6h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 6Z" />
          <path d="M6.5 12h11" />
          <rect x="9" y="13.5" width="3" height="3" rx="0.5" />
          <rect x="12.5" y="14.5" width="2.8" height="2.8" rx="0.5" />
        </svg>
      );

    case 'gin-tonic':
      return (
        <svg {...svgProps}>
          <path d="M7 3h10l.5 5.5a5.5 5.5 0 0 1-11 0L7 3Z" />
          <path d="M12 14v7" />
          <path d="M8 21h8" />
          <circle cx="11" cy="8.5" r="1.5" />
          <path d="M13.5 7l2-2" />
        </svg>
      );

    case 'vins':
      return (
        <svg {...svgProps}>
          <path d="M8 3h8l1 6a5 5 0 0 1-10 0l1-6Z" />
          <path d="M7.2 8.5h9.6" />
          <path d="M12 14v7" />
          <path d="M8 21h8" />
        </svg>
      );

    case 'cocktails-petillants':
      return (
        <svg {...svgProps}>
          <path d="M9 3h6l-.8 9.5a2.2 2.2 0 0 1-4.4 0L9 3Z" />
          <path d="M12 14.5V21" />
          <path d="M9 21h6" />
          <circle cx="12" cy="7" r="0.8" fill="currentColor" />
          <circle cx="11.5" cy="10" r="0.8" fill="currentColor" />
        </svg>
      );

    case 'biere':
      return (
        <svg {...svgProps}>
          <path d="M6 8h10v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8Z" />
          <path d="M16 10h2.5a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H16" />
          <path d="M6 8c0-1.8 1.5-3 3.2-2.8C10 4 12 4 12.8 5.2 14.5 5 16 6.2 16 8" />
          <path d="M9.5 11.5v6m3-6v6" />
        </svg>
      );

    case 'mousseux':
      return (
        <svg {...svgProps}>
          <path d="M7 3h4l-.5 8a1.5 1.5 0 0 1-3 0L7 3Z" />
          <path d="M9 12.5V20m-2 0h4" />
          <path d="M14 4h4l-.5 8a1.5 1.5 0 0 1-3 0L14 4Z" />
          <path d="M16 13.5V21m-2 0h4" />
        </svg>
      );

    default:
      return (
        <svg {...svgProps}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
  }
}
