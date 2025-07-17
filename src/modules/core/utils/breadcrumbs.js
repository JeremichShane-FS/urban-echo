/**
 * @fileoverview Utility functions for generating breadcrumb navigation across the e-commerce site
 * Provides standardized breadcrumb generation for consistent navigation experience
 */

import { ROUTES } from "@config/constants";

/**
 * Generate breadcrumb items for category pages
 * @param {string} category - Category slug or identifier
 * @param {string} [subcategory] - Optional subcategory for nested navigation
 * @returns {Array<Object>} Breadcrumb items array
 */
export const generateCategoryBreadcrumbs = (category, subcategory = null) => {
  const breadcrumbs = [{ path: ROUTES.SHOP, label: "Shop" }];

  if (category && category !== "all") {
    const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
    breadcrumbs.push({
      path: `${ROUTES.SHOP}/${category}`,
      label: categoryLabel,
    });

    if (subcategory) {
      const subcategoryLabel = subcategory.charAt(0).toUpperCase() + subcategory.slice(1);
      breadcrumbs.push({
        path: `${ROUTES.SHOP}/${category}/${subcategory}`,
        label: subcategoryLabel,
      });
    }
  } else if (category === "all") {
    breadcrumbs.push({
      path: `${ROUTES.SHOP}/all`,
      label: "All Products",
    });
  }

  return breadcrumbs;
};

/**
 * Generate breadcrumb items for product detail pages
 * @param {Object} product - Product object with category information
 * @param {string} product.category - Product category slug
 * @param {string} product.name - Product name for final breadcrumb
 * @param {string} product.id - Product ID for URL generation
 * @returns {Array<Object>} Breadcrumb items array
 */
export const generateProductBreadcrumbs = product => {
  if (!product) return [];

  const breadcrumbs = [{ path: ROUTES.SHOP, label: "Shop" }];

  if (product.category && product.category !== "all") {
    const categoryLabel = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    breadcrumbs.push({
      path: `${ROUTES.SHOP}/${product.category}`,
      label: categoryLabel,
    });
  }

  // Add product as final breadcrumb (non-clickable)
  breadcrumbs.push({
    path: `/product/${product.id}`,
    label: product.name || "Product Details",
  });

  return breadcrumbs;
};

/**
 * Generate breadcrumb items for account pages
 * @param {string} page - Account page identifier (profile, orders, etc.)
 * @returns {Array<Object>} Breadcrumb items array
 */
export const generateAccountBreadcrumbs = page => {
  const breadcrumbs = [{ path: ROUTES.ACCOUNT, label: "My Account" }];

  const pageLabels = {
    profile: "Profile",
    orders: "My Orders",
    addresses: "Addresses",
    wishlist: "Wishlist",
    settings: "Settings",
  };

  if (page && pageLabels[page]) {
    breadcrumbs.push({
      path: `${ROUTES.ACCOUNT}/${page}`,
      label: pageLabels[page],
    });
  }

  return breadcrumbs;
};

/**
 * Generate breadcrumb items for checkout flow
 * @param {string} step - Checkout step (cart, shipping, payment, confirmation)
 * @returns {Array<Object>} Breadcrumb items array
 */
export const generateCheckoutBreadcrumbs = step => {
  const breadcrumbs = [{ path: ROUTES.CART, label: "Shopping Cart" }];

  const stepLabels = {
    shipping: "Shipping Information",
    payment: "Payment",
    confirmation: "Order Confirmation",
  };

  if (step && stepLabels[step]) {
    breadcrumbs.push({
      path: `/checkout/${step}`,
      label: stepLabels[step],
    });
  }

  return breadcrumbs;
};

/**
 * Generate breadcrumb items for search results
 * @param {string} query - Search query string
 * @param {string} [category] - Optional category filter
 * @returns {Array<Object>} Breadcrumb items array
 */
export const generateSearchBreadcrumbs = (query, category = null) => {
  const breadcrumbs = [{ path: ROUTES.SHOP, label: "Shop" }];

  if (category && category !== "all") {
    const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
    breadcrumbs.push({
      path: `${ROUTES.SHOP}/${category}`,
      label: categoryLabel,
    });
  }

  breadcrumbs.push({
    path: `/search?q=${encodeURIComponent(query)}${category ? `&category=${category}` : ""}`,
    label: `Search: "${query}"`,
  });

  return breadcrumbs;
};

/**
 * Truncate breadcrumb label if too long
 * @param {string} label - Original label
 * @param {number} [maxLength=25] - Maximum character length
 * @returns {string} Truncated label
 */
export const truncateBreadcrumbLabel = (label, maxLength = 25) => {
  if (label.length <= maxLength) return label;
  return `${label.slice(0, maxLength - 3)}...`;
};

/**
 * Format category name for display
 * @param {string} category - Category slug
 * @returns {string} Formatted category name
 */
export const formatCategoryName = category => {
  if (!category || category === "all") return "All Products";

  // Handle special cases
  const specialCases = {
    mens: "Men's",
    womens: "Women's",
    kids: "Kids'",
    "home-decor": "Home Décor",
  };

  if (specialCases[category]) {
    return specialCases[category];
  }

  // Default formatting: capitalize first letter and replace hyphens with spaces
  return category
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
