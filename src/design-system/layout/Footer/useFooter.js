/**
 * @fileoverview Custom hook for managing footer data, navigation sections, and analytics tracking
 * Provides centralized footer state management with dynamic copyright text and link interaction handling
 * Integrates with Google Analytics for footer link tracking and navigation behavior analysis
 */

import { useEffect, useState } from "react";

import {
  FOOTER_COMPANY,
  FOOTER_LEGAL_LINKS,
  FOOTER_NAV_SECTIONS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_UTILITY_LINKS,
  SITE_NAME,
} from "@config/constants";
import { setCopyright } from "@modules/core/utils";

/**
 * Hook for managing footer data, navigation sections, and user interaction analytics
 * @hook
 * @returns {Object} Footer state management and interaction handlers
 * @returns {Array<Object>} returns.navigationSections - Footer navigation section configurations
 * @returns {Object} returns.companyInfo - Company information and branding data
 * @returns {Array<Object>} returns.socialLinks - Social media platform links
 * @returns {Array<Object>} returns.legalLinks - Legal and policy page links
 * @returns {Array<Object>} returns.utilityLinks - Utility and support page links
 * @returns {string} returns.copyrightText - Dynamic copyright text with current year
 * @returns {Function} returns.getNavigationSection - Function to retrieve specific navigation section
 * @returns {Function} returns.onLinkClick - Analytics tracking handler for link interactions
 * @returns {Object} returns.sections - Pre-organized navigation sections for easy access
 */
const useFooter = () => {
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
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "Footer",
        event_label: label,
        event_url: href,
      });
    }
  };

  const shopSection = getNavigationSection("Shop");
  const aboutSection = getNavigationSection("About");
  const helpSection = getNavigationSection("Help");

  return {
    navigationSections,
    companyInfo,
    socialLinks,
    legalLinks,
    utilityLinks,
    copyrightText,
    getNavigationSection,
    onLinkClick: handleLinkClick,
    sections: { shopSection, aboutSection, helpSection },
  };
};

export default useFooter;
