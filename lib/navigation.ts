const handleHeaderNavigate = (id: string) => {
    if (id === 'home') {
        if (currentView !== 'home') {
            transitionToView('home', '/');
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } else if (id === 'about') {
        transitionToView('about', '/about');
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
