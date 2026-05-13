/**
 * Форматирует число в валюту
 * @example formatCurrency(1500) → "1 500 ₽"
 * @example formatCurrency(1500, '$') → "1 500 $"
 */
export const formatCurrency = (amount: number, currency = '₽'): string => {
  return new Intl.NumberFormat('ru-RU').format(amount) + ` ${currency}`;
};

/**
 * Форматирует дату в локальный формат
 * @example formatDate('2024-01-15') → "15.01.2024"
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU');
};

/**
 * Форматирует дату и время
 * @example formatDateTime('2024-01-15T10:30:00Z') → "15.01.2024, 13:30"
 */
export const formatDateTime = (date: string): string => {
  return new Date(date).toLocaleString('ru-RU');
};

/**
 * Относительное время (например: "5 минут назад")
 * @example relativeTime('2024-01-15T10:30:00Z')
 */
export const relativeTime = (date: string): string => {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'только что';
  if (diffMins < 60) return `${diffMins} мин. назад`;
  if (diffHours < 24) return `${diffHours} ч. назад`;
  if (diffDays < 7) return `${diffDays} дн. назад`;
  return formatDate(date);
};
