"use client";

import ShopLandingView from "./ShopLandingView";
import { useShopLanding } from "./useShopLanding";

export default function ShopLanding() {
  const { categories, error, featuredProducts, isLoading, newArrivals } = useShopLanding();

  return (
    <ShopLandingView
      categories={categories}
      featuredProducts={featuredProducts}
      newArrivals={newArrivals}
      isLoading={isLoading}
      error={error}
    />
  );
}

ShopLanding.displayName = "ShopLanding";
ShopLanding.View = ShopLandingView;
ShopLanding.useShopLanding = useShopLanding;
