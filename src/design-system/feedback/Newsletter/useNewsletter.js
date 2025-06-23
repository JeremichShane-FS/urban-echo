import { useState } from "react";

export const useNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const handleEmailChange = e => {
    setEmail(e.target.value);
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      setMessageType("error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      // TODO: [ROUTES] Newsletter subscription API with email marketing integration (Version 2 for post-MVP) (Updated)
      // Replace mock with backend API endpoint: POST /api/newsletter/subscribe
      // Version 2 Backend requirements:
      // - Email validation and duplicate prevention
      // - Integration with email marketing service (Mailchimp, SendGrid, ConvertKit)
      // - GDPR compliance with consent tracking and unsubscribe links
      // - Subscriber segmentation for targeted campaigns
      // - Double opt-in confirmation email workflow
      // - Analytics tracking for conversion rates and email engagement
      // - Rate limiting to prevent spam subscriptions

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Track analytics event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "newsletter_signup", {
          event_category: "Newsletter",
          event_label: "Email Subscription",
        });
      }

      setMessage("Thank you for subscribing to our newsletter!");
      setMessageType("success");
      setEmail("");

      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 5000);
    } catch (err) {
      console.error("Newsletter subscription error:", err);
      setMessage("Sorry, there was an error. Please try again.");
      setMessageType("error");
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
    onSubmit: handleSubmit,
  };
};
