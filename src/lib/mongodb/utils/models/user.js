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

// Virtual Fields
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

userSchema.virtual("fullName").get(function () {
  return `${this.firstName || this.given_name || ""} ${this.lastName || this.family_name || ""}`.trim();
});

// Instance Methods (matching Zustand functionality)
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

userSchema.methods.removeFromWishlist = function (productId) {
  this.wishlist = this.wishlist.filter(item => item.productId.toString() !== productId.toString());
  return this.save();
};

userSchema.methods.hasRole = function (role) {
  return this.role === role;
};

userSchema.methods.isAdmin = function () {
  return this.role === "ADMIN" || this.role === "SUPER_ADMIN";
};

// Static Methods
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findByAuth0Id = function (auth0Id) {
  return this.findOne({ auth0Id });
};

userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ lastLoginAt: -1 });

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
