/**
 * @fileoverview Main footer component with comprehensive site navigation and company information
 * Provides multi-column layout with navigation sections, social links, and back-to-top functionality
 * Integrates with Next.js Image optimization and Link routing for performance and navigation
 */

"use client";
import Image from "next/image";
import Link from "next/link";

import FooterView from "./FooterView";
import useFooter from "./useFooter";

import styles from "./Footer.module.scss";

/**
 * Container component for site footer with navigation sections and company information
 * @component
 * @returns {JSX.Element} Rendered footer component with responsive grid layout and analytics tracking
 */
const Footer = () => {
  const {
    companyInfo,
    copyrightText,
    getNavigationSection,
    legalLinks,
    navigationSections,
    onLinkClick,
    sections,
    socialLinks,
    utilityLinks,
  } = useFooter();

  return (
    <FooterView
      Image={Image}
      Link={Link}
      companyInfo={companyInfo}
      copyrightText={copyrightText}
      getNavigationSection={getNavigationSection}
      legalLinks={legalLinks}
      navigationSections={navigationSections}
      sections={sections}
      socialLinks={socialLinks}
      styles={styles}
      utilityLinks={utilityLinks}
      onLinkClick={onLinkClick}
    />
  );
};

export default Footer;

Footer.displayName = "Footer";
Footer.View = FooterView;
Footer.useFooter = useFooter;
