import React, { useState, useRef, useEffect } from 'react';
import { IconDeviceDesktop, IconCode, IconLayersIntersect, IconSearch } from '@tabler/icons-react';
import { Translations } from '../types';
import Reveal from './Reveal';
import GridLines from './GridLines';
import Container from './Container';

interface ServicesProps {
  text: Translations['services'];
}

const Services: React.FC<ServicesProps> = ({ text }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'monitor': return <IconDeviceDesktop stroke={1} size={32} />;
      case 'code': return <IconCode stroke={1} size={32} />;
      case 'layout': return <IconLayersIntersect stroke={1} size={32} />;
      case 'search': return <IconSearch stroke={1} size={32} />;
      default: return <IconDeviceDesktop stroke={1} size={32} />;
    }
  };

  // Calculate position of the active card for the sliding background
  useEffect(() => {
    const updateHighlight = () => {
      const currentItem = itemRefs.current[activeIndex];
      if (currentItem && containerRef.current) {
        setHighlightStyle({
          left: currentItem.offsetLeft,
          top: currentItem.offsetTop,
          width: currentItem.offsetWidth,
          height: currentItem.offsetHeight,
          opacity: 1
        });
      }
    };

    updateHighlight();
    window.addEventListener('resize', updateHighlight);

    // Small delay to ensure layout is settled on initial load
    const timeout = setTimeout(updateHighlight, 100);

    return () => {
      window.removeEventListener('resize', updateHighlight);
      clearTimeout(timeout);
    };
  }, [activeIndex, text.items]);

  return (
    <section id="services" className="py-20 md:py-28 xl:py-40 relative border-b border-black/[0.04]">
      <GridLines variant="outer" />

      {/* Decorative Light */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-inverse/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2 opacity-30" />

      <Container className="relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 xl:gap-8 mb-6 md:mb-16 items-end">
          <div>

            <Reveal variant="blur-in" duration={0.8} delay={100}>
              <h2 className="font-syne font-bold text-2xl md:text-4xl lg:text-5xl text-textPrimary leading-[0.95]">
                {text.title}
              </h2>
            </Reveal>
          </div>
          <div className="xl:pl-12 xl:ml-auto">
            <Reveal variant="fade-up" duration={0.8} delay={200}>
              <p
                className="font-manrope text-textSecondary text-sm md:text-base lg:text-lg leading-relaxed text-left xl:text-right"
                dangerouslySetInnerHTML={{ __html: text.description }}
              />
            </Reveal>
          </div>
        </div>

        {/* Grid Container with Unified Border */}
        <div
          className="relative border border-black/[0.04] rounded-[1.5rem] md:rounded-[2.5rem] p-1 md:p-2 bg-surface/30 backdrop-blur-sm"
          ref={containerRef}
        >

          {/* Sliding Background Element - Hidden on Mobile */}
          <div
            className="hidden md:block absolute rounded-[2rem] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] z-0 pointer-events-none"
            style={{
              left: highlightStyle.left,
              top: highlightStyle.top,
              width: highlightStyle.width,
              height: highlightStyle.height,
              opacity: highlightStyle.opacity,
              background: 'radial-gradient(at top center, var(--e-global-color-3ba8dc3) 0%, var(--e-global-color-primary) 100%)'
            }}
          />

          {/* Grid items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-2">
            {text.items.map((service, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={service.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  className="h-full"
                >
                  <Reveal
                    variant="fade-up"
                    delay={index * 150}
                    width="100%"
                    className="h-full"
                  >
                    <div
                      onMouseEnter={() => {
                        if (window.innerWidth >= 768) setActiveIndex(index);
                      }}
                      className={`
                        group relative p-6 md:p-8 md:pt-16 md:pb-10 flex flex-col justify-between min-h-[260px] md:min-h-[380px] h-full
                        transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] rounded-[1.2rem] md:rounded-[2rem] z-10 border-0
                        
                        /* Mobile: First card has dark bg, others white */
                        ${index === 0
                          ? 'bg-[image:radial-gradient(at_top_center,var(--e-global-color-3ba8dc3)_0%,var(--e-global-color-primary)_100%)]'
                          : 'bg-white/50'}
                        
                        /* Desktop: All transparent (sliding bg handles active) */
                        md:bg-transparent md:bg-none
                        ${isActive ? 'md:scale-[1.0]' : 'md:opacity-70'}
                        `}
                    >
                      <div className="relative z-10">
                        <div className={`
                                mb-8 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                ${index === 0 ? 'bg-white text-black border-white md:bg-inverse/5 md:text-textPrimary md:border-black/[0.04]' : 'bg-inverse/5 text-textPrimary border-black/[0.04]'}
                                ${isActive ? 'md:!bg-white md:!text-black md:!border-white md:scale-110 md:shadow-[0_0_20px_rgba(255,255,255,0.2)]' : ''}
                            `}>
                          {getIcon(service.icon)}
                        </div>

                        <h3 className={`font-syne font-bold text-base md:text-xl mb-4 leading-tight transition-colors duration-500
                                ${index === 0 ? 'text-white md:text-black' : 'text-black'}
                                ${isActive ? 'md:!text-white' : ''}`}>
                          {service.title}
                        </h3>
                      </div>

                      <div className="relative z-10">
                        <p className={`font-manrope text-sm leading-relaxed transition-colors duration-500
                                ${index === 0 ? 'text-white/70 md:text-textSecondary' : 'text-textSecondary'}
                                ${isActive ? 'md:!text-gray-300' : ''}`}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </Container >
    </section >
  );
};

export default Services;
