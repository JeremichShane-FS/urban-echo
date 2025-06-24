"use client";

import { useNewArrivals } from "@modules/product/hooks/useNewArrivals";

import NewArrivalsView from "./NewArrivalsView";

const NewArrivals = () => {
  const { error, filters, loading, pagination, products } = useNewArrivals();

  const handleProductClick = (productId, productName) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "select_content", {
        content_type: "product",
        content_id: productId,
        item_name: productName,
        source: "new_arrivals",
      });
    }
  };

  const handleViewAllClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "New Arrivals",
        event_label: "View All Products",
      });
    }
  };

  return (
    <NewArrivalsView
      newArrivals={products}
      loading={loading}
      error={error}
      filters={filters}
      pagination={pagination}
      onProductClick={handleProductClick}
      onViewAllClick={handleViewAllClick}
    />
  );
};

export default NewArrivals;

NewArrivals.displayName = "NewArrivals";
NewArrivals.View = NewArrivalsView;
NewArrivals.useNewArrivals = useNewArrivals;
