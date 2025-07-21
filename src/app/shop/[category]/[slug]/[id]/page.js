/**
 * @fileoverview Product page route for category/slug/id URL structure
 * Path: src/app/shop/[category]/[slug]/[id]/page.js
 * Example: /shop/men/premium-cotton-shirt/6871817f6f3e94d4980860bd
 */

import { notFound } from "next/navigation";
import PropTypes from "prop-types";

import ProductPage from "@design-system/pages/ProductPage";

/**
 * Product page route - extracts category, slug, and ID from URL and passes to ProductPage
 * @param {Object} props - Component props
 * @param {Promise<Object>} props.params - URL parameters extracted by Next.js (must be awaited)
 * @param {string} props.params.category - Category from URL (men, women, accessories)
 * @param {string} props.params.slug - Product slug from URL (for SEO)
 * @param {string} props.params.id - Product ID from URL (for database lookup)
 */
export default async function CategorySlugIdProductPage({ params }) {
  const resolvedParams = await params;
  const { category, id, slug } = resolvedParams;
  const validCategories = ["men", "women", "accessories", "sale", "new", "all"];

  if (!validCategories.includes(category)) {
    notFound();
  }

  return <ProductPage params={{ productId: id, category, slug }} />;
}

CategorySlugIdProductPage.propTypes = {
  params: PropTypes.object.isRequired,
};

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;
  const productName = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${productName} | ${category} | Urban Echo`,
  };
}
