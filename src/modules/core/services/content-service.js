/**
 * @fileoverview Content management API service
 * Handles hero content, about content, and page configuration
 */

import { API_ENDPOINTS } from "@config/constants";

import { get } from "./http-client";

/**
 * Get hero content
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Hero content data
 */
export const getHeroContent = async (params = {}) => {
  return get(`${API_ENDPOINTS.heroContent}`, params);
};

/**
 * Get about content
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} About content data
 */
export const getAboutContent = async (params = {}) => {
  return get(`${API_ENDPOINTS.aboutContent}`, params);
};

/**
 * Get page configuration
 * @param {string} pageName - Page name
 * @returns {Promise<Object>} Page config data
 */
export const getPageConfig = async (pageName = "homepage") => {
  return get(`${API_ENDPOINTS.content}/page-config`, { page: pageName });
};

const contentService = {
  getHeroContent,
  getAboutContent,
  getPageConfig,
};

export default contentService;
