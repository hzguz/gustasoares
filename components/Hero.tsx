
import React from 'react';
import { MousePointer2 } from 'lucide-react';
import { Translations } from '../types';
import Reveal from './Reveal';
import GridLines from './GridLines';

interface HeroProps {
  text: Translations['hero'];
}

// Caminhos locais para as imagens da pasta marquee.
// Certifique-se de que as imagens 1.jpg a 7.jpg existam na pasta public/marquee/
const MARQUEE_ROW_1 = [
  "components/marquee/marquee-1.webp",
  "components/marquee/marquee-2.webp",
  "components/marquee/marquee-3.webp",
  "components/marquee/marquee-4.webp",
  "components/marquee/marquee-5.webp",
  "components/marquee/marquee-6.webp",
  "components/marquee/marquee-7.webp"
];

// Usando as mesmas imagens em ordem invertida para o marquee inferior
const MARQUEE_ROW_2 = [
  "components/marquee/marquee-7.webp",
  "components/marquee/marquee-6.webp",
  "components/marquee/marquee-5.webp",
  "components/marquee/marquee-4.webp",
  "components/marquee/marquee-3.webp",
  "components/marquee/marquee-2.webp",
  "components/marquee/marquee-1.webp"
];

const Hero: React.FC<HeroProps> = ({ text }) => {
  return (
    <section id="home" className="relative flex flex-col items-center min-h-[100svh] w-full overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32">

      {/* --- START OF MARQUEE BACKGROUND --- */}
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
      {/* --- END OF MARQUEE BACKGROUND --- */}

      {/* Background Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(at top center, #ffffff85 20%, #ffffffff 55%)' }}
      />

      {/* Soft dark lighting from bottom-left corner */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom left, rgba(0,0,0,0.08) 0%, transparent 50%)'
        }}
      />

      <div className="w-full lg:container mx-auto px-5 md:px-6 relative z-10 text-center flex flex-col items-center flex-grow justify-center">

        {/* Content Wrapper - Centered in available space */}
        <div className="flex-grow flex flex-col items-center justify-center w-full max-w-5xl">
          {/* Tagline Refined - No border, slightly darker bg */}
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
            <h1 className="font-syne font-bold text-4xl sm:text-5xl md:text-5xl lg:text-7xl leading-[1.1] text-textPrimary mb-8 md:mb-10 tracking-tighter drop-shadow-2xl">
              {text.title}
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal variant="fade-up" duration={0.8} delay={400}>
            <p className="font-manrope text-textSecondary text-base sm:text-lg md:text-lg lg:text-xl max-w-2xl leading-relaxed font-light px-4">
              {text.description}
            </p>
          </Reveal>
        </div>

        {/* Scroll Indicator - Anchored at bottom */}
        <Reveal variant="fade-up" delay={800} duration={1}>
          <a
            href="#services"
            className="group flex flex-col items-center gap-4 text-textSecondary hover:text-textPrimary transition-colors duration-300 pt-12 md:pt-0"
          >
            <div className="h-12 md:h-16 w-[1px] bg-gradient-to-b from-transparent via-inverse/10 to-inverse/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-inverse blur-[2px] animate-shimmer-down" />
            </div>
            <span className="text-xs uppercase tracking-widest font-syne opacity-50 group-hover:opacity-100 transition-opacity">Saiba mais</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
