"use client";
import Link from "next/link";

import { BUTTON_SIZES, BUTTON_VARIANTS, ROUTES } from "@config/constants";
import Button from "@design-system/buttons/Button";

import AboutSectionView from "./AboutSectionView";
import { useAboutSection } from "./useAboutSection";

import styles from "./AboutSection.module.scss";

const AboutSection = () => {
  const { aboutContent, error, isLoading, onLearnMoreClick } = useAboutSection();

  return (
    <AboutSectionView
      aboutContent={aboutContent}
      isLoading={isLoading}
      error={error}
      styles={styles}
      Link={Link}
      Button={Button}
      BUTTON_VARIANTS={BUTTON_VARIANTS}
      BUTTON_SIZES={BUTTON_SIZES}
      ROUTES={ROUTES}
      onLearnMoreClick={onLearnMoreClick}
    />
  );
};

export default AboutSection;

AboutSection.displayName = "AboutSection";
AboutSection.View = AboutSectionView;
AboutSection.useAboutSection = useAboutSection;
