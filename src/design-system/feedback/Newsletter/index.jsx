"use client";
import { BUTTON_SIZES, BUTTON_VARIANTS, TOAST_TYPES } from "@config/constants";
import Button from "@design-system/buttons/Button";

import NewsletterView from "./NewsletterView";
import { useNewsletter } from "./useNewsletter";

import styles from "./Newsletter.module.scss";

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
