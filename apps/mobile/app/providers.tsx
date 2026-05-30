import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient, store } from '../src/store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}

export default Providers;
