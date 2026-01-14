import React, { useEffect } from 'react';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
}

const DEFAULT_TITLE = 'GustaSoares Estúdio';
const DEFAULT_DESCRIPTION = 'Soluções em UX/UI Design que unem estratégia, design e usabilidade para criar experiências digitais centradas no usuário.';
const DEFAULT_IMAGE = '/imgs/og-image.png';
const SITE_URL = 'https://gustasoares.com';

/**
 * SEO Component - Updates document head meta tags dynamically
 * Uses direct DOM manipulation to avoid dependency issues with React 19
 */
const SEO: React.FC<SEOProps> = ({
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    url,
    type = 'website'
}) => {
    const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL;
    const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    useEffect(() => {
        // Update document title
        document.title = fullTitle;

        // Helper to update or create meta tag
        const updateMeta = (selector: string, attribute: string, content: string) => {
            let element = document.querySelector(selector) as HTMLMetaElement | null;
            if (!element) {
                element = document.createElement('meta');
                if (selector.includes('property=')) {
                    element.setAttribute('property', selector.match(/property="([^"]+)"/)?.[1] || '');
                } else if (selector.includes('name=')) {
                    element.setAttribute('name', selector.match(/name="([^"]+)"/)?.[1] || '');
                }
                document.head.appendChild(element);
            }
            element.setAttribute(attribute, content);
        };

        // Update canonical link
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = canonicalUrl;

        // Update meta description
        updateMeta('meta[name="description"]', 'content', description);

        // Update Open Graph tags
        updateMeta('meta[property="og:title"]', 'content', fullTitle);
        updateMeta('meta[property="og:description"]', 'content', description);
        updateMeta('meta[property="og:image"]', 'content', imageUrl);
        updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
        updateMeta('meta[property="og:type"]', 'content', type);

        // Update Twitter tags
        updateMeta('meta[name="twitter:title"]', 'content', fullTitle);
        updateMeta('meta[name="twitter:description"]', 'content', description);
        updateMeta('meta[name="twitter:image"]', 'content', imageUrl);

        // Cleanup: restore defaults on unmount
        return () => {
            document.title = DEFAULT_TITLE;
        };
    }, [fullTitle, description, imageUrl, canonicalUrl, type]);

    return null; // This component doesn't render anything
};

export default SEO;
