import { NextResponse, type NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  LOCALE_HEADER,
  PATHNAME_HEADER,
  defaultLocale,
  isLocale,
  parsePathname,
  type Locale,
} from "@/lib/i18n/config";
import {
  isCommerceSegment,
  resolveAlias,
} from "@/lib/i18n/routes";

/**
 * i18n middleware.
 *
 * Responsibilities:
 *  1. Tag every content request with the active locale + pathname so the root
 *     layout can render <html lang> and the localized <link rel="alternate">
 *     cluster (Server Components cannot read the URL directly).
 *  2. 301 localized vanity slugs (e.g. /hu/kapcsolat) to the canonical route.
 *  3. 301 accidental locale-prefixed commerce URLs (/cs/obchod) back to the
 *     unprefixed apex-owned path.
 *  4. On the bare "/" entry point only, honour a sticky locale cookie or an
 *     explicit cs/hu Accept-Language preference. Never auto-redirects deep
 *     links, so direct URLs and crawlers keep their exact target.
 */

const PARSE_ACCEPT_LANGUAGE = (header: string | null): Locale | null => {
  if (!header) return null;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .filter((x) => x.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (base === "cs" || base === "hu" || base === "sk") return base as Locale;
    // "en" and everything else -> no forced redirect (default market wins)
    if (base === "en") return null;
  }
  return null;
};

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const { locale, segment } = parsePathname(pathname);

  // ---- 2. localized vanity slug -> canonical (per active locale) ------------
  if (locale !== defaultLocale) {
    const aliasTarget = resolveAlias(locale, segment);
    if (aliasTarget) {
      const url = req.nextUrl.clone();
      url.pathname = "/" + locale + aliasTarget;
      return NextResponse.redirect(url, 301);
    }
    // ---- 3. locale-prefixed commerce path -> unprefixed apex path -----------
    if (isCommerceSegment(segment)) {
      const url = req.nextUrl.clone();
      url.pathname = segment;
      return NextResponse.redirect(url, 301);
    }
  }

  // ---- 4. sticky/browser locale on the bare entry point --------------------
  if (pathname === "/") {
    const cookieLocale = req.cookies.get(LOCALE_COOKIE)?.value;
    let target: Locale | null = null;

    if (isLocale(cookieLocale)) {
      target = cookieLocale;
    } else {
      target = PARSE_ACCEPT_LANGUAGE(req.headers.get("accept-language"));
    }

    if (target && target !== defaultLocale) {
      const url = req.nextUrl.clone();
      url.pathname = "/" + target;
      const redirect = NextResponse.redirect(url, 307);
      redirect.headers.set("Vary", "Accept-Language, Cookie");
      return redirect;
    }
  }

  // ---- 1. tag the request with locale + pathname --------------------------
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(PATHNAME_HEADER, pathname + (search || ""));

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  if (pathname === "/") res.headers.set("Vary", "Accept-Language, Cookie");
  return res;
}

export const config = {
  // Run on everything except Next internals, API routes and static files.
  matcher: ["/((?!api/|_next/|_vercel/|.*\\.[\\w]+$).*)"],
};

