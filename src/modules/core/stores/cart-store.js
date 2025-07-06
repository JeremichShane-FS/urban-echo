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
import { errorHandler } from "@modules/core/services/errorHandler";
import { formatCurrency } from "@modules/core/utils/formatters";

const initialState = {
  items: [],
  isLoading: false,
  lastUpdated: null,
};

const useCartStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      get totalItems() {
        const state = get();
        return (state.items || []).reduce((total, item) => total + (item.quantity || 0), 0);
      },

      get subtotal() {
        const state = get();
        return (state.items || []).reduce((total, item) => {
          const price = item.price || 0;
          const quantity = item.quantity || 0;
          return total + price * quantity;
        }, 0);
      },

      get tax() {
        const subtotal = get().subtotal;
        return subtotal * DEFAULT_TAX_RATE;
      },

      get shipping() {
        const subtotal = get().subtotal;
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
      },

      get total() {
        const state = get();
        return state.subtotal + state.tax + state.shipping;
      },

      get formattedSubtotal() {
        return formatCurrency(get().subtotal);
      },

      get formattedTax() {
        return formatCurrency(get().tax);
      },

      get formattedShipping() {
        return formatCurrency(get().shipping);
      },

      get formattedTotal() {
        return formatCurrency(get().total);
      },

      get hasItems() {
        return get().totalItems > 0;
      },

      get isFreeShippingEligible() {
        return get().subtotal >= FREE_SHIPPING_THRESHOLD;
      },

      get freeShippingProgress() {
        const subtotal = get().subtotal;
        if (subtotal >= FREE_SHIPPING_THRESHOLD) return 100;
        return Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
      },

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

      getItem: productId => {
        const state = get();
        const items = state.items || [];
        return items.find(item => item.id === productId);
      },

      getItemQuantity: productId => {
        const item = get().getItem(productId);
        return item ? item.quantity : 0;
      },

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

export const useCartItems = () => useCartStore(state => state.items || []);
export const useCartCount = () => useCartStore(state => state.totalItems);
export const useCartSubtotal = () => useCartStore(state => state.subtotal);
export const useCartTotal = () => useCartStore(state => state.total);
export const useCartLoading = () => useCartStore(state => state.isLoading);
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
