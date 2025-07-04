import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler } from "@modules/core/services/errorHandler";

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

      const data = await response.json();
      return data.products || [];
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
