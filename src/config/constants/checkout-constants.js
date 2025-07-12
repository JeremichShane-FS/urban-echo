/**
 * @fileoverview Checkout process constants including cart limits, shipping methods, payments, and order management
 * Defines comprehensive e-commerce checkout workflow configurations, pricing rules, and validation patterns
 * Supports multi-step checkout flow, payment processing, shipping calculations, and order status management
 */

// =================================================================
// CART CONFIGURATION
// =================================================================

/**
 * Shopping cart limits and storage configuration
 * @constant {number} MAX_CART_ITEMS - Maximum items allowed in cart
 * @constant {string} CART_STORAGE_KEY - Local storage key for cart persistence
 * @constant {number} CART_EXPIRY - Cart expiration time in milliseconds
 */
export const MAX_CART_ITEMS = 50;
export const CART_STORAGE_KEY = "urban_echo_cart";
export const CART_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

// =================================================================
// CHECKOUT WORKFLOW
// =================================================================

/**
 * Checkout process step identifiers for multi-step checkout flow
 * @constant {Object} CHECKOUT_STEPS - Available checkout workflow steps
 */
export const CHECKOUT_STEPS = {
  CART: "cart",
  SHIPPING: "shipping",
  PAYMENT: "payment",
  REVIEW: "review",
  CONFIRMATION: "confirmation",
};

/**
 * Ordered checkout step progression for workflow navigation
 * @constant {Array<string>} CHECKOUT_STEP_ORDER - Sequential checkout step flow
 *
 * @example
 * // Navigate to next checkout step
 * const getNextStep = (currentStep) => {
 *   const currentIndex = CHECKOUT_STEP_ORDER.indexOf(currentStep);
 *   return CHECKOUT_STEP_ORDER[currentIndex + 1] || null;
 * };
 *
 * @example
 * // Progress indicator component
 * const CheckoutProgress = ({ currentStep }) => (
 *   <div className="checkout-progress">
 *     {CHECKOUT_STEP_ORDER.map((step, index) => (
 *       <div
 *         key={step}
 *         className={`step ${step === currentStep ? 'active' : ''}`}
 *       >
 *         {step.toUpperCase()}
 *       </div>
 *     ))}
 *   </div>
 * );
 */
export const CHECKOUT_STEP_ORDER = [
  CHECKOUT_STEPS.CART,
  CHECKOUT_STEPS.SHIPPING,
  CHECKOUT_STEPS.PAYMENT,
  CHECKOUT_STEPS.REVIEW,
  CHECKOUT_STEPS.CONFIRMATION,
];

// =================================================================
// SHIPPING CONFIGURATION
// =================================================================

/**
 * Shipping cost thresholds and pricing configuration
 * @constant {number} FREE_SHIPPING_THRESHOLD - Minimum order value for free shipping
 * @constant {number} STANDARD_SHIPPING_COST - Standard shipping price
 * @constant {number} EXPRESS_SHIPPING_COST - Express shipping price
 * @constant {number} NEXT_DAY_SHIPPING_COST - Next day delivery price
 * @constant {number} INTERNATIONAL_SHIPPING_COST - International shipping price
 */
export const FREE_SHIPPING_THRESHOLD = 100;
export const STANDARD_SHIPPING_COST = 5.99;
export const EXPRESS_SHIPPING_COST = 14.99;
export const NEXT_DAY_SHIPPING_COST = 24.99;
export const INTERNATIONAL_SHIPPING_COST = 29.99;

/**
 * Available shipping methods with pricing and delivery timeframes
 * @constant {Array<Object>} SHIPPING_METHODS - Complete shipping options configuration
 *
 * @example
 * // Calculate shipping cost based on order total
 * const calculateShipping = (orderTotal, shippingMethodId) => {
 *   const method = SHIPPING_METHODS.find(m => m.id === shippingMethodId);
 *   if (!method) return 0;
 *
 *   if (method.freeThreshold && orderTotal >= method.freeThreshold) {
 *     return 0;
 *   }
 *   return method.cost;
 * };
 *
 * @example
 * // Render shipping options in checkout
 * const ShippingOptions = ({ orderTotal }) => (
 *   <div className="shipping-options">
 *     {SHIPPING_METHODS.map(method => {
 *       const cost = calculateShipping(orderTotal, method.id);
 *       return (
 *         <label key={method.id}>
 *           <input type="radio" value={method.id} />
 *           <span>{method.name} - {method.description}</span>
 *           <span>{cost === 0 ? 'FREE' : `$${cost.toFixed(2)}`}</span>
 *         </label>
 *       );
 *     })}
 *   </div>
 * );
 */
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

// =================================================================
// TAX CONFIGURATION
// =================================================================

