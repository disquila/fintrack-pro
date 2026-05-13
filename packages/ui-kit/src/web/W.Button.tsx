import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const WButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  size,
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
}) => {
  const adaptiveClasses = {
    sm: 'px-2 py-1 text-xs md:px-3 md:py-1.5 md:text-sm',
    md: 'px-4 py-2 text-base md:px-6 md:py-3 md:text-lg',
    lg: 'px-6 py-3 text-lg md:px-8 md:py-4 md:text-xl',
  };

  const sizeClass = size ? adaptiveClasses[size] : 'px-4 py-2 text-base md:px-6 md:py-3 md:text-lg';

  const baseStyles = 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
    secondary: 'bg-foreground text-white hover:bg-primary-500 focus:ring-primary-500',
    outline: 'border border-primary-500 text-primary-700 hover:bg-primary-50 focus:ring-primary-500',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeClass}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}>
      {loading ? 'Загрузка...' : children}
    </button>
  );
};
