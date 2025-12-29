
import React, { useState, useRef, useEffect } from 'react';
import { Monitor, Code2, Layers, Search, Plus } from 'lucide-react';
import { Translations } from '../types';
import Reveal from './Reveal';
import GridLines from './GridLines';

interface ServicesProps {
  text: Translations['services'];
}

const Services: React.FC<ServicesProps> = ({ text }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'monitor': return <Monitor strokeWidth={1} size={32} />;
      case 'code': return <Code2 strokeWidth={1} size={32} />;
      case 'layout': return <Layers strokeWidth={1} size={32} />;
      case 'search': return <Search strokeWidth={1} size={32} />;
      default: return <Monitor strokeWidth={1} size={32} />;
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
    <section id="services" className="py-24 md:py-40 relative border-b border-black/[0.04]">
      <GridLines variant="outer" />

      {/* Decorative Light */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-inverse/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2 opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 mb-16 md:mb-24 items-end">
          <div>
            <Reveal variant="fade-right" duration={0.6}>
                <div className="mb-4 md:mb-6 px-1">
                    <span className="block font-syne text-xs font-bold tracking-widest text-textSecondary uppercase">{text.subtitle}</span>
                </div>
            </Reveal>
            <Reveal variant="blur-in" duration={0.8} delay={100}>
                <h2 className="font-syne font-bold text-3xl md:text-5xl text-textPrimary leading-[0.95]">
                {text.title}
                </h2>
            </Reveal>
          </div>
          <div className="md:pl-12 border-l border-black/[0.04] md:border-none">
             <Reveal variant="fade-up" duration={0.8} delay={200}>
                <p className="font-manrope text-textSecondary text-base md:text-lg leading-relaxed">
                {text.description}
                </p>
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
            className="hidden md:block absolute bg-inverse rounded-[2rem] shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] z-0 pointer-events-none"
            style={{
                left: highlightStyle.left,
                top: highlightStyle.top,
                width: highlightStyle.width,
                height: highlightStyle.height,
                opacity: highlightStyle.opacity
            }}
          />

          {/* Grid items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {text.items.map((service, index) => {
              const isActive = activeIndex === index;
              
              return (
                <div 
                    key={service.id}
                    ref={(el) => { itemRefs.current[index] = el; }}
                    className="h-full"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)} // Allow tap to activate on mobile
                >
                  <Reveal 
                    variant="fade-up" 
                    delay={index * 150}
                    width="100%"
                    className="h-full"
                  >
                    <div 
                        className={`
                        group relative p-6 md:p-8 md:pt-16 md:pb-10 flex flex-col justify-between min-h-[300px] md:min-h-[380px] h-full
                        transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] rounded-[1.2rem] md:rounded-[2rem] cursor-pointer z-10
                        
                        /* Mobile Specific Styles */
                        border md:border-none
                        ${isActive 
                            ? 'bg-inverse text-white border-transparent' 
                            : 'bg-white/50 border-black/[0.04] text-textPrimary'}
                            
                        /* Desktop Specific Override (relying on sliding bg) */
                        md:bg-transparent
                        ${isActive 
                             // Logic handled by sliding bg container on desktop
                             ? 'md:scale-[1.0]' 
                             : 'md:opacity-70 md:hover:opacity-100'}
                        `}
                    >
                        <div className="relative z-10">
                            <div className={`
                                mb-8 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                ${isActive 
                                ? 'bg-white text-inverse border-white scale-100 md:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                                : 'bg-inverse/5 text-textPrimary border-black/[0.04]'}
                            `}>
                                {getIcon(service.icon)}
                            </div>
                            
                            <h3 className={`font-syne font-bold text-xl mb-4 leading-tight transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] 
                                ${isActive ? 'text-white' : 'text-textPrimary md:text-textPrimary/80'}`}>
                                {service.title}
                            </h3>
                        </div>
                        
                        <div className="relative z-10">
                            <p className={`font-manrope text-sm leading-relaxed transition-colors duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] 
                                ${isActive ? 'text-gray-300' : 'text-textSecondary'}`}>
                                {service.description}
                            </p>
                            <div className={`mt-8 flex justify-end transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] 
                                ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                                <Plus size={20} strokeWidth={1} className={`${isActive ? 'text-white' : 'text-textPrimary'} animate-pulse`} />
                            </div>
                        </div>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
