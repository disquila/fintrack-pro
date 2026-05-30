import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

export interface MButtonProps<T = unknown> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (context: T) => void | Promise<void>;
  context?: T;
  children: React.ReactNode;
  className?: string;
}

export const MButton = <T,>({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  context,
  children,
  className = '',
}: MButtonProps<T>) => {
  const [internalLoading, setInternalLoading] = useState(false);

  const handlePress = useCallback(async () => {
    if (!onClick) return;
    if (loading || internalLoading) return;

    try {
      if (loading === undefined) {
        setInternalLoading(true);
      }
      const result = onClick(context as T);
      if (result instanceof Promise) {
        await result;
      }
    } catch (error) {
      console.error('Button onClick error:', error);
    } finally {
      if (loading === undefined) {
        setInternalLoading(false);
      }
    }
  }, [onClick, context, loading, internalLoading]);

  const isLoading = loading ?? internalLoading;

  const sizeClasses = {
    sm: 'px-3 py-1.5',
    md: 'px-4 py-2.5',
    lg: 'px-6 py-3',
  };

  const variantClasses = {
    primary: 'bg-primary-500',
    secondary: 'bg-foreground',
    outline: 'border border-primary-500 bg-transparent',
  };

  const textColorClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-primary-500',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled || isLoading ? 'opacity-50' : '';

  return (
    <TouchableOpacity
      className={`rounded-lg flex-row items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || isLoading}
      onPress={handlePress}
      activeOpacity={0.7}>
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#7e8772' : '#ffffff'} size='small' />
      ) : (
        <Text className={`font-medium ${textColorClasses[variant]}`}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};
