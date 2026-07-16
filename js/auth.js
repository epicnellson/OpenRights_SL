let currentUser = null;
let currentProfile = null;
let authReady = false;
const getClient = () => window._supabase;

const getDisplayName = () => {
  if (currentProfile?.full_name) return currentProfile.full_name;
  if (currentUser?.user_metadata?.full_name) return currentUser.user_metadata.full_name;
  return currentUser?.email || '?';
};

const buildProfileDropdown = (email, isMobile) => {
  const displayName = getDisplayName();
  const initial = displayName[0].toUpperCase();
  const container = document.createElement('div');
  container.className = 'relative';

  const trigger = document.createElement('button');
  trigger.id = isMobile ? 'mobile-profile-trigger' : 'profile-trigger';
  trigger.className = 'flex items-center gap-2 bg-purple-600/30 border border-purple-500/30 px-3 py-1.5 rounded-full transition text-white hover:bg-purple-600/40 text-sm';
  trigger.innerHTML = `<span class="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold">${initial}</span>`;
  trigger.setAttribute('aria-label', 'User menu');
  container.appendChild(trigger);

  const dropdown = document.createElement('div');
  dropdown.id = isMobile ? 'mobile-profile-dropdown' : 'profile-dropdown';
  dropdown.className = `${isMobile ? 'w-full' : 'hidden absolute right-0 mt-2 w-56'} glass rounded-xl overflow-hidden shadow-xl z-50`;
  if (isMobile) dropdown.classList.add('hidden');
  dropdown.innerHTML = `
    <div class="px-4 py-2 text-sm text-white font-medium truncate border-b border-white/10">${displayName}</div>
    <div class="px-4 py-1 text-xs text-gray-400 truncate border-b border-white/10">${email}</div>
    <a href="profile.html" class="flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-white/10 transition">✏️ Edit Profile</a>
    <button id="${isMobile ? 'mobile-profile-logout' : 'profile-logout'}" class="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-white/10 transition">🚪 Logout</button>
  `;
  container.appendChild(dropdown);

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });

  dropdown.querySelector(`#${isMobile ? 'mobile-profile-logout' : 'profile-logout'}`).addEventListener('click', async () => {
    await getClient()?.auth.signOut();
    window.location.href = '/login.html';
  });

  if (!isMobile) {
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) dropdown.classList.add('hidden');
    }, { once: false });
  }

  return container;
};

const updateNavbarAuth = (user, profile) => {
  currentUser = user;
  currentProfile = profile || null;
  const profileLink = document.getElementById('navbar-profile');
  if (!profileLink) {
    console.warn('[Auth] #navbar-profile not found on this page');
    return;
  }

  const existingContainer = document.getElementById('profile-container');
  if (existingContainer) existingContainer.remove();

  if (user) {
    console.log('[Auth] User logged in:', user.email);
    profileLink.style.display = 'none';
    const dropdown = buildProfileDropdown(user.email);
    dropdown.id = 'profile-container';
    profileLink.parentNode.insertBefore(dropdown, profileLink.nextSibling);
  } else {
    profileLink.style.display = '';
    profileLink.textContent = 'Sign In';
    profileLink.href = '/login.html';
    profileLink.className = 'text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition text-white';
  }

  const mobileProfileLink = document.getElementById('mobile-navbar-profile');
  if (mobileProfileLink) {
    const existingMobile = document.getElementById('mobile-profile-container');
    if (existingMobile) existingMobile.remove();

    if (user) {
      mobileProfileLink.style.display = 'none';
      const mobileDropdown = buildProfileDropdown(user.email, true);
      mobileDropdown.id = 'mobile-profile-container';
      mobileProfileLink.parentNode.insertBefore(mobileDropdown, mobileProfileLink.nextSibling);
    } else {
      mobileProfileLink.style.display = '';
      mobileProfileLink.textContent = 'Sign In';
      mobileProfileLink.href = '/login.html';
    }
  }
};

