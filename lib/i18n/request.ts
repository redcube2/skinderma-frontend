import { headers } from "next/headers";
import {
  defaultLocale,
  isLocale,
  LOCALE_HEADER,
  PATHNAME_HEADER,
  parsePathname,
  type Locale,
} from "./config";

/**
 * Resolve the active locale for the current request.
 *
 * proxy.ts (the Next.js 16 rename of middleware.ts) sets `x-skinderma-locale`
 * on every content request. When the header is missing (e.g. a route the
 * matcher skips) we fall back to
 * the Slovak default, which is always safe.
 *
 * NOTE: calling headers() opts the caller into dynamic rendering. This is
 * intentional — the root layout needs the request locale for <html lang> and
 * for the localized <link rel="alternate"> cluster.
 *
 * headers() is async as of Next.js 15 (Dynamic APIs); every caller must await
 * these.
 */
export async function getRequestLocale(): Promise<Locale> {
  const value = (await headers()).get(LOCALE_HEADER);
  return isLocale(value) ? value : defaultLocale;
}

/** The request pathname as seen by middleware (locale prefix included). */
export async function getRequestPathname(): Promise<string> {
  return (await headers()).get(PATHNAME_HEADER) || "/";
}

/** Locale + locale-neutral segment for the current request. */
export async function getRequestRoute(): Promise<{ locale: Locale; segment: string }> {
  const h = await headers();
  const headerLocale = h.get(LOCALE_HEADER);
  const parsed = parsePathname(h.get(PATHNAME_HEADER) || "/");
  return {
    locale: isLocale(headerLocale) ? headerLocale : parsed.locale,
    segment: parsed.segment,
  };
}

