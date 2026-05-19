import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradient?: boolean;
  clickable?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  gradient = false,
  clickable = false,
  ...props
}) => {
  return (
    <motion.div
      whileTap={clickable ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#12141C]/60 p-4 backdrop-blur-xl',
        gradient && 'before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-cyan-500/10 before:to-transparent',
        clickable && 'active:bg-[#161A26]/80 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
                                                    
