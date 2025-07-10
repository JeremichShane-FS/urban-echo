/**
 * @fileoverview User state management store using Zustand with comprehensive authentication and preference handling
 * Manages user authentication state, preferences, wishlist, recently viewed products, and role-based permissions
 * Provides secure user data persistence, validation, and role-based access control for e-commerce operations
 * Includes utility functions for user display, permission checks, and profile management with error handling
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  AUTH_TOKEN_KEY,
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
  MAX_WISHLIST_ITEMS,
  ROLE_PERMISSIONS,
  USER_ROLES,
} from "@config/constants";
import { errorHandler, formatDate, isValidEmail } from "@modules/core/utils";

/**
 * Main user store created with Zustand for state management and persistence
 * @typedef {Object} UserStore
 * @property {Object|null} user - Current user object with profile information
 * @property {boolean} isAuthenticated - Authentication status
 * @property {Object} preferences - User preferences including theme, currency, and notifications
 * @property {Array<Object>} wishlist - User's wishlist items with product details
 * @property {Array<Object>} recentlyViewed - Recently viewed products for recommendations
 * @property {Function} setUser - Sets user data and authentication state
 * @property {Function} updateUser - Updates user profile information
 * @property {Function} logout - Clears user data and authentication state
 * @property {Function} updatePreferences - Updates user preferences
 * @property {Function} toggleTheme - Toggles between light and dark theme
 * @property {Function} addToWishlist - Adds product to user's wishlist
 * @property {Function} removeFromWishlist - Removes product from wishlist
 * @property {Function} isInWishlist - Checks if product is in wishlist
 * @property {Function} clearWishlist - Clears all wishlist items
 * @property {Function} addToRecentlyViewed - Adds product to recently viewed list
 * @property {Function} clearRecentlyViewed - Clears recently viewed products
 * @property {Function} hasRole - Checks if user has specific role
 * @property {Function} hasPermission - Checks if user has specific permission
 * @property {Function} isAdmin - Checks if user has admin privileges
 * @property {Function} getUserInitials - Gets user initials for avatar display
 * @property {Function} getUserDisplayName - Gets formatted display name
 * @property {Function} getFormattedJoinDate - Gets formatted join date
 * @property {Function} isEmailVerified - Checks email verification status
 * @property {Function} needsPasswordReset - Checks if password reset is required
 */
