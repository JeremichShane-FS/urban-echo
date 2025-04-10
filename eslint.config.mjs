import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const nextConfig = compat.extends("next/core-web-vitals");

const eslintConfig = [
  ...nextConfig,
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
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
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "react/prefer-stateless-function": "error",
      "no-var": "error",
      "prefer-const": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
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
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react",
              importNames: ["default"],
              message:
                "The 'import React from \"react\"' statement is no longer needed with modern JSX transforms. Please remove this import entirely unless you're explicitly using the React object. Correct examples: import { useState } from 'react' or import { useState, useEffect, useRef } from 'react'",
            },
          ],
          patterns: [
            {
              group: ["^react$"],
              importNames: ["default"],
              message:
                "The 'import React from \"react\"' statement is no longer needed with modern JSX transforms. Please remove this import entirely unless you're explicitly using the React object. Correct examples: import { useState } from 'react' or import { useState, useEffect, useRef } from 'react'",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Turn off ESLint's built-in import sorting
      "sort-imports": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // React and external packages
            ["^react", "^@?\\w"],
            // Aliased imports (starting with @)
            ["^@"],
            // Internal imports - everything that isn't CSS/SCSS
            ["^\\./(?!.*\\.(css|scss)$).*$", "^\\.(?!/?$)(?!.*\\.(css|scss)$).*$"],
            // CSS/SCSS imports - both .css and .scss files
            [".*\\.(css|scss)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      // Enforce alphabetical ordering of destructured properties
      "sort-destructure-keys/sort-destructure-keys": "error",
    },
  },
];

export default eslintConfig;
