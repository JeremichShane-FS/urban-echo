/**
 * Navigation-related constants
 */

import ROUTES from "@config/routes";

// Navigation structure
export const MAIN_NAV_ITEMS = [
  { id: "home", label: "Home", ariaLabel: "Urban Echo Home", path: ROUTES.HOME },
  { id: "shop", label: "Shop", ariaLabel: "Shop Categories", path: ROUTES.SHOP },
  { id: "men", label: "Men", ariaLabel: "Shop Men Clothing", path: ROUTES.MEN },
  { id: "women", label: "Women", ariaLabel: "Shop Women Clothing", path: ROUTES.WOMEN },
  {
    id: "accessories",
    label: "Accessories",
    ariaLabel: "Shop Accessories",
    path: ROUTES.ACCESSORIES,
  },
  {
    id: "sale",
    label: "Sale",
    ariaLabel: "Shop Sale Items",
    path: ROUTES.SALE,
    highlight: true,
  },
];

export const ACCOUNT_NAV_ITEMS = [
  {
    id: "account",
    label: "My Account",
    ariaLabel: "Go to My Account",
    path: ROUTES.ACCOUNT,
    icon: "user",
  },
  {
    id: "orders",
    label: "My Orders",
    ariaLabel: "View My Orders",
    path: ROUTES.ORDERS,
    icon: "package",
  },
  {
    id: "wishlist",
    label: "Wishlist",
    ariaLabel: "View Wishlist",
    path: ROUTES.WISHLIST,
    icon: "heart",
  },
  {
    id: "addresses",
    label: "Addresses",
    ariaLabel: "Manage Addresses",
    path: ROUTES.ADDRESSES,
    icon: "home",
  },
  {
    id: "settings",
    label: "Settings",
    ariaLabel: "Account Settings",
    path: ROUTES.SETTINGS,
    icon: "settings",
  },
  {
    id: "cart",
    label: "Shopping Cart",
    getAriaLabel: cartCount =>
      `Shopping cart with ${cartCount} ${cartCount === 1 ? "item" : "items"}`,
    path: ROUTES.CART,
    icon: "shopping-bag",
  },
  { id: "logout", label: "Logout", ariaLabel: "Log Out", path: ROUTES.LOGOUT, icon: "log-out" },
];

// Breadcrumb settings
export const BREADCRUMB_SEPARATOR = "/";
export const INCLUDE_HOME_IN_BREADCRUMBS = true;
export const MAX_BREADCRUMB_ITEMS = 4;
