import type { Metadata } from "next";
import CookiesPage from "@/components/pages/CookiesPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/i18n/metadata";

const LOCALE = "cs" as const;
const SEGMENT = "/cookies";

export function generateMetadata(): Metadata {
  const t = getDictionary(LOCALE).cookies;
  return {
    ...buildPageMetadata({
      locale: LOCALE,
      segment: SEGMENT,
      title: t.metaTitle,
      description: t.body,
    }),
    // Placeholder until the real cookie notice exists — keep it out of the
    // index so we do not publish an empty page in three languages.
    robots: { index: false, follow: true },
  };
}

export default function Page() {
  return <CookiesPage locale={LOCALE} />;
}
