"use client";
import Image from "next/image";
import Link from "next/link";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "@config/constants";
import { Button } from "@design-system/buttons";

import HeroSectionView from "./HeroSectionView";
import { useHeroSection } from "./useHeroSection";

import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  const { error, handleCtaClick, heroData, isLoading } = useHeroSection();

  return (
    <HeroSectionView
      heroData={heroData}
      error={error}
      isLoading={isLoading}
      BUTTON_SIZES={BUTTON_SIZES}
      BUTTON_VARIANTS={BUTTON_VARIANTS}
      Button={Button}
      Link={Link}
      styles={styles}
      Image={Image}
      onCtaClick={handleCtaClick}
    />
  );
};

export default HeroSection;

HeroSection.displayName = "HeroSection";
HeroSection.View = HeroSectionView;
HeroSection.useHeroSection = useHeroSection;
