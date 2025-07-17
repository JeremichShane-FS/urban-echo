/**
 * @fileoverview Image utility functions for placeholder generation and brand-consistent image handling
 * Provides comprehensive image URL management with fallback strategies for product images and hero content
 * Integrates with placehold.co service for consistent placeholder generation with brand colors and typography
 * Includes branded placeholder configurations for different content types and responsive image handling
 * Enhanced with intelligent multi-format image detection for various API data structures
 */

/**
 * Generate a placeholder image URL using placehold.co service with customizable styling
 * @function getPlaceholderUrl
 * @param {number} [width=400] - Image width in pixels for responsive design
 * @param {number} [height=400] - Image height in pixels for aspect ratio control
 * @param {string} [text="Product"] - Text to display on placeholder for content identification
 * @param {string} [bgColor="e2e8f0"] - Background color as hex code without # symbol
 * @param {string} [textColor="718096"] - Text color as hex code without # symbol for contrast
 * @returns {string} Complete placeholder image URL with encoded parameters
 *
 * @example
 * const placeholder = getPlaceholderUrl(300, 200, "New Product", "4A90A7", "FFFFFF");
 * // Returns: "https://placehold.co/300x200/4A90A7/FFFFFF?text=New%20Product"
 */
export const getPlaceholderUrl = (
  width = 400,
  height = 400,
  text = "Product",
  bgColor = "e2e8f0",
  textColor = "718096"
) => {
  const encodedText = encodeURIComponent(text);
  return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodedText}`;
};

/**
 * Get product image URL with intelligent fallback to branded placeholder
 * @function getProductImageUrl
 * @param {Object} product - Product object containing image and metadata
 * @param {string} [product.image] - Product image URL (null/empty triggers fallback)
 * @param {string} [product.name] - Product name used for placeholder text
 * @param {number} [width=400] - Desired image width for responsive display
 * @param {number} [height=400] - Desired image height for consistent aspect ratios
 * @returns {string} Product image URL or branded placeholder if image unavailable
 *
 * @example
 * const imageUrl = getProductImageUrl(
 *   { name: "Blue Cotton T-Shirt", image: null },
 *   300,
 *   300
 * );
 * // Returns placeholder URL with "Blue Cotton T-Shirt" text
 */
export const getProductImageUrl = (product, width = 400, height = 400) => {
  // If product has actual image, use it
  if (product.image && product.image !== null && product.image !== "") {
    return product.image;
  }

  // Otherwise, generate a placeholder
  return getPlaceholderUrl(
    width,
    height,
    product.name || "Product",
    "e2e8f0", // Light gray background
    "718096" // Gray text
  );
};

/**
 * Get hero image URL with fallback to Urban Echo branded placeholder
 * @function getHeroImageUrl
 * @param {string} imageUrl - Hero section image URL (null/empty triggers fallback)
 * @param {number} [width=600] - Desired image width for hero sections
 * @param {number} [height=400] - Desired image height for proper hero proportions
 * @returns {string} Hero image URL or Urban Echo branded placeholder
 *
 * @example
 * const heroImage = getHeroImageUrl(null, 1200, 600);
 * // Returns branded placeholder with Urban Echo colors and "Urban Fashion" text
 */
export const getHeroImageUrl = (imageUrl, width = 600, height = 400) => {
  if (imageUrl && imageUrl !== null && imageUrl !== "") {
    return imageUrl;
  }

  return getPlaceholderUrl(
    width,
    height,
    "Urban Fashion",
    "4A90A7", // Urban Echo blue
    "F7F7F7" // Light text
  );
};

/**
 * Brand-specific placeholder configurations for consistent visual identity across content types
 * @constant {Object} PLACEHOLDER_CONFIGS
 * @property {Object} product - Configuration for product placeholders with neutral colors
 * @property {Object} hero - Configuration for hero section placeholders with brand colors
 * @property {Object} category - Configuration for category placeholders with accent colors
 */
export const PLACEHOLDER_CONFIGS = {
  product: {
    bgColor: "e2e8f0",
    textColor: "718096",
    defaultText: "Product",
  },
  hero: {
    bgColor: "4A90A7",
    textColor: "F7F7F7",
    defaultText: "Urban Fashion",
  },
  category: {
    bgColor: "333333",
    textColor: "E67E22",
    defaultText: "Category",
  },
};

/**
 * Get a branded placeholder for different content types with predefined styling configurations
 * @function getBrandedPlaceholder
 * @param {string} [type="product"] - Type of placeholder (product, hero, category) for style selection
 * @param {number} [width=400] - Image width in pixels for responsive requirements
 * @param {number} [height=400] - Image height in pixels for aspect ratio consistency
 * @param {string|null} [text=null] - Custom text override (uses default if null)
 * @returns {string} Branded placeholder URL with type-specific styling and colors
 *
 * @example
 * const productPlaceholder = getBrandedPlaceholder("product", 250, 250, "New Arrival");
 * // Returns product-style placeholder with custom text
 *
 * @example
 * const heroPlaceholder = getBrandedPlaceholder("hero", 1200, 600);
 * // Returns hero-style placeholder with Urban Echo branding
 */
export const getBrandedPlaceholder = (type = "product", width = 400, height = 400, text = null) => {
  const config = PLACEHOLDER_CONFIGS[type] || PLACEHOLDER_CONFIGS.product;
  const displayText = text || config.defaultText;

  return getPlaceholderUrl(width, height, displayText, config.bgColor, config.textColor);
};

/**
 * Intelligent image URL resolver with branded placeholder fallback system
 * Searches through multiple data structure formats to find valid image URLs
 * Falls back to branded placeholders that maintain visual consistency and brand identity
 * Handles various API response formats including categories, products, and mixed content types
 *
 * @function getImageUrl
 * @param {Object} item - Data item that may contain image information in various formats
 * @param {string} [type="product"] - Content type for branded placeholder styling (product, hero, category)
 * @param {number} [width=400] - Desired image width for responsive display optimization
 * @param {number} [height=400] - Desired image height for consistent aspect ratios
 * @returns {string} Valid image URL or branded placeholder URL with custom styling
 *
 * @example
 * // Category with nested image object
 * const categoryUrl = getImageUrl(category, 'category', 500, 300);
 *
 * @example
 * // Product with images array
 * const productUrl = getImageUrl(product, 'product', 400, 400);
 *
 * @example
 * // Mixed content with fallback
 * const mixedUrl = getImageUrl(unknownItem, 'product', 300, 300);
 */
export const getImageUrl = (item, type = "product", width = 400, height = 400) => {
  let imageUrl = null;

  // Handle category structure: image: { url: "...", alt: "..." }
  // Categories typically store images as objects with metadata
  if (item.image?.url) {
    imageUrl = item.image.url;
  }
  // Handle product structure: images: [{ url: "..." }] or images: ["url"]
  // Products may store multiple images in array format with object wrappers
  else if (item.images?.[0]?.url) {
    imageUrl = item.images[0].url;
  }
  // Handle simple image arrays: images: ["url1", "url2"]
  // Some products store images as direct URL strings in arrays
  else if (typeof item.images?.[0] === "string" && item.images[0].trim()) {
    imageUrl = item.images[0];
  }
  // Handle direct image string: image: "url"
  // Fallback for items with single image stored as direct string
  else if (typeof item.image === "string" && item.image.trim()) {
    imageUrl = item.image;
  }
  // Handle alternative image field: imageUrl: "url"
  // Some data sources use different field naming conventions
  else if (item.imageUrl && item.imageUrl.trim()) {
    imageUrl = item.imageUrl;
  }

  // Return found image or generate branded placeholder with item name and type-specific styling
  return imageUrl || getBrandedPlaceholder(type, width, height, item.name);
};
