"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { MenuItem } from "./Navbar";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import type { Locale } from "@/lib/i18n/config";

type Props = {
  items: MenuItem[];
  locale: Locale;
  segment: string;
  langLabel: string;
  openLabel: string;
  closeLabel: string;
  cartLabel: string;
  homeAria: string;
};

export default function MobileMenu({
  items,
  locale,
  segment,
  langLabel,
  openLabel,
  closeLabel,
  cartLabel,
  homeAria,
}: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const menu = items;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const drawer = open ? (
    <div style={{ position: "fixed", inset: 0, zIndex: 99999 }}>
      {/* Overlay */}
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)" }}
        onClick={() => setOpen(false)}
      />
      {/* Panel */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0,
        width: "85%", maxWidth: "360px",
        background: "#fff", overflowY: "auto",
        padding: "24px 20px", display: "flex", flexDirection: "column",
        boxShadow: "-4px 0 24px rgba(0,0,0,0.15)"
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
          <Link href={menu[0]?.href ?? "/"} aria-label={homeAria} onClick={() => setOpen(false)}>
            <Image
              src="https://skinderma.sk/wp-content/uploads/2025/07/Logo-skinderma-cabecera-3.webp"
              alt="Skinderma" width={150} height={38}
              style={{ height: "38px", width: "auto" }}
            />
          </Link>
          <button aria-label={closeLabel} onClick={() => setOpen(false)} style={{
            border: "none", background: "none", cursor: "pointer",
            padding: "8px", color: "#000000"
          }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {menu.map((item) => (
            <div key={item.href}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {item.external ? (
                  <a
                    href={item.href}
                    onClick={() => !item.children && setOpen(false)}
                    style={{
                      flex: 1, padding: "12px 12px", borderRadius: "8px",
                      fontSize: "15px", fontWeight: 600, color: "#000000",
                      textDecoration: "none", display: "block"
                    }}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => !item.children && setOpen(false)}
                    style={{
                      flex: 1, padding: "12px 12px", borderRadius: "8px",
                      fontSize: "15px", fontWeight: 600, color: "#000000",
                      textDecoration: "none", display: "block"
                    }}
                  >
                    {item.label}
                  </Link>
                )}
                {item.children && (
                  <button
                    onClick={() => setExpanded(expanded === item.href ? null : item.href)}
                    style={{
                      border: "none", background: "none", cursor: "pointer",
                      padding: "8px", color: "#000000"
                    }}
                  >
                    <svg
                      width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                      style={{ transform: expanded === item.href ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
              {item.children && expanded === item.href && (
                <div style={{ marginLeft: "12px", paddingLeft: "12px", borderLeft: "2px solid #e2e2cf" }}>
                  {item.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      style={{
                        display: "block", padding: "9px 12px", borderRadius: "6px",
                        fontSize: "13px", color: "#646467", textDecoration: "none"
                      }}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e2e2cf" }}>
          <LanguageSwitcher
            locale={locale}
            segment={segment}
            label={langLabel}
            variant="menu"
            onNavigate={() => setOpen(false)}
          />
        </div>

        <a href="/kosik" style={{
          marginTop: "auto", paddingTop: "24px", display: "block",
          background: "#000000", color: "#fff", textAlign: "center",
          padding: "14px", fontWeight: 600, fontSize: "14px",
          textDecoration: "none", borderRadius: "4px"
        }}>
          {cartLabel}
        </a>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        aria-label={openLabel}
        onClick={() => setOpen(true)}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          padding: "8px", borderRadius: "6px", border: "1.5px solid #000000",
          background: "#f5f5f5", cursor: "pointer", color: "#000000"
        }}
        className="xl:hidden"
      >
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {mounted && createPortal(drawer, document.body)}
    </>
  );
}
