/**
 * @fileoverview Notification system constants for multi-channel messaging, user preferences, and delivery management
 * Defines comprehensive notification types, delivery methods, event templates, and scheduling configurations
 * Supports in-app notifications, email campaigns, SMS alerts, and push notifications with user preference controls
 */

// =================================================================
// NOTIFICATION TYPE AND PRIORITY SYSTEM
// =================================================================

/**
 * Notification classification and priority levels for proper handling and display
 * @constant {Object} NOTIFICATION_TYPES - Available notification type categories
 * @constant {Object} NOTIFICATION_PRIORITIES - Notification urgency levels
 */
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const NOTIFICATION_PRIORITIES = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};

// =================================================================
// DISPLAY AND TIMING CONFIGURATION
// =================================================================

/**
 * Notification display duration and UI configuration settings
 * @constant {Object} NOTIFICATION_DURATION - Display durations for different notification types
 * @constant {number} DEFAULT_NOTIFICATION_DURATION - Default notification display time
 * @constant {string} DEFAULT_NOTIFICATION_PRIORITY - Default notification priority level
 * @constant {number} MAX_NOTIFICATIONS_DISPLAYED - Maximum concurrent notifications
 * @constant {string} NOTIFICATION_STACK_POSITION - Screen position for notification stack
 *
 * @example
 * // Show notification with custom duration
 * const showNotification = (type, message, options = {}) => {
 *   const duration = options.duration || NOTIFICATION_DURATION.MEDIUM;
 *   const priority = options.priority || DEFAULT_NOTIFICATION_PRIORITY;
 *
 *   notificationService.show({
 *     type,
 *     message,
 *     duration,
 *     priority,
 *     position: NOTIFICATION_STACK_POSITION
 *   });
 * };
 */
export const NOTIFICATION_DURATION = {
  SHORT: 3000, // 3 seconds
  MEDIUM: 5000, // 5 seconds
  LONG: 8000, // 8 seconds
  PERSISTENT: null, // Stays until dismissed
};

export const DEFAULT_NOTIFICATION_DURATION = NOTIFICATION_DURATION.MEDIUM;
export const DEFAULT_NOTIFICATION_PRIORITY = NOTIFICATION_PRIORITIES.MEDIUM;
export const MAX_NOTIFICATIONS_DISPLAYED = 3;
export const NOTIFICATION_STACK_POSITION = "bottom-right";

// =================================================================
// DELIVERY METHODS AND USER PREFERENCES
// =================================================================

/**
 * Available notification delivery channels for multi-platform messaging
 * @constant {Object} NOTIFICATION_DELIVERY_METHODS - Supported delivery channels
 */
export const NOTIFICATION_DELIVERY_METHODS = {
  IN_APP: "in_app",
  EMAIL: "email",
  SMS: "sms",
  PUSH: "push",
};

/**
 * Default user notification preferences by category and delivery method
 * @constant {Object} DEFAULT_NOTIFICATION_PREFERENCES - User preference defaults
 *
 * @example
 * // Apply user preferences to notification sending
 * const shouldSendNotification = (userId, notificationType, deliveryMethod) => {
 *   const userPrefs = getUserNotificationPreferences(userId);
 *   const defaults = DEFAULT_NOTIFICATION_PREFERENCES[notificationType];
 *   const prefs = { ...defaults, ...userPrefs[notificationType] };
 *   return prefs[deliveryMethod] === true;
 * };
 *
 * @example
 * // Notification preferences UI component
 * const NotificationPreferences = ({ preferences, onUpdate }) => (
 *   <form>
 *     {Object.entries(DEFAULT_NOTIFICATION_PREFERENCES).map(([category, methods]) => (
 *       <div key={category} className="preference-category">
 *         <h3>{category.replace(/([A-Z])/g, ' $1').trim()}</h3>
 *         {Object.entries(methods).map(([method, defaultValue]) => (
 *           <label key={method}>
 *             <input
 *               type="checkbox"
 *               checked={preferences[category]?.[method] ?? defaultValue}
 *               onChange={(e) => onUpdate(category, method, e.target.checked)}
 *             />
 *             {method.replace(/([A-Z])/g, ' $1').trim()}
 *           </label>
 *         ))}
 *       </div>
 *     ))}
 *   </form>
 * );
 */
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

// =================================================================
// NOTIFICATION EVENT TEMPLATES
// =================================================================

/**
 * Predefined notification event configurations with templates and delivery settings
 * @constant {Object} NOTIFICATION_EVENTS - Event-specific notification configurations
 *
 * @example
 * // Send order confirmation notification
 * const sendOrderConfirmation = async (orderId, userId) => {
 *   const event = NOTIFICATION_EVENTS.ORDER_PLACED;
 *   const message = event.template.replace('{orderId}', orderId);
 *
 *   await notificationService.send({
 *     userId,
 *     type: event.type,
 *     priority: event.priority,
 *     title: event.title,
 *     message,
 *     deliveryMethods: event.deliveryMethods
 *   });
 * };
 *
 * @example
 * // Product restock notification
 * const notifyProductRestock = async (productId, productName) => {
 *   const event = NOTIFICATION_EVENTS.PRODUCT_RESTOCKED;
 *   const message = event.template.replace('{productName}', productName);
 *
 *   const interestedUsers = await getInterestedUsers(productId);
 *
 *   for (const user of interestedUsers) {
 *     if (shouldSendNotification(user.id, 'productRestocks', 'email')) {
 *       await emailService.send({
 *         to: user.email,
 *         subject: event.title,
 *         message
 *       });
 *     }
 *   }
 * };
 */
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

// =================================================================
// EMAIL AND PUSH NOTIFICATION CONFIGURATION
// =================================================================

/**
 * Email template identifiers for consistent messaging across campaigns
 * @constant {Object} EMAIL_TEMPLATES - Available email template IDs
 */
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

/**
 * Push notification service configuration for web push functionality
 * @constant {Object} PUSH_NOTIFICATION_SETTINGS - Push notification service settings
 */
export const PUSH_NOTIFICATION_SETTINGS = {
  vapidPublicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  serviceWorkerPath: "/service-worker.js",
  applicationServerKey: process.env.NEXT_PUBLIC_APPLICATION_SERVER_KEY,
};

// =================================================================
// NOTIFICATION SCHEDULING
// =================================================================

/**
 * Automated notification scheduling and timing configuration
 * @constant {Object} NOTIFICATION_SCHEDULING - Scheduling settings for automated notifications
 *
 * @example
 * // Schedule abandoned cart reminder
 * const scheduleAbandonedCartReminder = (cartId, userEmail) => {
 *   const delay = NOTIFICATION_SCHEDULING.abandonedCartDelay;
 *
 *   setTimeout(() => {
 *     emailService.send({
 *       to: userEmail,
 *       template: EMAIL_TEMPLATES.ABANDONED_CART,
 *       data: { cartId }
 *     });
 *   }, delay);
 * };
 */
export const NOTIFICATION_SCHEDULING = {
  abandonedCartDelay: 24 * 60 * 60 * 1000, // 24 hours
  reviewRequestDelay: 7 * 24 * 60 * 60 * 1000, // 7 days after delivery
  newsletterDefaultTime: "10:00", // 10 AM local time
};
