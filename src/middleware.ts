import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/config/site';

function isSupportedLocale(value: string | undefined): value is Locale {
  return Boolean(value && (LOCALES as readonly string[]).includes(value));
}

function detectLocaleFromHeader(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;

  const parsed = acceptLanguage
    .split(',')
    .map((part, index) => {
      const [rawTag, ...params] = part.trim().split(';');
      const tag = rawTag.trim().toLowerCase();
      let q = 1.0;
      for (const param of params) {
        const [k, v] = param.trim().split('=');
        if (k === 'q' && v) {
          const parsedQ = parseFloat(v);
          if (!Number.isNaN(parsedQ)) {
            q = parsedQ;
          }
        }
      }
      return { tag, q, index };
    })
    .filter((item) => item.tag.length > 0)
    .sort((a, b) => (b.q !== a.q ? b.q - a.q : a.index - b.index));

  for (const { tag } of parsed) {
    if (tag.startsWith('fr')) return 'fr';
    if (tag.startsWith('nl')) return 'nl';
    if (tag.startsWith('ro')) return 'ro';
    if (tag.startsWith('en')) return 'en';
  }

  return null;
}

function detectPreferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value?.toLowerCase();
  if (isSupportedLocale(cookieLocale)) {
    return cookieLocale;
  }

  const headerLocale = detectLocaleFromHeader(
    request.headers.get('accept-language')
  );
  if (headerLocale) {
    return headerLocale;
  }

  return DEFAULT_LOCALE;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/videos') ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/favicon.ico' ||
    pathname.includes('.')
  ) {
    const cleanHeaders = new Headers(request.headers);
    cleanHeaders.delete('x-pathname');
    return NextResponse.next({ request: { headers: cleanHeaders } });
  }

  // Redirect accidental localized admin paths (e.g. /fr/admin -> /admin)
  const localizedAdminMatch = pathname.match(/^\/(fr|nl|en|ro)(\/admin(?:\/.*)?)$/);
  if (localizedAdminMatch) {
    const url = request.nextUrl.clone();
    url.pathname = localizedAdminMatch[2];
    return NextResponse.redirect(url);
  }

  // Isolated Admin Console path — zero locale redirect, strict noindex + session refresh
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const cleanHeaders = new Headers(request.headers);
    cleanHeaders.set('x-pathname', pathname);

    let response = NextResponse.next({ request: { headers: cleanHeaders } });

    const hasSupabaseCookie = request.cookies
      .getAll()
      .some((c) => c.name.startsWith('sb-'));
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (
      hasSupabaseCookie &&
      supabaseUrl &&
      supabaseAnon &&
      !supabaseUrl.includes('placeholder')
    ) {
      const supabase = createServerClient(supabaseUrl, supabaseAnon, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({ request: { headers: cleanHeaders } });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      });
      await supabase.auth.getUser().catch(() => null);
    }

    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    response.headers.set('Cache-Control', 'private, no-store, max-age=0');
    return response;
  }

  const matchedLocale = LOCALES.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (matchedLocale) {
    const response = NextResponse.next();
    if (request.cookies.get('NEXT_LOCALE')?.value !== matchedLocale) {
      response.cookies.set('NEXT_LOCALE', matchedLocale, {
        path: '/',
        maxAge: 31536000,
        sameSite: 'lax',
      });
    }
    return response;
  }

  const detectedLocale = detectPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${detectedLocale}${pathname === '/' ? '' : pathname}`;

  const response = NextResponse.redirect(url);
  if (!request.cookies.get('NEXT_LOCALE')?.value) {
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax',
    });
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)'],
};
