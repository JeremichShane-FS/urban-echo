"use client";

import HeroSectionView from "./HeroSectionView";
import { useHeroSection } from "./useHeroSection";

const HeroSection = () => {
  const { error, handleCtaClick, heroData, isLoading } = useHeroSection();

  return (
    <HeroSectionView
      heroData={heroData}
      error={error}
      isLoading={isLoading}
      onCtaClick={handleCtaClick}
    />
  );
};

export default HeroSection;

HeroSection.displayName = "HeroSection";
HeroSection.View = HeroSectionView;
HeroSection.useHeroSection = useHeroSection;
