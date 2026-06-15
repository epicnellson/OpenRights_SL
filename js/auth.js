let currentUser = null;
const supabase = () => window._supabase;

const updateNavbarAuth = (user) => {
  currentUser = user;
  const profileLink = document.getElementById('navbar-profile');
  if (!profileLink) return;
  if (user) {
    profileLink.textContent = user.email;
    profileLink.href = 'profile.html';
    profileLink.className = 'text-sm bg-purple-600/30 border border-purple-500/30 px-3 py-1.5 rounded-full transition text-white';
    let logoutBtn = document.getElementById('navbar-logout');
    if (!logoutBtn) {
      logoutBtn = document.createElement('a');
      logoutBtn.id = 'navbar-logout';
      logoutBtn.textContent = 'Logout';
      logoutBtn.href = '#';
      logoutBtn.className = 'text-sm bg-red-600/20 hover:bg-red-600/40 px-3 py-1.5 rounded-full transition text-red-300 border border-red-500/20';
      logoutBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        await supabase()?.auth.signOut();
        window.location.href = '/login.html';
      });
      profileLink.parentNode.insertBefore(logoutBtn, profileLink.nextSibling);
    }
  } else {
    profileLink.textContent = 'Sign In';
    profileLink.href = '/login.html';
    profileLink.className = 'text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition text-white';
    const logoutBtn = document.getElementById('navbar-logout');
    if (logoutBtn) logoutBtn.remove();
  }

  const mobileProfileLink = document.getElementById('mobile-navbar-profile');
  if (mobileProfileLink) {
    if (user) {
      mobileProfileLink.textContent = user.email;
      mobileProfileLink.href = 'profile.html';
      let mobileLogout = document.getElementById('mobile-navbar-logout');
      if (!mobileLogout) {
        mobileLogout = document.createElement('a');
        mobileLogout.id = 'mobile-navbar-logout';
        mobileLogout.textContent = 'Logout';
        mobileLogout.href = '#';
        mobileLogout.className = 'text-sm bg-red-600/20 text-red-300 px-3 py-1.5 rounded-full text-center border border-red-500/20';
        mobileLogout.addEventListener('click', async (e) => {
          e.preventDefault();
          await supabase()?.auth.signOut();
          window.location.href = '/login.html';
        });
        mobileProfileLink.parentNode.appendChild(mobileLogout);
      }
    } else {
      mobileProfileLink.textContent = 'Sign In';
      mobileProfileLink.href = '/login.html';
      const mobileLogout = document.getElementById('mobile-navbar-logout');
      if (mobileLogout) mobileLogout.remove();
    }
  }
};

const PUBLIC_PATHS = ['/', '/index.html', '/about.html', '/login.html', '/404.html', '/offline.html'];

const isPublicPage = () => {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return PUBLIC_PATHS.some(p => path === p || path.endsWith(p));
};

const initAuth = async () => {
  const sb = supabase();
  if (!sb) return;
  try {
    const { data: { session } } = await sb.auth.getSession();
    updateNavbarAuth(session?.user || null);

    if (!session && !isPublicPage()) {
      localStorage.setItem('redirectAfterLogin', window.location.pathname + window.location.search);
      window.location.href = '/login.html';
      return;
    }
  } catch (e) {
    console.error('Auth init error:', e);
    updateNavbarAuth(null);
  }

  sb.auth.onAuthStateChange((event, session) => {
    updateNavbarAuth(session?.user || null);
    if (event === 'SIGNED_OUT') {
      window.location.href = '/login.html';
    }
  });
};

const requireAuth = async () => {
  const sb = supabase();
  if (!sb) return;
  const { data: { session } } = await sb.auth.getSession();
  if (!session) {
    localStorage.setItem('redirectAfterLogin', window.location.pathname);
    window.location.href = '/login.html';
  }
};

document.addEventListener('DOMContentLoaded', initAuth);
