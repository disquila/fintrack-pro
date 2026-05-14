import { type ITransaction } from '../types';

export const calculateTotals = (items: ITransaction[]) => {
  const totalIncome = items.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = items.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

  return { totalIncome, totalExpense };
};
