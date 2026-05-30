import React from 'react';
import { Text } from 'react-native';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
export type TypographyColor = 'primary' | 'secondary' | 'muted' | 'white' | 'error';
export type TypographyAlign = 'left' | 'center' | 'right';
export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface MTypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  className?: string;
}

export const MTypography: React.FC<MTypographyProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight = 'normal',
  className = '',
}) => {
  const variantClasses: Record<TypographyVariant, string> = {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-semibold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-semibold',
    body: 'text-base',
    caption: 'text-xs',
  };

  const colorClasses: Record<TypographyColor, string> = {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    muted: 'text-gray-400',
    white: 'text-white',
    error: 'text-red-600',
  };

  const alignClasses: Record<TypographyAlign, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const weightClasses: Record<TypographyWeight, string> = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const combinedClassName = `
    ${variantClasses[variant]}
    ${colorClasses[color]}
    ${alignClasses[align]}
    ${weightClasses[weight]}
    ${className}
  `.trim();

  return <Text className={combinedClassName}>{children}</Text>;
};
