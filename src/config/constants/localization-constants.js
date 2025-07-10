/**
 * @fileoverview Internationalization and localization constants for multi-language support and regional configurations
 * Defines supported languages, currency formats, date/time formats, and regional preferences for global e-commerce
 * Supports RTL languages, currency conversion, timezone handling, and culturally appropriate content presentation
 */

// =================================================================
// LANGUAGE CONFIGURATION
// =================================================================

/**
 * Supported application languages with locale codes and display information
 * @constant {Array<Object>} SUPPORTED_LANGUAGES - Available language configurations
 *
 * @example
 * // Generate language switcher dropdown
 * const LanguageSwitcher = () => (
 *   <select onChange={handleLanguageChange}>
 *     {SUPPORTED_LANGUAGES.map(lang => (
 *       <option key={lang.code} value={lang.code}>
 *         {lang.flag} {lang.name}
 *       </option>
 *     ))}
 *   </select>
 * );
 */
export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", locale: "en-US", flag: "🇺🇸", default: true },
  { code: "es", name: "Spanish", locale: "es-ES", flag: "🇪🇸" },
  { code: "fr", name: "French", locale: "fr-FR", flag: "🇫🇷" },
  { code: "de", name: "German", locale: "de-DE", flag: "🇩🇪" },
  { code: "it", name: "Italian", locale: "it-IT", flag: "🇮🇹" },
  { code: "ja", name: "Japanese", locale: "ja-JP", flag: "🇯🇵" },
  { code: "zh", name: "Chinese (Simplified)", locale: "zh-CN", flag: "🇨🇳" },
];

/**
 * Default language settings for application initialization
 */
export const DEFAULT_LANGUAGE = "en";
export const DEFAULT_LOCALE = "en-US";
export const FALLBACK_LANGUAGE = "en";

/**
 * Right-to-left language codes for proper text direction rendering
 * @constant {Array<string>} RTL_LANGUAGES - Languages requiring RTL text direction
 */
export const RTL_LANGUAGES = ["ar", "he", "fa", "ur"];

// =================================================================
// CURRENCY CONFIGURATION
// =================================================================

/**
 * Supported currencies with symbols and display names
 * @constant {Array<Object>} SUPPORTED_CURRENCIES - Available currency options
 *
 * @example
 * // Format price with currency
 * const formatPrice = (amount, currencyCode) => {
 *   const currency = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode);
 *   return `${currency.symbol}${amount.toFixed(2)}`;
 * };
 */
export const SUPPORTED_CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar", default: true },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
];

export const DEFAULT_CURRENCY = "USD";

/**
 * Currency-specific display formatting options
 * @constant {Object} CURRENCY_DISPLAY_OPTIONS - Decimal place configurations by currency
 */
export const CURRENCY_DISPLAY_OPTIONS = {
  USD: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  JPY: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
  EUR: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  GBP: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
};

// =================================================================
// DATE AND TIME FORMATTING
// =================================================================

/**
 * Date format patterns by locale for consistent date display
 * @constant {Object} DATE_FORMATS - Locale-specific date formatting options
 */
export const DATE_FORMATS = {
  "en-US": {
    short: "MM/DD/YYYY",
    medium: "MMM D, YYYY",
    long: "MMMM D, YYYY",
    full: "dddd, MMMM D, YYYY",
  },
  "en-GB": {
    short: "DD/MM/YYYY",
    medium: "D MMM YYYY",
    long: "D MMMM YYYY",
    full: "dddd, D MMMM YYYY",
  },
  "fr-FR": {
    short: "DD/MM/YYYY",
    medium: "D MMM YYYY",
    long: "D MMMM YYYY",
    full: "dddd D MMMM YYYY",
  },
  "de-DE": {
    short: "DD.MM.YYYY",
    medium: "D. MMM YYYY",
    long: "D. MMMM YYYY",
    full: "dddd, D. MMMM YYYY",
  },
  "ja-JP": {
    short: "YYYY/MM/DD",
    medium: "YYYY年M月D日",
    long: "YYYY年M月D日",
    full: "YYYY年M月D日dddd",
  },
};

/**
 * Time format patterns by locale for consistent time display
 * @constant {Object} TIME_FORMATS - Locale-specific time formatting options
 */
export const TIME_FORMATS = {
  "en-US": {
    short: "h:mm a",
    medium: "h:mm:ss a",
    long: "h:mm:ss a z",
  },
  "en-GB": {
    short: "HH:mm",
    medium: "HH:mm:ss",
    long: "HH:mm:ss z",
  },
  "fr-FR": {
    short: "HH:mm",
    medium: "HH:mm:ss",
    long: "HH:mm:ss z",
  },
  "de-DE": {
    short: "HH:mm",
    medium: "HH:mm:ss",
    long: "HH:mm:ss z",
  },
  "ja-JP": {
    short: "HH:mm",
    medium: "HH:mm:ss",
    long: "HH:mm:ss z",
  },
};

// =================================================================
// NUMBER FORMATTING
// =================================================================

/**
 * Number formatting configurations by locale for proper number display
 * @constant {Object} NUMBER_FORMATS - Locale-specific number formatting rules
 */
