export const getCurrencySymbol = (currencyCode) => {
  switch (currencyCode?.toLowerCase()) {
    case 'usd':
      return '$';
    case 'eur':
      return '€';
    case 'uah':
    default:
      return '₴';
  }
};