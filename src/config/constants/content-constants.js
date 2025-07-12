/**
 * @fileoverview Content management system constants for CMS integration, media handling, and content organization
 * Defines content categories, publication workflows, blog management, and SEO configurations
 * Supports content moderation, media library management, and structured content types across the application
 */

// =================================================================
// CONTENT CATEGORIZATION
// =================================================================

/**
 * Content type categories for CMS organization and routing
 * @constant {Object} CONTENT_CATEGORIES - Available content type classifications
 */
export const CONTENT_CATEGORIES = {
  BLOG: "blog",
  PAGE: "page",
  PRODUCT: "product",
  CATEGORY: "category",
  COLLECTION: "collection",
  BANNER: "banner",
  FAQ: "faq",
  TESTIMONIAL: "testimonial",
  POLICY: "policy",
  PRESS: "press",
};

/**
 * Content publication workflow statuses
 * @constant {Object} CONTENT_STATUS - Available content publication states
 */
export const CONTENT_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  SCHEDULED: "scheduled",
  ARCHIVED: "archived",
  REVIEW: "review",
};

// =================================================================
// BLOG CONFIGURATION
// =================================================================

/**
 * Blog category definitions for content organization and navigation
 * @constant {Array<Object>} BLOG_CATEGORIES - Available blog content categories
 *
 * @example
 * // Generate blog category navigation
 * const BlogCategoryNav = () => (
 *   <nav>
 *     {BLOG_CATEGORIES.map(category => (
 *       <Link
 *         key={category.id}
 *         href={`/blog/category/${category.id}`}
 *       >
 *         {category.name}
 *       </Link>
 *     ))}
 *   </nav>
 * );
 *
 * @example
 * // Filter blog posts by category
 * const getCategoryPosts = (categoryId) => {
 *   return blogPosts.filter(post => post.category === categoryId);
 * };
 */
export const BLOG_CATEGORIES = [
  { id: "fashion", name: "Fashion & Style" },
  { id: "trends", name: "Trends & Collections" },
  { id: "sustainability", name: "Sustainability" },
  { id: "lifestyle", name: "Urban Lifestyle" },
  { id: "interviews", name: "Designer Interviews" },
  { id: "guides", name: "Style Guides" },
  { id: "events", name: "Events & Pop-ups" },
  { id: "behind-scenes", name: "Behind the Scenes" },
];

/**
 * Blog display and pagination configuration
 * @constant {number} BLOG_POSTS_PER_PAGE - Posts displayed per page in blog listing
 * @constant {number} FEATURED_POSTS_COUNT - Number of featured posts on homepage
 * @constant {number} RELATED_POSTS_COUNT - Related posts shown on blog detail pages
 * @constant {number} EXCERPT_LENGTH - Maximum excerpt length in characters
 */
export const BLOG_POSTS_PER_PAGE = 9;
export const FEATURED_POSTS_COUNT = 3;
export const RELATED_POSTS_COUNT = 3;
export const EXCERPT_LENGTH = 160; // characters

// =================================================================
// MEDIA MANAGEMENT
// =================================================================

/**
 * Media file type classifications for library organization
 * @constant {Object} MEDIA_TYPES - Supported media file categories
 */
export const MEDIA_TYPES = {
  IMAGE: "image",
  VIDEO: "video",
  DOCUMENT: "document",
  AUDIO: "audio",
};

/**
 * Media library configuration settings
 * @constant {number} MEDIA_LIBRARY_ITEMS_PER_PAGE - Items per page in media library
 * @constant {Array<string>} MEDIA_SEARCH_FIELDS - Searchable fields in media library
 */
export const MEDIA_LIBRARY_ITEMS_PER_PAGE = 20;
export const MEDIA_SEARCH_FIELDS = ["filename", "title", "alt", "caption", "tags"];

// =================================================================
// LAYOUT AND DESIGN CONFIGURATION
// =================================================================

/**
 * Content layout types for flexible page design
 * @constant {Object} LAYOUT_TYPES - Available content layout options
 *
 * @example
 * // Apply layout-specific styling
 * const getLayoutClasses = (layoutType) => {
 *   const layoutClasses = {
 *     [LAYOUT_TYPES.FULL_WIDTH]: 'w-full',
 *     [LAYOUT_TYPES.SIDEBAR]: 'grid grid-cols-3 gap-8',
 *     [LAYOUT_TYPES.GRID]: 'grid grid-cols-2 md:grid-cols-3',
 *     [LAYOUT_TYPES.HERO]: 'min-h-screen flex items-center'
 *   };
 *   return layoutClasses[layoutType] || '';
 * };
 */
export const LAYOUT_TYPES = {
  FULL_WIDTH: "full-width",
  SIDEBAR: "sidebar",
  GRID: "grid",
  GALLERY: "gallery",
  HERO: "hero",
  SPLIT: "split",
};

/**
 * Homepage content section identifiers for dynamic content management
 * @constant {Object} HOMEPAGE_SECTIONS - Available homepage content sections
 *
 * @example
 * // Render homepage sections dynamically
 * const Homepage = ({ sections }) => (
 *   <main>
 *     {sections.includes(HOMEPAGE_SECTIONS.HERO_BANNER) && <HeroBanner />}
 *     {sections.includes(HOMEPAGE_SECTIONS.FEATURED_CATEGORIES) && <FeaturedCategories />}
 *     {sections.includes(HOMEPAGE_SECTIONS.NEW_ARRIVALS) && <NewArrivals />}
 *     {sections.includes(HOMEPAGE_SECTIONS.NEWSLETTER) && <Newsletter />}
 *   </main>
 * );
 */
