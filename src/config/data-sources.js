/**
 * @fileoverview Data source configuration for mapping content types to appropriate database systems
 * Centralizes the strategic mapping between data types and their optimal storage systems (Strapi CMS vs MongoDB)
 * Provides utilities for determining data source routing, API endpoint selection, and database system management
 */

// =================================================================
// DATA SOURCE MAPPING CONFIGURATION
// =================================================================

/**
 * Configuration mapping data types to their respective database systems
 * Separates CMS-managed content from application data for optimal data architecture
 * @constant {Object} DATA_SOURCES
 * @property {Array<string>} STRAPI - Content types managed by Strapi CMS headless system
 * @property {Array<string>} MONGODB - Data types managed by MongoDB database for application data
 *
 * @example
 * // Check what's managed by each system
 * console.log(DATA_SOURCES.STRAPI); // ['hero-content', 'about-content', ...]
 * console.log(DATA_SOURCES.MONGODB); // ['users', 'products', ...]
 *
 * @example
 * // Add new content type to appropriate source during development
 * DATA_SOURCES.STRAPI.push('testimonials');      // Marketing content
 * DATA_SOURCES.MONGODB.push('wishlists');        // User data
 */
export const DATA_SOURCES = {
  STRAPI: [
    "hero-content",
    "about-content",
    "page-configs",
    "blog-posts",
    "categories-content",
    "site-settings",
  ],

  MONGODB: [
    "users",
    "products",
    "carts",
    "orders",
    "reviews",
    "newsletter-subscriptions",
    "inventory",
  ],
};

// =================================================================
// DATA SOURCE UTILITIES
// =================================================================

/**
 * Determines which database system manages a specific data type for routing API calls
 * Essential for routing data requests to the correct storage system
 * @param {string} dataType - The data type to check (e.g., 'products', 'hero-content', 'users')
 * @returns {string} Database source identifier ('strapi' for CMS content, 'mongodb' for app data)
 * @throws {Error} When dataType is not found in any configured source system
 *
 * @example
 * // Application data lookups for database routing
 * const productsSource = getDataSource('products');        // Returns: 'mongodb'
 * const usersSource = getDataSource('users');              // Returns: 'mongodb'
 * const heroSource = getDataSource('hero-content');        // Returns: 'strapi'
 *
 * @example
 * // Use in API route to determine correct data source and connection
 * export async function GET(request) {
 *   const dataType = 'products';
 *   const source = getDataSource(dataType);
 *
 *   if (source === 'mongodb') {
 *     await dbConnect();
 *     const Product = await import('@lib/mongodb/models/product');
 *     return await Product.find({ isActive: true });
 *   } else if (source === 'strapi') {
 *     const response = await fetch(`${process.env.STRAPI_URL}/api/${dataType}`);
 *     return await response.json();
 *   }
 * }
 *
 * @example
 * // Dynamic data fetching utility with source routing
 * async function fetchData(dataType) {
 *   const source = getDataSource(dataType);
 *   const baseUrl = source === 'strapi'
 *     ? process.env.STRAPI_URL
 *     : process.env.MONGODB_URL;
 *
 *   return await fetch(`${baseUrl}/${dataType}`);
 * }
 *
 *  @example
 * // Cache strategy based on data source
 * function getCacheStrategy(dataType) {
 *   const source = getDataSource(dataType);
 *
 *   // CMS content can be cached longer
 *   if (source === 'strapi') {
 *     return { ttl: 3600, staleWhileRevalidate: 86400 };
 *   }
 *
 *   // Application data needs shorter cache
 *   return { ttl: 300, staleWhileRevalidate: 900 };
 * }
 */
export const getDataSource = dataType => {
  if (DATA_SOURCES.STRAPI.includes(dataType)) return "strapi";
  if (DATA_SOURCES.MONGODB.includes(dataType)) return "mongodb";
  throw new Error(`Unknown data type: ${dataType}`);
};
