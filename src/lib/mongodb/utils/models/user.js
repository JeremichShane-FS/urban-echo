/**
 * @fileoverview User model schema for MongoDB with authentication, preferences, and e-commerce functionality
 * Node.js version specifically designed for database seeding operations and npm script integration
 * Provides comprehensive user management including Auth0 integration, wishlist, addresses, and role-based access
 * Includes virtual properties for display names, instance methods for user operations, and optimized indexing
 */

import mongoose from "mongoose";

/**
 * Mongoose schema definition for user documents with comprehensive e-commerce and authentication features
 * @typedef {Object} UserSchema
 * @property {string} email - User's email address (required, unique, lowercase)
 * @property {boolean} emailVerified - Whether user's email has been verified
 * @property {string} auth0Id - Auth0 user identifier for SSO integration (unique, sparse)
 * @property {string} firstName - User's first name
 * @property {string} lastName - User's last name
 * @property {string} given_name - Auth0 given name field
 * @property {string} family_name - Auth0 family name field
 * @property {string} name - Full name from Auth0 or user input
 * @property {Date} dateOfBirth - User's date of birth
 * @property {string} phone - User's phone number
 * @property {string} avatar - URL to user's profile image
 * @property {Object} preferences - User preferences including theme, currency, notifications
 * @property {string} role - User role (CUSTOMER, ADMIN, SUPER_ADMIN)
 * @property {boolean} isActive - Whether user account is active
 * @property {boolean} requirePasswordReset - Whether user needs to reset password
 * @property {Date} lastLoginAt - Timestamp of user's last login
 * @property {Array<Object>} wishlist - User's wishlist with product references and timestamps
 * @property {Array<Object>} addresses - User's shipping and billing addresses
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

    auth0Id: {
      type: String,
      unique: true,
      sparse: true,
    },

    firstName: String,
    lastName: String,
    given_name: String,
    family_name: String,
    name: String,
    dateOfBirth: Date,
    phone: String,
    avatar: String,

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
    },

    role: {
      type: String,
      enum: ["CUSTOMER", "ADMIN", "SUPER_ADMIN"],
      default: "CUSTOMER",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    requirePasswordReset: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: Date,

    wishlist: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "NodeProduct",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    addresses: [
      {
        type: {
          type: String,
          enum: ["shipping", "billing", "both"],
          default: "both",
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
        firstName: String,
        lastName: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: {
          type: String,
          default: "US",
        },
        phoneNumber: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Virtual property that returns user's display name for UI components
 * @returns {string} User's display name with fallback hierarchy to email or "User"
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
 * Virtual property that returns user's full name from name fields
 * @returns {string} User's full name combining first and last names
 */
userSchema.virtual("fullName").get(function () {
  return `${this.firstName || this.given_name || ""} ${this.lastName || this.family_name || ""}`.trim();
});

/**
 * Instance method to add a product to user's wishlist with duplicate prevention
 * @param {string|ObjectId} productId - Product ID to add to wishlist
 * @returns {Promise<User>} Updated user document
 */
userSchema.methods.addToWishlist = function (productId) {
  const isAlreadyInWishlist = this.wishlist.some(
    item => item.productId.toString() === productId.toString()
  );

  if (!isAlreadyInWishlist) {
    this.wishlist.push({
      productId: productId,
      addedAt: new Date(),
    });
  }

  return this.save();
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
 * Instance method to check if user has a specific role
 * @param {string} role - Role to check against user's role
 * @returns {boolean} Whether user has the specified role
 */
userSchema.methods.hasRole = function (role) {
  return this.role === role;
};

/**
 * Instance method to check if user has admin privileges
 * @returns {boolean} Whether user is an admin or super admin
 */
userSchema.methods.isAdmin = function () {
  return this.role === "ADMIN" || this.role === "SUPER_ADMIN";
};

/**
 * Static method to find user by email address with case-insensitive matching
 * @param {string} email - Email address to search for
 * @returns {Promise<User|null>} User document or null if not found
 */
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

/**
 * Static method to find user by Auth0 ID for SSO integration
 * @param {string} auth0Id - Auth0 user identifier
 * @returns {Promise<User|null>} User document or null if not found
 */
userSchema.statics.findByAuth0Id = function (auth0Id) {
  return this.findOne({ auth0Id });
};

// Database indexes for optimized query performance
userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ lastLoginAt: -1 });

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
