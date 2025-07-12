/**
 * @fileoverview User management constants for authentication, roles, permissions, and account lifecycle management
 * Defines comprehensive user authentication flows, security configurations, and profile management settings
 * Supports role-based access control, account verification, privacy compliance, and user activity tracking
 */

// =================================================================
// AUTHENTICATION CONFIGURATION
// =================================================================

/**
 * Authentication token and session management settings
 * @constant {string} AUTH_TOKEN_KEY - Local storage key for authentication token
 * @constant {string} REFRESH_TOKEN_KEY - Local storage key for refresh token
 * @constant {number} TOKEN_EXPIRY - Authentication token expiration time in milliseconds
 * @constant {number} REFRESH_TOKEN_EXPIRY - Refresh token expiration time in milliseconds
 * @constant {number} SESSION_TIMEOUT - Session inactivity timeout in milliseconds
 */
export const AUTH_TOKEN_KEY = "urban_echo_auth_token";
export const REFRESH_TOKEN_KEY = "urban_echo_refresh_token";
export const TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds
export const REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes of inactivity

// =================================================================
// PASSWORD SECURITY CONFIGURATION
// =================================================================

/**
 * Password security requirements and validation patterns
 * @constant {Object} PASSWORD_REQUIREMENTS - Password complexity requirements
 * @constant {RegExp} PASSWORD_REGEX - Password validation regular expression
 *
 * @example
 * // Validate password strength
 * const validatePassword = (password) => {
 *   if (password.length < PASSWORD_REQUIREMENTS.minLength) {
 *     return 'Password too short';
 *   }
 *   if (!PASSWORD_REGEX.test(password)) {
 *     return 'Password does not meet requirements';
 *   }
 *   return null;
 * };
 *
 * @example
 * // Password strength indicator
 * const getPasswordStrength = (password) => {
 *   let score = 0;
 *   if (password.length >= PASSWORD_REQUIREMENTS.minLength) score++;
 *   if (PASSWORD_REQUIREMENTS.requireUppercase && /[A-Z]/.test(password)) score++;
 *   if (PASSWORD_REQUIREMENTS.requireLowercase && /[a-z]/.test(password)) score++;
 *   if (PASSWORD_REQUIREMENTS.requireNumber && /\d/.test(password)) score++;
 *   if (PASSWORD_REQUIREMENTS.requireSpecialChar && /[!$%&*?@]/.test(password)) score++;
 *   return score;
 * };
 */
export const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
  maxLength: 128,
};

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!$%&*?@])[\d!$%&*?@A-Za-z]{8,128}$/;

// =================================================================
// USER ROLES AND PERMISSIONS
// =================================================================

/**
 * User role definitions for role-based access control
 * @constant {Object} USER_ROLES - Available user role identifiers
 */
export const USER_ROLES = {
  GUEST: "guest",
  CUSTOMER: "customer",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
  STORE_MANAGER: "store_manager",
  SUPPORT: "support",
};

/**
 * Role-based permission mapping for feature access control
 * @constant {Object} ROLE_PERMISSIONS - Permission sets by user role
 *
 * @example
 * // Check user permissions
 * const hasPermission = (userRole, permission) => {
 *   const permissions = ROLE_PERMISSIONS[userRole] || [];
 *   return permissions.includes(permission);
 * };
 *
 * @example
 * // Conditional feature rendering
 * const AdminPanel = ({ userRole }) => {
 *   if (!hasPermission(userRole, 'manage_products')) {
 *     return <AccessDenied />;
 *   }
 *   return <ProductManagement />;
 * };
 */
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

// =================================================================
// ACCOUNT VERIFICATION AND RECOVERY
// =================================================================

/**
 * Account verification and password recovery configuration
 * @constant {number} VERIFICATION_TOKEN_EXPIRY - Email verification token expiration time
 * @constant {string} VERIFICATION_EMAIL_SUBJECT - Subject line for verification emails
 * @constant {string} PASSWORD_RESET_EMAIL_SUBJECT - Subject line for password reset emails
 * @constant {number} VERIFICATION_CODE_LENGTH - Length of verification codes
 * @constant {number} RECOVERY_TOKEN_EXPIRY - Password recovery token expiration time
 * @constant {number} MAX_RECOVERY_ATTEMPTS - Maximum password recovery attempts
 * @constant {number} RECOVERY_ATTEMPT_TIMEOUT - Timeout between recovery attempts
 */

// Account verification
export const VERIFICATION_TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
export const VERIFICATION_EMAIL_SUBJECT = "Verify Your Urban Echo Account";
export const PASSWORD_RESET_EMAIL_SUBJECT = "Reset Your Urban Echo Password";
export const VERIFICATION_CODE_LENGTH = 6;

