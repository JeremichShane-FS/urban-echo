/**
 * @fileoverview Product category and taxonomy constants for e-commerce navigation and organization
 * Provides structured category hierarchies, subcategory mappings, and collection types for consistent navigation
 * Supports dynamic route generation, menu building, and product taxonomy management across the application
 */

import ROUTES from "@config/routes";

// =================================================================
// MAIN CATEGORY DEFINITIONS
// =================================================================

/**
 * Main product categories with navigation paths and display flags
 * @constant {Array<Object>} PRODUCT_CATEGORIES - Primary navigation categories
 */
export const PRODUCT_CATEGORIES = [
  { id: "men", name: "Men", path: ROUTES.MEN },
  { id: "women", name: "Women", path: ROUTES.WOMEN },
  { id: "accessories", name: "Accessories", path: ROUTES.ACCESSORIES },
  { id: "sale", name: "Sale", path: ROUTES.SALE, highlight: true },
];

// =================================================================
// SUBCATEGORY HIERARCHIES
// =================================================================

/**
 * Men's clothing subcategories with organized navigation paths
 * @constant {Array<Object>} MEN_SUBCATEGORIES - Men's product subcategories
 */
export const MEN_SUBCATEGORIES = [
  { id: "tshirts", name: "T-Shirts", path: `${ROUTES.MEN}/tshirts` },
  { id: "shirts", name: "Shirts", path: `${ROUTES.MEN}/shirts` },
  { id: "jeans", name: "Jeans", path: `${ROUTES.MEN}/jeans` },
  { id: "pants", name: "Pants", path: `${ROUTES.MEN}/pants` },
  { id: "shorts", name: "Shorts", path: `${ROUTES.MEN}/shorts` },
  { id: "jackets", name: "Jackets & Coats", path: `${ROUTES.MEN}/jackets` },
  { id: "hoodies", name: "Hoodies & Sweatshirts", path: `${ROUTES.MEN}/hoodies` },
  { id: "sneakers", name: "Sneakers", path: `${ROUTES.MEN}/sneakers` },
  { id: "footwear", name: "Footwear", path: `${ROUTES.MEN}/footwear` },
];

/**
 * Women's clothing subcategories with organized navigation paths
 * @constant {Array<Object>} WOMEN_SUBCATEGORIES - Women's product subcategories
 */
export const WOMEN_SUBCATEGORIES = [
  { id: "tops", name: "Tops", path: `${ROUTES.WOMEN}/tops` },
  { id: "tshirts", name: "T-Shirts", path: `${ROUTES.WOMEN}/tshirts` },
  { id: "blouses", name: "Blouses & Shirts", path: `${ROUTES.WOMEN}/blouses` },
  { id: "dresses", name: "Dresses", path: `${ROUTES.WOMEN}/dresses` },
  { id: "jeans", name: "Jeans", path: `${ROUTES.WOMEN}/jeans` },
  { id: "pants", name: "Pants", path: `${ROUTES.WOMEN}/pants` },
  { id: "skirts", name: "Skirts", path: `${ROUTES.WOMEN}/skirts` },
  { id: "jackets", name: "Jackets & Coats", path: `${ROUTES.WOMEN}/jackets` },
  { id: "hoodies", name: "Hoodies & Sweatshirts", path: `${ROUTES.WOMEN}/hoodies` },
  { id: "shoes", name: "Shoes", path: `${ROUTES.WOMEN}/shoes` },
];

/**
 * Accessories subcategories with organized navigation paths
 * @constant {Array<Object>} ACCESSORIES_SUBCATEGORIES - Accessories product subcategories
 */
export const ACCESSORIES_SUBCATEGORIES = [
  { id: "bags", name: "Bags", path: `${ROUTES.ACCESSORIES}/bags` },
  { id: "hats", name: "Hats & Caps", path: `${ROUTES.ACCESSORIES}/hats` },
  { id: "belts", name: "Belts", path: `${ROUTES.ACCESSORIES}/belts` },
  { id: "jewelry", name: "Jewelry", path: `${ROUTES.ACCESSORIES}/jewelry` },
  { id: "sunglasses", name: "Sunglasses", path: `${ROUTES.ACCESSORIES}/sunglasses` },
  { id: "watches", name: "Watches", path: `${ROUTES.ACCESSORIES}/watches` },
  { id: "scarves", name: "Scarves", path: `${ROUTES.ACCESSORIES}/scarves` },
  { id: "socks", name: "Socks", path: `${ROUTES.ACCESSORIES}/socks` },
];

// =================================================================
// COLLECTION AND TAG DEFINITIONS
// =================================================================

/**
 * Special collection types for promotional and curated displays
 * @constant {Array<Object>} COLLECTION_TYPES - Marketing collection categories
 *
 * @example
 * // Generate collection navigation menu
 * const collectionMenu = COLLECTION_TYPES.map(collection => (
 *   <Link key={collection.id} href={collection.path}>
 *     {collection.name}
 *   </Link>
 * ));
 *
 * @example
 * // Find collection by ID for routing
 * const newArrivals = COLLECTION_TYPES.find(c => c.id === 'new-arrivals');
 * router.push(newArrivals.path);
 */
