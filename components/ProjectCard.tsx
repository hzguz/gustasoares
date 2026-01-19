import React from 'react';
import { IconArrowUpRight } from '@tabler/icons-react';
import { Project, Translations } from '../types';
import { useImageColor } from '../lib/useImageColor';

interface ProjectCardProps {
    project: Project;
    text: Translations['projects'];
    onClick: () => void;
    animationDelay: number;
    inverted?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, text, onClick, animationDelay, inverted = false }) => {
    const { borderColor } = useImageColor(project.image);

    return (
        <div
            className="group cursor-pointer animate-fade-in-up fill-mode-forwards opacity-0"
            style={{ animationDelay: `${animationDelay}ms` }}
            onClick={onClick}
        >
            {/* Image Container */}
            <div
                className={`relative aspect-[3/2] overflow-hidden ${inverted ? 'bg-transparent' : 'bg-surface'} mb-6 md:mb-8 border transition-colors rounded-2xl z-0`}
                style={{
                    borderColor: inverted ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.04)',
                    background: inverted ? 'radial-gradient(at top center, var(--e-global-color-3ba8dc3) 0%, var(--e-global-color-primary) 100%)' : undefined
                }}
            >
                <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 md:group-hover:opacity-0 opacity-0 md:opacity-0" />
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
                />

                {/* Tech Corners - Cor adaptativa baseada na imagem */}
                <div
                    className="hidden md:block absolute top-0 left-0 w-3 h-3 border-t border-l z-20 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:translate-x-4 group-hover:translate-y-4 rounded-tl-lg"
                    style={{ borderColor }}
                />
                <div
                    className="hidden md:block absolute bottom-0 right-0 w-3 h-3 border-b border-r z-20 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:-translate-x-4 group-hover:-translate-y-4 rounded-br-lg"
                    style={{ borderColor }}
                />
                <div
                    className="hidden md:block absolute bottom-0 left-0 w-3 h-3 border-b border-l z-20 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:translate-x-4 group-hover:-translate-y-4 rounded-bl-lg"
                    style={{ borderColor }}
                />

                {/* Arrow - Always visible on mobile in corner, fade in on desktop */}
                <div className="absolute top-4 right-4 z-20 bg-black/80 backdrop-blur text-white p-2 md:p-3 rounded-full 
              opacity-100 translate-y-0
              md:opacity-0 md:-translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 
              transition-all duration-300 border border-white/10">
                    <IconArrowUpRight className="w-4 h-4 md:w-5 md:h-5" stroke={1.5} />
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-2 pl-0 md:pl-4 border-l-2 border-transparent md:group-hover:border-white transition-colors duration-300">
                <h3 className={`font-syne font-bold text-lg md:text-xl lg:text-2xl ${inverted ? 'text-white' : 'text-textPrimary'} md:group-hover:translate-x-1 transition-transform duration-300`}>
                    {project.title}
                </h3>
                <div className="flex items-center gap-4">
                    <span className={`font-manrope ${inverted ? 'text-white/60' : 'text-textSecondary'} text-xs uppercase tracking-widest`}>
                        {project.date}
                    </span>
                    <span className={`w-1 h-1 ${inverted ? 'bg-white/60' : 'bg-textSecondary'} rounded-full`} />
                    <span className={`font-manrope ${inverted ? 'text-white/60' : 'text-textSecondary'} text-xs uppercase tracking-widest ${inverted ? 'text-white/80' : 'text-textPrimary/80'}`}>
                        {text.categories[project.category as keyof typeof text.categories] || project.category}
                    </span>
                </div>
            </div>
        </div>
    );
};

// Memoize to prevent re-renders when props haven't changed
export default React.memo(ProjectCard, (prevProps, nextProps) => {
    return (
        prevProps.project.id === nextProps.project.id &&
        prevProps.animationDelay === nextProps.animationDelay &&
        prevProps.inverted === nextProps.inverted
    );
});
