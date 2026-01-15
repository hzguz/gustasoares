
import React, { useState } from 'react';
import { ExtendedProject, ProjectBlock } from '../types';
import Button from './Button';
import { IconArrowLeft, IconDeviceFloppy, IconSquare, IconColumns, IconLayout, IconTrash } from '@tabler/icons-react';
import GridLines from './GridLines';
import ImageUpload from './ImageUpload';
import { generateSlug } from '../lib/utils';

interface AdminEditorProps {
    project?: ExtendedProject | null;
    onSave: (project: ExtendedProject) => void;
    onCancel: () => void;
}

// Clean input wrapper matching Contact form style
const InputGroup = ({ label, children }: React.PropsWithChildren<{ label: string }>) => (
    <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-widest text-textSecondary font-syne">
            {label}
        </label>
        {children}
    </div>
);

const styles = {
    input: "w-full bg-white/80 border border-black/[0.08] rounded-xl px-5 py-3.5 font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20 transition-all placeholder:text-textSecondary/50",
    textarea: "w-full bg-white/80 border border-black/[0.08] rounded-xl px-5 py-3.5 font-manrope text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black/20 transition-all resize-y min-h-[100px] placeholder:text-textSecondary/50"
};

const AdminEditor: React.FC<AdminEditorProps> = ({ project, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Partial<ExtendedProject>>(
        project || {
            title: '',
            category: 'landing',
            date: new Date().getFullYear().toString(),
            image: '',
            coverImage: '',
            descriptionShort: '',
            descriptionLong: '',
            tools: [],
            showLink: false,
            link: '',
            gallery: [],
            blocks: []
        }
    );

    const [toolsInput, setToolsInput] = useState(project?.tools.join(', ') || '');

    const handleChange = (field: keyof ExtendedProject, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addBlock = (type: ProjectBlock['type']) => {
        const newBlock: ProjectBlock = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            content: {
                image: '',
                image2: type === '2x1-image' ? '' : undefined,
                title: type === 'text-image-left' ? 'Novo Título' : undefined,
                text: type === 'text-image-left' ? 'Insira seu texto aqui...' : undefined
            }
        };
        setFormData(prev => ({
            ...prev,
            blocks: [...(prev.blocks || []), newBlock]
        }));
    };

    const removeBlock = (id: string) => {
        setFormData(prev => ({
            ...prev,
            blocks: prev.blocks?.filter(b => b.id !== id)
        }));
    };

    const updateBlock = (id: string, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            blocks: prev.blocks?.map(b => b.id === id ? { ...b, content: { ...b.content, [field]: value } } : b)
        }));
    };

    const handleSave = () => {
        if (!formData.title) return alert("Título é obrigatório");

        const finalProject: ExtendedProject = {
            id: formData.id || String(Date.now()),
            slug: formData.slug || generateSlug(formData.title!),
            title: formData.title!,
            category: formData.category || 'landing',
            date: formData.date || '2025',
            image: formData.image || '',
            coverImage: formData.coverImage || formData.image || '',
            descriptionShort: formData.descriptionShort || '',
            descriptionLong: formData.descriptionLong || '',
            tools: toolsInput.split(',').map(t => t.trim()).filter(t => t),
            showLink: formData.showLink || false,
            link: formData.link || '',
            gallery: formData.gallery || [],
            blocks: formData.blocks || []
        };
        onSave(finalProject);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-24 pb-40 relative">
            <GridLines variant="outer" />
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-black/[0.02] to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-black/[0.015] to-transparent rounded-full blur-3xl pointer-events-none" />


            <div className="container mx-auto max-w-4xl px-6 relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 border-b border-black/[0.04] pb-8 bg-background/95 backdrop-blur-sm sticky top-20 z-40 rounded-b-2xl">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button onClick={onCancel} className="p-2 hover:bg-black/[0.05] rounded-full transition-colors text-textSecondary hover:text-textPrimary">
                            <IconArrowLeft size={24} stroke={1.5} />
                        </button>
                        <h2 className="font-syne font-bold text-2xl md:text-3xl">{project ? 'Editar Projeto' : 'Novo Projeto'}</h2>
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={onCancel}
                            className="flex-1 md:flex-none px-6 py-3 font-syne text-xs font-bold uppercase hover:text-red-500 transition-colors border border-transparent hover:border-red-100 rounded-full"
                        >
                            Cancelar
                        </button>
                        <Button onClick={handleSave} variant="primary" className="flex-1 md:flex-none gap-2">
                            <IconDeviceFloppy size={18} stroke={1.5} /> Salvar
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-12">

                    {/* 1. Informações Básicas */}
                    <div className="bg-white/80 backdrop-blur-sm border border-black/[0.04] p-8 rounded-[1.5rem] shadow-sm">
                        <h3 className="font-syne font-bold text-lg mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center text-xs font-bold">1</div>
                            Informações Principais
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <InputGroup label="Título">
                                <input type="text" value={formData.title} onChange={e => handleChange('title', e.target.value)} className={styles.input} />
                            </InputGroup>
                            <InputGroup label="Ano">
                                <input type="text" value={formData.date} onChange={e => handleChange('date', e.target.value)} className={styles.input} />
                            </InputGroup>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <InputGroup label="Categoria">
                                <select value={formData.category} onChange={e => handleChange('category', e.target.value)} className={styles.input}>
                                    <option value="landing">Landing Page</option>
                                    <option value="institutional">Institucional</option>
                                    <option value="app">App / Dashboard</option>
                                </select>
                            </InputGroup>
                            <InputGroup label="Ferramentas (sep. vírgula)">
                                <input type="text" value={toolsInput} onChange={e => setToolsInput(e.target.value)} className={styles.input} />
                            </InputGroup>
                        </div>

                        <div className="mb-6">
                            <InputGroup label="Descrição Curta">
                                <textarea rows={2} value={formData.descriptionShort} onChange={e => handleChange('descriptionShort', e.target.value)} className={styles.textarea} />
                            </InputGroup>
                        </div>

                        <div>
                            <InputGroup label="Descrição Completa">
                                <textarea rows={6} value={formData.descriptionLong} onChange={e => handleChange('descriptionLong', e.target.value)} className={styles.textarea} />
                            </InputGroup>
                        </div>
                    </div>

                    {/* 2. Imagens e Links */}
                    <div className="bg-white/80 backdrop-blur-sm border border-black/[0.04] p-8 rounded-[1.5rem] shadow-sm">
                        <h3 className="font-syne font-bold text-lg mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center text-xs font-bold">2</div>
                            Mídia & Links
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <ImageUpload
                                    label="Banner Principal (Cover)"
                                    value={formData.coverImage || ''}
                                    onChange={(val) => handleChange('coverImage', val)}
                                />
                            </div>

                            <div className="space-y-2">
                                <ImageUpload
                                    label="Miniatura (Grid)"
                                    value={formData.image || ''}
                                    onChange={(val) => handleChange('image', val)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-black/[0.04]">
                            <input
                                type="checkbox"
                                id="showLink"
                                checked={formData.showLink}
                                onChange={e => handleChange('showLink', e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <label htmlFor="showLink" className="text-sm font-bold font-syne cursor-pointer select-none">Exibir botão "Visite o Site"</label>

                            {formData.showLink && (
                                <input type="text" value={formData.link} onChange={e => handleChange('link', e.target.value)} className={`${styles.input} flex-1 ml-4`} placeholder="https://..." />
                            )}
                        </div>
                    </div>

                    {/* 3. Blocos de Conteúdo */}
                    <div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                            <h3 className="font-syne font-bold text-lg flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-black/[0.04] flex items-center justify-center text-xs font-bold">3</div>
                                Conteúdo da Página
                            </h3>

                            <div className="flex bg-white border border-black/[0.1] rounded-full p-1 gap-1 shadow-sm">
                                <button onClick={() => addBlock('1x1-image')} className="flex items-center gap-2 px-4 py-2 hover:bg-black/[0.05] rounded-full transition-colors text-xs font-bold font-syne uppercase">
                                    <IconSquare size={16} stroke={1.5} /> Imagem Cheia
                                </button>
                                <div className="w-[1px] bg-black/[0.1] my-1" />
                                <button onClick={() => addBlock('2x1-image')} className="flex items-center gap-2 px-4 py-2 hover:bg-black/[0.05] rounded-full transition-colors text-xs font-bold font-syne uppercase">
                                    <IconColumns size={16} stroke={1.5} /> 2 Colunas
                                </button>
                                <div className="w-[1px] bg-black/[0.1] my-1" />
                                <button onClick={() => addBlock('text-image-left')} className="flex items-center gap-2 px-4 py-2 hover:bg-black/[0.05] rounded-full transition-colors text-xs font-bold font-syne uppercase">
                                    <IconLayout size={16} stroke={1.5} /> Texto + Img
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {formData.blocks?.map((block, index) => (
                                <div key={block.id} className="bg-white p-6 md:p-8 rounded-3xl border border-black/[0.06] shadow-sm relative group transition-all hover:shadow-md">

                                    <div className="flex justify-between items-center mb-6 border-b border-black/[0.04] pb-4">
                                        <span className="text-xs font-bold font-syne uppercase bg-black/[0.05] px-3 py-1 rounded-full text-textSecondary">
                                            Bloco {index + 1}: {block.type}
                                        </span>
                                        <button onClick={() => removeBlock(block.id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors">
                                            <IconTrash size={18} stroke={1.5} />
                                        </button>
                                    </div>

                                    <div>
                                        {block.type === '1x1-image' && (
                                            <div className="space-y-4">
                                                <ImageUpload
                                                    label="Imagem Full Width"
                                                    value={block.content.image || ''}
                                                    onChange={(val) => updateBlock(block.id, 'image', val)}
                                                />
                                            </div>
                                        )}

                                        {block.type === '2x1-image' && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <ImageUpload
                                                        label="Imagem Esquerda"
                                                        value={block.content.image || ''}
                                                        onChange={(val) => updateBlock(block.id, 'image', val)}
                                                    />
                                                </div>
                                                <div className="space-y-4">
                                                    <ImageUpload
                                                        label="Imagem Direita"
                                                        value={block.content.image2 || ''}
                                                        onChange={(val) => updateBlock(block.id, 'image2', val)}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {block.type === 'text-image-left' && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <InputGroup label="Título da Seção">
                                                        <input type="text" value={block.content.title} onChange={e => updateBlock(block.id, 'title', e.target.value)} className={styles.input} />
                                                    </InputGroup>
                                                    <InputGroup label="Texto">
                                                        <textarea rows={5} value={block.content.text} onChange={e => updateBlock(block.id, 'text', e.target.value)} className={styles.textarea} />
                                                    </InputGroup>
                                                </div>
                                                <div className="space-y-4">
                                                    <ImageUpload
                                                        label="Imagem Lateral"
                                                        value={block.content.image || ''}
                                                        onChange={(val) => updateBlock(block.id, 'image', val)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {(!formData.blocks || formData.blocks.length === 0) && (
                                <div className="text-center py-16 border-2 border-dashed border-black/[0.06] rounded-3xl bg-surface/30 text-textSecondary">
                                    <p className="font-syne font-bold text-sm uppercase mb-2">Nenhum conteúdo adicionado</p>
                                    <p className="text-xs font-manrope">Utilize os botões acima para construir a página do projeto</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminEditor;
