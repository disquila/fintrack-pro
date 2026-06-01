import { Stack } from 'expo-router';
import '../global.css';
import Providers from './providers';
import { useSplash } from '../src/hooks/useSplash';

export default function Layout() {
  useSplash();

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
