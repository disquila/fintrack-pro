import { Stack } from 'expo-router';

import '../global.css';
import Providers from './providers';
import { useSplash } from '../src/hooks/useSplash';
import { FirebaseProvider } from '../src/providers/FirebaseProvider';

export default function Layout() {
  useSplash();

  return (
    <Providers>
      <FirebaseProvider>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name='test-store' options={{ title: 'Store Test' }} />
          <Stack.Screen name='query-test' options={{ title: 'Query Test' }} />
        </Stack>
      </FirebaseProvider>
    </Providers>
  );
}
