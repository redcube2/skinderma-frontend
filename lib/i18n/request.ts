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
 * middleware.ts sets `x-skinderma-locale` on every content request. When the
 * header is missing (e.g. a route the middleware matcher skips) we fall back to
 * the Slovak default, which is always safe.
 *
 * NOTE: calling headers() opts the caller into dynamic rendering. This is
 * intentional — the root layout needs the request locale for <html lang> and
 * for the localized <link rel="alternate"> cluster.
 */
export function getRequestLocale(): Locale {
  const value = headers().get(LOCALE_HEADER);
  return isLocale(value) ? value : defaultLocale;
}

/** The request pathname as seen by middleware (locale prefix included). */
export function getRequestPathname(): string {
  return headers().get(PATHNAME_HEADER) || "/";
}

/** Locale + locale-neutral segment for the current request. */
export function getRequestRoute(): { locale: Locale; segment: string } {
  const headerLocale = headers().get(LOCALE_HEADER);
  const parsed = parsePathname(getRequestPathname());
  return {
    locale: isLocale(headerLocale) ? headerLocale : parsed.locale,
    segment: parsed.segment,
  };
}

