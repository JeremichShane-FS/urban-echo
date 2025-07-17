/**
 * @fileoverview Navigation structure constants for header menus, mobile navigation, and breadcrumb generation
 * Defines main navigation hierarchy, mobile menu configurations, and user account navigation patterns
 * Supports responsive navigation, accessibility compliance, and dynamic menu generation across the application
 */

import { ROUTES } from "@config/routes";

// =================================================================
// MAIN NAVIGATION STRUCTURE
// =================================================================

/**
 * Primary navigation menu structure with accessibility support
 * @constant {Array<Object>} MAIN_NAV_ITEMS - Complete navigation hierarchy
 *
 * @example
 * // Render main navigation menu
 * const MainNavigation = () => (
 *   <nav className="main-nav">
 *     {MAIN_NAV_ITEMS.map(item => (
 *       <Link key={item.id} href={item.path} aria-label={item.ariaLabel}>
 *         {item.label}
 *       </Link>
 *     ))}
 *   </nav>
 * );
 */
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

// =================================================================
// USER ACCOUNT NAVIGATION
// =================================================================

/**
 * Account dashboard navigation for user profile and order management
 * @constant {Array<Object>} ACCOUNT_NAV_ITEMS - User account navigation structure
 *
 * @example
 * // Render account sidebar navigation
 * const AccountSidebar = ({ cartCount }) => (
 *   <aside className="account-sidebar">
 *     {ACCOUNT_NAV_ITEMS.map(item => (
 *       <Link
 *         key={item.id}
 *         href={item.path}
 *         aria-label={item.getAriaLabel ? item.getAriaLabel(cartCount) : item.ariaLabel}
 *       >
 *         <Icon name={item.icon} />
 *         {item.label}
 *       </Link>
 *     ))}
 *   </aside>
 * );
 */
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

// =================================================================
// BREADCRUMB CONFIGURATION
// =================================================================

/**
 * Breadcrumb navigation settings and display preferences
 *
 * @example
 * // Generate breadcrumb component
 * const Breadcrumbs = ({ items }) => (
 *   <nav aria-label="Breadcrumb">
 *     <ol className="breadcrumb">
 *       {INCLUDE_HOME_IN_BREADCRUMBS && (
 *         <li><Link href="/">Home</Link></li>
 *       )}
 *       {items.slice(0, MAX_BREADCRUMB_ITEMS).map((item, index) => (
 *         <li key={item.path}>
 *           <Link href={item.path}>{item.label}</Link>
 *           <span>{BREADCRUMB_SEPARATOR}</span>
 *         </li>
 *       ))}
 *     </ol>
 *   </nav>
 * );
 */
export const BREADCRUMB_SEPARATOR = "/";
export const INCLUDE_HOME_IN_BREADCRUMBS = true;
export const MAX_BREADCRUMB_ITEMS = 4;
