
import React, { useEffect, useState } from 'react';
import { IconX, IconArrowRight, IconBrandLinkedin, IconBrandBehance, IconBrandWhatsapp, IconMail, IconWorld } from '@tabler/icons-react';
import { Language, Translations } from '../types';
import Button from './Button';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navText: Translations['nav'];
    socials: {
        linkedin: string;
        behance: string;
        whatsapp: string;
        email: string;
    };
    onNavigate: (id: string) => void;
    lang: Language;
    toggleLang: () => void;
}

import { createPortal } from 'react-dom';

const MobileMenu: React.FC<MobileMenuProps> = ({
    isOpen,
    onClose,
    navText,
    socials,
    onNavigate,
    lang,
    toggleLang
}) => {
    // Animation state
    const [mounted, setMounted] = useState(false); // Hydration safety
    const [shouldAnimate, setShouldAnimate] = useState(false); // Delayed animation trigger

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Use setTimeout to ensure the closed state is painted before animating
            const timer = setTimeout(() => {
                setShouldAnimate(true);
            }, 50);
            return () => clearTimeout(timer);
        } else {
            setShouldAnimate(false);
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    if (!mounted) return null;

    const handleLinkClick = (id: string) => {
        onNavigate(id.replace('#', ''));
        onClose();
    };

    const links = [
        { id: 'home', label: navText.home },
        { id: '#projects', label: navText.projects },
        { id: '#about', label: navText.about },
        { id: '#contact', label: navText.contact },
    ];

    return createPortal(
        <div
            className={`fixed inset-0 z-[100] flex flex-col bg-white/95 backdrop-blur-2xl origin-top-right ${isOpen
                ? 'pointer-events-auto'
                : 'pointer-events-none'
                }`}
            style={{
                clipPath: shouldAnimate
                    ? 'circle(150% at calc(100% - 48px) 48px)'
                    : 'circle(0% at calc(100% - 48px) 48px)',
                transition: 'clip-path 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
        >
            {/* Header Area */}
            <div className="flex items-center justify-between p-6 md:p-8">
                {/* Language Toggle */}
                <button
                    onClick={toggleLang}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                >
                    <IconWorld size={18} stroke={1.5} className="text-textPrimary" />
                    <span className="text-sm font-syne font-bold uppercase text-textPrimary tracking-wider">
                        {lang}
                    </span>
                </button>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="p-3 rounded-full bg-black/5 hover:bg-black/10 text-textPrimary hover:rotate-90 transition-all duration-300"
                    aria-label="Close menu"
                >
                    <IconX size={22} stroke={1.5} />
                </button>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-5 md:gap-8 px-6">
                {links.map((link, index) => (
                    <button
                        key={link.id}
                        onClick={() => handleLinkClick(link.id)}
                        className={`group relative text-4xl md:text-6xl font-syne font-bold text-textPrimary transition-all duration-500 transform pb-2 ${isOpen
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-12 opacity-0'
                            }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <span className="relative z-10 transition-colors duration-300 group-hover:text-textSecondary">
                            {link.label}
                        </span>
                        {/* Hover underline effect */}
                        <span className="absolute left-0 bottom-0 w-0 h-1 bg-inverse transition-all duration-300 group-hover:w-full" />
                    </button>
                ))}
            </nav>

            {/* Footer Area: CTA and Socials */}
            <div
                className={`p-6 md:p-8 flex flex-col gap-8 transition-all duration-700 delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    }`}
            >
                {/* Social Links */}
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <div className="flex gap-4">
                        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:scale-110 transition-transform text-textPrimary">
                            <IconBrandLinkedin size={16} stroke={1.5} />
                        </a>
                        <a href={socials.behance} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:scale-110 transition-transform text-textPrimary">
                            <IconBrandBehance size={16} stroke={1.5} />
                        </a>
                        <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:scale-110 transition-transform text-textPrimary">
                            <IconBrandWhatsapp size={16} stroke={1.5} />
                        </a>
                    </div>

                    <a href={`mailto:${socials.email}`} className="text-xs font-manrope font-medium text-textSecondary hover:text-textPrimary transition-colors">
                        {socials.email}
                    </a>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default MobileMenu;
