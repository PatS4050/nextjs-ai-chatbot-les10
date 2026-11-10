import { createClient } from '@supabase/supabase-js';

export function createSupabaseServerClient() {
  const url = process.env.SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUBABASE_SECRET_KEY;

  if (!url || !secretKey) {
    throw new Error('Supabase server configuratie ontbreekt.');
  }

  return createClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
