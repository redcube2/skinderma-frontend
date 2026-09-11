/**
 * Shipping and payment facts — the single source for all three locales.
 *
 * Only the numbers and the method list live here. Their names and the prose
 * around them are translated in lib/i18n/dictionaries/*, keyed by the ids
 * below, so changing a price or a threshold is one edit that moves the Slovak,
 * Czech and Hungarian pages together. A method added here without a label in
 * every locale fails the dictionary test.
 *
 * These values mirror the WooCommerce shipping zones on the apex (zone 1
 * Slovensko, zone 3 Česko, zone 4 Maďarsko) and the enabled payment gateways.
 * When a zone changes in WooCommerce, change it here too — nothing syncs
 * automatically.
 */

export type ShippingMethodId = "spsPickupPoint" | "localPickup" | "courier";
export type PaymentMethodId = "bankTransfer" | "card";

export type Method<Id> = {
  id: Id;
  /** Formatted price, or null when the method is free (the locale supplies the word). */
  price: string | null;
};

/** Slovakia — WooCommerce zone 1. No free-shipping method exists here. */
export const SHIPPING_SK: Method<ShippingMethodId>[] = [
  { id: "spsPickupPoint", price: "3,00 €" },
  { id: "localPickup", price: null },
];

/** Czechia and Hungary — WooCommerce zones 3 and 4, identical terms. */
export const SHIPPING_CZ_HU: Method<ShippingMethodId>[] = [
  { id: "courier", price: "6,00 €" },
];

/** Enabled gateways: bank transfer (bacs) and card (ComGate). No COD anywhere. */
export const PAYMENT_METHODS: Method<PaymentMethodId>[] = [
  { id: "bankTransfer", price: null },
  { id: "card", price: null },
];

/**
 * Order value above which CZ/HU shipping is free, as the customer sees it —
 * including VAT. WooCommerce stores the matching net figure (162.60) because
 * `woocommerce_tax_display_cart` is `excl`; the two must be changed together.
 */
export const FREE_SHIPPING_THRESHOLD = "200 €";

/** Placeholder the locale prose uses for the threshold above. */
export const THRESHOLD_TOKEN = "{threshold}";

/** Substitute the threshold into a translated sentence. */
export function withThreshold(text: string): string {
  return text.split(THRESHOLD_TOKEN).join(FREE_SHIPPING_THRESHOLD);
}
