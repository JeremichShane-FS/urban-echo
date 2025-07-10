/**
 * @fileoverview Newsletter subscription component for email collection and marketing engagement
 * Provides email validation, submission handling, and user feedback for newsletter signups
 * Integrates with backend API for subscription management and analytics tracking for conversion metrics
 */

"use client";
import { BUTTON_SIZES, BUTTON_VARIANTS, TOAST_TYPES } from "@config/constants";
import { Button } from "@design-system/buttons";

import NewsletterView from "./NewsletterView";
import useNewsletter from "./useNewsletter";

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
      Button={Button}
      TOAST_TYPES={TOAST_TYPES}
      buttonSize={BUTTON_SIZES.md}
      buttonVariant={BUTTON_VARIANTS.primary}
      email={email}
      isFormValid={isFormValid}
      isSubmitting={isSubmitting}
      message={message}
      messageType={messageType}
      styles={styles}
      onEmailChange={onEmailChange}
      onSubmit={onSubmit}
    />
  );
};

export default Newsletter;

Newsletter.displayName = "Newsletter";
Newsletter.View = NewsletterView;
Newsletter.useNewsletter = useNewsletter;
