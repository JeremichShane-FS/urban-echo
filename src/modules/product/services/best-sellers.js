import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@utils/errorHandler";

export const bestSellersService = {
  async getBestSellers(limit = 8) {
    try {
      const response = await fetch(`/api/${API_ENDPOINTS.bestSellers}?limit=${limit}`);

      if (!response.ok) {
        const error = new Error(`Failed to fetch best sellers: ${response.statusText}`);
        error.status = response.status;
        errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
          endpoint: API_ENDPOINTS.bestSellers,
          limit,
        });
        throw error;
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || result.error || "Failed to fetch best sellers");
      }

      return result.data?.products || [];
    } catch (error) {
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        service: "bestSellersService",
        method: "getBestSellers",
        endpoint: API_ENDPOINTS.bestSellers,
        limit,
      });
      throw new Error("Failed to fetch best sellers");
    }
  },
};
