import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { CartNavIcon } from "./CartNavIcon";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getRequestRoute } from "@/lib/i18n/request";
import { switchableSegment } from "@/lib/i18n/routes";

export type MenuItem = {
  href: string;
  label: string;
  /** Commerce / apex link — rendered as a plain anchor, never locale-prefixed. */
  external?: boolean;
  children?: { href: string; label: string; external?: boolean }[];
};

export function buildMenu(locale: Locale): MenuItem[] {
  const dict = getDictionary(locale);
  const p = (segment: string) => localizedPath(locale, segment);

  return [
    { href: p("/"), label: dict.nav.home },
    { href: "/obchod", label: dict.nav.shop, external: true },
    {
      href: "/product-category/starostlivost-o-plet",
      label: dict.nav.skincare,
      external: true,
      children: dict.nav.skincareChildren.map((c) => ({ ...c, external: true })),
    },
    {
      href: "/product-category/pre-profesionalov",
      label: dict.nav.forPros,
      external: true,
      children: dict.nav.forProsChildren.map((c) => ({ ...c, external: true })),
    },
    { href: p("/o-nas"), label: dict.nav.about },
    { href: p("/kontakt"), label: dict.nav.contact },
    { href: p("/blog"), label: dict.nav.news },
  ];
}

export default function Navbar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { segment } = getRequestRoute();
  const switchSegment = switchableSegment(segment);
  const menu = buildMenu(locale);
  const homeHref = localizedPath(locale, "/");

  return (
    <header className="sticky top-0 z-[100] border-b border-[#e2e2cf] bg-white">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href={homeHref} aria-label={dict.nav.homeAria} className="shrink-0 min-w-0">
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
          {menu.map((item) => {
            const triggerClass =
              "inline-flex items-center gap-1 text-sm font-semibold text-[#646467] transition-colors hover:text-black";
            const chevron = item.children ? (
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
            ) : null;

            return (
              <div key={item.href} className="group relative">
                {item.external ? (
                  <a href={item.href} className={triggerClass}>
                    {item.label}
                    {chevron}
                  </a>
                ) : (
                  <Link href={item.href} className={triggerClass}>
                    {item.label}
                    {chevron}
                  </Link>
                )}
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                    <div className="rounded-xl border border-[#e2e2cf] bg-white py-2 shadow-lg">
                      {item.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-[#646467] transition-colors hover:bg-[#f5f5f5] hover:text-black"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <LanguageSwitcher
              locale={locale}
              segment={switchSegment}
              label={dict.langSwitcher.label}
            />
          </div>
          <CartNavIcon />
          <MobileMenu
            locale={locale}
            segment={switchSegment}
            items={menu}
            langLabel={dict.langSwitcher.label}
            closeLabel={dict.nav.closeMenu}
            openLabel={dict.nav.openMenu}
            cartLabel={dict.nav.cartAria}
            homeAria={dict.nav.homeAria}
          />
        </div>
      </div>
    </header>
  );
}
