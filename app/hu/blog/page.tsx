import type { Metadata } from "next";
import BlogListPage from "@/components/pages/BlogListPage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildPageMetadata } from "@/lib/i18n/metadata";

const LOCALE = "hu" as const;
const SEGMENT = "/blog";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const t = getDictionary(LOCALE).blog;
  return buildPageMetadata({
    locale: LOCALE,
    segment: SEGMENT,
    title: t.metaTitle,
    description: t.metaDescription,
  });
}

export default function Page() {
  return <BlogListPage locale={LOCALE} />;
}
