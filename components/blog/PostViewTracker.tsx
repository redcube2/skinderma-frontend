"use client";
import { useEffect, useState } from "react";

const WP_BASE = "https://skinderma.sk";

export function PostViewTracker({ postId }: { postId: number }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${WP_BASE}/wp-json/skinderma/v1/views/${postId}`, { method: "POST" })
      .then((r) => r.json())
      .then((data) => setViews(data.views))
      .catch(() => null);
  }, [postId]);

  if (views === null) return null;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        color: "#646467",
        fontSize: 13,
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      {views.toLocaleString("sk-SK")} zobrazení
    </span>
  );
}
