"use client";

import { useHeroContent } from "@modules/content/hooks/useHeroContent";

import HeroSectionView from "./HeroSectionView";

const HeroSection = () => {
  const { error, heroData, loading } = useHeroContent();

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
