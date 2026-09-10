import type { Metadata } from "next";
import PartnershipPage from "@/components/pages/PartnershipPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/i18n/metadata";

const LOCALE = "hu" as const;
const SEGMENT = "/partnerstvo";

export function generateMetadata(): Metadata {
  const t = getDictionary(LOCALE).partnership;
  return buildPageMetadata({
    locale: LOCALE,
    segment: SEGMENT,
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default function Page() {
  return <PartnershipPage locale={LOCALE} />;
}
