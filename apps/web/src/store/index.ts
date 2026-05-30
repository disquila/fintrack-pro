import { useSelector } from 'react-redux';

import { createStore } from '@fintrack-pro/store';
import { webStorage } from '../storage/W.StorageService';
import type { RootState } from './index';

const { store } = createStore(webStorage);

export { store };
export type { RootState, AppDispatch } from '@fintrack-pro/store';

export const useAppSelector = useSelector.withTypes<RootState>();
