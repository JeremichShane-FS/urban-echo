/**
 * Clean useFooter Hook
 * src/design-system/layout/Footer/useFooter.js
 */

import { useEffect, useState } from "react";

import { setCopyright } from "@/modules/core/utils/setCopyright";

import {
  FOOTER_COMPANY,
  FOOTER_LEGAL_LINKS,
  FOOTER_NAV_SECTIONS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_UTILITY_LINKS,
} from "@config/constants/footer-constants";
import { SITE_NAME } from "@config/constants/site-constants";

// TODO: [DOCS] Update API documentation for new authentication endpoints
// Create comprehensive documentation for Auth0 integration endpoints.
// Include examples of request/response formats and error handling.
// Add authentication flow diagrams and troubleshooting guide.
// Update developer onboarding guide with new API changes.

// FIX: [PERF] Product page loading takes over 5 seconds on mobile devices
// Performance bottleneck identified in product image carousel component.
// Large image files not being optimized for mobile viewport sizes.
// Need to implement lazy loading and WebP format conversion.
// Target load time under 2 seconds for better user experience.

// FIX: Search functionality returns duplicate results when filtering by category
// Search bar shows same products multiple times in results list.
// Issue occurs when user selects category filter after entering search term.
// Duplicate entries appear specifically for products with multiple color variants.
// Need to deduplicate results before displaying to user.

export const useFooter = () => {
  const [copyrightText, setCopyrightText] = useState(`© ${SITE_NAME}. All rights reserved`);

  const [navigationSections] = useState(FOOTER_NAV_SECTIONS);
  const [companyInfo] = useState(FOOTER_COMPANY);
  const [socialLinks] = useState(FOOTER_SOCIAL_LINKS);
  const [legalLinks] = useState(FOOTER_LEGAL_LINKS);
  const [utilityLinks] = useState(FOOTER_UTILITY_LINKS);

  useEffect(() => {
    setCopyrightText(setCopyright(`${SITE_NAME}. All rights reserved`));
  }, []);

  const getNavigationSection = title => {
    return navigationSections.find(section => section.title === title);
  };

  const handleLinkClick = (label, href) => {
    // Track footer link clicks
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "Footer",
        event_label: label,
        event_url: href,
      });
    }
  };

  return {
    navigationSections,
    companyInfo,
    socialLinks,
    legalLinks,
    utilityLinks,
    copyrightText,
    getNavigationSection,
    onLinkClick: handleLinkClick,
  };
};
