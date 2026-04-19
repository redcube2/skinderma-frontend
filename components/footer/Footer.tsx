import Link from "next/link";

const productLinks = [
  { href: "/produkty", label: "Všetky produkty" },
  { href: "/kategoria/peelingy", label: "Peelingy" },
  { href: "/kategoria/sera", label: "Séra" },
];

const companyLinks = [
  { href: "/o-nas", label: "O nás" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

const legalLinks = [
  { href: "https://skinderma.sk/reklamacny-poriadok", label: "Reklamačný poriadok" },
  { href: "https://skinderma.sk/obchodne-podmienky", label: "Obchodné podmienky" },
  { href: "https://skinderma.sk/ochrana-osobnych-udajov", label: "Ochrana osobných údajov" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-navy text-cream">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="text-2xl font-bold tracking-[0.2em] text-gold">SKINDERMA</div>
          <p className="mt-4 max-w-xs text-sm text-cream/80">
            Lekárska kozmetika pre profesionálov aj domáce použitie. GMP certifikované
            produkty distribuované do 50+ krajín sveta.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.instagram.com/skinderma.sk"
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.9.3 2.3.4.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.4.3 1.1.4 2.3.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.9-.4 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.3-2.3.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.9-.3-2.3-.4-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.9.4-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1 .1-1.6.2-2 .4-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.2.3-.3.9-.4 2-.1 1.2-.1 1.5-.1 4.6s0 3.5.1 4.7c.1 1 .2 1.6.4 2 .2.5.4.8.8 1.2.4.4.7.6 1.2.8.4.2.9.3 2 .4 1.2.1 1.5.1 4.6.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.4.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-.9.4-2 .1-1.2.1-1.5.1-4.6s0-3.5-.1-4.7c-.1-1-.2-1.6-.4-2-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-.9-.3-2-.4-1.2-.1-1.5-.1-4.6-.1zm0 3.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 1.8a3.1 3.1 0 100 6.2 3.1 3.1 0 000-6.2zm5.1-2.3a1.2 1.2 0 110 2.3 1.2 1.2 0 010-2.3z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/skinderma.sk"
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cream/30 text-cream transition-colors hover:border-gold hover:text-gold"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.2-1.5 1.5-1.5h1.6V4.4a21.6 21.6 0 00-2.4-.1c-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.3V21h3.2z" />
              </svg>
            </a>
          </div>
        </div>

        <FooterColumn title="Produkty" links={productLinks} />
        <FooterColumn title="Spoločnosť" links={companyLinks} />
        <FooterColumn title="Dokumenty" links={legalLinks} external />
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-sm text-cream/60 md:flex-row">
          <span>© {new Date().getFullYear()} Skinderma. Všetky práva vyhradené.</span>
          <span>Lekárska kozmetika • GMP certifikované</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  external = false,
}: {
  title: string;
  links: { href: string; label: string }[];
  external?: boolean;
}) {
  return (
    <div>
      <h3 className="mb-4 font-semibold uppercase tracking-wider text-cream">
        {title}
      </h3>
      <ul className="space-y-2 text-sm">
        {links.map((l) =>
          external ? (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-cream/80 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ) : (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-cream/80 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
