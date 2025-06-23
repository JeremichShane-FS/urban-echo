#!/usr/bin/env node

/**
 * This script formats project files according to the standard project style
 * Used for enforcing consistent formatting while allowing developers to
 * have their own preferred settings during development.
 *
 * Usage:
 *   node format-project.js [file patterns...]
 */

//If no file patterns are provided, defaults to "src/**/*.{js,jsx,ts,tsx,json,css}"

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
  // Format files using the temporary config
  console.log("ðŸ” Formatting files according to project standards...");

  for (const pattern of filePatterns) {
    console.log(`Processing pattern: ${pattern}`);
    execSync(`npx prettier --config .prettier.temp.json --write "${pattern}"`, {
      stdio: "inherit",
    });
  }

  console.log("âœ… Formatting complete!");
} catch (error) {
  console.error("âŒ Error during formatting:", error.message);
  process.exit(1);
} finally {
  // Clean up the temporary config file
  fs.unlinkSync(".prettier.temp.json");
}
