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

import { API_FALLBACK_DATA, ERROR_TYPES } from "@config/constants";
import { generatePageMetadata } from "@config/seo";
import { validateEnvironment } from "@config/validateEnv";
import HomePage from "@design-system/pages/HomePage";
import { errorHandler } from "@modules/core/utils";
import { fetchFromStrapi, transformContentWithFallbacks } from "@modules/core/utils/api";

if (typeof window === "undefined") {
  validateEnvironment();
}

export async function generateMetadata() {
  try {
    const response = await fetchFromStrapi(
      `page-configs?filters[pageName][$eq]=homepage&populate=*`,
      "page-metadata-generation"
    );

    const data = await response.json();
    const config = data.data?.[0];

    let pageConfig;

    if (config) {
      pageConfig = transformContentWithFallbacks(config, API_FALLBACK_DATA.PAGE_CONFIG);
      pageConfig.pageName = config.pageName || "homepage";
    } else {
      errorHandler.handleError(new Error("No page config found in CMS"), ERROR_TYPES.CMS_ERROR, {
        source: "page-metadata-generation",
        action: "fetch-homepage-config",
        pageName: "homepage",
        fallbackUsed: true,
      });

      pageConfig = { ...API_FALLBACK_DATA.PAGE_CONFIG, pageName: "homepage" };
    }

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
    errorHandler.handleError(error, ERROR_TYPES.CMS_ERROR, {
      source: "page-metadata-generation",
      action: "generate-metadata",
      pageName: "homepage",
      fallbackUsed: true,
    });

    console.warn("Failed to fetch page config for metadata, using defaults", error.message);
    return generatePageMetadata();
  }
}

export default function Home() {
  return <HomePage />;
}
