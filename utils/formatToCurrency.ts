export const formatToCurrency = (
  amount: number,
  locale: string = 'en-US',
  currency: string = 'PHP',
): string => {
  let formattedAmount: string;
  let suffix: string = '';

  if (amount >= 1_000_000_000) {
    formattedAmount = Math.floor(amount / 1_000_000_000).toString();
    suffix = 'B';
  } else if (amount >= 1_000_000) {
    formattedAmount = Math.floor(amount / 1_000_000).toString();
    suffix = 'M';
  } else if (amount >= 1_000) {
    formattedAmount = Math.floor(amount / 1_000).toString();
    suffix = 'k';
  } else {
    formattedAmount = Math.floor(amount).toString();
  }

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Format a small number to get just the currency symbol
  const formattedCurrency = currencyFormatter.format(0);
  const currencySymbol = formattedCurrency.replace(/[0-9.,\s]/g, '');

  return `${currencySymbol}${formattedAmount}${suffix}`;
};
