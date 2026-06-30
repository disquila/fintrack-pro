import { useSuspenseQuery } from '@tanstack/react-query';
import { portfolioApi } from '@fintrack-pro/entities/portfolio';

export const PORTFOLIO_QUERY_KEY = ['portfolio'] as const;

export const usePortfolioStats = () => {
  return useSuspenseQuery({
    queryKey: PORTFOLIO_QUERY_KEY,
    queryFn: () => portfolioApi.fetchStats(),
    staleTime: 1000 * 60 * 15,
  });
};
