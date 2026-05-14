// Мок-данные
import { type ITransaction, type ITransactionCreate } from '@fintrack-pro/core';

let mockTransactions: ITransaction[] = [
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
];

let nextId = 3;

export const transactionsApi = {
  fetchAll: async (): Promise<ITransaction[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([...mockTransactions]);
      }, 500);
    });
  },

  add: async (transaction: ITransactionCreate): Promise<ITransaction> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newTransaction: ITransaction = {
          ...transaction,
          id: String(nextId++),
          userId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockTransactions.push(newTransaction);
        resolve({ ...newTransaction });
      }, 500);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise(resolve => {
      setTimeout(() => {
        mockTransactions = mockTransactions.filter(t => t.id !== id);
        resolve();
      }, 500);
    });
  },
};
