import { useQuery } from '@tanstack/react-query';
import { portfolioApi } from '@fintrack-pro/api';

export const PORTFOLIO_QUERY_KEY = ['portfolio'] as const;

// ХУК: ПОЛУЧИТЬ СТАТИСТИКУ ПОРТФЕЛЯ
export const usePortfolioStats = () => {
  return useQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: () => portfolioApi.fetchStats(),
    refetchInterval: 1000 * 60, // Автообновление каждую минуту
  });
};
