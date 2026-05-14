import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@fintrack-pro/api';

export const CATEGORIES_QUERY_KEY = ['categories'] as const;

// ХУК: ПОЛУЧИТЬ ВСЕ КАТЕГОРИИ
export const useCategories = () => {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: () => categoriesApi.fetchAll(),
    staleTime: 1000 * 60 * 30, // 30 минут — категории меняются редко
  });
};
