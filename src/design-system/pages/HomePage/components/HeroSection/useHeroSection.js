import { useHeroContent } from "@modules/core/hooks";
import { trackClick } from "@modules/core/utils";

/**
 * Business logic hook for managing hero section state and analytics
 * @returns {Object} Hook state and handlers
 */
export const useHeroSection = () => {
  const { data: heroData, error, isLoading } = useHeroContent();

  const handleCtaClick = () => {
    trackClick("Hero", "Shop Now Button");
  };

  return {
    heroData,
    error,
    isLoading,
    handleCtaClick,
  };
};
