"use client";

import { useNewArrivals } from "@modules/product/hooks";

import NewArrivalsView from "./NewArrivalsView";

const NewArrivals = () => {
  const { error, filters, handleProductClick, handleViewAllClick, loading, pagination, products } =
    useNewArrivals();

  return (
    <NewArrivalsView
      newArrivals={products}
      loading={loading}
      error={error?.message || null}
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
