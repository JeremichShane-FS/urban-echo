import { useCallback } from "react";

import { useAboutContent } from "@modules/core/hooks";
import { trackClick } from "@modules/core/utils";

/**
 * Business logic hook for About Section component
 * @returns {Object} Hook state and handlers
 */
export const useAboutSection = () => {
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
