"use client";

import NewsletterView from "./NewsletterView";
import { useNewsletter } from "./useNewsletter";

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
      onEmailChange={onEmailChange}
      onSubmit={onSubmit}
    />
  );
};

export default Newsletter;

Newsletter.displayName = "Newsletter";
Newsletter.View = NewsletterView;
Newsletter.useNewsletter = useNewsletter;
