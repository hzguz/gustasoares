
import React from 'react';
import { Translations, Language } from '../types';
import { Globe, ArrowUpRight } from 'lucide-react';
import { IconBrandLinkedin, IconBrandBehance, IconBrandWhatsapp } from '@tabler/icons-react';

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
      onNavigate(href);
    }
  };

  return (
    <footer className="relative text-textPrimary overflow-hidden border-t border-black/[0.04]">

      {/* Background Elements - Reduced Intensity */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="animate-float-horizontal">
          <div className="relative w-[500px] h-[500px] md:w-[800px] md:h-[800px] filter blur-[80px] md:blur-[120px] contrast-[150%] opacity-10 mix-blend-screen animate-liquid-rotate">
            <div className="absolute top-0 left-20 w-[60%] h-[60%] bg-inverse rounded-full animate-liquid-shape mix-blend-screen" />
            <div className="absolute bottom-0 right-20 w-[55%] h-[55%] bg-inverse rounded-full animate-liquid-shape mix-blend-screen animation-delay-2000" style={{ animationDirection: 'alternate-reverse' }} />
            <div className="absolute bottom-20 left-10 w-[40%] h-[40%] bg-inverse/80 rounded-full animate-blob mix-blend-screen" />
          </div>
        </div>
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-noise opacity-40 mix-blend-multiply" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Main Grid Layout - Equal Top/Bottom Padding (Large) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 py-20 md:py-40">

          {/* Left Column: Big CTA */}
          <div className="lg:col-span-7 flex flex-col justify-center lg:pr-12">
            <h2 className="font-syne font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-8 md:mb-12">
              {text.titlePart1} <br />
              <span className="text-textSecondary">{text.titlePart2}</span>
            </h2>

            {/* Updated Button: Transparent BG, Smaller Font/Icon, Only Border */}
            <a
              href={`mailto:${socials.email}`}
              className="group w-fit relative inline-flex items-center gap-4 px-6 py-3 rounded-full bg-transparent border border-black/[0.1] transition-all duration-500 hover:border-inverse"
            >
              <span className="font-manrope text-base font-medium text-textPrimary tracking-tight transition-colors duration-500 group-hover:text-textPrimary">
                {text.emailButtonText}
              </span>
              <div className="w-8 h-8 bg-inverse rounded-full flex items-center justify-center text-inverseSurface transition-all duration-500 group-hover:scale-110 group-hover:rotate-45 shadow-[0_0_10px_rgba(var(--inverse),0.2)]">
                <ArrowUpRight size={16} strokeWidth={1} />
              </div>
            </a>
          </div>

          {/* Right Column: Navigation & Social Grid - Using Lines instead of Containers */}
          <div className="lg:col-span-5 flex flex-col md:flex-row lg:border-l border-black/[0.04] gap-12 md:gap-0">

            {/* Navigation Column */}
            <div className="flex-1 lg:pl-12 py-2 flex flex-col gap-6 md:gap-8">
              <h3 className="font-syne font-bold text-xs uppercase tracking-widest text-textSecondary flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-textPrimary rounded-full" />
                {text.navTitle}
              </h3>
              <nav className="flex flex-col gap-4">
                {[
                  { l: navText.home, h: '#home' },
                  { l: navText.about, h: '#services' },
                  { l: navText.projects, h: '#projects' },
                  { l: navText.contact, h: '#contact' }
                ].map((item, index) => (
                  <a
                    key={item.h}
                    href={item.h}
                    onClick={(e) => handleNavClick(e, item.h)}
                    className="group flex items-center gap-3 text-sm font-manrope text-textPrimary/70 hover:text-textPrimary transition-colors w-fit"
                  >
                    <span className="text-[10px] font-mono text-textSecondary group-hover:text-textPrimary transition-colors">0{index + 1}</span>
                    <span className="relative">
                      {item.l}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-textPrimary transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Social Column - Separated by Line on MD+ */}
            <div className="flex-1 lg:pl-12 md:border-l border-black/[0.04] py-2 md:mt-0 flex flex-col gap-6 md:gap-8">
              <h3 className="font-syne font-bold text-xs uppercase tracking-widest text-textSecondary flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-textPrimary rounded-full" />
                {text.socialTitle}
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: IconBrandLinkedin, link: socials.linkedin, label: 'LinkedIn' },
                  { icon: IconBrandBehance, link: socials.behance, label: 'Behance' },
                  { icon: IconBrandWhatsapp, link: socials.whatsapp, label: 'WhatsApp' },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-4 text-textPrimary/70 hover:text-textPrimary transition-colors w-fit"
                  >
                    {/* Fixed Width/Height Container to maintain border size while shrinking icon */}
                    <div className="w-8 h-8 flex items-center justify-center border border-black/[0.04] rounded-full group-hover:bg-inverse group-hover:text-inverseSurface transition-all duration-300">
                      <social.icon size={14} stroke={1} />
                    </div>
                    <span className="font-manrope text-sm group-hover:translate-x-1 transition-transform">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bottom Bar - Equal Top/Bottom Padding (Smaller) */}
        <div className="border-t border-black/[0.04] flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-8 md:gap-6 relative z-10 py-8 md:py-12">
          <div className="flex flex-col gap-2">
            <p className="font-manrope font-medium text-textPrimary/60 text-xs uppercase tracking-widest">
              GustaSoares © {currentYear}
            </p>
            <p className="font-manrope text-xs text-textSecondary max-w-md">
              {text.description}
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 text-xs font-syne font-bold text-textPrimary hover:text-textSecondary transition-colors uppercase tracking-widest group px-4 py-2 border border-black/[0.04] rounded-full hover:bg-inverse/5"
            >
              <Globe size={14} className="group-hover:rotate-180 transition-transform duration-500" strokeWidth={1} />
              <span>{lang === 'pt' ? 'EN' : 'PT'}</span>
            </button>
            {/* Visible Admin Link (Temporary) */}
            <button
              onClick={onAdminClick}
              className="text-xs font-bold text-textPrimary bg-black/5 px-4 py-2 rounded-full hover:bg-black/10 transition-colors"
            >
              Acesso Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
