/**
 * Navigation-related constants
 */

import ROUTES from "@config/routes";

// Navigation structure
export const MAIN_NAV_ITEMS = [
  { id: "home", label: "Home", path: ROUTES.HOME },
  { id: "shop", label: "Shop", path: ROUTES.SHOP },
  { id: "men", label: "Men", path: ROUTES.MEN },
  { id: "women", label: "Women", path: ROUTES.WOMEN },
  { id: "accessories", label: "Accessories", path: ROUTES.ACCESSORIES },
  { id: "sale", label: "Sale", path: ROUTES.SALE, highlight: true },
];

export const ACCOUNT_NAV_ITEMS = [
  { id: "profile", label: "My Profile", path: ROUTES.ACCOUNT, icon: "user" },
  { id: "orders", label: "My Orders", path: ROUTES.ORDERS, icon: "package" },
  { id: "wishlist", label: "Wishlist", path: ROUTES.WISHLIST, icon: "heart" },
  { id: "addresses", label: "Addresses", path: ROUTES.ADDRESSES, icon: "home" },
  { id: "settings", label: "Settings", path: ROUTES.SETTINGS, icon: "settings" },
  { id: "cart", label: "Shopping Cart", path: ROUTES.CART, icon: "shopping-bag" },
  { id: "logout", label: "Logout", path: ROUTES.LOGOUT, icon: "log-out" },
];

export const FOOTER_NAV_SECTIONS = [
  {
    title: "Shop",
    links: [
      { label: "Men", path: ROUTES.MEN },
      { label: "Women", path: ROUTES.WOMEN },
      { label: "Accessories", path: ROUTES.ACCESSORIES },
      { label: "Sale", path: ROUTES.SALE },
      { label: "New Arrivals", path: ROUTES.NEW_ARRIVALS },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", path: ROUTES.ABOUT },
      { label: "Stores", path: ROUTES.STORES },
      { label: "Sustainability", path: ROUTES.SUSTAINABILITY },
      { label: "Careers", path: ROUTES.CAREERS },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", path: ROUTES.CONTACT },
      { label: "FAQs", path: ROUTES.FAQS },
      { label: "Shipping", path: ROUTES.SHIPPING },
      { label: "Returns", path: ROUTES.RETURNS },
      { label: "Size Guide", path: ROUTES.SIZE_GUIDE },
    ],
  },
];

// Breadcrumb settings
export const BREADCRUMB_SEPARATOR = "/";
export const INCLUDE_HOME_IN_BREADCRUMBS = true;
export const MAX_BREADCRUMB_ITEMS = 4;
