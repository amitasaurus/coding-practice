import React from 'react';
import cn from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title: string;
  error?: string | undefined;
}

export default function Input({
  title,
  error,
  placeholder,
  className,
  ...props
}: InputProps) {
  return (
    <div
      className={cn(
        'border border-slate-300 rounded px-2 py-1 bg-white',
        className,
        {
          'border-rose-500': !!error,
        }
      )}
    >
      <div className="flex justify-between text-xs">
        <div className="text-slate-600">{title}</div>
        <div
          className={cn(
            {
              hidden: !error,
            },
            'text-rose-500'
          )}
        >
          {error}
        </div>
      </div>
      <input
        placeholder={placeholder}
        {...props}
        className={
          'w-full text-base border-none text-slate-800 focus:outline-none'
        }
      />
    </div>
  );
}
