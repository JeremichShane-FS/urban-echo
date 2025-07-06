import { useCallback, useEffect } from "react";

import { usePageConfig } from "@modules/core/hooks";
import { trackEvent, trackPageView } from "@modules/core/utils";

export const useHomePage = () => {
  const { data: pageData = {}, error, isLoading, refetch } = usePageConfig("homepage");

  useEffect(() => {
    if (pageData.seoTitle && !isLoading) {
      trackPageView(window.location.pathname);
    }
  }, [pageData.seoTitle, isLoading]);

  const handleSectionView = useCallback(sectionName => {
    trackEvent("section_view", "Homepage", sectionName);
  }, []);

  return {
    isLoading,
    pageData,
    error,
    refetch,
    onSectionView: handleSectionView,
  };
};
