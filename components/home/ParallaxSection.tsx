"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type ParallaxDict = {
  eyebrow: string;
  titleLines: string[];
  cta: string;
  imageAlt: string;
};

export default function ParallaxSection({ dict }: { dict?: ParallaxDict }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  const eyebrow = dict?.eyebrow ?? "Klinická formulácia";
  const titleLines = dict?.titleLines ?? ["Veda sa stretáva", "s pokožkou"];
  const cta = dict?.cta ?? "Preskúmať kolekciu";
  const imageAlt = dict?.imageAlt ?? "Clinical formula";

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visibleCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
      // Pomalý parallax posun
      setOffset(-visibleCenter * 0.2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[500px] overflow-hidden bg-black"
    >
      <div
        className="absolute -inset-x-0 -inset-y-[20%] will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <Image
          src="https://skinderma.sk/wp-content/uploads/2025/09/ampolas.jpg"
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-[1] flex h-full items-center justify-center px-6 text-center">
        <div>
          <p className="mb-6 text-[11px] uppercase tracking-[0.4em] text-[#b0b0b0]">
            {eyebrow}
          </p>
          <h2 className="mb-10 text-[clamp(36px,5vw,72px)] font-light leading-[1.15] text-white">
            {titleLines.map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <Link
            href="/produkty"
            className="border-b border-white pb-1 text-[11px] uppercase tracking-[0.3em] text-white transition-opacity hover:opacity-70"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
