// Content regression tests for the delivery/payment page and the llms.txt
// route, which both restate the same shipping and payment facts in prose.
// Run with: npm test
//
// The page is localized (sk + /cs + /hu). The facts — prices, the method list,
// the free-shipping threshold — live once in lib/delivery.ts; the dictionaries
// carry only names and prose; components/pages/DeliveryPage.tsx renders them.
// These tests hold that split in place: changing a price must stay a one-file
// edit that moves all three languages together.
//
// Static source checks (the same pattern as the FadeInSection tests in
// i18n.test.mjs) rather than rendered-DOM tests, because the repo has no React
// testing library set up and app/llms.txt/route.ts calls a live WordPress
// endpoint that isn't mocked in this suite.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  SHIPPING_SK,
  SHIPPING_CZ_HU,
  PAYMENT_METHODS,
  FREE_SHIPPING_THRESHOLD,
  THRESHOLD_TOKEN,
} from "../lib/delivery.ts";
import { getDictionary } from "../lib/i18n/dictionaries/index.ts";

const read = (rel) =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

const deliverySrc = read("../lib/delivery.ts");
const viewSrc = read("../components/pages/DeliveryPage.tsx");
const llmsTxtSrc = read("../app/llms.txt/route.ts");

const LOCALES = ["sk", "cs", "hu"];
const dict = (l) => getDictionary(l).delivery;

/** The delivery block of a locale file, where prices must never be inlined. */
function deliveryBlock(locale) {
  const src = read(`../lib/i18n/dictionaries/${locale}.ts`);
  const start = src.indexOf("  delivery: {");
  const end = src.indexOf("\n  partnership: {", start);
  assert.ok(start > -1 && end > start, `${locale}: delivery block not found`);
  return src.slice(start, end);
}

// ---------------------------------------------------------------- the facts

test("delivery facts: Slovakia is SPS Balíkovo at 3 EUR plus free personal pickup", () => {
  const sps = SHIPPING_SK.find((m) => m.id === "spsPickupPoint");
  const pickup = SHIPPING_SK.find((m) => m.id === "localPickup");
  assert.equal(sps.price, "3,00 €");
  assert.equal(pickup.price, null, "personal pickup is free");
  assert.match(dict("sk").methods.localPickup.label, /Nám\. M\. R\. Štefánika 16, Komárno/);
});

test("delivery facts: Czechia/Hungary is a single 6 EUR courier rate", () => {
  assert.equal(SHIPPING_CZ_HU.length, 1);
  assert.equal(SHIPPING_CZ_HU[0].id, "courier");
  assert.equal(SHIPPING_CZ_HU[0].price, "6,00 €");
});

test("delivery facts: only bank transfer and ComGate card, no cash on delivery", () => {
  assert.deepEqual(
    PAYMENT_METHODS.map((m) => m.id),
    ["bankTransfer", "card"]
  );
  for (const l of LOCALES) {
    assert.match(dict(l).payments.card.label, /ComGate/, `${l}: card mentions ComGate`);
    assert.ok(
      dict(l).noCod.trim().length > 0,
      `${l}: states that cash on delivery is unavailable`
    );
  }
});

// ------------------------------------------------- one source, three locales

test("a price change is a one-file edit: no locale inlines an amount", () => {
  // The whole point of lib/delivery.ts. A "6,00 €" pasted into a dictionary
  // (metadata included) would go stale the moment the real price moves.
  for (const l of LOCALES) {
    const block = deliveryBlock(l);
    const amounts = block.match(/\d+[,.]\d{2}\s*€/g) || [];
    assert.deepEqual(amounts, [], `${l}: prices belong in lib/delivery.ts, found ${amounts}`);
  }
});

