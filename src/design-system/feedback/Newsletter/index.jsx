/**
 * @fileoverview Newsletter subscription component for email collection and marketing engagement
 * Provides email validation, submission handling, and user feedback for newsletter signups
 * Integrates with backend API for subscription management and analytics tracking for conversion metrics
 */

"use client";
import { BUTTON_SIZES, BUTTON_VARIANTS, TOAST_TYPES } from "@config/constants";
import Button from "@design-system/buttons/Button";

import NewsletterView from "./NewsletterView";
import { useNewsletter } from "./useNewsletter";

import styles from "./Newsletter.module.scss";

/**
 * Container component for newsletter subscription with form state management and API integration
 * @component
 * @returns {JSX.Element} Rendered newsletter subscription section with form validation and feedback
 */
const Newsletter = () => {
  const { email, isFormValid, isSubmitting, message, messageType, onEmailChange, onSubmit } =
    useNewsletter();

  return (
    <NewsletterView
      email={email}
      isSubmitting={isSubmitting}
      message={message}
      messageType={messageType}
      isFormValid={isFormValid}
      styles={styles}
      buttonVariant={BUTTON_VARIANTS.primary}
      buttonSize={BUTTON_SIZES.md}
      Button={Button}
      TOAST_TYPES={TOAST_TYPES}
      onEmailChange={onEmailChange}
      onSubmit={onSubmit}
    />
  );
};

export default Newsletter;

Newsletter.displayName = "Newsletter";
Newsletter.View = NewsletterView;
Newsletter.useNewsletter = useNewsletter;
