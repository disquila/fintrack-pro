import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@fintrack-pro/entities/user';
import { clearUser, selectAuthUser, selectIsAuthInitialized } from '../model/slice';

function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  if (err && typeof err === 'object' && 'message' in err) return String((err as { message: unknown }).message);
  return 'An unexpected error occurred. Please try again.';
}

export function useAuth() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const user = useSelector(selectAuthUser);
  const isInitialized = useSelector(selectIsAuthInitialized);

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] }).then();
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      queryClient.clear();
    },
  });

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
      dispatch(clearUser());
      queryClient.clear();
    } catch (err) {
      console.error('[useAuth] logout:', extractErrorMessage(err));
    }
  }, [dispatch, queryClient]);

  const getIdToken = useCallback(async (forceRefresh = false) => authApi.getIdToken(forceRefresh), []);

  const isLoading = loginMutation.isPending || registerMutation.isPending;
  const error = loginMutation.error || registerMutation.isError ? extractErrorMessage(loginMutation.error || registerMutation.error) : null;

  return {
    user,
    isInitialized,
    isAuthenticated: !!user && isInitialized,

    isLoading,
    error,

    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,

    getIdToken,
  };
}