const PUBLIC_PATHS = ['/', '/index.html', '/about.html', '/login.html', '/404.html', '/offline.html'];

const isPublicPage = () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return PUBLIC_PATHS.some(p => path === p || path.endsWith(p));
};

const initAuth = async () => {
  const sb = getClient();
  if (!sb) { authReady = true; return; }
  try {
    const { data: { session } } = await sb.auth.getSession();
    let profile = null;
    if (session?.user) {
      const { data, error } = await sb.from('profiles').select('*').eq('id', session.user.id).single();
      if (!error) profile = data;
      if (!profile && session.user.user_metadata?.full_name) {
        const { data: newProfile, error: upsertError } = await sb.from('profiles').upsert({
          id: session.user.id,
          email: session.user.email,
          full_name: session.user.user_metadata.full_name
        }).select().single();
        if (!upsertError) profile = newProfile;
      }
    }
    updateNavbarAuth(session?.user || null, profile);
    authReady = true;

    if (!session && !isPublicPage()) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search);
      window.location.href = '/login.html';
      return;
    }
  } catch (e) {
    console.error('Auth init error:', e);
    updateNavbarAuth(null);
    authReady = true;
  }

  sb.auth.onAuthStateChange(async (event, session) => {
    if (session?.user) {
      const { data, error } = await sb.from('profiles').select('*').eq('id', session.user.id).single();
      updateNavbarAuth(session.user, (!error ? data : null) || null);
    } else {
      updateNavbarAuth(null);
    }
    if (event === 'SIGNED_OUT') {
      window.location.href = '/login.html';
    }
  });
};

const requireAuth = async () => {
  const sb = getClient();
  if (!sb) return;
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    window.location.href = '/login.html';
  }
};

const highlightActiveNav = () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === 'index.html' && (href === '/' || href === 'index.html'))) {
      link.classList.add('active-nav-link');
    }
  });
  const toolsBtn = document.getElementById('tools-btn');
  if (toolsBtn && (path === 'scanner.html' || path === 'analyzer.html' || path === 'registry.html' || path === 'dashboard.html' || path === 'batch.html')) {
    toolsBtn.classList.add('active-nav-link');
  }
};

const PROTECTED_ROUTES = ['/recommender.html', '/generator.html', '/comparison.html', '/scanner.html', '/analyzer.html', '/chatbot.html', '/registry.html', '/dashboard.html', '/batch.html', '/profile.html'];

const requireAuthInterceptor = () => {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;

    const page = href.split('/').pop();
    const isProtected = PROTECTED_ROUTES.some(route => route.endsWith(page));
    const hasAttr = link.hasAttribute('data-require-auth');

    if (!isProtected && !hasAttr) return;

    if (!authReady) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (currentUser) return;

    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem('redirectAfterLogin', href);
    window.location.href = '/login.html';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
  highlightActiveNav();
  requireAuthInterceptor();

  window.addEventListener('profile-updated', (e) => {
    currentProfile = e.detail;
    const user = currentUser;
    if (!user) return;
    const existing = document.getElementById('profile-container');
    if (existing) existing.remove();
    const existingMobile = document.getElementById('mobile-profile-container');
    if (existingMobile) existingMobile.remove();
    const profileLink = document.getElementById('navbar-profile');
    if (profileLink) {
      profileLink.style.display = 'none';
      const dropdown = buildProfileDropdown(user.email);
      dropdown.id = 'profile-container';
      profileLink.parentNode.insertBefore(dropdown, profileLink.nextSibling);
    }
    const mobileProfileLink = document.getElementById('mobile-navbar-profile');
    if (mobileProfileLink) {
      mobileProfileLink.style.display = 'none';
      const mobileDropdown = buildProfileDropdown(user.email, true);
      mobileDropdown.id = 'mobile-profile-container';
      mobileProfileLink.parentNode.insertBefore(mobileDropdown, mobileProfileLink.nextSibling);
    }
  });
});
