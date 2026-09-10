"use client";

import { useEffect, useRef, useState } from "react";

export function FadeInSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // The fade-in is a progressive enhancement — it must never be able to
    // leave content permanently invisible. Reveal immediately when we can't
    // (or shouldn't) animate on scroll.
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // threshold 0: reveal as soon as any part enters. A positive threshold
      // can never be satisfied for a block taller than viewport / threshold
      // (e.g. the product grid on a small phone), which would strand it hidden.
      { threshold: 0 }
    );
    observer.observe(el);

    // Safety net for contexts that never scroll the element into view:
    // full-page screenshots, crawlers / link-preview renderers, print,
    // reader mode, or a deep link jumped straight to an anchor.
    const fallback = window.setTimeout(() => setVisible(true), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
