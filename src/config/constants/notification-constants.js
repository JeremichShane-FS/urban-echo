/**
 * Notification related constants
 */

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

// Notification priorities
export const NOTIFICATION_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};

// Notification display durations (ms)
export const NOTIFICATION_DURATION = {
  SHORT: 3000, // 3 seconds
  MEDIUM: 5000, // 5 seconds
  LONG: 8000, // 8 seconds
  PERSISTENT: null, // Stays until dismissed
};

// Default notification settings
export const DEFAULT_NOTIFICATION_DURATION = NOTIFICATION_DURATION.MEDIUM;
export const DEFAULT_NOTIFICATION_PRIORITY = NOTIFICATION_PRIORITIES.MEDIUM;
export const MAX_NOTIFICATIONS_DISPLAYED = 3;
export const NOTIFICATION_STACK_POSITION = "bottom-right";

// Delivery methods
export const NOTIFICATION_DELIVERY_METHODS = {
  IN_APP: "in_app",
  EMAIL: "email",
  SMS: "sms",
  PUSH: "push",
};

// User configurable notification preferences
export const DEFAULT_NOTIFICATION_PREFERENCES = {
  orderUpdates: {
    inApp: true,
    email: true,
    sms: false,
    push: true,
  },
  promotions: {
    inApp: true,
    email: true,
    sms: false,
    push: false,
  },
  productRestocks: {
    inApp: true,
    email: true,
    sms: false,
    push: false,
  },
  accountActivity: {
    inApp: true,
    email: true,
    sms: true,
    push: true,
  },
  newArrivals: {
    inApp: true,
    email: false,
    sms: false,
    push: false,
  },
  reviews: {
    inApp: true,
    email: false,
    sms: false,
    push: false,
  },
};

