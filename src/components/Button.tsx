import React from 'react';
import cn from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn('border-none focus:outline-none', className)}
      {...props}
    >
      {children}
    </button>
  );
}
