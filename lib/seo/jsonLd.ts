/**
 * Serializes a value for embedding in a `<script type="application/ld+json">`
 * tag via `dangerouslySetInnerHTML`. Escapes every `<` so the JSON payload can
 * never contain a literal `</script>` (or any other tag) and break out of the
 * script element.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