// Notification events
export const NOTIFICATION_EVENTS = {
  // Order related
  ORDER_PLACED: {
    type: NOTIFICATION_TYPES.SUCCESS,
    priority: NOTIFICATION_PRIORITIES.HIGH,
    deliveryMethods: [NOTIFICATION_DELIVERY_METHODS.IN_APP, NOTIFICATION_DELIVERY_METHODS.EMAIL],
    title: "Order Placed",
    template: "Your order #{orderId} has been placed successfully.",
  },
  ORDER_SHIPPED: {
    type: NOTIFICATION_TYPES.INFO,
    priority: NOTIFICATION_PRIORITIES.HIGH,
    deliveryMethods: [
      NOTIFICATION_DELIVERY_METHODS.IN_APP,
      NOTIFICATION_DELIVERY_METHODS.EMAIL,
      NOTIFICATION_DELIVERY_METHODS.SMS,
    ],
    title: "Order Shipped",
    template: "Your order #{orderId} has been shipped.",
  },
  ORDER_DELIVERED: {
    type: NOTIFICATION_TYPES.SUCCESS,
    priority: NOTIFICATION_PRIORITIES.MEDIUM,
    deliveryMethods: [NOTIFICATION_DELIVERY_METHODS.IN_APP, NOTIFICATION_DELIVERY_METHODS.EMAIL],
    title: "Order Delivered",
    template: "Your order #{orderId} has been delivered.",
  },
  ORDER_CANCELLED: {
    type: NOTIFICATION_TYPES.WARNING,
    priority: NOTIFICATION_PRIORITIES.HIGH,
    deliveryMethods: [NOTIFICATION_DELIVERY_METHODS.IN_APP, NOTIFICATION_DELIVERY_METHODS.EMAIL],
    title: "Order Cancelled",
    template: "Your order #{orderId} has been cancelled.",
  },

  // Product related
  PRODUCT_RESTOCKED: {
    type: NOTIFICATION_TYPES.INFO,
    priority: NOTIFICATION_PRIORITIES.MEDIUM,
    deliveryMethods: [NOTIFICATION_DELIVERY_METHODS.IN_APP, NOTIFICATION_DELIVERY_METHODS.EMAIL],
    title: "Product Restocked",
    template: "{productName} is back in stock!",
  },
  PRODUCT_PRICE_DROP: {
    type: NOTIFICATION_TYPES.INFO,
    priority: NOTIFICATION_PRIORITIES.MEDIUM,
    deliveryMethods: [NOTIFICATION_DELIVERY_METHODS.IN_APP, NOTIFICATION_DELIVERY_METHODS.EMAIL],
    title: "Price Drop",
    template: "Price drop alert! {productName} is now ${price}.",
  },
  WISHLIST_ITEM_SALE: {
    type: NOTIFICATION_TYPES.INFO,
    priority: NOTIFICATION_PRIORITIES.MEDIUM,
    deliveryMethods: [NOTIFICATION_DELIVERY_METHODS.IN_APP, NOTIFICATION_DELIVERY_METHODS.EMAIL],
    title: "Item on Sale",
    template: "An item in your wishlist is now on sale: {productName}",
  },

  // Account related
  ACCOUNT_CREATED: {
    type: NOTIFICATION_TYPES.SUCCESS,
    priority: NOTIFICATION_PRIORITIES.HIGH,
    deliveryMethods: [NOTIFICATION_DELIVERY_METHODS.IN_APP, NOTIFICATION_DELIVERY_METHODS.EMAIL],
    title: "Account Created",
    template: "Welcome to Urban Echo! Your account has been created successfully.",
  },
  PASSWORD_CHANGED: {
    type: NOTIFICATION_TYPES.INFO,
    priority: NOTIFICATION_PRIORITIES.HIGH,
    deliveryMethods: [
      NOTIFICATION_DELIVERY_METHODS.IN_APP,
      NOTIFICATION_DELIVERY_METHODS.EMAIL,
      NOTIFICATION_DELIVERY_METHODS.SMS,
    ],
    title: "Password Changed",
    template: "Your password has been changed successfully.",
  },
  SUSPICIOUS_LOGIN: {
    type: NOTIFICATION_TYPES.WARNING,
    priority: NOTIFICATION_PRIORITIES.URGENT,
    deliveryMethods: [
      NOTIFICATION_DELIVERY_METHODS.IN_APP,
      NOTIFICATION_DELIVERY_METHODS.EMAIL,
      NOTIFICATION_DELIVERY_METHODS.SMS,
    ],
    title: "Suspicious Login Detected",
    template:
      "We detected a login from a new location. If this wasn't you, please secure your account.",
  },

  // Promotional
  SPECIAL_OFFER: {
    type: NOTIFICATION_TYPES.INFO,
    priority: NOTIFICATION_PRIORITIES.MEDIUM,
    deliveryMethods: [NOTIFICATION_DELIVERY_METHODS.IN_APP, NOTIFICATION_DELIVERY_METHODS.EMAIL],
    title: "Special Offer",
    template: "{offerTitle}: {offerDescription}",
  },
  SALE_STARTED: {
    type: NOTIFICATION_TYPES.INFO,
    priority: NOTIFICATION_PRIORITIES.MEDIUM,
    deliveryMethods: [NOTIFICATION_DELIVERY_METHODS.IN_APP, NOTIFICATION_DELIVERY_METHODS.EMAIL],
    title: "Sale Started",
    template: "Our {saleName} is now live! Up to {discountPercentage}% off.",
  },
};

// Email template IDs
export const EMAIL_TEMPLATES = {
  ORDER_CONFIRMATION: "order-confirmation",
  SHIPPING_CONFIRMATION: "shipping-confirmation",
  DELIVERY_CONFIRMATION: "delivery-confirmation",
  PASSWORD_RESET: "password-reset",
  WELCOME: "welcome-email",
  ACCOUNT_VERIFICATION: "account-verification",
  ABANDONED_CART: "abandoned-cart",
  PROMOTIONAL: "promotional",
  PRODUCT_RESTOCK: "product-restock",
  REVIEW_REQUEST: "review-request",
};

// Push notification settings
export const PUSH_NOTIFICATION_SETTINGS = {
  vapidPublicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  serviceWorkerPath: "/service-worker.js",
  applicationServerKey: process.env.NEXT_PUBLIC_APPLICATION_SERVER_KEY,
};

// Notification scheduling
export const NOTIFICATION_SCHEDULING = {
  abandonedCartDelay: 24 * 60 * 60 * 1000, // 24 hours
  reviewRequestDelay: 7 * 24 * 60 * 60 * 1000, // 7 days after delivery
  newsletterDefaultTime: "10:00", // 10 AM local time
};
