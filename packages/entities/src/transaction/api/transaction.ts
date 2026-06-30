import type { Transaction } from '../model/types';
import { delay } from '@fintrack-pro/shared/lib';
import { type CreateTransactionDTO } from './transaction.types';

// Мок-данные
let mockTransactions: Transaction[] = [
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

export const transactionApi = {
  fetchAll: async (): Promise<Transaction[]> => {
    await delay(500);
    return [...mockTransactions];
  },

  add: async (transaction: CreateTransactionDTO): Promise<Transaction> => {
    await delay(500);
    const newTransaction: Transaction = {
      ...transaction,
      id: String(nextId++),
      userId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTransactions.push(newTransaction);
    return { ...newTransaction };
  },

  delete: async (id: string): Promise<void> => {
    await delay(500);
    mockTransactions = mockTransactions.filter(t => t.id !== id);
  },
};
