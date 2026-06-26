import { useState, useMemo, useEffect } from "react";
import { ShopHeader } from "@/sections/ShopHeader";
import { ProductFilters } from "@/sections/ProductFilters";
import { ProductGrid } from "@/sections/ProductGrid";
import { Footer } from "@/components/Footer";
import { products } from "@/data/products";
import type { FragranceFamily } from "@/types";
import { useLanguageStore } from "@/stores/useLanguageStore";

export function ShopPage() {
  const [filter, setFilter] = useState<FragranceFamily | "all">("all");
  const { lang } = useLanguageStore();

  useEffect(() => {
    document.title = lang === "ar"
      ? "تسوق العطور — NESMA Perfumes"
      : "Shop Perfumes — NESMA Perfumes";
    return () => {
      document.title = "NESMA Perfumes — عطور عربية فاخرة | Feel the Breeze";
    };
  }, [lang]);

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.fragranceFamily === filter);
  }, [filter]);

  return (
    <>
      <ShopHeader />
      <div className="bg-ivory min-h-screen">
        <ProductFilters
          activeFilter={filter}
          onFilterChange={setFilter}
          count={filteredProducts.length}
        />
        <div className="container-main py-10 pb-20">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
      <Footer />
    </>
  );
}
