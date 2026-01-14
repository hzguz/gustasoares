
import React, { useState, useRef, useEffect } from 'react';
import { IconChevronDown, IconCheck } from '@tabler/icons-react';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full font-manrope" ref={containerRef}>
      <div
        className={`w-full bg-transparent border-b py-3 text-sm md:text-base cursor-pointer flex items-center justify-between group transition-colors duration-300 hover:border-black/[0.3] ${isOpen ? 'border-inverse' : 'border-black/[0.12]'
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`${value ? 'text-textPrimary' : 'text-textSecondary/70'}`}>
          {value || placeholder}
        </span>
        <IconChevronDown
          size={16}
          stroke={1}
          className={`text-textSecondary transition-transform duration-300 ${isOpen ? 'rotate-180 text-inverse' : 'group-hover:text-textPrimary'}`}
        />
      </div>

      <div
        className={`absolute top-full left-0 w-full mt-2 bg-background/95 backdrop-blur-xl border border-black/[0.04] rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden z-50 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] origin-top ${isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'
          }`}
      >
        <div className="max-h-[240px] overflow-y-auto py-2">
          {options.map((option, index) => (
            <div
              key={index}
              className={`px-4 py-3 text-sm cursor-pointer flex items-center justify-between transition-colors duration-200 hover:bg-black/[0.03] ${value === option ? 'text-textPrimary font-medium bg-black/[0.02]' : 'text-textSecondary'
                }`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
              {value === option && <IconCheck size={14} stroke={1} className="text-inverse" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
