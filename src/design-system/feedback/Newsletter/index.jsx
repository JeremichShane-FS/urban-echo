"use client";

import NewsletterView from "./NewsletterView";
import { useNewsletter } from "./useNewsletter";

const Newsletter = () => {
  const newsletterProps = useNewsletter();

  return <NewsletterView {...newsletterProps} />;
};

export default Newsletter;
