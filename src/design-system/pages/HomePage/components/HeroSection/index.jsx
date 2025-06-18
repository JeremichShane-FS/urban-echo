"use client";

import { useHeroContent } from "@/modules/core/hooks/useHomeContent";

import HeroSectionView from "./HeroSectionView";

const HeroSection = () => {
  const heroProps = useHeroContent();

  return <HeroSectionView {...heroProps} />;
};

export default HeroSection;
