export type BlogCategoryPageState =
  | { kind: "not-found" }
  | { kind: "empty" }
  | { kind: "ok" };

/**
 * Decides how a /blog/kategoria/{slug}?page=N request should resolve, given
 * what WordPress actually returned for that page.
 *
 * WP answers an out-of-range page with an HTTP 400
 * (rest_post_invalid_page_number) and no X-WP-TotalPages header at all, so
 * totalPages is 0 in that case too, not just for a genuinely empty category.
 * Any page beyond 1 with no valid page data (totalPages === 0) or beyond a
 * known totalPages is a broken link, never a legitimate "no posts" state,
 * and must resolve to "not-found" (a real 404, never an indexable soft-404)
 * regardless of how many posts the category otherwise has.
 *
 * Page 1 of a genuinely empty category is the one case that stays "empty"
 * (rendered, noindex) rather than 404.
 */
export function resolveBlogCategoryPageState(params: {
  page: number;
  totalPages: number;
  postsCount: number;
  categoryCount: number;
}): BlogCategoryPageState {
  const { page, totalPages, postsCount, categoryCount } = params;

  if (page > 1 && (totalPages === 0 || page > totalPages)) {
    return { kind: "not-found" };
  }

  if (categoryCount === 0 || (totalPages === 0 && postsCount === 0)) {
    return { kind: "empty" };
  }

  return { kind: "ok" };
}
