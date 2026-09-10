<?php
/**
 * Hide paid shipping rates once free shipping is available.
 *
 * WHERE THIS GOES: WordPress on the apex (skinderma.sk), plugin "Code Snippets",
 * scope "Run everywhere". It is NOT part of the Next.js frontend — this file is
 * version-controlled here only so the code has a reviewable home.
 *
 * WHY: WooCommerce core shows every available rate. On the CZ (zone 3) and HU
 * (zone 4) zones that means an order over the threshold offers both
 * "Doprava zdarma" and "SPS / DPD – doručenie … 6 €" side by side.
 *
 * Local pickup is deliberately kept: it is a genuinely different choice, not a
 * worse-priced duplicate, and on the Slovak zone it must never disappear.
 *
 * After pasting it, change the cart (add/remove an item) or empty it — shipping
 * rates are cached per session and the old pair survives a plain reload.
 */

add_filter(
	'woocommerce_package_rates',
	function ( $rates ) {
		$has_free = false;

		foreach ( $rates as $rate ) {
			if ( 'free_shipping' === $rate->get_method_id() ) {
				$has_free = true;
				break;
			}
		}

		if ( ! $has_free ) {
			return $rates;
		}

		$keep = array();

		foreach ( $rates as $rate_id => $rate ) {
			if ( in_array( $rate->get_method_id(), array( 'free_shipping', 'local_pickup' ), true ) ) {
				$keep[ $rate_id ] = $rate;
			}
		}

		return $keep;
	},
	100
);
