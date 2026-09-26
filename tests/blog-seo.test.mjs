// Regression tests for headless blog SEO/indexability:
//   1. canonical selection (never inherit the apex Yoast canonical)
//   2. Article/BlogPosting JSON-LD shape + safe <script> serialization
//   3. category routing (WP REST categories -> /blog/kategoria/{slug}) + sitemap inclusion
//   4. the shared 5-minute revalidation constant
//
// Server Component page files (.tsx) can't be imported directly under
// `node --test` (JSX isn't stripped, only types are), so the interesting
// logic lives in plain .ts helpers under lib/ and lib/seo/ that ARE
// imported and exercised here; the page files are pinned with lightweight
// source-text regression checks (same pattern as the FadeInSection checks
// in tests/i18n.test.mjs).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  buildBlogPostCanonical,
  buildBlogPostDescription,
  buildBlogPostMetadata,
} from "../lib/seo/blogMetadata.ts";
import { buildBlogPostingJsonLd } from "../lib/seo/blogPosting.ts";
import { serializeJsonLd } from "../lib/seo/jsonLd.ts";
import {
  buildBlogCategorySitemapUrls,
  buildBlogPostSitemapUrls,
} from "../lib/seo/blogSitemap.ts";
import {
  BLOG_REVALIDATE_SECONDS,
  getPostCategories,
} from "../lib/wordpress.ts";
import { resolveBlogCategoryPageState } from "../lib/seo/blogPagination.ts";

function makePost(overrides = {}) {
  return {
    id: 1,
    date: "2026-01-10T09:00:00",
    modified: "2026-01-12T09:00:00",
    slug: "moj-clanok",
    link: "https://skinderma.sk/moj-clanok/",
    title: { rendered: "Môj článok" },
    excerpt: { rendered: "<p>Krátky popis článku.</p>" },
    content: { rendered: "<p>Obsah</p>" },
    featured_media: 0,
    ...overrides,
  };
}

function readSrc(relPath) {
  return readFileSync(fileURLToPath(new URL(relPath, import.meta.url)), "utf8");
}

// ---------------------------------------------------------------------------
// 1. canonical selection
// ---------------------------------------------------------------------------

test("blog post canonical is always the www/blog/{slug} URL", () => {
  assert.equal(
    buildBlogPostCanonical("moj-clanok"),
    "https://www.skinderma.sk/blog/moj-clanok"
  );
});

test("metadata canonical + OG url never inherit the apex Yoast canonical", () => {
  const post = makePost({
    yoast_head_json: {
      canonical: "https://skinderma.sk/wp-inak-pomenovany-clanok/",
      og_url: "https://skinderma.sk/wp-inak-pomenovany-clanok/",
      title: "Yoast titulok",
      description: "Yoast popis článku.",
    },
  });
  const meta = buildBlogPostMetadata(post);
  assert.equal(meta.alternates.canonical, "https://www.skinderma.sk/blog/moj-clanok");
  assert.equal(meta.openGraph.url, "https://www.skinderma.sk/blog/moj-clanok");
});

test("metadata canonical is correct even when yoast is entirely absent", () => {
  const meta = buildBlogPostMetadata(makePost());
  assert.equal(meta.alternates.canonical, "https://www.skinderma.sk/blog/moj-clanok");
  assert.equal(meta.openGraph.url, "https://www.skinderma.sk/blog/moj-clanok");
});

test("description falls back to the stripped excerpt when yoast has none", () => {
  assert.equal(buildBlogPostDescription(makePost()), "Krátky popis článku.");
});

// ---------------------------------------------------------------------------
// 2. Article/BlogPosting JSON-LD shape + safe serialization
// ---------------------------------------------------------------------------

