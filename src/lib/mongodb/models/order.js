/**
 * @fileoverview Order model schema for MongoDB with comprehensive e-commerce order management
 * Provides order processing including items, addresses, pricing, status tracking, and payment integration
 * Includes automatic order number generation, status management, and Stripe payment integration
 */

import mongoose from "mongoose";

import { DEFAULT_COUNTRY, ORDER_NUMBER_PREFIX, ORDER_STATUS } from "@config/constants";

/**
 * Mongoose schema definition for order documents with comprehensive e-commerce functionality
 * @typedef {Object} OrderSchema
 * @property {string} orderNumber - Unique order identifier (auto-generated)
 * @property {ObjectId} user - Reference to user who placed the order (required)
 * @property {Array<Object>} items - Order items with product references, variants, quantities, and pricing
 * @property {Object} shippingAddress - Customer's shipping address information
 * @property {Object} billingAddress - Customer's billing address information
 * @property {number} subtotal - Order subtotal before shipping and tax (required)
 * @property {number} shipping - Shipping cost (default: 0)
 * @property {number} tax - Tax amount (default: 0)
 * @property {number} total - Order total including all charges (required)
 * @property {string} status - Order status (pending, confirmed, processing, shipped, delivered, cancelled)
 * @property {string} paymentStatus - Payment status (pending, paid, failed, refunded)
 * @property {string} stripePaymentIntentId - Stripe payment intent ID for payment tracking
 * @property {string} trackingNumber - Shipping tracking number
 * @property {string} notes - Additional order notes
 */
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

// Database indexes for optimized query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ status: 1 });

/**
 * Static method to generate a unique order number with timestamp and random string
 * @returns {string} Generated order number with prefix, timestamp, and random identifier
 */
orderSchema.statics.generateOrderNumber = function () {
  return `${ORDER_NUMBER_PREFIX}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