export const HOMEPAGE_SECTIONS = {
  HERO_BANNER: "hero_banner",
  FEATURED_CATEGORIES: "featured_categories",
  NEW_ARRIVALS: "new_arrivals",
  FEATURED_COLLECTION: "featured_collection",
  TRENDING_NOW: "trending_now",
  TESTIMONIALS: "testimonials",
  BLOG_POSTS: "blog_posts",
  NEWSLETTER: "newsletter",
  INSTAGRAM_FEED: "instagram_feed",
};

// =================================================================
// CONTENT PERMISSIONS AND SECURITY
// =================================================================

/**
 * Content management permission levels for role-based access control
 * @constant {Object} CONTENT_PERMISSIONS - Available content operation permissions
 */
export const CONTENT_PERMISSIONS = {
  VIEW: "view",
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
  PUBLISH: "publish",
  ARCHIVE: "archive",
};

/**
 * Content editor configuration and security settings
 * @constant {Object} EDITOR_SETTINGS - Editor behavior and upload limits
 */
export const EDITOR_SETTINGS = {
  autosaveInterval: 60000, // 60 seconds
  maxImageUploadSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".pdf", ".doc", ".docx"],
};

/**
 * Allowed HTML tags for rich text content security
 * @constant {Array<string>} ALLOWED_HTML_TAGS - Permitted HTML elements in rich text
 */
export const ALLOWED_HTML_TAGS = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "pre",
  "code",
  "em",
  "strong",
  "del",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "table",
  "tr",
  "th",
  "td",
  "tbody",
  "thead",
  "br",
  "hr",
];

// =================================================================
// SEO AND METADATA CONFIGURATION
// =================================================================

/**
 * SEO metadata configuration limits and defaults
 * @constant {number} DEFAULT_META_DESCRIPTION_LENGTH - Maximum meta description length
 * @constant {number} DEFAULT_META_TITLE_MAX_LENGTH - Maximum meta title length
 * @constant {Object} DEFAULT_META_IMAGE_SIZE - Default Open Graph image dimensions
 */
export const DEFAULT_META_DESCRIPTION_LENGTH = 160;
export const DEFAULT_META_TITLE_MAX_LENGTH = 60;
export const DEFAULT_META_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

/**
 * SEO feature enablement configuration
 * @constant {Object} SEO_SETTINGS - SEO feature toggles and optimization settings
 */
export const SEO_SETTINGS = {
  enableSitemap: true,
  enableRobotsTxt: true,
  enableCanonicalUrls: true,
  enableStructuredData: true,
  enableOpenGraph: true,
  enableTwitterCards: true,
};

// =================================================================
// CUSTOMER SUPPORT CONTENT
// =================================================================

/**
 * FAQ content categories for customer support organization
 * @constant {Array<Object>} FAQ_CATEGORIES - Available FAQ topic categories
 */
export const FAQ_CATEGORIES = [
  { id: "ordering", name: "Ordering & Payment" },
  { id: "shipping", name: "Shipping & Delivery" },
  { id: "returns", name: "Returns & Exchanges" },
  { id: "products", name: "Product Information" },
  { id: "account", name: "Account & Registration" },
  { id: "sizing", name: "Sizing & Fit" },
];

/**
 * Content moderation and user interaction settings
 * @constant {Object} MODERATION_SETTINGS - Content moderation configuration
 */
export const MODERATION_SETTINGS = {
  enableComments: true,
  moderateCommentsBeforePublishing: true,
  enableUserReviews: true,
  moderateReviewsBeforePublishing: false,
  profanityFilter: true,
  spamFilter: true,
};

// =================================================================
// SOCIAL INTEGRATION
// =================================================================

/**
 * Social media sharing platform configurations
 * @constant {Array<Object>} SOCIAL_SHARING_PLATFORMS - Available social sharing options
 *
 * @example
 * // Generate social sharing buttons
 * const SocialShare = ({ url, title }) => (
 *   <div className="social-share">
 *     {SOCIAL_SHARING_PLATFORMS.map(platform => (
 *       <SocialButton
 *         key={platform.id}
 *         platform={platform.id}
 *         url={url}
 *         title={title}
 *         icon={platform.icon}
 *       />
 *     ))}
 *   </div>
 * );
 */
export const SOCIAL_SHARING_PLATFORMS = [
  { id: "facebook", name: "Facebook", icon: "facebook" },
  { id: "twitter", name: "Twitter", icon: "twitter" },
  { id: "pinterest", name: "Pinterest", icon: "pinterest" },
  { id: "email", name: "Email", icon: "mail" },
  { id: "whatsapp", name: "WhatsApp", icon: "whatsapp" },
  { id: "telegram", name: "Telegram", icon: "send" },
];

// =================================================================
// LEGAL CONTENT TEMPLATES
// =================================================================

/**
 * Privacy policy section structure for legal compliance
 * @constant {Array<string>} PRIVACY_POLICY_SECTIONS - Standard privacy policy sections
 */
export const PRIVACY_POLICY_SECTIONS = [
  "Introduction",
  "Information We Collect",
  "How We Use Your Information",
  "Cookies and Tracking Technologies",
  "Third-Party Services",
  "Data Security",
  "Your Rights",
  "Children's Privacy",
  "Changes to This Policy",
  "Contact Information",
];

/**
 * Terms of service section structure for legal compliance
 * @constant {Array<string>} TERMS_OF_SERVICE_SECTIONS - Standard terms of service sections
 */
export const TERMS_OF_SERVICE_SECTIONS = [
  "Overview",
  "Eligibility",
  "Products and Services",
  "Pricing and Payment",
  "Shipping and Delivery",
  "Returns and Refunds",
  "User Accounts",
  "Intellectual Property",
  "Prohibited Activities",
  "Disclaimer of Warranties",
  "Limitation of Liability",
  "Governing Law",
  "Changes to Terms",
  "Contact Information",
];
