/**
 * @fileoverview This file contains constants related to the footer section of the application.
 * It includes navigation links, company information, social media links, legal links, and utility links.
 */

import ROUTES from "@config/routes";

import { DEFAULT_IMAGES } from "./media-constants";
import { SITE_NAME, SOCIAL_LINKS } from "./site-constants";

// Footer navigation sections
export const FOOTER_NAV_SECTIONS = [
  {
    title: "Shop",
    links: [
      { label: "Men", ariaLabel: "Shop Men Clothing", path: ROUTES.MEN },
      { label: "Women", ariaLabel: "Shop Women Clothing", path: ROUTES.WOMEN },
      { label: "Accessories", ariaLabel: "Shop Accessories", path: ROUTES.ACCESSORIES },
      { label: "Sale", ariaLabel: "Shop Sale Items", path: ROUTES.SALE },
      { label: "New Arrivals", ariaLabel: "Shop New Arrivals", path: ROUTES.NEW_ARRIVALS },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", ariaLabel: "Learn About Our Story", path: ROUTES.ABOUT },
      { label: "Stores", ariaLabel: "Find Our Stores", path: ROUTES.STORES },
      {
        label: "Sustainability",
        ariaLabel: "Learn About Sustainability",
        path: ROUTES.SUSTAINABILITY,
      },
      { label: "Careers", ariaLabel: "Explore Careers", path: ROUTES.CAREERS },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", ariaLabel: "Contact Us", path: ROUTES.CONTACT },
      { label: "FAQs", ariaLabel: "View FAQs", path: ROUTES.FAQS },
      { label: "Shipping", ariaLabel: "Learn About Shipping", path: ROUTES.SHIPPING },
      { label: "Returns", ariaLabel: "Learn About Returns", path: ROUTES.RETURNS },
      { label: "Size Guide", ariaLabel: "View Size Guide", path: ROUTES.SIZE_GUIDE },
    ],
  },
];

// Company Information
export const FOOTER_COMPANY = {
  name: SITE_NAME,
  address: "123 No Where St Suite 100",
  city: "Unknown, CA 97105",
  logo: DEFAULT_IMAGES.logo,
};

// Social Links
export const FOOTER_SOCIAL_LINKS = [
  { label: "Facebook", href: SOCIAL_LINKS.facebook, icon: "facebook" },
  { label: "X / Twitter", href: SOCIAL_LINKS.twitter, icon: "twitter" },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, icon: "instagram" },
];

// Legal Links
export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Return Policy", href: "/legal/returns" },
  { label: "Shipping Policy", href: "/legal/shipping" },
];

// Utility Links
export const FOOTER_UTILITY_LINKS = [
  { label: "Site Map", href: "/sitemap" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Contact Us", href: ROUTES.CONTACT },
];

// Footer Headers
export const FOOTER_SECTION_TITLES = {
  MAIN_MENU: "Main Menu",
  COMPANY: "Company",
  DISCOVER: "Discover",
  SOCIAL: "Find Us On",
};
