import PropTypes from "prop-types";

import CategoryPage from "@design-system/pages/CategoryPage";

export const CategoryRoute = async ({ params }) => {
  const resolvedParams = await params;
  // Merge resolved params back into params object
  // Object.assign(params, resolvedParams);
  return <CategoryPage params={resolvedParams} />;
};

export default CategoryRoute;

CategoryRoute.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
};
