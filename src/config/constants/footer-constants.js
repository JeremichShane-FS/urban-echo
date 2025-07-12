/**
 * @fileoverview Footer configuration constants for site navigation, company information, and legal compliance
 * Defines comprehensive footer structure including navigation links, social media integration, and legal pages
 * Supports multi-column footer layout, accessibility compliance, and brand consistency across the application
 */

import ROUTES from "@config/routes";

import { DEFAULT_IMAGES } from "./media-constants";
import { SITE_NAME, SOCIAL_LINKS } from "./site-constants";

// =================================================================
// FOOTER NAVIGATION STRUCTURE
// =================================================================

/**
 * Footer navigation sections with organized link groupings for comprehensive site navigation
 * @constant {Array<Object>} FOOTER_NAV_SECTIONS - Structured footer navigation with accessibility support
 *
 * @example
 * // Render footer navigation sections
 * const FooterNav = () => (
 *   <div className="footer-nav">
 *     {FOOTER_NAV_SECTIONS.map(section => (
 *       <div key={section.title} className="nav-section">
 *         <h3>{section.title}</h3>
 *         <ul>
 *           {section.links.map(link => (
 *             <li key={link.path}>
 *               <Link href={link.path} aria-label={link.ariaLabel}>
 *                 {link.label}
 *               </Link>
 *             </li>
 *           ))}
 *         </ul>
 *       </div>
 *     ))}
 *   </div>
 * );
 *
 * @example
 * // Find specific footer section by title
 * const shopSection = FOOTER_NAV_SECTIONS.find(section =>
 *   section.title === 'Shop'
 * );
 * const shopLinks = shopSection?.links || [];
 *
 * @example
 * // Generate mobile footer accordion
 * const MobileFooterAccordion = () => (
 *   <div className="mobile-footer">
 *     {FOOTER_NAV_SECTIONS.map(section => (
 *       <Accordion key={section.title} title={section.title}>
 *         {section.links.map(link => (
 *           <AccordionItem key={link.path} href={link.path}>
 *             {link.label}
 *           </AccordionItem>
 *         ))}
 *       </Accordion>
 *     ))}
 *   </div>
 * );
 *
 * @example
 * // Extract all footer links for sitemap generation
 * const getAllFooterLinks = () => {
 *   return FOOTER_NAV_SECTIONS.reduce((allLinks, section) => {
 *     return [...allLinks, ...section.links];
 *   }, []);
 * };
 */
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

// =================================================================
// COMPANY INFORMATION AND BRANDING
// =================================================================

/**
 * Company information for footer branding and contact details
 * @constant {Object} FOOTER_COMPANY - Brand and location information for footer display
 *
 * @example
 * // Render company information in footer
 * const FooterCompanyInfo = () => (
 *   <div className="company-info">
 *     <img src={FOOTER_COMPANY.logo} alt={`${FOOTER_COMPANY.name} Logo`} />
 *     <h2>{FOOTER_COMPANY.name}</h2>
 *     <address>
 *       {FOOTER_COMPANY.address}<br />
 *       {FOOTER_COMPANY.city}
 *     </address>
 *   </div>
 * );
 *
 * @example
 * // Use company info for structured data markup
 * const companyStructuredData = {
 *   "@type": "Organization",
 *   "name": FOOTER_COMPANY.name,
 *   "address": {
 *     "@type": "PostalAddress",
 *     "streetAddress": FOOTER_COMPANY.address,
 *     "addressLocality": FOOTER_COMPANY.city
 *   },
 *   "logo": FOOTER_COMPANY.logo
 * };
 */
export const FOOTER_COMPANY = {
  name: SITE_NAME,
  address: "123 No Where St Suite 100",
  city: "Unknown, CA 97105",
  logo: DEFAULT_IMAGES.logo,
};

// =================================================================
// SOCIAL MEDIA INTEGRATION
// =================================================================

