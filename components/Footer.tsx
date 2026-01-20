
import React from 'react';
import { Translations, Language } from '../types';
import { IconWorld, IconArrowUpRight, IconBrandLinkedin, IconBrandBehance, IconBrandWhatsapp } from '@tabler/icons-react';
import { getWhatsAppLink, WHATSAPP_MESSAGES } from '../constants';
import GridLines from './GridLines';
import Container from './Container';

interface FooterProps {
  text: Translations['footer'];
  navText: Translations['nav'];
  socials: Record<string, string>;
  toggleLang: () => void;
  lang: Language;
  onNavigate?: (sectionId: string) => void;
  onAdminClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ text, navText, socials, toggleLang, lang, onNavigate, onAdminClick }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href.replace('#', ''));
    }
  };

  return (
    <footer
      className="relative text-white overflow-hidden border-t border-white/[0.05] bg-[linear-gradient(to_top,var(--e-global-color-3ba8dc3)_0%,var(--e-global-color-primary)_80%)] md:bg-[radial-gradient(at_bottom_center,var(--e-global-color-3ba8dc3)_0%,var(--e-global-color-primary)_80%)]"
    >

      {/* Background Elements - Reduced Intensity */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">

        {/* Noise Overlay */}

      </div>

      <GridLines variant="outer" inverted />

      <Container className="relative z-10">

        {/* Main Grid Layout - Equal Top/Bottom Padding (Large) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 py-20 md:py-28 xl:py-40">

          {/* Left Column: Big CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pr-12">
            <h2 className="font-syne font-bold text-2xl md:text-4xl lg:text-7xl leading-[0.95] tracking-tight mb-6 md:mb-12 text-white">
              {text.titlePart1} <br />
              <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">{text.titlePart2}</span>
            </h2>

            {/* Updated Button: Transparent BG, Smaller Font/Icon, Only Border */}
            <a
              href={getWhatsAppLink(WHATSAPP_MESSAGES.footer)}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-fit relative inline-flex items-center gap-2 md:gap-4 pl-4 md:pl-6 pr-2 md:pr-3 py-2 md:py-3 rounded-full bg-transparent border border-white/[0.1] transition-all duration-500 hover:bg-white hover:border-white"
            >
              <span className="font-syne text-sm font-medium text-white tracking-tight transition-colors duration-500 group-hover:text-black">
                {text.emailButtonText}
              </span>
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center text-black transition-all duration-500 group-hover:scale-110 group-hover:rotate-45 group-hover:bg-black group-hover:text-white shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                <IconArrowUpRight size={14} className="md:hidden" stroke={1} />
                <IconArrowUpRight size={16} className="hidden md:block" stroke={1} />
              </div>
            </a>
          </div>

          {/* Right Column: Navigation & Social Grid - Using Lines instead of Containers */}
          <div className="lg:col-span-5 flex flex-col md:flex-row lg:border-l border-white/[0.05] gap-12 md:gap-0">

            {/* Navigation Column */}
            <div className="flex-1 lg:pl-12 py-2 flex flex-col gap-6 md:gap-8">
              <h3 className="font-syne font-bold text-xs uppercase tracking-widest text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                {text.navTitle}
              </h3>
              <nav className="flex flex-col gap-4">
                {[
                  { l: navText.home, h: '#home' },
                  { l: navText.projects, h: '#projects' },
                  { l: navText.about, h: '#about' },
                  { l: navText.contact, h: '#contact' }
                ].map((item, index) => (
                  <a
                    key={item.h}
                    href={item.h}
                    onClick={(e) => handleNavClick(e, item.h)}
                    className="group flex items-center gap-3 text-sm font-manrope text-white/70 hover:text-white transition-colors w-fit"
                  >
                    <span className="text-[10px] font-mono text-white/40 group-hover:text-white transition-colors">0{index + 1}</span>
                    <span className="relative">
                      {item.l}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Social Column - Separated by Line on MD+ */}
            <div className="flex-1 lg:pl-12 lg:border-l border-white/[0.05] py-2 md:mt-0 flex flex-col gap-6 md:gap-8">
              <h3 className="font-syne font-bold text-xs uppercase tracking-widest text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                {text.socialTitle}
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: IconBrandLinkedin, link: socials.linkedin, label: 'LinkedIn' },
                  { icon: IconBrandBehance, link: socials.behance, label: 'Behance' },
                  { icon: IconBrandWhatsapp, link: getWhatsAppLink(WHATSAPP_MESSAGES.social), label: 'WhatsApp' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 text-white/70 hover:text-white transition-colors w-fit"
                  >
                    {/* Fixed Width/Height Container to maintain border size while shrinking icon */}
                    <div className="w-8 h-8 flex items-center justify-center border border-white/[0.05] rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <social.icon size={14} stroke={1} />
                    </div>
                    <span className="font-manrope text-sm group-hover:translate-x-1 transition-transform">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </Container>

      {/* Full Width Border */}
      <div className="w-full h-[1px] bg-white/[0.05] relative z-10" />

      <Container className="relative z-10">
        {/* Footer Bottom Bar */}
        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8 md:gap-6 py-8 md:py-12">
          <div className="flex flex-col gap-2">
            <p className="font-manrope font-medium text-white/80 text-xs uppercase tracking-widest">
              GustaSoares © {currentYear}
            </p>
            <p className="font-manrope text-xs text-white/60 max-w-md">
              {text.description}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-xs font-syne font-bold text-white hover:text-white/80 transition-colors uppercase tracking-widest group px-4 py-2 border border-white/[0.05] rounded-full hover:bg-white/5"
            >
              <IconWorld size={14} className="group-hover:rotate-180 transition-transform duration-500" stroke={1} />
              <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
