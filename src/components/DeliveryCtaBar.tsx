import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, ShoppingBag } from 'lucide-react';
import { SITE_CONFIG, type Locale } from '@/config/site';

export type DeliveryPlatformKey = 'uberEats' | 'deliveroo' | 'takeaway';

interface DeliveryCopy {
  badge: string;
  title: string;
  subtitle: string;
  compactLabel: string;
  moreLink: string;
}

const DELIVERY_COPY: Record<Locale, DeliveryCopy> = {
  fr: {
    badge: '12:00 – 22:30 • BRUXELLES',
    title: 'Livraison & Takeaway',
    subtitle:
      'Uber Eats, Deliveroo, Takeaway.com ou retrait au Rue Jourdan 18.',
    compactLabel: 'Livraison :',
    moreLink: 'Voir les options',
  },
  nl: {
    badge: '12:00 – 22:30 • BRUSSEL',
    title: 'Bezorging & Afhalen',
    subtitle:
      'Uber Eats, Deliveroo, Takeaway.com of afhalen in de Rue Jourdan 18.',
    compactLabel: 'Bezorging:',
    moreLink: 'Meer opties',
  },
  en: {
    badge: '12:00 – 22:30 • BRUSSELS',
    title: 'Delivery & Pickup',
    subtitle:
      'Uber Eats, Deliveroo, Takeaway.com or pickup at Rue Jourdan 18.',
    compactLabel: 'Delivery:',
    moreLink: 'All options',
  },
  ro: {
    badge: '12:00 – 22:30 • BRUXELLES',
    title: 'Livrare & Takeaway',
    subtitle:
      'Uber Eats, Deliveroo, Takeaway.com sau ridicare din Rue Jourdan 18.',
    compactLabel: 'Livrare:',
    moreLink: 'Toate opțiunile',
  },
};

export interface DeliveryPlatformMeta {
  key: DeliveryPlatformKey;
  label: string;
  shortLabel: string;
  href: string;
  accentHex: string;
  borderHover: string;
}

export const DELIVERY_PLATFORMS: DeliveryPlatformMeta[] = [
  {
    key: 'uberEats',
    label: 'Uber Eats',
    shortLabel: 'Uber Eats',
    href: SITE_CONFIG.delivery.uberEats,
    accentHex: '#06C167',
    borderHover: 'hover:border-[#06C167]/75 hover:bg-[#06C167]/10',
  },
  {
    key: 'deliveroo',
    label: 'Deliveroo',
    shortLabel: 'Deliveroo',
    href: SITE_CONFIG.delivery.deliveroo,
    accentHex: '#00CCBC',
    borderHover: 'hover:border-[#00CCBC]/75 hover:bg-[#00CCBC]/10',
  },
  {
    key: 'takeaway',
    label: 'Takeaway.com',
    shortLabel: 'Takeaway',
    href: SITE_CONFIG.delivery.takeaway,
    accentHex: '#FF8000',
    borderHover: 'hover:border-[#FF8000]/75 hover:bg-[#FF8000]/10',
  },
];

/**
 * Official brand vector emblems (Simple Icons canonical paths) for Uber Eats, Deliveroo, and Takeaway.com.
 */
