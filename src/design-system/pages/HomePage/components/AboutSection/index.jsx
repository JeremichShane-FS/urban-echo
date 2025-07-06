"use client";

import AboutSectionView from "./AboutSectionView";
import { useAboutSection } from "./useAboutSection";

const AboutSection = () => {
  const { aboutContent, error, isLoading, onLearnMoreClick } = useAboutSection();

  return (
    <AboutSectionView
      aboutContent={aboutContent}
      isLoading={isLoading}
      error={error}
      onLearnMoreClick={onLearnMoreClick}
    />
  );
};

export default AboutSection;

AboutSection.displayName = "AboutSection";
AboutSection.View = AboutSectionView;
AboutSection.useAboutSection = useAboutSection;
