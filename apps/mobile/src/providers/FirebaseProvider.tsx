import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { initializeAuth } from 'firebase/auth';

import { type FirebaseConfig, initFirebase } from '@fintrack-pro/shared/lib';
import reactNativePersistence from '../lib/firebasePersistence';
import { useAuthSync } from '@fintrack-pro/features/auth';

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  const [initialized, setInitialized] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const configString = Constants.expoConfig?.extra?.firebaseConfig;

        if (!configString) {
          throw new Error('[FirebaseProvider] init: Missing configString');
        }

        const config: FirebaseConfig = JSON.parse(configString);

        await initFirebase(config, {
          customInitializer: async app => {
            return initializeAuth(app, {
              persistence: reactNativePersistence,
            });
          },
        });

        setInitialized(true);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed';
        setErrorState(message);
        console.error('[FirebaseProvider] init', err);
      }
    }

    init().then();
  }, []);

  useAuthSync(initialized && !error);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>{error}</Text>
      </View>
    );
  }

  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0000ff' />
        <Text style={{ marginTop: 10 }}>Initializing...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
