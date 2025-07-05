/**
 * @fileoverview Authentication API service
 * Handles user authentication, registration, and profile management
 */

import { API_ENDPOINTS } from "@config/constants";

import { get, post, put } from "./http-client";

/**
 * User login
 * @param {Object} credentials - Login credentials
 * @returns {Promise<Object>} User data and token
 */
export const login = async credentials => {
  return post(`${API_ENDPOINTS.auth}/login`, credentials);
};

/**
 * User registration
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} User data and token
 */
export const register = async userData => {
  return post(`${API_ENDPOINTS.auth}/register`, userData);
};

/**
 * Get user profile
 * @returns {Promise<Object>} User profile data
 */
export const getUserProfile = async () => {
  return get(`${API_ENDPOINTS.user}/profile`);
};

/**
 * Update user profile
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} Updated user profile data
 */
export const updateUserProfile = async userData => {
  return put(`${API_ENDPOINTS.user}/profile`, userData);
};

const authService = {
  login,
  register,
  getUserProfile,
  updateUserProfile,
};

export default authService;
