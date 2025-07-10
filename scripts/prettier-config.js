/**
 * @fileoverview Standard Prettier configuration for consistent code formatting across the project
 * Provides centralized formatting rules used by scripts, pre-commit hooks, and development tools
 * Exports configuration as both default and named export for maximum compatibility and flexibility
 */

/**
 * Prettier configuration object with standardized formatting rules for the project
 * @type {Object}
 * @property {string} arrowParens - Include parentheses around arrow function parameters (avoid)
 * @property {boolean} bracketSameLine - Put closing bracket on same line as last element (true)
 * @property {boolean} bracketSpacing - Print spaces between brackets in object literals (true)
 * @property {string} htmlWhitespaceSensitivity - How to handle whitespace in HTML (css)
 * @property {boolean} insertPragma - Insert @format pragma at top of files (false)
 * @property {boolean} jsxSingleQuote - Use single quotes in JSX (false)
 * @property {number} printWidth - Maximum line length before wrapping (100)
 * @property {string} proseWrap - How to wrap prose text (preserve)
 * @property {string} quoteProps - When to quote object properties (as-needed)
 * @property {boolean} requirePragma - Only format files with pragma (false)
 * @property {boolean} semi - Add semicolons at statement ends (true)
 * @property {boolean} singleAttributePerLine - Force single attribute per line in HTML/JSX (false)
 * @property {boolean} singleQuote - Use single quotes instead of double quotes (false)
 * @property {number} tabWidth - Number of spaces per indentation level (2)
 * @property {string} trailingComma - Where to add trailing commas (es5)
 * @property {boolean} useTabs - Use tabs for indentation (false)
 */
export const prettierConfig = {
  arrowParens: "avoid",
  bracketSameLine: true,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxSingleQuote: false,
  printWidth: 100,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleAttributePerLine: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
};

export default prettierConfig;
