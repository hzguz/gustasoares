
import React from 'react';

interface GridLinesProps {
  variant?: 'full' | 'outer' | 'none' | 'center';
  className?: string;
  inverted?: boolean;
}

const GridLines: React.FC<GridLinesProps> = ({ variant = 'full', className = '', inverted = false }) => {
  if (variant === 'none') return null;

  // Unified color for lines and markers - inverted uses white for dark backgrounds
  const gridColor = inverted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(17, 17, 17, 0.04)';

  // Helper for the "plus" marker
  const PlusMarker = ({ className }: { className?: string }) => (
    <div className={`absolute w-3 h-3 flex items-center justify-center pointer-events-none z-10 ${className}`}>
      <div className="absolute w-full h-[1px]" style={{ backgroundColor: gridColor }} />
      <div className="absolute h-full w-[1px]" style={{ backgroundColor: gridColor }} />
    </div>
  );

  // Triangle Marker for corners
  const CornerTriangle = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      className={`absolute pointer-events-none z-10 ${className}`}
      style={style}
    >
      <path d="M0 0 L6 0 L0 6 Z" fill={gridColor} />
    </svg>
  );

  return (
    <div className={`absolute inset-0 pointer-events-none z-50 overflow-hidden hidden 2xl:block ${className}`}>
      {/* Changed 'container' to custom width to push lines further out than the content */}
      <div
        className="mx-auto w-[98%] max-w-[1920px] px-6 h-full relative border-x transition-colors duration-500"
        style={{ borderColor: gridColor }}
      >

        <div className={`grid h-full w-full ${variant === 'center' ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {variant === 'full' && (
            <>
              <div className="h-full border-r hidden md:block transition-colors duration-500 relative" style={{ borderColor: gridColor }}>
                {/* Keep Plus markers for internal grid intersections */}
                <PlusMarker className="-top-1.5 -right-1.5" />
                <PlusMarker className="-bottom-1.5 -right-1.5" />
              </div>
              <div className="h-full border-r hidden md:block transition-colors duration-500 relative" style={{ borderColor: gridColor }}>
                <PlusMarker className="-top-1.5 -right-1.5" />
                <PlusMarker className="-bottom-1.5 -right-1.5" />
              </div>
              <div className="h-full border-r hidden md:block transition-colors duration-500 relative" style={{ borderColor: gridColor }}>
                <PlusMarker className="-top-1.5 -right-1.5" />
                <PlusMarker className="-bottom-1.5 -right-1.5" />
              </div>
            </>
          )}

          {variant === 'center' && (
            <div className="h-full border-r hidden md:block transition-colors duration-500 relative" style={{ borderColor: gridColor }}>
              <PlusMarker className="-top-1.5 -right-1.5" />
              <PlusMarker className="-bottom-1.5 -right-1.5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GridLines;
