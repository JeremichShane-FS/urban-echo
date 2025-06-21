/**
 * @fileoverview This file contains constants related to content management, including content categories, statuses, blog categories, media types, and more.
 * It serves as a centralized location for managing all content-related constants used in the application.
 */

// Content categories
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

// Content statuses
export const CONTENT_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
  SCHEDULED: "scheduled",
  ARCHIVED: "archived",
  REVIEW: "review",
};

// Blog categories
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

// Blog display settings
export const BLOG_POSTS_PER_PAGE = 9;
export const FEATURED_POSTS_COUNT = 3;
export const RELATED_POSTS_COUNT = 3;
export const EXCERPT_LENGTH = 160; // characters

// Media types
export const MEDIA_TYPES = {
  IMAGE: "image",
  VIDEO: "video",
  DOCUMENT: "document",
  AUDIO: "audio",
};

// Media settings
export const MEDIA_LIBRARY_ITEMS_PER_PAGE = 20;
export const MEDIA_SEARCH_FIELDS = ["filename", "title", "alt", "caption", "tags"];

// Content layout types
export const LAYOUT_TYPES = {
  FULL_WIDTH: "full-width",
  SIDEBAR: "sidebar",
  GRID: "grid",
  GALLERY: "gallery",
  HERO: "hero",
  SPLIT: "split",
};

// Content permissions
export const CONTENT_PERMISSIONS = {
  VIEW: "view",
  CREATE: "create",
  EDIT: "edit",
  DELETE: "delete",
  PUBLISH: "publish",
  ARCHIVE: "archive",
};

// Content editor settings
export const EDITOR_SETTINGS = {
  autosaveInterval: 60000, // 60 seconds
  maxImageUploadSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".pdf", ".doc", ".docx"],
};

// Allowed HTML tags for rich text
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

// Homepage content sections
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

// Default metadata
export const DEFAULT_META_DESCRIPTION_LENGTH = 160;
export const DEFAULT_META_TITLE_MAX_LENGTH = 60;
export const DEFAULT_META_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

// FAQ categories
export const FAQ_CATEGORIES = [
  { id: "ordering", name: "Ordering & Payment" },
  { id: "shipping", name: "Shipping & Delivery" },
  { id: "returns", name: "Returns & Exchanges" },
  { id: "products", name: "Product Information" },
  { id: "account", name: "Account & Registration" },
  { id: "sizing", name: "Sizing & Fit" },
];

// Content moderation
export const MODERATION_SETTINGS = {
  enableComments: true,
  moderateCommentsBeforePublishing: true,
  enableUserReviews: true,
  moderateReviewsBeforePublishing: false,
  profanityFilter: true,
  spamFilter: true,
};

// SEO settings
export const SEO_SETTINGS = {
  enableSitemap: true,
  enableRobotsTxt: true,
  enableCanonicalUrls: true,
  enableStructuredData: true,
  enableOpenGraph: true,
  enableTwitterCards: true,
};

// Social sharing
export const SOCIAL_SHARING_PLATFORMS = [
  { id: "facebook", name: "Facebook", icon: "facebook" },
  { id: "twitter", name: "Twitter", icon: "twitter" },
  { id: "pinterest", name: "Pinterest", icon: "pinterest" },
  { id: "email", name: "Email", icon: "mail" },
  { id: "whatsapp", name: "WhatsApp", icon: "whatsapp" },
  { id: "telegram", name: "Telegram", icon: "send" },
];

// Privacy policy sections
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

// Terms of service sections
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
