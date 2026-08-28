"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

/** Persist the chosen locale for ~1 year so the bare "/" entry point sticks. */
export function persistLocale(locale: Locale) {
  try {
    document.cookie =
      LOCALE_COOKIE +
      "=" +
      locale +
      "; path=/; max-age=31536000; samesite=lax";
  } catch {
    /* no-op */
  }
}

type Props = ComponentProps<typeof Link> & { locale: Locale };

/**
 * A <Link> that records the target locale in a cookie before navigating, so a
 * later visit to "/" resolves back to the same language.
 */
export default function LocaleLink({ locale, onClick, ...rest }: Props) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        persistLocale(locale);
        onClick?.(e);
      }}
    />
  );
}

