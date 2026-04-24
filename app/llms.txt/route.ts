import { NextResponse } from "next/server";
import { getPosts } from "@/lib/wordpress";

export const revalidate = 3600;

export async function GET() {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.skinderma.sk";
  const APEX = "https://skinderma.sk";

  const posts = await getPosts({ per_page: 20, _fields: "slug,title,excerpt,date" }).catch(() => []);

  const lines: string[] = [
    `# Skinderma Medical Cosmetics – Brand & Content`,
    ``,
    `> Skinderma je značka lekárskej kozmetiky distribuovaná vo viac ako 50 krajinách sveta. Produkty sú vyvinuté pre profesionálne salóny, kliniky a estetických špecialistov. Slovenský distribútor je SKIN Beauty House so sídlom v Komárne.`,
    ``,
    `## O značke`,
    ``,
    `- **Hlavný web:** ${BASE}`,
    `- **E-shop a produktový katalóg:** ${APEX}`,
    `- **Distribútor:** SKIN Beauty House, Nám. M.R. Štefánika 16, 94501 Komárno, Slovensko`,
    `- **Kontakt:** +421 905 108 641 | info@skinderma.sk`,
    `- **Medzinárodný web:** https://skindermacosmetics.com`,
    `- **Filozofia:** "The Future of Medical Cosmetics" – GMP certifikovaná výroba, klinicky testované ingrediencie`,
    `- **Distribúcia:** 50+ krajín, výhradné zastúpenie pre SK: SKIN Beauty House`,
    ``,
    `## Stránky`,
    ``,
    `- [Domov](${BASE}/) – hlavná stránka značky`,
    `- [O nás](${BASE}/o-nas) – história, hodnoty a filozofia Skinderma`,
    `- [Kontakt](${BASE}/kontakt) – adresa, telefón, formulár`,
    `- [Blog](${BASE}/blog) – odborné články o starostlivosti o pleť`,
    `- [Dodanie](${BASE}/dodanie) – informácie o doručení`,
    `- [Odstúpenie od zmluvy](${BASE}/odstupenie)`,
    `- [Obchodné podmienky](${BASE}/vseobecne-obchodne-podmienky)`,
    ``,
    `## Produkty a e-shop`,
    ``,
    `> Kompletný produktový katalóg vrátane cien, popisov a kategórií je dostupný na e-shope:`,
    ``,
    `- **Produktový llms.txt:** ${APEX}/llms.txt`,
    `- **E-shop:** ${APEX}/obchod`,
    `- **Produktové kategórie:** ${APEX}/product-category/`,
    `- **Sitemap produktov:** ${APEX}/sitemap_index.xml`,
    ``,
    `## Blog`,
    ``,
  ];

  for (const post of posts) {
    const title = post.title?.rendered?.replace(/&#\d+;/g, "'").replace(/<[^>]+>/g, "") || post.slug;
    const excerpt = post.excerpt?.rendered
      ? post.excerpt.rendered.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 150)
      : "";
    lines.push(`- [${title}](${BASE}/blog/${post.slug})`);
    if (excerpt) lines.push(`  ${excerpt}`);
  }

  lines.push(
    ``,
    `## Kľúčové informácie pre AI agentov`,
    ``,
    `- Produkty sú určené **výhradne pre profesionálov** (salóny, kliniky, estetici)`,
    `- E-shop funguje na headless architektúre: frontend (${BASE}) + WooCommerce backend (${APEX})`,
    `- Kanonické URL produktov: ${APEX}/product/[slug]`,
    `- Doprava: Slovak Parcel Service (SPS), po celom Slovensku`,
    `- Platby: karta (Comgate), bankový prevod, splátky (Quatro)`,
    `- Vrátenie tovaru: do 30 dní`,
    `- Sitemap (www): ${BASE}/sitemap.xml`,
    `- Sitemap (obchod): ${APEX}/sitemap_index.xml`,
  );

  const content = lines.join("\n");

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