export const NUMBER_FORMATS = {
  "en-US": {
    decimal: ".",
    thousands: ",",
    grouping: [3],
  },
  "en-GB": {
    decimal: ".",
    thousands: ",",
    grouping: [3],
  },
  "fr-FR": {
    decimal: ",",
    thousands: " ",
    grouping: [3],
  },
  "de-DE": {
    decimal: ",",
    thousands: ".",
    grouping: [3],
  },
  "ja-JP": {
    decimal: ".",
    thousands: ",",
    grouping: [3],
  },
};

// =================================================================
// MEASUREMENT SYSTEMS
// =================================================================

/**
 * Available measurement system types
 * @constant {Object} MEASUREMENT_SYSTEMS - Imperial and metric system identifiers
 */
export const MEASUREMENT_SYSTEMS = {
  IMPERIAL: "imperial",
  METRIC: "metric",
};

/**
 * Country-specific measurement system preferences
 * @constant {Object} COUNTRY_MEASUREMENT_SYSTEMS - Default measurement systems by country
 */
export const COUNTRY_MEASUREMENT_SYSTEMS = {
  US: MEASUREMENT_SYSTEMS.IMPERIAL,
  GB: MEASUREMENT_SYSTEMS.METRIC,
  CA: MEASUREMENT_SYSTEMS.METRIC,
  AU: MEASUREMENT_SYSTEMS.METRIC,
  NZ: MEASUREMENT_SYSTEMS.METRIC,
  // All other countries default to metric
};

export const DEFAULT_MEASUREMENT_SYSTEM = MEASUREMENT_SYSTEMS.METRIC;

// =================================================================
// REGIONAL CONFIGURATIONS
// =================================================================

/**
 * Size chart region identifiers for clothing size standards
 * @constant {Object} SIZE_CHART_REGIONS - Available size chart regions
 */
export const SIZE_CHART_REGIONS = {
  US: "us",
  UK: "uk",
  EU: "eu",
  JP: "jp",
  INTL: "international",
};

export const DEFAULT_SIZE_CHART_REGION = SIZE_CHART_REGIONS.US;

/**
 * Translation namespace categories for organized content management
 * @constant {Object} TRANSLATION_NAMESPACES - Available translation categories
 */
export const TRANSLATION_NAMESPACES = {
  COMMON: "common",
  PRODUCT: "product",
  CHECKOUT: "checkout",
  ACCOUNT: "account",
  ERROR: "error",
  LEGAL: "legal",
};

// =================================================================
// STORAGE AND PERSISTENCE
// =================================================================

/**
 * Local storage keys for persisting user localization preferences
 */
export const LOCALE_STORAGE_KEY = "urban_echo_locale";
export const CURRENCY_STORAGE_KEY = "urban_echo_currency";
export const TIMEZONE_STORAGE_KEY = "urban_echo_timezone";

// =================================================================
// ADDRESS AND CONTACT FORMATTING
// =================================================================

/**
 * Address format templates by country for proper address display
 * @constant {Object} ADDRESS_FORMATS - Country-specific address formatting templates
 */
export const ADDRESS_FORMATS = {
  US: "{firstName} {lastName}\n{addressLine1}\n{addressLine2}\n{city}, {state} {postalCode}\n{country}",
  GB: "{firstName} {lastName}\n{addressLine1}\n{addressLine2}\n{city}\n{county}\n{postalCode}\n{country}",
  FR: "{firstName} {lastName}\n{addressLine1}\n{addressLine2}\n{postalCode} {city}\n{country}",
  DE: "{firstName} {lastName}\n{addressLine1}\n{addressLine2}\n{postalCode} {city}\n{country}",
  JP: "{country}\n〒{postalCode}\n{prefecture}{city}\n{addressLine1}\n{addressLine2}\n{lastName} {firstName}",
};

/**
 * Tax configuration by country including rates and display preferences
 * @constant {Object} TAX_FORMATS - Country-specific tax configurations
 */
export const TAX_FORMATS = {
  US: { name: "Sales Tax", included: false, rate: 0.0725 },
  CA: { name: "GST/HST", included: false, rate: 0.13 },
  GB: { name: "VAT", included: true, rate: 0.2 },
  DE: { name: "MwSt", included: true, rate: 0.19 },
  FR: { name: "TVA", included: true, rate: 0.2 },
  JP: { name: "Consumption Tax", included: true, rate: 0.1 },
};

/**
 * Phone number format patterns by country
 * @constant {Object} PHONE_NUMBER_FORMATS - Country-specific phone number formatting
 */
export const PHONE_NUMBER_FORMATS = {
  US: "+1 (###) ###-####",
  GB: "+44 ## #### ####",
  FR: "+33 # ## ## ## ##",
  DE: "+49 ### #######",
  JP: "+81 ## #### ####",
};

/**
 * Region-specific feature enablement for localized functionality
 * @constant {Object} REGION_FEATURES - Feature toggles by region
 */
export const REGION_FEATURES = {
  US: {
    enableStateSelection: true,
    enableZipLookup: true,
    showTaxSeparately: true,
  },
  CA: {
    enableStateSelection: true,
    enableZipLookup: true,
    showTaxSeparately: true,
  },
  GB: {
    enableStateSelection: false,
    enableZipLookup: true,
    showTaxSeparately: false,
  },
  EU: {
    enableStateSelection: false,
    enableZipLookup: true,
    showTaxSeparately: false,
  },
};
