/**
 * @fileoverview Barrel export file for Zustand stores
 * This file centralizes exports for all state management stores in the project
 * making imports cleaner and more organized across components.
 *
 * @example
 * Instead of multiple imports:
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
 * } from './stores';
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
