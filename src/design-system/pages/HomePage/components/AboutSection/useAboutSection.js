/**
 * @fileoverview Custom hook for managing about section state and user interaction analytics
 * Provides about content data fetching and click tracking for learn more button interactions
 * Integrates with content management system and Google Analytics for engagement metrics
 */

import { useCallback } from "react";

import { useAboutContent } from "@modules/core/hooks";
import { trackClick } from "@modules/core/utils";

/**
 * Hook for managing about section state and user interaction tracking
 * @hook
 * @returns {Object} About section state management and interaction handlers
 * @returns {Object} returns.aboutContent - About content data with title, description, and company information
 * @returns {boolean} returns.isLoading - Loading state indicator for content fetching
 * @returns {Object|null} returns.error - Error object if content loading fails
 * @returns {Function} returns.onLearnMoreClick - Memoized analytics handler for learn more button clicks
 */
const useAboutSection = () => {
  const { data: aboutContent, error, isLoading } = useAboutContent();

  const handleLearnMoreClick = useCallback(() => {
    trackClick("About Section", "Learn More About Us");
  }, []);

  return {
    aboutContent,
    isLoading,
    error,
    onLearnMoreClick: handleLearnMoreClick,
  };
};

export default useAboutSection;
