
import React, { useState, useRef, useEffect } from 'react';
import { IconBuildingSkyscraper, IconLayoutBoard, IconDeviceMobile } from '@tabler/icons-react';
import { Translations, Project } from '../types';
import Reveal from './Reveal';
import GridLines from './GridLines';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import Container from './Container';

interface ProjectsProps {
  text: Translations['projects'];
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ text, projects, onProjectClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('institutional');
  const [containerHeight, setContainerHeight] = useState<number | 'auto'>('auto');

  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    { key: 'institutional', label: text.categories.institutional, icon: IconBuildingSkyscraper },
    { key: 'landing', label: text.categories.landing, icon: IconLayoutBoard },
    { key: 'app', label: text.categories.app, icon: IconDeviceMobile },
  ];



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



  return (
    <section
      id="projects"
      className="py-20 md:py-28 xl:py-40 relative overflow-hidden bg-[linear-gradient(to_top,var(--e-global-color-3ba8dc3)_0%,var(--e-global-color-primary)_80%)] md:bg-[radial-gradient(at_bottom_center,var(--e-global-color-3ba8dc3)_0%,var(--e-global-color-primary)_80%)]"
    >
      <GridLines variant="center" inverted />

      {/* Decorative Light - Right Side - Low Intensity */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-inverse/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2 opacity-30" />

      {/* Noise Overlay */}


      <Container className="relative z-30">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 md:gap-6 xl:gap-8 pb-0 xl:pb-8 relative z-20 mb-8 md:mb-12 xl:mb-0">
          <div>
            <Reveal variant="blur-in" delay={100} duration={0.8}>
              <h2 className="font-syne font-bold text-2xl md:text-4xl lg:text-5xl text-white">
                {text.title}
              </h2>
            </Reveal>
          </div>


          {/* Filters Wrapper */}
          <Reveal variant="fade-left" delay={200} duration={0.8} className="w-full xl:w-auto relative z-40 flex xl:justify-end">
            <ProjectFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </Reveal>
        </div>
      </Container>

      <div className="w-full h-[1px] bg-white/[0.05] hidden xl:block mb-8 md:mb-12 xl:mb-20" />

      <Container className="relative z-10">
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
              <ProjectCard
                key={project.id}
                project={project}
                text={text}
                onClick={() => onProjectClick(project)}
                animationDelay={index * 150}
                inverted
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Projects;
