
import React, { useState } from 'react';
import { Language, Project, ExtendedProject } from './types';
import { CONTENT, SOCIAL_LINKS } from './constants';
import DynamicBackground from './components/DynamicBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectPage from './components/ProjectPage';
import ProjectHeader from './components/ProjectHeader';

// Admin Components
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminEditor from './components/AdminEditor';

// Mock Initial Data
const INITIAL_PROJECTS: ExtendedProject[] = [
    { 
        id: 1, 
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
        id: 2, 
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

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'project' | 'admin-login' | 'admin-dashboard' | 'admin-editor'>('home');
  const [projects, setProjects] = useState<ExtendedProject[]>(INITIAL_PROJECTS);
  
  const [selectedProject, setSelectedProject] = useState<ExtendedProject | null>(null);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [editingProject, setEditingProject] = useState<ExtendedProject | null>(null);

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

  const transitionToView = (view: typeof currentView) => {
      setIsTransitioning(true);
      setTimeout(() => {
          setCurrentView(view);
          setIsTransitioning(false);
          window.scrollTo(0, 0);
      }, 300);
  };

  const handleProjectClick = (project: Project) => {
    const fullProject = projects.find(p => p.id === project.id);
    if (fullProject) {
        setSelectedProject(fullProject);
        transitionToView('project');
    }
  };

  const handleBackToHome = () => {
      setSelectedProject(null);
      transitionToView('home');
  };

  const handleNavigateFromProject = (sectionId: string) => {
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
          transitionToView('admin-dashboard');
      } else {
          transitionToView('admin-login');
      }
  };

  const handleAdminLogin = (status: boolean) => {
      if (status) {
          setAdminLoggedIn(true);
          transitionToView('admin-dashboard');
      }
  };

  const handleLogout = () => {
      setAdminLoggedIn(false);
      transitionToView('home');
  };

  const handleCreateProject = () => {
      setEditingProject(null);
      transitionToView('admin-editor');
  };

  const handleEditProject = (project: ExtendedProject) => {
      setEditingProject(project);
      transitionToView('admin-editor');
  };

  const handleDeleteProject = (id: number) => {
      setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleSaveProject = (project: ExtendedProject) => {
      setProjects(prev => {
          const exists = prev.find(p => p.id === project.id);
          if (exists) {
              return prev.map(p => p.id === project.id ? project : p);
          } else {
              return [project, ...prev];
          }
      });
      transitionToView('admin-dashboard');
  };

  const text = CONTENT[lang];

  return (
    <div className="relative min-h-screen bg-background text-textPrimary selection:bg-inverse selection:text-inverseSurface">
      
      <DynamicBackground />

      {/* Header Logic */}
      {currentView === 'home' && (
          <Header lang={lang} toggleLang={toggleLang} text={text.nav} />
      )}
      {currentView === 'project' && (
          <ProjectHeader onBack={handleBackToHome} navText={text.nav} onNavigate={handleNavigateFromProject} />
      )}

      {/* Main Content Wrapper */}
      <div 
        className={`relative z-10 transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0 blur-sm scale-[0.99]' : 'opacity-100 blur-0 scale-100'
        }`}
      >
        {currentView === 'home' && (
            <>
                <main>
                <Hero text={text.hero} />
                <Services text={text.services} />
                <Projects text={text.projects} projects={projects} onProjectClick={handleProjectClick} />
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
            <ProjectPage 
                project={selectedProject} 
                translations={text} 
                socials={SOCIAL_LINKS} 
                lang={lang} 
                toggleLang={toggleLang}
                onNavigate={handleNavigateFromProject}
            />
        )}

        {/* Admin Views */}
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
            />
        )}

        {currentView === 'admin-editor' && (
            <AdminEditor 
                project={editingProject} 
                onSave={handleSaveProject} 
                onCancel={() => transitionToView('admin-dashboard')}
            />
        )}
      </div>
    </div>
  );
};

export default App;
