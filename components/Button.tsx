
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  // Changed font-manrope to font-syne
  // Added hover:scale-[1.02] and active:scale-[0.98] for consistent interaction
  const baseStyles = "font-syne font-semibold rounded-full transition-all duration-300 ease-in-out px-8 py-3 flex items-center justify-center gap-2 text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    primary: "bg-inverse text-inverseSurface hover:bg-inverse/80 hover:shadow-[0_0_20px_rgba(var(--inverse),0.2)]",
    secondary: "bg-surface text-textPrimary border border-inverse/10 hover:border-inverse/30 hover:bg-inverse/5",
    outline: "bg-transparent border border-inverse/20 text-textPrimary hover:bg-inverse hover:text-inverseSurface",
    white: "bg-white text-black hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] shadow-lg border border-transparent"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
