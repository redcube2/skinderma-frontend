/**
 * Passthrough segment layout for the Hungarian (/hu) content subtree.
 * See app/cs/layout.tsx for the rationale.
 */
export default function HuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
