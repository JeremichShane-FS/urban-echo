import { useCallback, useEffect, useState } from "react";

import { heroContentService as data } from "@modules/content/services/hero-content-service";

export const useHeroContent = (options = {}) => {
  const { variant = "default" } = options;

  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    backgroundImage: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHeroContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const content = await data.getHeroContent({ variant });

      setHeroData({
        title: content.title,
        subtitle: content.subtitle,
        ctaText: content.ctaText,
        ctaLink: content.ctaLink,
        backgroundImage: content.backgroundImage,
        variant: content.variant || variant,
      });
    } catch (error_) {
      console.error("Failed to fetch hero content:", error_);
      setError(error_.message);
    } finally {
      setLoading(false);
    }
  }, [variant]);

  useEffect(() => {
    fetchHeroContent();
  }, [fetchHeroContent]);

  return {
    heroData,
    loading,
    error,
    refetch: fetchHeroContent,
  };
};
