"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { menu } from "./Navbar";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

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
        className="inline-flex items-center justify-center rounded-md p-2 text-navy lg:hidden"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-4/5 max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} aria-label="Skinderma – domov">
                <Image
                  src="https://skinderma.sk/wp-content/uploads/2025/07/Logo-skinderma-cabecera-3.webp"
                  alt="Skinderma"
                  width={140}
                  height={36}
                  className="h-9 w-auto"
                />
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {menu.map((item) => (
                <div key={item.href}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex-1 rounded-md px-3 py-3 text-base font-medium text-navy hover:bg-cream"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-label="Rozbaliť podmenu"
                        onClick={() =>
                          setExpanded(expanded === item.href ? null : item.href)
                        }
                        className="rounded-md p-2 text-navy hover:bg-cream"
                      >
                        <svg
                          className={`h-4 w-4 transition-transform ${
                            expanded === item.href ? "rotate-180" : ""
                          }`}
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
                      </button>
                    )}
                  </div>
                  {item.children && expanded === item.href && (
                    <div className="ml-3 flex flex-col border-l border-cream-dark/60 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="rounded-md px-3 py-2 text-sm text-brand-gray hover:bg-cream hover:text-gold"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <a href="https://skinderma.sk/kosik" className="btn-gold mt-6 w-full">
              Košík
            </a>
          </div>
        </div>
      )}
    </>
  );
}
