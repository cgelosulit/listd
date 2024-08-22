interface FormatToCurrencyOptions {
  locale?: string;
  currency?: string;
  toFixed?: number;
}

export const formatToCurrency = (
  amount: number,
  options: FormatToCurrencyOptions = {},
): string => {
  const { locale = 'en-US', currency = 'PHP', toFixed = 2 } = options;

  let formattedAmount: string;
  let suffix: string = '';

  if (amount >= 1_000_000_000) {
    formattedAmount = (amount / 1_000_000_000).toFixed(toFixed);
    suffix = 'B';
  } else if (amount >= 1_000_000) {
    formattedAmount = (amount / 1_000_000).toFixed(toFixed);
    suffix = 'M';
  } else if (amount >= 1_000) {
    formattedAmount = (amount / 1_000).toFixed(toFixed);
    suffix = 'k';
  } else {
    formattedAmount = amount.toFixed(toFixed);
  }

  const currencyFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format a small number to get just the currency symbol
  const formattedCurrency = currencyFormatter.format(0);
  const currencySymbol = formattedCurrency.replace(/[0-9.,\s]/g, '');

  return `${currencySymbol}${formattedAmount}${suffix}`;
};
