const SUPABASE_URL = 'https://psdyioqkdawmfhzeaaxk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_z97YOxMEsQp3ITP1lCUQkA_4QVM52f6';
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;

(function initSupabase() {
  if (window._supabase) return;
  if (window.supabase?.createClient) {
    window._supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return;
  }
  // CDN not loaded yet — inject a fallback script dynamically
  const s = document.createElement('script');
  s.src = 'https://unpkg.com/@supabase/supabase-js@2/dist/umd/supabase.js';
  s.onload = () => {
    window._supabase = window.supabase?.createClient
      ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
      : null;
    if (!window._supabase) console.error('[Supabase] Fallback CDN loaded but createClient not found');
  };
  s.onerror = () => console.error('[Supabase] Fallback CDN (unpkg) failed to load Supabase client');
  document.head.appendChild(s);
})();
