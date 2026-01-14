
import React from 'react';

const DynamicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background transition-colors duration-500">
      {/* Organic slow moving plasma blob - Side to side */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-inverse/5 rounded-full blur-[140px] animate-plasma mix-blend-screen" />

      {/* Noise Texture for Cyberpunk Feel */}

    </div>
  );
};

export default DynamicBackground;