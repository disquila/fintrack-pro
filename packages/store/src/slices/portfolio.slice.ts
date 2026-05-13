import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { portfolioApi } from '@fintrack/api';
import type { IPortfolioState } from '@fintrack/core';

const initialState: IPortfolioState = {
  stats: null,
  isLoading: false,
  error: null,
};

export const fetchPortfolioStats = createAsyncThunk('portfolio/fetch', async () => {
  const response = await portfolioApi.fetchStats();
  return response;
});

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPortfolioStats.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPortfolioStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchPortfolioStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch portfolio stats';
      });
  },
});

export default portfolioSlice.reducer;
