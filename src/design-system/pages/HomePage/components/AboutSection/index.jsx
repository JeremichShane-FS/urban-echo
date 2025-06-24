"use client";

import { useAboutContent } from "@modules/content/hooks/useAboutContent";

import AboutSectionView from "./AboutSectionView";

const AboutSection = () => {
  const { aboutContent, error, loading } = useAboutContent("homepage");

  if (loading) {
    return <div>Loading about content...</div>;
  }

  if (error) {
    return <div>Error loading about content: {error}</div>;
  }

  if (!aboutContent) {
    return <div>No about content found.</div>;
  }

  const handleLearnMoreClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "About Section",
        event_label: "Learn More About Us",
      });
    }
  };

  return (
    <AboutSectionView
      aboutContent={aboutContent}
      isLoading={loading}
      onLearnMoreClick={handleLearnMoreClick}
    />
  );
};

export default AboutSection;
