/**
 * @fileoverview Custom hook for providing navigation links data from application constants
 * Serves as data provider for navigation components ensuring consistent navigation structure
 * Centralizes navigation item management and provides foundation for future navigation enhancements
 */

import { MAIN_NAV_ITEMS } from "@config/constants";

/**
 * Hook for providing main navigation items data to navigation components
 * @hook
 * @returns {Object} Navigation data and configuration
 * @returns {Array<Object>} returns.navItems - Main navigation items array with labels, paths, and metadata
 */
const useNavLinks = () => {
  const navItems = MAIN_NAV_ITEMS;

  return { navItems };
};

export default useNavLinks;
