import React from 'react';

export const FloatingBg: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-50 overflow-hidden bg-[#090A0F]">
      {/* Upper Premium Teal Orb */}
      <div 
        className="absolute -top-[10%] -left-[20%] h-[350px] w-[350px] rounded-full bg-[#00F2FE]/15 mix-blend-screen"
        style={{ filter: 'blur(110px)' }}
      />
      {/* Lower Deep Blue Orb */}
      <div 
        className="absolute -bottom-[5%] -right-[10%] h-[400px] w-[400px] rounded-full bg-[#4FACFE]/10 mix-blend-screen"
        style={{ filter: 'blur(130px)' }}
      />
    </div>
  );
};
