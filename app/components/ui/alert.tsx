// app/components/ui/alert.tsx
import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Alert = ({ children, className = '', onClick }: AlertProps) => (
  <div 
    className={`rounded-lg border p-4 ${className}`}
    onClick={onClick}
    role="alert"
  >
    {children}
  </div>
);

export const AlertTitle = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <h4 className={`font-medium mb-1 ${className}`}>
    {children}
  </h4>
);

export const AlertDescription = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`text-sm ${className}`}>
    {children}
  </div>
);