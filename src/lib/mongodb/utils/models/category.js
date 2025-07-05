import mongoose from "mongoose";

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

categorySchema.virtual("fullPath").get(function () {
  return this.parentCategory ? `${this.parentCategory}/${this.slug}` : this.slug;
});

categorySchema.virtual("url").get(function () {
  return this.path;
});

categorySchema.index({ parentCategory: 1, level: 1 });
categorySchema.index({ isActive: 1, isVisible: 1 });
categorySchema.index({ isMainNavigation: 1, navigationOrder: 1 });
categorySchema.index({ collections: 1 });
categorySchema.index({ seasonType: 1, isSeasonalCollection: 1 });

categorySchema.statics.findMainCategories = function () {
  return this.find({
    level: 0,
    isActive: true,
    isVisible: true,
  }).sort({ navigationOrder: 1 });
};

categorySchema.statics.findSubcategories = function (parentId) {
  return this.find({
    parentCategory: parentId,
    isActive: true,
    isVisible: true,
  }).sort({ navigationOrder: 1 });
};

categorySchema.statics.findByCollection = function (collectionType) {
  return this.find({
    collections: collectionType,
    isActive: true,
    isVisible: true,
  });
};

categorySchema.methods.updateProductCount = async function () {
  const Product = mongoose.model("NodeProduct");
  const count = await Product.countDocuments({
    category: this.id,
    isActive: true,
  });
  this.productCount = count;
  return this.save();
};

categorySchema.methods.incrementView = function () {
  this.viewCount += 1;
  return this.save();
};

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
