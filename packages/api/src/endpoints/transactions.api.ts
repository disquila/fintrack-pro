import type { ITransaction, ITransactionCreate } from '@fintrack/core';

export const transactionsApi = {
  fetchAll: async (): Promise<ITransaction[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            amount: 5000,
            type: 'income',
            categoryId: '1',
            description: 'Зарплата',
            date: new Date().toISOString(),
            userId: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: '2',
            amount: 500,
            type: 'expense',
            categoryId: '2',
            description: 'Продукты',
            date: new Date().toISOString(),
            userId: '1',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }, 500);
    });
  },

  add: async (transaction: ITransactionCreate): Promise<ITransaction> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          ...transaction,
          id: Date.now().toString(),
          userId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }, 500);
    });
  },

  delete: async (_id: string): Promise<void> => {
    // _id — префикс _ говорит ESLint, что параметр намеренно не используется
    return new Promise(resolve => setTimeout(resolve, 500));
  },
};
