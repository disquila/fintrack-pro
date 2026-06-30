import { type Category } from '../model/types';
import { delay } from '@fintrack-pro/shared/lib';

export const categoryApi = {
  fetchAll: async (): Promise<Category[]> => {
    await delay(300);
    return [
      { id: '1', name: 'Salary', icon: '💰', color: '#4caf50', type: 'income' },
      { id: '2', name: 'Food', icon: '🛒', color: '#ff9800', type: 'expense' },
      { id: '3', name: 'Transport', icon: '🚗', color: '#2196f3', type: 'expense' },
      { id: '4', name: 'Entertainment', icon: '🎬', color: '#9c27b0', type: 'expense' },
    ];
  },
};
