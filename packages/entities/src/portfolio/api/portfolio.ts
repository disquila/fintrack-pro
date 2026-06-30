import { type PortfolioStats } from '../model/types';
import { delay } from '@fintrack-pro/shared/lib';

export const portfolioApi = {
  fetchStats: async (): Promise<PortfolioStats> => {
    await delay(500);
    return {
      balance: 15000,
      monthlyIncome: 5000,
      monthlyExpense: 3000,
      savingsRate: 40,
      topCategories: [
        { name: 'Food', amount: 800 },
        { name: 'Transport', amount: 400 },
        { name: 'Entertainment', amount: 300 },
      ],
    };
  },
};
