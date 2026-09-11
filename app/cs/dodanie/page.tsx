import type { Metadata } from "next";
import DeliveryPage from "@/components/pages/DeliveryPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/i18n/metadata";

const LOCALE = "cs" as const;
const SEGMENT = "/dodanie";

export function generateMetadata(): Metadata {
  const t = getDictionary(LOCALE).delivery;
  return buildPageMetadata({
    locale: LOCALE,
    segment: SEGMENT,
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default function Page() {
  return <DeliveryPage locale={LOCALE} />;
}
