import mongoose from "mongoose";

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

productSchema.virtual("totalInventory").get(function () {
  return this.variants.reduce((sum, variant) => sum + variant.inventory, 0);
});

productSchema.virtual("inStock").get(function () {
  return this.totalInventory > 0;
});

productSchema.virtual("salePercentage").get(function () {
  if (this.compareAtPrice && this.compareAtPrice > this.price) {
    return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  }
  return 0;
});

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

productSchema.statics.findByCategory = function (category, options = {}) {
  const query = { category, isActive: true };
  const { limit = 20, sort = "-createdAt", subcategory } = options;

  if (subcategory) {
    query.subcategory = subcategory;
  }

  return this.find(query).limit(limit).sort(sort);
};

productSchema.statics.findFeatured = function (limit = 8) {
  return this.find({ isFeatured: true, isActive: true }).limit(limit).sort("-salesCount");
};

productSchema.statics.findNewArrivals = function (limit = 8) {
  return this.find({ isNewArrival: true, isActive: true }).limit(limit).sort("-createdAt");
};

productSchema.statics.findBestSellers = function (limit = 8) {
  return this.find({ isBestSeller: true, isActive: true }).limit(limit).sort("-salesCount");
};

productSchema.statics.findOnSale = function (limit = 20) {
  return this.find({ isOnSale: true, isActive: true }).limit(limit).sort("-createdAt");
};

productSchema.statics.findByCollection = function (collectionType, limit = 20) {
  return this.find({
    collections: collectionType,
    isActive: true,
  })
    .limit(limit)
    .sort("-createdAt");
};

productSchema.methods.addToCollection = function (collectionType) {
  if (!this.collections.includes(collectionType)) {
    this.collections.push(collectionType);
  }
  return this.save();
};

productSchema.methods.removeFromCollection = function (collectionType) {
  this.collections = this.collections.filter(c => c !== collectionType);
  return this.save();
};

productSchema.methods.updateCategoryPath = function () {
  this.categoryPath = this.subcategory ? `${this.category}/${this.subcategory}` : this.category;
  return this.save();
};

export default mongoose.models.Product || mongoose.model("Product", productSchema);
