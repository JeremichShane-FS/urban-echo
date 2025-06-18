import { useEffect, useState } from "react";

import { setCopyright } from "@/modules/core/utils/setCopyright";

import { FOOTER_NAV_SECTIONS } from "@/config/constants/footer-constants";
import { SITE_NAME } from "@/config/constants/site-constants";

export const useFooter = () => {
  const [copyrightText, setCopyrightText] = useState(`© ${SITE_NAME}. All rights reserved`);

  const [footerData] = useState(FOOTER_NAV_SECTIONS);

  useEffect(() => {
    setCopyrightText(setCopyright(`${SITE_NAME}. All rights reserved`));
  }, []);

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
    footerData,
    copyrightText,
    onLinkClick: handleLinkClick,
  };
};
