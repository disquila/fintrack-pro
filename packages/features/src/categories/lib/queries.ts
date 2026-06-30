import { useSuspenseQuery } from '@tanstack/react-query';
import { categoryApi } from '@fintrack-pro/entities/category';

export const CATEGORIES_QUERY_KEY = ['categories'] as const;

export const useCategories = () => {
  return useSuspenseQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: () => categoryApi.fetchAll(),
    staleTime: 1000 * 60 * 15,
  });
};
