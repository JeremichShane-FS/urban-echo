"use client";

<<<<<<< HEAD
import { useAboutContent } from "@lib/hooks/useContent";
=======
import { useAboutContent } from "@modules/content/hooks/useAboutContent";
>>>>>>> origin/main

import AboutSectionView from "./AboutSectionView";

const AboutSection = () => {
<<<<<<< HEAD
  const { data: aboutContent, error, isLoading: loading } = useAboutContent();
=======
  const { aboutContent, error, loading } = useAboutContent("homepage");
>>>>>>> origin/main

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
