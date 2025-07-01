"use client";

<<<<<<< HEAD
import { useHeroContent } from "@lib/hooks/useContent";
=======
import { useHeroContent } from "@modules/content/hooks/useHeroContent";
>>>>>>> origin/main

import HeroSectionView from "./HeroSectionView";

const HeroSection = () => {
<<<<<<< HEAD
  const { data: heroData, error, isLoading: loading } = useHeroContent();
=======
  const { error, heroData, loading } = useHeroContent();
>>>>>>> origin/main

  const handleCtaClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "Hero",
        event_label: "Shop Now Button",
      });
    }
  };

  return (
    <HeroSectionView
      heroData={heroData}
      isLoading={loading}
      error={error}
      onCtaClick={handleCtaClick}
    />
  );
};

export default HeroSection;

HeroSection.displayName = "HeroSection";
HeroSection.View = HeroSectionView;
HeroSection.useHeroContent = useHeroContent;
