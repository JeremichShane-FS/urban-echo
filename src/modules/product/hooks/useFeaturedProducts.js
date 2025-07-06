// src/modules/product/hooks/useFeaturedProducts.js
import { CACHE_DURATION, ERROR_TYPES } from "@config/constants";
import { queryKeys } from "@modules/core/providers/query-provider";
import { errorHandler } from "@modules/core/utils/errorHandler";
import { featuredProductsService } from "@modules/product/services";
import { useQuery, useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook for managing featured products data using TanStack Query
 * @description Fetches and manages featured products from the API with automatic
 * caching, background updates, error handling, and retry logic. Uses TanStack Query
 * for optimal performance and data synchronization.
 * @param {Object} [options={}] - Configuration options for the hook
 * @param {number} [options.limit=8] - Number of featured products to fetch
 * @param {boolean} [options.enabled=true] - Whether the query should run automatically
 * @returns {Object} TanStack Query result object
 * @returns {Array} returns.data - Array of featured product objects (undefined while loading)
 * @returns {boolean} returns.isLoading - Initial loading state indicator
 * @returns {boolean} returns.isFetching - Background fetching state indicator
 * @returns {boolean} returns.isError - Error state indicator
 * @returns {Error|null} returns.error - Error object if request fails, null otherwise
 * @returns {Function} returns.refetch - Function to manually refetch featured products
 * @returns {Function} returns.onProductClick - Analytics tracking function for product clicks
 * @returns {boolean} returns.isStale - Whether data is considered stale
 * @returns {string} returns.status - Query status: 'pending', 'error', 'success'
 * @example
 * Basic usage
 * const { data: featuredProducts, isLoading, error, onProductClick } = useFeaturedProducts();
 *
 * With custom limit
 * const { data: featuredProducts, refetch } = useFeaturedProducts({ limit: 12 });
 *
 * Conditional fetching
 * const { data, isLoading } = useFeaturedProducts({
 *   limit: 6,
 *   enabled: shouldFetch
 * });
 */

const ERROR_SOURCE = "featured-products-api";

export const useFeaturedProducts = (options = {}) => {
  const { enabled = true, limit = 8 } = options;

  const queryResult = useQuery({
    queryKey: queryKeys.products.featured(),
    queryFn: () => featuredProductsService.getFeaturedProducts(limit),
    enabled,
    staleTime: CACHE_DURATION.medium, // 30 minutes
    gcTime: CACHE_DURATION.long, // 24 hours
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    select: data => {
      // The featuredProductsService already returns just the products array
      // So we don't need to extract from data.data or data.products
      return Array.isArray(data) ? data : [];
    },
    meta: {
      source: ERROR_SOURCE,
      limit,
    },
  });

  /**
   * Handles product click events with analytics tracking
   * @description Tracks user interactions with featured products for analytics
   * and conversion optimization. Integrates with Google Analytics if available.
   * @param {string} productId - The ID of the clicked product
   * @param {string} productName - The name of the clicked product
   * @param {Object} [additionalData={}] - Additional tracking data
   * @returns {void}
   */
  const handleProductClick = (productId, productName, additionalData = {}) => {
    if (!productId || !productName) {
      const validationError = errorHandler.createError(
        "Missing required parameters for product click tracking",
        ERROR_TYPES.VALIDATION_ERROR,
        400,
        { productId, productName }
      );
      errorHandler.handleError(validationError, ERROR_TYPES.VALIDATION_ERROR, {
        source: "useFeaturedProducts",
        action: "handleProductClick",
        productId,
        productName,
      });
      return;
    }

    // Track analytics event for product click
    try {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "select_content", {
          content_type: "product",
          content_id: productId,
          item_name: productName,
          source: "featured_products",
          ...additionalData,
        });
      }
    } catch (analyticsError) {
      // Don't throw for analytics errors, just log them with proper structure
      const analyticsErrorStructured = errorHandler.createError(
        "Analytics tracking failed",
        ERROR_TYPES.API_ERROR,
        500,
        {
          originalError: analyticsError.message,
          productId,
          productName,
          additionalData,
        }
      );

      errorHandler.handleError(analyticsErrorStructured, ERROR_TYPES.API_ERROR, {
        source: "useFeaturedProducts",
        action: "handleProductClick",
        productId,
        productName,
        type: "analytics_error",
      });
    }
  };

  return {
    ...queryResult,
    onProductClick: handleProductClick,
  };
};

/**
 * Hook for prefetching featured products
 * @description Prefetches featured products data without subscribing to updates.
 * Useful for optimizing user experience by loading data before it's needed.
 * @param {number} [limit=8] - Number of products to prefetch
 * @example
 * Prefetch featured products on component mount
 * usePrefetchFeaturedProducts(12);
 */
export const usePrefetchFeaturedProducts = (limit = 8) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.products.featured(),
      queryFn: () => featuredProductsService.getFeaturedProducts(limit),
      staleTime: CACHE_DURATION.medium,
    });
  };
};
