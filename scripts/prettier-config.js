/**
 * Standard project Prettier configuration
 * This is used by formatting scripts and pre-commit hooks
 * Export as both default and named export for flexibility
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
