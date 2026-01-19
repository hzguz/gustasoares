
import React, { useState, useEffect, useRef } from 'react';
import { IconMenu } from '@tabler/icons-react';
import { Language, Translations } from '../types';
import Button from './Button';

import { createPortal } from 'react-dom';
import { SOCIAL_LINKS } from '../constants';
import Container from './Container';

interface FixedHeaderProps {
    lang: Language;
    toggleLang: () => void;
    text: Translations['nav'];
    onNavigate?: (id: string) => void;
    onOpenMenu: () => void;
}

const FixedHeader: React.FC<FixedHeaderProps> = ({ lang, toggleLang, text, onNavigate, onOpenMenu }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            const delta = currentScrollY - lastScrollY.current;

            // Activate after passing smaller threshold
            if (currentScrollY > 100) {
                // Show on any upward scroll, hide on down
                if (Math.abs(delta) > 0) {
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

    if (!mounted) return null;

    return createPortal(
        <>
            {/* Fixed Desktop Header - Capsule Style */}
            <header
                className="fixed top-0 left-0 right-0 z-[90] py-2 transition-all duration-500 ease-in-out xl:bg-transparent hidden xl:block"
                style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(-200%)',
                }}
            >
                <Container>
                    <div className="flex items-center justify-between border rounded-full transition-all duration-300 mx-auto bg-white/85 border-black/5 backdrop-blur-md w-fit pl-8 pr-3 py-3 gap-32">
                        {/* Logo */}
                        <div className="flex items-center z-50 relative">
                            <a
                                href="#home"
                                aria-label="Home"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate?.('home');
                                }}
                            >
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
                            <a
                                href={SOCIAL_LINKS.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    // Removed preventDefault and navigation to allow normal link behavior
                                }}
                            >
                                <Button variant="primary" className="py-2.5 px-6 text-xs bg-gradient-to-r from-[#353535] to-[#111111]">
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
                </Container>
            </header>

            {/* Fixed Mobile Header */}
            <header
                className="fixed top-0 left-0 right-0 z-[90] py-3 bg-white/90 backdrop-blur-md border-b border-black/5 transition-all duration-500 ease-in-out xl:hidden"
                style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(-200%)',
                }}
            >
                <Container>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center z-50 relative">
                            <a
                                href="#home"
                                aria-label="Home"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate?.('home');
                                }}
                            >
                                <img
                                    src="/imgs/logo-simbolo.svg"
                                    alt="GustaSoares"
                                    className="h-7 md:h-8 w-auto transition-all duration-500"
                                />
                            </a>
                        </div>
                        <div className="flex items-center gap-1 z-50 relative">
                            <button
                                onClick={toggleLang}
                                className="transition-all duration-500 flex items-center justify-center rounded-full w-10 h-10 text-textPrimary hover:bg-black/5"
                                aria-label="Toggle Language"
                            >
                                <span className="text-sm font-syne font-bold uppercase">{lang}</span>
                            </button>
                            <button
                                onClick={onOpenMenu}
                                className="transition-all duration-500 flex items-center justify-center rounded-full w-10 h-10 text-textPrimary hover:bg-black/5"
                                aria-label="Open menu"
                            >
                                <IconMenu size={24} stroke={1.5} />
                            </button>
                        </div>
                    </div>
                </Container>
            </header>
        </>,
        document.body
    );
};

export default FixedHeader;
