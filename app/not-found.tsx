import Link from "next/link";
import { localizedPath } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getRequestLocale } from "@/lib/i18n/request";

export default function NotFound() {
  const locale = getRequestLocale();
  const t = getDictionary(locale).notFound;

  return (
    <section className="container-page flex flex-col items-center justify-center py-24 text-center md:py-32">
      <p className="text-[clamp(64px,12vw,140px)] font-light leading-none text-[#e2e2cf]">
        404
      </p>
      <h1 className="mt-4 text-2xl font-semibold text-navy md:text-3xl">
        {t.title}
      </h1>
      <p className="mt-3 max-w-md text-brand-gray">{t.body}</p>
      <Link
        href={localizedPath(locale, "/")}
        className="mt-8 inline-block bg-black px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-[#333]"
      >
        {t.cta}
      </Link>
    </section>
  );
}
