/**
 * @fileoverview Site-wide configuration constants for branding, contact information, and global application settings
 * Defines core site identity, company information, social media links, and SEO defaults
 * Provides centralized management of brand assets, contact details, and site-wide metadata configuration
 */

// =================================================================
// BRAND AND SITE IDENTITY
// =================================================================

/**
 * Core site and company branding information
 * @constant {string} SITE_NAME - Primary brand name for the application
 * @constant {string} COMPANY_NAME - Legal company name for business purposes
 * @constant {string} SITE_WEBSITE - Primary website URL for the application
 * @constant {string} SITE_TITLE - Default HTML title for the site
 * @constant {string} SITE_DESCRIPTION - Primary site description for marketing
 * @constant {number} COPYRIGHT_YEAR - Current year for copyright notices
 *
 * @example
 * // Use in header component
 * const Header = () => (
 *   <header>
 *     <h1>{SITE_NAME}</h1>
 *     <p>{SITE_DESCRIPTION}</p>
 *   </header>
 * );
 *
 * @example
 * // Dynamic copyright footer
 * const Footer = () => (
 *   <footer>
 *     <p>&copy; {COPYRIGHT_YEAR} {COMPANY_NAME}. All rights reserved.</p>
 *   </footer>
 * );
 */
export const SITE_NAME = "Urban Echo";
export const COMPANY_NAME = "Urban Echo";
export const SITE_WEBSITE = "https://www.shopurbanecho.com";
export const SITE_TITLE = "Urban Echo - Premium Streetwear & Urban Fashion";
export const SITE_DESCRIPTION = "Premium streetwear and urban fashion";
export const COPYRIGHT_YEAR = new Date().getFullYear();

// =================================================================
// CONTACT INFORMATION
// =================================================================

/**
 * Company contact information and physical address
 * @constant {string} SUPPORT_EMAIL - Customer support email address
 * @constant {string} CONTACT_PHONE - Primary customer service phone number
 * @constant {Object} COMPANY_ADDRESS - Complete company physical address
 *
 * @example
 * // Contact information component
 * const ContactInfo = () => (
 *   <div className="contact-info">
 *     <p>Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p>
 *     <p>Phone: <a href={`tel:${CONTACT_PHONE}`}>{CONTACT_PHONE}</a></p>
 *     <address>
 *       {COMPANY_ADDRESS.street}<br />
 *       {COMPANY_ADDRESS.city}, {COMPANY_ADDRESS.state} {COMPANY_ADDRESS.zipCode}<br />
 *       {COMPANY_ADDRESS.country}
 *     </address>
 *   </div>
 * );
 *
 * @example
 * // Structured data for local business
 * const businessStructuredData = {
 *   "@type": "LocalBusiness",
 *   "name": COMPANY_NAME,
 *   "email": SUPPORT_EMAIL,
 *   "telephone": CONTACT_PHONE,
 *   "address": {
 *     "@type": "PostalAddress",
 *     "streetAddress": COMPANY_ADDRESS.street,
 *     "addressLocality": COMPANY_ADDRESS.city,
 *     "addressRegion": COMPANY_ADDRESS.state,
 *     "postalCode": COMPANY_ADDRESS.zipCode,
 *     "addressCountry": COMPANY_ADDRESS.country
 *   }
 * };
 */
export const SUPPORT_EMAIL = "support@urbanecho.com";
export const CONTACT_PHONE = "+1 (555) 123-4567";
export const COMPANY_ADDRESS = {
  street: "123 Fashion Avenue",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  country: "United States",
};

// =================================================================
// SOCIAL MEDIA INTEGRATION
// =================================================================

/**
 * Social media platform links for brand presence and marketing
 * @constant {Object} SOCIAL_LINKS - Complete social media URL collection
 *
 * @example
 * // Social media link component
 * const SocialLinks = () => (
 *   <div className="social-links">
 *     {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
 *       <a
 *         key={platform}
 *         href={url}
 *         target="_blank"
 *         rel="noopener noreferrer"
 *         aria-label={`Follow us on ${platform}`}
 *       >
 *         <Icon name={platform} />
 *       </a>
 *     ))}
 *   </div>
 * );
 *
 * @example
 * // Social sharing functionality
 * const shareToSocial = (platform, url, title) => {
 *   const shareUrls = {
 *     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
 *     twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
 *     pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`
 *   };
 *
 *   if (shareUrls[platform]) {
 *     window.open(shareUrls[platform], '_blank', 'width=600,height=400');
 *   }
 * };
 */
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/shopurbanecho",
  instagram: "https://www.instagram.com/shopurbanecho/",
  twitter: "https://x.com/shopurbanecho",
  pinterest: "https://www.pinterest.com/shopurbanecho/",
  tiktok: "https://tiktok.com/@shopurbanecho",
};

// =================================================================
// SEO AND METADATA DEFAULTS
// =================================================================

/**
 * Default SEO configuration and Open Graph metadata for consistent social sharing
 * @constant {Object} DEFAULT_SEO - Comprehensive SEO metadata configuration
 *
 * @example
 * // Apply SEO defaults in Next.js layout
 * import { DEFAULT_SEO } from '@config/constants';
 *
 * export const metadata = {
 *   title: DEFAULT_SEO.defaultTitle,
 *   description: DEFAULT_SEO.description,
 *   openGraph: DEFAULT_SEO.openGraph,
 *   twitter: {
 *     card: DEFAULT_SEO.twitter.cardType,
 *     site: DEFAULT_SEO.twitter.site,
 *     creator: DEFAULT_SEO.twitter.handle
 *   }
 * };
 *
 * @example
 * // Dynamic page titles using template
 * const getPageTitle = (pageTitle) => {
 *   return DEFAULT_SEO.titleTemplate.replace('%s', pageTitle);
 * };
 *
 * // Usage: getPageTitle('Men\'s Clothing') -> "Men's Clothing | Urban Echo"
 *
 * @example
 * // Social sharing with Open Graph data
 * const ProductPage = ({ product }) => {
 *   const ogData = {
 *     ...DEFAULT_SEO.openGraph,
 *     title: `${product.name} | ${SITE_NAME}`,
 *     description: product.description,
 *     images: [{ url: product.imageUrl, alt: product.name }]
 *   };
 *
 *   return <ProductDisplay product={product} ogData={ogData} />;
 * };
 */
export const DEFAULT_SEO = {
  titleTemplate: "%s | Urban Echo",
  defaultTitle: "Urban Echo - Premium Streetwear & Urban Fashion",
  description:
    "Discover the latest in urban streetwear fashion at Urban Echo. Shop premium clothing, accessories, and footwear for men and women.",
  openGraph: {
    type: "website",
    locale: "en_US",
    site_name: "Urban Echo",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Urban Echo",
      },
    ],
  },
  twitter: {
    handle: "@shopurbanecho",
    site: "@shopurbanecho",
    cardType: "summary_large_image",
  },
};
