
import React, { useEffect, useState } from 'react';
import { ExtendedProject, Translations, Language, ProjectBlock } from '../types';
import Reveal from './Reveal';
import Button from './Button';
import Footer from './Footer';
import { IconArrowUpRight } from '@tabler/icons-react';
import GridLines from './GridLines';

interface ProjectPageProps {
  project: ExtendedProject;
  translations: Translations;
  socials: Record<string, string>;
  lang: Language;
  toggleLang: () => void;
  onNavigate: (sectionId: string) => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({
  project,
  translations,
  socials,
  lang,
  toggleLang,
  onNavigate
}) => {
  const [scrollY, setScrollY] = useState(0);

  // Scroll to top on mount and add scroll listener for parallax
  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use coverImage if available, fallback to thumbnail
  const bannerImage = project.coverImage || project.image;

  // Helper to render blocks
  const renderBlock = (block: ProjectBlock, index: number) => {
    switch (block.type) {
      case '1x1-image':
        return (
          <Reveal key={block.id} variant="fade-up" delay={100} width="100%" className="mb-4">
            <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.06]">
              <img src={block.content.image} alt="Full width" className="w-full h-auto object-cover" />
            </div>
          </Reveal>
        );
      case '2x1-image':
        return (
          <div key={block.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Reveal variant="fade-right" delay={100} width="100%">
              <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.06]">
                <img src={block.content.image} alt="Left" className="w-full h-full object-cover min-h-[300px]" />
              </div>
            </Reveal>
            <Reveal variant="fade-left" delay={200} width="100%">
              <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.06]">
                <img src={block.content.image2} alt="Right" className="w-full h-full object-cover min-h-[300px]" />
              </div>
            </Reveal>
          </div>
        );
      case 'text-image-left':
        return (
          <div key={block.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center mb-4">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal variant="fade-up">
                <div className="relative pl-6 md:pl-0">
                  {/* Decorative element for text blocks */}
                  <div className="hidden md:block absolute -left-12 top-0 bottom-0 w-[1px] bg-black/[0.04]" />
                  <h3 className="font-syne font-bold text-2xl mb-6">{block.content.title}</h3>
                  <p className="font-manrope text-textSecondary text-sm md:text-base lg:text-lg leading-relaxed whitespace-pre-line break-words">
                    {block.content.text}
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Reveal variant="fade-left">
                <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.06]">
                  <img src={block.content.image} alt={block.content.title} className="w-full h-auto object-cover" />
                </div>
              </Reveal>
            </div>
          </div>
        );
      case 'gallery-2x2':
        return (
          <div key={block.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {block.content.images?.map((img, idx) => (
              <Reveal key={idx} variant="fade-up" delay={idx * 100}>
                <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.06]">
                  <img src={img} alt={`Gallery ${idx}`} className="w-full h-auto object-cover aspect-square" />
                </div>
              </Reveal>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-textPrimary">
      {/* Global GridLines for entire page */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <GridLines variant="outer" />
      </div>

      {/* 1. Seção Banner (Full Width) */}
      <section
        className="relative w-full h-[60vh] md:h-[60vh] xl:h-[85vh] flex items-end pb-10 md:pb-12 xl:pb-32 overflow-hidden bg-black"
      >
        {/* Background Image Container with Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={bannerImage}
            alt={project.title}
            className="w-full h-[120%] object-cover origin-center will-change-transform grayscale opacity-100"
            style={{
              transform: `translate3d(0, ${scrollY * 0.4}px, 0) scale(${1 + scrollY * 0.0005})`,
              filter: `blur(${scrollY * 0.01}px) grayscale(100%)`
            }}
          />
        </div>

        {/* Radial Gradient Overlay - Separate Layer */}
        <div className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(to_bottom,#11111181_0%,#111111FC_50%)] md:bg-[radial-gradient(at_top_center,#11111181_0%,#111111FC_50%)]" />

        <GridLines variant="outer" inverted />

        <div className="w-full max-w-[1800px] mx-auto px-5 md:px-6 lg:px-8 relative z-10">
          <Reveal variant="fade-up" duration={0.8}>
            <div className="max-w-4xl">
              <h1 className="font-syne font-bold text-2xl md:text-4xl xl:text-6xl leading-[0.9] text-white mb-3 md:mb-6 drop-shadow-2xl">
                {project.title}
              </h1>
              <p className="font-manrope text-sm md:text-base lg:text-lg xl:text-xl text-white/70 font-light max-w-2xl mb-6 md:mb-10 leading-relaxed break-words">
                {project.descriptionShort}
              </p>

              {project.showLink && project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="group border-white/[0.2] text-white hover:!bg-white hover:!text-black hover:!border-white transition-colors duration-300">
                    Visite o Site
                    <IconArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" stroke={1.5} />
                  </Button>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Seção Detalhes */}
      <section className="pt-8 pb-0 md:pt-12 md:pb-0 xl:py-32 xl:border-b xl:border-black/[0.04]">
        <div className="w-full max-w-[1800px] mx-auto px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-[120px]">

            {/* Meta Info (Year & Tools) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <Reveal variant="fade-right" delay={100} width="100%">
                <div className="flex items-center justify-between py-4 border-b border-black/[0.08]">
                  <h3 className="font-syne font-bold text-sm md:text-base tracking-widest text-black">Ano</h3>
                  <p className="font-manrope text-sm md:text-base text-textSecondary">{project.date}</p>
                </div>
              </Reveal>

              <Reveal variant="fade-right" delay={200} width="100%">
                <div className="flex items-start justify-between py-4 border-b border-black/[0.08]">
                  <h3 className="font-syne font-bold text-sm md:text-base tracking-widest text-black">Ferramentas</h3>
                  <p className="font-manrope text-sm md:text-base text-textSecondary text-right max-w-[60%]">
                    {project.tools.join(', ')}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Long Description */}
            <div className="lg:col-span-6">
              <Reveal variant="fade-up" delay={300}>
                <div className="font-manrope text-textSecondary text-sm md:text-base lg:text-lg leading-relaxed space-y-6 whitespace-pre-wrap break-words w-full">
                  {project.descriptionLong}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Seção Conteúdo Dinâmico (Builder) ou Galeria Legada */}
      <section className="py-8 md:py-12 xl:py-32 bg-surface/30">
        <div className="w-full max-w-[1800px] mx-auto px-5 md:px-6 lg:px-8">
          {/* If dynamic blocks exist, render them. Otherwise render legacy gallery */}
          {project.blocks && project.blocks.length > 0 ? (
            <div className="flex flex-col">
              {project.blocks.map((block, index) => renderBlock(block, index))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {project.gallery.map((imgSrc, index) => (
                <Reveal key={index} variant="fade-up" delay={index * 100} width="100%">
                  <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.06] group">
                    <img
                      src={imgSrc}
                      alt={`${project.title} detail ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.2] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Rodapé Padrão */}
      <Footer
        text={translations.footer}
        navText={translations.nav}
        socials={socials}
        toggleLang={toggleLang}
        lang={lang}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default ProjectPage;
