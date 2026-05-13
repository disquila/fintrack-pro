import React, { type JSX } from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
export type TypographyColor = 'primary' | 'secondary' | 'muted';
export type TypographyAlign = 'left' | 'center' | 'right';

export interface TypographyProps {
  variant?: TypographyVariant;
  component?: keyof JSX.IntrinsicElements;
  color?: TypographyColor;
  align?: TypographyAlign;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  children: React.ReactNode;
  className?: string;
}

export const WTypography: React.FC<TypographyProps> = ({
  variant = 'body',
  component,
  color = 'primary',
  align = 'left',
  weight = 'normal',
  children,
  className = '',
}) => {
  const variantClasses = {
    h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold',
    h2: 'text-2xl sm:text-3xl md:text-4xl font-semibold',
    h3: 'text-xl sm:text-2xl md:text-3xl font-semibold',
    h4: 'text-lg sm:text-xl md:text-2xl font-medium',
    body: 'text-base',
    caption: 'text-xs sm:text-sm',
  };

  const colorClasses = {
    primary: 'text-primary-900',
    secondary: 'text-foreground',
    muted: 'text-primary-400',
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const Component = (component || (variant === 'body' ? 'p' : variant)) as keyof JSX.IntrinsicElements;

  return React.createElement(
    Component,
    {
      className: `
        ${variantClasses[variant]}
        ${colorClasses[color]}
        ${alignClasses[align]}
        ${weightClasses[weight]} 
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' '),
    },
    children,
  );
};
