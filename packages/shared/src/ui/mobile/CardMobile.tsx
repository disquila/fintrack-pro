import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, padding = 'md', className = '', onPress }) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      className={`
        bg-white rounded-xl shadow-sm border border-primary-100
        ${paddingClasses[padding]}
        ${className}
      `}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}>
      {children}
    </Container>
  );
};
