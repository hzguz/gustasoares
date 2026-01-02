
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, LayoutGrid, Building2, PanelTop, Smartphone, ChevronDown, Check } from 'lucide-react';
import { Translations, Project } from '../types';
import Reveal from './Reveal';
import GridLines from './GridLines';

interface ProjectsProps {
  text: Translations['projects'];
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ text, projects, onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, top: 0, height: 0 });
  const [containerHeight, setContainerHeight] = useState<number | 'auto'>('auto');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const pillContainerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const categories = [
    { key: 'all', label: text.categories.all, icon: LayoutGrid },
    { key: 'institutional', label: text.categories.institutional, icon: Building2 },
    { key: 'landing', label: text.categories.landing, icon: PanelTop },
    { key: 'app', label: text.categories.app, icon: Smartphone },
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Effect to animate the sliding pill - Enhanced for wrap handling and Resize
  useEffect(() => {
    const updatePillPosition = () => {
      // Only calculate if desktop container is visible
      if (!pillContainerRef.current || pillContainerRef.current.offsetParent === null) return;

      const activeIndex = categories.findIndex(c => c.key === activeCategory);
      const activeButton = buttonsRef.current[activeIndex];
      const container = pillContainerRef.current;

      if (activeButton && container) {
        setIndicatorStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
          top: activeButton.offsetTop,
          height: activeButton.offsetHeight
        });
      }
    };

    // Update on category change
    updatePillPosition();

    // Update on window resize (fixes orientation changes or resizing)
    window.addEventListener('resize', updatePillPosition);

    // Small timeout to ensure layout is settled (e.g., after font load)
    const timeout = setTimeout(updatePillPosition, 100);

    return () => {
      window.removeEventListener('resize', updatePillPosition);
      clearTimeout(timeout);
    };
  }, [activeCategory, text.categories]);

  // Effect to measure and animate container height
  useEffect(() => {
    if (gridRef.current) {
      const updateHeight = () => {
        if (gridRef.current) {
          setContainerHeight(gridRef.current.scrollHeight);
        }
      };

      updateHeight();
      const resizeObserver = new ResizeObserver(() => {
        updateHeight();
      });

      resizeObserver.observe(gridRef.current);
      return () => resizeObserver.disconnect();
    }
  }, [activeCategory, projects]);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const currentLabel = categories.find(c => c.key === activeCategory)?.label || text.categories.all;

  return (
    <section id="projects" className="py-24 md:py-40 relative overflow-hidden">
      <GridLines variant="center" />

      {/* Decorative Light - Right Side - Low Intensity */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-inverse/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-30" />

      <div className="w-full lg:container mx-auto px-5 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8 border-b border-black/[0.04] pb-8 relative z-20">
          <div>
            <Reveal variant="fade-right" duration={0.6}>
              <div className="mb-4 md:mb-6 px-1">
                <span className="block font-syne text-xs font-bold tracking-widest text-textSecondary uppercase">{text.subtitle}</span>
              </div>
            </Reveal>
            <Reveal variant="blur-in" delay={100} duration={0.8}>
              <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-textPrimary">
                {text.title}
              </h2>
            </Reveal>
          </div>

          {/* Filters Wrapper - High Z-Index to stay above project images */}
          <Reveal variant="fade-left" delay={200} duration={0.8} className="w-full xl:w-auto relative z-40 flex md:justify-end">

            {/* MOBILE: Custom Button-like Dropdown */}
            <div className="block xl:hidden w-full sm:w-auto relative" ref={mobileMenuRef}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`
                    w-full sm:w-[240px] flex items-center justify-between px-6 py-3.5 rounded-full 
                    bg-white/50 backdrop-blur-md border border-black/[0.08] 
                    text-textPrimary transition-all duration-300 group
                    hover:border-black/[0.2] hover:bg-white/80 hover:shadow-lg
                    ${isMobileMenuOpen
                    ? 'shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-black/[0.2] bg-white'
                    : 'shadow-sm'}
                  `}
              >
                <span className="font-syne font-bold text-sm uppercase tracking-wide">
                  {currentLabel}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-textPrimary transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                  strokeWidth={1.5}
                />
              </button>

              {/* Mobile Dropdown Options */}
              <div className={`
                    absolute top-full right-0 mt-3 w-full sm:w-[280px]
                    bg-white/90 backdrop-blur-xl border border-white/20 
                    rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] 
                    overflow-hidden z-50 origin-top-right transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ring-1 ring-black/[0.05]
                    ${isMobileMenuOpen
                  ? 'opacity-100 scale-100 translate-y-0 visible'
                  : 'opacity-0 scale-95 -translate-y-4 invisible pointer-events-none'}
                `}>
                <div className="p-2 space-y-1">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.key;
                    return (
                      <button
                        key={cat.key}
                        onClick={() => {
                          setActiveCategory(cat.key);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`
                              w-full px-5 py-3.5 rounded-2xl flex items-center justify-between text-left transition-all duration-200 group
                              ${isActive
                            ? 'bg-inverse text-inverseSurface shadow-md translate-x-1'
                            : 'text-textSecondary hover:bg-black/[0.04] hover:text-textPrimary'}
                            `}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={`transition-colors ${isActive ? 'text-inverseSurface' : 'text-textSecondary group-hover:text-textPrimary'}`} />
                          <span className={`font-manrope text-sm font-medium tracking-wide ${isActive ? 'font-bold' : ''}`}>
                            {cat.label}
                          </span>
                        </div>

                        {isActive && (
                          <Check size={16} className="text-inverseSurface animate-in fade-in zoom-in duration-300" strokeWidth={2.5} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* DESKTOP: Animated Pill Tabs */}
            <div
              ref={pillContainerRef}
              className="hidden xl:flex relative flex-wrap items-center p-1.5 bg-white rounded-[2rem] border border-black/[0.04] w-full lg:w-auto"
            >
              {/* The sliding background pill */}
              <div
                className="absolute bg-inverse rounded-full shadow-[0_0_15px_rgba(var(--inverse),0.3)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  left: indicatorStyle.left,
                  width: indicatorStyle.width,
                  top: indicatorStyle.top,
                  height: indicatorStyle.height
                }}
              />

              {categories.map((cat, index) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    ref={(el) => { buttonsRef.current[index] = el; }}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`
                        relative z-10 px-4 md:px-6 py-2.5 rounded-full text-[10px] md:text-xs font-syne font-bold uppercase tracking-wide flex items-center justify-center gap-2 transition-all duration-300 group flex-1 md:flex-none
                        ${isActive
                        ? 'text-inverseSurface'
                        : 'text-textSecondary hover:text-textPrimary hover:bg-black/[0.05]'}
                        `}
                  >
                    {isActive && (
                      <Icon size={14} className="animate-in fade-in zoom-in duration-300 hidden sm:block" strokeWidth={1} />
                    )}
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Smooth Height Container */}
        <div
          className="transition-[height] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-hidden relative z-10"
          style={{ height: containerHeight === 'auto' ? 'auto' : `${containerHeight}px` }}
        >
          <div
            ref={gridRef}
            key={activeCategory} // Forces re-render for entry animation
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 md:gap-y-16"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group cursor-pointer animate-fade-in-up fill-mode-forwards opacity-0"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => onProjectClick(project)}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/2] overflow-hidden bg-surface mb-6 md:mb-8 border border-black/[0.04] md:group-hover:border-inverse/20 transition-colors rounded-2xl z-0">
                  <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 md:group-hover:opacity-0 opacity-0 md:opacity-0" />
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105"
                  />

                  {/* Tech Corners - Hidden on mobile, visible on desktop hover */}
                  <div className="hidden md:block absolute top-0 left-0 w-3 h-3 border-t border-l border-inverse/30 z-20 transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:translate-y-4 rounded-tl-lg" />
                  <div className="hidden md:block absolute bottom-0 right-0 w-3 h-3 border-b border-r border-inverse/30 z-20 transition-all duration-500 ease-out group-hover:-translate-x-4 group-hover:-translate-y-4 rounded-br-lg" />
                  <div className="hidden md:block absolute bottom-0 left-0 w-3 h-3 border-b border-l border-inverse/30 z-20 transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:-translate-y-4 rounded-bl-lg" />

                  {/* Arrow - Always visible on mobile in corner, fade in on desktop */}
                  <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur text-white p-2 md:p-3 rounded-full 
                        opacity-100 translate-y-0
                        md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 
                        transition-all duration-300 border border-white/10">
                    <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1} />
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2 pl-4 border-l-2 border-transparent group-hover:border-inverse transition-colors duration-300">
                  <h3 className="font-syne font-bold text-xl md:text-2xl text-textPrimary group-hover:translate-x-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="font-manrope text-textSecondary text-xs uppercase tracking-widest">
                      {project.date}
                    </span>
                    <span className="w-1 h-1 bg-textSecondary rounded-full" />
                    <span className="font-manrope text-textSecondary text-xs uppercase tracking-widest text-textPrimary/80">
                      {text.categories[project.category as keyof typeof text.categories] || project.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
