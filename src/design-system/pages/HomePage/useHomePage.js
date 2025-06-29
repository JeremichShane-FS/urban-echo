import { useEffect } from "react";

import { usePageConfig } from "@lib/hooks/use-content";

export const useHomePage = () => {
  const { data: pageData = {}, error, isLoading, refetch } = usePageConfig("homepage");

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag && pageData.seoTitle) {
      window.gtag("config", "GA_TRACKING_ID", {
        page_title: pageData.seoTitle,
        page_location: window.location.href,
      });
    }
  }, [pageData.seoTitle]);

  const handleSectionView = sectionName => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "section_view", {
        event_category: "Homepage",
        event_label: sectionName,
      });
    }
  };

  return {
    isLoading,
    pageData,
    error,
    refetch,
    onSectionView: handleSectionView,
  };
};
