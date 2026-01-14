
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
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setIsVisible(false), 500); // Wait for exit animation
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const handleLinkClick = (id: string) => {
        onNavigate(id);
        onClose();
    };

    const links = [
        { id: 'home', label: navText.home },
        { id: '#about', label: navText.about },
        { id: '#projects', label: navText.projects },
        { id: '#contact', label: navText.contact },
    ];

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col bg-white/95 backdrop-blur-2xl transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
        >
            {/* Header Area */}
            <div className="flex items-center justify-between p-6 md:p-8">
                {/* Language Toggle */}
                <button
                    onClick={toggleLang}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                >
                    <IconWorld size={20} stroke={1.5} className="text-textPrimary" />
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
                    <IconX size={24} stroke={1.5} />
                </button>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 px-6">
                {links.map((link, index) => (
                    <button
                        key={link.id}
                        onClick={() => handleLinkClick(link.id)}
                        className={`group relative text-5xl md:text-6xl font-syne font-bold text-textPrimary transition-all duration-500 transform pb-2 ${isOpen
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
                            <IconBrandLinkedin size={20} stroke={1.5} />
                        </a>
                        <a href={socials.behance} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:scale-110 transition-transform text-textPrimary">
                            <IconBrandBehance size={20} stroke={1.5} />
                        </a>
                        <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:scale-110 transition-transform text-textPrimary">
                            <IconBrandWhatsapp size={20} stroke={1.5} />
                        </a>
                    </div>

                    <a href={`mailto:${socials.email}`} className="text-sm font-manrope font-medium text-textSecondary hover:text-textPrimary transition-colors">
                        {socials.email}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
