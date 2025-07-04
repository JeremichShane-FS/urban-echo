import { API_ENDPOINTS, DEFAULT_PAGINATION, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

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
        sort = "newest",
      } = params;

      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
      });

      if (category) queryParams.append("category", category);
      if (search) queryParams.append("search", search);
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

      return await response.json();
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
