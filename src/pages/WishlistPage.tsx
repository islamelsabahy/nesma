import { useMemo, useEffect } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { products } from "@/data/products";
import { useWishlistStore } from "@/stores/useWishlistStore";

export function WishlistPage() {
  const { t, lang } = useLanguage();
  const { productIds } = useWishlistStore();

  useEffect(() => {
    document.title = lang === "ar"
      ? "قائمة الأمنيات — NESMA Perfumes"
      : "Wishlist — NESMA Perfumes";
    return () => {
      document.title = "NESMA Perfumes — عطور عربية فاخرة | Feel the Breeze";
    };
  }, [lang]);

  const wishlistedProducts = useMemo(
    () => products.filter((p) => productIds.includes(p.id)),
    [productIds]
  );

  return (
    <>
      <div className="pt-24 pb-20 bg-ivory min-h-screen">
        <div className="container-main">
          <div className="text-center mb-12">
            <Heart size={32} className="text-gold mx-auto mb-4" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-oud">
              {lang === "ar" ? "قائمة الأمنيات" : "My Wishlist"}
            </h1>
            <p className="text-oud/60 mt-2">
              {wishlistedProducts.length}{" "}
              {lang === "ar" ? "منتج محفوظ" : `product${wishlistedProducts.length !== 1 ? "s" : ""} saved`}
            </p>
          </div>

          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-20">
              <Heart size={48} className="text-gold/30 mx-auto mb-4" />
              <p className="text-oud/50 text-lg font-display">
                {lang === "ar" ? "قائمة الأمنيات فارغة" : "Your wishlist is empty"}
              </p>
              <p className="text-oud/40 mt-2 text-sm">
                {lang === "ar"
                  ? "اضغط على القلب على أي منتج لحفظه هنا"
                  : "Tap the heart on any product to save it here"}
              </p>
              <Link
                to="/shop"
                className="inline-block mt-6 px-8 py-3 bg-gold text-oud font-bold rounded hover:bg-[#B89850] transition-colors"
              >
                {lang === "ar" ? "تصفح العطور" : "Browse Perfumes"}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
              {wishlistedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
