# FÁZA 3 — Domáce sady na homepage

## Zmeny

| Súbor | Akcia |
|---|---|
| `components/home/SadyHomepageSection.tsx` | Nový — 5-dlaždnicová sekcia pre domáce rutiny |
| `components/home/DiagnostikaPromoBanner.tsx` | Nový — cross-promo banner diagnostika |
| `app/page.tsx` | Upravený — pridané 2 nové sekcie |
| `package.json` | Pridaný `lucide-react` (ikony) |

## Linky (5 sád)

| Sada | URL | Cena s DPH |
|---|---|---|
| Suchá pleť | `/produkt/sada-sucha-plet` | 139,25 € |
| Mastná pleť | `/produkt/sada-mastna-plet` | 155,33 € |
| Aknózna pleť | `/produkt/sada-aknozna-plet` | 156,45 € |
| Citlivá pleť | `/produkt/sada-citliva-plet` | 176,48 € |
| Anti-aging | `/produkt/sada-anti-aging` | 142,80 € |

## Layout homepage (poradie sekcií)

1. Hero banner
2. **SadyHomepageSection** ← nové
3. MarqueeBanner
4. StatsCounter
5. FeaturedProducts
6. ParallaxSection
7. CategoryGrid
8. SkiniaPromo
9. B2BSection
10. USPSection
11. GallerySection
12. FAQSection
13. **DiagnostikaPromoBanner** ← nové
14. Footer

## Cross-promo

- AI analyzátor Maicet Pro spomenutý
- Diagnostika zdarma pri nákupe (transparentne)
- Externý link: `https://beautyhouse.sk/rezervuj-si-termin/` (target=_blank)
- Adresa: SKIN Beauty House, Ul. Mieru 4235, Komárno

## Responsivita

- Desktop (≥1024px): 5 stĺpcov
- Tablet (<1024px): 3 stĺpce
- Mobile (<768px): 1 stĺpec

## Test lokálne

```bash
npm run dev
# → http://localhost:3000
```

## Rollback

GitHub PR → Revert → Vercel auto-redeploy (~2 min)