test("a threshold change is a one-file edit: locales use the token, not the number", () => {
  assert.equal(
    (deliverySrc.match(/FREE_SHIPPING_THRESHOLD = "[^"]+"/g) || []).length,
    1,
    "the threshold is declared exactly once"
  );
  for (const l of LOCALES) {
    assert.ok(
      dict(l).freeShippingCzHu.includes(THRESHOLD_TOKEN),
      `${l}: the free-shipping sentence must interpolate ${THRESHOLD_TOKEN}`
    );
    assert.ok(
      !deliveryBlock(l).includes(FREE_SHIPPING_THRESHOLD.replace(/\s*€$/, "")),
      `${l}: the threshold number must not be inlined`
    );
  }
});

test("every locale names every shipping and payment method", () => {
  // Adding a method to lib/delivery.ts without translating it would render
  // undefined in two languages; this fails the build instead.
  const shippingIds = [...SHIPPING_SK, ...SHIPPING_CZ_HU].map((m) => m.id);
  for (const l of LOCALES) {
    for (const id of shippingIds) {
      assert.ok(dict(l).methods[id]?.label, `${l}: missing label for shipping "${id}"`);
    }
    for (const { id } of PAYMENT_METHODS) {
      assert.ok(dict(l).payments[id]?.label, `${l}: missing label for payment "${id}"`);
    }
  }
});

test("every locale carries the prose the page needs, translated", () => {
  const keys = [
    "metaTitle", "metaDescription", "eyebrow", "title", "intro",
    "shippingHeading", "paymentHeading", "countrySk", "countryCzHu",
    "free", "noFreeShippingSk", "freeShippingCzHu", "noCod",
    "timeHeading", "timeBody",
  ];
  for (const l of LOCALES) {
    for (const k of keys) {
      assert.ok(dict(l)[k] && dict(l)[k].trim().length > 0, `${l}: empty ${k}`);
    }
  }
  // Slovak wording must not simply survive untranslated in the other two.
  for (const l of ["cs", "hu"]) {
    assert.notEqual(dict(l).title, dict("sk").title, `${l}: title is still Slovak`);
    assert.notEqual(dict(l).noCod, dict("sk").noCod, `${l}: noCod is still Slovak`);
  }
});

// ------------------------------------------------------------ the rendering

test("the free-shipping rule is scoped to the Czech/Hungarian block, not Slovakia", () => {
  const skHeading = viewSrc.indexOf("t.countrySk");
  const skDisclaimer = viewSrc.indexOf("t.noFreeShippingSk");
  const czHuHeading = viewSrc.indexOf("t.countryCzHu");
  const czHuRule = viewSrc.indexOf("t.freeShippingCzHu");
  assert.ok(skHeading > -1 && czHuHeading > -1);
  assert.ok(
    skHeading < skDisclaimer && skDisclaimer < czHuHeading,
    "the 'free shipping does not apply' note must sit inside the Slovakia block"
  );
  assert.ok(
    czHuHeading < czHuRule,
    "the free-shipping rule must sit inside the Czech/Hungarian block, after its heading"
  );
  assert.ok(
    dict("sk").noFreeShippingSk.includes("Slovensku"),
    "the Slovak disclaimer must name Slovakia"
  );
});

test("the threshold reaches the page interpolated, never as a raw token", () => {
  assert.match(viewSrc, /withThreshold\(t\.freeShippingCzHu\)/);
  for (const l of LOCALES) {
    assert.ok(
      !dict(l).noFreeShippingSk.includes(THRESHOLD_TOKEN),
      `${l}: the Slovak-exclusion note takes no threshold`
    );
  }
});

test("delivery rows use a min-w-0 stacking layout so long labels/notes/prices don't overflow on narrow screens", () => {
  assert.match(
    viewSrc,
    /className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-\[1fr_auto\][^"]*"/,
    "row layout must stack in a single column on mobile and switch to a two-column grid at sm+"
  );
  assert.match(
    viewSrc,
    /<div className="min-w-0">/,
    "the label/note wrapper must have min-w-0 so its text can shrink and wrap instead of overflowing"
  );
  assert.match(
    viewSrc,
    /break-words font-medium text-navy/,
    "row labels must break long words instead of overflowing the row"
  );
});

test("a free method shows the locale's own word, not an empty cell", () => {
  assert.match(viewSrc, /m\.price \?\? t\.free/);
  for (const l of LOCALES) {
    assert.ok(dict(l).free.trim().length > 0, `${l}: missing the word for "free"`);
  }
});

test("no stale carriers (Slovenská pošta, Packeta) remain in any locale", () => {
  for (const l of LOCALES) {
    const block = deliveryBlock(l);
    assert.doesNotMatch(block, /Slovenská pošta|Slovenská pošt|Packeta/, `${l}`);
  }
});

test("every locale distinguishes in-stock from made-to-order lead time", () => {
  for (const l of LOCALES) {
    const body = dict(l).timeBody;
    assert.match(body, /2\s*[–-]\s*5/, `${l}: in-stock lead time`);
    assert.ok(body.length > 60, `${l}: made-to-order lead time is also stated`);
  }
});

// ----------------------------------------------------------------- llms.txt

test("llms.txt: no longer claims delivery is Slovakia-only", () => {
  assert.doesNotMatch(llmsTxtSrc, /po celom Slovensku/);
  assert.match(llmsTxtSrc, /Česka a Maďarska/);
});

test("llms.txt: takes the shipping threshold from lib/delivery.ts, not a copy", () => {
  // llms.txt restates the shipping terms in prose for AI agents. A hardcoded
  // number here would quietly disagree with the page after the next change.
  assert.match(llmsTxtSrc, /\$\{FREE_SHIPPING_THRESHOLD\}/);
  assert.doesNotMatch(
    llmsTxtSrc,
    /doprava zdarma tam len nad \d/,
    "the threshold must be interpolated, not written out"
  );
});

test("llms.txt: no longer claims cash-on-delivery or installment payments are available", () => {
  assert.doesNotMatch(llmsTxtSrc, /splátky/);
  assert.match(llmsTxtSrc, /dobierku nie je dostupná/);
  assert.match(llmsTxtSrc, /ComGate/);
});
