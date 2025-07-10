/**
 * @fileoverview Presentational component for newsletter subscription form layout and messaging
 * Handles responsive grid layout with email input, subscription button, and status message display
 * Provides accessibility features with proper ARIA labels and semantic form structure
 */

import PropTypes from "prop-types";

/**
 * View component for rendering newsletter subscription form with responsive layout and status messaging
 * @component
 * @param {React.ComponentType} Button - Button component for form submission
 * @param {Object} TOAST_TYPES - Toast message type constants for styling status messages
 * @param {string} buttonSize - Size variant for the subscription button
 * @param {string} buttonVariant - Style variant for the subscription button
 * @param {string} email - Current email input value
 * @param {boolean} isFormValid - Whether the form is valid and can be submitted
 * @param {boolean} isSubmitting - Whether the form is currently being submitted
 * @param {string} message - Status message to display to user
 * @param {string} messageType - Type of status message for styling
 * @param {Function} onEmailChange - Handler for email input changes
 * @param {Function} onSubmit - Handler for form submission
 * @param {Object} styles - CSS module styles object for component styling
 * @returns {JSX.Element} Rendered newsletter subscription form with status messaging
 */
const NewsletterView = ({
  Button,
  TOAST_TYPES,
  buttonSize,
  buttonVariant,
  email,
  isFormValid,
  isSubmitting,
  message,
  messageType,
  onEmailChange,
  onSubmit,
  styles,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.content} grid grid-col-1 lg:grid-cols-2 gap-10 lg:gap-30`}>
          <div className={`${styles.text} col-span-1`}>
            <h2 className={styles.title}>Newsletter</h2>
            <p className={styles.description}>
              Stay updated with our latest fashion trends, exclusive offers, and new arrivals. Join
              our community of style enthusiasts and never miss out on the latest from Urban Echo.
            </p>
          </div>

          <div className={`${styles.form} col-span-1`}>
            <form id="newsletter" className={styles.wrapper} onSubmit={onSubmit}>
              <div className={styles.group}>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  value={email}
                  placeholder="Email address"
                  className={styles.input}
                  disabled={isSubmitting}
                  aria-label="Email address for newsletter subscription"
                  autoComplete="email"
                  onChange={onEmailChange}
                />

                <Button
                  type="submit"
                  variant={buttonVariant}
                  size={buttonSize}
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
  Button: PropTypes.elementType.isRequired,
  TOAST_TYPES: PropTypes.object.isRequired,
  buttonSize: PropTypes.string.isRequired,
  buttonVariant: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isFormValid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  message: PropTypes.string,
  messageType: PropTypes.string,
  onEmailChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  styles: PropTypes.object.isRequired,
};
