import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export const WContainer: React.FC<ContainerProps> = ({ children, maxWidth = 'xl', className = '' }) => {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full',
  };

  return (
    <div
      className={`
        mx-auto px-4 sm:px-6 lg:px-8
        pt-[env(safe-area-inset-top)] 
        pb-[env(safe-area-inset-bottom)]
        ${maxWidthClasses[maxWidth]}
        ${className}
      `}>
      {children}
    </div>
  );
};
