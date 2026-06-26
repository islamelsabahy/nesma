import { HeroSection } from "@/sections/HeroSection";
import { OurStorySection } from "@/sections/OurStorySection";
import { BestSellersSection } from "@/sections/BestSellersSection";
import { IngredientSection } from "@/sections/IngredientSection";
import { BlendingSection } from "@/sections/BlendingSection";
import { PackagingSection } from "@/sections/PackagingSection";
import { GiftSetsSection } from "@/sections/GiftSetsSection";
import { WhyChooseSection } from "@/sections/WhyChooseSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { NewsletterSection } from "@/sections/NewsletterSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <OurStorySection />
      <BestSellersSection />
      <IngredientSection />
      <BlendingSection />
      <PackagingSection />
      <GiftSetsSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