test("BlogPosting JSON-LD carries the canonical url, dates, and the exact description given (no invented content)", () => {
  const post = makePost({
    _embedded: {
      "wp:featuredmedia": [
        { id: 9, source_url: "https://skinderma.sk/wp-content/uploads/foto.jpg" },
      ],
      author: [{ id: 3, name: "Dr. Nováková" }],
    },
  });
  const description = "Presne tento text musí byť v JSON-LD, nič iné.";
  const jsonLd = buildBlogPostingJsonLd(post, {
    canonicalUrl: "https://www.skinderma.sk/blog/moj-clanok",
    description,
  });

  assert.equal(jsonLd["@context"], "https://schema.org");
  assert.ok(jsonLd["@type"] === "BlogPosting" || jsonLd["@type"] === "Article");
  assert.equal(jsonLd.url, "https://www.skinderma.sk/blog/moj-clanok");
  assert.equal(jsonLd.mainEntityOfPage["@id"], "https://www.skinderma.sk/blog/moj-clanok");
  assert.equal(jsonLd.headline, "Môj článok");
  assert.equal(jsonLd.description, description);
  assert.equal(jsonLd.datePublished, "2026-01-10T09:00:00");
  assert.equal(jsonLd.dateModified, "2026-01-12T09:00:00");
  assert.deepEqual(jsonLd.image, ["https://skinderma.sk/wp-content/uploads/foto.jpg"]);
  assert.deepEqual(jsonLd.author, { "@type": "Person", name: "Dr. Nováková" });
});

test("BlogPosting JSON-LD falls back dateModified to datePublished and omits image/author when absent", () => {
  const post = makePost({ modified: undefined });
  const jsonLd = buildBlogPostingJsonLd(post, {
    canonicalUrl: "https://www.skinderma.sk/blog/moj-clanok",
    description: "Popis.",
  });
  assert.equal(jsonLd.dateModified, jsonLd.datePublished);
  assert.ok(!("image" in jsonLd));
  assert.ok(!("author" in jsonLd));
});

test("serializeJsonLd escapes </script> so JSON-LD can never break out of its script tag", () => {
  const data = { description: "Prerušenie</script><script>alert(1)</script>" };
  const serialized = serializeJsonLd(data);
  assert.ok(!serialized.includes("</script>"));
  assert.ok(!serialized.includes("<"));
  const roundTripped = JSON.parse(serialized.replace(/\\u003c/g, "<"));
  assert.deepEqual(roundTripped, data);
});

// ---------------------------------------------------------------------------
// 3. category routing + sitemap inclusion
// ---------------------------------------------------------------------------

test("getPostCategories extracts only category-taxonomy terms from _embedded wp:term, deduped", () => {
  const post = makePost({
    _embedded: {
      "wp:term": [
        [
          {
            id: 5,
            name: "Starostlivosť o pleť",
            slug: "starostlivost-o-plet",
            taxonomy: "category",
          },
          {
            id: 5,
            name: "Starostlivosť o pleť",
            slug: "starostlivost-o-plet",
            taxonomy: "category",
          },
        ],
        [{ id: 11, name: "akné", slug: "akne", taxonomy: "post_tag" }],
      ],
    },
  });
  assert.deepEqual(getPostCategories(post), [
    { id: 5, name: "Starostlivosť o pleť", slug: "starostlivost-o-plet" },
  ]);
});

test("getPostCategories returns an empty array when no terms were embedded", () => {
  assert.deepEqual(getPostCategories(makePost()), []);
});

test("blog category sitemap entries only include non-empty categories, using /blog/kategoria/{slug}", () => {
  const now = new Date("2026-03-01T00:00:00Z");
  const categories = [
    { id: 1, name: "Masky", slug: "masky", description: "", count: 4, parent: 0 },
    { id: 2, name: "Prázdna", slug: "prazdna", description: "", count: 0, parent: 0 },
  ];
  const urls = buildBlogCategorySitemapUrls(categories, "https://www.skinderma.sk", now);
  assert.deepEqual(
    urls.map((u) => u.url),
    ["https://www.skinderma.sk/blog/kategoria/masky"]
  );
});

test("blog post sitemap entries use /blog/{slug} on the given base and fall back lastModified to now", () => {
  const now = new Date("2026-03-01T00:00:00Z");
  const posts = [
    makePost({ modified: "2026-02-01T00:00:00" }),
    makePost({ slug: "iny-clanok", modified: undefined }),
  ];
  const urls = buildBlogPostSitemapUrls(posts, "https://www.skinderma.sk", now);
  assert.equal(urls[0].url, "https://www.skinderma.sk/blog/moj-clanok");
  assert.deepEqual(urls[0].lastModified, new Date("2026-02-01T00:00:00"));
  assert.equal(urls[1].url, "https://www.skinderma.sk/blog/iny-clanok");
  assert.deepEqual(urls[1].lastModified, now);
});

// ---------------------------------------------------------------------------
// 4. shared revalidation constant
// ---------------------------------------------------------------------------

