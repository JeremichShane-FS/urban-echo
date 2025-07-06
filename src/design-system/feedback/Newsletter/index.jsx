"use client";

import NewsletterView from "./NewsletterView";
import { useNewsletter } from "./useNewsletter";

const Newsletter = () => {
  const {
    email,
    isFormValid,
    isSubmitting,
    message,
    messageType,
    onEmailChange,
    submitNewsletter,
  } = useNewsletter();

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await submitNewsletter();
    if (result?.success && typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "newsletter_signup", {
        event_category: "Newsletter",
        event_label: "Email Subscription",
      });
    }
  };

  return (
    <NewsletterView
      email={email}
      isSubmitting={isSubmitting}
      message={message}
      messageType={messageType}
      isFormValid={isFormValid}
      onEmailChange={onEmailChange}
      onSubmit={handleSubmit}
    />
  );
};

export default Newsletter;
