/**
 * Utility functions for the GustaSoares Portfolio
 */

/**
 * Generate a URL-friendly slug from a title
 * Centralizado aqui para evitar duplicação entre componentes
 */
export const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
};
