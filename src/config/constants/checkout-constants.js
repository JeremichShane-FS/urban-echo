/**
 * Checkout and shopping cart related constants
 */

// Cart
export const MAX_CART_ITEMS = 50;
export const CART_STORAGE_KEY = "urban_echo_cart";
export const CART_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

// Checkout steps
export const CHECKOUT_STEPS = {
  CART: "cart",
  SHIPPING: "shipping",
  PAYMENT: "payment",
  REVIEW: "review",
  CONFIRMATION: "confirmation",
};

export const CHECKOUT_STEP_ORDER = [
  CHECKOUT_STEPS.CART,
  CHECKOUT_STEPS.SHIPPING,
  CHECKOUT_STEPS.PAYMENT,
  CHECKOUT_STEPS.REVIEW,
  CHECKOUT_STEPS.CONFIRMATION,
];

// Shopping thresholds
export const FREE_SHIPPING_THRESHOLD = 100; // Free shipping for orders over $100
export const STANDARD_SHIPPING_COST = 5.99;
export const EXPRESS_SHIPPING_COST = 14.99;
export const NEXT_DAY_SHIPPING_COST = 24.99;
export const INTERNATIONAL_SHIPPING_COST = 29.99;

// Shipping methods
export const SHIPPING_METHODS = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    cost: STANDARD_SHIPPING_COST,
    freeThreshold: FREE_SHIPPING_THRESHOLD,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    cost: EXPRESS_SHIPPING_COST,
    freeThreshold: null,
  },
  {
    id: "nextDay",
    name: "Next Day Delivery",
    description: "Next business day",
    cost: NEXT_DAY_SHIPPING_COST,
    freeThreshold: null,
  },
  {
    id: "international",
    name: "International Shipping",
    description: "7-14 business days",
    cost: INTERNATIONAL_SHIPPING_COST,
    freeThreshold: null,
  },
];

// Tax rates
export const DEFAULT_TAX_RATE = 0.07; // 7% tax rate
export const TAX_EXEMPTION_CATEGORIES = ["clothing", "essentials"];

// Payment methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: "credit_card",
  PAYPAL: "paypal",
  APPLE_PAY: "apple_pay",
  GOOGLE_PAY: "google_pay",
  KLARNA: "klarna",
  AFTERPAY: "afterpay",
  GIFT_CARD: "gift_card",
};

// Credit card types and validation patterns
export const CREDIT_CARD_TYPES = {
  VISA: {
    name: "Visa",
    pattern: /^4/,
    format: /(\d{1,4})/g,
    maxLength: 19,
  },
  MASTERCARD: {
    name: "Mastercard",
    pattern: /^(5[1-5]|2[2-7])/,
    format: /(\d{1,4})/g,
    maxLength: 16,
  },
  AMEX: {
    name: "American Express",
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    maxLength: 15,
  },
  DISCOVER: {
    name: "Discover",
    pattern: /^6(?:011|5[0-9]{2})/,
    format: /(\d{1,4})/g,
    maxLength: 19,
  },
};

// Order statuses
export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  ON_HOLD: "on_hold",
  BACKORDERED: "backordered",
  COMPLETED: "completed",
  FAILED: "failed",
};

// Promo code types
export const PROMO_CODE_TYPES = {
  PERCENTAGE: "percentage",
  FIXED_AMOUNT: "fixed_amount",
  FREE_SHIPPING: "free_shipping",
  BUY_X_GET_Y: "buy_x_get_y",
  GIFT: "gift",
};

// Order confirmation
export const ORDER_EMAIL_DELAY = 5 * 60 * 1000; // 5 minutes in milliseconds
export const ORDER_NUMBER_PREFIX = "UE-";

// Address validation
export const REQUIRED_ADDRESS_FIELDS = [
  "firstName",
  "lastName",
  "addressLine1",
  "city",
  "state",
  "postalCode",
  "country",
  "phoneNumber",
];

// Default store/billing country
export const DEFAULT_COUNTRY = "US";
export const SUPPORTED_COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
];

// Product limits
export const MAX_QUANTITY_PER_ITEM = 10;
export const MIN_CHECKOUT_AMOUNT = 1.0; // Minimum order value
