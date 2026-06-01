import { useEffect } from 'react';
import { NativeModules, Platform } from 'react-native';

const { SplashModule } = NativeModules;

export const useSplash = () => {
  useEffect(() => {
    if (Platform.OS === 'android' && SplashModule) {
      SplashModule.hideSplash();
    }
  }, []);
};
