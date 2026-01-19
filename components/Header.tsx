
import React, { useState } from 'react';
import { IconMenu, IconWorld } from '@tabler/icons-react';
import { Language, Translations } from '../types';
import Button from './Button';
import { SOCIAL_LINKS } from '../constants';
import Container from './Container';

interface HeaderProps {
  lang: Language;
  toggleLang: () => void;
  text: Translations['nav'];
  onNavigate?: (id: string) => void;
  onOpenMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, toggleLang, text, onNavigate, onOpenMenu }) => {
  const navLinks = [
    { label: text.home, href: 'home' },
    { label: text.projects, href: '#projects' },
    { label: text.about, href: '#about' },
    { label: text.contact, href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href.replace('#', ''));
    } else {
      if (href.startsWith('#')) {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Banner Header - Always Absolute */}
      <header className="absolute top-0 left-0 right-0 z-50 py-6 md:py-8">
        <Container>
          {/* Desktop Menu Container with blur */}
          <div className="hidden xl:flex items-center justify-between px-8 py-4 border rounded-full border-white/5 bg-black/5 backdrop-blur-[16px]">
            <div className="flex items-center z-50 relative">
              <a
                href="#home"
                aria-label="Home"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('home');
                  else document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <img
                  src="/imgs/logo-texto.svg"
                  alt="GustaSoares"
                  className="h-6 md:h-8 w-auto transition-all duration-300 hover:scale-105 invert"
                />
              </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href.startsWith('#') ? link.href : '#'}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-base font-syne transition-colors duration-300 relative group ${link.href === 'home' ? 'text-white' : 'text-[#9c9c9c] hover:text-white'}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="hidden xl:flex items-center gap-6">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-xs font-syne font-bold transition-colors uppercase tracking-wider text-white hover:text-white/80"
              >
                <IconWorld size={16} stroke={1.5} />
                <span>{lang}</span>
              </button>

              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // Removed preventDefault to allow external link
                }}
              >
                <Button variant="white" className="py-2.5 pl-6 pr-4 text-xs bg-gradient-to-r from-white to-gray-100">
                  {text.cta}
                </Button>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button - Calls Global Menu */}
          <div className="xl:hidden flex items-center justify-between">
            <div className="flex items-center z-50 relative">
              <a
                href="#home"
                aria-label="Home"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) onNavigate('home');
                  else document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <img
                  src="/imgs/logo-simbolo.svg"
                  alt="GustaSoares"
                  className="h-8 w-auto transition-all duration-500 invert"
                />
              </a>
            </div>
            <div className="flex items-center gap-2 z-50 relative">
              <button
                onClick={toggleLang}
                className="transition-all duration-500 flex items-center justify-center rounded-full w-12 h-12 text-white"
                aria-label="Toggle Language"
              >
                <span className="text-sm font-syne font-bold uppercase">{lang}</span>
              </button>
              <button
                onClick={onOpenMenu}
                className="transition-all duration-500 flex items-center justify-center rounded-full w-12 h-12 text-white"
                aria-label="Open menu"
              >
                <IconMenu size={24} stroke={1.5} />
              </button>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
