/**
 * @fileoverview Main API services entry point
 * Provides both individual service exports and combined service for backward compatibility
 * src/modules/core/services/index.js
 */

import authService from "./auth-service";
import categoryService from "./category-service";
import contentService from "./content-service";
import newsletterService from "./newsletter-service";
import productService from "./product-service";

export { authService, categoryService, contentService, newsletterService, productService };

export { del as delete, get, post, put } from "./http-client";
