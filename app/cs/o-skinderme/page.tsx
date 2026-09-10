import type { Metadata } from "next";
import OSkindermePage from "@/components/pages/OSkindermePage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/i18n/metadata";

const LOCALE = "cs" as const;
const SEGMENT = "/o-skinderme";

export function generateMetadata(): Metadata {
  const t = getDictionary(LOCALE).oSkinderme;
  return buildPageMetadata({
    locale: LOCALE,
    segment: SEGMENT,
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default function Page() {
  return <OSkindermePage locale={LOCALE} />;
}
