/**
 * @fileoverview Custom hook for managing breadcrumb navigation state and behavior
 * Handles breadcrumb generation, analytics tracking, and accessibility features
 * Provides centralized logic for breadcrumb functionality across different page types
 */

import { useMemo } from "react";
import { useRouter } from "next/navigation";

/**
 * Hook for managing breadcrumb navigation with analytics and accessibility
 * @hook
 * @param {Array<Object>} items - Breadcrumb items array with path and label properties
 * @param {Object} options - Configuration options for breadcrumb behavior
 * @param {string} [options.separator="›"] - Custom separator character between breadcrumb items
 * @param {boolean} [options.showHome=true] - Whether to include home link as first breadcrumb
 * @param {boolean} [options.trackClicks=false] - Whether to track breadcrumb clicks for analytics
 * @param {Function} [options.onBreadcrumbClick] - Custom click handler for breadcrumb items
 * @returns {Object} Breadcrumb state and handlers
 * @returns {Array<Object>} returns.breadcrumbItems - Processed breadcrumb items with home link if enabled
 * @returns {Function} returns.handleBreadcrumbClick - Click handler for breadcrumb navigation
 * @returns {boolean} returns.shouldRender - Whether breadcrumbs should be rendered
 * @returns {string} returns.separator - Separator character for display
 */
const useBreadcrumbs = (items = [], options = {}) => {
  const router = useRouter();
  const { onBreadcrumbClick, separator = "›", showHome = true, trackClicks = false } = options;

  // Process breadcrumb items with home link if enabled
  const breadcrumbItems = useMemo(() => {
    if (!Array.isArray(items)) return [];

    const processedItems = showHome
      ? [{ path: "/", label: "Home", isHome: true }, ...items]
      : items;

    // Filter out invalid items and ensure required properties
    return processedItems
      .filter(item => item && typeof item.label === "string" && item.label.trim() !== "")
      .map((item, index) => ({
        ...item,
        id: item.id || `breadcrumb-${index}`,
        ariaLabel: item.ariaLabel || `Navigate to ${item.label}`,
      }));
  }, [items, showHome]);

  // Determine if breadcrumbs should be rendered
  const shouldRender = useMemo(() => {
    return breadcrumbItems.length > 0;
  }, [breadcrumbItems]);

  // Handle breadcrumb navigation clicks
  const handleBreadcrumbClick = (item, event) => {
    // Don't navigate if it's the current page (last item)
    const isCurrentPage = breadcrumbItems[breadcrumbItems.length - 1] === item;
    if (isCurrentPage) {
      event.preventDefault();
      return;
    }

    // Track analytics if enabled
    if (trackClicks && typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "breadcrumb_click", {
        event_category: "navigation",
        event_label: item.label,
        destination_path: item.path,
      });
    }

    // Call custom click handler if provided
    if (onBreadcrumbClick && typeof onBreadcrumbClick === "function") {
      const shouldContinue = onBreadcrumbClick(item, event);
      if (shouldContinue === false) {
        event.preventDefault();
        return;
      }
    }

    // Use Next.js router for navigation if no href is provided
    if (!event.defaultPrevented && item.path) {
      event.preventDefault();
      router.push(item.path);
    }
  };

  return {
    breadcrumbItems,
    handleBreadcrumbClick,
    shouldRender,
    separator,
  };
};

export default useBreadcrumbs;
