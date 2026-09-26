const WP_BASE = "https://skinderma.sk";

/**
 * Increments and fetches the view count for a blog post from the
 * WordPress view-tracking endpoint. Fails closed: resolves to null (never
 * throws or rejects) for a non-2xx response, a malformed body, or a body
 * whose `views` field is missing or not a finite number, so a broken or
 * unavailable endpoint never crashes article rendering.
 */
export async function fetchPostViewCount(postId: number): Promise<number | null> {
  try {
    const res = await fetch(`${WP_BASE}/wp-json/skinderma/v1/views/${postId}`, {
      method: "POST",
    });
    if (!res.ok) return null;
    const data = await res.json();
    const views = data?.views;
    return typeof views === "number" && Number.isFinite(views) ? views : null;
  } catch {
    return null;
  }
}
