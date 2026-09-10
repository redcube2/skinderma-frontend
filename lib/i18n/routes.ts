import type { Locale } from "./config";
import { defaultLocale, locales } from "./config";

/**
 * Route registry for the localized content surface.
 *
 * `key` is a stable, locale-neutral identifier. `segment` is the canonical
 * URL path used by the Slovak default AND by the /cs and /hu subtrees — the
 * Next.js folders are named identically across locales (app/o-nas,
 * app/cs/o-nas, app/hu/o-nas), so the canonical slug does not change per
 * language. Localized vanity slugs (e.g. Hungarian "kapcsolat") are handled
 * as 301 aliases in middleware.ts, never as separate routes.
 */
export type RouteKey =
  | "home"
  | "about"
  | "contact"
  | "oSkinderme"
  | "cookies"
  | "partnership"
  | "blog";

export const ROUTE_SEGMENTS: Record<RouteKey, string> = {
  home: "/",
  about: "/o-nas",
  contact: "/kontakt",
  oSkinderme: "/o-skinderme",
  cookies: "/cookies",
  partnership: "/partnerstvo",
  blog: "/blog",
};

/** Segments that exist as real localized pages under app/cs and app/hu. */
export const LOCALIZED_SEGMENTS: string[] = Object.values(ROUTE_SEGMENTS);

/**
 * Localized vanity slugs that 301-redirect to the canonical localized route.
 * Keyed by locale, then by the incoming (locale-stripped) segment.
 * Only non-obvious localizations are listed; sk/cs largely share slugs.
 */
export const SLUG_ALIASES: Partial<Record<Locale, Record<string, string>>> = {
  cs: {
    "/o-nas": "/o-nas",
    "/kontakty": "/kontakt",
    "/novinky": "/blog",
    "/spoluprace": "/partnerstvo",
  },
  hu: {
    "/rolunk": "/o-nas",
    "/kapcsolat": "/kontakt",
    "/hirek": "/blog",
    "/blog": "/blog",
    "/partnerseg": "/partnerstvo",
    "/a-skindermarol": "/o-skinderme",
    "/sutik": "/cookies",
  },
};

/** Commerce / apex-owned segments that must never be locale-prefixed. */
export const COMMERCE_PREFIXES = [
  "/obchod",
  "/produkt",
  "/produkty",
  "/product-category",
  "/kategoria",
  "/kosik",
  "/pokladna",
  "/moj-ucet",
  "/objednavka-prijata",
  "/order-received",
  "/wp-content",
  "/wp-includes",
  "/wp-admin",
  "/wp-json",
  // legal documents live on the WP apex
  "/vseobecne-obchodne-podmienky",
  "/reklamacny-poriadok",
  "/reklamacny-poriadok",
  "/odstupenie",
  "/reklamacia",
  "/ochrana-osobnych-udajov",
  "/dodanie",
];

export function isCommerceSegment(segment: string): boolean {
  return COMMERCE_PREFIXES.some(
    (p) => segment === p || segment.startsWith(p + "/")
  );
}

export function resolveAlias(locale: Locale, segment: string): string | null {
  const table = SLUG_ALIASES[locale];
  if (!table) return null;
  const target = table[segment];
  if (!target || target === segment) return null;
  return target;
}

/**
 * Map an arbitrary locale-neutral segment onto the closest segment that exists
 * in every locale — used by the language switcher so switching language never
 * lands on a 404.
 *
 *  - "/blog/some-post"  -> "/blog"   (posts are Slovak-only, keep the listing)
 *  - "/o-nas"           -> "/o-nas"  (localized page exists everywhere)
 *  - "/nieco-nezname"   -> "/"       (fall back to the localized home page)
 */
export function switchableSegment(segment: string): string {
  if (segment === "/" || LOCALIZED_SEGMENTS.includes(segment)) return segment;
  if (segment.startsWith("/blog/")) return "/blog";
  return "/";
}

export { defaultLocale, locales };

