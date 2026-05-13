import React from 'react';

export interface WColProps {
  children: React.ReactNode;
  className?: string;
}

export const WCol: React.FC<WColProps> = ({ children, className = '' }) => {
  return <div className={className}>{children}</div>;
};
