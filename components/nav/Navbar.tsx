import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { CartNavIcon } from "./CartNavIcon";


type MenuItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const menu: MenuItem[] = [
  { href: "/", label: "Domov" },
  { href: "/produkty", label: "Obchod" },
  {
    href: "/kategoria/starostlivost-o-plet",
    label: "Starostlivosť o pleť",
    children: [
      { href: "/kategoria/pletove-kremy-a-pletove-emulzie", label: "Pleťové krémy a pleťové emulzie" },
      { href: "/kategoria/pletove-sera", label: "Pleťové séra" },
      { href: "/kategoria/opalovacia-a-fotoprotektivna-linia", label: "Opaľovacia a fotoprotektívna línia" },
      { href: "/kategoria/starostlivost-o-telo", label: "Starostlivosť o Telo" },
      { href: "/kategoria/nutrikozmetika", label: "Nutrikozmetika" },
      { href: "/kategoria/masky", label: "Masky" },
    ],
  },
  {
    href: "/kategoria/pre-profesionalov",
    label: "Pre profesionálov",
    children: [
      { href: "/kategoria/profesionalne-ampulky", label: "Profesionálne ampulky" },
      { href: "/kategoria/profesionalne-roztoky-vialky", label: "Profesionálne roztoky / vialky" },
      { href: "/kategoria/profesionalne-kombinacie", label: "Profesionálne kombinácie" },
      { href: "/kategoria/chemicke-peelingy", label: "Chemické peelingy" },
      { href: "/kategoria/kozmeticke-sety", label: "Kozmetické sety" },
      { href: "/kategoria/pletove-masky", label: "Pleťové masky" },
      { href: "/kategoria/exozomy", label: "Exozómy" },
    ],
  },
  { href: "/o-nas", label: "O Nás" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/blog", label: "Novinky" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-[100] border-b border-[#e2e2cf] bg-white">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="Skinderma – domov" className="shrink-0 min-w-0">
          <Image
            src="https://skinderma.sk/wp-content/uploads/2025/07/Logo-skinderma-cabecera-3.webp"
            alt="Skinderma"
            width={160}
            height={41}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {menu.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#646467] transition-colors hover:text-black"
              >
                {item.label}
                {item.children && (
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </Link>
              {item.children && (
                <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-[#e2e2cf] bg-white py-2 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-[#646467] transition-colors hover:bg-[#f5f5f5] hover:text-black"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartNavIcon />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
