/**
 * @fileoverview Centralized barrel export file for Zustand state management stores
 * Provides unified access to cart store, user store, and all their associated hooks and utilities
 * Simplifies import statements across components and maintains clean project architecture
 * Exports both store instances and specialized hooks for granular state access and performance optimization
 *
 * @example - Instead of multiple imports:
 * import useCartStore, { useCartItems, useCartActions } from './cart-store';
 * import useUserStore, { useUser, useUserActions } from './user-store';
 *
 * You can now import from a single location:
 * import {
 *   useCartStore,
 *   useCartItems,
 *   useCartActions,
 *   useUserStore,
 *   useUser,
 *   useUserActions
 * } from '@modules/core/stores';
 */

// Cart Store Exports
export {
  useCartActions,
  useCartCount,
  useCartItems,
  useCartLoading,
  default as useCartStore,
  useCartSubtotal,
  useCartTotal,
} from "./cart-store";

// User Store Exports
export {
  useAuthState,
  useRecentlyViewed,
  useUser,
  useUserActions,
  useUserPermissions,
  useUserPreferences,
  default as useUserStore,
  useWishlist,
} from "./user-store";
