// Unit tests for the pure i18n helpers.
// Run with:  npm test   (node --test; Node >= 22 strips types from the .ts imports)
import test from "node:test";
import assert from "node:assert/strict";

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