const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      preferences: {
        theme: "light",
        currency: DEFAULT_CURRENCY,
        language: DEFAULT_LOCALE,
        newsletters: true,
        notifications: true,
      },
      wishlist: [],
      recentlyViewed: [],

      /**
       * Sets user data and authentication state with email validation
       * @function setUser
       * @param {Object|null} userData - User data object or null to clear user
       * @param {string} userData.email - User's email address (required)
       * @param {string} userData.firstName - User's first name
       * @param {string} userData.lastName - User's last name
       * @param {string} userData.role - User's role for permission management
       * @returns {boolean} True if user was successfully set, false if validation failed
       */
      setUser: userData => {
        try {
          if (userData && !isValidEmail(userData.email)) {
            const error = new Error("Invalid user email format");
            errorHandler.handleError(error, "VALIDATION_ERROR", {
              action: "setUser",
              email: userData.email,
            });
            return false;
          }

          set({
            user: userData,
            isAuthenticated: !!userData,
          });

          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "setUser",
          });
          return false;
        }
      },

      /**
       * Updates user profile information with validation
       * @function updateUser
       * @param {Object} updates - Partial user data to update
       * @param {string} [updates.email] - Updated email address (validated)
       * @param {string} [updates.firstName] - Updated first name
       * @param {string} [updates.lastName] - Updated last name
       * @param {string} [updates.phone] - Updated phone number
       * @returns {boolean} True if user was successfully updated, false if validation failed
       */
      updateUser: updates => {
        try {
          if (updates.email && !isValidEmail(updates.email)) {
            const error = new Error("Invalid email format");
            errorHandler.handleError(error, "VALIDATION_ERROR", {
              action: "updateUser",
              email: updates.email,
            });
            return false;
          }

          set(state => ({
            user: state.user ? { ...state.user, ...updates } : null,
          }));

          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "updateUser",
          });
          return false;
        }
      },

      /**
       * Logs out user by clearing all user data and authentication tokens
       * @function logout
       * @returns {boolean} True if logout was successful, false on error
       */
      logout: () => {
        try {
          set({
            user: null,
            isAuthenticated: false,
            wishlist: [],
            recentlyViewed: [],
          });

          if (typeof window !== "undefined") {
            localStorage.removeItem(AUTH_TOKEN_KEY);
          }

          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "logout",
          });
          return false;
        }
      },

      /**
       * Updates user preferences for theme, currency, notifications, etc.
       * @function updatePreferences
       * @param {Object} newPreferences - Preference updates to apply
       * @param {string} [newPreferences.theme] - Theme preference (light/dark)
       * @param {string} [newPreferences.currency] - Currency preference
       * @param {string} [newPreferences.language] - Language preference
       * @param {boolean} [newPreferences.newsletters] - Newsletter subscription preference
       * @param {boolean} [newPreferences.notifications] - Notification preference
       * @returns {boolean} True if preferences were successfully updated, false on error
       */
      updatePreferences: newPreferences => {
        try {
          set(state => ({
            preferences: { ...state.preferences, ...newPreferences },
          }));

          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "updatePreferences",
          });
          return false;
        }
      },

      /**
       * Toggles the theme preference between light and dark mode
       * @function toggleTheme
       * @returns {boolean} True if theme was successfully toggled, false on error
       */
      toggleTheme: () => {
        try {
          set(state => ({
            preferences: {
              ...state.preferences,
              theme: state.preferences.theme === "light" ? "dark" : "light",
            },
          }));

          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "toggleTheme",
          });
          return false;
        }
      },

      /**
       * Adds a product to user's wishlist with duplicate prevention and limit validation
       * @function addToWishlist
       * @param {Object} product - Product object to add to wishlist
       * @param {string} product.id - Product unique identifier
       * @param {string} product.name - Product name
       * @param {number} product.price - Product price
       * @param {Array} product.images - Product images array
       * @param {string} product.slug - Product URL slug
       * @returns {boolean} True if product was successfully added, false if validation failed
       */
      addToWishlist: product => {
        try {
          const currentWishlist = get().wishlist;

          if (currentWishlist.length >= MAX_WISHLIST_ITEMS) {
            const error = new Error(`Cannot add more than ${MAX_WISHLIST_ITEMS} items to wishlist`);
            errorHandler.handleError(error, "VALIDATION_ERROR", {
              action: "addToWishlist",
              productId: product.id,
              currentCount: currentWishlist.length,
            });
            return false;
          }

          set(state => {
            const isAlreadyInWishlist = state.wishlist.some(item => item.id === product.id);
            if (isAlreadyInWishlist) {
              return state;
            }

            return {
              wishlist: [
                ...state.wishlist,
                {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0]?.url || "/placeholder-product.jpg",
                  slug: product.slug,
                  addedAt: new Date().toISOString(),
                },
              ],
            };
          });

          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "addToWishlist",
            productId: product?.id,
          });
          return false;
        }
      },

      /**
       * Removes a product from user's wishlist by product ID
       * @function removeFromWishlist
       * @param {string} productId - Product ID to remove from wishlist
       * @returns {boolean} True if product was successfully removed, false on error
       */
      removeFromWishlist: productId => {
        try {
          set(state => ({
            wishlist: state.wishlist.filter(item => item.id !== productId),
          }));

          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "removeFromWishlist",
            productId,
          });
          return false;
        }
      },

      /**
       * Checks if a product is currently in user's wishlist
       * @function isInWishlist
       * @param {string} productId - Product ID to check
       * @returns {boolean} True if product is in wishlist, false otherwise
       */
      isInWishlist: productId => {
        const wishlist = get().wishlist;
        return wishlist.some(item => item.id === productId);
      },

      /**
       * Clears all items from user's wishlist
       * @function clearWishlist
       * @returns {boolean} True if wishlist was successfully cleared, false on error
       */
      clearWishlist: () => {
        try {
          set({ wishlist: [] });
          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "clearWishlist",
          });
          return false;
        }
      },

      /**
       * Adds a product to recently viewed list with automatic deduplication and limit
       * @function addToRecentlyViewed
       * @param {Object} product - Product object to add to recently viewed
       * @param {string} product.id - Product unique identifier
       * @param {string} product.name - Product name
       * @param {number} product.price - Product price
       * @param {Array} product.images - Product images array
       * @param {string} product.slug - Product URL slug
       * @returns {boolean} True if product was successfully added, false on error
       */
      addToRecentlyViewed: product => {
        try {
          set(state => {
            const filtered = state.recentlyViewed.filter(item => item.id !== product.id);

            // Add to beginning and limit to 10 items
            const updated = [
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images?.[0]?.url || "/placeholder-product.jpg",
                slug: product.slug,
                viewedAt: new Date().toISOString(),
              },
              ...filtered,
            ].slice(0, 10);

            return { recentlyViewed: updated };
          });

          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "addToRecentlyViewed",
            productId: product?.id,
          });
          return false;
        }
      },

      /**
       * Clears all recently viewed products
       * @function clearRecentlyViewed
       * @returns {boolean} True if recently viewed was successfully cleared, false on error
       */
      clearRecentlyViewed: () => {
        try {
          set({ recentlyViewed: [] });
          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "clearRecentlyViewed",
          });
          return false;
        }
      },

      /**
       * Checks if user has a specific role
       * @function hasRole
       * @param {string} role - Role to check against user's role
       * @returns {boolean} True if user has the specified role, false otherwise
       */
      hasRole: role => {
        const user = get().user;
        return user?.role === role;
      },

      /**
       * Checks if user has a specific permission based on their role
       * @function hasPermission
       * @param {string} permission - Permission to check
       * @returns {boolean} True if user has the specified permission, false otherwise
       */
      hasPermission: permission => {
        const user = get().user;
        if (!user?.role) return false;

        const userPermissions = ROLE_PERMISSIONS[user.role] || [];
        return userPermissions.includes(permission);
      },

      /**
       * Checks if user has admin privileges (admin or super admin role)
       * @function isAdmin
       * @returns {boolean} True if user is admin or super admin, false otherwise
       */
      isAdmin: () => {
        const user = get().user;
        return user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.SUPER_ADMIN;
      },

      /**
       * Gets user initials for avatar display from first and last name
       * @function getUserInitials
       * @returns {string} User initials in uppercase or empty string if no user
       */
      getUserInitials: () => {
        const user = get().user;
        if (!user) return "";

        const firstName = user.firstName || user.given_name || "";
        const lastName = user.lastName || user.family_name || "";

        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
      },

      /**
       * Gets formatted display name with fallback hierarchy
       * @function getUserDisplayName
       * @returns {string} User display name with fallbacks to "Guest" if no user
       */
      getUserDisplayName: () => {
        const user = get().user;
        if (!user) return "Guest";

        return (
          user.name ||
          `${user.firstName || user.given_name || ""} ${user.lastName || user.family_name || ""}`.trim() ||
          user.email ||
          "User"
        );
      },

      /**
       * Gets formatted join date for user profile display
       * @function getFormattedJoinDate
       * @returns {string} Formatted join date or empty string if no join date
       */
      getFormattedJoinDate: () => {
        const user = get().user;
        if (!user?.createdAt) return "";

        return formatDate(user.createdAt, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },

      /**
       * Checks if user's email address has been verified
       * @function isEmailVerified
       * @returns {boolean} True if email is verified, false otherwise
       */
      isEmailVerified: () => {
        const user = get().user;
        return user?.emailVerified || user?.email_verified || false;
      },

      /**
       * Checks if user needs to reset their password
       * @function needsPasswordReset
       * @returns {boolean} True if password reset is required, false otherwise
       */
      needsPasswordReset: () => {
        const user = get().user;
        return user?.requirePasswordReset || false;
      },
    }),
    {
      name: "urban-echo-user",

      partialize: state => ({
        preferences: state.preferences,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
      }),

      onRehydrateStorage: () => (state, error) => {
        if (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "rehydrateUser",
            source: "localStorage",
          });
        } else {
          console.log("User state rehydrated successfully");
        }
      },
    }
  )
);

