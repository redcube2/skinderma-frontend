import type { Metadata } from "next";
import {
  defaultLocale,
  localeHreflang,
  localeOgLocale,
  localizedUrl,
  locales,
  type Locale,
} from "./config";

/**
 * Build the canonical URL + hreflang alternates for a localized content route.
 *
 * @param locale   the locale being rendered
 * @param segment  locale-neutral path, e.g. "/o-nas" or "/"
 *
 * Produces:
 *   alternates.canonical           -> this locale's absolute URL
 *   alternates.languages["sk-SK"]  -> Slovak URL
 *   alternates.languages["cs-CZ"]  -> Czech URL
 *   alternates.languages["hu-HU"]  -> Hungarian URL
 *   alternates.languages["x-default"] -> Slovak URL (default market)
 */
export function buildAlternates(
  locale: Locale,
  segment: string
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[localeHreflang[l]] = localizedUrl(l, segment);
  }
  languages["x-default"] = localizedUrl(defaultLocale, segment);

  return {
    canonical: localizedUrl(locale, segment),
    languages,
  };
}

/** Open Graph locale block (primary + alternates) for a locale. */
export function buildOpenGraphLocale(locale: Locale): {
  locale: string;
  alternateLocale: string[];
} {
  return {
    locale: localeOgLocale[locale],
    alternateLocale: locales
      .filter((l) => l !== locale)
      .map((l) => localeOgLocale[l]),
  };
}

/**
 * Convenience: a full localized Metadata fragment (title/description/alternates/
 * openGraph) for a simple content page.
 */
export function buildPageMetadata(opts: {
  locale: Locale;
  segment: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  images?: string[];
}): Metadata {
  const { locale, segment, title, description } = opts;
  const og = buildOpenGraphLocale(locale);
  return {
    // `absolute` so the dictionary metaTitle (already a complete title such as
    // "Kontakt | Skinderma") is used verbatim, not run through the root
    // layout's "%s | Skinderma" template.
    title: { absolute: title },
    description,
    alternates: buildAlternates(locale, segment),
    openGraph: {
      type: "website",
      siteName: "Skinderma",
      url: localizedUrl(locale, segment),
      title: opts.ogTitle || title,
      description: opts.ogDescription || description,
      locale: og.locale,
      alternateLocale: og.alternateLocale,
      images: opts.images,
    },
  };
}

