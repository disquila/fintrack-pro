import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface MContainerProps {
  children: React.ReactNode;
  safeArea?: boolean;
  className?: string;
}

export const MContainer: React.FC<MContainerProps> = ({ children, safeArea = true, className = '' }) => {
  const Container = safeArea ? SafeAreaView : View;

  return <Container className={`flex-1 bg-background px-4 ${className}`}>{children}</Container>;
};
