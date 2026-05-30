import { useSelector } from 'react-redux';

import { type AppDispatch, createStore, queryClient, type RootState } from '@fintrack-pro/store';

import { nativeStorage } from '../storage/M.StorageService';

const { store } = createStore(nativeStorage);

export { store, queryClient };
export type { AppDispatch, RootState };

export const useAppSelector = useSelector.withTypes<RootState>();
