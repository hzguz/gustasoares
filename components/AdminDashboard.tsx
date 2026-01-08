
import React, { useState } from 'react';
import { ExtendedProject } from '../types';
import Button from './Button';
import { Plus, Edit3, Trash2, LogOut, Building2, PanelTop, Smartphone, LayoutGrid, Eye } from 'lucide-react';
import Reveal from './Reveal';
import GridLines from './GridLines';

interface AdminDashboardProps {
    projects: ExtendedProject[];
    onCreate: () => void;
    onEdit: (project: ExtendedProject) => void;
    onDelete: (id: string) => void;
    onLogout: () => void;
    onSeed: () => void;
    onView?: (project: ExtendedProject) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ projects, onCreate, onEdit, onDelete, onLogout, onSeed, onView }) => {
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories = [
        { key: 'all', label: 'Todos', icon: LayoutGrid },
        { key: 'institutional', label: 'Institucional', icon: Building2 },
        { key: 'landing', label: 'Landing Pages', icon: PanelTop },
        { key: 'app', label: 'Aplicativos', icon: Smartphone },
    ];

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-24 pb-24 relative">
            <GridLines variant="outer" />
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-black/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-black/[0.015] to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10 px-6">
                {/* Premium Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-6 pb-8">
                    <Reveal variant="fade-right">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] text-[10px] font-syne font-bold tracking-widest text-textSecondary uppercase mb-4">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                Painel Ativo
                            </span>
                            <h1 className="font-syne font-bold text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 bg-clip-text text-transparent">
                                Gerenciamento
                            </h1>
                        </div>
                    </Reveal>
                    <Reveal variant="fade-left">
                        <div className="flex items-center gap-3">
                            {projects.length === 0 && (
                                <Button onClick={onSeed} variant="secondary" className="gap-2">
                                    Importar Exemplo
                                </Button>
                            )}
                            <Button onClick={onCreate} variant="primary" className="gap-2 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 transition-shadow">
                                <Plus size={18} /> Novo Projeto
                            </Button>
                            <button
                                onClick={onLogout}
                                className="p-3 rounded-full bg-white border border-black/[0.06] hover:bg-red-50 hover:border-red-100 text-textSecondary hover:text-red-500 transition-all shadow-sm"
                                title="Sair"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </Reveal>
                </div>

                {/* Category Filter */}
                <Reveal variant="fade-up" delay={100}>
                    <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-black/[0.04] w-fit shadow-sm">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.key;
                            const count = cat.key === 'all'
                                ? projects.length
                                : projects.filter(p => p.category === cat.key).length;

                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => setActiveCategory(cat.key)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-full text-xs font-syne font-bold uppercase tracking-wide transition-all duration-300
                                        ${isActive
                                            ? 'bg-black text-white shadow-md'
                                            : 'text-textSecondary hover:text-textPrimary hover:bg-black/[0.04]'
                                        }
                                    `}
                                >
                                    <Icon size={14} />
                                    {cat.label}
                                    <span className={`
                                        ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold
                                        ${isActive ? 'bg-white/20 text-white' : 'bg-black/[0.06] text-textSecondary'}
                                    `}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 gap-5">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="w-full bg-white/90 backdrop-blur-sm border border-black/[0.04] p-5 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-xl hover:shadow-black/[0.06] transition-all duration-300 group hover:-translate-y-0.5">
                            {/* Thumbnail with Preview Overlay */}
                            <div className="relative w-full md:w-52 md:flex-shrink-0 h-36 rounded-xl overflow-hidden border border-black/[0.04] shadow-inner group/thumb">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                                />
                                {/* Hover Overlay with Eye Icon */}
                                {onView && (
                                    <button
                                        onClick={() => onView(project)}
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                                        title="Visualizar projeto"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 transition-transform duration-300 group-hover/thumb:scale-110">
                                            <Eye size={22} className="text-white" strokeWidth={1.5} />
                                        </div>
                                    </button>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="font-syne font-bold text-xl mb-3 text-textPrimary group-hover:text-black transition-colors">{project.title}</h3>
                                <div className="flex items-center justify-center md:justify-start gap-3">
                                    <span className="px-3 py-1.5 rounded-full bg-black/[0.03] text-[10px] font-bold uppercase tracking-widest text-textSecondary">
                                        {project.category}
                                    </span>
                                    <span className="text-xs font-manrope text-textSecondary/70">
                                        {project.date}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-4 md:pt-0 w-full md:w-auto justify-center md:opacity-70 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => onEdit(project)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 text-xs font-bold uppercase tracking-wide shadow-sm"
                                >
                                    <Edit3 size={14} /> Editar
                                </button>
                                <button
                                    onClick={() => {
                                        if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
                                            onDelete(project.id);
                                        }
                                    }}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-200 rounded-full text-red-500 hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-wide"
                                >
                                    <Trash2 size={14} /> Excluir
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
