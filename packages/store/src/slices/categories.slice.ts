import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { categoriesApi } from '@fintrack/api';
import type { ICategoriesState } from '@fintrack/core';

const initialState: ICategoriesState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
  const response = await categoriesApi.fetchAll();
  return response;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export default categoriesSlice.reducer;
