/**
 * @fileoverview product details service with image normalization
 * Provides secure API integration for single product data fetching with slug-based lookup
 * Implements comprehensive error handling with structured error reporting
 * Normalizes image data for consistent frontend consumption
 */

import { API_ENDPOINTS, ERROR_TYPES } from "@config/constants";
import { errorHandler, transformProductData } from "@modules/core/utils";

/**
 * Normalizes product images to ensure consistent data structure
 * @function normalizeProductImages
 * @param {Array|undefined} images - Raw image data from API (mixed types)
 * @returns {Array<string>} Array of image URL strings with fallback
 *
 * @description
 * Handles inconsistent image data formats:
 * - Converts string URLs to consistent format
 * - Extracts URLs from object structures
 * - Provides fallback placeholder for missing images
 * - Ensures array is never empty for UI components
 *
 * @example
 * const normalized = normalizeProductImages([
 *   "https://example.com/image1.jpg",
 *   { url: "https://example.com/image2.jpg", alt: "Product view" },
 *   null
 * ]);
 * // Returns: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
 */
const normalizeProductImages = images => {
  // Handle missing or invalid images array
  if (!Array.isArray(images) || images.length === 0) {
    return ["/placeholder-image.jpg"];
  }

  // Transform mixed image formats to consistent URLs
  const normalizedImages = images
    .map(image => {
      // Handle string URLs
      if (typeof image === "string" && image.trim()) {
        return image.trim();
      }

      // Handle object with url property
      if (image && typeof image === "object" && image.url) {
        return image.url;
      }

      // Filter out invalid/null entries
      return null;
    })
    .filter(Boolean); // Remove null/empty values

  // Ensure we always have at least one image
  return normalizedImages.length > 0 ? normalizedImages : ["/placeholder-image.jpg"];
};

/**
 * Fetches complete product details by URL slug with image normalization
 * @async
 * @function getProduct
 * @param {string} slug - URL-friendly product identifier slug
 * @returns {Promise<Object>} Complete product object with normalized images and metadata
 * @throws {Error} API error with status code and message when product fetch fails
 *
 * @description
 * Retrieves and transforms comprehensive product data for detail views:
 * - Uses SEO-friendly URL slugs for product lookup
 * - Normalizes image data for consistent frontend consumption
 * - Returns complete product data including variants, images, specifications
 * - Provides structured error handling with HTTP status preservation
 * - Passes through original API errors for detailed client-side handling
 * - Tracks API errors with context for monitoring and debugging
 *
 * @example
 * // Fetch product details using the product slug
 * const product = await productDetailsService.getProduct('blue-cotton-shirt-xl');
 * console.log(product.images); // Always array of strings
 * console.log(product.primaryImage); // First image URL
 * console.log(product.hasMultipleImages); // Boolean for UI logic
 *
 * @example
 * // With error handling for product not found
 * try {
 *   const product = await productDetailsService.getProduct('invalid-product-slug');
 *   // product.images is guaranteed to be string array
 * } catch (error) {
 *   if (error.status === 404) {
 *     // Show product not found message
 *   } else {
 *     // Show general error message
 *   }
 * }
 */
export const getProduct = async slug => {
  try {
    const response = await fetch(`/api/${API_ENDPOINTS.products}/${slug}`);

    if (!response.ok) {
      const error = new Error(`Failed to fetch product: ${response.statusText}`);
      error.status = response.status;
      errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
        endpoint: `${API_ENDPOINTS.products}/${slug}`,
        slug,
      });
      throw error;
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || result.error || "Failed to fetch product");
    }

    // Transform and normalize the product data
    return transformProductData(result.data);
  } catch (error) {
    errorHandler.handleError(error, ERROR_TYPES.API_ERROR, {
      service: "productDetailsService",
      method: "getProduct",
      endpoint: `${API_ENDPOINTS.products}/${slug}`,
      slug,
    });
    throw error;
  }
};

/**
 * Service object for retrieving detailed product information with normalized data
 * @namespace productDetailsService
 * @description Centralized interface for product details API operations with data transformation
 */
const productDetailsService = {
  getProduct,
  normalizeProductImages,
  transformProductData,
};

export default productDetailsService;
