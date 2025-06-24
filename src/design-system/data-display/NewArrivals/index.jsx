"use client";

import { useNewArrivals } from "@modules/product/hooks/useNewArrivals";

import NewArrivalsView from "./NewArrivalsView";

const NewArrivals = () => {
  const newArrivalsProps = useNewArrivals();

  return <NewArrivalsView {...newArrivalsProps} />;
};

export default NewArrivals;

NewArrivals.displayName = "NewArrivals";
NewArrivals.View = NewArrivalsView;
NewArrivals.useNewArrivals = useNewArrivals;
