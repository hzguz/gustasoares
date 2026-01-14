import React, { useState, Suspense } from 'react';
import { Language, Project, ExtendedProject } from './types';
import { CONTENT, SOCIAL_LINKS } from './constants';
import DynamicBackground from './components/DynamicBackground';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import FixedHeader from './components/FixedHeader';
import ProjectHeader from './components/ProjectHeader';
import MobileMenu from './components/MobileMenu';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectPage from './components/ProjectPage';
import NotFound from './components/NotFound';
import About from './components/About';
import SEO from './components/SEO';

// Lazy load admin components for better initial bundle size
const AdminLogin = React.lazy(() => import('./components/AdminLogin'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const AdminEditor = React.lazy(() => import('./components/AdminEditor'));

// Mock Initial Data
const INITIAL_PROJECTS: ExtendedProject[] = [
    {
        id: "1",
        slug: "fintech-dashboard",
        title: "Fintech Dashboard",
        category: "app",
        date: "2024",
        image: "https://picsum.photos/800/450?random=1",
        coverImage: "https://picsum.photos/1200/800?random=1",
        descriptionShort: "Uma plataforma financeira revolucionária que simplifica a gestão de ativos e transações em tempo real.",
        descriptionLong: "Este projeto nasceu da necessidade de criar uma interface financeira que fosse ao mesmo tempo poderosa e acessível.\n\nSolução:\nDesenvolvemos um sistema de design robusto com suporte total a dark mode.",
        tools: ["React", "TypeScript", "Tailwind CSS"],
        showLink: true,
        link: "https://example.com",
        gallery: ["https://picsum.photos/1200/800?random=10", "https://picsum.photos/1200/800?random=11"],
        blocks: []
    },
    {
        id: "2",
        slug: "modern-architecture",
        title: "Modern Architecture",
        category: "landing",
        date: "2023",
        image: "https://picsum.photos/800/450?random=2",
        coverImage: "https://picsum.photos/1200/800?random=2",
        descriptionShort: "Site institucional para um escritório de arquitetura renomado.",
        descriptionLong: "Foco em minimalismo e exibição de grandes imagens.",
        tools: ["Wordpress", "Elementor"],
        showLink: false,
        gallery: ["https://picsum.photos/1200/800?random=12"],
        blocks: []
    }
];

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
};

const App: React.FC = () => {
    const [lang, setLang] = useState<Language>('pt');
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentView, setCurrentView] = useState<'home' | 'project' | 'admin-login' | 'admin-dashboard' | 'admin-editor' | 'not-found'>('home');
    const [projects, setProjects] = useState<ExtendedProject[]>([]); // Start empty, fetch from DB

    // Fetch Projects from Supabase
    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('date', { ascending: false }); // Assuming date is sortable, or use created_at

            if (error) {
                console.error("Supabase error fetching projects:", error);
                // Fallback if table doesn't exist yet or connection fails
                setProjects(INITIAL_PROJECTS);
                return;
            }

            if (!data || data.length === 0) {
                console.info("No projects in Supabase, using mock data");
                setProjects(INITIAL_PROJECTS);
            } else {
                // Cast data to ExtendedProject. Ensure DB columns match types!
                // Generate slug from title if not present
                const projectsData = data.map(d => ({
                    ...d,
                    id: String(d.id),
                    slug: d.slug || generateSlug(d.title) // Auto-generate slug if missing
                })) as ExtendedProject[];

                setProjects(projectsData);
            }
        } catch (error) {
            console.error("Supabase unexpected error:", error);
            setProjects(INITIAL_PROJECTS);
        }
    };

    React.useEffect(() => {
        fetchProjects();

        // Optional: Realtime subscription
        const channel = supabase
            .channel('public:projects')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, (payload) => {
                console.log('Realtime update:', payload);
                fetchProjects(); // Re-fetch on any change
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const [selectedProject, setSelectedProject] = useState<ExtendedProject | null>(null);
    const [adminLoggedIn, setAdminLoggedIn] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true); // New loading state
    const [editingProject, setEditingProject] = useState<ExtendedProject | null>(null);
    const [pendingProjectSlug, setPendingProjectSlug] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Global mobile menu state

    // Sync editingProject with URL on direct access if projects are loaded
    React.useEffect(() => {
        if (currentView === 'admin-editor' && projects.length > 0) {
            const path = window.location.pathname;
            if (path.startsWith('/dashboard/editor/')) {
                const id = path.split('/').pop();
                if (id) {
                    const found = projects.find(p => p.id === id);
                    if (found) {
                        setEditingProject(found);
                    }
                }
            }
        }
    }, [currentView, projects]);

    // Sync pendingProjectSlug when projects are loaded (for direct URL access)
    React.useEffect(() => {
        if (pendingProjectSlug && projects.length > 0) {
            const found = projects.find(p => p.slug === pendingProjectSlug);
            if (found) {
                setSelectedProject(found);
                setPendingProjectSlug(null);
            } else {
                // Project with this slug doesn't exist
                setCurrentView('not-found');
                setPendingProjectSlug(null);
            }
        }
    }, [pendingProjectSlug, projects]);

    // Auth Persistence Listener
    React.useEffect(() => {
        // Check active session first
        supabase.auth.getSession().then(({ data: { session } }) => {
            setAdminLoggedIn(!!session);
            setIsAuthLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setAdminLoggedIn(!!session);
            setIsAuthLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // URL ROUTING CHECK
    React.useEffect(() => {
        if (isAuthLoading) return; // Wait for auth check

        const handleRoute = () => {
            const path = window.location.pathname;
            if (path === '/admin') {
                if (adminLoggedIn) {
                    window.history.replaceState({}, '', '/dashboard');
                    setCurrentView('admin-dashboard');
                } else {
                    setCurrentView('admin-login');
                }
            } else if (path === '/dashboard') {
                if (adminLoggedIn) {
                    setCurrentView('admin-dashboard');
                } else {
                    window.history.replaceState({}, '', '/admin');
                    setCurrentView('admin-login');
                }
            } else if (path === '/dashboard/editor') {
                if (adminLoggedIn) {
                    setCurrentView('admin-editor');
                } else {
                    window.history.replaceState({}, '', '/admin');
                    setCurrentView('admin-login');
                }
            } else if (path.startsWith('/dashboard/editor/')) {
                if (adminLoggedIn) {
                    // Extract ID e.g. /dashboard/editor/123 -> 123
                    const id = path.split('/').pop();
                    if (id) {
                        // Find project by ID
                        // Note: We might need to wait for 'projects' to be fetched if user lands directly here.
                        // For now, we assume projects are loaded or will be loaded.
                        // Ideally we should set 'editingProject' here if projects exist.
                        // But projects are async. 
                        setCurrentView('admin-editor');
                    }
                } else {
                    window.history.replaceState({}, '', '/admin');
                    setCurrentView('admin-login');
                }
            } else if (path.startsWith('/projeto/')) {
                // Project page route: /projeto/:slug
                const slug = path.replace('/projeto/', '');
                if (slug) {
                    // We need projects to be loaded to find by slug
                    // If projects aren't loaded yet, we'll set a pending slug
                    const found = projects.find(p => p.slug === slug);
                    if (found) {
                        setSelectedProject(found);
                        setCurrentView('project');
                    } else if (projects.length === 0) {
                        // Projects not loaded yet, will be handled in another effect
                        setPendingProjectSlug(slug);
                        setCurrentView('project');
                    } else {
                        // Slug not found
                        setCurrentView('not-found');
                    }
                }
            } else if (path === '/' || path === '/index.html' || path === '') {
                // Home route - reset state
                setSelectedProject(null);
                setCurrentView('home');
            } else {
                setCurrentView('not-found');
            }
        };

        handleRoute();

        // Listen to browser back/forward
        window.addEventListener('popstate', handleRoute);
        return () => window.removeEventListener('popstate', handleRoute);
    }, [adminLoggedIn, isAuthLoading, projects]);

    const toggleLang = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setLang(prev => prev === 'pt' ? 'en' : 'pt');
            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 300);
    };

    const handleToggleMobileMenu = () => {
        setMobileMenuOpen(prev => !prev);
    };

    const transitionToView = (view: typeof currentView, updateUrl?: string) => {
        setIsTransitioning(true);
        setTimeout(() => {
            if (updateUrl) {
                window.history.pushState({}, '', updateUrl);
            }
            setCurrentView(view);
            setIsTransitioning(false);
            window.scrollTo(0, 0);
        }, 250);
    };

    const handleProjectClick = (project: Project) => {
        const fullProject = projects.find(p => p.id === project.id);
        if (fullProject) {
            setSelectedProject(fullProject);
            transitionToView('project', `/projeto/${fullProject.slug}`);
        }
    };

    const handleBackToHome = () => {
        setSelectedProject(null);
        transitionToView('home', '/');
    };

    const handleHeaderNavigate = (id: string) => {
        if (id === 'home') {
            if (currentView !== 'home') {
                transitionToView('home', '/');
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else if (id.startsWith('#')) {
            // Anchor link
            if (currentView !== 'home') {
                // Navigate home then scroll
                setIsTransitioning(true);
                setTimeout(() => {
                    window.history.pushState({}, '', '/');
                    setCurrentView('home');
                    setSelectedProject(null);
                    setIsTransitioning(false);
                    setTimeout(() => {
                        const element = document.querySelector(id);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                }, 300);
            } else {
                // Just scroll
                const element = document.querySelector(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };

    const handleNavigateFromProject = (sectionId: string) => {
        setMobileMenuOpen(false); // Ensure menu closes on nav
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentView('home');
            setSelectedProject(null);
            setIsTransitioning(false);
            setTimeout(() => {
                const element = document.querySelector(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }, 300);
    };

    // Admin Handlers
    const handleAdminClick = () => {
        if (adminLoggedIn) {
            transitionToView('admin-dashboard', '/dashboard');
        } else {
            transitionToView('admin-login', '/admin');
        }
    };

    const handleAdminLogin = (status: boolean) => {
        if (status) {
            setAdminLoggedIn(true);
            transitionToView('admin-dashboard', '/dashboard');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setAdminLoggedIn(false);
        transitionToView('home', '/');
    };

    const handleCreateProject = () => {
        setEditingProject(null);
        transitionToView('admin-editor', '/dashboard/editor');
    };

    const handleEditProject = (project: ExtendedProject) => {
        setEditingProject(project);
        transitionToView('admin-editor', `/dashboard/editor/${project.id}`);
    };

    const handleDeleteProject = async (id: string) => {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Error deleting project:", error);
            alert("Erro ao excluir projeto: " + error.message);
        } else {
            // Optimistic update or wait for realtime
            setProjects(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleSeedProjects = async () => {
        // Strip IDs to let DB assign them, or keep them if we use UUIDs/Text IDs
        // For simplicity let's insert them.
        const projectsToInsert = INITIAL_PROJECTS.map(({ id, ...rest }) => rest);

        const { error } = await supabase
            .from('projects')
            .insert(projectsToInsert);

        if (error) {
            console.error("Error seeding projects:", error);
            alert("Erro ao importar projetos: " + error.message);
        } else {
            alert("Projetos de exemplo importados com sucesso!");
            fetchProjects();
        }
    };

    const handleSaveProject = async (project: ExtendedProject) => {
        // Remove undefined values
        const cleanObject = (obj: Record<string, unknown>): Record<string, unknown> => {
            const cleaned: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(obj)) {
                if (value === undefined) continue;
                if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
                    cleaned[key] = cleanObject(value as Record<string, unknown>);
                } else if (Array.isArray(value)) {
                    cleaned[key] = value.map(item =>
                        item !== null && typeof item === 'object'
                            ? cleanObject(item as Record<string, unknown>)
                            : item
                    ).filter(item => item !== undefined);
                } else {
                    cleaned[key] = value;
                }
            }
            return cleaned;
        };

        const cleanedProject = cleanObject(project as unknown as Record<string, unknown>);

        // Handle ID: if it starts with temp-, remove it to let DB generate one
        if (typeof cleanedProject.id === 'string' && cleanedProject.id.startsWith('temp-')) {
            delete cleanedProject.id;
        }

        const { error } = await supabase
            .from('projects')
            .upsert(cleanedProject);

        if (error) {
            console.error("Error saving project:", error);
            alert(`Erro ao salvar projeto: ${error.message}`);
        } else {
            transitionToView('admin-dashboard');
            // Fetch will be triggered by realtime subscription usually
        }
    };

    const text = CONTENT[lang];

    return (
        <div className="relative min-h-screen bg-background text-textPrimary selection:bg-inverse selection:text-inverseSurface">

            {/* Loading Overlay for Auth Check */}
            {isAuthLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
                    <div className="w-8 h-8 border-2 border-inverse border-t-transparent rounded-full animate-spin" />
                </div>
            )}

            <DynamicBackground />

            {/* Global Mobile Menu */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                navText={text.nav}
                socials={SOCIAL_LINKS}
                onNavigate={(id) => {
                    handleHeaderNavigate(id);
                    setMobileMenuOpen(false);
                }}
                lang={lang}
                toggleLang={toggleLang}
            />

            {/* Header Logic */}
            {currentView === 'home' && (
                <>
                    <Header lang={lang} toggleLang={toggleLang} text={text.nav} onNavigate={handleHeaderNavigate} onOpenMenu={handleToggleMobileMenu} />
                    <FixedHeader lang={lang} toggleLang={toggleLang} text={text.nav} onNavigate={handleHeaderNavigate} onOpenMenu={handleToggleMobileMenu} />
                </>
            )}
            {currentView === 'project' && (
                <>
                    <ProjectHeader onBack={handleBackToHome} navText={text.nav} onNavigate={handleNavigateFromProject} onOpenMenu={handleToggleMobileMenu} />
                    <FixedHeader lang={lang} toggleLang={toggleLang} text={text.nav} onNavigate={handleNavigateFromProject} onOpenMenu={handleToggleMobileMenu} />
                </>
            )}

            {/* Main Content Wrapper */}
            <div
                className={`relative z-10 transition-all duration-300 ease-in-out ${isTransitioning ? 'opacity-0 blur-[2px] translate-y-1' : 'opacity-100 blur-0 translate-y-0'
                    }`}
            >
                {currentView === 'home' && (
                    <>
                        <SEO />
                        <main>
                            <Hero text={text.hero} />
                            <Services text={text.services} />
                            <Projects text={text.projects} projects={projects} onProjectClick={handleProjectClick} />
                            <About translations={text} />
                            <Contact text={text.contact} socialEmail={SOCIAL_LINKS.email} />
                        </main>
                        <Footer
                            text={text.footer}
                            navText={text.nav}
                            socials={SOCIAL_LINKS}
                            toggleLang={toggleLang}
                            lang={lang}
                            onAdminClick={handleAdminClick}
                        />
                    </>
                )}

                {currentView === 'project' && selectedProject && (
                    <>
                        <SEO
                            title={selectedProject.title}
                            description={selectedProject.descriptionShort}
                            image={selectedProject.coverImage || selectedProject.image}
                            url={`/projeto/${selectedProject.slug}`}
                            type="article"
                        />
                        <ProjectPage
                            project={selectedProject}
                            translations={text}
                            socials={SOCIAL_LINKS}
                            lang={lang}
                            toggleLang={toggleLang}
                            onNavigate={handleNavigateFromProject}
                        />
                    </>
                )}

                {/* Admin Views - Lazy loaded with Suspense */}
                <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-inverse border-t-transparent rounded-full animate-spin" />
                    </div>
                }>
                    {currentView === 'admin-login' && (
                        <AdminLogin onLogin={handleAdminLogin} onBack={() => transitionToView('home')} />
                    )}

                    {currentView === 'admin-dashboard' && (
                        <AdminDashboard
                            projects={projects}
                            onCreate={handleCreateProject}
                            onEdit={handleEditProject}
                            onDelete={handleDeleteProject}
                            onLogout={handleLogout}
                            onSeed={handleSeedProjects}
                            onView={handleProjectClick}
                        />
                    )}

                    {currentView === 'admin-editor' && (
                        <AdminEditor
                            project={editingProject}
                            onSave={handleSaveProject}
                            onCancel={() => transitionToView('admin-dashboard')}
                        />
                    )}
                </Suspense>

                {currentView === 'not-found' && (
                    <NotFound onHome={() => {
                        window.history.pushState({}, '', '/');
                        setCurrentView('home');
                    }} />
                )}
            </div>
        </div>
    );
};

export default App;
