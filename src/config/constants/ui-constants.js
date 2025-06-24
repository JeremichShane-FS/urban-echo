/**
 * @fileoverview This file contains constants related to UI elements, including themes, toast notifications, modal sizes, form input states, and button styles.
 * It serves as a centralized location for managing all UI-related constants used in the application.
 */

// Theme related
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

export const DEFAULT_THEME = THEMES.LIGHT;

// Toast notifications
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

// Modal sizes
export const MODAL_SIZES = {
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
  fullscreen: "fullscreen",
};

// Form input states
export const INPUT_STATUS = {
  DEFAULT: "default",
  FOCUS: "focus",
  ERROR: "error",
  SUCCESS: "success",
  DISABLED: "disabled",
};

// Button sizes
export const BUTTON_SIZES = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
};

// Button variants
export const BUTTON_VARIANTS = {
  primary: "primary",
  secondary: "secondary",
  accent: "accent",
  outline: "outline",
  "outline-secondary": "outline-secondary",
  ghost: "ghost",
  link: "link",
  danger: "danger",
};
