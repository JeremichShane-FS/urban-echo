/**
 * @fileoverview About section component for homepage showcasing company values and mission
 * Provides engaging company overview with call-to-action for detailed about page navigation
 * Integrates with content management system for dynamic about content and analytics tracking
 */

"use client";
import Link from "next/link";

import { BUTTON_SIZES, BUTTON_VARIANTS, ROUTES } from "@config/constants";
import Button from "@design-system/buttons/Button";

import AboutSectionView from "./AboutSectionView";
import useAboutSection from "./useAboutSection";

import styles from "./AboutSection.module.scss";

/**
 * Container component for homepage about section with content management and analytics integration
 * @component
 * @returns {JSX.Element} Rendered about section with company information and navigation link
 */
const AboutSection = () => {
  const { aboutContent, error, isLoading, onLearnMoreClick } = useAboutSection();

  return (
    <AboutSectionView
      BUTTON_SIZES={BUTTON_SIZES}
      BUTTON_VARIANTS={BUTTON_VARIANTS}
      Button={Button}
      Link={Link}
      ROUTES={ROUTES}
      aboutContent={aboutContent}
      error={error}
      isLoading={isLoading}
      styles={styles}
      onLearnMoreClick={onLearnMoreClick}
    />
  );
};

export default AboutSection;

AboutSection.displayName = "AboutSection";
AboutSection.View = AboutSectionView;
AboutSection.useAboutSection = useAboutSection;
