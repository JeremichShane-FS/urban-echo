#!/usr/bin/env node

/**
 * @fileoverview Formatting verification script for CI/CD pipeline integration and code quality enforcement
 * Validates that source files conform to project's Prettier formatting standards without modifying files
 * Provides detailed feedback on formatting compliance and guidance for resolving formatting issues
 */

/**
 * This script checks if files match the project's standard formatting
 * Used by CI pipelines to verify formatting without changing files
 */

import { execSync } from "child_process";
import fs from "fs";
import process from "process";

import { prettierConfig } from "./prettier-config.js";

// Get file patterns from command line arguments or use default
const filePatterns =
  process.argv.slice(2).length > 0 ? process.argv.slice(2) : ["src/**/*.{js,jsx,ts,tsx,json,css}"];

// Create a temporary config file
fs.writeFileSync(".prettier.temp.json", JSON.stringify(prettierConfig, null, 2));

try {
  // Check files using the temporary config
  console.log("🔍 Checking files against project formatting standards...");

  for (const pattern of filePatterns) {
    console.log(`Checking pattern: ${pattern}`);
    execSync(`npx prettier --config .prettier.temp.json --check "${pattern}"`, {
      stdio: "inherit",
    });
  }

  console.log("✅ All files match the project's formatting standards.");
} catch {
  console.error("❌ Some files do not match the project's formatting standards.");
  console.error('   Run "npm run format" to fix formatting issues.');
  process.exit(1);
} finally {
  // Clean up the temporary config file
  fs.unlinkSync(".prettier.temp.json");
}
