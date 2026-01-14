import React, { useEffect, useRef, useState } from 'react';

type RevealVariant = 'fade-up' | 'fade-right' | 'fade-left' | 'blur-in' | 'scale-in';

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  width?: 'fit-content' | '100%';
}

const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.8,
  className = '',
  width = 'fit-content'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can stop observing to perform only once
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully in view
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  const getAnimationClass = () => {
    switch (variant) {
      case 'fade-up': return 'animate-fade-in-up';
      case 'fade-right': return 'animate-fade-in-right'; // enters from left to right
      case 'fade-left': return 'animate-fade-in-left'; // enters from right to left
      case 'blur-in': return 'animate-blur-in';
      case 'scale-in': return 'animate-scale-in';
      default: return 'animate-fade-in-up';
    }
  };

  return (
    <div
      ref={ref}
      // "will-change-transform" helps browser optimize rendering layers to prevent jank
      // "opacity-0" ensures element is hidden before JS kicks in or animation starts
      className={`${className} ${width === '100%' ? 'w-full' : 'w-fit'} ${isVisible ? getAnimationClass() : 'opacity-0'}`}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}ms`,
        animationFillMode: 'both', // Ensure both start (0%) and end (100%) states persist
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;