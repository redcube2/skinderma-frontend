"use client";
import { useMemo, useState } from "react";
import type { WCCategory, WCProduct } from "@/types/woocommerce";
import ProductGrid from "./ProductGrid";

interface Props {
  products: WCProduct[];
  categories: WCCategory[];
}

export function ProductFilters({ products, categories }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<number | null>(null);
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.short_description || "")
            .replace(/<[^>]*>/g, "")
            .toLowerCase()
            .includes(q)
      );
    }

    if (selectedCat !== null) {
      result = result.filter((p) => {
        const cats = p.categories || [];
        return cats.some((c: { id: number }) => c.id === selectedCat);
      });
    }

    if (sort === "price_asc") {
      result.sort(
        (a, b) => parseFloat(a.price || "0") - parseFloat(b.price || "0")
      );
    } else if (sort === "price_desc") {
      result.sort(
        (a, b) => parseFloat(b.price || "0") - parseFloat(a.price || "0")
      );
    } else if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.date_created || 0).getTime() -
          new Date(a.date_created || 0).getTime()
      );
    }

    return result;
  }, [products, search, selectedCat, sort]);

  const relevantCats = categories.filter(
    (c) => c.count > 0 && c.slug !== "uncategorized"
  );

  const countLabel =
    filtered.length === 1
      ? "produkt"
      : filtered.length > 1 && filtered.length < 5
      ? "produkty"
      : "produktov";

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          marginBottom: 32,
          paddingBottom: 24,
          borderBottom: "1px solid #e8e4dc",
        }}
      >
        <div
          style={{
            position: "relative",
            flex: "1",
            minWidth: 200,
            maxWidth: 320,
          }}
        >
          <svg
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#646467",
            }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Hľadať produkt..."
            style={{
              width: "100%",
              padding: "10px 12px 10px 36px",
              border: "1px solid #e2e2cf",
              outline: "none",
              fontSize: 14,
              color: "#000",
              background: "#fff",
              fontFamily: "inherit",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Vymazať vyhľadávanie"
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "#646467",
                fontSize: 16,
              }}
            >
              ×
            </button>
          )}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Zoradenie produktov"
          style={{
            padding: "10px 16px",
            border: "1px solid #e2e2cf",
            fontSize: 13,
            color: "#646467",
            background: "#fff",
            fontFamily: "inherit",
            cursor: "pointer",
            outline: "none",
          }}
        >
          <option value="default">Odporúčané</option>
          <option value="price_asc">Cena: nižšia</option>
          <option value="price_desc">Cena: vyššia</option>
          <option value="newest">Najnovšie</option>
        </select>

        <span
          style={{
            color: "#646467",
            fontSize: 13,
            marginLeft: "auto",
          }}
        >
          {filtered.length} {countLabel}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 32,
        }}
      >
        <button
          onClick={() => setSelectedCat(null)}
          style={{
            padding: "6px 16px",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "inherit",
            border:
              selectedCat === null ? "1px solid #000" : "1px solid #e2e2cf",
            background: selectedCat === null ? "#000" : "#fff",
            color: selectedCat === null ? "#fff" : "#646467",
            transition: "all 0.15s",
          }}
        >
          Všetky
        </button>
        {categories.length === 0 && (
          <span
            style={{
              color: "#646467",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 4px",
            }}
          >
            Načítavam kategórie…
          </span>
        )}
        {relevantCats.map((cat) => (
          <button
            key={cat.id}
            onClick={() =>
              setSelectedCat(selectedCat === cat.id ? null : cat.id)
            }
            style={{
              padding: "6px 16px",
              fontSize: 11,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
              border:
                selectedCat === cat.id
                  ? "1px solid #000"
                  : "1px solid #e2e2cf",
              background: selectedCat === cat.id ? "#000" : "#fff",
              color: selectedCat === cat.id ? "#fff" : "#646467",
              transition: "all 0.15s",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: "#646467",
          }}
        >
          <p style={{ fontSize: 16, marginBottom: 16 }}>
            Žiadne produkty nevyhovujú vyhľadávaniu.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCat(null);
            }}
            style={{
              border: "1px solid #000",
              background: "none",
              padding: "10px 24px",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
              color: "#000",
            }}
          >
            Zrušiť filtre
          </button>
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
}
