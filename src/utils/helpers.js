export const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

export const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

export const getDiscount = (price, originalPrice) =>
  originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

export const clsx = (...classes) => classes.filter(Boolean).join(" ");
