import { useEffect, useState } from "react";

import { getHeroImageUrl } from "../utils/imageUtils";

// TODO: Develop Component - Dynamic hero content API integration (Version 2 for post-MVP) (Updated v5)
// Implement API call to fetch hero content from CMS backend.
// Version 2 Requirements:
// - Error handling with retry logic
// - Dynamic title and subtitle management
// - Seasonal campaign content support
// - A/B testing variations for conversion optimization

const data = {
  backgroundImage:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
};

export const useHeroContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    backgroundImage: null,
  });

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        // Simulate API delay for now
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoading(true);

        // TODO: Develop Component - Dynamic hero content API integration (Version 2 for post-MVP) (Updated v5)
        // Implement API call to fetch hero content from CMS backend.
        // Version 2 Requirements:
        // - Error handling with retry logic
        // - Loading states for better UX
        // - Cache content for improved performance
        // - Support for multiple hero variants (A/B testing)

        setHeroData({
          title: "Discover Your Urban Style",
          subtitle: "Trendy, high-quality clothing for the modern, fashion-conscious consumer",
          ctaText: "Shop Now",
          ctaLink: "/shop",
          backgroundImage: getHeroImageUrl(data.backgroundImage, 1200, 600),
        });
      } catch (err) {
        console.error("Error fetching hero content:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  const handleCtaClick = () => {
    // Track analytics event for hero CTA click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "Hero",
        event_label: "Shop Now Button",
      });
    }
  };

  return {
    isLoading,
    heroData,
    onCtaClick: handleCtaClick,
  };
};

export const useAboutContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [aboutContent, setAboutContent] = useState({
    title: "",
    paragraphs: [],
    ctaText: "Learn More About Us",
    ctaLink: "/about",
  });

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        // Simulate API delay for now
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoading(true);

        // TODO: Define Routes - About content in management API (Updated v5)
        // Create a API endpoint for dynamic about section content.
        // Backend requirements:
        // - GET /api/content/about (fetch about content)
        // - Support for rich text/markdown content
        // - Version control for content updates

        setAboutContent({
          title: "About Urban Echo",
          paragraphs: [
            "Urban Echo is your destination for contemporary fashion that speaks to the modern lifestyle. We curate high-quality clothing that combines style, comfort, and sustainability. Our mission is to help you express your unique personality through carefully selected pieces that echo your urban spirit and contemporary taste.",
            "From trendy streetwear to sophisticated business attire, we offer a diverse collection that caters to every aspect of your life. Discover fashion that not only looks good but feels good and does good for the world.",
          ],
          ctaText: "Learn More About Us",
          ctaLink: "/about",
        });
      } catch (err) {
        console.error("Error fetching about content:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  const handleLearnMoreClick = () => {
    // Track analytics event for learn more click
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "About Section",
        event_label: "Learn More About Us",
      });
    }
  };

  return {
    isLoading,
    aboutContent,
    onLearnMoreClick: handleLearnMoreClick,
  };
};
