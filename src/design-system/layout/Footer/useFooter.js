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
