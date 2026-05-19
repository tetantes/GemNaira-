import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'cyan' | 'emerald' | 'warning' | 'danger' | 'neutral';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', children }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase',
        variant === 'cyan' && 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
        variant === 'emerald' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        variant === 'warning' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        variant === 'danger' && 'bg-red-500/10 text-red-400 border border-red-500/20',
        variant === 'neutral' && 'bg-white/5 text-gray-400 border border-white/10'
      )}
    >
      {children}
    </span>
  );
};
