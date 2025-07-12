/**
 * @fileoverview Shop landing page component providing comprehensive e-commerce category overview
 * Integrates categories, featured products, new arrivals, and promotional sections for optimal shopping experience
 * Serves as main entry point to product catalog with visual category navigation and product discovery
 */

"use client";
import Link from "next/link";

import { Button } from "@design-system/buttons";

import ShopLandingView from "./ShopLandingView";
import useShopLanding from "./useShopLanding";

import styles from "./ShopLanding.module.scss";

/**
 * Container component for shop landing page with comprehensive product and category data management
 * @component
 * @returns {JSX.Element} Rendered shop landing page with categories, promotions, and product sections
 */
const ShopLanding = () => {
  const { categories, error, featuredProducts, isLoading, newArrivals } = useShopLanding();

  return (
    <ShopLandingView
      Button={Button}
      Link={Link}
      categories={categories}
      error={error}
      featuredProducts={featuredProducts}
      isLoading={isLoading}
      newArrivals={newArrivals}
      styles={styles}
    />
  );
};
export default ShopLanding;

ShopLanding.displayName = "ShopLanding";
ShopLanding.View = ShopLandingView;
ShopLanding.useShopLanding = useShopLanding;
