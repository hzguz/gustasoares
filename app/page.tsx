'use client';

import { useState, useEffect } from 'react';
import { Language, ExtendedProject } from '@/types';
import { CONTENT, SOCIAL_LINKS } from '@/constants';
import { supabase } from '@/lib/supabase';
import { generateSlug } from '@/lib/utils';

import DynamicBackground from '@/components/DynamicBackground';
import MobileMenu from '@/components/MobileMenu';
import Header from '@/components/Header';
import FixedHeader from '@/components/FixedHeader';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
    const [lang, setLang] = useState<Language>('pt');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [projects, setProjects] = useState<ExtendedProject[]>([]);

    const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');
    const translations = CONTENT[lang];

    // Fetch Projects from Supabase
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('date', { ascending: false });

                if (error) {
                    console.error("Supabase error fetching projects:", error);
                    return;
                }

                if (data && data.length > 0) {
                    const projectsData = data.map(d => ({
                        ...d,
                        slug: d.slug || generateSlug(d.title || ''),
                    })) as ExtendedProject[];
                    setProjects(projectsData);
                }
            } catch (err) {
                console.error("Error fetching projects:", err);
            }
        };

        fetchProjects();
    }, []);

    const handleNavigate = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

            <Header
                lang={lang}
                toggleLang={toggleLang}
                text={translations.nav}
                onNavigate={handleNavigate}
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
                <Hero variant="home" text={translations.hero} />
                <Services text={translations.services} />
                <Projects
                    projects={projects}
                    text={translations.projects}
                    onProjectClick={(project) => window.location.href = `/projeto/${project.slug}`}
                />
                <About translations={translations} />
                <Contact text={translations.contact} socialEmail={SOCIAL_LINKS.email} />
            </main>

            <Footer
                text={translations.footer}
                navText={translations.nav}
                lang={lang}
                toggleLang={toggleLang}
                onNavigate={handleNavigate}
                socials={SOCIAL_LINKS}
            />
        </>
    );
}
