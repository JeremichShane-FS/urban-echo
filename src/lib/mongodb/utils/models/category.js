/**
 * @fileoverview Category model schema for MongoDB with hierarchical category management and navigation features
 * Node.js version specifically designed for database seeding operations and npm script integration
 * Provides comprehensive category structure including subcategories, collections, SEO optimization, and display settings
 * Includes virtual properties for URL generation, static methods for navigation queries, and instance methods for operations
 */

import mongoose from "mongoose";

/**
 * Mongoose schema definition for category documents with hierarchical structure and e-commerce features
 * @typedef {Object} CategorySchema
 * @property {string} id - Unique category identifier (required)
 * @property {string} name - Category display name (required)
 * @property {string} slug - URL-friendly category identifier (required, unique)
 * @property {string} parentCategory - Parent category ID for hierarchical structure
 * @property {number} level - Category hierarchy level (0 for main categories)
 * @property {string} path - Full category path for navigation (required)
 * @property {string} description - Detailed category description
 * @property {string} shortDescription - Brief category description (max 160 characters)
 * @property {Object} image - Category image with URL, alt text, and position
 * @property {Object} bannerImage - Category banner image for headers
 * @property {boolean} isMainNavigation - Whether category appears in main navigation
 * @property {boolean} isHighlighted - Whether category is highlighted/featured
 * @property {number} navigationOrder - Sort order for navigation display
 * @property {Object} seo - SEO optimization fields (title, meta description, keywords)
 * @property {boolean} isActive - Whether category is active and functional
 * @property {boolean} isVisible - Whether category is visible to users
 * @property {number} productCount - Number of products in category
 * @property {number} viewCount - Number of category page views
 * @property {Array<string>} collections - Category collections for grouping
 * @property {Array<string>} tags - Category tags for search and filtering
 * @property {boolean} isSeasonalCollection - Whether category is seasonal
 * @property {string} seasonType - Season type (spring, summer, fall, winter, holiday)
 * @property {Object} displaySettings - Category display configuration options
 */
const categorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    parentCategory: {
      type: String,
      default: null,
    },
    level: {
      type: Number,
      default: 0,
    },
    path: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    image: {
      url: String,
      alt: String,
      position: { type: Number, default: 0 },
    },
    bannerImage: {
      url: String,
      alt: String,
    },
    isMainNavigation: {
      type: Boolean,
      default: false,
    },
    isHighlighted: {
      type: Boolean,
      default: false,
    },
    navigationOrder: {
      type: Number,
      default: 0,
    },
    seo: {
      title: String,
      metaDescription: String,
      keywords: [String],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
    productCount: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    collections: [String],
    tags: [String],
    isSeasonalCollection: {
      type: Boolean,
      default: false,
    },
    seasonType: {
      type: String,
      enum: ["spring", "summer", "fall", "winter", "holiday", null],
      default: null,
    },
    displaySettings: {
      showSubcategories: { type: Boolean, default: true },
      showProductCount: { type: Boolean, default: true },
      layoutType: {
        type: String,
        enum: ["grid", "list", "masonry"],
        default: "grid",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Virtual property that returns the full category path including parent hierarchy
 * @returns {string} Full category path with parent/child structure
 */
categorySchema.virtual("fullPath").get(function () {
  return this.parentCategory ? `${this.parentCategory}/${this.slug}` : this.slug;
});

/**
 * Virtual property that returns the category URL path for navigation
 * @returns {string} Category URL path
 */
categorySchema.virtual("url").get(function () {
  return this.path;
});

// Database indexes for optimized query performance
categorySchema.index({ parentCategory: 1, level: 1 });
categorySchema.index({ isActive: 1, isVisible: 1 });
categorySchema.index({ isMainNavigation: 1, navigationOrder: 1 });
categorySchema.index({ collections: 1 });
categorySchema.index({ seasonType: 1, isSeasonalCollection: 1 });

/**
 * Static method to find main categories (level 0) for navigation
 * @returns {Query} Mongoose query for main categories sorted by navigation order
 */
categorySchema.statics.findMainCategories = function () {
  return this.find({
    level: 0,
    isActive: true,
    isVisible: true,
  }).sort({ navigationOrder: 1 });
};

/**
 * Static method to find subcategories for a given parent category
 * @param {string} parentId - Parent category ID to find subcategories for
 * @returns {Query} Mongoose query for subcategories sorted by navigation order
 */
categorySchema.statics.findSubcategories = function (parentId) {
  return this.find({
    parentCategory: parentId,
    isActive: true,
    isVisible: true,
  }).sort({ navigationOrder: 1 });
};

/**
 * Static method to find categories by collection type
 * @param {string} collectionType - Collection type to filter categories by
 * @returns {Query} Mongoose query for categories in specified collection
 */
categorySchema.statics.findByCollection = function (collectionType) {
  return this.find({
    collections: collectionType,
    isActive: true,
    isVisible: true,
  });
};

/**
 * Instance method to update product count for this category from actual product data
 * @async
 * @returns {Promise<Category>} Updated category document with current product count
 */
categorySchema.methods.updateProductCount = async function () {
  const Product = mongoose.model("NodeProduct");
  const count = await Product.countDocuments({
    category: this.id,
    isActive: true,
  });
  this.productCount = count;
  return this.save();
};

/**
 * Instance method to increment category view count for analytics
 * @returns {Promise<Category>} Updated category document with incremented view count
 */
categorySchema.methods.incrementView = function () {
  this.viewCount += 1;
  return this.save();
};

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
