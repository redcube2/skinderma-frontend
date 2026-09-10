/**
 * Passthrough segment layout for the Czech (/cs) content subtree.
 *
 * `<html lang>` and the localised metadata are handled by the root
 * app/layout.tsx via the middleware locale header, so this layout only needs
 * to forward its children. It exists so the /cs segment has an explicit
 * boundary and to keep parity with a possible future cs-only shell.
 */
export default function CsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
