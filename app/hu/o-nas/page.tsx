import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/i18n/metadata";

const LOCALE = "hu" as const;
const SEGMENT = "/o-nas";

export function generateMetadata(): Metadata {
  const t = getDictionary(LOCALE).about;
  return buildPageMetadata({
    locale: LOCALE,
    segment: SEGMENT,
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default function Page() {
  return <AboutPage locale={LOCALE} />;
}
