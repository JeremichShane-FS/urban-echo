/**
 * Footer-related constants
 */

import { DEFAULT_IMAGES } from "./media-constants";
import { SITE_NAME, SOCIAL_LINKS } from "./site-constants";

// Footer navigation sections
export const FOOTER_NAV_SECTIONS = {
  company: {
    name: SITE_NAME,
    address: "123 No Where St Suite 100",
    city: "Unknown, CA 97105",
    logo: DEFAULT_IMAGES.logo,
  },
  mainMenu: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Shop", href: "/shop" },
    { label: "Profile", href: "/profile" },
  ],
  companyLinks: [
    { label: "The Company", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
  ],
  discover: [
    { label: "The Team", href: "/team" },
    { label: "Our History", href: "/history" },
    { label: "Brand Motto", href: "/motto" },
  ],
  social: [
    { label: "Facebook", href: SOCIAL_LINKS.facebook, icon: "facebook" },
    { label: "X / Twitter", href: SOCIAL_LINKS.twitter, icon: "twitter" },
    { label: "Instagram", href: SOCIAL_LINKS.instagram, icon: "instagram" },
  ],
};

// Footer section titles
export const FOOTER_SECTION_TITLES = {
  MAIN_MENU: "Main Menu",
  COMPANY: "Company",
  DISCOVER: "Discover",
  SOCIAL: "Find Us On",
};

// Footer legal links
export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Return Policy", href: "/legal/returns" },
  { label: "Shipping Policy", href: "/legal/shipping" },
];

// Footer utility links
export const FOOTER_UTILITY_LINKS = [
  { label: "Site Map", href: "/sitemap" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Contact Us", href: "/contact" },
];
