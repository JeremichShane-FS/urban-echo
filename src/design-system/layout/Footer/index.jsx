"use client";
import Image from "next/image";
import Link from "next/link";

import FooterView from "./FooterView";
import { useFooter } from "./useFooter";

import styles from "./Footer.module.scss";

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
      companyInfo={companyInfo}
      copyrightText={copyrightText}
      getNavigationSection={getNavigationSection}
      socialLinks={socialLinks}
      legalLinks={legalLinks}
      navigationSections={navigationSections}
      utilityLinks={utilityLinks}
      Image={Image}
      Link={Link}
      sections={sections}
      styles={styles}
      onLinkClick={onLinkClick}
    />
  );
};

export default Footer;

Footer.displayName = "Footer";
Footer.View = FooterView;
Footer.useFooter = useFooter;