export function DeliveryPlatformLogo({
  platform,
  size = 'sm',
}: {
  platform: DeliveryPlatformKey;
  size?: 'sm' | 'lg';
}) {
  const boxCls =
    size === 'lg' ? 'h-11 w-11 rounded-xl p-2' : 'h-7 w-7 rounded-lg p-1.5';

  if (platform === 'uberEats') {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center border border-[#06C167]/40 bg-[#0A1F14] ${boxCls}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="#06C167" className="h-full w-full">
          <path d="M0 2.8645v4.9972c0 1.8834 1.3315 3.1297 3.0835 3.1297a2.9652 2.9652 0 0 0 2.1502-.876v.7425H6.445V2.8645H5.223v4.9339c0 1.2642-.8696 2.1198-1.9954 2.122-1.1386-.0023-1.997-.834-1.997-2.122V2.8645zm7.3625 0v7.9934h1.163v-.7318a2.9915 2.9915 0 0 0 2.1177.876c1.714.048 3.1295-1.3283 3.1295-3.0429s-1.4155-3.091-3.1295-3.0429a2.9674 2.9674 0 0 0-2.107.876V2.8645zm9.8857 2.0561c-1.6752-.0074-3.0369 1.3492-3.0356 3.0245 0 1.7366 1.3732 3.0373 3.1537 3.0373a3.123 3.123 0 0 0 2.5578-1.2438l-.8495-.6177a2.0498 2.0498 0 0 1-1.7083.8585c-.9763.0126-1.8147-.6915-1.971-1.6553h4.818v-.379c0-1.734-1.254-3.0238-2.9638-3.0245zm6.1632.0667a1.5943 1.5943 0 0 0-1.376.7657v-.7186h-1.163v5.8235h1.1741V7.5465c0-.9023.5581-1.4847 1.3268-1.4847h.4949V4.9886c-.1576.0013-.3186-.0009-.4568-.0013zm-6.2034.944a1.844 1.844 0 0 1 1.8337 1.486H15.424a1.844 1.844 0 0 1 1.784-1.486zm-6.6589.0056c1.1223-.0084 2.0365.8992 2.0364 2.0215-.0026 1.1203-.914 2.0258-2.0343 2.021a2.0151 2.0151 0 0 1-1.4159-.5987A2.0152 2.0152 0 0 1 8.55 7.9592a2.0152 2.0152 0 0 1 .5838-1.422 2.0152 2.0152 0 0 1 1.4153-.6003zM0 12.9864v7.9716h5.7222v-1.3666H1.5458v-1.971h4.0647v-1.314H1.5458v-1.9556h4.1764v-1.3644zm14.5608.4097v1.6861h-1.1519v1.338h1.1545v3.143c0 .7927.5712 1.4209 1.6005 1.4209h1.6425L17.8 19.646h-1.1412c-.3482 0-.5714-.1509-.5714-.464v-2.7683H17.8v-1.3316h-1.7062v-1.686zm-5.2974 1.5275c-1.7348-.0103-3.141 1.4035-3.1214 3.1382.0196 1.7346 1.4575 3.1163 3.1915 3.0668a2.9915 2.9915 0 0 0 1.912-.6655v.532h1.5175v-5.9129h-1.509v.5257a3.0047 3.0047 0 0 0-1.9205-.6835c-.0244-.0007-.0492-.0006-.0701-.0008zm11.771.0077c-1.5855 0-2.7002.6437-2.7002 1.8854 0 .8607.6132 1.4213 1.936 1.695l1.4478.3286c.5694.1095.7224.2585.7224.4906 0 .3701-.438.6022-1.1279.6022-.876 0-1.3774-.1907-1.5723-.8477h-1.533c.219 1.2307 1.1563 2.05 3.0484 2.05h.0022c1.752 0 2.7422-.819 2.7422-1.9534 0-.8059-.5847-1.4084-1.8089-1.6668l-1.2943-.2605c-.7511-.1358-.988-.2738-.988-.5454 0-.357.3616-.5757 1.0295-.5757.7227 0 1.2527.1925 1.406.8473h1.5175c-.0854-1.2286-.9899-2.0497-2.8273-2.0497zM9.467 16.1815c1.0092.0096 1.8188.8369 1.8067 1.8461.0014 1.0046-.8198 1.816-1.8243 1.8025-1.0075-.0048-1.8203-.8256-1.8155-1.833.0048-1.0076.8255-1.8204 1.833-1.8156z" />
        </svg>
      </span>
    );
  }

  if (platform === 'deliveroo') {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center border border-[#00CCBC]/40 bg-[#082120] ${boxCls}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" fill="#00CCBC" className="h-full w-full">
          <path d="M16.861 0l-1.127 10.584L13.81 1.66 7.777 2.926l1.924 8.922-8.695 1.822 1.535 7.127L17.832 24l3.498-7.744L22.994.636 16.861 0zM11.39 13.61a.755.755 0 01.322.066c.208.093.56.29.63.592.103.434.004.799-.312 1.084v.002c-.315.284-.732.258-1.174.113-.441-.145-.637-.672-.47-1.309.124-.473.71-.544 1.004-.549zm4.142.548c.447-.012.832.186 1.05.543.217.357.107.75-.122 1.143h-.002c-.229.392-.83.445-1.422.16-.399-.193-.397-.684-.353-.983a.922.922 0 01.193-.447c.142-.177.381-.408.656-.416Z" />
        </svg>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center border border-[#FF8000]/45 bg-[#231507] ${boxCls}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="#FF8000" className="h-full w-full">
        <path d="M20.6138 7.1997c-.0019-.0024-.0716-.0708-.0867-.2003a37.1998 37.1998 0 0 0-.5677-4.0793.6637.6637 0 0 0-.575-.516l-1.9612-.2364c0 .0002-.0213-.0027-.0516 0a.4129.4129 0 0 0-.4129.4128v.6792c.0071.0337-.0345.0156-.0412.0186A27.5178 27.5178 0 0 0 12.9723.2931c-.366-.245-.7355-.293-.9692-.293-.5918-.0016-.9527.293-.9693.293C4.277 4.4686.559 11.243.4155 11.6146c-.1799.3807.0325.8309.4407.9341l1.9457.3747a.6668.6668 0 0 1 .4862.5688c.0155.3437.384 8.0161.8454 10.0062.0076.0609.1743.4985.6482.4986h.0145c1.1318-.0299 2.2639-.0485 3.396-.063a.2198.2198 0 0 0 .2178-.2188c0-.1794-.0283-.0597-.2312-3.9565a.4129.4129 0 0 0-.2024-.323 2.0985 2.0985 0 0 1-1.0208-1.695c-.2262-5.8941.0116-8.2329-.0072-8.2329.0112-.528.8097-.5116.7824.0465-.11 1.8084-.0902 3.6209-.0702 5.4315.0106.6197.9396.6032.929-.0165-.0351-1.9045-.0248-3.8347.0733-5.4615.0065-.5085.7941-.529.7824.0465-.1067 1.7985-.0933 3.601-.0702 5.4016.0097.6192.9387.6048.929-.0145.011.011-.0846-2.8339.0733-5.4346.0112-.528.7824-.5194.7824.0464-.1515 2.6902-.0805 5.386 0 8.0771a2.0975 2.0975 0 0 1-.9104 1.731.4046.4046 0 0 0-.1734.3045s-.0475.4036.13 2.3576c.0542.5713.116 1.1418.1766 1.7125a.2064.2064 0 0 0 .2064.1796 468.6068 468.6068 0 0 1 4.0556.0093.2064.2064 0 0 0 .2064-.1817c.256-2.3421.3159-3.6582.3159-3.6582a.2323.2323 0 0 0-.2065-.225l-1.3419-.1848c.0058.0119-.4402-.0659-.4005-.5347.5357-7.8107 3.109-10.4398 3.109-10.4398a.8257.8257 0 0 1 .125-.1032c.2186-.1583.528-.0676.6265.1837a.8132.8132 0 0 1 .033.188c.222 2.4535.1136 6.6298-.0237 9.8875-.1167 2.7653-.258 4.936-.258 4.936 0 .089.072.161.161.161.7425.0117 1.485.0293 2.2275.0465a.671.671 0 0 0 .6482-.4986c.4614-1.99.8258-9.6625.8454-10.0062a.6647.6647 0 0 1 .4862-.5688l1.9457-.3747c.4082-.1032.6206-.5534.4407-.9341-.0355-.0956-.918-1.8515-2.9707-4.418z" />
      </svg>
    </span>
  );
}

interface DeliveryCtaBarProps {
  locale: Locale;
  variant?: 'card' | 'compact';
}

/**
 * Sleek non-repetitive delivery bar featuring real platform brand marks
 * (Uber Eats, Deliveroo, Takeaway.com) with crisp mobile/desktop grid symmetry.
 */
export function DeliveryCtaBar({
  locale,
  variant = 'card',
}: DeliveryCtaBarProps) {
  const c = DELIVERY_COPY[locale] ?? DELIVERY_COPY.fr;

  if (variant === 'compact') {
    return (
      <div className="border-b border-white/10 bg-[#0A1220] py-2.5">
        <div className="relative z-20 mx-auto flex max-w-7xl flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-bold text-[#DFC286]">
              <ShoppingBag className="h-3.5 w-3.5 shrink-0 text-[#C8A96A]" />
              <span>{c.compactLabel}</span>
            </span>
            <Link
              href={`/${locale}/delivery`}
              className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] font-bold text-[#C8A96A] transition-colors hover:text-white sm:hidden"
            >
              <span>{c.moreLink}</span>
              <ArrowRight className="h-3 w-3 shrink-0" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
            {DELIVERY_PLATFORMS.map((p) => (
              <a
                key={p.key}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative z-20 inline-flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-white/15 bg-[#070D17] px-1.5 py-2 text-[11px] font-bold text-white transition-colors sm:flex-row sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs ${p.borderHover}`}
              >
                <DeliveryPlatformLogo platform={p.key} size="sm" />
                <span className="whitespace-nowrap">{p.shortLabel}</span>
                <ExternalLink className="hidden h-3 w-3 shrink-0 opacity-60 sm:inline" />
              </a>
            ))}
            <Link
              href={`/${locale}/delivery`}
              className="hidden shrink-0 items-center gap-1 whitespace-nowrap pl-2 text-xs font-bold text-[#DFC286] transition-colors hover:text-white sm:inline-flex"
            >
              <span>{c.moreLink}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-20 mt-4 rounded-2xl border border-[#C8A96A]/25 bg-[#070D17]/85 p-4 sm:px-6 sm:py-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 lg:justify-start lg:gap-3">
            <p className="whitespace-nowrap text-[10px] font-bold tracking-[0.12em] uppercase text-[#C8A96A] sm:text-[11px] sm:tracking-[0.18em]">
              {c.badge}
            </p>
            <Link
              href={`/${locale}/delivery`}
              className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[11px] font-bold text-[#DFC286] transition-colors hover:text-white lg:hidden"
            >
              <span>{c.moreLink}</span>
              <ArrowRight className="h-3 w-3 shrink-0" />
            </Link>
          </div>
          <h3 className="mt-1 text-base font-extrabold text-white sm:text-lg">
            {c.title}
          </h3>
          <p className="mt-0.5 text-xs text-white/70 sm:text-sm">
            {c.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-2.5">
            {DELIVERY_PLATFORMS.map((p) => (
              <a
                key={p.key}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative z-20 inline-flex min-h-[46px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-[#0C1524] px-1.5 py-2.5 text-[11px] font-extrabold text-white transition-colors sm:flex-row sm:gap-2 sm:px-3.5 sm:py-2 sm:text-xs ${p.borderHover}`}
              >
                <DeliveryPlatformLogo platform={p.key} size="sm" />
                <span className="whitespace-nowrap">{p.shortLabel}</span>
                <ExternalLink className="hidden h-3.5 w-3.5 shrink-0 opacity-60 sm:inline" />
              </a>
            ))}
          </div>

          <Link
            href={`/${locale}/delivery`}
            className="relative z-20 hidden min-h-[46px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-[#C8A96A]/35 px-4 text-xs font-bold text-[#DFC286] transition-colors hover:border-[#C8A96A] hover:text-white lg:inline-flex"
          >
            <span>{c.moreLink}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
