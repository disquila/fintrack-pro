import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { transactionsApi } from '@fintrack/api';
import type { ITransactionCreate, ITransactionsState } from '@fintrack/core';
import { calculateTotals } from '@fintrack/core';

const initialState: ITransactionsState = {
  items: [],
  isLoading: false,
  error: null,
  totalIncome: 0,
  totalExpense: 0,
};

export const fetchTransactions = createAsyncThunk('transactions/fetch', async () => {
  const response = await transactionsApi.fetchAll();
  return response;
});

export const addTransaction = createAsyncThunk('transactions/add', async (transaction: ITransactionCreate) => {
  const response = await transactionsApi.add(transaction);
  return response;
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(t => t.id !== action.payload);
      const totals = calculateTotals(state.items);
      state.totalIncome = totals.totalIncome;
      state.totalExpense = totals.totalExpense;
    },
    clearTransactions: state => {
      state.items = [];
      state.totalIncome = 0;
      state.totalExpense = 0;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTransactions.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        const totals = calculateTotals(action.payload);
        state.totalIncome = totals.totalIncome;
        state.totalExpense = totals.totalExpense;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch transactions';
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
        const totals = calculateTotals(state.items);
        state.totalIncome = totals.totalIncome;
        state.totalExpense = totals.totalExpense;
      });
  },
});

export const { deleteTransaction, clearTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
