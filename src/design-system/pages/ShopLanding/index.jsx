"use client";
import Link from "next/link";

import { Button } from "@design-system/buttons";

import ShopLandingView from "./ShopLandingView";
import { useShopLanding } from "./useShopLanding";

import styles from "./ShopLanding.module.scss";

const ShopLanding = () => {
  const { categories, error, featuredProducts, isLoading, newArrivals } = useShopLanding();

  return (
    <ShopLandingView
      categories={categories}
      featuredProducts={featuredProducts}
      newArrivals={newArrivals}
      isLoading={isLoading}
      error={error}
      Link={Link}
      Button={Button}
      styles={styles}
    />
  );
};
export default ShopLanding;

ShopLanding.displayName = "ShopLanding";
ShopLanding.View = ShopLandingView;
ShopLanding.useShopLanding = useShopLanding;