export const COLLECTION_TYPES = [
  { id: "new-arrivals", name: "New Arrivals", path: ROUTES.NEW_ARRIVALS },
  { id: "best-sellers", name: "Best Sellers", path: "/shop/best-sellers" },
  { id: "trending", name: "Trending Now", path: "/shop/trending" },
  { id: "limited-edition", name: "Limited Edition", path: "/shop/limited-edition" },
  { id: "sustainable", name: "Eco-Friendly", path: "/shop/sustainable" },
];

// =================================================================
// PRODUCT CLASSIFICATION
// =================================================================

/**
 * Product tags for filtering and classification
 * @constant {Array<string>} PRODUCT_TAGS - Available product tags
 *
 * @example
 * // Filter products by tag
 * const saleProducts = products.filter(p =>
 *   p.tags.includes('sale')
 * );
 *
 * @example
 * // Tag-based product badges
 * const getBadgeColor = (tag) => {
 *   const tagColors = {
 *     'new': 'bg-green-500',
 *     'sale': 'bg-red-500',
 *     'bestseller': 'bg-blue-500',
 *     'sustainable': 'bg-green-600'
 *   };
 *   return tagColors[tag] || 'bg-gray-500';
 * };
 */
export const PRODUCT_TAGS = [
  "new",
  "sale",
  "bestseller",
  "trending",
  "limited",
  "sustainable",
  "organic",
  "vegan",
  "exclusive",
  "recycled",
  "handmade",
];

// =================================================================
// COLLECTIONS AND SPECIAL CATEGORIES
// =================================================================

/**
 * Seasonal collections for time-based marketing campaigns
 * @constant {Array<Object>} SEASONAL_COLLECTIONS - Time-based collection categories
 *
 * @example
 * // Display current season collection
 * const getCurrentSeason = () => {
 *   const month = new Date().getMonth();
 *   if (month >= 2 && month <= 4) return SEASONAL_COLLECTIONS.find(s => s.id === 'spring');
 *   if (month >= 5 && month <= 7) return SEASONAL_COLLECTIONS.find(s => s.id === 'summer');
 *   if (month >= 8 && month <= 10) return SEASONAL_COLLECTIONS.find(s => s.id === 'fall');
 *   return SEASONAL_COLLECTIONS.find(s => s.id === 'winter');
 * };
 *
 * @example
 * // Seasonal promotion banner
 * const seasonalPromo = SEASONAL_COLLECTIONS.map(season => ({
 *   ...season,
 *   isActive: season.id === getCurrentSeason()?.id
 * }));
 */
export const SEASONAL_COLLECTIONS = [
  { id: "spring", name: "Spring Collection", path: "/collections/spring" },
  { id: "summer", name: "Summer Essentials", path: "/collections/summer" },
  { id: "fall", name: "Fall Fashion", path: "/collections/fall" },
  { id: "winter", name: "Winter Wardrobe", path: "/collections/winter" },
  { id: "holiday", name: "Holiday Edit", path: "/collections/holiday" },
];

// =================================================================
// CATEGORY MAPPING
// =================================================================

/**
 * Category to subcategory mapping for dynamic navigation building
 * @constant {Object} CATEGORY_SUBCATEGORY_MAP - Maps main categories to their subcategories
 *
 * @example
 * // Generate category dropdown menu
 * const CategoryDropdown = ({ categoryId }) => {
 *   const subcategories = CATEGORY_SUBCATEGORY_MAP[categoryId] || [];
 *   return (
 *     <ul>
 *       {subcategories.map(sub => (
 *         <li key={sub.id}>
 *           <Link href={sub.path}>{sub.name}</Link>
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * };
 *
 * @example
 * // Build breadcrumb navigation
 * const buildBreadcrumbs = (categoryId, subcategoryId) => {
 *   const category = PRODUCT_CATEGORIES.find(c => c.id === categoryId);
 *   const subcategories = CATEGORY_SUBCATEGORY_MAP[categoryId] || [];
 *   const subcategory = subcategories.find(s => s.id === subcategoryId);
 *
 *   return [
 *     { name: 'Home', path: '/' },
 *     { name: category?.name, path: category?.path },
 *     { name: subcategory?.name, path: subcategory?.path }
 *   ].filter(Boolean);
 * };
 *
 * @example
 * // Category-specific filtering
 * const getSubcategories = (categoryId) => {
 *   return CATEGORY_SUBCATEGORY_MAP[categoryId] || [];
 * };
 */
export const CATEGORY_SUBCATEGORY_MAP = {
  men: MEN_SUBCATEGORIES,
  women: WOMEN_SUBCATEGORIES,
  accessories: ACCESSORIES_SUBCATEGORIES,
};