// Account recovery
export const RECOVERY_TOKEN_EXPIRY = 15 * 60 * 1000; // 15 minutes in milliseconds
export const MAX_RECOVERY_ATTEMPTS = 3;
export const RECOVERY_ATTEMPT_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// =================================================================
// USER PROFILE CONFIGURATION
// =================================================================

/**
 * User profile management settings and field definitions
 * @constant {number} MAX_ADDRESSES - Maximum addresses per user account
 * @constant {number} MAX_PAYMENT_METHODS - Maximum saved payment methods per user
 * @constant {Object} ADDRESS_TYPES - Available address type classifications
 * @constant {Array<string>} REQUIRED_PROFILE_FIELDS - Mandatory profile fields
 * @constant {Array<string>} OPTIONAL_PROFILE_FIELDS - Optional profile fields
 * @constant {Array<string>} EDITABLE_PROFILE_FIELDS - User-editable profile fields
 * @constant {Array<string>} GDPR_FIELDS - GDPR compliance consent fields
 *
 * @example
 * // Validate profile completeness
 * const validateProfileFields = (profile) => {
 *   const missingFields = REQUIRED_PROFILE_FIELDS.filter(
 *     field => !profile[field] || profile[field].trim() === ''
 *   );
 *   return missingFields.length === 0 ? null : missingFields;
 * };
 *
 * @example
 * // Generate profile form fields
 * const ProfileForm = () => (
 *   <form>
 *     {REQUIRED_PROFILE_FIELDS.map(field => (
 *       <Input key={field} name={field} required />
 *     ))}
 *     {OPTIONAL_PROFILE_FIELDS.map(field => (
 *       <Input key={field} name={field} />
 *     ))}
 *   </form>
 * );
 */
export const MAX_ADDRESSES = 10;
export const MAX_PAYMENT_METHODS = 5;
export const ADDRESS_TYPES = {
  SHIPPING: "shipping",
  BILLING: "billing",
  BOTH: "both",
};

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

// =================================================================
// AUTHENTICATION SECURITY
// =================================================================

/**
 * Login security and social authentication configuration
 * @constant {number} MAX_LOGIN_ATTEMPTS - Maximum failed login attempts before lockout
 * @constant {number} LOGIN_LOCKOUT_DURATION - Account lockout duration after max attempts
 * @constant {boolean} REQUIRE_2FA - Two-factor authentication requirement flag
 * @constant {Array<string>} SOCIAL_LOGIN_PROVIDERS - Available social login options
 *
 * @example
 * // Track login attempts
 * const trackLoginAttempt = (email, success) => {
 *   if (!success) {
 *     const attempts = getLoginAttempts(email) + 1;
 *     if (attempts >= MAX_LOGIN_ATTEMPTS) {
 *       lockAccount(email, LOGIN_LOCKOUT_DURATION);
 *     }
 *     setLoginAttempts(email, attempts);
 *   } else {
 *     clearLoginAttempts(email);
 *   }
 * };
 */
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
export const REQUIRE_2FA = false;
export const SOCIAL_LOGIN_PROVIDERS = ["google", "facebook", "apple"];

// =================================================================
// NEWSLETTER AND PREFERENCES
// =================================================================

/**
 * Newsletter subscription and user preference defaults
 * @constant {string} DEFAULT_NEWSLETTER_FREQUENCY - Default newsletter frequency
 * @constant {Object} NEWSLETTER_PREFERENCES - Default newsletter subscription preferences
 */
export const DEFAULT_NEWSLETTER_FREQUENCY = "weekly";
export const NEWSLETTER_PREFERENCES = {
  newArrivals: true,
  promotions: true,
  events: false,
  blog: false,
};

// =================================================================
// USER ACTIVITY TRACKING
// =================================================================

/**
 * User activity monitoring and analytics configuration
 * @constant {boolean} TRACK_USER_ACTIVITY - Enable user activity tracking
 * @constant {Object} USER_ACTIVITY_TYPES - Available user activity event types
 *
 * @example
 * // Track user activity
 * const trackActivity = (userId, activityType, metadata = {}) => {
 *   if (!TRACK_USER_ACTIVITY) return;
 *
 *   analytics.track(activityType, {
 *     userId,
 *     timestamp: new Date().toISOString(),
 *     ...metadata
 *   });
 * };
 */
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

// =================================================================
// ACCOUNT DELETION AND DATA RETENTION
// =================================================================

/**
 * Account deletion and data retention policy configuration
 * @constant {number} DATA_RETENTION_PERIOD - Data retention period after account deletion
 * @constant {number} ACCOUNT_DELETION_COOLDOWN - Grace period to restore deleted account
 */
export const DATA_RETENTION_PERIOD = 90 * 24 * 60 * 60 * 1000; // 90 days after account deletion
export const ACCOUNT_DELETION_COOLDOWN = 14 * 24 * 60 * 60 * 1000; // 14 days to change mind
