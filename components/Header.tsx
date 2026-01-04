
import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language, Translations } from '../types';
import Button from './Button';

interface HeaderProps {
  lang: Language;
  toggleLang: () => void;
  text: Translations['nav'];
}

const Header: React.FC<HeaderProps> = ({ lang, toggleLang, text }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: text.home, href: '#home' },
    { label: text.about, href: '#services' },
    { label: text.projects, href: '#projects' },
    { label: text.contact, href: '#contact' },
  ];

  const handleMobileClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'py-2 bg-background/80 backdrop-blur-md shadow-sm border-b border-black/[0.04] lg:bg-transparent lg:backdrop-blur-none lg:shadow-none lg:border-none'
          : 'py-6 md:py-8'
          }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-5 md:px-6 lg:px-8">
          {/* Desktop Menu Container with blur */}
          <div className="hidden lg:flex items-center justify-between px-8 py-4 backdrop-blur-md bg-white/5 border border-black/[0.04] rounded-full">
            <div className="flex items-center z-50 relative">
              <a href="#home" aria-label="Home">
                <img
                  src="/imgs/logo-texto.svg"
                  alt="GustaSoares"
                  className="h-6 md:h-8 w-auto transition-transform hover:scale-105 duration-300"
                />
              </a>
            </div>

            {/* Desktop Nav - Clean, no container */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-syne font-bold text-textSecondary hover:text-textPrimary transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-inverse transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-xs font-syne font-bold text-textSecondary hover:text-textPrimary transition-colors uppercase tracking-wider"
              >
                <Globe size={16} strokeWidth={1} />
                <span>{lang}</span>
              </button>

              <a href="#contact">
                <Button variant="primary" className="py-2.5 px-6 text-xs">
                  {text.cta}
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between">
            <div className="flex items-center z-50 relative">
              <a href="#home" aria-label="Home">
                <img
                  src="/imgs/logo-simbolo.svg"
                  alt="GustaSoares"
                  className={`w-auto transition-all duration-500 ${isScrolled ? 'h-6' : 'h-8'}`}
                />
              </a>
            </div>
            <div className="flex items-center gap-2 z-50 relative">
              <button
                onClick={toggleLang}
                className={`transition-all duration-500 flex items-center justify-center rounded-full ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'} ${mobileMenuOpen ? 'text-textPrimary' : 'text-textSecondary'}`}
                aria-label="Toggle Language"
              >
                <span className="text-sm font-syne font-bold uppercase">{lang}</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`transition-all duration-500 flex items-center justify-center rounded-full ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'} ${mobileMenuOpen ? 'text-textPrimary' : 'text-textPrimary'}`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Moved outside header container logically, but physically here */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleMobileClick}
              className={`text-4xl font-syne font-bold text-textPrimary hover:text-textSecondary transition-all duration-500 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div
          className={`mt-8 transition-all duration-500 delay-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
        >
          <a href="#contact" onClick={handleMobileClick}>
            <Button variant="primary" className="w-full text-lg px-8 py-4">{text.cta}</Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