/**
 *
 * @returns {Object} Current user object from the store
 * @returns {boolean} Authentication status
 * @returns {Object} User preferences including theme, currency, and notifications
 * @returns {Array<Object>} User's wishlist items with product details
 * @returns {Array<Object>} Recently viewed products for recommendations
 * @returns {Function} User action functions for profile and preference management
 * @returns {Function} Permission check functions for role-based access control
 *
 * @example
 * const user = useUser();
 * const isAuthenticated = useAuthState();
 * const preferences = useUserPreferences();
 * const wishlist = useWishlist();
 * const recentlyViewed = useRecentlyViewed();
 * const { setUser, updateUser, logout } = useUserActions();
 * const { hasRole, hasPermission, isAdmin } = useUserPermissions();
 */
export const useUser = () => useUserStore(state => state.user);
export const useAuthState = () => useUserStore(state => state.isAuthenticated);
export const useUserPreferences = () => useUserStore(state => state.preferences);
export const useWishlist = () => useUserStore(state => state.wishlist);
export const useRecentlyViewed = () => useUserStore(state => state.recentlyViewed);
export const useUserActions = () =>
  useUserStore(state => ({
    setUser: state.setUser,
    updateUser: state.updateUser,
    logout: state.logout,
    updatePreferences: state.updatePreferences,
    toggleTheme: state.toggleTheme,
    addToWishlist: state.addToWishlist,
    removeFromWishlist: state.removeFromWishlist,
    isInWishlist: state.isInWishlist,
    clearWishlist: state.clearWishlist,
    addToRecentlyViewed: state.addToRecentlyViewed,
    clearRecentlyViewed: state.clearRecentlyViewed,
    hasRole: state.hasRole,
    hasPermission: state.hasPermission,
    isAdmin: state.isAdmin,
    getUserDisplayName: state.getUserDisplayName,
    getUserInitials: state.getUserInitials,
    getFormattedJoinDate: state.getFormattedJoinDate,
    isEmailVerified: state.isEmailVerified,
    needsPasswordReset: state.needsPasswordReset,
  }));

export const useUserPermissions = () =>
  useUserStore(state => ({
    hasRole: state.hasRole,
    hasPermission: state.hasPermission,
    isAdmin: state.isAdmin,
    isAuthenticated: state.isAuthenticated,
  }));

export default useUserStore;
