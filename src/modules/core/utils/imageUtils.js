/**
 * @fileoverview Image utility functions for placeholder generation and brand-consistent image handling
 * Provides comprehensive image URL management with fallback strategies for product images and hero content
 * Integrates with placehold.co service for consistent placeholder generation with brand colors and typography
 * Includes branded placeholder configurations for different content types and responsive image handling
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
