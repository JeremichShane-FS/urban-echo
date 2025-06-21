/**
 * @fileoverview This file contains constants related to user authentication, roles, permissions, and account management.
 * It serves as a centralized location for managing all user-related constants used in the application.
 */

// Authentication
export const AUTH_TOKEN_KEY = "urban_echo_auth_token";
export const REFRESH_TOKEN_KEY = "urban_echo_refresh_token";
export const TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds
export const REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes of inactivity

// Password requirements
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
  maxLength: 128,
};

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/;

// User roles and permissions
export const USER_ROLES = {
  GUEST: "guest",
  CUSTOMER: "customer",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
  STORE_MANAGER: "store_manager",
  SUPPORT: "support",
};

export const ROLE_PERMISSIONS = {
  [USER_ROLES.GUEST]: ["view_products", "manage_cart"],
  [USER_ROLES.CUSTOMER]: [
    "view_products",
    "manage_cart",
    "checkout",
    "view_orders",
    "manage_profile",
    "write_reviews",
  ],
  [USER_ROLES.ADMIN]: [
    "view_products",
    "manage_cart",
    "checkout",
    "view_orders",
    "manage_profile",
    "write_reviews",
    "manage_products",
    "manage_orders",
    "view_customers",
  ],
  [USER_ROLES.SUPER_ADMIN]: [
    "view_products",
    "manage_cart",
    "checkout",
    "view_orders",
    "manage_profile",
    "write_reviews",
    "manage_products",
    "manage_orders",
    "view_customers",
    "manage_admins",
    "manage_settings",
  ],
  [USER_ROLES.STORE_MANAGER]: [
    "view_products",
    "manage_cart",
    "checkout",
    "view_orders",
    "manage_profile",
    "write_reviews",
    "manage_products",
    "manage_orders",
    "view_customers",
  ],
  [USER_ROLES.SUPPORT]: ["view_products", "view_orders", "view_customers", "manage_orders"],
};

// Account verification
export const VERIFICATION_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
export const VERIFICATION_EMAIL_SUBJECT = "Verify Your Urban Echo Account";
export const PASSWORD_RESET_EMAIL_SUBJECT = "Reset Your Urban Echo Password";
export const VERIFICATION_CODE_LENGTH = 6;

// Account recovery
export const RECOVERY_TOKEN_EXPIRY = 15 * 60 * 1000; // 15 minutes in milliseconds
export const MAX_RECOVERY_ATTEMPTS = 3;
export const RECOVERY_ATTEMPT_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// User profile
export const MAX_ADDRESSES = 10;
export const MAX_PAYMENT_METHODS = 5;
export const ADDRESS_TYPES = {
  SHIPPING: "shipping",
  BILLING: "billing",
  BOTH: "both",
};

// Profile fields
export const REQUIRED_PROFILE_FIELDS = ["firstName", "lastName", "email"];
export const OPTIONAL_PROFILE_FIELDS = ["phoneNumber", "birthDate", "gender"];
export const EDITABLE_PROFILE_FIELDS = [
  "firstName",
  "lastName",
  "phoneNumber",
  "birthDate",
  "gender",
];
export const GDPR_FIELDS = ["marketingConsent", "dataProcessingConsent", "thirdPartyConsent"];

// Login/auth settings
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
export const REQUIRE_2FA = false;
export const SOCIAL_LOGIN_PROVIDERS = ["google", "facebook", "apple"];

// Newsletter subscription
export const DEFAULT_NEWSLETTER_FREQUENCY = "weekly";
export const NEWSLETTER_PREFERENCES = {
  newArrivals: true,
  promotions: true,
  events: false,
  blog: false,
};

// User activity tracking
export const TRACK_USER_ACTIVITY = true;
export const USER_ACTIVITY_TYPES = {
  LOGIN: "login",
  LOGOUT: "logout",
  VIEW_PRODUCT: "view_product",
  ADD_TO_CART: "add_to_cart",
  PURCHASE: "purchase",
  ADD_TO_WISHLIST: "add_to_wishlist",
  REMOVE_FROM_WISHLIST: "remove_from_wishlist",
  APPLY_PROMO: "apply_promo",
  WRITE_REVIEW: "write_review",
  UPDATE_PROFILE: "update_profile",
};

// Account deletion
export const DATA_RETENTION_PERIOD = 90 * 24 * 60 * 60 * 1000; // 90 days after account deletion
export const ACCOUNT_DELETION_COOLDOWN = 14 * 24 * 60 * 60 * 1000; // 14 days to change mind
