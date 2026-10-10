import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { queryOptions } from '@tanstack/react-query';

export const getDirectors = createServerFn({ method: 'GET' }).handler(async () => {
  const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Contact service unavailable');
  const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => { const h = new Headers(init?.headers); if (key.startsWith('sb_') && h.get('Authorization') === `Bearer ${key}`) h.delete('Authorization'); h.set('apikey', key); return fetch(input, { ...init, headers: h }); } } });
  const { data, error } = await client.from('directors').select('id,slug,name,designation,phone,email,office_phone,website,address,photo_url,sort_order').order('sort_order');
  if (error) throw new Error(error.message); return data;
});
export const directorsQuery = queryOptions({ queryKey: ['directors'], queryFn: () => getDirectors(), staleTime: 30_000 });