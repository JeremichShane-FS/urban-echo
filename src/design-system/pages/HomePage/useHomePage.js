/**
 * @fileoverview Custom hook for managing homepage state, analytics tracking, and section visibility
 * Provides page configuration loading, intersection observer setup, and user engagement analytics
 * Integrates with Google Analytics for page view tracking and section visibility metrics
 */

import { useCallback, useEffect } from "react";

import { usePageConfig } from "@modules/core/hooks";
import { useIntersectionObserver } from "@modules/core/hooks/useIntersectionObserver";
import { trackEvent, trackPageView } from "@modules/core/utils";

/**
 * Hook for managing homepage state including page configuration and section visibility analytics
 * @hook
 * @returns {Object} Homepage state management and analytics tracking functionality
 * @returns {boolean} returns.isLoading - Loading state indicator for page configuration
 * @returns {Object} returns.pageData - Page configuration data controlling section visibility
 * @returns {Object|null} returns.error - Error object if page configuration loading fails
 * @returns {Function} returns.refetch - Function to refetch page configuration data
 * @returns {Function} returns.onSectionView - Memoized analytics handler for section visibility tracking
 * @returns {Object} returns.refs - Intersection observer refs for tracking section visibility
 */
const useHomePage = () => {
  const { data: pageData = {}, error, isLoading, refetch } = usePageConfig("homepage");

  useEffect(() => {
    if (pageData.seoTitle && !isLoading) {
      trackPageView(window.location.pathname);
    }
  }, [pageData.seoTitle, isLoading]);

  const handleSectionView = useCallback(sectionName => {
    trackEvent("section_view", "Homepage", sectionName);
  }, []);

  const refs = useIntersectionObserver(handleSectionView);

  return {
    isLoading,
    pageData,
    error,
    refetch,
    onSectionView: handleSectionView,
    refs,
  };
};

export default useHomePage;
