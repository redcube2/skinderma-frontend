import Link from "next/link";
import MobileMenu from "./MobileMenu";

const links = [
  { href: "/produkty", label: "Produkty" },
  { href: "/kategoria/peelingy", label: "Peelingy" },
  { href: "/o-nas", label: "O nás" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-cream-dark/60 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-[0.2em] text-gold"
          aria-label="Skinderma – domov"
        >
          SKINDERMA
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-navy transition-colors hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://skinderma.sk/kosik"
            aria-label="Košík"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-cream"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.5l1.5 12.75a1.5 1.5 0 001.5 1.35h9.75a1.5 1.5 0 001.48-1.23L19.5 6h-14"
              />
              <circle cx="9" cy="20" r="1.25" />
              <circle cx="17" cy="20" r="1.25" />
            </svg>
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
