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
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Newsletter</h2>
            <p className={styles.description}>
              Stay updated with our latest fashion trends, exclusive offers, and new arrivals. Join
              our community of style enthusiasts and never miss out on the latest from Urban Echo.
            </p>
          </div>

          <div className={styles.formContainer}>
            <form onSubmit={onSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="email"
                  value={email}
                  onChange={onEmailChange}
                  placeholder="Email address"
                  className={styles.emailInput}
                  disabled={isSubmitting}
                  aria-label="Email address for newsletter subscription"
                />
                <button
                  type="submit"
                  className={styles.subscribeButton}
                  disabled={!isFormValid}
                  aria-label="Subscribe to newsletter">
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </div>

              {message && (
                <div
                  className={`${styles.message} ${styles[messageType]}`}
                  role={messageType === "error" ? "alert" : "status"}
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
