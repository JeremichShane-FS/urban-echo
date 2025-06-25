import { useCallback, useEffect, useState } from "react";

import { productService as data } from "@modules/product/services/product-service";

export const useNewArrivals = (options = {}) => {
  const { category, limit = 8, page = 1 } = options;

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewArrivals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: [ROUTES] Product catalog API endpoints defined
      // Replace productService mock with backend API integration.
      // Required API endpoints:
      // - GET /api/products/new-arrivals?limit={limit}&page={page}
      // - GET /api/products/new-arrivals/count (for pagination)
      // - Include product variants, pricing, inventory status
      // - Support for filtering by category, size, price range

      const response = await data.getNewArrivals({ limit, page, category });
      setProducts(response.products);
      setPagination(response.pagination);
      setFilters(response.filters);
    } catch (error) {
      console.error("Error fetching new arrivals:", error);
      setError(error.message || "An unexpected error occurred");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [limit, page, category]);

  useEffect(() => {
    fetchNewArrivals();
  }, [fetchNewArrivals]);

  return {
    products,
    pagination,
    filters,
    loading,
    error,
    refetch: fetchNewArrivals,
  };
};
