/**
 * @fileoverview User interface constants for theming, notifications, modals, and component styling configurations
 * Defines comprehensive UI design system including themes, colors, toast notifications, and component variants
 * Supports dark mode, accessibility features, and consistent design patterns across the application
 */

// =================================================================
// THEME CONFIGURATION
// =================================================================

/**
 * Theme mode identifiers and default theme setting
 * @constant {Object} THEMES - Available theme mode options
 * @constant {string} DEFAULT_THEME - Default application theme
 *
 * @example
 * // Theme switcher component
 * const ThemeSwitcher = ({ currentTheme, onThemeChange }) => (
 *   <select value={currentTheme} onChange={(e) => onThemeChange(e.target.value)}>
 *     {Object.entries(THEMES).map(([key, value]) => (
 *       <option key={key} value={value}>
 *         {key.charAt(0) + key.slice(1).toLowerCase()}
 *       </option>
 *     ))}
 *   </select>
 * );
 */
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

export const DEFAULT_THEME = THEMES.LIGHT;

/**
 * Core color palette for consistent design system
 * @constant {Object} THEME_COLORS - Application color scheme
 *
 * @example
 * // Use theme colors in CSS-in-JS
 * const buttonStyles = {
 *   backgroundColor: THEME_COLORS.primary,
 *   color: THEME_COLORS.background,
 *   border: `1px solid ${THEME_COLORS.border}`
 * };
 */
export const THEME_COLORS = {
  primary: "#1a73e8", // Blue
  secondary: "#fbbc05", // Yellow
  accent: "#34a853", // Green
  background: "#ffffff", // White
  text: "#333333", // Dark Gray
  border: "#e0e0e0", // Light Gray
  error: "#ea4335", // Red
  warning: "#fbbc05", // Yellow
  info: "#4285f4", // Blue
};

// =================================================================
// TOAST NOTIFICATION CONFIGURATION
// =================================================================

/**
 * Toast notification types and timing configuration
 * @constant {Object} TOAST_TYPES - Available notification types
 * @constant {Object} TOAST_DURATION - Notification display durations
 * @constant {number} DEFAULT_TOAST_DURATION - Default notification duration
 * @constant {number} MAX_TOASTS - Maximum concurrent toast notifications
 *
 * @example
 * // Show success notification
 * const showSuccessToast = (message) => {
 *   toast.show({
 *     type: TOAST_TYPES.SUCCESS,
 *     message,
 *     duration: TOAST_DURATION.medium
 *   });
 * };
 *
 * @example
 * // Toast notification with custom duration
 * const showPersistentError = (message) => {
 *   toast.show({
 *     type: TOAST_TYPES.ERROR,
 *     message,
 *     duration: TOAST_DURATION.long,
 *     persistent: true
 *   });
 * };
 */
export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

export const TOAST_DURATION = {
  short: 3000, // 3 seconds
  medium: 5000, // 5 seconds
  long: 8000, // 8 seconds
};

export const DEFAULT_TOAST_DURATION = TOAST_DURATION.medium;
export const MAX_TOASTS = 3;

// =================================================================
// MODAL AND DIALOG CONFIGURATION
// =================================================================

/**
 * Modal size variants for responsive dialog system
 * @constant {Object} MODAL_SIZES - Available modal size options
 *
 * @example
 * // Product details modal
 * const ProductModal = ({ product, isOpen, onClose }) => (
 *   <Modal
 *     isOpen={isOpen}
 *     onClose={onClose}
 *     size={MODAL_SIZES.lg}
 *   >
 *     <ProductDetails product={product} />
 *   </Modal>
 * );
 *
 * @example
 * // Confirmation dialog
 * const DeleteConfirmation = ({ onConfirm, onCancel }) => (
 *   <Modal size={MODAL_SIZES.sm}>
 *     <h3>Confirm Deletion</h3>
 *     <p>Are you sure you want to delete this item?</p>
 *     <Button onClick={onConfirm}>Delete</Button>
 *     <Button onClick={onCancel} variant="outline">Cancel</Button>
 *   </Modal>
 * );
 */
export const MODAL_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  fullscreen: "fullscreen",
};

// =================================================================
// FORM INPUT CONFIGURATION
// =================================================================

/**
 * Form input state variants for validation and user feedback
 * @constant {Object} INPUT_STATUS - Available input state options
 *
 * @example
 * // Input component with validation states
 * const FormInput = ({ value, onChange, validation, ...props }) => {
 *   const getInputStatus = () => {
 *     if (validation.isValid) return INPUT_STATUS.SUCCESS;
 *     if (validation.hasError) return INPUT_STATUS.ERROR;
 *     return INPUT_STATUS.DEFAULT;
 *   };
 *
 *   return (
 *     <input
 *       value={value}
 *       onChange={onChange}
 *       className={`input input--${getInputStatus()}`}
 *       {...props}
 *     />
 *   );
 * };
 */
export const INPUT_STATUS = {
  DEFAULT: "default",
  FOCUS: "focus",
  ERROR: "error",
  SUCCESS: "success",
  DISABLED: "disabled",
};

// =================================================================
// BUTTON COMPONENT CONFIGURATION
// =================================================================

/**
 * Button size variants for consistent button hierarchy
 * @constant {Object} BUTTON_SIZES - Available button size options
 *
 * @example
 * // Button size usage
 * const ActionButtons = () => (
 *   <div className="button-group">
 *     <Button size={BUTTON_SIZES.lg}>Add to Cart</Button>
 *     <Button size={BUTTON_SIZES.md} variant="outline">Wishlist</Button>
 *     <Button size={BUTTON_SIZES.sm}>Quick View</Button>
 *   </div>
 * );
 */
export const BUTTON_SIZES = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

/**
 * Button style variants for different interaction patterns
 * @constant {Object} BUTTON_VARIANTS - Available button style options
 *
 * @example
 * // Button variant usage in checkout
 * const CheckoutButtons = ({ onBack, onNext, onComplete }) => (
 *   <div className="checkout-actions">
 *     <Button variant={BUTTON_VARIANTS.ghost} onClick={onBack}>
 *       Back
 *     </Button>
 *     <Button variant={BUTTON_VARIANTS.primary} onClick={onNext}>
 *       Continue
 *     </Button>
 *     <Button variant={BUTTON_VARIANTS.accent} onClick={onComplete}>
 *       Complete Order
 *     </Button>
 *   </div>
 * );
 *
 * @example
 * // Destructive action button
 * const DeleteButton = ({ onDelete }) => (
 *   <Button
 *     variant={BUTTON_VARIANTS.danger}
 *     size={BUTTON_SIZES.sm}
 *     onClick={onDelete}
 *   >
 *     Delete Item
 *   </Button>
 * );
 */
export const BUTTON_VARIANTS = {
  primary: "primary",
  secondary: "secondary",
  accent: "accent",
  outline: "outline",
  "outline-secondary": "outline-secondary",
  "outline-accent": "outline-accent",
  ghost: "ghost",
  link: "link",
  danger: "danger",
};
