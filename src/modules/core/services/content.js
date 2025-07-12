/**
 * @fileoverview Content management API service for CMS integration and dynamic content delivery
 * Handles hero content, about content, and page configuration with query parameter support
 * Provides centralized access to content management system data with consistent API patterns
 * Supports dynamic content loading for homepage sections and page-specific configurations
 */

import { API_ENDPOINTS } from "@config/constants";

import { get } from "./http-client";

/**
 * Fetches hero section content with optional filtering and customization parameters
 * @async
 * @function getHeroContent
 * @param {Object} [params={}] - Query parameters for content filtering and customization
 * @param {string} [params.variant] - Hero variant type (default, promotional, seasonal)
 * @param {string} [params.locale] - Content locale for internationalization
 * @param {boolean} [params.includeMedia] - Whether to include media assets in response
 * @returns {Promise<Object>} Hero content data including title, subtitle, CTA, and media
 *
 * @example
 * const heroContent = await getHeroContent({ variant: 'seasonal', locale: 'en' });
 * // Returns hero content with seasonal variant in English
 */
export const getHeroContent = async (params = {}) => {
  return get(`${API_ENDPOINTS.heroContent}`, params);
};

/**
 * Fetches about section content with optional filtering and localization parameters
 * @async
 * @function getAboutContent
 * @param {Object} [params={}] - Query parameters for content filtering and customization
 * @param {string} [params.locale] - Content locale for internationalization
 * @param {boolean} [params.includeTeam] - Whether to include team member information
 * @param {boolean} [params.includeHistory] - Whether to include company history
 * @returns {Promise<Object>} About content data including mission, vision, values, and team info
 *
 * @example
 * const aboutContent = await getAboutContent({ includeTeam: true, locale: 'en' });
 * // Returns about content with team information in English
 */
export const getAboutContent = async (params = {}) => {
  return get(`${API_ENDPOINTS.aboutContent}`, params);
};

/**
 * Fetches page-specific configuration settings for dynamic page behavior
 * @async
 * @function getPageConfig
 * @param {string} [pageName="homepage"] - Name of the page to fetch configuration for
 * @returns {Promise<Object>} Page configuration including SEO settings, feature flags, and layout options
 *
 * @example
 * const homeConfig = await getPageConfig('homepage');
 * // Returns homepage configuration with SEO settings and feature flags
 *
 * @example
 * const shopConfig = await getPageConfig('shop');
 * // Returns shop page configuration with product display settings
 */
export const getPageConfig = async (pageName = "homepage") => {
  return get(`${API_ENDPOINTS.content}/page-config`, { page: pageName });
};

/**
 * Content service object containing all content management functions
 * @namespace contentService
 * @description Provides a centralized interface for all content-related API operations
 */
const contentService = {
  getHeroContent,
  getAboutContent,
  getPageConfig,
};

export default contentService;
