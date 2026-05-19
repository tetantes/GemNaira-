import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { triggerHaptic } from '../../utils/haptic';

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  className,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;
    triggerHaptic.light();
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        'relative flex items-center justify-center font-semibold text-sm tracking-wide rounded-xl py-3.5 px-6 transition-all duration-200 outline-none select-none active:scale-[0.97]',
        fullWidth && 'w-full',
        variant === 'primary' && 'bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] text-black shadow-[0_4px_20px_rgba(0,242,254,0.3)] disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 disabled:shadow-none',
        variant === 'secondary' && 'bg-white/[0.06] border border-white/[0.08] text-white hover:bg-white/[0.1] disabled:bg-gray-800/40 disabled:text-gray-600',
        variant === 'danger' && 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-[0_4px_15px_rgba(239,68,68,0.2)]',
        variant === 'ghost' && 'bg-transparent text-gray-400 hover:text-white',
        isLoading && 'cursor-wait opacity-80',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </motion.button>
  );
};
