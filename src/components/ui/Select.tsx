import React from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="text-xs font-medium text-gray-400 tracking-wide uppercase px-0.5">{label}</label>}
        <select
          className={cn(
            'w-full appearance-none rounded-xl border border-white/[0.08] bg-[#090A0F]/60 px-4 py-3.5 text-sm text-white backdrop-blur-md transition-all duration-200 focus:border-[#00F2FE]/50 focus:outline-none focus:ring-1 focus:ring-[#00F2FE]/50 disabled:opacity-50',
            error && 'border-red-500/50',
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#12141C] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-400 font-medium tracking-wide">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
    
