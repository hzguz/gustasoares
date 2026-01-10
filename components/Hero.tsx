
import React from 'react';
import { MousePointer2 } from 'lucide-react';
import { Translations } from '../types';
import Reveal from './Reveal';
import GridLines from './GridLines';

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
    <section id="home" className="relative flex flex-col items-center min-h-[100svh] w-full overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32">
      <GridLines variant="outer" />

      {variant === 'about' && <style>{styles}</style>}

      {/* --- BACKGROUND VARIANTS --- */}

      {/* VARIANT: HOME (Marquee) */}
      {variant === 'home' && (
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-4 opacity-15 select-none pointer-events-none mix-blend-multiply" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
          {/* Top Marquee (Right to Left) */}
          <div className="flex-1 flex overflow-hidden relative w-full items-center">
            <div className="flex animate-marquee-left min-w-max h-full gap-6">
              {/* Original Set */}
              {MARQUEE_ROW_1.map((img, i) => (
                <div key={`t1-${i}`} className="flex-shrink-0 w-[40vh] md:w-[50vh] h-full relative rounded-xl overflow-hidden bg-surface border border-black/10">
                  <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
              ))}
              {/* Duplicate Set for Loop */}
              {MARQUEE_ROW_1.map((img, i) => (
                <div key={`t2-${i}`} className="flex-shrink-0 w-[40vh] md:w-[50vh] h-full relative rounded-xl overflow-hidden bg-surface border border-black/10">
                  <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Marquee (Left to Right) */}
          <div className="flex-1 flex overflow-hidden relative w-full items-center">
            <div className="flex animate-marquee-right min-w-max h-full gap-6">
              {/* Original Set */}
              {MARQUEE_ROW_2.map((img, i) => (
                <div key={`b1-${i}`} className="flex-shrink-0 w-[40vh] md:w-[50vh] h-full relative rounded-xl overflow-hidden bg-surface border border-black/10">
                  <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
              ))}
              {/* Duplicate Set for Loop */}
              {MARQUEE_ROW_2.map((img, i) => (
                <div key={`b2-${i}`} className="flex-shrink-0 w-[40vh] md:w-[50vh] h-full relative rounded-xl overflow-hidden bg-surface border border-black/10">
                  <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}



      {/* VARIANT: ABOUT (Clean Grid & Left Align) */}
      {variant === 'about' && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {/* Detailed Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

          {/* Subtle noise */}
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />

          {/* Gradient masking for depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>
      )}

      {/* --- END OF BACKGROUND VARIANTS --- */}

      {/* Background Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(at top center, #ffffff85 20%, #ffffffff 55%)' }}
      />

      {/* Soft dark lighting from bottom-left corner (Only for Home) */}
      {variant === 'home' && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom left, rgba(0,0,0,0.08) 0%, transparent 50%)'
          }}
        />
      )}

      {/* NOISE OVERLAY FOR HOME - Must be after gradient overlays */}
      {variant === 'home' && (
        <div className="absolute inset-0 z-[5] pointer-events-none select-none opacity-30 bg-noise" />
      )}

      <div className={`w-full max-w-[1800px] mx-auto px-5 md:px-6 lg:px-8 relative z-10 flex flex-col items-center flex-grow justify-center ${variant === 'about' ? 'md:items-start md:text-left' : 'text-center'}`}>

        {/* Content Wrapper */}
        <div className={`flex-grow flex flex-col justify-center w-full max-w-5xl ${variant === 'about' ? 'items-start' : 'items-center'}`}>
          {/* Tagline Refined */}
          <Reveal variant="scale-in" duration={0.6}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/[0.06] backdrop-blur-md mb-8 md:mb-12 hover:bg-black/[0.1] hover:scale-105 transition-all duration-300">
              <MousePointer2 size={12} className="text-textPrimary" strokeWidth={1} />
              <span className="text-[10px] font-syne font-bold tracking-[0.2em] text-textSecondary uppercase leading-none">
                {text.tagline}
              </span>
            </div>
          </Reveal>

          {/* Title */}
          <Reveal variant="blur-in" duration={1} delay={200}>
            <h1 className="font-syne font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-textPrimary mb-6 md:mb-10 tracking-tighter drop-shadow-2xl">
              {text.title}
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal variant="fade-up" duration={0.8} delay={400}>
            <p className="font-manrope text-textSecondary text-sm sm:text-lg md:text-xl max-w-2xl leading-relaxed font-light px-4">
              {text.description}
            </p>
          </Reveal>
        </div>

        {/* Scroll Indicator - Anchored at bottom (Only Home) */}
        {variant === 'home' && (
          <Reveal variant="fade-up" delay={800} duration={1}>
            <a
              href="#services"
              className="group flex flex-col items-center gap-4 text-textSecondary hover:text-textPrimary transition-colors duration-300 pt-12 md:pt-0"
            >
              <div className="h-12 md:h-16 w-[1px] bg-gradient-to-b from-transparent via-inverse/10 to-inverse/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-inverse blur-[2px] animate-shimmer-down" />
              </div>
              <span className="text-xs uppercase tracking-widest font-syne opacity-50 group-hover:opacity-100 transition-opacity">{text.scrollIndicator}</span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
};
export default Hero;
