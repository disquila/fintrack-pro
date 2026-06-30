import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { type CreateTransactionDTO, type Transaction, transactionApi } from '@fintrack-pro/entities/transaction';
import { calculateTransactionTotals } from './calculations';

export const TRANSACTIONS_QUERY_KEY = ['transactions'] as const;

export const useTransactions = () => {
  return useSuspenseQuery({
    queryKey: TRANSACTIONS_QUERY_KEY,
    queryFn: () => transactionApi.fetchAll(),
  });
};

export const useTransactionsWithTotals = () => {
  const { data: transactions, ...rest } = useTransactions();

  const totals = calculateTransactionTotals(transactions);

  return {
    transactions,
    ...totals,
    ...rest,
  };
};

export const useAddTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: CreateTransactionDTO) => transactionApi.add(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionApi.delete(id),
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: TRANSACTIONS_QUERY_KEY });
      const previousTransactions = queryClient.getQueryData(TRANSACTIONS_QUERY_KEY);

      queryClient.setQueryData(TRANSACTIONS_QUERY_KEY, (old: Transaction[] | undefined) => {
        if (!old) return [];
        return old.filter(t => t.id !== id);
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
