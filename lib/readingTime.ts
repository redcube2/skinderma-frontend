export function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = text.split(" ").filter((w) => w.length > 0).length;
  return Math.max(1, Math.ceil(words / 200));
}
