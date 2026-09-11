// Content regression tests for the delivery/payment page and the llms.txt
// route, which both restate the same shipping and payment facts in prose.
// Run with: npm test
//
// These are static source checks (the same pattern as the FadeInSection
// tests in i18n.test.mjs) rather than a rendered-DOM test, because the repo
// has no React testing library set up and app/llms.txt/route.ts calls a
// live WordPress endpoint that isn't mocked in this suite.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dodanieSrc = readFileSync(
  fileURLToPath(new URL("../app/dodanie/page.tsx", import.meta.url)),
  "utf8"
);

const llmsTxtSrc = readFileSync(
  fileURLToPath(new URL("../app/llms.txt/route.ts", import.meta.url)),
  "utf8"
);

test("dodanie page: Slovakia shipping is SPS Balíkovo (3 EUR) or free personal pickup in Komárno", () => {
  assert.match(dodanieSrc, /SPS Balíkovo[^"]*"[\s\S]{0,40}value:\s*"3,00\s*€"/);
  assert.match(dodanieSrc, /Nám\. M\. R\. Štefánika 16, Komárno/);
});

test("dodanie page: free shipping is explicitly said not to apply in Slovakia", () => {
  assert.match(dodanieSrc, /Doprava zdarma sa na Slovensku neuplatňuje/);
});

test("dodanie page: Czech/Hungarian shipping is SPS/DPD at 6 EUR with a 200 EUR free-shipping threshold", () => {
  assert.match(dodanieSrc, /SPS \/ DPD[^"]*"[\s\S]{0,40}value:\s*"6,00\s*€"/);
  assert.match(dodanieSrc, /200\s*€ s DPH/);
});

test("dodanie page: the free-shipping threshold is scoped to the Czech/Hungarian section, not Slovakia", () => {
  const skHeading = dodanieSrc.indexOf("Slovensko\n");
  const czHuHeading = dodanieSrc.indexOf("Česko a Maďarsko");
  const skDisclaimer = dodanieSrc.indexOf("Doprava zdarma sa na Slovensku neuplatňuje");
  // "200 € s DPH" also appears once in the shippingCzHu data array (above the
  // component); only the occurrence after the CZ/HU heading matters here.
  const freeShippingRuleInJsx = dodanieSrc.indexOf("200 € s DPH", czHuHeading);
  assert.ok(skHeading > -1 && czHuHeading > -1);
  assert.ok(skHeading < skDisclaimer && skDisclaimer < czHuHeading,
    "the 'free shipping does not apply' note must sit inside the Slovakia block");
  assert.ok(czHuHeading < freeShippingRuleInJsx,
    "the 200 EUR free-shipping rule must sit inside the Czech/Hungarian block, after its heading");
});

test("dodanie page: only bank transfer and ComGate online card are offered, no cash on delivery", () => {
  assert.match(dodanieSrc, /Bankový prevod/);
  assert.match(dodanieSrc, /ComGate/);
  assert.doesNotMatch(dodanieSrc, /label:\s*"Dobierka"/);
  assert.match(dodanieSrc, /dobierku nie je dostupná/);
});

test("dodanie page: no stale carriers (Slovenská pošta, Packeta) remain", () => {
  assert.doesNotMatch(dodanieSrc, /Slovenská pošta/);
  assert.doesNotMatch(dodanieSrc, /Packeta/);
});

test("dodanie page: distinguishes in-stock lead time from made-to-order lead time", () => {
  assert.match(dodanieSrc, /2\s*–\s*5 pracovných dní/);
  assert.match(dodanieSrc, /približne do jedného mesiaca/);
});

test("llms.txt: no longer claims delivery is Slovakia-only", () => {
  assert.doesNotMatch(llmsTxtSrc, /po celom Slovensku/);
  assert.match(llmsTxtSrc, /Česka a Maďarska/);
});

test("llms.txt: no longer claims cash-on-delivery or installment payments are available", () => {
  assert.doesNotMatch(llmsTxtSrc, /splátky/);
  assert.match(llmsTxtSrc, /dobierku nie je dostupná/);
  assert.match(llmsTxtSrc, /ComGate/);
});
