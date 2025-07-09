/**
 * @fileoverview Custom hook for managing newsletter subscription form state and API interactions
 * Provides email validation, submission handling, analytics tracking, and user feedback management
 * Encapsulates all newsletter signup logic including error handling and success messaging
 */

import { useState } from "react";

import { API_ENDPOINTS } from "@config/constants";
import { trackEvent } from "@modules/core/utils";

/**
 * Hook for handling newsletter subscription form state and submission logic
 * @hook
 * @returns {Object} Newsletter form state and handler functions
 * @returns {string} returns.email - Current email input value
 * @returns {boolean} returns.isSubmitting - Whether form is currently being submitted
 * @returns {string} returns.message - Status message for user feedback
 * @returns {string} returns.messageType - Type of message (success, error, etc.)
 * @returns {boolean} returns.isFormValid - Whether form is valid and can be submitted
 * @returns {Function} returns.onEmailChange - Handler for email input changes
 * @returns {Function} returns.onSubmit - Handler for form submission
 * @returns {Function} returns.submitNewsletter - Direct submission function for programmatic use
 */
export const useNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleEmailChange = e => {
    setEmail(e.target.value);
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const submitNewsletter = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      setMessageType("error");
      return { success: false, error: "Email is required" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return { success: false, error: "Invalid email format" };
    }

    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(`/api/${API_ENDPOINTS.newsletter}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setMessage("Thank you for subscribing to our newsletter!");
      setMessageType("success");
      setEmail("");

      // Tracks successful newsletter signup
      trackEvent("newsletter_signup", "Newsletter", "Email Subscription");

      // Clears success message after 5 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);

      return { success: true, data };
    } catch (error) {
      console.error("Newsletter subscription error:", error.message);
      setMessage(error.message || "Sorry, there was an error. Please try again.");
      setMessageType("error");
      return { success: false, error: error.message || "Subscription failed" };
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await submitNewsletter();
  };

  const isFormValid = email && !isSubmitting;

  return {
    email,
    isSubmitting,
    message,
    messageType,
    isFormValid,
    onEmailChange: handleEmailChange,
    onSubmit: handleSubmit,
    submitNewsletter,
  };
};
