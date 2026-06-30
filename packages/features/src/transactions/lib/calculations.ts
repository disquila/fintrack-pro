import type { Transaction } from '@fintrack-pro/entities/transaction';

export function calculateTransactionTotals(transactions: Transaction[] | undefined) {
  const totals = transactions?.reduce(
    (acc, t) => {
      if (t.type === 'income') acc.totalIncome += t.amount;
      else acc.totalExpense += t.amount;
      return acc;
    },
    { totalIncome: 0, totalExpense: 0 },
  );

  return {
    totalIncome: totals?.totalIncome || 0,
    totalExpense: totals?.totalExpense || 0,
    balance: (totals?.totalIncome || 0) - (totals?.totalExpense || 0),
  };
}
