import mongoose from "mongoose";

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

userSchema.index({ email: 1 });
userSchema.index({ auth0Id: 1 });
userSchema.index({ role: 1 });
userSchema.index({ "addresses.zipCode": 1 });
userSchema.index({ "wishlist.productId": 1 });
userSchema.index({ "recentlyViewed.productId": 1 });

userSchema.virtual("fullName").get(function () {
  if (this.name) return this.name;

  const firstName = this.firstName || this.given_name || "";
  const lastName = this.lastName || this.family_name || "";

  return `${firstName} ${lastName}`.trim() || this.email;
});

userSchema.virtual("displayName").get(function () {
  return (
    this.name ||
    `${this.firstName || this.given_name || ""} ${this.lastName || this.family_name || ""}`.trim() ||
    this.email ||
    "User"
  );
});

userSchema.virtual("initials").get(function () {
  const firstName = this.firstName || this.given_name || "";
  const lastName = this.lastName || this.family_name || "";

  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
});

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

userSchema.methods.removeFromWishlist = function (productId) {
  this.wishlist = this.wishlist.filter(item => item.productId.toString() !== productId.toString());
  return this.save();
};

userSchema.methods.addToRecentlyViewed = function (productId) {
  this.recentlyViewed = this.recentlyViewed.filter(
    item => item.productId.toString() !== productId.toString()
  );
  this.recentlyViewed.unshift({ productId });
  this.recentlyViewed = this.recentlyViewed.slice(0, 10);

  return this.save();
};

userSchema.methods.hasRole = function (role) {
  return this.role === role;
};

userSchema.methods.hasPermission = function (permission, rolePermissions) {
  const userPermissions = rolePermissions[this.role] || [];
  return userPermissions.includes(permission);
};

userSchema.methods.isAdmin = function () {
  return ["ADMIN", "SUPER_ADMIN"].includes(this.role);
};

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
