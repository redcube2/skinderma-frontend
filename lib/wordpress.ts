import type { WPCategory, WPPost } from "../types/woocommerce";

const WP_BASE = process.env.WP_BASE_URL!;

/**
 * Blog data (posts, categories, sitemap entries) is revalidated every 5
 * minutes. Down from the previous 1 hour default, which meant a freshly
 * published or edited article could sit stale in production for up to an
 * hour before Next re-fetched WordPress.
 */
export const BLOG_REVALIDATE_SECONDS = 300;

type FetchOpts = {
  revalidate?: number;
  params?: Record<string, string | number | boolean | undefined>;
};

function buildQuery(params?: FetchOpts["params"]): string {
  const search = new URLSearchParams();
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v === undefined || v === null) continue;
      search.set(k, String(v));
    }
  }
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

async function wpFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const { revalidate = BLOG_REVALIDATE_SECONDS, params } = opts;
  const res = await fetch(`${WP_BASE}${path}${buildQuery(params)}`, {
    next: { revalidate },
  });
  if (!res.ok) {
    throw new Error(`WP API ${res.status} ${res.statusText} for ${path}`);
  }
  return (await res.json()) as T;
}

export async function getPosts(params: FetchOpts["params"] = {}): Promise<WPPost[]> {
  return wpFetch<WPPost[]>("/posts", {
    revalidate: BLOG_REVALIDATE_SECONDS,
    params: { per_page: 12, _embed: "true", ...params },
  });
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const list = await wpFetch<WPPost[]>("/posts", {
    revalidate: BLOG_REVALIDATE_SECONDS,
    params: { slug, _embed: "true" },
  });
  return list[0] ?? null;
}

export interface PostsPage {
  posts: WPPost[];
  totalPages: number;
  page: number;
}

/**
 * Paginated post listing, optionally filtered by category id. Used by the
 * blog category archive. Reads the `X-WP-TotalPages` response header (not
 * exposed by `wpFetch`, which only returns the parsed body) so callers can
 * render prev/next and detect an out-of-range page.
 */
export async function getPostsPage(params: {
  category?: number;
  page?: number;
  per_page?: number;
}): Promise<PostsPage> {
  const { category, page = 1, per_page = 12 } = params;
  const qs = buildQuery({
    _embed: "true",
    per_page,
    page,
    categories: category,
  });
  const res = await fetch(`${WP_BASE}/posts${qs}`, {
    next: { revalidate: BLOG_REVALIDATE_SECONDS },
  });
  const totalPages = Number(res.headers.get("X-WP-TotalPages")) || 0;
  if (!res.ok) {
    // WP returns 400 rest_post_invalid_page_number once `page` exceeds the
    // available range; treat it as an empty page rather than throwing.
    if (res.status === 400) return { posts: [], totalPages, page };
    throw new Error(`WP API ${res.status} ${res.statusText} for /posts`);
  }
  const posts = (await res.json()) as WPPost[];
  return { posts, totalPages, page };
}

export async function getBlogCategories(): Promise<WPCategory[]> {
  const cats = await wpFetch<WPCategory[]>("/categories", {
    revalidate: BLOG_REVALIDATE_SECONDS,
    params: { per_page: 100, hide_empty: true },
  });
  return cats.filter((c) => c.count > 0);
}

export async function getBlogCategory(slug: string): Promise<WPCategory | null> {
  const list = await wpFetch<WPCategory[]>("/categories", {
    revalidate: BLOG_REVALIDATE_SECONDS,
    params: { slug },
  });
  return list[0] ?? null;
}

export interface PostCategoryRef {
  id: number;
  name: string;
  slug: string;
}

/** Category-taxonomy terms embedded on a post (via `_embed=true`), deduped. */
export function getPostCategories(post: WPPost): PostCategoryRef[] {
  const terms = post._embedded?.["wp:term"];
  if (!terms) return [];
  const seen = new Set<number>();
  const result: PostCategoryRef[] = [];
  for (const group of terms) {
    for (const term of group) {
      if (!term || term.taxonomy !== "category" || seen.has(term.id)) continue;
      seen.add(term.id);
      result.push({ id: term.id, name: term.name, slug: term.slug });
    }
  }
  return result;
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
