import { type IPortfolioStats } from '@fintrack-pro/core';

export const portfolioApi = {
  fetchStats: async (): Promise<IPortfolioStats> => {
    // TODO: заменить на реальный API
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          balance: 15000,
          monthlyIncome: 5000,
          monthlyExpense: 3000,
          savingsRate: 40,
          topCategories: [
            { name: 'Food', amount: 800 },
            { name: 'Transport', amount: 400 },
            { name: 'Entertainment', amount: 300 },
          ],
        });
      }, 500);
    });
  },
};
