/**
 * Navigation-related constants
 */

// Navigation structure
export const MAIN_NAV_ITEMS = [
  { id: "home", label: "Home", path: "/" },
  { id: "shop", label: "Shop", path: "/shop" },
  { id: "men", label: "Men", path: "/shop/men" },
  { id: "women", label: "Women", path: "/shop/women" },
  { id: "accessories", label: "Accessories", path: "/shop/accessories" },
  { id: "sale", label: "Sale", path: "/shop/sale", highlight: true },
];

export const ACCOUNT_NAV_ITEMS = [
  { id: "profile", label: "My Profile", path: "/account", icon: "user" },
  { id: "orders", label: "My Orders", path: "/account/orders", icon: "package" },
  { id: "wishlist", label: "Wishlist", path: "/account/wishlist", icon: "heart" },
  { id: "addresses", label: "Addresses", path: "/account/addresses", icon: "home" },
  { id: "settings", label: "Settings", path: "/account/settings", icon: "settings" },
  { id: "cart", label: "Shopping Cart", path: "/cart", icon: "shopping-bag" },
  { id: "logout", label: "Logout", path: "/logout", icon: "log-out" },
];

export const FOOTER_NAV_SECTIONS = [
  {
    title: "Shop",
    links: [
      { label: "Men", path: "/shop/men" },
      { label: "Women", path: "/shop/women" },
      { label: "Accessories", path: "/shop/accessories" },
      { label: "Sale", path: "/shop/sale" },
      { label: "New Arrivals", path: "/shop/new" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", path: "/about" },
      { label: "Stores", path: "/stores" },
      { label: "Sustainability", path: "/sustainability" },
      { label: "Careers", path: "/careers" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", path: "/contact" },
      { label: "FAQs", path: "/faqs" },
      { label: "Shipping", path: "/shipping" },
      { label: "Returns", path: "/returns" },
      { label: "Size Guide", path: "/size-guide" },
    ],
  },
];

// Breadcrumb settings
export const BREADCRUMB_SEPARATOR = "/";
export const INCLUDE_HOME_IN_BREADCRUMBS = true;
export const MAX_BREADCRUMB_ITEMS = 4;
