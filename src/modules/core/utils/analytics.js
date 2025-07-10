/**
 * @fileoverview Google Analytics 4 (GA4) integration utilities for comprehensive user behavior tracking
 * Provides functions for tracking events, page views, and user interactions with proper data formatting
 * Includes e-commerce tracking capabilities, conversion tracking, and user engagement metrics
 * Handles both simple event tracking and complex data object tracking for detailed analytics insights
 */

/**
 * Track user interactions with Google Analytics 4 (GA4) with flexible data support
 * @function trackEvent
 * @param {string} action - The action being tracked (e.g., 'click', 'view', 'purchase', 'search')
 * @param {string} category - The category of the event (e.g., 'navigation', 'product', 'user_engagement')
 * @param {string} label - The label for the event providing additional context (e.g., 'header_logo', 'product_123')
 * @param {number|Object} [valueOrData] - Optional numeric value OR additional data object for detailed tracking
 * @param {number} [valueOrData.value] - Numeric value for the event (when using object format)
 * @param {string} [valueOrData.currency] - Currency code for monetary values
 * @param {string} [valueOrData.user_id] - User identifier for cross-session tracking
 * @param {Object} [valueOrData.custom_parameters] - Additional custom parameters for event
 * @returns {void}
 *
 * @example
 * // Simple event tracking
 * trackEvent('click', 'navigation', 'header_logo');
 *
 * @example
 * // Event with numeric value
 * trackEvent('purchase', 'ecommerce', 'product_purchase', 99.99);
 *
 * @example
 * // Event with detailed data object
 * trackEvent('add_to_cart', 'ecommerce', 'product_123', {
 *   value: 49.99,
 *   currency: 'USD',
 *   item_id: 'PROD_123',
 *   item_name: 'Blue Cotton T-Shirt',
 *   item_category: 'Clothing',
 *   quantity: 2
 * });
 */
export const trackEvent = (action, category, label, valueOrData = undefined) => {
  if (typeof window !== "undefined" && window.gtag) {
    const baseEvent = {
      event_category: category,
      event_label: label,
    };

    if (valueOrData !== undefined) {
      if (typeof valueOrData === "number") {
        baseEvent.value = valueOrData;
      } else if (typeof valueOrData === "object") {
        Object.assign(baseEvent, valueOrData);
      }
    }

    window.gtag("event", action, baseEvent);
  }
};

/**
 * Track click events specifically with predefined action type for consistent click tracking
 * @function trackClick
 * @param {string} category - The category of the click (e.g., 'button', 'link', 'product_card')
 * @param {string} label - The label for the click providing context (e.g., 'cta_button', 'product_image')
 * @returns {void}
 *
 * @example
 * trackClick('button', 'add_to_cart_cta');
 * // Tracks a click on the "Add to Cart" call-to-action button
 *
 * @example
 * trackClick('navigation', 'footer_contact_link');
 * // Tracks a click on the contact link in the footer
 */
export const trackClick = (category, label) => {
  trackEvent("click", category, label);
};

/**
 * Track page views for Single Page Applications (SPA) with proper GA4 configuration
 * @function trackPageView
 * @param {string} page - The page path being viewed (e.g., '/products', '/checkout', '/about')
 * @returns {void}
 *
 * @description
 * This function is essential for SPAs where page navigation doesn't trigger automatic pageviews.
 * It sends a page_view event to GA4 with the specified page path, enabling proper funnel
 * tracking and user journey analysis.
 *
 * @example
 * trackPageView('/products/mens-shirts');
 * // Tracks a page view for the men's shirts product category page
 *
 * @example
 * trackPageView('/checkout/payment');
 * // Tracks a page view for the payment step in checkout funnel
 */
export const trackPageView = page => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: page,
    });
  }
};
