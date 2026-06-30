import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@fintrack-pro/app/store';
import { store } from '../src/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}

export default Providers;