/**
 * Tax calculation configuration and exemption rules
 * @constant {number} DEFAULT_TAX_RATE - Default tax percentage
 * @constant {Array<string>} TAX_EXEMPTION_CATEGORIES - Product categories exempt from tax
 */
export const DEFAULT_TAX_RATE = 0.07; // 7% tax rate
export const TAX_EXEMPTION_CATEGORIES = ["clothing", "essentials"];

// =================================================================
// PAYMENT CONFIGURATION
// =================================================================

/**
 * Supported payment method identifiers
 * @constant {Object} PAYMENT_METHODS - Available payment options
 */
export const PAYMENT_METHODS = {
  CREDIT_CARD: "credit_card",
  PAYPAL: "paypal",
  APPLE_PAY: "apple_pay",
  GOOGLE_PAY: "google_pay",
};

/**
 * Credit card type validation and formatting patterns
 * @constant {Object} CREDIT_CARD_TYPES - Credit card brand configurations
 *
 * @example
 * // Detect credit card type from number
 * const detectCardType = (cardNumber) => {
 *   for (const [type, config] of Object.entries(CREDIT_CARD_TYPES)) {
 *     if (config.pattern.test(cardNumber)) {
 *       return { type, ...config };
 *     }
 *   }
 *   return null;
 * };
 *
 * @example
 * // Format credit card number for display
 * const formatCardNumber = (number, cardType) => {
 *   const config = CREDIT_CARD_TYPES[cardType];
 *   return number.replace(/\s/g, '').replace(config.format, '$1 $2 $3 $4').trim();
 * };
 */
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
    pattern: /^6(?:011|5\d{2})/,
    format: /(\d{1,4})/g,
    maxLength: 19,
  },
};

// =================================================================
// ORDER MANAGEMENT
// =================================================================

/**
 * Order lifecycle status definitions for order tracking and management
 * @constant {Object} ORDER_STATUS - Available order status states
 *
 * @example
 * // Update order status workflow
 * const updateOrderStatus = (orderId, newStatus) => {
 *   const validStatuses = Object.values(ORDER_STATUS);
 *   if (!validStatuses.includes(newStatus)) {
 *     throw new Error(`Invalid order status: ${newStatus}`);
 *   }
 *   return updateOrder(orderId, { status: newStatus });
 * };
 *
 * @example
 * // Order status display component
 * const OrderStatusBadge = ({ status }) => {
 *   const statusColors = {
 *     [ORDER_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
 *     [ORDER_STATUS.PROCESSING]: 'bg-blue-100 text-blue-800',
 *     [ORDER_STATUS.SHIPPED]: 'bg-purple-100 text-purple-800',
 *     [ORDER_STATUS.DELIVERED]: 'bg-green-100 text-green-800',
 *     [ORDER_STATUS.CANCELLED]: 'bg-red-100 text-red-800'
 *   };
 *
 *   return (
 *     <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}>
 *       {status.toUpperCase()}
 *     </span>
 *   );
 * };
 */
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

// =================================================================
// PROMOTIONS AND DISCOUNTS
// =================================================================

/**
 * Promotional code type definitions for discount management
 * @constant {Object} PROMO_CODE_TYPES - Available promotion types
 */
export const PROMO_CODE_TYPES = {
  PERCENTAGE: "percentage",
  FIXED_AMOUNT: "fixed_amount",
  FREE_SHIPPING: "free_shipping",
  BUY_X_GET_Y: "buy_x_get_y",
  GIFT: "gift",
};

// =================================================================
// ORDER PROCESSING CONFIGURATION
// =================================================================

/**
 * Order confirmation and communication settings
 * @constant {number} ORDER_EMAIL_DELAY - Delay before sending confirmation email (milliseconds)
 * @constant {string} ORDER_NUMBER_PREFIX - Prefix for order number generation
 */
export const ORDER_EMAIL_DELAY = 5 * 60 * 1000; // 5 minutes in milliseconds
export const ORDER_NUMBER_PREFIX = "UE-";

// =================================================================
// ADDRESS AND SHIPPING VALIDATION
// =================================================================

/**
 * Required address fields for shipping validation
 * @constant {Array<string>} REQUIRED_ADDRESS_FIELDS - Mandatory address components
 */
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

/**
 * Geographic and regional configuration
 * @constant {string} DEFAULT_COUNTRY - Default country for shipping
 * @constant {Array<Object>} SUPPORTED_COUNTRIES - Countries available for shipping
 */
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

// =================================================================
// PRODUCT AND ORDER LIMITS
// =================================================================

/**
 * Product quantity and order value constraints
 * @constant {number} MAX_QUANTITY_PER_ITEM - Maximum quantity per product in cart
 * @constant {number} MIN_CHECKOUT_AMOUNT - Minimum order value for checkout
 */
export const MAX_QUANTITY_PER_ITEM = 10;
export const MIN_CHECKOUT_AMOUNT = 1.0; // Minimum order value
