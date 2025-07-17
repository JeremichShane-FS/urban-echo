/**
 * @fileoverview Product page route for category/slug/id URL structure
 * Path: src/app/shop/[category]/[slug]/[id]/page.jsx
 * Example: /shop/men/premium-cotton-shirt/6871817f6f3e94d4980860bd
 */

import { notFound } from "next/navigation";
import PropTypes from "prop-types";

import ProductPage from "@design-system/pages/ProductPage";

/**
 * Product page route - extracts category, slug, and ID from URL and passes to ProductPage
 * @param {Object} props - Component props
 * @param {Object} props.params - URL parameters extracted by Next.js
 * @param {string} props.params.category - Category from URL (men, women, accessories)
 * @param {string} props.params.slug - Product slug from URL (for SEO)
 * @param {string} props.params.id - Product ID from URL (for database lookup)
 */
export default function CategorySlugIdProductPage({ params }) {
  const { category, id, slug } = params;

  // Basic validation
  const validCategories = ["men", "women", "accessories", "sale", "new", "all"];
  if (!validCategories.includes(category)) {
    notFound();
  }

  // Just pass the params to your existing ProductPage component
  return <ProductPage params={{ productId: id, category, slug }} />;
}

CategorySlugIdProductPage.propTypes = {
  params: PropTypes.shape({
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

// Optional: SEO metadata
export async function generateMetadata({ params }) {
  const { category, slug } = params;

  const productName = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${productName} | ${category} | Urban Echo`,
  };
}
