"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "/produkty", label: "Produkty" },
  { href: "/kategoria/peelingy", label: "Peelingy" },
  { href: "/o-nas", label: "O nás" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Otvoriť menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-md p-2 text-navy md:hidden"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-navy/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-4/5 max-w-xs flex-col bg-white p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-bold text-xl tracking-wide text-gold"
              >
                SKINDERMA
              </Link>
              <button
                type="button"
                aria-label="Zatvoriť menu"
                onClick={() => setOpen(false)}
                className="rounded-md p-2 text-navy"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-lg font-medium text-navy hover:bg-cream"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <a
              href="https://skinderma.sk/kosik"
              className="btn-gold mt-6 w-full"
            >
              Košík
            </a>
          </div>
        </div>
      )}
    </>
  );
}
