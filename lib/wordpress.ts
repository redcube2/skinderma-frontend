import type { WPPost } from "@/types/woocommerce";

const WP_BASE = process.env.WP_BASE_URL!;

type FetchOpts = {
  revalidate?: number;
  params?: Record<string, string | number | boolean | undefined>;
};

async function wpFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { revalidate = 3600, params } = opts;
  const search = new URLSearchParams();
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null) continue;
      search.set(k, String(v));
    }
  }
  const qs = search.toString();
  const res = await fetch(`${WP_BASE}${path}${qs ? `?${qs}` : ""}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`WP API ${res.status} ${res.statusText} for ${path}`);
  }
  return (await res.json()) as T;
}

export async function getPosts(params: FetchOpts["params"] = {}): Promise<WPPost[]> {
  return wpFetch<WPPost[]>("/posts", {
    revalidate: 3600,
    params: { per_page: 12, _embed: "true", ...params },
  });
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const list = await wpFetch<WPPost[]>("/posts", {
    revalidate: 3600,
    params: { slug, _embed: "true" },
  });
  return list[0] ?? null;
}

export function formatPostDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("sk-SK", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
