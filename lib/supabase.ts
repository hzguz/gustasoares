import { createClient } from '@supabase/supabase-js';

// Access environment variables (Next.js pattern)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate config
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase vars missing. Check .env.local');
}

// Create Supabase client
export const supabase = createClient(
    supabaseUrl || '',
    supabaseAnonKey || ''
);
