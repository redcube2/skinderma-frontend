import type { Locale } from "../config";
import { defaultLocale } from "../config";
import type { Dictionary } from "./types";
import sk from "./sk";
import cs from "./cs";
import hu from "./hu";

const DICTIONARIES: Record<Locale, Dictionary> = { sk, cs, hu };

/**
 * Return the full content dictionary for a locale. Dictionaries are small,
 * static objects imported eagerly — safe to call from Server Components and
 * Client Components alike (the resolved object is serializable).
 */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[defaultLocale];
}

export type {
  Dictionary,
  ContactFormDict,
  PartnerFormDict,
} from "./types";

