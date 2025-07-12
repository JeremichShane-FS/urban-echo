/**
 * @fileoverview New arrivals service for showcasing latest inventory additions
 * Provides simple API integration for fetching recently added products
 * Uses consistent HTTP client pattern with centralized error handling
 */

import { API_ENDPOINTS } from "@config/constants";
import { get } from "@modules/core/services";

/**
 * Retrieves newest product arrivals for showcasing latest inventory
 * @async
 * @function getNewArrivals
 * @param {number} [limit=8] - Maximum number of new arrival products to retrieve
 * @returns {Promise<Object>} New arrival products data sorted by creation date
 */
export const getNewArrivals = async (limit = 8) => {
  return get(`${API_ENDPOINTS.products}/new-arrivals`, { limit });
};

/**
 * New arrivals service object containing all new arrival functions
 * @namespace newArrivalsService
 * @description Provides a centralized interface for all new arrival API operations
 */
const newArrivalsService = {
  getNewArrivals,
};

export default newArrivalsService;
