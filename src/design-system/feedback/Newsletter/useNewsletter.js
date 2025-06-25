import { useState } from "react";

import { API_ENDPOINTS } from "@config/constants";

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

      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
      return { success: true, data };
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setMessage(error.message || "Sorry, there was an error. Please try again.");
      setMessageType("error");
      return { success: false, error: error.message || "Subscription failed" };
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = email && !isSubmitting;

  return {
    email,
    isSubmitting,
    message,
    messageType,
    isFormValid,
    onEmailChange: handleEmailChange,
    submitNewsletter,
  };
};
