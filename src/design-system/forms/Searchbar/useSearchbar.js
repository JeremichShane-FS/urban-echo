import { useCallback } from "react";

import { trackEvent } from "@modules/core/utils";

const useSearchbar = () => {
  const handleSubmit = useCallback(e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const searchQuery = formData.get("search")?.trim() || "";

    // Track search analytics
    if (searchQuery === "") {
      trackEvent("search_empty", "Search", "Empty Search Submitted");
    } else {
      trackEvent("search_attempt", "Search", searchQuery);
    }

    // TODO: [COMPONENT] Product search functionality (Updated)
    // Implement comprehensive search logic for e-commerce product discovery.
    // Requirements:
    // - Full-text search across product names, descriptions, categories
    // - Auto-complete suggestions with debounced API calls
    // - Search filters (price range, category, brand, size, and color)
    // - Search result ranking by relevance, popularity, price
    // - Search analytics tracking for business intelligence
    // - Recently searched items and search history
    // - Integration with MongoDB text indexes for performance
  }, []);

  const handleInputFocus = useCallback(() => {
    trackEvent("search_focus", "Search", "Search Input Focused");
  }, []);

  return {
    handleSubmit,
    handleInputFocus,
  };
};

export default useSearchbar;
