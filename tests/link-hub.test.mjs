import test from "node:test";
import assert from "node:assert/strict";
import { primaryLinks, carouselProducts } from "../lib/link-hub.ts";

const safeDestination = (href) => href.startsWith("/") || /^https:\/\//.test(href);

test("link hub has the three approved primary destinations", () => {
  assert.equal(primaryLinks.length, 3);
  assert.deepEqual(primaryLinks.map(({ label, href }) => [label, href]), [
    ["Objavte produkty Skinderma", "/obchod"],
    ["Rezervujte si termín v Skin Beauty House", "https://beautyhouse.sk/rezervuj-si-termin/"],
    ["Pre kozmetičky a salóny — školenia a partnerstvo", "/partnerstvo"],
  ]);
  assert.equal(primaryLinks[1].emphasized, true);
  assert.ok(primaryLinks.every((item) => safeDestination(item.href)));
});

test("carousel preserves approved product identity and safe destinations", () => {
  assert.equal(carouselProducts.length, 3);
  assert.deepEqual(carouselProducts.map((item) => item.name), ["PDRN Sérum", "Peptide Booster", "EXO-Ageless 10 ml"]);
  assert.equal(new Set(carouselProducts.map((item) => item.id)).size, 3);
  assert.ok(carouselProducts.every((item) => safeDestination(item.href) && /^https:\/\//.test(item.image)));
  assert.equal(carouselProducts[0].image, "https://skinderma.sk/wp-content/uploads/2025/09/Skinderma-PDRN-SERUM-VP.webp");
  assert.ok(carouselProducts.every((item) => !/zázrač|vylieč|garant|klinicky dokázan/i.test(`${item.name} ${item.description}`)));
});
