import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-xs font-medium text-gray-400 tracking-wide uppercase px-0.5">{label}</label>}
        <div className="relative">
          <input
            type={type}
            className={cn(
              'w-full rounded-xl border border-white/[0.08] bg-[#090A0F]/60 px-4 py-3.5 text-sm text-white placeholder-gray-500 backdrop-blur-md transition-all duration-200 focus:border-[#00F2FE]/50 focus:outline-none focus:ring-1 focus:ring-[#00F2FE]/50 disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-400 font-medium tracking-wide animate-fadeIn">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';
