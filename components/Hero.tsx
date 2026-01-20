
import React from 'react';
import { IconSparkles } from '@tabler/icons-react';
import { Translations } from '../types';
import Reveal from './Reveal';
import GridLines from './GridLines';
import Container from './Container';

interface HeroProps {
  text: Translations['hero'];
  variant?: 'home' | 'about';
}

// Caminhos para as imagens na pasta public/marquee/
const MARQUEE_ROW_1 = [
  "/marquee/marquee-1.webp",
  "/marquee/marquee-2.webp",
  "/marquee/marquee-3.webp",
  "/marquee/marquee-4.webp",
  "/marquee/marquee-5.webp",
  "/marquee/marquee-6.webp",
  "/marquee/marquee-7.webp"
];

// Usando as mesmas imagens em ordem invertida para o marquee inferior
const MARQUEE_ROW_2 = [
  "/marquee/marquee-7.webp",
  "/marquee/marquee-6.webp",
  "/marquee/marquee-5.webp",
  "/marquee/marquee-4.webp",
  "/marquee/marquee-3.webp",
  "/marquee/marquee-2.webp",
  "/marquee/marquee-1.webp"
];

// Custom animation style for the 'calmly passing' light
const styles = `
@keyframes float-calm {
  0% { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
  33% { transform: translate(-30%, -30%) rotate(120deg) scale(1.1); }
  66% { transform: translate(-70%, -20%) rotate(240deg) scale(0.9); }
  100% { transform: translate(-50%, -50%) rotate(360deg) scale(1); }
}
`;

const Hero: React.FC<HeroProps> = ({ text, variant = 'home' }) => {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center min-h-[100svh] w-full overflow-hidden pt-20 pb-16 md:pt-32 md:pb-32 bg-inverse"
      style={variant === 'home' ? {
        backgroundImage: 'radial-gradient(at top center, #353535 0%, #111111 100%)'
      } : undefined}
    >
      <GridLines variant="outer" inverted />

      {variant === 'about' && <style>{styles}</style>}

      {/* --- BACKGROUND VARIANTS --- */}



      {/* VARIANT: HOME (Marquee) */}
      {variant === 'home' && (
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-4 select-none pointer-events-none" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          {/* Top Marquee (Right to Left) */}
          <div className="flex-1 flex overflow-hidden relative w-full items-center">
            <div className="flex animate-marquee-left min-w-max h-full gap-6">
              {/* Original Set */}
              {MARQUEE_ROW_1.map((img, i) => (
                <div key={`t1-${i}`} className="flex-shrink-0 w-[280px] md:w-[50vh] h-full relative rounded-xl overflow-hidden bg-surface/5 border border-white/5">
                  <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale" />
                </div>
              ))}
              {/* Duplicate Set for Loop */}
              {MARQUEE_ROW_1.map((img, i) => (
                <div key={`t2-${i}`} className="flex-shrink-0 w-[280px] md:w-[50vh] h-full relative rounded-xl overflow-hidden bg-surface/5 border border-white/5">
                  <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Marquee (Left to Right) */}
          <div className="flex-1 flex overflow-hidden relative w-full items-center">
            <div className="flex animate-marquee-right min-w-max h-full gap-6">
              {/* Original Set */}
              {MARQUEE_ROW_2.map((img, i) => (
                <div key={`b1-${i}`} className="flex-shrink-0 w-[280px] md:w-[50vh] h-full relative rounded-xl overflow-hidden bg-surface/5 border border-white/5">
                  <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale" />
                </div>
              ))}
              {/* Duplicate Set for Loop */}
              {MARQUEE_ROW_2.map((img, i) => (
                <div key={`b2-${i}`} className="flex-shrink-0 w-[280px] md:w-[50vh] h-full relative rounded-xl overflow-hidden bg-surface/5 border border-white/5">
                  <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gradient Overlay Above Marquee */}
      {variant === 'home' && (
        <div
          className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(to_bottom,#111111e3_0%,#111111FC_50%)] md:bg-[radial-gradient(at_top_center,#111111e3_0%,#111111FC_50%)]"
        />
      )}





      {/* VARIANT: ABOUT (Clean Grid & Left Align) */}
      {variant === 'about' && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {/* Detailed Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

          {/* Subtle noise */}
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />

          {/* Gradient masking for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
      )}

      {/* --- END OF BACKGROUND VARIANTS --- */}







      <Container className={`relative z-10 flex flex-col items-center flex-grow justify-center ${variant === 'about' ? 'md:items-start md:text-left' : 'text-center'}`}>

        {/* Content Wrapper */}
        <div className={`flex-grow flex flex-col justify-center w-full max-w-5xl mt-12 md:mt-20 ${variant === 'about' ? 'items-start' : 'items-center'}`}>
          {/* Tagline - No Reveal wrapper to preserve backdrop-blur */}
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-1.5 md:py-2.5 rounded-full border-white/5 bg-black/5 backdrop-blur-[16px] border mb-6 md:mb-12 hover:bg-white/[0.15] hover:scale-105 transition-all duration-300 relative z-20 animate-scale-in">
            <IconSparkles size={10} className="text-white md:w-[14px] md:h-[14px]" stroke={1} />
            <span className="text-[9px] md:text-xs font-syne font-bold tracking-[0.15em] md:tracking-[0.2em] text-white/90 uppercase leading-none">
              {text.tagline}
            </span>
          </div>

          {/* Title */}
          <Reveal variant="blur-in" duration={1} delay={200}>
            <h1 className="font-syne font-bold text-3xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-center mb-6 md:mb-8 relative z-20 drop-shadow-2xl text-white">
              {text.title}
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal variant="fade-up" duration={0.8} delay={400}>
            <p className="font-manrope text-white/70 text-sm md:text-base lg:text-lg text-center max-w-2xl mb-10 md:mb-12 relative z-20 leading-relaxed font-light">
              {text.description}
            </p>
          </Reveal>
        </div>

        {/* Scroll Indicator - Anchored at bottom (Only Home) */}
        {variant === 'home' && (
          <Reveal variant="fade-up" delay={800} duration={1} className="overflow-visible z-50">
            <a
              href="#services"
              className="group flex flex-col items-center gap-4 pt-8 md:pt-0 p-6 transition-opacity duration-300 transform-gpu"
              aria-label={text.scrollIndicator}
            >
              {/* Mouse Body - Desktop: mouse icon, Mobile: chevron pulse */}
              <div className="hidden md:flex w-[20px] h-[32px] rounded-full border border-white/30 justify-center p-1 box-border transition-all duration-300 transform-gpu group-hover:border-white group-hover:translate-y-2">
                {/* Scroll Wheel */}
                <div className="w-0.5 h-1.5 bg-white rounded-full animate-scroll" />
              </div>
              {/* Mobile: Simple chevron with pulse */}
              <div className="flex md:hidden flex-col items-center gap-1 animate-bounce">
                <div className="w-10 h-10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </a>
          </Reveal>
        )}
      </Container>
    </section>
  );
};
export default Hero;
