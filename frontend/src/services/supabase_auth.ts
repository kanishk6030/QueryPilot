import { supabase } from "@/lib/supabase";

function missingSupabaseConfigError() {
  return new Error("Missing Supabase config. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.");
}

export const signup = async (
  email: string,
  password: string,
  name: string
) => {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return { data: null, error: missingSupabaseConfigError() };
  }

  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });
};

export const login = async (
  email: string,
  password: string
) => {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return { data: null, error: missingSupabaseConfigError() };
  }

  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const loginWithGithub = async () => {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return { data: null, error: missingSupabaseConfigError() };
  }

  return await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });
};

export const logout = async () => {
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return { error: missingSupabaseConfigError() };
  }

  return await supabase.auth.signOut();
};
