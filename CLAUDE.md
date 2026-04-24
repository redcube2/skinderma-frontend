# Skinderma Frontend — Kontext

## Cesta k projektu
/Users/openclaw/.openclaw/workspace/skinderma-frontend

Vždy začni v termináli s:
cd /Users/openclaw/.openclaw/workspace/skinderma-frontend

## Architektúra

- skinderma.sk (apex) = WooCommerce
 hosting: hostcreators.sk
 role: SEO canonical pre produkty
 URL: /obchod, /produkt/*, /kategoria/*
 /kosik, /pokladna, /moj-ucet
 /wp-admin, /wp-json/*

- www.skinderma.sk = Vercel (Next.js 14 App Router)
 team: skinias-projects
 role: homepage + content
 URL: /, /o-nas, /kontakt, /novinky
 /vseobecne-obchodne-podmienky atď.

## Redirecty & Rewrites

- skinderma.sk/ → 301 → www.skinderma.sk/
- skinderma.sk/obchod → ostáva (SEO)
- skinderma.sk/produkt/* → ostáva (SEO)
- www.skinderma.sk/obchod → rewrite na apex
- www.skinderma.sk/produkt/* → rewrite na apex
- www.skinderma.sk/kosik → rewrite na apex
- www.skinderma.sk/pokladna → rewrite na apex

## Cookies (KRITICKÉ — netreba meniť)

V wp-config.php:
define('COOKIE_DOMAIN', '.skinderma.sk');
define('COOKIEPATH', '/');
define('SITECOOKIEPATH', '/');

Session sa zdieľa medzi apex a www.

## Menu na Verceli

Commerce (rewrite na Woo):
- Obchod
- Starostlivosť o pleť
- Masky
- Pre profesionálov

Content (natívne Vercel):
- Domov
- O Nás
- Kontakt
- Novinky

## Pravidlá

1. NIKDY nepoužívaj Store API cart,
 Cart Token, ani custom cart state.
 WooCommerce vlastní košík.

2. Add to cart = URL pattern:
 https://skinderma.sk/?add-to-cart=ID

3. LiteSpeed Cache exclude:
 /kosik, /pokladna, /moj-ucet,
 /?add-to-cart=, /wp-json/

4. Checkout = native WC (žiadny
 custom build cez API).

## Git

Zatiaľ lokálny repo, bez GitHub remote.
TODO: pridať redcube2/skinderma-frontend
na GitHub + Vercel auto-deploy.

## Status (apríl 2026)

Hotové:
- DNS split
- Apex 301 redirect
- Flow produkt → košík → pokladna
- COOKIE_DOMAIN funguje
- Cleanup dead code snippets

Zostáva:
- GitHub repo
- Google Search Console
- UptimeRobot monitoring
- Legálne stránky (GDPR,
 obchodné podmienky, reklamácie)
- 301 z apex content URL na www

