/**
 * @fileoverview Product model schema for MongoDB with comprehensive e-commerce functionality
 * Node.js version specifically designed for database seeding operations and npm script integration
 * Provides product management including variants, collections, pricing, inventory, and SEO optimization
 * Includes virtual properties for calculated fields, static methods for queries, and instance methods for operations
 */

import mongoose from "mongoose";

/**
 * Mongoose schema definition for product documents with comprehensive e-commerce features
 * @typedef {Object} ProductSchema
 * @property {string} name - Product name (required)
 * @property {string} slug - URL-friendly product identifier (required, unique)
 * @property {string} description - Product description (required)
 * @property {string} category - Main product category (men, women, accessories, sale)
 * @property {string} subcategory - Product subcategory for detailed classification
 * @property {string} categoryPath - Computed category path for navigation
 * @property {number} price - Product price (required, minimum 0)
 * @property {number} compareAtPrice - Original price for sale calculations
 * @property {Array<Object>} images - Product images with URLs, alt text, and positioning
 * @property {Array<Object>} variants - Product variants with size, color, SKU, and inventory
 * @property {Array<string>} tags - Product tags for search and categorization
 * @property {Array<string>} collections - Product collections (featured, new-arrivals, etc.)
 * @property {boolean} isFeatured - Whether product is featured
 * @property {boolean} isNewArrival - Whether product is a new arrival
 * @property {boolean} isBestSeller - Whether product is a best seller
 * @property {boolean} isOnSale - Whether product is on sale
 * @property {boolean} isTrending - Whether product is trending
 * @property {boolean} isLimitedEdition - Whether product is limited edition
 * @property {boolean} isActive - Whether product is active and visible
 * @property {number} rating - Product rating (0-5)
 * @property {number} reviewCount - Number of reviews
 * @property {number} salesCount - Number of sales for popularity ranking
 * @property {number} viewCount - Number of views for analytics
 * @property {Object} seo - SEO optimization fields (title, meta description, keywords)
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["men", "women", "accessories", "sale"],
      index: true,
    },
    subcategory: {
      type: String,
      enum: [
        "shirts",
        "pants",
        "jackets",
        "hoodies",
        "shorts",
        "shoes",
        "sweaters",
        "tops",
        "dresses",
        "bags",
        "watches",
        "jewelry",
        "belts",
      ],
      index: true,
    },
    categoryPath: {
      type: String,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      min: 0,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          required: true,
        },
        position: {
          type: Number,
          default: 0,
        },
      },
    ],
    variants: [
      {
        size: { type: String, required: true },
        color: { type: String, required: true },
        sku: { type: String, required: true, unique: true },
        inventory: { type: Number, default: 0 },
        price: Number,
      },
    ],
    tags: [String],
    collections: {
      type: [String],
      enum: ["featured", "new-arrivals", "best-sellers", "trending", "limited-edition", "sale"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
      index: true,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
      index: true,
    },
    isOnSale: {
      type: Boolean,
      default: false,
      index: true,
    },
    isTrending: {
      type: Boolean,
      default: false,
      index: true,
    },
    isLimitedEdition: {
      type: Boolean,
      default: false,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    salesCount: {
      type: Number,
      default: 0,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    seo: {
      title: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Virtual property that calculates total inventory across all product variants
 * @returns {number} Total inventory count
 */
productSchema.virtual("totalInventory").get(function () {
  return this.variants.reduce((sum, variant) => sum + variant.inventory, 0);
});

/**
 * Virtual property that determines if product is in stock
 * @returns {boolean} Whether product has inventory available
 */
productSchema.virtual("inStock").get(function () {
  return this.totalInventory > 0;
});

/**
 * Virtual property that calculates sale percentage discount
 * @returns {number} Sale percentage (0-100) or 0 if not on sale
 */
productSchema.virtual("salePercentage").get(function () {
  if (this.compareAtPrice && this.compareAtPrice > this.price) {
    return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  }
  return 0;
});

// Database indexes for optimized query performance
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ category: 1, subcategory: 1, isActive: 1 });
productSchema.index({ categoryPath: 1, isActive: 1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ isNewArrival: 1, isActive: 1 });
productSchema.index({ isBestSeller: 1, isActive: 1 });
productSchema.index({ isOnSale: 1, isActive: 1 });
productSchema.index({ collections: 1, isActive: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ salesCount: -1 });
productSchema.index({ rating: -1 });

/**
 * Static method to find products by category with optional subcategory filtering
 * @param {string} category - Product category to filter by
 * @param {Object} options - Query options including limit, sort, and subcategory
 * @returns {Query} Mongoose query for products in specified category
 */
productSchema.statics.findByCategory = function (category, options = {}) {
  const query = { category, isActive: true };
  const { limit = 20, sort = "-createdAt", subcategory } = options;

  if (subcategory) {
    query.subcategory = subcategory;
  }

  return this.find(query).limit(limit).sort(sort);
};

/**
 * Static method to find featured products sorted by sales count
 * @param {number} limit - Maximum number of products to return
 * @returns {Query} Mongoose query for featured products
 */
productSchema.statics.findFeatured = function (limit = 8) {
  return this.find({ isFeatured: true, isActive: true }).limit(limit).sort("-salesCount");
};

/**
 * Static method to find new arrival products sorted by creation date
 * @param {number} limit - Maximum number of products to return
 * @returns {Query} Mongoose query for new arrival products
 */
productSchema.statics.findNewArrivals = function (limit = 8) {
  return this.find({ isNewArrival: true, isActive: true }).limit(limit).sort("-createdAt");
};

/**
 * Static method to find best selling products sorted by sales count
 * @param {number} limit - Maximum number of products to return
 * @returns {Query} Mongoose query for best selling products
 */
productSchema.statics.findBestSellers = function (limit = 8) {
  return this.find({ isBestSeller: true, isActive: true }).limit(limit).sort("-salesCount");
};

/**
 * Static method to find products on sale sorted by creation date
 * @param {number} limit - Maximum number of products to return
 * @returns {Query} Mongoose query for sale products
 */
productSchema.statics.findOnSale = function (limit = 20) {
  return this.find({ isOnSale: true, isActive: true }).limit(limit).sort("-createdAt");
};

/**
 * Static method to find products by collection type
 * @param {string} collectionType - Collection type to filter by
 * @param {number} limit - Maximum number of products to return
 * @returns {Query} Mongoose query for products in specified collection
 */
productSchema.statics.findByCollection = function (collectionType, limit = 20) {
  return this.find({
    collections: collectionType,
    isActive: true,
  })
    .limit(limit)
    .sort("-createdAt");
};

/**
 * Instance method to add product to a collection
 * @param {string} collectionType - Collection type to add product to
 * @returns {Promise<Product>} Updated product document
 */
productSchema.methods.addToCollection = function (collectionType) {
  if (!this.collections.includes(collectionType)) {
    this.collections.push(collectionType);
  }
  return this.save();
};

/**
 * Instance method to remove product from a collection
 * @param {string} collectionType - Collection type to remove product from
 * @returns {Promise<Product>} Updated product document
 */
productSchema.methods.removeFromCollection = function (collectionType) {
  this.collections = this.collections.filter(c => c !== collectionType);
  return this.save();
};

/**
 * Instance method to update category path based on category and subcategory
 * @returns {Promise<Product>} Updated product document
 */
productSchema.methods.updateCategoryPath = function () {
  this.categoryPath = this.subcategory ? `${this.category}/${this.subcategory}` : this.category;
  return this.save();
};

export default mongoose.models.Product || mongoose.model("Product", productSchema);
