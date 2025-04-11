export const setCopyright = title => {
  const year = new Date().getFullYear();
  return `\u00A9 ${year} ${title}`;
};
