import { type TransactionType } from '../../transaction';

export interface Category {
  id: string;
  name: string;
  type: TransactionType;
  icon: string;
  color: string;
}

export const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'] as const,
  expense: ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'] as const,
} as const;

export type IncomeCategory = (typeof CATEGORIES.income)[number];
export type ExpenseCategory = (typeof CATEGORIES.expense)[number];
export type TypeCategory = IncomeCategory | ExpenseCategory;
