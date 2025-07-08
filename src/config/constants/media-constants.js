/**
 * @fileoverview This file contains constants related to media handling, including supported formats, sizes, quality settings, and default images.
 * It serves as a centralized location for managing all media-related constants used in the application.
 */

// Supported image formats
export const SUPPORTED_IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp", "gif"];
export const SUPPORTED_VIDEO_FORMATS = ["mp4", "webm"];

// Max file sizes (in bytes)
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB

// Image dimensions
export const PRODUCT_IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 },
};

export const BANNER_IMAGE_SIZES = {
  mobile: { width: 600, height: 800 },
  tablet: { width: 1024, height: 500 },
  desktop: { width: 1920, height: 600 },
};

export const AVATAR_SIZE = { width: 150, height: 150 };
export const LOGO_SIZE = { width: 200, height: 80 };
export const BLOG_THUMBNAIL_SIZE = { width: 400, height: 300 };

// Image quality settings
export const JPEG_QUALITY = 85;
export const PNG_COMPRESSION_LEVEL = 9;
export const WEBP_QUALITY = 80;

// Aspect ratios
export const ASPECT_RATIOS = {
  SQUARE: "1:1",
  PORTRAIT: "3:4",
  LANDSCAPE: "4:3",
  WIDESCREEN: "16:9",
  BANNER: "21:9",
  PRODUCT: "3:4",
};

// Image upload paths
export const UPLOAD_PATHS = {
  products: "/uploads/products/",
  categories: "/uploads/categories/",
  banners: "/uploads/banners/",
  avatars: "/uploads/avatars/",
  blog: "/uploads/blog/",
};

// Default images
export const DEFAULT_IMAGES = {
  productPlaceholder: "@assets/images/product/product-placeholder.png",
  userAvatar: "/images/default-avatar.jpg",
  logo: "/images/svg/navbar-logo.svg",
  categoryPlaceholder: "/images/category-placeholder.jpg",
  errorImage: "/images/error-image.svg",
};

// Video player settings
export const VIDEO_PLAYER_SETTINGS = {
  autoPlay: false,
  muted: true,
  controls: true,
  loop: false,
  preload: "metadata",
};

// Carousel/Slider settings
export const CAROUSEL_SETTINGS = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
  arrows: true,
  dots: true,
};

// Icon settings
export const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};
