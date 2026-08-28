/**
 * i18n configuration for the Skinderma headless frontend.
 *
 * Slovak (sk) is the default locale and is served WITHOUT a path prefix.
 * Czech (cs) lives under /cs, Hungarian (hu) under /hu.
 *
 * Scope: only the Next.js content surface is localized. Commerce
 * (/obchod, /produkt/*, /kosik, /pokladna, /moj-ucet) and the legal documents
 * are owned by the WooCommerce apex (skinderma.sk) and stay Slovak-only —
 * those links are never locale-prefixed.
 */

export const locales = ["sk", "cs", "hu"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "sk";

/** Value for the <html lang> attribute. */
export const localeHtmlLang: Record<Locale, string> = {
  sk: "sk",
  cs: "cs",
  hu: "hu",
};

/** BCP-47 tag used for hreflang alternates. */
export const localeHreflang: Record<Locale, string> = {
  sk: "sk-SK",
  cs: "cs-CZ",
  hu: "hu-HU",
};

/** Open Graph locale value. */
export const localeOgLocale: Record<Locale, string> = {
  sk: "sk_SK",
  cs: "cs_CZ",
  hu: "hu_HU",
};

/** Language name shown in the switcher, written in the target language. */
export const localeNativeLabel: Record<Locale, string> = {
  sk: "Slovenčina",
  cs: "Čeština",
  hu: "Magyar",
};

export const localeShortLabel: Record<Locale, string> = {
  sk: "SK",
  cs: "CZ",
  hu: "HU",
};

export const LOCALE_COOKIE = "skinderma_locale";
export const LOCALE_HEADER = "x-skinderma-locale";
export const PATHNAME_HEADER = "x-skinderma-pathname";

/**
 * Canonical absolute origin of the content site (no trailing slash).
 *
 * The localized content surface is canonically served from `www.skinderma.sk`;
 * the bare apex (`skinderma.sk`) 301-redirects to it and is owned by WooCommerce.
 * `NEXT_PUBLIC_SITE_URL` is shared with the WP/WC API base config and is often
 * set to the apex, so normalize it here — canonical / hreflang / OG URLs must
 * never point at a redirecting host. Non-skinderma origins (preview deploys)
 * pass through untouched.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.skinderma.sk")
  .replace(/\/+$/, "")
  .replace(/^(https?:\/\/)skinderma\.sk(?=$|\/)/i, "$1www.skinderma.sk");

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/**
 * Split a pathname into its locale and the locale-neutral segment.
 *   "/cs/o-nas" -> { locale: "cs", segment: "/o-nas" }
 *   "/o-nas"    -> { locale: "sk", segment: "/o-nas" }
 *   "/"         -> { locale: "sk", segment: "/" }
 */
export function parsePathname(pathname: string): {
  locale: Locale;
  segment: string;
} {
  const clean = pathname.replace(/\/+$/, "") || "/";
  const parts = clean.split("/");
  const maybeLocale = parts[1];

  if (isLocale(maybeLocale) && maybeLocale !== defaultLocale) {
    const rest = "/" + parts.slice(2).join("/");
    return { locale: maybeLocale, segment: rest === "/" ? "/" : rest };
  }
  return { locale: defaultLocale, segment: clean };
}

/**
 * Build a href for a locale-neutral segment in a given locale.
 *   localizedPath("cs", "/o-nas") -> "/cs/o-nas"
 *   localizedPath("sk", "/o-nas") -> "/o-nas"
 *   localizedPath("hu", "/")      -> "/hu"
 */
export function localizedPath(locale: Locale, segment: string): string {
  const seg =
    segment === "/" || segment === ""
      ? ""
      : segment.startsWith("/")
      ? segment
      : "/" + segment;

  if (locale === defaultLocale) return seg || "/";
  return "/" + locale + seg;
}

/** Absolute URL for a locale-neutral segment in a given locale. */
export function localizedUrl(locale: Locale, segment: string): string {
  const path = localizedPath(locale, segment);
  // Keep the home URL as the bare origin (no trailing slash) so the canonical
  // and the Open Graph url agree.
  return path === "/" ? SITE_URL : SITE_URL + path;
}

