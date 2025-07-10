/**
 * @fileoverview User model schema for MongoDB with authentication, preferences, and e-commerce functionality
 * Provides comprehensive user management including Auth0 integration, wishlist, addresses, and order history
 * Includes virtual properties for display names, instance methods for user operations, and optimized indexing
 */

import mongoose from "mongoose";

/**
 * Mongoose schema definition for user documents with comprehensive e-commerce and authentication features
 * @typedef {Object} UserSchema
 * @property {string} email - User's email address (required, unique, lowercase)
 * @property {boolean} emailVerified - Whether user's email has been verified
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} given_name - Auth0 given name field
 * @property {string} family_name - Auth0 family name field
 * @property {string} name - Full name from Auth0 or user input
 * @property {Date} dateOfBirth - User's date of birth
 * @property {string} phone - User's phone number
 * @property {string} avatar - URL to user's profile image
 * @property {Object} preferences - User preferences including theme, currency, notifications
 * @property {string} role - User role (USER, ADMIN, SUPER_ADMIN, MODERATOR)
 * @property {boolean} isActive - Whether user account is active
 * @property {boolean} requirePasswordReset - Whether user needs to reset password
 * @property {Date} lastLoginAt - Timestamp of user's last login
 * @property {Array<Object>} addresses - User's shipping and billing addresses
 * @property {Array<Object>} wishlist - User's wishlist with product references
 * @property {Array<Object>} recentlyViewed - Recently viewed products with timestamps
 * @property {Array<ObjectId>} orders - References to user's orders
 * @property {Array<ObjectId>} reviews - References to user's product reviews
 * @property {string} auth0Id - Auth0 user identifier for SSO integration
 * @property {string} provider - Authentication provider (local, auth0, etc.)
 * @property {string} signupSource - Source of user registration for analytics
 * @property {string} utmSource - UTM tracking parameters for marketing attribution
 * @property {string} utmMedium - UTM medium parameter
 * @property {string} utmCampaign - UTM campaign parameter
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },

    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    given_name: String,
    family_name: String,
    name: String,

    dateOfBirth: {
      type: Date,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },

    preferences: {
      theme: {
        type: String,
        enum: ["light", "dark"],
        default: "light",
      },
      currency: {
        type: String,
        default: "USD",
      },
      language: {
        type: String,
        default: "en",
      },
      newsletters: {
        type: Boolean,
        default: true,
      },
      notifications: {
        type: Boolean,
        default: true,
      },
      smsUpdates: {
        type: Boolean,
        default: false,
      },
      size: String,
      favoriteCategories: [String],
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN", "SUPER_ADMIN", "MODERATOR"],
      default: "USER",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    requirePasswordReset: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: Date,
    },

    addresses: [
      {
        type: {
          type: String,
          enum: ["shipping", "billing"],
          required: true,
        },
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: {
          type: String,
          default: "US",
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    wishlist: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    recentlyViewed: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        viewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],

    auth0Id: {
      type: String,
      unique: true,
      sparse: true,
    },
    provider: {
      type: String,
      default: "local",
    },

    signupSource: String,
    utmSource: String,
    utmMedium: String,
    utmCampaign: String,
  },
  {
    timestamps: true,
  }
);

// Database indexes for optimized query performance
userSchema.index({ email: 1 });
userSchema.index({ auth0Id: 1 });
userSchema.index({ role: 1 });
userSchema.index({ "addresses.zipCode": 1 });
userSchema.index({ "wishlist.productId": 1 });
userSchema.index({ "recentlyViewed.productId": 1 });

/**
 * Virtual property that returns user's full name from various name fields
 * @returns {string} User's full name or email if no name available
 */
userSchema.virtual("fullName").get(function () {
  if (this.name) return this.name;

  const firstName = this.firstName || this.given_name || "";
  const lastName = this.lastName || this.family_name || "";

  return `${firstName} ${lastName}`.trim() || this.email;
});

/**
 * Virtual property that returns user's display name for UI components
 * @returns {string} User's display name with fallback to email or "User"
 */
userSchema.virtual("displayName").get(function () {
  return (
    this.name ||
    `${this.firstName || this.given_name || ""} ${this.lastName || this.family_name || ""}`.trim() ||
    this.email ||
    "User"
  );
});

/**
 * Virtual property that returns user's initials for avatar displays
 * @returns {string} User's initials in uppercase
 */
userSchema.virtual("initials").get(function () {
  const firstName = this.firstName || this.given_name || "";
  const lastName = this.lastName || this.family_name || "";

  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
});

/**
 * Instance method to add a product to user's wishlist
 * @param {string|ObjectId} productId - Product ID to add to wishlist
 * @returns {Promise<User>} Updated user document
 */
userSchema.methods.addToWishlist = function (productId) {
  const existingItem = this.wishlist.find(
    item => item.productId.toString() === productId.toString()
  );

  if (!existingItem) {
    this.wishlist.push({ productId });
    return this.save();
  }

  return Promise.resolve(this);
};

/**
 * Instance method to remove a product from user's wishlist
 * @param {string|ObjectId} productId - Product ID to remove from wishlist
 * @returns {Promise<User>} Updated user document
 */
userSchema.methods.removeFromWishlist = function (productId) {
  this.wishlist = this.wishlist.filter(item => item.productId.toString() !== productId.toString());
  return this.save();
};

/**
 * Instance method to add a product to recently viewed list with automatic deduplication
 * @param {string|ObjectId} productId - Product ID to add to recently viewed
 * @returns {Promise<User>} Updated user document
 */
userSchema.methods.addToRecentlyViewed = function (productId) {
  this.recentlyViewed = this.recentlyViewed.filter(
    item => item.productId.toString() !== productId.toString()
  );
  this.recentlyViewed.unshift({ productId });
  this.recentlyViewed = this.recentlyViewed.slice(0, 10);

  return this.save();
};

/**
 * Instance method to check if user has a specific role
 * @param {string} role - Role to check against user's role
 * @returns {boolean} Whether user has the specified role
 */
userSchema.methods.hasRole = function (role) {
  return this.role === role;
};

/**
 * Instance method to check if user has a specific permission based on role
 * @param {string} permission - Permission to check
 * @param {Object} rolePermissions - Object mapping roles to their permissions
 * @returns {boolean} Whether user has the specified permission
 */
userSchema.methods.hasPermission = function (permission, rolePermissions) {
  const userPermissions = rolePermissions[this.role] || [];
  return userPermissions.includes(permission);
};

/**
 * Instance method to check if user has admin privileges
 * @returns {boolean} Whether user is an admin or super admin
 */
userSchema.methods.isAdmin = function () {
  return ["ADMIN", "SUPER_ADMIN"].includes(this.role);
};

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
