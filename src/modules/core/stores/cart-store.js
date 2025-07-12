/**
 * @fileoverview Shopping cart state management store using Zustand with persistent storage
 * Provides comprehensive cart functionality including item management, price calculations, and validation
 * Handles cart persistence, tax calculations, shipping logic, and error handling for e-commerce operations
 * Includes computed properties for totals, formatted prices, and shopping cart business rules
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

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
 * @constant {Object}
 */
const initialState = {
  items: [],
  isLoading: false,
  lastUpdated: null,
};

/**
 * Main cart store created with Zustand for state management and persistence
 * @typedef {Object} CartStore
 * @property {Array<Object>} items - Array of cart items with product details
 * @property {boolean} isLoading - Loading state for cart operations
 * @property {string|null} lastUpdated - ISO timestamp of last cart update
 * @property {number} totalItems - Computed total number of items in cart
 * @property {number} subtotal - Computed subtotal before tax and shipping
 * @property {number} tax - Computed tax amount based on subtotal
 * @property {number} shipping - Computed shipping cost based on subtotal and thresholds
 * @property {number} total - Computed total including subtotal, tax, and shipping
 * @property {string} formattedSubtotal - Currency-formatted subtotal string
 * @property {string} formattedTax - Currency-formatted tax string
 * @property {string} formattedShipping - Currency-formatted shipping string
 * @property {string} formattedTotal - Currency-formatted total string
 * @property {boolean} hasItems - Whether cart contains any items
 * @property {boolean} isFreeShippingEligible - Whether cart qualifies for free shipping
 * @property {number} freeShippingProgress - Progress percentage toward free shipping threshold
 * @property {Function} addItem - Adds product to cart with validation
 * @property {Function} removeItem - Removes product from cart by ID
 * @property {Function} updateQuantity - Updates item quantity with validation
 * @property {Function} clearCart - Removes all items from cart
 * @property {Function} getItem - Retrieves specific cart item by product ID
 * @property {Function} getItemQuantity - Gets quantity for specific product
 * @property {Function} setLoading - Sets loading state for cart operations
 */
const useCartStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Computed property that returns total number of items across all cart entries
       * @returns {number} Total quantity of all items in cart
       */
      get totalItems() {
        const state = get();
        return (state.items || []).reduce((total, item) => total + (item.quantity || 0), 0);
      },

      /**
       * Computed property that calculates subtotal before tax and shipping
       * @returns {number} Cart subtotal amount
       */
      get subtotal() {
        const state = get();
        return (state.items || []).reduce((total, item) => {
          const price = item.price || 0;
          const quantity = item.quantity || 0;
          return total + price * quantity;
        }, 0);
      },

      /**
       * Computed property that calculates tax amount based on subtotal
       * @returns {number} Tax amount using default tax rate
       */
      get tax() {
        const subtotal = get().subtotal;
        return subtotal * DEFAULT_TAX_RATE;
      },

      /**
       * Computed property that calculates shipping cost based on subtotal and free shipping threshold
       * @returns {number} Shipping cost (0 if eligible for free shipping)
       */
      get shipping() {
        const subtotal = get().subtotal;
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
      },

      /**
       * Computed property that calculates final total including subtotal, tax, and shipping
       * @returns {number} Final cart total amount
       */
      get total() {
        const state = get();
        return state.subtotal + state.tax + state.shipping;
      },

      /**
       * Computed property that returns currency-formatted subtotal string
       * @returns {string} Formatted subtotal with currency symbol
       */
      get formattedSubtotal() {
        return formatCurrency(get().subtotal);
      },

      /**
       * Computed property that returns currency-formatted tax string
       * @returns {string} Formatted tax amount with currency symbol
       */
      get formattedTax() {
        return formatCurrency(get().tax);
      },

      /**
       * Computed property that returns currency-formatted shipping string
       * @returns {string} Formatted shipping cost with currency symbol
       */
      get formattedShipping() {
        return formatCurrency(get().shipping);
      },

      /**
       * Computed property that returns currency-formatted total string
       * @returns {string} Formatted total amount with currency symbol
       */
      get formattedTotal() {
        return formatCurrency(get().total);
      },

      /**
       * Computed property that indicates whether cart contains any items
       * @returns {boolean} True if cart has items, false if empty
       */
      get hasItems() {
        return get().totalItems > 0;
      },

      /**
       * Computed property that indicates whether cart qualifies for free shipping
       * @returns {boolean} True if subtotal meets free shipping threshold
       */
      get isFreeShippingEligible() {
        return get().subtotal >= FREE_SHIPPING_THRESHOLD;
      },

      /**
       * Computed property that calculates progress percentage toward free shipping
       * @returns {number} Progress percentage (0-100) toward free shipping threshold
       */
      get freeShippingProgress() {
        const subtotal = get().subtotal;
        if (subtotal >= FREE_SHIPPING_THRESHOLD) return 100;
        return Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
      },

      /**
       * Adds a product to the cart with quantity and validation checks
       * @function addItem
       * @param {Object} product - Product object to add to cart
       * @param {string} product.id - Unique product identifier
       * @param {string} product.name - Product name
       * @param {number} product.price - Product price
       * @param {string} product.image - Product image URL
       * @param {string} [product.selectedSize] - Selected product size
       * @param {string} [product.selectedColor] - Selected product color
       * @param {string} product.slug - URL-friendly product identifier
       * @returns {boolean} True if item was successfully added, false if validation failed
       */
      addItem: product => {
        try {
          const state = get();
          const items = state.items || [];

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
              size: product.selectedSize,
              color: product.selectedColor,
              slug: product.slug,
              quantity: 1,
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
       * @function removeItem
       * @param {string} productId - Unique product identifier to remove
       * @returns {boolean} True if item was successfully removed, false on error
       */
      removeItem: productId => {
        try {
          const state = get();
          const items = state.items || [];
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
       * @function updateQuantity
       * @param {string} productId - Unique product identifier
       * @param {number} quantity - New quantity (removes item if less than 1)
       * @returns {boolean} True if quantity was successfully updated, false if validation failed
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

          const state = get();
          const items = state.items || [];
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
       * @function clearCart
       * @returns {boolean} True if cart was successfully cleared, false on error
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
       * @function getItem
       * @param {string} productId - Unique product identifier
       * @returns {Object|undefined} Cart item object or undefined if not found
       */
      getItem: productId => {
        const state = get();
        const items = state.items || [];
        return items.find(item => item.id === productId);
      },

      /**
       * Gets the quantity of a specific product in the cart
       * @function getItemQuantity
       * @param {string} productId - Unique product identifier
       * @returns {number} Quantity of the product in cart (0 if not found)
       */
      getItemQuantity: productId => {
        const item = get().getItem(productId);
        return item ? item.quantity : 0;
      },

      /**
       * Sets the loading state for cart operations
       * @function setLoading
       * @param {boolean} isLoading - Loading state to set
       */
      setLoading: isLoading => {
        set({ isLoading });
      },
    }),
    {
      name: CART_STORAGE_KEY,
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
 * @hook
 * @returns {Array<Object>} Array of cart items
 */
export const useCartItems = () => useCartStore(state => state.items || []);

/**
 * Hook that returns total item count in cart
 * @hook
 * @returns {number} Total number of items in cart
 */
export const useCartCount = () => useCartStore(state => state.totalItems);

/**
 * Hook that returns cart subtotal amount
 * @hook
 * @returns {number} Cart subtotal before tax and shipping
 */
export const useCartSubtotal = () => useCartStore(state => state.subtotal);

/**
 * Hook that returns cart total amount
 * @hook
 * @returns {number} Final cart total including tax and shipping
 */
export const useCartTotal = () => useCartStore(state => state.total);

/**
 * Hook that returns cart loading state
 * @hook
 * @returns {boolean} Whether cart operations are currently loading
 */
export const useCartLoading = () => useCartStore(state => state.isLoading);

/**
 * Hook that returns cart action functions for modifying cart state
 * @hook
 * @returns {Object} Object containing cart action functions
 * @returns {Function} returns.addItem - Function to add item to cart
 * @returns {Function} returns.removeItem - Function to remove item from cart
 * @returns {Function} returns.updateQuantity - Function to update item quantity
 * @returns {Function} returns.clearCart - Function to clear all cart items
 * @returns {Function} returns.getItem - Function to get specific cart item
 * @returns {Function} returns.getItemQuantity - Function to get item quantity
 * @returns {Function} returns.setLoading - Function to set loading state
 */
export const useCartActions = () =>
  useCartStore(state => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,
    getItem: state.getItem,
    getItemQuantity: state.getItemQuantity,
    setLoading: state.setLoading,
  }));

export default useCartStore;
