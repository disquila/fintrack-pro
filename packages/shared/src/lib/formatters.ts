/**
 * Форматирует число в валюту
 * @example formatCurrency(1500) → "1 500 ₽"
 * @example formatCurrency(1500, '$') → "1 500 $"
 */
export const formatCurrency = (amount: number, currency: string, locale: string): string => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
};

/**
 * Форматирует дату в локальный формат
 * @example formatDate('2024-01-15') → "15.01.2024"
 */
export const formatDate = (date: string, locale: string): string => {
  return new Date(date).toLocaleDateString(locale);
};

/**
 * Форматирует дату и время
 * @example formatDateTime('2024-01-15T10:30:00Z') → "15.01.2024, 13:30"
 */
export const formatDateTime = (date: string, locale: string): string => {
  return new Date(date).toLocaleString(locale);
};
