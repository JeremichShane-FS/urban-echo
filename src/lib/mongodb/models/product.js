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
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    compareAtPrice: {
      type: Number,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    subcategory: String,
    brand: String,
    images: [
      {
        url: String,
        alt: String,
        position: Number,
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
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ isNewArrival: 1, isActive: 1 });
productSchema.index({ "variants.sku": 1 });

export default mongoose.models.Product || mongoose.model("Product", productSchema);
