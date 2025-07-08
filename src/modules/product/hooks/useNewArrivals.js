import { CACHE_DURATION, DEFAULT_PAGINATION } from "@config/constants";
import { queryKeys } from "@modules/core/providers/query-provider";
import { getNewArrivals } from "@modules/core/services";
import { useQuery } from "@tanstack/react-query";

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
    queryFn: () => getNewArrivals({ category, limit, page, sortBy, sortOrder }),
    enabled,
    staleTime: CACHE_DURATION.short,
    gcTime: CACHE_DURATION.medium,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    select: data => {
      const rawData = data?.data || data || {};
      const products = rawData.products || rawData.data || rawData || [];
      const pagination = rawData.pagination || {
        page,
        limit,
        total: products.length,
        totalPages: Math.ceil(products.length / limit),
        hasMore: products.length === limit,
        hasPrevious: page > 1,
      };
      const filters = {
        category,
        sortBy,
        sortOrder,
      };

      return {
        products: Array.isArray(products) ? products : [],
        pagination,
        filters,
      };
    },
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

  // Business logic handlers
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
    loading: isLoading,
    error,
    handleProductClick,
    handleViewAllClick,
    ...rest,
  };
};
