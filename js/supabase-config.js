const SUPABASE_URL = 'https://psdyioqkdawmfhzeaaxk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_z97YOxMEsQp3ITP1lCUQkA_4QVM52f6';

window._supabase = window.supabase?.createClient
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
