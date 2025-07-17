/**
 * @fileoverview Custom hook for fetching and managing new arrival products with advanced filtering
 * Provides optimized data fetching with TanStack Query for performance, caching, and pagination
 * Handles category filtering, pagination, sorting, and analytics tracking for user interactions
 * Includes standardized data transformation and error handling for consistent component integration
 */

import { useQuery } from "@tanstack/react-query";

import { CACHE_DURATION, DEFAULT_PAGINATION } from "@config/constants";
import { queryKeys } from "@modules/core/providers";
import { getNewArrivals } from "@modules/products/services";

/**
 * Custom hook for fetching and managing new arrival products with filtering and pagination
 * @function useNewArrivals
 * @param {Object} [options={}] - Configuration options for the hook
 * @param {string} [options.category] - Optional category filter for new arrivals
 * @param {boolean} [options.enabled=true] - Whether the query should run automatically
 * @param {number} [options.limit=DEFAULT_PAGINATION.limit] - Number of products per page
 * @param {number} [options.page=DEFAULT_PAGINATION.page] - Current page number (1-based)
 * @param {string} [options.sortBy="createdAt"] - Field to sort results by
 * @param {string} [options.sortOrder="desc"] - Sort direction ("asc" or "desc")
 * @returns {Object} Hook result object with products, pagination, and handler functions
 * @returns {Array} returns.products - Array of new arrival product objects
 * @returns {Object} returns.pagination - Pagination metadata and navigation helpers
 * @returns {Object} returns.filters - Current active filters applied to results
 * @returns {boolean} returns.loading - Loading state indicator
 * @returns {Error|null} returns.error - Error object if request fails
 * @returns {Function} returns.handleProductClick - Analytics tracking for product clicks
 * @returns {Function} returns.handleViewAllClick - Analytics tracking for "View All" clicks
 * @returns {boolean} returns.isRefetching - Background refetch indicator
 * @returns {Function} returns.refetch - Function to manually trigger data refresh
 *
 * @example
 * // Basic usage with default options
 * const { products, loading, error } = useNewArrivals();
 *
 * @example
 * // With category filtering and custom pagination
 * const {
 *   products,
 *   pagination,
 *   handleProductClick
 * } = useNewArrivals({
 *   category: 'women',
 *   limit: 12,
 *   page: 2
 * });
 *
 * @example
 * // With custom sorting and analytics handlers
 * const {
 *   products,
 *   loading,
 *   handleProductClick,
 *   handleViewAllClick
 * } = useNewArrivals({
 *   sortBy: 'price',
 *   sortOrder: 'asc'
 * });
 *
 * // Use in rendering
 * return (
 *   <div>
 *     {products.map(product => (
 *       <ProductCard
 *         key={product.id}
 *         product={product}
 *         onClick={() => handleProductClick(product.id, product.name)}
 *       />
 *     ))}
 *     <Button onClick={handleViewAllClick}>View All New Arrivals</Button>
 *   </div>
 * );
 */
export const useNewArrivals = (options = {}) => {
  const {
    category,
    enabled = true,
    limit = DEFAULT_PAGINATION.limit,
    page = DEFAULT_PAGINATION.page,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options;

  const queryKey = [
    ...queryKeys.products.newArrivals(),
    { category, limit, page, sortBy, sortOrder },
  ];

  const { data, error, isLoading, ...rest } = useQuery({
    queryKey,
    queryFn: () => getNewArrivals(limit),
    enabled,
    staleTime: CACHE_DURATION.short,
    gcTime: CACHE_DURATION.medium,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    select: data => ({
      products: Array.isArray(data) ? data : [],
      pagination: {
        page,
        limit,
        total: Array.isArray(data) ? data.length : 0,
        hasMore: false,
        totalPages: 1,
      },
      filters: { category, sortBy, sortOrder },
    }),
    meta: {
      source: "new-arrivals-api",
      filters: { category, sortBy, sortOrder },
      pagination: { page, limit },
    },
  });

  // Extract transformed data
  const products = data?.products || [];
  const pagination = data?.pagination || {};
  const filters = data?.filters || {};

  /**
   * Tracks product click events in analytics
   * @function handleProductClick
   * @param {string} productId - ID of the clicked product
   * @param {string} productName - Name of the clicked product
   * @returns {void}
   *
   * @example
   * handleProductClick('prod_123', 'Blue Denim Jacket');
   */
  const handleProductClick = (productId, productName) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "select_content", {
        content_type: "product",
        content_id: productId,
        item_name: productName,
        source: "new_arrivals",
      });
    }
  };

  /**
   * Tracks "View All" button clicks in analytics
   * @function handleViewAllClick
   * @returns {void}
   *
   * @example
   * <Button onClick={handleViewAllClick}>View All New Arrivals</Button>
   */
  const handleViewAllClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "New Arrivals",
        event_label: "View All Products",
      });
    }
  };

  return {
    products,
    pagination,
    filters,
    isLoading,
    error,
    handleProductClick,
    handleViewAllClick,
    ...rest,
  };
};

/**
 * New Arrivals service object containing all new arrivals management functions
 * @namespace newArrivalsService
 * @description Provides a centralized interface for all new arrivals API operations
 */
const newArrivalsService = {
  getNewArrivals,
};

export default newArrivalsService;
