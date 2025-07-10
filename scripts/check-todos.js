#!/usr/bin/env node

/**
 * @fileoverview TODO/FIX comment validation script for code quality enforcement in lint-staged integration
 * Validates that TODO and FIX comments follow project standards with proper templates and content requirements
 * Provides detailed error reporting for non-compliant comments and integrates with pre-commit hooks
 */

/**
 * TODO/FIX validation for lint-staged integration
 * Works with specific files passed as arguments
 */

import fs from "fs";
import process from "process";

/**
 * Valid template prefixes for TODO/FIX comments
 * @constant {Array<string>}
 */
const VALID_TEMPLATES = [
  "COMPONENT",
  "UI/UX",
  "ROUTES",
  "DATA",
  "SECURITY",
  "BUG",
  "PERF",
  "REFACTOR",
  "TEST",
  "DOCS",
  "DEPENDENCY",
  "ONBOARDING",
  "I18N",
  "A11Y",
  "FEATURE",
  "RESEARCH",
  "STATE",
  "CI",
  "CD",
  "WORKFLOW",
  "AUTOMATION",
  "ACTIONS",
  "DEPLOY",
  "BUILD",
];

/**
 * Validates a TODO/FIX comment against project standards
 * @param {string} line - The source code line containing the comment
 * @param {number} _lineNumber - Line number in the file (unused but kept for API consistency)
 * @param {string} _fileName - File name (unused but kept for API consistency)
 * @returns {Array<string>} Array of validation error messages, empty if valid
 */
function validateTodoComment(line, _lineNumber, _fileName) {
  const match = line.match(/\/\/\s*(TODO|FIX|FIXME|HACK|NOTE|REVIEW):\s*(.+)/);
  if (!match) return [];

  const comment = match[2].trim();
  const errors = [];

  // Check for template
  const templateMatch = comment.match(/^\[([^\]]+)]/);
  if (!templateMatch) {
    errors.push("Missing template prefix like [COMPONENT], [SECURITY], etc.");
    return errors;
  }

  const template = templateMatch[1].toUpperCase();
  const content = comment.replace(/^\[[^\]]+]\s*/, "");

  // Validate template
  if (!VALID_TEMPLATES.includes(template)) {
    errors.push(
      `Invalid template [${template}]. Valid: ${VALID_TEMPLATES.slice(0, 5).join(", ")}, ...`
    );
  }

  // Check content length
  if (content.length < 10) {
    errors.push(`Content too short (${content.length} chars, need 10+): "${content}"`);
  }

  // Check for multiple templates
  if ((comment.match(/\[[^\]]*]/g) || []).length > 1) {
    errors.push("Multiple templates not allowed");
  }

  // Check for special characters (avoid regex parsing issues)
  const specialChars = ["$", "`", "&", "|", ">", "<", ";"];
  const foundSpecialChar = specialChars.find(char => comment.includes(char));
  if (foundSpecialChar) {
    errors.push("Special characters not allowed: $ ` & | > < ;");
  }

  // Check for non-English characters (safe regex)
  const nonEnglishPattern = /[^\s\u0020-\u007E]/;
  if (nonEnglishPattern.test(comment)) {
    errors.push("Use English characters only");
  }

  return errors;
}

/**
 * Checks a single file for TODO/FIX comment compliance
 * @param {string} filePath - Path to the file to check
 * @returns {boolean} True if all comments are valid, false if any errors found
 */
function checkFile(filePath) {
  if (!fs.existsSync(filePath)) return true;

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  let hasErrors = false;

  lines.forEach((line, index) => {
    if (/\/\/\s*(TODO|FIX):/.test(line)) {
      const errors = validateTodoComment(line, index + 1, filePath);
      if (errors.length > 0) {
        console.error(`\n❌ ${filePath}:${index + 1}`);
        console.error(`   ${line.trim()}`);
        errors.forEach(error => console.error(`   → ${error}`));
        hasErrors = true;
      }
    }
  });

  return !hasErrors;
}

/**
 * Main function that orchestrates the TODO/FIX comment validation process
 * Processes command-line arguments and validates specified files
 */
function main() {
  const files = process.argv.slice(2);

  if (files.length === 0) {
    console.log("✅ No files to check for TODO/FIX comments");
    return;
  }

  console.log(`🔍 Checking ${files.length} file(s) for TODO/FIX comments...`);

  let allValid = true;

  for (const file of files) {
    if (!checkFile(file)) {
      allValid = false;
    }
  }

  if (!allValid) {
    console.error("\n💥 Fix TODO/FIX comments above");
    console.log("\n📖 Valid format: TODO: [COMPONENT] Description with 10+ characters");
    process.exit(1);
  }

  console.log("✅ All TODO/FIX comments are valid");
}

main();
