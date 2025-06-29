/**
 * @fileoverview User state management with Zustand
 * Handles user authentication state and preferences using existing utilities
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from "@config/constants/localization-constants";
import { MAX_WISHLIST_ITEMS } from "@config/constants/product-constants";
import { AUTH_TOKEN_KEY, ROLE_PERMISSIONS, USER_ROLES } from "@config/constants/user-constants";
import { errorHandler } from "@modules/core/services/errorHandler";
import { formatDate } from "@modules/core/utils/formatters";
import { isValidEmail } from "@modules/core/utils/validators";

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

      isInWishlist: productId => {
        const wishlist = get().wishlist;
        return wishlist.some(item => item.id === productId);
      },

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

      hasRole: role => {
        const user = get().user;
        return user?.role === role;
      },

      hasPermission: permission => {
        const user = get().user;
        if (!user?.role) return false;

        const userPermissions = ROLE_PERMISSIONS[user.role] || [];
        return userPermissions.includes(permission);
      },

      isAdmin: () => {
        const user = get().user;
        return user?.role === USER_ROLES.ADMIN || user?.role === USER_ROLES.SUPER_ADMIN;
      },

      getUserInitials: () => {
        const user = get().user;
        if (!user) return "";

        const firstName = user.firstName || user.given_name || "";
        const lastName = user.lastName || user.family_name || "";

        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
      },

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

      getFormattedJoinDate: () => {
        const user = get().user;
        if (!user?.createdAt) return "";

        return formatDate(user.createdAt, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },

      isEmailVerified: () => {
        const user = get().user;
        return user?.emailVerified || user?.email_verified || false;
      },

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
