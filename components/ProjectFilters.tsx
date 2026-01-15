import React, { useState, useRef, useEffect } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

interface Category {
    key: string;
    label: string;
}

interface ProjectFiltersProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ categories, activeCategory, onCategoryChange }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Sliding Indicator Logic for Desktop
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const updateIndicator = () => {
            const activeIndex = categories.findIndex(c => c.key === activeCategory);
            const activeTab = tabsRef.current[activeIndex];

            if (activeTab) {
                setIndicatorStyle({
                    left: activeTab.offsetLeft,
                    width: activeTab.offsetWidth
                });
            }
        };

        updateIndicator();
        window.addEventListener('resize', updateIndicator);

        // Small timeout to ensure fonts/layout are stable
        const timeout = setTimeout(updateIndicator, 100);

        return () => {
            window.removeEventListener('resize', updateIndicator);
            clearTimeout(timeout);
        };
    }, [activeCategory, categories]);

    const currentLabel = categories.find(c => c.key === activeCategory)?.label || 'All';

    return (
        <div className="w-full xl:w-auto relative z-40 flex xl:justify-end">
            {/* MOBILE/TABLET: Dropdown */}
            <div className="block xl:hidden w-full relative" ref={mobileMenuRef}>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`
                        w-full flex items-center justify-between px-6 py-3.5 rounded-2xl
                        backdrop-blur-md border 
                        text-white transition-all duration-300 group
                        ${isMobileMenuOpen
                            ? 'border-white/10 bg-[#1E1E1E]'
                            : 'bg-[#1E1E1E] border-transparent'}
                    `}
                >
                    <span className="font-manrope font-semibold text-sm tracking-wide">
                        {currentLabel}
                    </span>
                    <IconChevronDown
                        size={20}
                        className={`text-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                        stroke={1.5}
                    />
                </button>

                {/* Mobile Dropdown Options */}
                <div className={`
                    absolute top-full right-0 mt-3 w-full
                    bg-[#1E1E1E] border border-white/10
                    rounded-2xl shadow-xl
                    overflow-hidden z-50 origin-top-right transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${isMobileMenuOpen
                        ? 'opacity-100 scale-100 translate-y-0 visible'
                        : 'opacity-0 scale-95 -translate-y-4 invisible pointer-events-none'}
                `}>
                    <div className="p-2 space-y-1">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat.key;
                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => {
                                        onCategoryChange(cat.key);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`
                                        w-full px-5 py-3.5 rounded-xl flex items-center text-left transition-all duration-200
                                        ${isActive
                                            ? 'bg-[#262626] text-white'
                                            : 'text-white/60 hover:bg-white/[0.05] hover:text-white'}
                                    `}
                                >
                                    <span className={`font-manrope text-sm tracking-wide ${isActive ? 'font-bold' : 'font-medium'}`}>
                                        {cat.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* DESKTOP: Horizontal Button Group */}
            <div className="hidden xl:flex items-center p-1.5 bg-[#1E1E1E] rounded-full gap-1 relative">
                {/* Sliding Background Indicator */}
                <div
                    className="absolute top-1.5 bottom-1.5 bg-[#262626] rounded-full transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                        left: `${indicatorStyle.left}px`,
                        width: `${indicatorStyle.width}px`,
                        opacity: indicatorStyle.width > 0 ? 1 : 0
                    }}
                />

                {categories.map((cat, index) => {
                    const isActive = activeCategory === cat.key;
                    return (
                        <button
                            key={cat.key}
                            ref={el => { tabsRef.current[index] = el }}
                            onClick={() => onCategoryChange(cat.key)}
                            className={`
                                px-6 py-2.5 rounded-full text-sm font-manrope font-semibold capitalize tracking-wide transition-colors duration-200 relative z-10
                                ${isActive
                                    ? 'text-white'
                                    : 'text-white/50 hover:text-white'}
                            `}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ProjectFilters;

