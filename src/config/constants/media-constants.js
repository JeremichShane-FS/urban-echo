/**
 * @fileoverview Media asset constants for image optimization, responsive design, and CDN management
 * Defines image breakpoints, quality settings, format preferences, and default assets for consistent media handling
 * Supports modern image formats, lazy loading, and performance optimization across all application components
 */

// =================================================================
// SUPPORTED FORMATS AND FILE VALIDATION
// =================================================================

/**
 * Supported image and video formats for upload validation
 * @constant {Array<string>} SUPPORTED_IMAGE_FORMATS - Allowed image file types
 * @constant {Array<string>} SUPPORTED_VIDEO_FORMATS - Allowed video file types
 *
 * @example
 * // Validate file format before upload
 * const validateImageFormat = (file) => {
 *   const extension = file.name.split('.').pop().toLowerCase();
 *   return SUPPORTED_IMAGE_FORMATS.includes(extension);
 * };
 */
export const SUPPORTED_IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp", "gif"];
export const SUPPORTED_VIDEO_FORMATS = ["mp4", "webm"];

/**
 * Maximum file size limits for different media types
 * @constant {number} MAX_IMAGE_SIZE - Maximum image file size in bytes
 * @constant {number} MAX_VIDEO_SIZE - Maximum video file size in bytes
 * @constant {number} MAX_AVATAR_SIZE - Maximum avatar image size in bytes
 */
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_AVATAR_SIZE = 2 * 1024 * 1024; // 2MB

// =================================================================
// IMAGE DIMENSIONS AND SIZING
// =================================================================

/**
 * Standard image dimensions for product display across different contexts
 * @constant {Object} PRODUCT_IMAGE_SIZES - Product image size configurations
 *
 * @example
 * // Generate responsive product image
 * const ProductImage = ({ src, size = 'medium' }) => {
 *   const dimensions = PRODUCT_IMAGE_SIZES[size];
 *   return (
 *     <Image
 *       src={src}
 *       width={dimensions.width}
 *       height={dimensions.height}
 *       alt="Product"
 *     />
 *   );
 * };
 */
export const PRODUCT_IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 },
};

/**
 * Banner image dimensions for responsive hero sections
 * @constant {Object} BANNER_IMAGE_SIZES - Banner size configurations by device
 */
export const BANNER_IMAGE_SIZES = {
  mobile: { width: 600, height: 800 },
  tablet: { width: 1024, height: 500 },
  desktop: { width: 1920, height: 600 },
};

/**
 * Standard dimensions for specific UI elements
 */
export const AVATAR_SIZE = { width: 150, height: 150 };
export const LOGO_SIZE = { width: 200, height: 80 };
export const BLOG_THUMBNAIL_SIZE = { width: 400, height: 300 };

// =================================================================
// IMAGE QUALITY AND COMPRESSION
// =================================================================

/**
 * Image quality settings for optimal performance and visual quality
 * @constant {number} JPEG_QUALITY - JPEG compression quality (0-100)
 * @constant {number} PNG_COMPRESSION_LEVEL - PNG compression level (0-9)
 * @constant {number} WEBP_QUALITY - WebP compression quality (0-100)
 */
export const JPEG_QUALITY = 85;
export const PNG_COMPRESSION_LEVEL = 9;
export const WEBP_QUALITY = 80;

// =================================================================
// ASPECT RATIOS AND LAYOUT
// =================================================================

/**
 * Standard aspect ratios for consistent image display
 * @constant {Object} ASPECT_RATIOS - Common aspect ratio configurations
 *
 * @example
 * // Apply aspect ratio to image container
 * const AspectRatioContainer = ({ children, ratio = 'SQUARE' }) => (
 *   <div style={{ aspectRatio: ASPECT_RATIOS[ratio] }}>
 *     {children}
 *   </div>
 * );
 */
export const ASPECT_RATIOS = {
  SQUARE: "1:1",
  PORTRAIT: "3:4",
  LANDSCAPE: "4:3",
  WIDESCREEN: "16:9",
  BANNER: "21:9",
  PRODUCT: "3:4",
};

// =================================================================
// UPLOAD PATHS AND ORGANIZATION
// =================================================================

/**
 * File upload directory structure for organized media storage
 * @constant {Object} UPLOAD_PATHS - Directory paths for different content types
 *
 * @example
 * // Generate upload path for product images
 * const getProductImagePath = (filename) => {
 *   return `${UPLOAD_PATHS.products}${filename}`;
 * };
 */
export const UPLOAD_PATHS = {
  products: "/uploads/products/",
  categories: "/uploads/categories/",
  banners: "/uploads/banners/",
  avatars: "/uploads/avatars/",
  blog: "/uploads/blog/",
};

// =================================================================
// DEFAULT ASSETS AND FALLBACKS
// =================================================================

/**
 * Default image assets for fallbacks and placeholders
 * @constant {Object} DEFAULT_IMAGES - Standard fallback images
 *
 * @example
 * // Use default product image when none available
 * const ProductImage = ({ src, alt }) => (
 *   <Image
 *     src={src || DEFAULT_IMAGES.productPlaceholder}
 *     alt={alt}
 *     onError={(e) => {
 *       e.target.src = DEFAULT_IMAGES.productPlaceholder;
 *     }}
 *   />
 * );
 */
export const DEFAULT_IMAGES = {
  productPlaceholder: "@assets/images/product/product-placeholder.png",
  userAvatar: "/images/default-avatar.jpg",
  logo: "/images/svg/navbar-logo.svg",
  categoryPlaceholder: "/images/category-placeholder.jpg",
  errorImage: "/images/error-image.svg",
};

// =================================================================
// VIDEO PLAYER CONFIGURATION
// =================================================================

/**
 * Default video player settings for consistent playback behavior
 * @constant {Object} VIDEO_PLAYER_SETTINGS - Video element configuration
 *
 * @example
 * // Apply video settings to player
 * const VideoPlayer = ({ src }) => (
 *   <video {...VIDEO_PLAYER_SETTINGS} src={src}>
 *     Your browser does not support the video tag.
 *   </video>
 * );
 */
export const VIDEO_PLAYER_SETTINGS = {
  autoPlay: false,
  muted: true,
  controls: true,
  loop: false,
  preload: "metadata",
};

// =================================================================
// CAROUSEL AND SLIDER SETTINGS
// =================================================================

/**
 * Default carousel/slider configuration for image galleries
 * @constant {Object} CAROUSEL_SETTINGS - Slider behavior configuration
 *
 * @example
 * // Initialize product image carousel
 * const ProductCarousel = ({ images }) => (
 *   <Slider {...CAROUSEL_SETTINGS}>
 *     {images.map((image, index) => (
 *       <div key={index}>
 *         <Image src={image.src} alt={image.alt} />
 *       </div>
 *     ))}
 *   </Slider>
 * );
 */
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

// =================================================================
// ICON CONFIGURATION
// =================================================================

/**
 * Standard icon sizes for consistent UI elements
 * @constant {Object} ICON_SIZES - Icon size configurations in pixels
 *
 * @example
 * // Use standard icon sizes in components
 * const IconButton = ({ icon, size = 'md' }) => (
 *   <button>
 *     <Icon name={icon} size={ICON_SIZES[size]} />
 *   </button>
 * );
 */
export const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};
