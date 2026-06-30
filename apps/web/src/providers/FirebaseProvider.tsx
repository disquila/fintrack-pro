import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { type FirebaseConfig, initFirebase } from '@fintrack-pro/shared/lib';
import { useAuthSync } from '@fintrack-pro/features/auth';

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  const [initialized, setInitialized] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);

  const dispatch = useDispatch();

  const initRef = useRef<boolean>(false);

  useEffect(() => {
    if (initRef.current) {
      return;
    }

    initRef.current = true;

    async function init() {
      try {
        const configString = import.meta.env.VITE_FIREBASE_CONFIG;
        if (!configString) throw new Error('[FirebaseProvider] init: Missing configString');

        const config: FirebaseConfig = JSON.parse(configString);

        await initFirebase(config);

        setInitialized(true);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed';
        setErrorState(message);
        console.error('[FirebaseProvider] init', err);

        initRef.current = false;
      }
    }

    init().then();
  }, [dispatch]);

  useAuthSync(initialized && !error);

  if (error) {
    return <div style={{ padding: 20, textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  if (!initialized) {
    return <div style={{ padding: 20, textAlign: 'center' }}>Loading...</div>;
  }

  return <>{children}</>;
}
