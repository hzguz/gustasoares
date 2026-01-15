import { createClient } from '@supabase/supabase-js';
import { generateSlug } from '@/lib/utils';
import ClientProjectPage from './client-page';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
    console.log("Generating static params for [slug]...");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // If env vars are missing, return placeholder to allow build to pass
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Supabase env vars missing. Using placeholder slug.");
        return [{ slug: 'placeholder' }];
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data: projects, error } = await supabase.from('projects').select('title');

        if (error) {
            console.error("Supabase Error in generateStaticParams:", error);
            return [{ slug: 'placeholder' }];
        }

        if (!projects || projects.length === 0) return [{ slug: 'placeholder' }];

        const params = projects.map((project) => ({
            slug: generateSlug(project.title || '')
        }));
        console.log(`Found ${params.length} projects.`);
        return params;
    } catch (e) {
        console.error("Exception in generateStaticParams:", e);
        return [{ slug: 'placeholder' }];
    }
}

export default function Page() {
    return <ClientProjectPage />;
}
