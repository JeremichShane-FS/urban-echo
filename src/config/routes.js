/**
 * @fileoverview Centralized route path definitions for consistent application navigation and URL management
 * Provides organized route constants for internal linking, programmatic navigation, and URL generation
 * Organized by functional areas including shop, account, legal pages, and seasonal collections for maintainability
 */

// =================================================================
// APPLICATION ROUTE DEFINITIONS
// =================================================================

/**
 * Application route paths organized by functional areas for consistent navigation
 * @constant {Object} ROUTES - Complete collection of application route paths
 *
 * @example
 * // Navigation component usage
 * import ROUTES from '@config/routes';
 *
 * const Navigation = () => (
 *   <nav>
 *     <Link href={ROUTES.HOME}>Home</Link>
 *     <Link href={ROUTES.SHOP}>Shop</Link>
 *     <Link href={ROUTES.ABOUT}>About</Link>
 *   </nav>
 * );
 *
 * @example
 * // Programmatic navigation with Next.js router
 * import { useRouter } from 'next/navigation';
 * import ROUTES from '@config/routes';
 *
 * const handleAddToCart = () => {
 *   // Add item logic...
 *   router.push(ROUTES.CART);
 * };
 *
 * @example
 * // Dynamic route building for categories
 * const getCategoryUrl = (category) => {
 *   const categoryRoutes = {
 *     men: ROUTES.MEN,
 *     women: ROUTES.WOMEN,
 *     accessories: ROUTES.ACCESSORIES
 *   };
 *   return categoryRoutes[category] || ROUTES.SHOP;
 * };
 *
 * @example
 * // Account section navigation menu generation
 * const accountLinks = [
 *   { href: ROUTES.ACCOUNT, label: 'Dashboard', icon: 'dashboard' },
 *   { href: ROUTES.ORDERS, label: 'Order History', icon: 'orders' },
 *   { href: ROUTES.ADDRESSES, label: 'Addresses', icon: 'location' },
 *   { href: ROUTES.WISHLIST, label: 'Wishlist', icon: 'heart' }
 * ];
 */
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  ACCOUNT: "/account",
  ADDRESSES: "/account/addresses",
  ORDERS: "/account/orders",
  SETTINGS: "/account/settings",
  WISHLIST: "/account/wishlist",
  CAREERS: "/careers",
  CART: "/cart",
  CONTACT: "/contact",
  FAQS: "/faqs",
  LOGOUT: "/logout",
  RETURNS: "/returns",
  SHIPPING: "/shipping",
  SHOP: "/shop",
  ACCESSORIES: "/shop/accessories",
  MEN: "/shop/men",
  NEW_ARRIVALS: "/shop/new",
  SALE: "/shop/sale",
  WOMEN: "/shop/women",
  SIZE_GUIDE: "/size-guide",
  STORES: "/stores",
  SUSTAINABILITY: "/sustainability",

  // Legal pages
  PRIVACY: "/legal/privacy",
  TERMS: "/legal/terms",
  RETURN_POLICY: "/legal/returns",
  SHIPPING_POLICY: "/legal/shipping",

  // Utility pages
  SITEMAP: "/sitemap",
  ACCESSIBILITY: "/accessibility",

  // Collections
  SPRING_COLLECTION: "/collections/spring",
  SUMMER_COLLECTION: "/collections/summer",
  FALL_COLLECTION: "/collections/fall",
  WINTER_COLLECTION: "/collections/winter",
  HOLIDAY_COLLECTION: "/collections/holiday",
};
