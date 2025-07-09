/**
 * @fileoverview Custom hook for managing product card interactions and event handling
 * Provides memoized click handlers for product card interactions with analytics tracking support
 * Encapsulates product card behavior logic for reusable interaction patterns across product displays
 */

import { useCallback } from "react";

/**
 * Hook for handling product card click interactions with memoized event handlers
 * @hook
 * @param {Function} onClick - Parent component's click handler function
 * @param {Object} product - Product data object containing id and name for tracking
 * @returns {Object} Object containing memoized click handler function
 */
export const useProductCard = ({ onClick, product }) => {
  const handleProductClick = useCallback(() => {
    if (onClick) {
      onClick(product.id, product.name);
    }
  }, [onClick, product.id, product.name]);

  return {
    handleProductClick,
  };
};
