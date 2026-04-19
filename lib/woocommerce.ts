import type { WCCategory, WCProduct } from "@/types/woocommerce";

const WC_BASE = process.env.WC_BASE_URL!;
const KEY = process.env.WC_CONSUMER_KEY!;
const SECRET = process.env.WC_CONSUMER_SECRET!;

const authHeader = () => ({
  Authorization: `Basic ${Buffer.from(`${KEY}:${SECRET}`).toString("base64")}`,
});

type FetchOpts = {
  revalidate?: number;
  params?: Record<string, string | number | boolean | undefined>;
};

async function wcFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { revalidate = 3600, params } = opts;
  const search = new URLSearchParams();
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null) continue;
      search.set(k, String(v));
    }
  }
  const qs = search.toString();
  const url = `${WC_BASE}${path}${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, {
    headers: authHeader(),
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`WC API ${res.status} ${res.statusText} for ${path}`);
  }
  return (await res.json()) as T;
}

export async function getProducts(
  params: FetchOpts["params"] = {}
): Promise<WCProduct[]> {
  return wcFetch<WCProduct[]>("/products", {
    revalidate: 3600,
    params: { per_page: 24, status: "publish", ...params },
  });
}

export async function getFeaturedProducts(limit = 8): Promise<WCProduct[]> {
  return wcFetch<WCProduct[]>("/products", {
    revalidate: 3600,
    params: { featured: true, per_page: limit, status: "publish" },
  });
}

export async function getProduct(slug: string): Promise<WCProduct | null> {
  const list = await wcFetch<WCProduct[]>("/products", {
    revalidate: 3600,
    params: { slug, status: "publish" },
  });
  return list[0] ?? null;
}

export async function getProductsByCategory(
  categoryId: number,
  params: FetchOpts["params"] = {}
): Promise<WCProduct[]> {
  return wcFetch<WCProduct[]>("/products", {
    revalidate: 3600,
    params: { category: categoryId, per_page: 24, status: "publish", ...params },
  });
}

export async function getAllProductSlugs(): Promise<
  Array<{ slug: string; date_modified?: string }>
> {
  const perPage = 100;
  const all: Array<{ slug: string; date_modified?: string }> = [];
  for (let page = 1; page <= 10; page++) {
    const batch = await wcFetch<Array<{ slug: string; date_modified?: string }>>(
      "/products",
      {
        revalidate: 3600,
        params: {
          per_page: perPage,
          page,
          status: "publish",
          _fields: "slug,date_modified",
        },
      }
    ).catch(() => []);
    if (!batch.length) break;
    all.push(...batch);
    if (batch.length < perPage) break;
  }
  return all;
}

export async function getCategories(): Promise<WCCategory[]> {
  const cats = await wcFetch<WCCategory[]>("/products/categories", {
    revalidate: 86400,
    params: { per_page: 100, hide_empty: true, orderby: "menu_order" },
  });
  return cats.filter((c) => c.count > 0);
}

export async function getCategory(slug: string): Promise<WCCategory | null> {
  const list = await wcFetch<WCCategory[]>("/products/categories", {
    revalidate: 86400,
    params: { slug },
  });
  return list[0] ?? null;
}

export function formatPrice(price: string | number, currency = "€"): string {
  const n = typeof price === "string" ? parseFloat(price) : price;
  if (!isFinite(n)) return "";
  return `${n.toFixed(2).replace(".", ",")} ${currency}`;
}

export const VAT_RATE = 0.2;

export function priceWithVat(price: string | number): number {
  const n = typeof price === "string" ? parseFloat(price) : price;
  if (!isFinite(n)) return NaN;
  return n * (1 + VAT_RATE);
}

export function formatPriceWithVat(
  price: string | number,
  currency = "€"
): string {
  return formatPrice(priceWithVat(price), currency);
}

export function addToCartUrl(product: Pick<WCProduct, "id" | "slug">): string {
  return `https://skinderma.sk/produkt/${product.slug}?add-to-cart=${product.id}`;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "’")
    .trim();
}