test("blog revalidation constant is 5 minutes, down from the old 1 hour default", () => {
  assert.equal(BLOG_REVALIDATE_SECONDS, 300);
});

// ---------------------------------------------------------------------------
// Source-text regressions for the Server Component pages (can't import .tsx
// under node --test — JSX is not erasable type syntax).
// ---------------------------------------------------------------------------

const blogDetailSrc = readSrc("../app/blog/[slug]/page.tsx");
const blogCategorySrc = readSrc("../app/blog/kategoria/[slug]/page.tsx");
const sitemapSrc = readSrc("../app/sitemap.ts");
const blogListSrc = readSrc("../components/pages/BlogListPage.tsx");
const cardSrc = readSrc("../components/blog/BlogPostCard.tsx");

test("blog detail page never reads the Yoast canonical/og_url for its own canonical", () => {
  assert.ok(!blogDetailSrc.includes("yoast?.canonical"));
  assert.ok(!blogDetailSrc.includes("yoast?.og_url"));
  assert.ok(blogDetailSrc.includes("buildBlogPostMetadata"));
});

test("blog detail renders JSON-LD via the safe serializer", () => {
  assert.ok(blogDetailSrc.includes("serializeJsonLd"));
  assert.ok(blogDetailSrc.includes("application/ld+json"));
});

test("blog detail + category archive + sitemap use the shared 5-minute revalidate constant, not a bare 3600", () => {
  for (const src of [blogDetailSrc, blogCategorySrc, sitemapSrc]) {
    assert.ok(src.includes("BLOG_REVALIDATE_SECONDS"));
    assert.ok(!/revalidate\s*=\s*3600\b/.test(src));
  }
});

test("empty category archives are noindex and the sitemap only links non-empty categories", () => {
  assert.ok(blogCategorySrc.includes("index: false"));
  assert.ok(sitemapSrc.includes("buildBlogCategorySitemapUrls"));
});

// ---------------------------------------------------------------------------
// Out-of-range category page (?page=99) must 404, never render/index a soft-404.
// ---------------------------------------------------------------------------

test("an out-of-range page with no valid page data (WP 400, totalPages=0) is not-found, even for a non-empty category", () => {
  // This is exactly what getPostsPage returns for a WP 400
  // rest_post_invalid_page_number response: no X-WP-TotalPages header at all.
  const state = resolveBlogCategoryPageState({
    page: 99,
    totalPages: 0,
    postsCount: 0,
    categoryCount: 4,
  });
  assert.equal(state.kind, "not-found");
});

test("a requested page beyond a known totalPages is not-found", () => {
  const state = resolveBlogCategoryPageState({
    page: 99,
    totalPages: 3,
    postsCount: 0,
    categoryCount: 4,
  });
  assert.equal(state.kind, "not-found");
});

test("page 1 with totalPages=0 is the empty-category state, not not-found", () => {
  const state = resolveBlogCategoryPageState({
    page: 1,
    totalPages: 0,
    postsCount: 0,
    categoryCount: 0,
  });
  assert.equal(state.kind, "empty");
});

test("a valid page within range renders normally", () => {
  const state = resolveBlogCategoryPageState({
    page: 2,
    totalPages: 3,
    postsCount: 12,
    categoryCount: 30,
  });
  assert.equal(state.kind, "ok");
});

test("blog category archive resolves out-of-range pages via the shared helper in both generateMetadata and the page component (no duplicated ad hoc range check)", () => {
  assert.ok(blogCategorySrc.includes("resolveBlogCategoryPageState"));
  const occurrences = blogCategorySrc.split("resolveBlogCategoryPageState(").length - 1;
  assert.ok(
    occurrences >= 2,
    "expected resolveBlogCategoryPageState to be called from both generateMetadata and the page component"
  );
});

test("BlogPostCard keeps post + category links unprefixed (Slovak-only blog surface, reused from /cs and /hu)", () => {
  assert.ok(cardSrc.includes("href={`/blog/${post.slug}`}"));
  assert.ok(cardSrc.includes("/blog/kategoria/${"));
});

test("the /cs and /hu blog listing still shows the Slovak-only content note and reuses the shared card", () => {
  assert.ok(blogListSrc.includes("slovakContentNote"));
  assert.ok(blogListSrc.includes("<BlogPostCard"));
});