/**
 * Social media links with accessibility and icon configuration for footer social section
 * @constant {Array<Object>} FOOTER_SOCIAL_LINKS - Social media platform links with metadata
 *
 * @example
 * // Render social media links with icons
 * const FooterSocialLinks = () => (
 *   <div className="social-links">
 *     <h3>Follow Us</h3>
 *     <ul className="social-list">
 *       {FOOTER_SOCIAL_LINKS.map(social => (
 *         <li key={social.label}>
 *           <a
 *             href={social.href}
 *             aria-label={`Follow us on ${social.label}`}
 *             target="_blank"
 *             rel="noopener noreferrer"
 *           >
 *             <Icon name={social.icon} />
 *             <span className="sr-only">{social.label}</span>
 *           </a>
 *         </li>
 *       ))}
 *     </ul>
 *   </div>
 * );
 *
 * @example
 * // Generate social sharing buttons
 * const SocialShareButtons = ({ url, title }) => (
 *   <div className="share-buttons">
 *     {FOOTER_SOCIAL_LINKS.map(social => (
 *       <ShareButton
 *         key={social.label}
 *         platform={social.icon}
 *         url={url}
 *         title={title}
 *         label={`Share on ${social.label}`}
 *       />
 *     ))}
 *   </div>
 * );
 */
export const FOOTER_SOCIAL_LINKS = [
  { label: "Facebook", href: SOCIAL_LINKS.facebook, icon: "facebook" },
  { label: "X / Twitter", href: SOCIAL_LINKS.twitter, icon: "twitter" },
  { label: "Instagram", href: SOCIAL_LINKS.instagram, icon: "instagram" },
];

// =================================================================
// LEGAL AND COMPLIANCE LINKS
// =================================================================

/**
 * Legal compliance and policy links for footer legal section
 * @constant {Array<Object>} FOOTER_LEGAL_LINKS - Legal page links for compliance and transparency
 *
 * @example
 * // Render legal links in footer
 * const FooterLegalLinks = () => (
 *   <div className="legal-links">
 *     <ul>
 *       {FOOTER_LEGAL_LINKS.map(link => (
 *         <li key={link.href}>
 *           <Link href={link.href}>{link.label}</Link>
 *         </li>
 *       ))}
 *     </ul>
 *   </div>
 * );
 *
 * @example
 * // Group legal links by category
 * const getLegalLinksByCategory = () => {
 *   const policies = FOOTER_LEGAL_LINKS.filter(link =>
 *     link.label.includes('Policy')
 *   );
 *   const legal = FOOTER_LEGAL_LINKS.filter(link =>
 *     ['Copyright', 'DMCA', 'Accessibility'].includes(link.label)
 *   );
 *   return { policies, legal };
 * };
 */
export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Return Policy", href: "/legal/returns" },
  { label: "Shipping Policy", href: "/legal/shipping" },
  { label: "Copyright", href: "/legal/copyright" },
  { label: "DMCA", href: "/legal/dmca" },
  { label: "Accessibility", href: "/legal/accessibility" },
];

// =================================================================
// UTILITY AND SITE NAVIGATION
// =================================================================

/**
 * Utility links for additional site navigation and accessibility
 * @constant {Array<Object>} FOOTER_UTILITY_LINKS - Additional footer navigation links
 *
 * @example
 * // Render utility links section
 * const FooterUtilityLinks = () => (
 *   <div className="utility-links">
 *     <h4>Quick Links</h4>
 *     <ul>
 *       {FOOTER_UTILITY_LINKS.map(link => (
 *         <li key={link.href}>
 *           <Link href={link.href}>{link.label}</Link>
 *         </li>
 *       ))}
 *     </ul>
 *   </div>
 * );
 */
export const FOOTER_UTILITY_LINKS = [
  { label: "Site Map", href: "/sitemap" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Contact Us", href: ROUTES.CONTACT },
];

// =================================================================
// FOOTER SECTION ORGANIZATION
// =================================================================

/**
 * Footer section titles for consistent heading structure and accessibility
 * @constant {Object} FOOTER_SECTION_TITLES - Section headings for footer organization
 *
 * @example
 * // Use section titles for footer structure
 * const FooterSection = ({ sectionKey, children }) => (
 *   <section className="footer-section">
 *     <h3>{FOOTER_SECTION_TITLES[sectionKey]}</h3>
 *     {children}
 *   </section>
 * );
 *
 * @example
 * // Generate footer with consistent headings
 * const Footer = () => (
 *   <footer>
 *     <FooterSection sectionKey="MAIN_MENU">
 *       <FooterNav />
 *     </FooterSection>
 *     <FooterSection sectionKey="COMPANY">
 *       <FooterCompanyInfo />
 *     </FooterSection>
 *     <FooterSection sectionKey="SOCIAL">
 *       <FooterSocialLinks />
 *     </FooterSection>
 *   </footer>
 * );
 */
export const FOOTER_SECTION_TITLES = {
  MAIN_MENU: "Main Menu",
  COMPANY: "Company",
  DISCOVER: "Discover",
  SOCIAL: "Find Us On",
};
