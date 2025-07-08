import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@utils/errorHandler";

export const newArrivalsService = {
  async getNewArrivals(params = {}) {
    try {
      const { category = null, limit = 8, page = 1 } = params;
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
      });

      if (category) queryParams.append("category", category);

      const url = `/api/${API_ENDPOINTS.newArrivals}?${queryParams}`;
      const response = await fetch(url);

      if (!response.ok) {
        const error = new Error(`Failed to fetch new arrivals: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.newArrivals,
          params,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch new arrivals");
      }

      return {
        products: result.data || [],
        pagination: result.pagination || {
          page,
          limit,
          total: 0,
          hasMore: false,
          totalPages: 0,
        },
        filters: {
          category: category || "all",
        },
      };
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "newArrivalsService",
        method: "getNewArrivals",
        endpoint: API_ENDPOINTS.newArrivals,
        params,
      });
      throw new Error("Failed to fetch new arrivals");
    }
  },
};
