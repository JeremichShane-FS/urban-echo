export const formatCurrency = (value, currency = "USD", locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};

export const formatDate = (date, options = {}) => {
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};
