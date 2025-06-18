import { useFeaturedProducts } from "@/modules/product/hooks/useFeaturedProducts";

import FeaturedProductsView from "./FeaturedProductsView";

const FeaturedProducts = () => {
  const featuredProductsProps = useFeaturedProducts();

  return <FeaturedProductsView {...featuredProductsProps} />;
};

export default FeaturedProducts;
