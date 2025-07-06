import { API_ENDPOINTS, DEFAULT_PAGINATION, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@utils/errorHandler";

export const productsService = {
  async getProducts(params = {}) {
    try {
      const {
        category,
        limit = DEFAULT_PAGINATION.limit,
        maxPrice,
        minPrice,
        page = DEFAULT_PAGINATION.page,
        search,
        sortBy = "newest",
      } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
      });

      if (category) queryParams.append("category", category);
      if (search) queryParams.append("q", search);
      if (minPrice) queryParams.append("minPrice", minPrice.toString());
      if (maxPrice) queryParams.append("maxPrice", maxPrice.toString());

      const response = await fetch(`/api/${API_ENDPOINTS.products}?${queryParams}`);

      if (!response.ok) {
        const error = new Error(`Failed to fetch products: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.products,
          params,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch products");
      }

      return {
        products: result.data || [],
        pagination: result.pagination || {},
        meta: result.meta || {},
      };
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "productsService",
        method: "getProducts",
        endpoint: API_ENDPOINTS.products,
        params,
      });
      throw new Error("Failed to fetch products");
    }
  },
};
