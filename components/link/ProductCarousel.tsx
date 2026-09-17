"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { carouselProducts } from "@/lib/link-hub";
import styles from "@/app/link/link.module.css";

const intervalMs = 6000;
const advance = (index: number, direction: number) =>
  (index + direction + carouselProducts.length) % carouselProducts.length;

export default function ProductCarousel() {
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isPlaying = mounted && !userPaused && !hovered && !focusWithin && !hidden;

  const selectProduct = (index: number) => {
    setActive(index);
    setUserPaused(true);
  };
  const moveProduct = (direction: number) => {
    setActive((current) => advance(current, direction));
    setUserPaused(true);
  };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateVisibility = () => setHidden(document.hidden);
    const updateMotion = () => { if (media.matches) setUserPaused(true); };
    setMounted(true);
    updateVisibility();
    updateMotion();
    if (!media.matches) setUserPaused(false);
    document.addEventListener("visibilitychange", updateVisibility);
    media.addEventListener("change", updateMotion);
    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
      media.removeEventListener("change", updateMotion);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => setActive((current) => advance(current, 1)), intervalMs);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    setUserPaused(true);
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const x = touch.clientX - start.x;
    const y = touch.clientY - start.y;
    if (Math.abs(x) > 40 && Math.abs(x) > Math.abs(y)) moveProduct(x < 0 ? 1 : -1);
  };
  const product = carouselProducts[active];

  return <section className={styles.carousel} aria-label="Produkty Skinderma" aria-roledescription="carousel" aria-live={isPlaying ? "off" : "polite"} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocus={() => setFocusWithin(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false); }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    <div className={styles.carouselHeader}><h2>Produkty Skinderma</h2><div className={styles.controls}>
      <button type="button" className={styles.control} onClick={() => moveProduct(-1)} aria-label="Predchádzajúci produkt">←</button>
      <button type="button" className={`${styles.control} ${styles.play}`} onClick={() => setUserPaused((paused) => !paused)} aria-label={userPaused ? "Spustiť automatické posúvanie" : "Pozastaviť automatické posúvanie"}>{userPaused ? "Spustiť" : "Pozastaviť"}</button>
      <button type="button" className={styles.control} onClick={() => moveProduct(1)} aria-label="Ďalší produkt">→</button>
    </div></div>
    <article className={styles.slide} aria-label={`${active + 1} z ${carouselProducts.length}`}>
      <a href={product.href} className={styles.imageLink}><Image className={styles.productImage} src={product.image} alt={product.alt} width={product.width} height={product.height} sizes="(max-width: 380px) 100vw, 270px" /></a>
      <div className={styles.productBody}><h3>{product.name}</h3><p>{product.description}</p><a href={product.href} className={styles.productLink}>Objaviť produkt</a></div>
    </article>
    <div className={styles.pagination} aria-label="Výber produktu">{carouselProducts.map((item, index) => <button key={item.id} type="button" className={`${styles.paginationButton} ${index === active ? styles.paginationButtonActive : ""}`} aria-label={`Zobraziť ${item.name}`} aria-current={index === active ? "true" : undefined} onClick={() => selectProduct(index)}>{index + 1}</button>)}</div>
  </section>;
}
