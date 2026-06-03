/**
 * OpenRights SL — Global Language System
 * Supports: English (EN) and Sierra Leonean Krio (KR)
 * Usage: Add data-lang="key" to any HTML element to auto-translate.
 */

const TRANSLATIONS = {
  EN: {
    // Navigation
    'nav.home': 'Home',
    'nav.license': 'License',
    'nav.compare': 'Compare',
    'nav.tools': '🛠️ Tools ▾',
    'nav.about': 'About',
    'nav.chat': '💬 Chat',
    'nav.profile.default': 'Set Up Profile',
    'nav.scanner': '🔍 License Scanner',
    'nav.analyzer': '🛡️ Contract Analyzer',
    'nav.registry': '🗂️ Creator Registry',
    'nav.dashboard': '📊 Impact Dashboard',
    'nav.batch': '📋 Batch Generator',

    // Hero (index.html)
    'hero.sub': 'Free legal tools for developers, musicians, writers and creators across Sierra Leone.',
    'hero.cta1': '🚀 Get My License →',
    'hero.cta2': '💬 Ask AI Assistant',

    // About page sections
    'about.title': 'About OpenRights SL',
    'about.what.title': 'What is OpenRights SL?',
    'about.why.title': 'Why It Matters in Sierra Leone',

    // Scanner
    'scanner.title': 'GitHub License Scanner',
    'scanner.sub': 'Enter a GitHub repository URL to detect its open source license and compatibility.',
    'scanner.btn': '🔍 Scan',
    'scanner.scanning': 'Scanning repository...',

    // Analyzer
    'analyzer.title': 'AI Contract Analyzer',
    'analyzer.sub': 'Paste any contract, TOS, or EULA to detect risks and IP issues under Sierra Leone law.',
    'analyzer.btn': '🛡️ Analyze Contract',
    'analyzer.placeholder': 'Paste your contract text here...',
    'analyzer.analyzing': 'Analyzing contract...',

    // Registry
    'registry.title': 'Creator Registry',
    'registry.sub': 'Discover Sierra Leonean creators and their open source projects.',
    'registry.refresh': '🔄 Refresh',
    'registry.search': 'Search creators or projects...',

    // Dashboard
    'dashboard.title': 'Impact Dashboard',
    'dashboard.sub': 'Track the adoption of open source licenses across Sierra Leone.',
    'dashboard.licenses': 'Licenses Generated',
    'dashboard.creators': 'Registered Creators',
    'dashboard.popular': 'Most Popular',
    'dashboard.distribution': 'License Distribution',
    'dashboard.activity': 'Recent Activity',
    'dashboard.refresh': '🔄 Refresh Data',

    // Chat
    'chat.placeholder': 'Ask about licenses, copyright, digital rights...',
    'chat.send': 'Send',
    'chat.krio.off': 'KRIO: OFF',
    'chat.krio.on': 'KRIO: ON',
    'chat.clear': '🗑️ Clear',
    'chat.welcome': '👋 Hello! I am the OpenRights SL Legal Assistant.\n\nI can help you understand open source licenses, copyright law, and digital rights in Sierra Leone.\n\nWhat would you like to know today?',

    // Footer
    'footer.tagline': 'Empowering Sierra Leonean creators with legal clarity and open source knowledge.',
    'footer.made': '🇸🇱 Made in Sierra Leone',
    'footer.navigate': 'Navigate',
    'footer.academic': 'Academic Info',

    // Global
    'legal.warning': 'Note: The detailed legal texts below remain in English to maintain absolute legal accuracy under Sierra Leone law.',
  },

  KR: {
    // Navigation
    'nav.home': 'Om',
    'nav.license': 'Laesens',
    'nav.compare': 'Kompare',
    'nav.tools': '🛠️ Tuls ▾',
    'nav.about': 'Abot',
    'nav.chat': '💬 Tok',
    'nav.profile.default': 'Set Ap Yu Profayl',
    'nav.scanner': '🔍 Laesens Skana',
    'nav.analyzer': '🛡️ Kontrak Analayza',
    'nav.registry': '🗂️ Kreeta Redjistri',
    'nav.dashboard': '📊 Impak Dashbod',
    'nav.batch': '📋 Batch Djen',

    // Hero
    'hero.sub': 'Fri lɛgal tul dɛn fɔ dɛvɛlɔpas, mjuzishyans, rayta dɛn, an kryeta dɛn fɔ ɔlOsay Salon.',
    'hero.cta1': '🚀 Gɛt Mi Laesens →',
    'hero.cta2': '💬 Aks AI Asistan',

    // About
    'about.title': 'Abot OpenRights SL',
    'about.what.title': 'Wetin bi OpenRights SL?',
    'about.why.title': 'Wetin i impɔtan fɔ Salon?',

    // Scanner
    'scanner.title': 'GitHub Laesens Skana',
    'scanner.sub': 'Pul in GitHub repo URL fɔ fayn wetin kain laesens i dɔn yuze.',
    'scanner.btn': '🔍 Skan',
    'scanner.scanning': 'Dɛn de skan di repo...',

    // Analyzer
    'analyzer.title': 'AI Kontrak Analayza',
    'analyzer.sub': 'Pɛs in ɛni kontrak, TOS, ɔ EULA fɔ fayn risk dɛn ɔnda Salon lo.',
    'analyzer.btn': '🛡️ Analays Kontrak',
    'analyzer.placeholder': 'Pɛs yu kontrak tɛkst iya...',
    'analyzer.analyzing': 'Dɛn de analays di kontrak...',

    // Registry
    'registry.title': 'Kreeta Redjistri',
    'registry.sub': 'Fayn Salon kryeta dɛn an dɛn opɛn sɔs projɛkt dɛn.',
    'registry.refresh': '🔄 Rifresh',
    'registry.search': 'Sɛch kryeta ɔ projɛkt...',

    // Dashboard
    'dashboard.title': 'Impak Dashbod',
    'dashboard.sub': 'Trak ow opɛn sɔs laesens dɛn de yuze in ɔlOsay Salon.',
    'dashboard.licenses': 'Laesens Wɛ Dɛn Don Djɛn',
    'dashboard.creators': 'Kryeta Wɛ Dɛn Don Redjista',
    'dashboard.popular': 'Di Wɔn Wɛ Dɛn Lɛk Pas',
    'dashboard.distribution': 'Ow Dɛn De Yuze Di Laesens Dɛn',
    'dashboard.activity': 'Nyɔ Aktivi',
    'dashboard.refresh': '🔄 Rifresh Data',

    // Chat
    'chat.placeholder': 'Aks abot laesens, kɔpyɛrait, digita raits...',
    'chat.send': 'Sɛn',
    'chat.krio.off': 'KRIO: AFF',
    'chat.krio.on': 'KRIO: ON',
    'chat.clear': '🗑️ Klia',
    'chat.welcome': '👋 Kushɛ! A na di OpenRights SL Lɛgal Asistan.\n\nA fit yɛp yu ɔndastand opɛn sɔs laesens dɛn, kɔpyɛrait lo, an digita raits in Salon.\n\nWetin yu wɛ nɔ tudɛ?',

    // Footer
    'footer.tagline': 'Wi de gi Salon kryeta dɛn klianes abot lɛgal tins an opɛn sɔs nɔlej.',
    'footer.made': '🇸🇱 Mek in Salon',
    'footer.navigate': 'Muv Araw',
    'footer.academic': 'Skul Info',

    // Global
    'legal.warning': 'Mek yu no: Di lo tɛkst dɛn we de dɔŋ na iŋglish fɔ mek dɛn nɔ lɔs di korekt lo minim na Salon.',
  },

  MEN: {
    // Navigation
    'nav.home': 'Pelei',
    'nav.license': 'Laesens',
    'nav.compare': 'Hekpa',
    'nav.tools': '🛠️ Tuls ▾',
    'nav.about': 'Kaa',
    'nav.chat': '💬 Ndεwε',
    'nav.profile.default': 'Tofei Kpaa',
    'nav.scanner': '🔍 Laesens Kɔɔ',
    'nav.analyzer': '🛡️ Kontrak Gbo',
    'nav.registry': '🗂️ Nduvui Gbo',
    'nav.dashboard': '📊 Impak Kpaa',
    'nav.batch': '📋 Batch',

    // Hero
    'hero.sub': 'Numu gbi yεpε kɔɔ tuls fɔ dɛvɛlɔpas, mjuzishyans a Salon.',
    'hero.cta1': '🚀 Nya Laesens →',
    'hero.cta2': '💬 AI Nduvui',

    // About
    'about.title': 'OpenRights SL Kaa',
    'about.what.title': 'Gbεe OpenRights SL?',
    'about.why.title': 'Nuvui a Salon?',

    // Scanner
    'scanner.title': 'GitHub Laesens Kɔɔ',
    'scanner.sub': 'GitHub repo URL gbo laesens.',
    'scanner.btn': '🔍 Kɔɔ',
    'scanner.scanning': 'Repo kɔɔ...',

    // Analyzer
    'analyzer.title': 'AI Kontrak Gbo',
    'analyzer.sub': 'Kontrak TOS EULA risk kɔɔ.',
    'analyzer.btn': '🛡️ Kontrak Gbo',
    'analyzer.placeholder': 'Kontrak gbo...',
    'analyzer.analyzing': 'Kontrak...',

    // Registry
    'registry.title': 'Nduvui Gbo',
    'registry.sub': 'Salon nduvui a open source.',
    'registry.refresh': '🔄 Gbɔlɔ',
    'registry.search': 'Nduvui kɔɔ...',

    // Dashboard
    'dashboard.title': 'Impak Kpaa',
    'dashboard.sub': 'Laesens kpaa Salon.',
    'dashboard.licenses': 'Laesens',
    'dashboard.creators': 'Nduvui',
    'dashboard.popular': 'Gbɔlɔ',
    'dashboard.distribution': 'Kpaa',
    'dashboard.activity': 'Nyɔ',
    'dashboard.refresh': '🔄 Data',

    // Chat
    'chat.placeholder': 'Laesens, kɔpyɛrait...',
    'chat.send': 'Leli',
    'chat.krio.off': 'KRIO: AFF',
    'chat.krio.on': 'KRIO: ON',
    'chat.clear': '🗑️ Klia',
    'chat.welcome': '👋 Bi wa! Nya OpenRights SL Lɛgal Asistan.\n\nNya laesens, kɔpyɛrait, a Salon.\n\nGbεe?',

    // Footer
    'footer.tagline': 'Salon nduvui a lɛgal.',
    'footer.made': '🇸🇱 Salon',
    'footer.navigate': 'Muv',
    'footer.academic': 'Skul',

    // Global
    'legal.warning': 'Kɔɔ: Lɛgal kpaa na in English fɔ lɛgal accuracy a Salon.',
  },

  TEM: {
    // Navigation
    'nav.home': 'Aka',
    'nav.license': 'Laysens',
    'nav.compare': 'Kɔmpar',
    'nav.tools': '🛠️ Tuls ▾',
    'nav.about': 'Tasoko',
    'nav.chat': '💬 Tɔk',
    'nav.profile.default': 'Set Profayl',
    'nav.scanner': '🔍 Laysens Skana',
    'nav.analyzer': '🛡️ Kɔntrak Analayza',
    'nav.registry': '🗂️ Kriyeta Rejistri',
    'nav.dashboard': '📊 Impak Dashbod',
    'nav.batch': '📋 Bach',

    // Hero
    'hero.sub': 'Lɛgal tuls fɔ dɛvɛlɔpas, mjuzishyans na Salon.',
    'hero.cta1': '🚀 Mi Laysens →',
    'hero.cta2': '💬 AI Asistan',

    // About
    'about.title': 'OpenRights SL Tasoko',
    'about.what.title': 'Seke OpenRights SL?',
    'about.why.title': 'Mɔh na Salon?',

    // Scanner
    'scanner.title': 'GitHub Laysens Skana',
    'scanner.sub': 'GitHub repo URL fɔ laysens.',
    'scanner.btn': '🔍 Skan',
    'scanner.scanning': 'Repo skan...',

    // Analyzer
    'analyzer.title': 'AI Kɔntrak Analayza',
    'analyzer.sub': 'Kɔntrak TOS EULA risk.',
    'analyzer.btn': '🛡️ Kɔntrak',
    'analyzer.placeholder': 'Kɔntrak tɛkst...',
    'analyzer.analyzing': 'Kɔntrak...',

    // Registry
    'registry.title': 'Kriyeta Rejistri',
    'registry.sub': 'Salon kriyeta open sɔs.',
    'registry.refresh': '🔄 Rifrɛsh',
    'registry.search': 'Kriyeta skan...',

    // Dashboard
    'dashboard.title': 'Impak Dashbod',
    'dashboard.sub': 'Laysens na Salon.',
    'dashboard.licenses': 'Laysens',
    'dashboard.creators': 'Kriyeta',
    'dashboard.popular': 'Pɔpula',
    'dashboard.distribution': 'Laysens Yus',
    'dashboard.activity': 'Aktiviti',
    'dashboard.refresh': '🔄 Rifrɛsh Data',

    // Chat
    'chat.placeholder': 'Laysens, kɔpyɛrayt...',
    'chat.send': 'Sɛn',
    'chat.krio.off': 'KRIO: AFF',
    'chat.krio.on': 'KRIO: ON',
    'chat.clear': '🗑️ Kliya',
    'chat.welcome': '👋 Sɛkɛ! In OpenRights SL Lɛgal Asistan.\n\nIn laysens, kɔpyɛrayt, na Salon.\n\nSeke mɔh?',

    // Footer
    'footer.tagline': 'Salon kriyeta lɛgal.',
    'footer.made': '🇸🇱 Na Salon',
    'footer.navigate': 'Naviget',
    'footer.academic': 'Skul Info',

    // Global
    'legal.warning': 'Not: Lɛgal tɛkst na in English fɔ lɛgal accuracy na Salon.',
  }
};

