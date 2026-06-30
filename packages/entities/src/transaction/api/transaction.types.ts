import { type TransactionType } from '../model/types';

export interface CreateTransactionDTO {
  amount: number;
  type: TransactionType;
  categoryId: string;
  description: string;
  date: string;
}

export interface TransactionFiltersDTO {
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
  categoryId?: string;
  minAmount?: number;
  maxAmount?: number;
}
