export const renderStars = (rating, styles) => {
  if (!rating) return null;
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.floor(rating) ? styles["star-filled"] : styles["star-empty"]}>
      ★
    </span>
  ));
};
