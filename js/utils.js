/**
 * OpenRights SL — Shared Utilities
 * Load this before all other scripts on every page.
 */

/**
 * Shows a toast notification
 * @param {string} message - Toast text
 * @param {string} [type='success'] - success/error/warning
 * @param {number} [duration=3000] - ms to show
 */
const showToast = (message, type = 'success', duration = 3000) => {
  document.querySelectorAll('.toast').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `toast ${type} show`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

/**
 * Downloads text content as a file
 * @param {string} filename
 * @param {string} content
 */
const downloadTextFile = (filename, content) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Gets value from localStorage safely
 * @param {string} key
 * @param {*} [defaultValue=null]
 * @returns {*}
 */
const getStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    try { return JSON.parse(item); } catch { return item; }
  } catch (e) {
    console.error('Storage read error:', e);
    return defaultValue;
  }
};

/**
 * Sets value in localStorage safely
 * @param {string} key
 * @param {*} value
 * @returns {boolean}
 */
const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error('Storage write error:', e);
    return false;
  }
};

/**
 * Initializes navbar behavior on all pages
 */
let navbarInitialized = false;

const initNavbar = () => {
  if (navbarInitialized) return;
  navbarInitialized = true;

  console.log('[navbar] initNavbar called');
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // Hamburger toggle — side drawer
  const burger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    console.log('[navbar] Hamburger found, attaching event listener');

    // Add close button to mobile menu
    if (!mobileMenu.querySelector('#mobile-close-btn')) {
      const closeBtn = document.createElement('div');
      closeBtn.className = 'flex justify-end p-3 border-b border-white/10';
      closeBtn.innerHTML = '<button id="mobile-close-btn" class="text-white hover:text-gray-300 p-1 text-2xl leading-none" aria-label="Close menu">&times;</button>';
      mobileMenu.insertBefore(closeBtn, mobileMenu.firstChild);
    }
    // Create overlay
    let overlay = document.getElementById('mobile-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'mobile-overlay';
      document.body.appendChild(overlay);
    }

    const closeDrawer = () => {
      mobileMenu.classList.remove('menu-open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      burger.setAttribute('aria-expanded', 'false');
    };

    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const opening = !mobileMenu.classList.contains('menu-open');
      console.log('[navbar] Hamburger clicked, opening:', opening);
      mobileMenu.classList.toggle('menu-open');
      overlay.classList.toggle('open');
      document.body.style.overflow = opening ? 'hidden' : '';
      burger.setAttribute('aria-expanded', String(opening));
    });

    overlay.addEventListener('click', closeDrawer);

    // Close button inside drawer
    const closeBtn = document.getElementById('mobile-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Close drawer when any link inside is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('menu-open')) {
        closeDrawer();
      }
    });
  } else {
    if (!burger) console.error('[navbar] Hamburger not found');
    if (!mobileMenu) console.error('[navbar] Mobile menu not found');
  }

  // Tools dropdown
  const toolsBtn = document.getElementById('tools-btn');
  const toolsMenu = document.getElementById('tools-menu');
  if (toolsBtn && toolsMenu) {
    toolsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toolsMenu.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      if (toolsMenu) toolsMenu.classList.add('hidden');
    });
  }

  // Profile display
  const profile = getStorage('creatorProfile');
  const profileEl = document.getElementById('navbar-profile');
  const mobileProfileEl = document.getElementById('mobile-navbar-profile');
  if (profile?.fullName) {
    const firstName = profile.fullName.split(' ')[0];
    const text = '👤 ' + firstName;
    if (profileEl) profileEl.textContent = text;
    if (mobileProfileEl) mobileProfileEl.textContent = text;
  } else {
    if (profileEl) profileEl.textContent = 'Set Up Profile';
    if (mobileProfileEl) mobileProfileEl.textContent = 'Set Up Profile';
  }

  // Active link highlighting
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const navMap = {
    'index.html': 'nav-index',
    'recommender.html': 'nav-license',
    'generator.html': 'nav-license',
    'comparison.html': 'nav-compare',
    'chatbot.html': 'nav-chat',
    'about.html': 'nav-about',
    'scanner.html': 'tools-btn',
    'analyzer.html': 'tools-btn',
    'registry.html': 'tools-btn',
    'dashboard.html': 'tools-btn',
    'batch.html': 'tools-btn'
  };
  const activeId = navMap[path];
  if (activeId) {
    const el = document.getElementById(activeId);
    if (el) el.classList.add('active-nav-link');
  }
};

/**
 * Initializes scroll-reveal animations for .slide-in elements
 */