/**
 * Gets the current language from localStorage. Defaults to 'EN'.
 */
function getCurrentLang() {
  return localStorage.getItem('chatLanguage') || 'EN';
}

/**
 * Gets a translated string for the given key and current language.
 * Falls back to English if the key is not found in Krio.
 */
function t(key) {
  const lang = getCurrentLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS['EN'][key] || key;
}

/**
 * Applies all translations to the page by scanning for data-lang attributes.
 * Call this after DOMContentLoaded.
 */
function applyTranslations() {
  const lang = getCurrentLang();
  document.querySelectorAll('[data-lang]').forEach(el => {
    const key = el.getAttribute('data-lang');
    const translation = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS['EN'][key];
    if (translation !== undefined) {
      // Use textContent for buttons/spans, placeholder for inputs
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    }
  });

  // Handle legal warning banners (show if not English)
  document.querySelectorAll('#lang-warning').forEach(banner => {
    if (lang === 'EN') {
      banner.classList.add('hidden');
    } else {
      banner.classList.remove('hidden');
    }
  });
}

/**
 * Switches the language and applies translations across the page.
 */
function switchLanguage(lang) {
  localStorage.setItem('chatLanguage', lang);

  // Update all dropdowns to reflect the current language
  document.querySelectorAll('#lang-toggle, #mobile-lang-toggle').forEach(select => {
    select.value = lang;
  });

  // Apply all data-lang translations
  applyTranslations();

  // Show a toast
  let langName = 'English';
  if (lang === 'KR') langName = 'Krio';
  if (lang === 'MEN') langName = 'Mende';
  if (lang === 'TEM') langName = 'Temne';
  
  const msg = lang === 'EN' ? '🇬🇧 English Language Active!' : '🇸🇱 ' + langName + ' Language Active!';
  if (typeof window.showToast === 'function') {
    window.showToast(msg);
  }
}

/**
 * Initializes the language dropdowns on the current page.
 * Wires up change handlers and sets initial state.
 */
function initLangToggle() {
  const currentLang = getCurrentLang();

  document.querySelectorAll('#lang-toggle, #mobile-lang-toggle').forEach(select => {
    // Set initial dropdown value
    select.value = currentLang;

    // Remove any old event listeners by cloning
    const newSelect = select.cloneNode(true);
    select.parentNode.replaceChild(newSelect, select);

    newSelect.addEventListener('change', (e) => {
      switchLanguage(e.target.value);
    });
  });

  // Apply translations on load
  applyTranslations();
}

// Auto-initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLangToggle);
} else {
  initLangToggle();
}

// Expose globally
window.t = t;
window.switchLanguage = switchLanguage;
window.applyTranslations = applyTranslations;
window.getCurrentLang = getCurrentLang;
