import { CACHE_DURATION } from "@config/constants";
import { queryKeys } from "@modules/core/providers/query-provider";
import { useFeaturedProducts } from "@modules/product/hooks/useFeaturedProducts";
import { useNewArrivals } from "@modules/product/hooks/useNewArrivals";
import { categoriesService } from "@modules/product/services/categories";
import { useQuery } from "@tanstack/react-query";

export function useShopLanding() {
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
}
