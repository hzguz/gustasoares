'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Language, ExtendedProject } from '@/types';
import { CONTENT, SOCIAL_LINKS } from '@/constants';
import { supabase } from '@/lib/supabase';
import { generateSlug } from '@/lib/utils';

import DynamicBackground from '@/components/DynamicBackground';
import MobileMenu from '@/components/MobileMenu';
import ProjectHeader from '@/components/ProjectHeader';
import FixedHeader from '@/components/FixedHeader';
import ProjectPage from '@/components/ProjectPage';
import NotFound from '@/components/NotFound';
import LoadingDots from '@/components/LoadingDots';

export default function ClientProjectPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [lang, setLang] = useState<Language>('pt');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [project, setProject] = useState<ExtendedProject | null>(null);
    const [loading, setLoading] = useState(true);

    const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');
    const translations = CONTENT[lang];

    // Fetch project by slug
    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            try {
                // First try to find by slug directly
                let { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error || !data) {
                    // Try to find by generated slug from title
                    const { data: allProjects } = await supabase
                        .from('projects')
                        .select('*');

                    if (allProjects) {
                        const foundProject = allProjects.find(p =>
                            generateSlug(p.title || '') === slug
                        );
                        if (foundProject) {
                            data = foundProject;
                        }
                    }
                }

                if (data) {
                    setProject({
                        ...data,
                        slug: data.slug || generateSlug(data.title || ''),
                    } as ExtendedProject);
                }
            } catch (err) {
                console.error("Error fetching project:", err);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProject();
        }
    }, [slug]);

    const handleNavigate = (id: string) => {
        router.push(`/#${id}`);
    };

    const handleBack = () => {
        router.push('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <LoadingDots />
            </div>
        );
    }

    if (!project) {
        return <NotFound onHome={handleBack} />;
    }

    return (
        <>
            <DynamicBackground />

            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                navText={translations.nav}
                lang={lang}
                toggleLang={toggleLang}
                onNavigate={handleNavigate}
                socials={SOCIAL_LINKS}
            />

            <ProjectHeader
                onBack={handleBack}
                onNavigate={handleNavigate}
                navText={translations.nav}
                onOpenMenu={() => setMobileMenuOpen(true)}
            />

            <FixedHeader
                lang={lang}
                toggleLang={toggleLang}
                text={translations.nav}
                onNavigate={handleNavigate}
                onOpenMenu={() => setMobileMenuOpen(true)}
            />

            <main>
                <ProjectPage
                    project={project}
                    translations={translations}
                    socials={SOCIAL_LINKS}
                    lang={lang}
                    toggleLang={toggleLang}
                    onNavigate={handleNavigate}
                />
            </main>
        </>
    );
}
