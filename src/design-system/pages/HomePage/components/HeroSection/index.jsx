/**
 * @fileoverview Hero section component for homepage banner with call-to-action and background imagery
 * Provides prominent landing area with optimized images, compelling messaging, and shop navigation
 * Integrates with Next.js Image optimization and analytics tracking for conversion measurement
 */

"use client";
import Image from "next/image";
import Link from "next/link";

import { BUTTON_SIZES, BUTTON_VARIANTS } from "@config/constants";
import { Button } from "@design-system/buttons";

import HeroSectionView from "./HeroSectionView";
import useHeroSection from "./useHeroSection";

import styles from "./HeroSection.module.scss";

/**
 * Container component for homepage hero section with content management and analytics integration
 * @component
 * @returns {JSX.Element} Rendered hero section with background image, messaging, and call-to-action
 */
const HeroSection = () => {
  const { error, handleCtaClick, heroData, isLoading } = useHeroSection();

  return (
    <HeroSectionView
      BUTTON_SIZES={BUTTON_SIZES}
      BUTTON_VARIANTS={BUTTON_VARIANTS}
      Button={Button}
      Image={Image}
      Link={Link}
      error={error}
      heroData={heroData}
      isLoading={isLoading}
      styles={styles}
      onCtaClick={handleCtaClick}
    />
  );
};

export default HeroSection;

HeroSection.displayName = "HeroSection";
HeroSection.View = HeroSectionView;
HeroSection.useHeroSection = useHeroSection;
