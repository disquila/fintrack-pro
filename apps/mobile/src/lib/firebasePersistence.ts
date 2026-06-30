import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Persistence } from 'firebase/auth';

interface FirebaseAuthPersistence extends Persistence {
  _isAvailable(): Promise<boolean>;
  _set(key: string, value: string): Promise<void>;
  _get(key: string): Promise<string | null>;
  _remove(key: string): Promise<void>;
  _addListener(key: string, listener: (value: string | null) => void): void;
  _removeListener(key: string, listener: (value: string | null) => void): void;
  _shouldAllowMigration?: boolean;
}

const reactNativePersistence: FirebaseAuthPersistence = {
  type: 'LOCAL',

  async _isAvailable(): Promise<boolean> {
    try {
      const testKey = '@firebase_auth_test';
      await AsyncStorage.setItem(testKey, 'test');
      await AsyncStorage.removeItem(testKey);
      return true;
    } catch (error) {
      console.error('[reactNativePersistence] _isAvailable:', error);
      return false;
    }
  },

  async _set(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`[reactNativePersistence] _set ${key}:`, error);
      throw error;
    }
  },

  async _get(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(`[reactNativePersistence] _get ${key}:`, error);
      return null;
    }
  },

  async _remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`[reactNativePersistence] _remove ${key}:`, error);
      throw error;
    }
  },

  _addListener(_key: string, _listener: (value: string | null) => void): void {
    // No-op
  },

  _removeListener(_key: string, _listener: (value: string | null) => void): void {
    // No-op
  },

  _shouldAllowMigration: true,
};

export default reactNativePersistence;
