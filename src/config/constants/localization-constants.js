/**
 * Localization and internationalization constants
 */

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", locale: "en-US", default: true },
  { code: "es", name: "Spanish", locale: "es-ES" },
  { code: "fr", name: "French", locale: "fr-FR" },
  { code: "de", name: "German", locale: "de-DE" },
  { code: "it", name: "Italian", locale: "it-IT" },
  { code: "ja", name: "Japanese", locale: "ja-JP" },
  { code: "zh", name: "Chinese (Simplified)", locale: "zh-CN" },
];

// Default language
export const DEFAULT_LANGUAGE = "en";
export const DEFAULT_LOCALE = "en-US";
export const FALLBACK_LANGUAGE = "en";

// Language direction
export const RTL_LANGUAGES = ["ar", "he", "fa", "ur"];

// Currency settings
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
export const CURRENCY_DISPLAY_OPTIONS = {
  USD: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  JPY: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
  EUR: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  GBP: { minimumFractionDigits: 2, maximumFractionDigits: 2 },
};

// Date and time formats
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

// Number formats
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

// Measurement units
export const MEASUREMENT_SYSTEMS = {
  IMPERIAL: "imperial",
  METRIC: "metric",
};

export const COUNTRY_MEASUREMENT_SYSTEMS = {
  US: MEASUREMENT_SYSTEMS.IMPERIAL,
  GB: MEASUREMENT_SYSTEMS.METRIC,
  CA: MEASUREMENT_SYSTEMS.METRIC,
  AU: MEASUREMENT_SYSTEMS.METRIC,
  NZ: MEASUREMENT_SYSTEMS.METRIC,
  // All other countries default to metric
};

export const DEFAULT_MEASUREMENT_SYSTEM = MEASUREMENT_SYSTEMS.METRIC;

// Size charts by region
export const SIZE_CHART_REGIONS = {
  US: "us",
  UK: "uk",
  EU: "eu",
  JP: "jp",
  INTL: "international",
};

export const DEFAULT_SIZE_CHART_REGION = SIZE_CHART_REGIONS.US;

// Translations
export const TRANSLATION_NAMESPACES = {
  COMMON: "common",
  PRODUCT: "product",
  CHECKOUT: "checkout",
  ACCOUNT: "account",
  ERROR: "error",
  LEGAL: "legal",
};

// Localization storage keys
export const LOCALE_STORAGE_KEY = "urban_echo_locale";
export const CURRENCY_STORAGE_KEY = "urban_echo_currency";
export const TIMEZONE_STORAGE_KEY = "urban_echo_timezone";

// Address format templates by country
export const ADDRESS_FORMATS = {
  US: "{firstName} {lastName}\n{addressLine1}\n{addressLine2}\n{city}, {state} {postalCode}\n{country}",
  GB: "{firstName} {lastName}\n{addressLine1}\n{addressLine2}\n{city}\n{county}\n{postalCode}\n{country}",
  FR: "{firstName} {lastName}\n{addressLine1}\n{addressLine2}\n{postalCode} {city}\n{country}",
  DE: "{firstName} {lastName}\n{addressLine1}\n{addressLine2}\n{postalCode} {city}\n{country}",
  JP: "{country}\n〒{postalCode}\n{prefecture}{city}\n{addressLine1}\n{addressLine2}\n{lastName} {firstName}",
};

// Tax format by country
export const TAX_FORMATS = {
  US: { name: "Sales Tax", included: false, rate: 0.0725 },
  CA: { name: "GST/HST", included: false, rate: 0.13 },
  GB: { name: "VAT", included: true, rate: 0.2 },
  DE: { name: "MwSt", included: true, rate: 0.19 },
  FR: { name: "TVA", included: true, rate: 0.2 },
  JP: { name: "Consumption Tax", included: true, rate: 0.1 },
};

// Phone number formats
export const PHONE_NUMBER_FORMATS = {
  US: "+1 (###) ###-####",
  GB: "+44 ## #### ####",
  FR: "+33 # ## ## ## ##",
  DE: "+49 ### #######",
  JP: "+81 ## #### ####",
};

// Region-specific features
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
