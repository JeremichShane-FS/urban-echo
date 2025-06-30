import mongoose from "mongoose";

import { DEFAULT_COUNTRY, ORDER_NUMBER_PREFIX, ORDER_STATUS } from "@config/constants";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return `${ORDER_NUMBER_PREFIX}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variant: {
          size: String,
          color: String,
          sku: String,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      firstName: String,
      lastName: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: DEFAULT_COUNTRY,
      },
      phoneNumber: String,
    },
    billingAddress: {
      firstName: String,
      lastName: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: {
        type: String,
        default: DEFAULT_COUNTRY,
      },
      phoneNumber: String,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    stripePaymentIntentId: String,
    trackingNumber: String,
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });

// Static method to generate order number (alternative approach)
orderSchema.statics.generateOrderNumber = function () {
  return `${ORDER_NUMBER_PREFIX}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
