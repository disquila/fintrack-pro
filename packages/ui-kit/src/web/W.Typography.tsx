import React from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
export type TypographyColor = 'primary' | 'secondary' | 'muted' | 'white' | 'error';
export type TypographyAlign = 'left' | 'center' | 'right';
export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: TypographyAlign;
  weight?: TypographyWeight;
  className?: string;
}

export const WTypography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight = 'normal',
  className = '',
}) => {
  const variantClasses: Record<TypographyVariant, string> = {
    h1: 'text-3xl sm:text-4xl md:text-5xl font-bold',
    h2: 'text-2xl sm:text-3xl md:text-4xl font-semibold',
    h3: 'text-xl sm:text-2xl md:text-3xl font-semibold',
    h4: 'text-lg sm:text-xl md:text-2xl font-semibold',
    body: 'text-base',
    caption: 'text-xs sm:text-sm', // ← убрали <caption> тег
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

  const Tag = variant === 'h1' ? 'h1' : variant === 'h2' ? 'h2' : variant === 'h3' ? 'h3' : variant === 'h4' ? 'h4' : 'p'; // ← body и caption используют <p>

  return <Tag className={combinedClassName}>{children}</Tag>;
};
