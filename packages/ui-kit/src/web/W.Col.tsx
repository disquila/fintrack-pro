import React from 'react';

export interface WColProps {
  children: React.ReactNode;
  span?: number;
  className?: string;
}

export const WCol: React.FC<WColProps> = ({ children, span, className = '' }) => {
  const spanClasses: Record<number, string> = {
    1: 'w-1/12',
    2: 'w-2/12',
    3: 'w-3/12',
    4: 'w-4/12',
    5: 'w-5/12',
    6: 'w-6/12',
    7: 'w-7/12',
    8: 'w-8/12',
    9: 'w-9/12',
    10: 'w-10/12',
    11: 'w-11/12',
    12: 'w-full',
  };

  const spanClass = span ? spanClasses[span] || 'w-full' : 'flex-1';

  return <div className={`${spanClass} ${className}`}>{children}</div>;
};
