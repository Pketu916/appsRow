// Currency utility functions
export const currencies = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
];

export const getCurrencySymbol = (currencyCode) => {
  const currency = currencies.find((c) => c.code === currencyCode);
  return currency ? currency.symbol : "₹";
};

export const formatPrice = (price, currencyCode = "INR") => {
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${price.toLocaleString()}`;
};

export const formatPriceWithCurrency = (price, currencyCode = "INR") => {
  const currency = currencies.find((c) => c.code === currencyCode);
  const symbol = currency ? currency.symbol : "₹";
  return `${symbol}${price.toLocaleString()}`;
};
