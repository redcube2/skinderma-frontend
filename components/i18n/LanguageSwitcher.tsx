"use client";

import {
  localeShortLabel,
  localeNativeLabel,
  localeHtmlLang,
  localizedPath,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { persistLocale } from "./LocaleLink";

type Props = {
  /** Currently active locale. */
  locale: Locale;
  /** Locale-neutral segment already normalized via switchableSegment(). */
  segment: string;
  /** Accessible label for the control ("Jazyk" / "Nyelv" …). */
  label: string;
  variant?: "inline" | "menu";
  onNavigate?: () => void;
};

export default function LanguageSwitcher({
  locale,
  segment,
  label,
  variant = "inline",
  onNavigate,
}: Props) {
  if (variant === "menu") {
    return (
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#646467",
            margin: "0 0 8px",
            padding: "0 12px",
          }}
        >
          {label}
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {locales.map((l) => {
            const active = l === locale;
            return (
              <a
                key={l}
                href={localizedPath(l, segment)}
                hrefLang={localeHtmlLang[l]}
                aria-current={active ? "true" : undefined}
                onClick={() => {
                  persistLocale(l);
                  onNavigate?.();
                }}
                style={{
                  padding: "9px 12px",
                  fontSize: 14,
                  fontWeight: active ? 700 : 500,
                  color: active ? "#000" : "#646467",
                  textDecoration: "none",
                }}
              >
                {localeNativeLabel[l]}
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-1 text-xs font-semibold"
      role="group"
      aria-label={label}
    >
      {locales.map((l, i) => {
        const active = l === locale;
        return (
          <span key={l} className="flex items-center">
            {i > 0 && <span className="mx-1 text-[#cfcfcf]">/</span>}
            {active ? (
              <span aria-current="true" className="text-black">
                {localeShortLabel[l]}
              </span>
            ) : (
              <a
                href={localizedPath(l, segment)}
                hrefLang={localeHtmlLang[l]}
                onClick={() => persistLocale(l)}
                className="text-[#646467] transition-colors hover:text-black"
              >
                {localeShortLabel[l]}
              </a>
            )}
          </span>
        );
      })}
    </div>
  );
}

