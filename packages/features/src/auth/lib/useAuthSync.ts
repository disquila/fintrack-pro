import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { authApi } from '@fintrack-pro/entities/user';
import { clearUser, setUser } from '../model/slice';

export function useAuthSync(enabled: boolean = true): void {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!enabled) return;

    const unsubscribe = authApi.subscribeToAuthChanges(
      user => {
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(clearUser());
        }
      },
      error => {
        console.error('[useAuthSync] useEffect:', error);
      },
    );

    return () => unsubscribe();
  }, [dispatch, enabled]);
}

export default useAuthSync;
