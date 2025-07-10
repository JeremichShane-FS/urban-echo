/**
 * @fileoverview Custom hook for managing shop landing page data including categories, featured products, and new arrivals
 * Provides React Query integration for optimized data fetching with caching and error handling
 * Coordinates multiple data sources to create comprehensive shop landing page experience
 */

import { useQuery } from "@tanstack/react-query";

import { CACHE_DURATION } from "@config/constants";
import { queryKeys } from "@modules/core/providers";
import { useFeaturedProducts, useNewArrivals } from "@modules/product/hooks";
import { categoriesService } from "@modules/product/services";

/**
 * Hook for managing shop landing page data with optimized caching and error handling
 * @hook
 * @returns {Object} Shop landing page data and state management
 * @returns {Array<Object>} returns.categories - Product categories with counts and metadata
 * @returns {Array<Object>} returns.featuredProducts - Featured products for recommendations section
 * @returns {Array<Object>} returns.newArrivals - New arrival products for inspiration section
 * @returns {boolean} returns.isLoading - Combined loading state for all data sources
 * @returns {string|null} returns.error - Combined error message from any failed data source
 */
const useShopLanding = () => {
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: queryKeys.categories.list(),
    queryFn: () =>
      categoriesService.getCategories({
        includeProductCount: true,
        status: "active",
      }),
    staleTime: CACHE_DURATION.long, // 24 hours
    gcTime: CACHE_DURATION.veryLong, // 1 week
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const {
    data: featuredProductsData,
    error: featuredError,
    isLoading: featuredLoading,
  } = useFeaturedProducts({ limit: 4 });

  const {
    data: newArrivalsData,
    error: newArrivalsError,
    isLoading: newArrivalsLoading,
  } = useNewArrivals({ limit: 6 });
  const isLoading = categoriesLoading || featuredLoading || newArrivalsLoading;
  const error =
    categoriesError?.message || featuredError?.message || newArrivalsError?.message || null;

  return {
    categories: categoriesData || [],
    featuredProducts: featuredProductsData || [],
    newArrivals: newArrivalsData || [],
    isLoading,
    error,
  };
};

export default useShopLanding;
