/**
 * @fileoverview Urban Echo - E-commerce Clothing Platform
 * @copyright Copyright (c) 2025 Shane Jeremich / Urban Echo. All rights reserved.
 * @license Portfolio Display Only
 *
 * This file is part of the Urban Echo portfolio demonstration project.
 *
 * Permitted Use:
 * - View for educational and learning purposes
 * - Review for employment evaluation
 * - Study architecture and implementation patterns
 *
 * Prohibited Use:
 * - Commercial use or deployment
 * - Distribution or redistribution
 * - Incorporation into other projects
 * - Modification for redistribution
 *
 * Urban Echo demonstrates professional full-stack development capabilities
 * including modern React/Next.js architecture, e-commerce implementation,
 * and integration with enterprise services (Auth0, Stripe, MongoDB).
 *
 * For licensing inquiries: hello@shanejeremich.com
 * Portfolio: shanejeremich.com
 */

import { generatePageMetadata } from "@config/seo";
import HomePage from "@design-system/pages/HomePage";
import { getPageConfig } from "@lib/services/api-service";

export async function generateMetadata() {
  try {
    const pageConfig = await getPageConfig("homepage");

    return generatePageMetadata({
      title: pageConfig?.seoTitle,
      description: pageConfig?.seoDescription,
      openGraph: {
        title: pageConfig?.seoTitle,
        description: pageConfig?.seoDescription,
      },
      twitter: {
        title: pageConfig?.seoTitle,
        description: pageConfig?.seoDescription,
      },
    });
  } catch (error) {
    console.warn("Failed to fetch page config for metadata, using defaults", error.message);
    return generatePageMetadata();
  }
}

export default function Home() {
  return <HomePage />;
}
