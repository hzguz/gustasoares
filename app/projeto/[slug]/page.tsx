import { supabase } from '@/lib/supabase';
import { generateSlug } from '@/lib/utils';
import ClientProjectPage from './client-page';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
    console.log("Generating static params for [slug]...");
    try {
        const { data: projects, error } = await supabase.from('projects').select('title');

        if (error) {
            console.error("Supabase Error in generateStaticParams:", error);
            // Fallback to empty if DB fails, allowing build to pass (but no static pages generated)
            return [];
        }

        if (!projects) return [];

        const params = projects.map((project) => ({
            slug: generateSlug(project.title || '')
        }));
        console.log(`Found ${params.length} projects.`);
        return params;
    } catch (e) {
        console.error("Exception in generateStaticParams:", e);
        return [];
    }
}

export default function Page() {
    return <ClientProjectPage />;
}
