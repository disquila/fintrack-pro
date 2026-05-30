import { Stack } from 'expo-router';

import '../global.css';
import Providers from './providers';

export default function Layout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='test-store' options={{ title: 'Store Test' }} />
        <Stack.Screen name='query-test' options={{ title: 'Query Test' }} />
      </Stack>
    </Providers>
  );
}
