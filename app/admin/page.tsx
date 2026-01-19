'use client';

import { useState, useEffect } from 'react';
import { ExtendedProject } from '@/types';
import { supabase } from '@/lib/supabase';
import { generateSlug } from '@/lib/utils';
import { useRouter } from 'next/navigation';

import AdminLogin from '@/components/AdminLogin';
import AdminDashboard from '@/components/AdminDashboard';
import AdminEditor from '@/components/AdminEditor';

type AdminView = 'login' | 'dashboard' | 'editor';

export default function AdminPage() {
    const router = useRouter();
    const [view, setView] = useState<AdminView>('login');
    const [projects, setProjects] = useState<ExtendedProject[]>([]);
    const [editingProject, setEditingProject] = useState<ExtendedProject | null>(null);
    const [loading, setLoading] = useState(true);

    // Check auth state on mount
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setView('dashboard');
                fetchProjects();
            }
            setLoading(false);
        };

        checkAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setView('dashboard');
                fetchProjects();
            } else {
                setView('login');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;

            if (data) {
                const projectsData = data.map(d => ({
                    ...d,
                    slug: generateSlug(d.title || ''),
                })) as ExtendedProject[];
                setProjects(projectsData);
            }
        } catch (err) {
            console.error('Error fetching projects:', err);
        }
    };

    const handleLogin = (success: boolean) => {
        if (success) {
            setView('dashboard');
            fetchProjects();
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setView('login');
    };

    const handleCreate = () => {
        setEditingProject(null);
        setView('editor');
    };

    const handleEdit = (project: ExtendedProject) => {
        setEditingProject(project);
        setView('editor');
    };

    const handleDelete = async (id: string | number) => {
        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error deleting project:', err);
            alert('Erro ao excluir projeto');
        }
    };

    const handleSave = async (project: ExtendedProject) => {
        try {
            // Remove slug from data - it's computed client-side, not stored in DB
            const { slug, ...projectData } = project;

            if (editingProject) {
                // Update existing
                const { id, ...updateData } = projectData;
                const { error } = await supabase
                    .from('projects')
                    .update(updateData)
                    .eq('id', project.id);

                if (error) throw error;

                setProjects(prev => prev.map(p => p.id === project.id ? project : p));
            } else {
                // Create new - generate ID since table uses timestamp-based IDs
                const { id, ...insertData } = projectData;
                const newId = Date.now();

                const { data, error } = await supabase
                    .from('projects')
                    .insert({ id: newId, ...insertData })
                    .select()
                    .single();

                if (error) throw error;

                if (data) {
                    setProjects(prev => [{ ...data, slug: generateSlug(data.title) } as ExtendedProject, ...prev]);
                }
            }

            setEditingProject(null);
            setView('dashboard');
        } catch (err: any) {
            console.error('Error saving project:', err?.message || err);
            alert(`Erro ao salvar projeto: ${err?.message || 'Erro desconhecido'}`);
        }
    };

    const handleSeed = async () => {
        // Placeholder for seeding example projects
        alert('Funcionalidade de importação não implementada');
    };

    const handleView = (project: ExtendedProject) => {
        window.open(`/projeto/${project.slug}`, '_blank');
    };

    const handleBack = () => {
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-pulse font-syne text-textSecondary">Carregando...</div>
            </div>
        );
    }

    // Render based on view state
    switch (view) {
        case 'login':
            return <AdminLogin onLogin={handleLogin} onBack={handleBack} />;

        case 'editor':
            return (
                <AdminEditor
                    project={editingProject}
                    onSave={handleSave}
                    onCancel={() => setView('dashboard')}
                />
            );

        case 'dashboard':
        default:
            return (
                <AdminDashboard
                    projects={projects}
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onLogout={handleLogout}
                    onSeed={handleSeed}
                    onView={handleView}
                />
            );
    }
}
