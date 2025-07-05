/**
 * @fileoverview Newsletter API service
 * Handles email subscription and unsubscription operations
 */

import { API_ENDPOINTS } from "@config/constants";

import { post } from "./http-client";

/**
 * Subscribe to newsletter
 * @param {string} email - Email address
 * @returns {Promise<Object>} Subscription result
 */
export const subscribeNewsletter = async email => {
  return post(`${API_ENDPOINTS.newsletter}/subscribe`, { email });
};

/**
 * Unsubscribe from newsletter
 * @param {string} email - Email address
 * @returns {Promise<Object>} Unsubscribe result
 */
export const unsubscribeNewsletter = async email => {
  return post(`${API_ENDPOINTS.newsletter}/unsubscribe`, { email });
};

const newsletterService = {
  subscribeNewsletter,
  unsubscribeNewsletter,
};

export default newsletterService;
