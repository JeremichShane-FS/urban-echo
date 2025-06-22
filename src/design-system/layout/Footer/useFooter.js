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

// TODO: [COMPONENT] ProductCard: implement add to cart functionality with quantity selector
// Create reusable product card component for shop page display.
// Include product image, title, price, size selector, and add to cart button.
// Integrate with shopping cart context for state management.
// Add hover effects and loading states for better user experience.

// FIX: Cart total calculation incorrect when applying discount codes
// Shopping cart shows wrong total after discount is applied.
// Discount percentage is calculated correctly but not reflected in final price.
// Issue occurs specifically with percentage-based coupons over 20%.
// Need to fix the cart calculation logic in checkout process.

// FIX: [SECURITY] Auth0 token validation bypassed on expired sessions
// Critical security vulnerability where expired JWT tokens are still accepted.
// Users can access protected routes even after token expiration time.
// Issue discovered in production affecting user data protection.
// Immediate fix required to validate token expiration properly.

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
