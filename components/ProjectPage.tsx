
import React, { useEffect, useState } from 'react';
import { ExtendedProject, Translations, Language, ProjectBlock } from '../types';
import Reveal from './Reveal';
import Button from './Button';
import Footer from './Footer';
import { ArrowUpRight } from 'lucide-react';
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
          <Reveal key={block.id} variant="fade-up" delay={100} width="100%" className="mb-12 md:mb-24">
            <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.04] shadow-2xl">
              <img src={block.content.image} alt="Full width" className="w-full h-auto object-cover" />
            </div>
          </Reveal>
        );
      case '2x1-image':
        return (
          <div key={block.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12 md:mb-24">
            <Reveal variant="fade-right" delay={100} width="100%">
              <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.04] shadow-xl">
                <img src={block.content.image} alt="Left" className="w-full h-full object-cover min-h-[300px]" />
              </div>
            </Reveal>
            <Reveal variant="fade-left" delay={200} width="100%">
              <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.04] shadow-xl">
                <img src={block.content.image2} alt="Right" className="w-full h-full object-cover min-h-[300px]" />
              </div>
            </Reveal>
          </div>
        );
      case 'text-image-left':
        return (
          <div key={block.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-center mb-12 md:mb-24">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal variant="fade-up">
                <div className="relative pl-6 md:pl-0">
                  {/* Decorative element for text blocks */}
                  <div className="hidden md:block absolute -left-12 top-0 bottom-0 w-[1px] bg-black/[0.04]" />
                  <h3 className="font-syne font-bold text-2xl mb-6">{block.content.title}</h3>
                  <p className="font-manrope text-textSecondary text-lg leading-relaxed whitespace-pre-line">
                    {block.content.text}
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Reveal variant="fade-left">
                <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.04] shadow-xl">
                  <img src={block.content.image} alt={block.content.title} className="w-full h-auto object-cover" />
                </div>
              </Reveal>
            </div>
          </div>
        );
      case 'gallery-2x2':
        return (
          <div key={block.id} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-24">
            {block.content.images?.map((img, idx) => (
              <Reveal key={idx} variant="fade-up" delay={idx * 100}>
                <div className="rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.04] shadow-lg">
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

      {/* 1. Seção Banner (Full Width) */}
      <section className="relative w-full h-[85vh] flex items-end pb-24 md:pb-32 overflow-hidden">
        {/* Background Image Container with Parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={bannerImage}
            alt={project.title}
            className="w-full h-[120%] object-cover origin-center will-change-transform"
            style={{
              transform: `translate3d(0, ${scrollY * 0.4}px, 0) scale(${1 + scrollY * 0.0005})`,
              filter: `blur(${scrollY * 0.01}px)` // Subtle blur on scroll
            }}
          />

          {/* Light Overlay for Contrast (Tom claro por cima) */}
          <div className="absolute inset-0 bg-white/40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-white/60" /> {/* General wash to lighten image */}

          {/* Gradient blending into solid background at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

          {/* Texture */}
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply" />
        </div>

        <GridLines variant="outer" />

        <div className="container mx-auto px-6 relative z-10">
          <Reveal variant="fade-up" duration={0.8}>
            <div className="max-w-4xl">
              {/* Tagline removida conforme solicitado */}
              {/* <span className="inline-block py-1 px-3 border border-black/10 rounded-full text-xs font-syne font-bold uppercase tracking-widest text-textSecondary mb-6 backdrop-blur-md bg-white/30">
                        {project.category}
                    </span> */}
              <h1 className="font-syne font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-textPrimary mb-8 drop-shadow-sm">
                {project.title}
              </h1>
              <p className="font-manrope text-lg md:text-2xl text-textSecondary font-light max-w-2xl mb-10 leading-relaxed">
                {project.descriptionShort}
              </p>

              {project.showLink && project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" className="group">
                    Visite o Site
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Seção Detalhes */}
      <section className="py-20 md:py-32 border-b border-black/[0.04]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">

            {/* Meta Info (Year & Tools) */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              <Reveal variant="fade-right" delay={100}>
                <div className="border-t border-black/[0.1] pt-6">
                  <h3 className="font-syne font-bold text-sm uppercase tracking-widest text-textSecondary mb-2">Ano</h3>
                  <p className="font-manrope text-xl text-textPrimary">{project.date}</p>
                </div>
              </Reveal>

              <Reveal variant="fade-right" delay={200}>
                <div className="border-t border-black/[0.1] pt-6">
                  <h3 className="font-syne font-bold text-sm uppercase tracking-widest text-textSecondary mb-4">Ferramentas</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-surface rounded-full text-xs font-manrope text-textPrimary/80 border border-black/[0.04]">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Long Description */}
            <div className="lg:col-span-8">
              <Reveal variant="fade-up" delay={300}>
                <h2 className="font-syne font-bold text-2xl md:text-3xl mb-8">Sobre o projeto</h2>
                <div className="font-manrope text-textSecondary text-base md:text-lg leading-relaxed space-y-6 whitespace-pre-line">
                  {project.descriptionLong}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Seção Conteúdo Dinâmico (Builder) ou Galeria Legada */}
      <section className="py-20 md:py-32 bg-surface/30">
        <div className="container mx-auto px-6">
          {/* If dynamic blocks exist, render them. Otherwise render legacy gallery */}
          {project.blocks && project.blocks.length > 0 ? (
            <div className="flex flex-col">
              {project.blocks.map((block, index) => renderBlock(block, index))}
            </div>
          ) : (
            <div className="flex flex-col gap-12 md:gap-24">
              {project.gallery.map((imgSrc, index) => (
                <Reveal key={index} variant="fade-up" delay={index * 100} width="100%">
                  <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden border border-black/[0.04] shadow-2xl group">
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
