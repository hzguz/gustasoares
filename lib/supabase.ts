import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy initialization to avoid crash during static build
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
    if (supabaseInstance) return supabaseInstance;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        // During static build, return a dummy client that won't crash
        // Real client will be created at runtime in browser
        console.warn('Supabase vars missing. Using placeholder during build.');
        return createClient('https://placeholder.supabase.co', 'placeholder-key');
    }

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseInstance;
}

// Export as getter to enable lazy initialization
export const supabase = typeof window !== 'undefined'
    ? getSupabaseClient()
    : createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    );
