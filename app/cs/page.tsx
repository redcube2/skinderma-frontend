import HomePage from "@/components/pages/HomePage";

/**
 * Czech home page (/cs). Localised <title>/description/canonical/hreflang are
 * emitted by the root app/layout.tsx generateMetadata for the home route.
 */
export default function Page() {
  return <HomePage locale="cs" />;
}
