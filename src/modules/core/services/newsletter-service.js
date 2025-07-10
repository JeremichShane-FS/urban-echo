/**
 * @fileoverview Newsletter API service for email subscription management and marketing automation
 * Handles email subscription and unsubscription operations with validation and consent tracking
 * Provides secure endpoints for newsletter signup, preference management, and compliance with email marketing regulations
 * Integrates with email marketing platforms for automated campaign delivery and subscriber management
 */

import { API_ENDPOINTS } from "@config/constants";

import { post } from "./http-client";

/**
 * Subscribes an email address to the newsletter with optional preferences and consent tracking
 * @async
 * @function subscribeNewsletter
 * @param {string|Object} email - Email address string or subscription object with preferences
 * @param {string} email.email - Email address for subscription (when using object format)
 * @param {string} [email.firstName] - Subscriber's first name for personalization
 * @param {string} [email.lastName] - Subscriber's last name for personalization
 * @param {Array<string>} [email.interests] - Subscriber's interests for targeted content
 * @param {boolean} [email.marketingConsent] - Explicit consent for marketing emails
 * @param {string} [email.source] - Subscription source for tracking (homepage, checkout, etc.)
 * @returns {Promise<Object>} Subscription result with confirmation status and subscriber ID
 * @returns {boolean} returns.success - Whether subscription was successful
 * @returns {string} returns.message - Confirmation or error message
 * @returns {string} returns.subscriberId - Unique subscriber identifier
 * @returns {boolean} returns.requiresConfirmation - Whether email confirmation is required
 *
 * @example
 * // Simple email subscription
 * const result = await subscribeNewsletter('user@example.com');
 * // Returns: { success: true, message: 'Subscription successful', subscriberId: '...' }
 *
 * @example
 * // Full subscription with preferences
 * const result = await subscribeNewsletter({
 *   email: 'user@example.com',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   interests: ['men', 'accessories'],
 *   marketingConsent: true,
 *   source: 'homepage'
 * });
 * // Returns subscription result with personalization data
 */
export const subscribeNewsletter = async email => {
  return post(`${API_ENDPOINTS.newsletter}/subscribe`, { email });
};

/**
 * Unsubscribes an email address from the newsletter with reason tracking and compliance
 * @async
 * @function unsubscribeNewsletter
 * @param {string|Object} email - Email address string or unsubscription object with details
 * @param {string} email.email - Email address for unsubscription (when using object format)
 * @param {string} [email.reason] - Reason for unsubscription for feedback collection
 * @param {boolean} [email.unsubscribeAll] - Whether to unsubscribe from all communications
 * @param {string} [email.token] - Unsubscription token for secure one-click unsubscribe
 * @returns {Promise<Object>} Unsubscription result with confirmation status
 * @returns {boolean} returns.success - Whether unsubscription was successful
 * @returns {string} returns.message - Confirmation message
 * @returns {boolean} returns.wasSubscribed - Whether the email was previously subscribed
 *
 * @example
 * // Simple email unsubscription
 * const result = await unsubscribeNewsletter('user@example.com');
 * // Returns: { success: true, message: 'Successfully unsubscribed', wasSubscribed: true }
 *
 * @example
 * // Unsubscription with feedback
 * const result = await unsubscribeNewsletter({
 *   email: 'user@example.com',
 *   reason: 'Too many emails',
 *   unsubscribeAll: false
 * });
 * // Returns unsubscription result with feedback tracking
 */
export const unsubscribeNewsletter = async email => {
  return post(`${API_ENDPOINTS.newsletter}/unsubscribe`, { email });
};

/**
 * Newsletter service object containing all email subscription management functions
 * @namespace newsletterService
 * @description Provides a centralized interface for all newsletter-related API operations
 */
const newsletterService = {
  subscribeNewsletter,
  unsubscribeNewsletter,
};

export default newsletterService;