const initScrollReveal = () => {
  const els = document.querySelectorAll('.slide-in');
  if (els.length === 0) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  els.forEach(el => observer.observe(el));
};

/**
 * Sanitizes a string against XSS
 * @param {string} str - Raw input
 * @returns {string} Safe HTML string
 */
const sanitize = (str) => {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
};

window.sanitize = sanitize;

/**
 * Cleans up stale service workers when port/host changes
 */
const initSwCleanup = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(reg => {
        const swUrl = reg.active?.scriptURL || reg.installing?.scriptURL || '';
        // If the SW was registered from a different origin/port, unregister it
        if (swUrl && !swUrl.startsWith(self.location.origin)) {
          reg.unregister();
        }
      });
    });
  }
};

/**
 * Initialises the feedback button (floating, bottom-left)
 */
const initFeedbackButton = () => {
  const existing = document.getElementById('feedback-btn-wrapper');
  if (existing) return;

  const wrapper = document.createElement('div');
  wrapper.id = 'feedback-btn-wrapper';
  wrapper.className = 'fixed bottom-6 left-6 z-40';

  wrapper.innerHTML = `
    <button id="feedback-btn"
      class="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full shadow-lg transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2"
      aria-label="Give feedback">
      💬 Give Feedback
    </button>

    <div id="feedback-modal"
      class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="glass rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-white/20">
        <h3 class="text-lg font-bold mb-2">Help Us Improve</h3>
        <p class="text-sm text-gray-300 mb-4">OpenRights SL is built for Sierra Leonean creators. Your feedback helps us serve you better.</p>

        <div class="space-y-2 mb-4">
          <label class="flex items-center gap-3 p-3 glass rounded-xl cursor-pointer hover:bg-white/10 transition">
            <input type="radio" name="feedback-type" value="helped" class="accent-purple-500">
            <span>⭐ This helped me</span>
          </label>
          <label class="flex items-center gap-3 p-3 glass rounded-xl cursor-pointer hover:bg-white/10 transition">
            <input type="radio" name="feedback-type" value="suggestion" class="accent-purple-500">
            <span>🤔 I have a suggestion</span>
          </label>
          <label class="flex items-center gap-3 p-3 glass rounded-xl cursor-pointer hover:bg-white/10 transition">
            <input type="radio" name="feedback-type" value="question" class="accent-purple-500">
            <span>❓ I have a question</span>
          </label>
        </div>

        <textarea id="feedback-text"
          class="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm placeholder-gray-400 resize-none mb-4"
          rows="3" placeholder="Tell us more..."></textarea>

        <div class="flex gap-3">
          <button id="feedback-send"
            class="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-xl transition text-sm font-medium">
            Send Feedback
          </button>
          <button id="feedback-close"
            class="px-4 py-2 text-sm text-gray-400 hover:text-white transition">
            Cancel
          </button>
        </div>

        <p class="text-xs text-gray-500 mt-4 text-center">
          Feedback stored locally. Share it with us on GitHub.
          <a href="#" id="feedback-github-link"
            class="text-purple-400 hover:text-purple-300 underline">Share on GitHub Issues →</a>
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(wrapper);

  const btn = document.getElementById('feedback-btn');
  const modal = document.getElementById('feedback-modal');
  const closeBtn = document.getElementById('feedback-close');
  const sendBtn = document.getElementById('feedback-send');
  const githubLink = document.getElementById('feedback-github-link');

  const openModal = () => modal.classList.remove('hidden');
  const closeModal = () => {
    modal.classList.add('hidden');
    document.querySelectorAll('input[name="feedback-type"]').forEach(r => r.checked = false);
    document.getElementById('feedback-text').value = '';
  };

  btn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  sendBtn.addEventListener('click', () => {
    const type = document.querySelector('input[name="feedback-type"]:checked');
    const text = document.getElementById('feedback-text').value.trim();
    if (!type) { showToast('Please select a feedback type.', 'warning'); return; }
    if (!text) { showToast('Please write your feedback.', 'warning'); return; }

    const feedbackLog = JSON.parse(localStorage.getItem('feedbackLog') || '[]');
    feedbackLog.push({
      type: type.value,
      text: text,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    });
    localStorage.setItem('feedbackLog', JSON.stringify(feedbackLog));

    showToast('Thank you! 🇸🇱 Your feedback helps us improve OpenRights SL.');
    closeModal();
  });

  const repoUrl = 'https://github.com/yourusername/openrights-sl/issues/new?template=user-feedback.md';
  githubLink.href = repoUrl;
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollReveal();
  initSwCleanup();
  initFeedbackButton();
});
