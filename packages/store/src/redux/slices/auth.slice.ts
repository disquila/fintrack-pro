import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { type IAuthState, type ILoginCredentials, type IRegisterCredentials, type StorageService } from '@fintrack-pro/core';
import { authApi } from '@fintrack-pro/api';

export const createAuthSlice = (storage: StorageService) => {
  const initialState: IAuthState = {
    user: null,
    token: storage.getItem('token'),
    isLoading: false,
    error: null,
  };

  const login = createAsyncThunk('auth/login', async (credentials: ILoginCredentials) => {
    const response = await authApi.login(credentials);
    storage.setItem('token', response.token);
    return response;
  });

  const register = createAsyncThunk('auth/register', async (credentials: IRegisterCredentials) => {
    const response = await authApi.register(credentials);
    storage.setItem('token', response.token);
    return response;
  });

  const logout = createAsyncThunk('auth/logout', async () => {
    await authApi.logout();
    storage.removeItem('token');
    return null;
  });

  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      clearError: state => {
        state.error = null;
      },
    },
    extraReducers: builder => {
      builder
        // Login
        .addCase(login.pending, state => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Login failed';
        })
        // Register
        .addCase(register.pending, state => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.error.message || 'Registration failed';
        })
        // Logout
        .addCase(logout.fulfilled, state => {
          state.user = null;
          state.token = null;
        });
    },
  });

  return {
    reducer: authSlice.reducer,
    actions: authSlice.actions,
    thunks: { login, register, logout },
  };
};
