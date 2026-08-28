// Unit tests for the pure i18n helpers.
// Run with:  npm test   (node --test; Node >= 22 strips types from the .ts imports)
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  parsePathname,
  localizedPath,
  localizedUrl,
  isLocale,
  defaultLocale,
  locales,
} from "../lib/i18n/config.ts";
import {
  switchableSegment,
  isCommerceSegment,
  resolveAlias,
} from "../lib/i18n/routes.ts";
import { buildAlternates } from "../lib/i18n/metadata.ts";

test("defaultLocale is Slovak and served prefix-less", () => {
  assert.equal(defaultLocale, "sk");
  assert.equal(localizedPath("sk", "/o-nas"), "/o-nas");
  assert.equal(localizedPath("sk", "/"), "/");
});

test("cs / hu live under their prefix", () => {
  assert.equal(localizedPath("cs", "/o-nas"), "/cs/o-nas");
  assert.equal(localizedPath("hu", "/"), "/hu");
  assert.equal(localizedPath("cs", "/"), "/cs");
});

test("parsePathname splits locale and locale-neutral segment", () => {
  assert.deepEqual(parsePathname("/cs/o-nas"), { locale: "cs", segment: "/o-nas" });
  assert.deepEqual(parsePathname("/hu"), { locale: "hu", segment: "/" });
  assert.deepEqual(parsePathname("/o-nas"), { locale: "sk", segment: "/o-nas" });
  assert.deepEqual(parsePathname("/"), { locale: "sk", segment: "/" });
  assert.deepEqual(parsePathname("/blog/clanok"), {
    locale: "sk",
    segment: "/blog/clanok",
  });
});

test("isLocale guards the locale union", () => {
  assert.ok(isLocale("cs"));
  assert.ok(!isLocale("en"));
  assert.ok(!isLocale(undefined));
});

test("switchableSegment keeps the language switcher off 404s", () => {
  assert.equal(switchableSegment("/o-nas"), "/o-nas");
  assert.equal(switchableSegment("/blog/nejaky-clanok"), "/blog");
  assert.equal(switchableSegment("/nieco-nezname"), "/");
  assert.equal(switchableSegment("/"), "/");
});

test("commerce/apex segments are recognised and never localised", () => {
  assert.ok(isCommerceSegment("/obchod"));
  assert.ok(isCommerceSegment("/produkt/serum"));
  assert.ok(isCommerceSegment("/vseobecne-obchodne-podmienky"));
  assert.ok(!isCommerceSegment("/o-nas"));
});

test("vanity slug aliases resolve to canonical routes", () => {
  assert.equal(resolveAlias("hu", "/kapcsolat"), "/kontakt");
  assert.equal(resolveAlias("cs", "/novinky"), "/blog");
  assert.equal(resolveAlias("cs", "/o-nas"), null);
  assert.equal(resolveAlias("sk", "/kontakt"), null);
});

test("buildAlternates emits canonical + full hreflang cluster", () => {
  const alt = buildAlternates("cs", "/o-nas");
  const langs = alt.languages ?? {};
  assert.equal(alt.canonical, "https://www.skinderma.sk/cs/o-nas");
  assert.equal(langs["sk-SK"], "https://www.skinderma.sk/o-nas");
  assert.equal(langs["cs-CZ"], "https://www.skinderma.sk/cs/o-nas");
  assert.equal(langs["hu-HU"], "https://www.skinderma.sk/hu/o-nas");
  assert.equal(langs["x-default"], "https://www.skinderma.sk/o-nas");
});

test("home alternates use the bare origin for sk / x-default", () => {
  const alt = buildAlternates("sk", "/");
  const langs = alt.languages ?? {};
  assert.equal(alt.canonical, "https://www.skinderma.sk");
  assert.equal(langs["x-default"], "https://www.skinderma.sk");
  assert.equal(langs["cs-CZ"], "https://www.skinderma.sk/cs");
});

test("locales list is exactly sk, cs, hu", () => {
  assert.deepEqual([...locales], ["sk", "cs", "hu"]);
  assert.equal(
    localizedUrl("hu", "/kontakt"),
    "https://www.skinderma.sk/hu/kontakt"
  );
});

// ---------------------------------------------------------------------------
// Regression guard: FadeInSection must never trap content invisible.
//
// components/ui/FadeInSection.tsx wraps most homepage sections (Slovak `/` and
// the localized `/cs` + `/hu` home built from components/pages/HomePage.tsx).
// It used to gate visibility purely on an IntersectionObserver "isIntersecting"
// callback with no fallback, so any block below the initial viewport stayed at
// opacity:0 — a full-height blank gap — until scrolled into view. That broke
// full-page screenshots, crawlers/link-preview renderers, print and reduced
// motion, and a `threshold: 0.15` also stranded blocks taller than
// viewport / 0.15 (the product grid on a small phone) even while scrolling.
//
// This test pins the resilience contract of the component source: reveal
// without IO, reveal for reduced motion, a timeout safety net, and a
// zero threshold. It is a static check (the test runner has no DOM); the
// end-to-end proof lives in the full-page screenshots captured during review.
const fadeInSectionSrc = readFileSync(
  fileURLToPath(new URL("../components/ui/FadeInSection.tsx", import.meta.url)),
  "utf8"
);

test("FadeInSection reveals content when IntersectionObserver is unavailable", () => {
  assert.match(
    fadeInSectionSrc,
    /IntersectionObserver\s*===\s*["']undefined["']|["']IntersectionObserver["']\s+in\s+/,
    "expected a guard that reveals content when IntersectionObserver is missing"
  );
});

test("FadeInSection reveals content for prefers-reduced-motion", () => {
  assert.match(fadeInSectionSrc, /prefers-reduced-motion/);
});

test("FadeInSection has a timeout safety net so content is never stranded hidden", () => {
  assert.match(
    fadeInSectionSrc,
    /setTimeout\(\s*\(\)\s*=>\s*setVisible\(true\)|setTimeout\(\s*reveal/,
    "expected a setTimeout fallback that flips the section visible"
  );
});

test("FadeInSection uses threshold 0 (a positive threshold strands tall blocks)", () => {
  assert.match(fadeInSectionSrc, /threshold:\s*0\b/);
  assert.doesNotMatch(
    fadeInSectionSrc,
    /threshold:\s*0\.\d/,
    "a fractional IntersectionObserver threshold can never resolve for a block taller than viewport / threshold"
  );
});
