
import React, { useState, useEffect, useRef } from 'react';
import { IconMenu } from '@tabler/icons-react';
import { Language, Translations } from '../types';
import Button from './Button';

interface FixedHeaderProps {
    lang: Language;
    toggleLang: () => void;
    text: Translations['nav'];
    onNavigate?: (id: string) => void;
    onOpenMenu: () => void;
}

const FixedHeader: React.FC<FixedHeaderProps> = ({ lang, toggleLang, text, onNavigate, onOpenMenu }) => {
    const [isVisible, setIsVisible] = useState(false);
    const lastScrollY = useRef(0);
    const threshold = 300;

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Only activate after passing threshold
            if (currentScrollY > threshold) {
                const delta = currentScrollY - lastScrollY.current;

                // Require minimum scroll delta to prevent jitter
                if (Math.abs(delta) > 10) {
                    const isScrollingUp = delta < 0;
                    setIsVisible(isScrollingUp);
                }
            } else {
                setIsVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Local mobile menu state removed - handled globally

    return (
        <>
            {/* Fixed Desktop Header - Capsule Style */}
            <header
                className="fixed top-0 left-0 right-0 z-50 py-2 transition-all duration-500 ease-in-out xl:bg-transparent hidden xl:block"
                style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(-200%)',
                }}
            >
                <div className="w-full max-w-[1800px] mx-auto px-5 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between border rounded-full transition-all duration-300 mx-auto bg-white/85 border-black/5 backdrop-blur-md w-fit pl-8 pr-3 py-3 gap-32">
                        {/* Logo */}
                        <div className="flex items-center z-50 relative">
                            <a href="#home" aria-label="Home">
                                <img
                                    src="/imgs/logo-texto.svg"
                                    alt="GustaSoares"
                                    className="h-6 md:h-8 w-auto transition-all duration-300 hover:scale-105"
                                />
                            </a>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2">
                            {/* Contact Button */}
                            <a href="#contact">
                                <Button variant="primary" className="py-2.5 px-6 text-xs">
                                    {text.cta}
                                </Button>
                            </a>

                            {/* Burger Menu */}
                            <button
                                onClick={onOpenMenu}
                                className="flex items-center justify-center w-10 h-10 rounded-full text-textPrimary hover:bg-black/5 transition-all duration-300"
                                aria-label="Open menu"
                            >
                                <IconMenu size={24} stroke={1.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Fixed Mobile Header */}
            <header
                className="fixed top-0 left-0 right-0 z-50 py-2 bg-background/80 transition-all duration-500 ease-in-out xl:hidden"
                style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(-200%)',
                }}
            >
                <div className="w-full max-w-[1800px] mx-auto px-5 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center z-50 relative">
                            <a href="#home" aria-label="Home">
                                <img
                                    src="/imgs/logo-simbolo.svg"
                                    alt="GustaSoares"
                                    className="h-6 w-auto transition-all duration-500"
                                />
                            </a>
                        </div>
                        <div className="flex items-center gap-2 z-50 relative">
                            <button
                                onClick={toggleLang}
                                className="transition-all duration-500 flex items-center justify-center rounded-full w-10 h-10 text-textPrimary"
                                aria-label="Toggle Language"
                            >
                                <span className="text-sm font-syne font-bold uppercase">{lang}</span>
                            </button>
                            <button
                                onClick={onOpenMenu}
                                className="transition-all duration-500 flex items-center justify-center rounded-full w-10 h-10 text-textPrimary"
                                aria-label="Open menu"
                            >
                                <IconMenu size={24} stroke={1.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default FixedHeader;
