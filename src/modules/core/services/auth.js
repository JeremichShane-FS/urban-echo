/**
 * @fileoverview Authentication API service for user management and security operations
 * Handles user authentication, registration, profile management, and session control
 * Provides secure API endpoints for login, registration, and profile operations with proper error handling
 * Integrates with JWT tokens and Auth0 for comprehensive authentication and authorization
 */

import { API_ENDPOINTS } from "@config/constants";

import { get, post, put } from "./http-client";

/**
 * Authenticates user with email and password credentials
 * @async
 * @function login
 * @param {Object} credentials - User login credentials
 * @param {string} credentials.email - User's email address
 * @param {string} credentials.password - User's password
 * @param {boolean} [credentials.rememberMe] - Whether to maintain long-term session
 * @returns {Promise<Object>} Authentication response with user data and access token
 * @returns {Object} returns.user - User profile information
 * @returns {string} returns.token - JWT access token for API authentication
 * @returns {string} returns.refreshToken - Refresh token for token renewal
 *
 * @example
 * const authResult = await login({
 *   email: 'user@example.com',
 *   password: 'securePassword123',
 *   rememberMe: true
 * });
 * // Returns: { user: {...}, token: 'jwt...', refreshToken: 'refresh...' }
 */
export const login = async credentials => {
  return post(`${API_ENDPOINTS.auth}/login`, credentials);
};

/**
 * Registers new user account with required profile information
 * @async
 * @function register
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User's email address (required, unique)
 * @param {string} userData.password - User's password (required, min 8 characters)
 * @param {string} userData.firstName - User's first name (required)
 * @param {string} userData.lastName - User's last name (required)
 * @param {string} [userData.phone] - User's phone number (optional)
 * @param {boolean} [userData.marketingConsent] - Marketing email consent (optional)
 * @returns {Promise<Object>} Registration response with user data and access token
 * @returns {Object} returns.user - Created user profile information
 * @returns {string} returns.token - JWT access token for immediate authentication
 *
 * @example
 * const newUser = await register({
 *   email: 'newuser@example.com',
 *   password: 'securePassword123',
 *   firstName: 'John',
 *   lastName: 'Doe',
 *   marketingConsent: true
 * });
 * // Returns: { user: {...}, token: 'jwt...' }
 */
export const register = async userData => {
  return post(`${API_ENDPOINTS.auth}/register`, userData);
};

/**
 * Retrieves current user's profile information using authentication token
 * @async
 * @function getUserProfile
 * @returns {Promise<Object>} User profile data with complete user information
 * @returns {string} returns.id - User's unique identifier
 * @returns {string} returns.email - User's email address
 * @returns {string} returns.firstName - User's first name
 * @returns {string} returns.lastName - User's last name
 * @returns {Array} returns.addresses - User's saved addresses
 * @returns {Array} returns.wishlist - User's wishlist items
 * @returns {Object} returns.preferences - User's account preferences
 *
 * @example
 * const profile = await getUserProfile();
 * // Returns complete user profile with addresses, wishlist, and preferences
 */
export const getUserProfile = async () => {
  return get(`${API_ENDPOINTS.user}/profile`);
};

/**
 * Updates user profile information with partial or complete data
 * @async
 * @function updateUserProfile
 * @param {Object} userData - Updated user profile data (partial updates supported)
 * @param {string} [userData.firstName] - Updated first name
 * @param {string} [userData.lastName] - Updated last name
 * @param {string} [userData.phone] - Updated phone number
 * @param {string} [userData.dateOfBirth] - Updated date of birth
 * @param {Object} [userData.preferences] - Updated user preferences
 * @param {Array} [userData.addresses] - Updated address list
 * @returns {Promise<Object>} Updated user profile data with all current information
 *
 * @example
 * const updatedProfile = await updateUserProfile({
 *   firstName: 'Jane',
 *   phone: '+1-555-0123',
 *   preferences: { notifications: true, currency: 'USD' }
 * });
 * // Returns updated profile with new information
 */
export const updateUserProfile = async userData => {
  return put(`${API_ENDPOINTS.user}/profile`, userData);
};

/**
 * Authentication service object containing all authentication and user management functions
 * @namespace authService
 * @description Provides a centralized interface for all authentication-related API operations
 */
const authService = {
  login,
  register,
  getUserProfile,
  updateUserProfile,
};

export default authService;
