import PropTypes from "prop-types";

import { BUTTON_SIZES, BUTTON_VARIANTS, TOAST_TYPES } from "@config/constants/ui-constants";
import Button from "@design-system/buttons/Button";

import styles from "./Newsletter.module.scss";

const NewsletterView = ({
  email,
  isFormValid,
  isSubmitting,
  message,
  messageType,
  onEmailChange,
  onSubmit,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.text}>
            <h2 className={styles.title}>Newsletter</h2>
            <p className={styles.description}>
              Stay updated with our latest fashion trends, exclusive offers, and new arrivals. Join
              our community of style enthusiasts and never miss out on the latest from Urban Echo.
            </p>
          </div>

          <div className={styles.form}>
            <form className={styles.wrapper} onSubmit={onSubmit}>
              <div className={styles.group}>
                <input
                  type="email"
                  value={email}
                  placeholder="Email address"
                  className={styles.input}
                  disabled={isSubmitting}
                  aria-label="Email address for newsletter subscription"
                  onChange={onEmailChange}
                />

                <Button
                  type="submit"
                  variant={BUTTON_VARIANTS.primary}
                  size={BUTTON_SIZES.md}
                  disabled={!isFormValid}
                  className={styles.button}
                  aria-label="Subscribe to newsletter">
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>

              {message && (
                <div
                  className={`${styles.message} ${
                    messageType === TOAST_TYPES.SUCCESS
                      ? styles["message--success"]
                      : messageType === TOAST_TYPES.ERROR
                        ? styles["message--error"]
                        : messageType === TOAST_TYPES.WARNING
                          ? styles["message--warning"]
                          : styles["message--info"]
                  }`}
                  role={messageType === TOAST_TYPES.ERROR ? "alert" : "status"}
                  aria-live="polite">
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterView;

NewsletterView.displayName = "NewsletterView";
NewsletterView.propTypes = {
  email: PropTypes.string.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  message: PropTypes.string,
  messageType: PropTypes.oneOf(Object.values(TOAST_TYPES)),
  onEmailChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
