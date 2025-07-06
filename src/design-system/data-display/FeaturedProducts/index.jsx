// src/design-system/data-display/FeaturedProducts/index.jsx
import { useFeaturedProducts } from "@modules/product/hooks";

import FeaturedProductsView from "./FeaturedProductsView";

const FeaturedProducts = () => {
  const { data, error, isLoading, onProductClick } = useFeaturedProducts();

  return (
    <FeaturedProductsView
      featuredProducts={data || []}
      isLoading={isLoading}
      error={error?.message || null}
      onProductClick={onProductClick}
    />
  );
};

export default FeaturedProducts;

FeaturedProducts.displayName = "FeaturedProducts";
FeaturedProducts.View = FeaturedProductsView;
FeaturedProducts.useFeaturedProducts = useFeaturedProducts;
