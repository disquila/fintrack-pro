import React from 'react';
import { View } from 'react-native';

export interface RowProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: 'none' | 'sm' | 'md' | 'lg';
  wrap?: boolean;
  className?: string;
}

export const Row: React.FC<RowProps> = ({ children, align = 'start', justify = 'start', gap = 'md', wrap = true, className = '' }) => {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  const gapClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <View
      className={`
        flex-row ${wrap ? 'flex-wrap' : 'flex-nowrap'}
        ${alignClasses[align]}
        ${justifyClasses[justify]}
        ${gapClasses[gap]}
        ${className}
      `}>
      {children}
    </View>
  );
};
