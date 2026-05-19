import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const cappedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.05] p-[1px]">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#00F2FE] to-[#4FACFE] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(0,242,254,0.5)]"
        style={{ width: `${cappedProgress}%` }}
      />
    </div>
  );
};
