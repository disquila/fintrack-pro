import { configureStore } from '@reduxjs/toolkit';

import authReducer, { clearError, login, logout, register } from './slices/auth.slice';
import transactionsReducer, { addTransaction, clearTransactions, deleteTransaction, fetchTransactions } from './slices/transactions.slice';
import categoriesReducer, { fetchCategories } from './slices/categories.slice';
import portfolioReducer, { fetchPortfolioStats } from './slices/portfolio.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    categories: categoriesReducer,
    portfolio: portfolioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { useAppDispatch, useAppSelector } from './hooks';

export { clearError, clearTransactions, deleteTransaction };

export { login, register, logout, fetchTransactions, addTransaction, fetchCategories, fetchPortfolioStats };
