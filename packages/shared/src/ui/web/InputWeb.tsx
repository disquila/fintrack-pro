import React, { forwardRef } from 'react';

type InputVariant = 'default' | 'error' | 'success';
type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Вариант оформления */
  variant?: InputVariant;
  /** Размер */
  size?: InputSize;
  /** Label над полем */
  label?: string;
  /** Текст ошибки под полем */
  error?: string;
  /** Текст успеха под полем */
  success?: string;
  /** Иконка слева */
  leftIcon?: React.ReactNode;
  /** Иконка справа */
  rightIcon?: React.ReactNode;
  /** Дополнительный класс для обёртки */
  containerClassName?: string;
  /** Полная ширина */
  fullWidth?: boolean;
}

/**
 * Input Component
 *
 * Стилизованное поле ввода с label, ошибками, иконками.
 * Использует forwardRef для передачи ref наружу.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      error,
      success,
      leftIcon,
      rightIcon,
      containerClassName = '',
      fullWidth = true,
      className = '',
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    // Генерируем уникальный id если не передан
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substr(2, 9)}`;

    // Размеры
    const sizeClasses: Record<InputSize, string> = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

    // Варианты границ (фокус/ошибка/успех)
    const variantClasses: Record<InputVariant, string> = {
      default: 'border-gray-300 focus:border-primary-500 focus:ring-primary-200',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-200',
      success: 'border-green-500 focus:border-green-500 focus:ring-green-200',
    };

    // Базовые стили input
    const baseInputClasses = `
      w-full rounded-lg border bg-white
      transition-all duration-200 ease-in-out
      outline-none
      placeholder:text-gray-400
      disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
      ${sizeClasses[size]}
      ${variantClasses[variant === 'error' && error ? 'error' : variant === 'success' && success ? 'success' : 'default']}
      ${leftIcon ? 'pl-10' : ''}
      ${rightIcon ? 'pr-10' : ''}
      ${className}
    `.trim();

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${containerClassName}`}>
        {/* Label */}
        {label && (
          <label htmlFor={inputId} className='block text-sm font-medium text-gray-700 mb-1.5'>
            {label}
          </label>
        )}

        {/* Input Wrapper (для иконок) */}
        <div className='relative'>
          {/* Left Icon */}
          {leftIcon && <div className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>{leftIcon}</div>}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={baseInputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : success ? `${inputId}-success` : undefined}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none'>{rightIcon}</div>}
        </div>

        {/* Error Message */}
        {error && (
          <p id={`${inputId}-error`} className='mt-1.5 text-sm text-red-600 flex items-center gap-1'>
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        )}

        {/* Success Message */}
        {success && !error && (
          <p id={`${inputId}-success`} className='mt-1.5 text-sm text-green-600 flex items-center gap-1'>
            <span>✅</span>
            <span>{success}</span>
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
