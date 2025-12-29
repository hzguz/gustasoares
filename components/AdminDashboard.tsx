
import React from 'react';
import { ExtendedProject } from '../types';
import Button from './Button';
import { Plus, Edit3, Trash2, LogOut } from 'lucide-react';
import Reveal from './Reveal';
import GridLines from './GridLines';

interface AdminDashboardProps {
    projects: ExtendedProject[];
    onCreate: () => void;
    onEdit: (project: ExtendedProject) => void;
    onDelete: (id: string) => void;
    onLogout: () => void;
    onSeed: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ projects, onCreate, onEdit, onDelete, onLogout, onSeed }) => {
    return (
        <div className="min-h-screen bg-background pt-24 pb-24 relative">
            <GridLines variant="outer" />
            <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10 px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 border-b border-black/[0.04] pb-8">
                    <Reveal variant="fade-right">
                        <div>
                            <span className="block font-syne text-xs font-bold tracking-widest text-textSecondary uppercase mb-2">Gerenciamento</span>
                            <h1 className="font-syne font-bold text-4xl md:text-5xl">Painel Admin</h1>
                        </div>
                    </Reveal>
                    <Reveal variant="fade-left">
                        <div className="flex items-center gap-4">
                            {projects.length === 0 && (
                                <Button onClick={onSeed} variant="secondary" className="gap-2">
                                    Importar Exemplo
                                </Button>
                            )}
                            <Button onClick={onCreate} variant="primary" className="gap-2">
                                <Plus size={18} /> Novo Projeto
                            </Button>
                            <button
                                onClick={onLogout}
                                className="p-3 rounded-full border border-black/[0.1] hover:bg-black/[0.05] text-textSecondary hover:text-textPrimary transition-colors"
                                title="Sair"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </Reveal>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {projects.map((project, idx) => (
                        <Reveal key={project.id} variant="fade-up" delay={idx * 50}>
                            <div className="bg-surface/50 backdrop-blur-sm border border-black/[0.04] p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-all duration-300 group">
                                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden border border-black/[0.04]">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="font-syne font-bold text-xl mb-2 text-textPrimary">{project.title}</h3>
                                    <div className="flex items-center justify-center md:justify-start gap-3">
                                        <span className="px-3 py-1 rounded-full bg-white border border-black/[0.04] text-[10px] font-bold uppercase tracking-widest text-textSecondary">
                                            {project.category}
                                        </span>
                                        <span className="text-xs font-manrope text-textSecondary">
                                            {project.date}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-3 border-t md:border-t-0 border-black/[0.04] pt-4 md:pt-0 w-full md:w-auto justify-center">
                                    <button
                                        onClick={() => onEdit(project)}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-black/[0.1] rounded-full hover:bg-black hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-wide"
                                    >
                                        <Edit3 size={14} /> Editar
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
                                                onDelete(project.id);
                                            }
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 bg-white border border-red-100 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-wide"
                                    >
                                        <Trash2 size={14} /> Excluir
                                    </button>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
