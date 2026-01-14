
import React from 'react';
import { IconArrowLeft, IconMenu2 } from '@tabler/icons-react';
import { Translations } from '../types';

interface ProjectHeaderProps {
  onBack: () => void;
  onNavigate: (sectionId: string) => void;
  navText: Translations['nav'];
  onOpenMenu: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ onBack, onNavigate, navText, onOpenMenu }) => {
  // Local state removed - using Global Mobile Menu

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 py-6 md:py-8">
        <div className="w-full max-w-[1800px] mx-auto px-5 md:px-6 lg:px-8">
          {/* Desktop Container with blur */}
          <div className="hidden xl:flex items-center justify-between px-8 py-4 backdrop-blur-md border border-white/[0.1] rounded-full transition-all duration-300 bg-black/20">

            {/* 1. Back Button */}
            <button
              onClick={onBack}
              className="group flex items-center gap-2 text-white hover:text-white/80 transition-colors relative z-50"
            >
              <div className="p-2 rounded-full border border-white/[0.2] group-hover:bg-white group-hover:text-black transition-all duration-300">
                <IconArrowLeft size={20} stroke={1.5} />
              </div>
              <span className="hidden md:block font-syne font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                Voltar
              </span>
            </button>

            {/* 2. Centered Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              <button onClick={onBack} aria-label="Home" className="flex items-center">
                <svg
                  width="239"
                  height="241"
                  viewBox="0 0 239 241"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-auto text-white transition-transform hover:scale-105 duration-300"
                >
                  <path d="M238.484 196.9C238.484 202.942 233.548 207.839 227.459 207.839H155.73C149.641 207.839 144.704 202.942 144.704 196.9C144.704 190.859 149.641 185.962 155.73 185.962H208.362L195.631 164.084L182.9 142.206L170.169 120.328L157.435 98.4505L119.243 32.8168L106.511 54.6946L68.318 120.328L55.5843 142.206L42.8533 164.084L30.1222 185.962H82.7543C88.8435 185.962 93.7805 190.859 93.7805 196.9C93.7805 202.942 88.8435 207.839 82.7543 207.839H11.0257C4.93658 207.839 0 202.942 0 196.9C0 195.011 0.482194 193.237 1.33191 191.685C1.34955 191.65 1.37013 191.615 1.39071 191.58L1.58477 191.247L1.59652 191.227L4.6602 185.962L30.1222 142.206L42.8533 120.328L55.5843 98.4505L68.318 76.5724L106.511 10.9389L109.548 5.72324C109.566 5.68824 109.587 5.65323 109.607 5.61823L109.802 5.28568L109.813 5.26526C111.748 2.10902 115.246 0 119.243 0C123.238 0 126.737 2.10902 128.671 5.26526L128.683 5.28568L128.877 5.61823C128.898 5.65323 128.919 5.68824 128.936 5.72324L131.973 10.9389L157.435 54.6946L170.169 76.5724L182.9 98.4505L195.631 120.328L233.824 185.962L236.888 191.227L236.9 191.247L237.094 191.58C237.115 191.615 237.135 191.65 237.152 191.685C238.003 193.237 238.484 195.011 238.484 196.9Z" fill="currentColor" />
                  <path d="M82.7581 240.656C88.8473 240.656 93.7837 235.759 93.7837 229.718C93.7837 223.676 88.8473 218.779 82.7581 218.779C76.6683 218.779 71.7324 223.676 71.7324 229.718C71.7324 235.759 76.6683 240.656 82.7581 240.656Z" fill="currentColor" />
                  <path d="M119.238 240.656C125.327 240.656 130.264 235.759 130.264 229.718C130.264 223.676 125.327 218.779 119.238 218.779C113.149 218.779 108.212 223.676 108.212 229.718C108.212 235.759 113.149 240.656 119.238 240.656Z" fill="currentColor" />
                  <path d="M155.73 240.656C161.819 240.656 166.756 235.759 166.756 229.718C166.756 223.676 161.819 218.779 155.73 218.779C149.64 218.779 144.705 223.676 144.705 229.718C144.705 235.759 149.64 240.656 155.73 240.656Z" fill="currentColor" />
                </svg>
              </button>
            </div>

            {/* 3. Burger Menu */}
            <div>
              <button
                onClick={onOpenMenu}
                className="p-2 text-white hover:text-white/80 transition-colors relative z-50"
              >
                <IconMenu2 size={24} stroke={1} />
              </button>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="xl:hidden flex items-center justify-between">
            {/* 1. Back Button */}
            <button
              onClick={onBack}
              className="group flex items-center gap-2 text-white hover:text-white/80 transition-colors relative z-50"
            >
              <div className="p-2 rounded-full border border-white/[0.2] group-hover:bg-white group-hover:text-black transition-all duration-300">
                <IconArrowLeft size={20} stroke={1.5} />
              </div>
            </button>

            {/* 2. Centered Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              <button onClick={onBack} aria-label="Home" className="flex items-center">
                <svg
                  width="239"
                  height="241"
                  viewBox="0 0 239 241"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-auto text-white transition-transform hover:scale-105 duration-300"
                >
                  <path d="M238.484 196.9C238.484 202.942 233.548 207.839 227.459 207.839H155.73C149.641 207.839 144.704 202.942 144.704 196.9C144.704 190.859 149.641 185.962 155.73 185.962H208.362L195.631 164.084L182.9 142.206L170.169 120.328L157.435 98.4505L119.243 32.8168L106.511 54.6946L68.318 120.328L55.5843 142.206L42.8533 164.084L30.1222 185.962H82.7543C88.8435 185.962 93.7805 190.859 93.7805 196.9C93.7805 202.942 88.8435 207.839 82.7543 207.839H11.0257C4.93658 207.839 0 202.942 0 196.9C0 195.011 0.482194 193.237 1.33191 191.685C1.34955 191.65 1.37013 191.615 1.39071 191.58L1.58477 191.247L1.59652 191.227L4.6602 185.962L30.1222 142.206L42.8533 120.328L55.5843 98.4505L68.318 76.5724L106.511 10.9389L109.548 5.72324C109.566 5.68824 109.587 5.65323 109.607 5.61823L109.802 5.28568L109.813 5.26526C111.748 2.10902 115.246 0 119.243 0C123.238 0 126.737 2.10902 128.671 5.26526L128.683 5.28568L128.877 5.61823C128.898 5.65323 128.919 5.68824 128.936 5.72324L131.973 10.9389L157.435 54.6946L170.169 76.5724L182.9 98.4505L195.631 120.328L233.824 185.962L236.888 191.227L236.9 191.247L237.094 191.58C237.115 191.615 237.135 191.65 237.152 191.685C238.003 193.237 238.484 195.011 238.484 196.9Z" fill="currentColor" />
                  <path d="M82.7581 240.656C88.8473 240.656 93.7837 235.759 93.7837 229.718C93.7837 223.676 88.8473 218.779 82.7581 218.779C76.6683 218.779 71.7324 223.676 71.7324 229.718C71.7324 235.759 76.6683 240.656 82.7581 240.656Z" fill="currentColor" />
                  <path d="M119.238 240.656C125.327 240.656 130.264 235.759 130.264 229.718C130.264 223.676 125.327 218.779 119.238 218.779C113.149 218.779 108.212 223.676 108.212 229.718C108.212 235.759 113.149 240.656 119.238 240.656Z" fill="currentColor" />
                  <path d="M155.73 240.656C161.819 240.656 166.756 235.759 166.756 229.718C166.756 223.676 161.819 218.779 155.73 218.779C149.64 218.779 144.705 223.676 144.705 229.718C144.705 235.759 149.64 240.656 155.73 240.656Z" fill="currentColor" />
                </svg>
              </button>
            </div>

            {/* 3. Burger Menu */}
            <div>
              <button
                onClick={onOpenMenu}
                className="p-2 text-white hover:text-white/80 transition-colors relative z-50"
              >
                <IconMenu2 size={24} stroke={1} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default ProjectHeader;
