import type { Metadata } from "next";
import ContactPageView from "@/components/pages/ContactPageView";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/i18n/metadata";

const LOCALE = "hu" as const;
const SEGMENT = "/kontakt";

export function generateMetadata(): Metadata {
  const t = getDictionary(LOCALE).contact;
  return buildPageMetadata({
    locale: LOCALE,
    segment: SEGMENT,
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default function Page() {
  return <ContactPageView locale={LOCALE} />;
}
