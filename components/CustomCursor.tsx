import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Throttle para limitar updates a ~60fps
    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mouseover", onMouseOver);
      document.addEventListener("mouseout", onMouseOut);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };

    const onMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setPosition({ x: lastX, y: lastY });
          rafId = null;
        });
      }
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect interactive elements
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = () => {
      setIsHovering(false);
    };

    addEventListeners();
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      removeEventListeners();
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div className={`
            bg-white rounded-full transition-all duration-300 ease-out
            ${clicked ? 'w-2 h-2' : isHovering ? 'w-4 h-4' : 'w-2 h-2'}
         `} />
      </div>

      {/* Trailing Ring / Reticle */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block mix-blend-difference"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          transition: 'transform 0.15s ease-out', // Slight lag for trailing effect
        }}
      >
        <div
          className={`
                border border-white rounded-full transition-all duration-500 ease-out flex items-center justify-center
                ${clicked ? 'scale-75 opacity-50' : ''}
                ${isHovering ? 'w-12 h-12 border-white opacity-100 scale-110' : 'w-8 h-8 border-white/40 opacity-50'}
            `}
        >
          {/* Cyberpunk Crosshair details that appear on hover */}
          <div className={`absolute w-full h-[1px] bg-white transition-all duration-300 ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
          <div className={`absolute h-full w-[1px] bg-white transition-all duration-300 ${isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;