import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

/** Locale-parametrised cookies notice (used by /cs and /hu). */
export default function CookiesPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).cookies;

  return (
    <div className="container-page py-16 max-w-3xl">
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 32 }}>
        {t.title}
      </h1>
      <p style={{ color: "#646467" }}>{t.body}</p>
    </div>
  );
}
