/**
 * @fileoverview Content management hooks for fetching and managing CMS data with React Query integration
 * Provides hooks for hero content, about content, and page configuration with fallback data
 * Includes error handling, caching strategies, and default content for offline/fallback scenarios
 */

import { useQuery } from "@tanstack/react-query";

import {
  API_ENDPOINTS,
  CACHE_DURATION,
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
  ROUTES,
} from "@config/constants";
import { queryKeys } from "@modules/core/providers";
import {
  getAboutContent as apiGetAboutContent,
  getHeroContent as apiGetHeroContent,
  getPageConfig as apiGetPageConfig,
} from "@modules/core/services";
import { errorHandler } from "@modules/core/utils";

/**
 * Default hero section content used as fallback when API fails
 * @constant {Object}
 */
const DEFAULT_HERO_CONTENT = {
  title: "Discover Your Style",
  subtitle: "Premium fashion for the modern lifestyle",
  description:
    "Explore our curated collection of contemporary clothing designed for comfort, style, and confidence.",
  ctaText: "Shop Now",
  ctaLink: ROUTES.SHOP,
  variant: "default",
  isActive: true,
  backgroundImage: null,
  currency: DEFAULT_CURRENCY,
  locale: DEFAULT_LOCALE,
};

/**
 * Default about section content used as fallback when API fails
 * @constant {Object}
 */
const DEFAULT_ABOUT_CONTENT = {
  title: "About Urban Echo",
  subtitle: "Fashion with Purpose",
  description: "Urban Echo represents the intersection of contemporary style and conscious living.",
  mission:
    "To provide high-quality, sustainable fashion that empowers individuals to express their unique style.",
  vision: "A world where fashion is both beautiful and responsible.",
  values: [
    "Quality craftsmanship",
    "Sustainable practices",
    "Inclusive design",
    "Customer satisfaction",
  ],
  isActive: true,
  locale: DEFAULT_LOCALE,
};

/**
 * Default page configuration used as fallback when API fails
 * @constant {Object}
 */
const DEFAULT_PAGE_CONFIG = {
  pageName: "homepage",
  seoTitle: "Urban Echo | Modern Fashion E-Commerce",
  seoDescription:
    "Discover trendy, high-quality clothing at Urban Echo. Shop our curated collection of contemporary fashion.",
  showFeaturedProducts: true,
  showNewArrivals: true,
  showNewsletter: true,
  showAboutSection: true,
  showTestimonials: true,
  showCategories: true,
  maxFeaturedProducts: 8,
  maxNewArrivals: 8,
  currency: DEFAULT_CURRENCY,
  locale: DEFAULT_LOCALE,
};

/**
 * Fetches hero content from API with error handling and fallback
 * @async
 * @function getHeroContent
 * @returns {Promise<Object>} Hero content data or fallback content if API fails
 */
const getHeroContent = async () => {
  try {
    return await apiGetHeroContent();
  } catch (error) {
    errorHandler.handleError(error, "API_ERROR", {
      source: "use-content",
      action: "getHeroContent",
      endpoint: `${API_ENDPOINTS.content}/hero`,
      fallback: true,
    });

    console.warn("Failed to fetch hero content from API, using fallback", error.message);
    return DEFAULT_HERO_CONTENT;
  }
};

/**
 * Fetches about content from API with error handling and fallback
 * @async
 * @function getAboutContent
 * @returns {Promise<Object>} About content data or fallback content if API fails
 */
const getAboutContent = async () => {
  try {
    return await apiGetAboutContent();
  } catch (error) {
    errorHandler.handleError(error, "API_ERROR", {
      source: "use-content",
      action: "getAboutContent",
      endpoint: `${API_ENDPOINTS.content}/about`,
      fallback: true,
    });

    console.warn("Failed to fetch about content from API, using fallback", error.message);
    return DEFAULT_ABOUT_CONTENT;
  }
};

/**
 * Fetches page configuration from API with error handling and fallback
 * @async
 * @function getPageConfig
 * @param {string} [pageName="homepage"] - Name of the page to fetch configuration for
 * @returns {Promise<Object>} Page configuration data or fallback config if API fails
 */
const getPageConfig = async (pageName = "homepage") => {
  try {
    return await apiGetPageConfig(pageName);
  } catch (error) {
    errorHandler.handleError(error, "API_ERROR", {
      source: "use-content",
      action: "getPageConfig",
      endpoint: `${API_ENDPOINTS.content}/page-config`,
      pageName,
      fallback: true,
    });

    console.warn("Failed to fetch page config from API, using fallback", error.message);
    return {
      ...DEFAULT_PAGE_CONFIG,
      pageName,
    };
  }
};

/**
 * React Query configuration for content queries with caching and retry strategies
 * @constant {Object}
 */
const CONTENT_QUERY_CONFIG = {
  staleTime: CACHE_DURATION.long,
  gcTime: CACHE_DURATION.veryLong,
  retry: 2,
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
};

/**
 * React Query configuration for page config queries with different caching strategy
 * @constant {Object}
 */
const PAGE_CONFIG_QUERY_CONFIG = {
  staleTime: CACHE_DURATION.medium,
  gcTime: CACHE_DURATION.long,
  retry: 2,
  retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
};

/**
 * Hook for fetching hero section content with caching and error handling
 * @hook
 * @returns {Object} React Query result object with hero content data, loading state, and error
 */
export const useHeroContent = () => {
  return useQuery({
    queryKey: queryKeys.content.hero(),
    queryFn: getHeroContent,
    ...CONTENT_QUERY_CONFIG,
  });
};

/**
 * Hook for fetching about section content with caching and error handling
 * @hook
 * @returns {Object} React Query result object with about content data, loading state, and error
 */
export const useAboutContent = () => {
  return useQuery({
    queryKey: queryKeys.content.about(),
    queryFn: getAboutContent,
    ...CONTENT_QUERY_CONFIG,
  });
};

/**
 * Hook for fetching page configuration with caching and error handling
 * @hook
 * @param {string} [pageName="homepage"] - Name of the page to fetch configuration for
 * @returns {Object} React Query result object with page config data, loading state, and error
 */
export const usePageConfig = (pageName = "homepage") => {
  return useQuery({
    queryKey: queryKeys.content.pageConfig(pageName),
    queryFn: () => getPageConfig(pageName),
    ...PAGE_CONFIG_QUERY_CONFIG,
  });
};

export { DEFAULT_ABOUT_CONTENT, DEFAULT_HERO_CONTENT, DEFAULT_PAGE_CONFIG };
