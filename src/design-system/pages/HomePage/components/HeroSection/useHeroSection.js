/**
 * @fileoverview Custom hook for managing hero section state and user interaction analytics
 * Provides hero content data fetching and click tracking for call-to-action button interactions
 * Integrates with content management system and Google Analytics for conversion tracking
 */

import { useHeroContent } from "@modules/core/hooks";
import { trackClick } from "@modules/core/utils";

/**
 * Hook for managing hero section state and call-to-action click tracking
 * @hook
 * @returns {Object} Hero section state management and interaction handlers
 * @returns {Object} returns.heroData - Hero content data with title, subtitle, CTA, and background image
 * @returns {Object|null} returns.error - Error object if content loading fails
 * @returns {boolean} returns.isLoading - Loading state indicator for content fetching
 * @returns {Function} returns.handleCtaClick - Analytics handler for call-to-action button clicks
 */
const useHeroSection = () => {
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

export default useHeroSection;
