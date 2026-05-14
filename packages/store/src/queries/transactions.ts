import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { transactionsApi } from '@fintrack-pro/api';
import { calculateTotals, type ITransaction, type ITransactionCreate } from '@fintrack-pro/core';

export const TRANSACTIONS_QUERY_KEY = ['transactions'] as const;

// ХУК 1: ПОЛУЧИТЬ ВСЕ ТРАНЗАКЦИИ
export const useTransactions = () => {
  return useQuery({
    queryKey: TRANSACTIONS_QUERY_KEY,
    queryFn: () => transactionsApi.fetchAll(),
  });
};

// ХУК 2: ПОЛУЧИТЬ ТРАНЗАКЦИИ С ИТОГАМИ
export const useTransactionsWithTotals = () => {
  const { data: transactions, ...rest } = useTransactions();

  const { totalIncome, totalExpense } = transactions ? calculateTotals(transactions) : { totalIncome: 0, totalExpense: 0 };

  return {
    transactions,
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    ...rest,
  };
};

// ХУК 3: ДОБАВИТЬ ТРАНЗАКЦИЮ
export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: ITransactionCreate) => transactionsApi.add(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
    },
  });
};

// ХУК 4: УДАЛИТЬ ТРАНЗАКЦИЮ
export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionsApi.delete(id),
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
      const previousTransactions = queryClient.getQueryData(TRANSACTIONS_QUERY_KEY);

      queryClient.setQueryData(TRANSACTIONS_QUERY_KEY, (old: ITransaction[] | undefined) => {
        if (!old) return [];
        return old.filter((t: ITransaction) => t.id !== id);
      });

      return { previousTransactions };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(TRANSACTIONS_QUERY_KEY, context?.previousTransactions);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
    },
  });
};
