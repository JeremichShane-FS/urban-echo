"use client";

import { useAboutContent } from "@modules/core/hooks/useHomeContent";

import AboutSectionView from "./AboutSectionView";

const AboutSection = () => {
  const aboutSectionProps = useAboutContent();

  return <AboutSectionView {...aboutSectionProps} />;
};

export default AboutSection;

AboutSection.displayName = "AboutSection";
AboutSection.View = AboutSectionView;
AboutSection.useAboutContent = useAboutContent;
