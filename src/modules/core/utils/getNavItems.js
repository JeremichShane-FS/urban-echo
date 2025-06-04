/**
 * Utility functions to retrieve navigation items by their IDs.
 *
 */

/**
 * Gets a navigation item by its ID
 * @param {string} id - The ID of the navigation item
 * @param {Array} navItems - The array of navigation items
 * @return {Object|null} The navigation item if found, otherwise null
 */
export const getNavItemById = (id, navItems) => navItems.find(item => item.id === id);

/**
 * Gets multiple navigation items by their IDs
 * @param {Array} ids - The array of IDs to search for
 * @param {Array} navItems - The array of navigation items
 * @return {Array} Array of navigation items that match the IDs
 */
export const getNavItemsByIds = (ids, navItems) => navItems.filter(item => ids.includes(item.id));
