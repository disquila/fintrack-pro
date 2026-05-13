export type TTransactionType = 'income' | 'expense';

export interface ITransaction {
  id: string;
  amount: number;
  type: TTransactionType;
  categoryId: string;
  description: string;
  date: string; // ISO date: "2024-01-15"
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITransactionCreate {
  amount: number;
  type: TTransactionType;
  categoryId: string;
  description: string;
  date: string;
}

export interface ITransactionFilters {
  startDate?: string;
  endDate?: string;
  type?: TTransactionType;
  categoryId?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface ITransactionsState {
  items: ITransaction[];
  isLoading: boolean;
  error: string | null;
  totalIncome: number;
  totalExpense: number;
}
