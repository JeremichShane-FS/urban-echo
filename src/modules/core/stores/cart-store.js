/**
 * @fileoverview Shopping cart state management store using Zustand with persistent storage
 * FIXED: Using useShallow to prevent getServerSnapshot infinite loop by caching snapshots
 */

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import {
  CART_STORAGE_KEY,
  DEFAULT_TAX_RATE,
  FREE_SHIPPING_THRESHOLD,
  MAX_CART_ITEMS,
  MAX_QUANTITY_PER_ITEM,
  STANDARD_SHIPPING_COST,
} from "@config/constants";
import { errorHandler, formatCurrency } from "@modules/core/utils";

/**
 * Initial cart state with empty items and default values
 */
const initialState = {
  items: [],
  isLoading: false,
  lastUpdated: null,
};

/**
 * Main cart store created with Zustand for state management and persistence
 */
const useCartStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Computed property that returns total number of items across all cart entries
       */
      get totalItems() {
        const items = get().items || [];
        return items.reduce((total, item) => total + (item.quantity || 0), 0);
      },

      /**
       * Computed property that calculates subtotal before tax and shipping
       */
      get subtotal() {
        const items = get().items || [];
        return items.reduce((total, item) => {
          const price = item.price || 0;
          const quantity = item.quantity || 0;
          return total + price * quantity;
        }, 0);
      },

      /**
       * Computed property that calculates tax amount based on subtotal
       */
      get tax() {
        const subtotal = get().subtotal;
        return subtotal * DEFAULT_TAX_RATE;
      },

      /**
       * Computed property that calculates shipping cost
       */
      get shipping() {
        const subtotal = get().subtotal;
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
      },

      /**
       * Computed property that calculates final total
       */
      get total() {
        const { shipping, subtotal, tax } = get();
        return subtotal + tax + shipping;
      },

      /**
       * Computed property that returns currency-formatted subtotal string
       */
      get formattedSubtotal() {
        return formatCurrency(get().subtotal);
      },

      /**
       * Computed property that returns currency-formatted tax string
       */
      get formattedTax() {
        return formatCurrency(get().tax);
      },

      /**
       * Computed property that returns currency-formatted shipping string
       */
      get formattedShipping() {
        return formatCurrency(get().shipping);
      },

      /**
       * Computed property that returns currency-formatted total string
       */
      get formattedTotal() {
        return formatCurrency(get().total);
      },

      /**
       * Computed property that indicates whether cart contains any items
       */
      get hasItems() {
        return get().totalItems > 0;
      },

      /**
       * Computed property that indicates whether cart qualifies for free shipping
       */
      get isFreeShippingEligible() {
        return get().subtotal >= FREE_SHIPPING_THRESHOLD;
      },

      /**
       * Computed property that calculates progress percentage toward free shipping
       */
      get freeShippingProgress() {
        const subtotal = get().subtotal;
        if (subtotal >= FREE_SHIPPING_THRESHOLD) return 100;
        return Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
      },

      /**
       * Adds a product to the cart with quantity and validation checks
       */
      addItem: product => {
        try {
          const { items } = get();

          if (items.length >= MAX_CART_ITEMS) {
            errorHandler.handleError(
              new Error(`Cannot add more than ${MAX_CART_ITEMS} different items to cart`),
              "VALIDATION_ERROR",
              { maxItems: MAX_CART_ITEMS, currentItems: items.length }
            );
            return false;
          }

          const existingItemIndex = items.findIndex(item => item.id === product.id);

          if (existingItemIndex >= 0) {
            const existingItem = items[existingItemIndex];
            const newQuantity = existingItem.quantity + 1;

            if (newQuantity > MAX_QUANTITY_PER_ITEM) {
              errorHandler.handleError(
                new Error(`Cannot add more than ${MAX_QUANTITY_PER_ITEM} of the same item`),
                "VALIDATION_ERROR",
                { maxQuantity: MAX_QUANTITY_PER_ITEM, productId: product.id }
              );
              return false;
            }

            const updatedItems = [...items];
            updatedItems[existingItemIndex] = { ...existingItem, quantity: newQuantity };

            set({
              items: updatedItems,
              lastUpdated: new Date().toISOString(),
            });
          } else {
            const newItem = {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              size: product.selectedSize || product.size,
              color: product.selectedColor || product.color,
              slug: product.slug,
              quantity: product.quantity || 1,
            };

            set({
              items: [...items, newItem],
              lastUpdated: new Date().toISOString(),
            });
          }

          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "addItem",
            productId: product.id,
          });
          return false;
        }
      },

      /**
       * Removes a product from the cart by product ID
       */
      removeItem: productId => {
        try {
          const { items } = get();
          const updatedItems = items.filter(item => item.id !== productId);

          set({
            items: updatedItems,
            lastUpdated: new Date().toISOString(),
          });

          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", { action: "removeItem", productId });
          return false;
        }
      },

      /**
       * Updates the quantity of a specific cart item with validation
       */
      updateQuantity: (productId, quantity) => {
        try {
          if (quantity < 1) {
            return get().removeItem(productId);
          }

          if (quantity > MAX_QUANTITY_PER_ITEM) {
            errorHandler.handleError(
              new Error(`Cannot add more than ${MAX_QUANTITY_PER_ITEM} of the same item`),
              "VALIDATION_ERROR",
              { maxQuantity: MAX_QUANTITY_PER_ITEM, productId, requestedQuantity: quantity }
            );
            return false;
          }

          const { items } = get();
          const itemIndex = items.findIndex(item => item.id === productId);

          if (itemIndex >= 0) {
            const updatedItems = [...items];
            updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity };

            set({
              items: updatedItems,
              lastUpdated: new Date().toISOString(),
            });

            return true;
          }

          return false;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", {
            action: "updateQuantity",
            productId,
            quantity,
          });
          return false;
        }
      },

      /**
       * Removes all items from the cart
       */
      clearCart: () => {
        try {
          set({
            items: [],
            lastUpdated: new Date().toISOString(),
          });
          return true;
        } catch (error) {
          errorHandler.handleError(error, "UNKNOWN_ERROR", { action: "clearCart" });
          return false;
        }
      },

      /**
       * Retrieves a specific cart item by product ID
       */
      getItem: productId => {
        const { items } = get();
        return items.find(item => item.id === productId);
      },

      /**
       * Gets the quantity of a specific product in the cart
       */
      getItemQuantity: productId => {
        const item = get().getItem(productId);
        return item ? item.quantity : 0;
      },

      /**
       * Sets the loading state for cart operations
       */
      setLoading: isLoading => {
        set({ isLoading });
      },
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        items: state.items,
        lastUpdated: state.lastUpdated,
      }),
      onRehydrateStorage: () => state => {
        if (!state) return;
        if (!Array.isArray(state.items)) {
          state.items = [];
        }
      },
    }
  )
);

/**
 * Hook that returns cart items array
 * Using regular selector since items is already an array reference
 */
export const useCartItems = () => useCartStore(state => state.items || []);

/**
 * Hook that returns total item count in cart
 * Using regular selector since totalItems is a primitive number
 */
export const useCartCount = () => useCartStore(state => state.totalItems);

/**
 * Hook that returns cart subtotal amount
 * Using regular selector since subtotal is a primitive number
 */
export const useCartSubtotal = () => useCartStore(state => state.subtotal);

/**
 * Hook that returns cart total amount
 * Using regular selector since total is a primitive number
 */
export const useCartTotal = () => useCartStore(state => state.total);

/**
 * Hook that returns cart loading state
 * Using regular selector since isLoading is a primitive boolean
 */
export const useCartLoading = () => useCartStore(state => state.isLoading);

/**
 * Hook that returns cart action functions for modifying cart state
 * CRITICAL: Using useShallow to prevent infinite re-renders when returning object
 */
export const useCartActions = () =>
  useCartStore(
    useShallow(state => ({
      addItem: state.addItem,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      clearCart: state.clearCart,
      getItem: state.getItem,
      getItemQuantity: state.getItemQuantity,
      setLoading: state.setLoading,
    }))
  );

export default useCartStore;
