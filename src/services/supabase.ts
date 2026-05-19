import { createClient } from '@supabase/supabase-js';

// Pulling configuration keys safely from Vite's environment wrapper
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment keys are missing. The application will fallback to simulated frontend state contexts.'
  );
}

// Create a single production instance of the Supabase Client
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
