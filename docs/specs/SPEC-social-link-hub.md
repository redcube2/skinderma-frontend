# Social link hub (`/link`)

## Scope and requirements

This local branch adds a Slovak, light clinical social link hub at `https://www.skinderma.sk/link`. It has a compact Skinderma header, one concise H1, exactly three primary destination cards, an honest pending-partner-salons notice, a three-product accessible carousel, and compact contact/privacy footer.

The hub deliberately uses plain document anchors for every link, including its home header and internal destinations. Future internal links **to** `/link` must also be ordinary anchors/full document loads: persistent Next layouts are unsuitable for this root-shell boundary.

The root layout identifies only the default-locale `/link` route with `locale === defaultLocale && getRequestRoute().segment === '/link'`. It retains the existing main wrapper but suppresses only its contact banner, Navbar, Footer, JSON-LD, and Hotjar there. Other routes, including `/cs/link` and `/hu/link`, retain normal chrome.

Product data is typed, immutable local data. Public supplied product images are retained as review fixtures with explicit dimensions. No product, CMS, WooCommerce, API, checkout, analytics, DNS, dependency, navigation, sitemap, or multilingual changes are in scope.

## Accessibility and test coverage

- CTA and footer targets are at least 44px; keyboard focus is visible on CTAs, carousel controls, and product links.
- The carousel exposes only its active product, supports previous/next, pagination, pause/play, hover/focus/hidden-tab pauses, and horizontal swipe without blocking vertical scrolling.
- Autoplay is six seconds. SSR starts deterministically paused; after mount normal motion may play. Reduced motion starts paused, while explicit play remains available. The pause button reflects the user's playback choice independently of temporary hover/focus pauses, so moving onto it cannot change the intended action.
- `tests/link-hub.test.mjs` checks data identity, destinations, IDs, safe URL forms, category count, and absence of generated clinical claims.

Run the recorded offline checks when available:

```sh
node --import ./tests/register-ts.mjs --test tests/link-hub.test.mjs
npm run typecheck -- --incremental false
npm run lint
npm test
npm run build
```

Do not infer passing results from this document. Builds/tests are offline; public images and fonts are immutable fixtures. No CMS credentials, network mutation, or checkout tests are used.

The separate operator-owned Playwright harness checks metadata, exact CTA destinations, absence of inherited tracking, six-second autoplay, user pause/resume, hover/focus/hidden-tab pauses, keyboard pagination, product destinations, manual navigation, horizontal swipe, widths 320/390/1440, image rendering, and reduced-motion behavior including hydration errors. Harness code is outside the model's writable scope.

Implementation provenance: Roy's `skinderma-link-v4` job generated the seven-file draft but stopped on the browser pause test after its bounded correction attempt. Operator recovery fixed the pause button on this separate branch and reruns the same immutable acceptance harness. The original job remains failed; this branch must not be represented as a fully autonomous completed Roy job.

## Deployment and rollback

The apex `skinderma.sk` is separate WooCommerce hosting. A Next `next.config` on `www` does not control it. An operator may place this dedicated Apache/LiteSpeed rule **ahead of the WordPress catchall** on apex hosting; do not apply it as part of this change:

```apache
RewriteEngine On
RewriteRule ^link/?$ https://www.skinderma.sk/link [R=301,L,NE]
```

Apache/LiteSpeed preserves the original query string by default when the substitution has none. Before release, verify a live single-hop apex redirect, query preservation, unchanged `/obchod`, `/kosik`, and `/pokladna`, mobile URL readback, content approval, route metadata, and the compact shell without Hotjar.

Rollback: revert this local commit and remove only the dedicated `^link/?$` hosting rule. Do not alter unrelated WordPress or commerce rules.
