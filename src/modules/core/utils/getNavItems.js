/**
 * @fileoverview Navigation utility functions for retrieving and filtering navigation items
 * Provides efficient lookup functions for navigation data management and menu construction
 * Supports both single item retrieval and bulk operations for navigation menu rendering
 * Optimized for performance with array methods and consistent return value handling
 */

/**
 * Gets a navigation item by its unique ID with null safety
 * @function getNavItemById
 * @param {string} id - The unique identifier of the navigation item to retrieve
 * @param {Array<Object>} navItems - The array of navigation items to search through
 * @param {string} navItems[].id - Unique identifier for each navigation item
 * @param {string} navItems[].label - Display label for the navigation item
 * @param {string} navItems[].href - URL or route path for navigation
 * @param {Array} [navItems[].children] - Optional nested navigation items
 * @returns {Object|null} The navigation item object if found, otherwise null for safe handling
 *
 * @example
 * const navItems = [
 *   { id: 'home', label: 'Home', href: '/' },
 *   { id: 'shop', label: 'Shop', href: '/shop' }
 * ];
 * const homeItem = getNavItemById('home', navItems);
 * // Returns: { id: 'home', label: 'Home', href: '/' }
 *
 * @example
 * const notFound = getNavItemById('nonexistent', navItems);
 * // Returns: null (safe for conditional rendering)
 */
export const getNavItemById = (id, navItems) => navItems.find(item => item.id === id);

/**
 * Gets multiple navigation items by their IDs for batch operations and menu filtering
 * @function getNavItemsByIds
 * @param {Array<string>} ids - Array of navigation item IDs to retrieve
 * @param {Array<Object>} navItems - The array of navigation items to search through
 * @param {string} navItems[].id - Unique identifier for each navigation item
 * @param {string} navItems[].label - Display label for the navigation item
 * @param {string} navItems[].href - URL or route path for navigation
 * @param {Array} [navItems[].children] - Optional nested navigation items
 * @returns {Array<Object>} Array of navigation items that match the provided IDs (empty array if none found)
 *
 * @example
 * const navItems = [
 *   { id: 'home', label: 'Home', href: '/' },
 *   { id: 'shop', label: 'Shop', href: '/shop' },
 *   { id: 'about', label: 'About', href: '/about' }
 * ];
 * const menuItems = getNavItemsByIds(['home', 'shop'], navItems);
 * // Returns: [
 * //   { id: 'home', label: 'Home', href: '/' },
 * //   { id: 'shop', label: 'Shop', href: '/shop' }
 * // ]
 *
 * @example
 * const footerItems = getNavItemsByIds(['about', 'contact'], navItems);
 * // Returns only items with matching IDs for footer menu construction
 */
export const getNavItemsByIds = (ids, navItems) => navItems.filter(item => ids.includes(item.id));
