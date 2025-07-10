/**
 * @fileoverview Comprehensive ESLint configuration for professional e-commerce React/Next.js application
 * Enforces industry-standard best practices for code quality, accessibility, performance, and maintainability
 * Integrates multiple specialized plugins for React, accessibility, imports, code quality, and modern JavaScript
 * Provides tailored rule sets for different file types including special handling for test files
 * Configured for Next.js applications with path aliases, modern ECMAScript features, and production-ready standards
 */

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const nextConfig = compat.extends("next/core-web-vitals");
const eslintConfig = [
  ...nextConfig,

  // =================================================================
  // IGNORE PATTERNS FOR BUILD ARTIFACTS AND DEPENDENCIES
  // =================================================================
  {
    ignores: ["dist", "build", "node_modules", "*.min.js", "coverage", ".next"],
  },

  // =================================================================
  // BASE CONFIGURATION
  // =================================================================
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "simple-import-sort": simpleImportSort,
      "sort-destructure-keys": sortDestructureKeys,
      "no-relative-import-paths": noRelativeImportPaths,
      "jsx-a11y": jsxA11y,
      sonarjs: sonarjs,
      unicorn: unicorn,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules", "src"],
        },
        alias: {
          map: [
            ["@assets", "./src/assets"],
            ["@config", "./src/config"],
            ["@design-system", "./src/design-system"],
            ["@lib", "./src/lib"],
            ["@modules", "./src/modules"],
            ["@styles", "./src/assets/styles"],
            ["@utils", "./src/modules/core/utils"],
          ],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },

    // =================================================================
    // CORE JAVASCRIPT RULES
    // =================================================================
    rules: {
      ...js.configs.recommended.rules,
      "no-var": "error",
      "prefer-const": "error",

      // =================================================================
      // REACT RULES (Essential only)
      // =================================================================
      ...reactPlugin.configs.recommended.rules,

      // Modern JSX transform rules (React 17+)
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      "react/prop-types": "error",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-target-blank": "error",
      "react/jsx-no-undef": "error",
      "react/jsx-pascal-case": "error",
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
          ignoreCase: false,
        },
      ],
      "react/prefer-stateless-function": "error",
      "react/sort-prop-types": [
        "error",
        {
          callbacksLast: false,
          ignoreCase: false,
          requiredFirst: false,
          sortShapeProp: true,
          noSortAlphabetically: false,
        },
      ],

      // =================================================================
      // REACT HOOKS RULES
      // =================================================================
      ...reactHooks.configs.recommended.rules,

      // =================================================================
      // ACCESSIBILITY RULES
      // =================================================================
      "jsx-a11y/alt-text": "error", // Product images need alt text
      "jsx-a11y/anchor-has-content": "error", // Navigation links need content
      "jsx-a11y/anchor-is-valid": "error", // Valid links for navigation
      "jsx-a11y/aria-props": "error", // Proper ARIA usage
      "jsx-a11y/aria-proptypes": "error", // Correct ARIA types
      "jsx-a11y/aria-unsupported-elements": "error", // Valid ARIA elements
      "jsx-a11y/click-events-have-key-events": "warn", // Keyboard accessibility
      "jsx-a11y/heading-has-content": "error", // Page structure
      "jsx-a11y/img-redundant-alt": "error", // Avoid redundant alt text
      "jsx-a11y/label-has-associated-control": "error", // Form accessibility
      "jsx-a11y/no-autofocus": "warn", // Better UX
      "jsx-a11y/no-redundant-roles": "error", // Clean markup
      "jsx-a11y/role-has-required-aria-props": "error", // Complete ARIA implementation
      "jsx-a11y/role-supports-aria-props": "error", // Valid ARIA usage
      "jsx-a11y/tabindex-no-positive": "error", // Proper tab order

      // =================================================================
      // IMPORT RULES
      // =================================================================
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React, Next.js, and ALL external packages (including scoped ones)
            [
              "^react",
              "^next",
              "^(@(?!assets|config|design-system|lib|modules|styles|utils)[a-z0-9-]+/[a-z0-9-]+|[a-z0-9-]+)",
            ],
            // Internal aliases (your project-specific imports)
            [
              "^@assets",
              "^@config",
              "^@design-system",
              "^@lib",
              "^@modules",
              "^@styles",
              "^@utils",
            ],
            // Relative imports
            ["^\\."],
            // Side effect imports
            ["^\\u0000"],
            // Style and asset imports
            [
              "\\.(svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|mp3|wav)$",
              "\\.(css|scss|sass|less|styl|module.css|module.scss)$",
            ],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // Relative import paths rules
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          allowSameFolder: true,
          rootDir: "src",
          prefix: "@",
        },
      ],

      // Enable import resolution checking
      "import/no-unresolved": ["error", { caseSensitive: true }],

      // Block @/ pattern - enforce @design-system instead of @/design-system
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*"],
              message:
                "Use '@design-system', '@config', '@lib' etc. instead of '@/design-system', '@/config', '@/lib'. Remove the forward slash after @.",
            },
          ],
        },
      ],

      // =================================================================
      // REACT REFRESH RULES
      // =================================================================
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // =================================================================
      // DESTRUCTURING AND VARIABLE ORGANIZATION RULES
      // =================================================================
      "sort-destructure-keys/sort-destructure-keys": "error",
      "one-var": ["error", "never"], // Each variable on its own line
      "vars-on-top": "error", // All variables at the top of scope

      // =================================================================
      // SONARJS RULES (Code Quality)
      // =================================================================
      "sonarjs/cognitive-complexity": ["warn", 15], // Reduced threshold
      "sonarjs/no-duplicate-string": ["warn", { threshold: 5 }],
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-small-switch": "error",
      "sonarjs/prefer-immediate-return": "error",

      // =================================================================
      // UNICORN RULES (Essential Modern JavaScript)
      // =================================================================
      "unicorn/better-regex": "error",
      "unicorn/catch-error-name": "error",
      "unicorn/error-message": "error",
      "unicorn/new-for-builtins": "error",
      "unicorn/no-array-push-push": "error",
      "unicorn/no-empty-file": "error",
      "unicorn/no-instanceof-array": "error",
      "unicorn/prefer-array-find": "error",
      "unicorn/prefer-array-flat": "error",
      "unicorn/prefer-array-flat-map": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-modern-math-apis": "error",
      "unicorn/prefer-spread": "error",
      "unicorn/prefer-string-starts-ends-with": "error",

      // =================================================================
      // GENERAL CODE QUALITY RULES
      // =================================================================
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  // Special rules for test files
  {
    files: ["**/*.test.{js,jsx}", "**/*.spec.{js,jsx}", "**/test/**/*.{js,jsx}"],
    rules: {
      "sonarjs/no-duplicate-string": "off",
      "unicorn/consistent-destructuring": "off",
      "jsx-a11y/click-events-have-key-events": "off",
    },
  },
];

export default eslintConfig;
