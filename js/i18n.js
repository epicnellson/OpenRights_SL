/**
 * OpenRights SL — Internationalisation System
 * Supports: English (en) and Sierra Leone Krio (krio)
 * Usage: Add data-i18n="key" to any HTML element to auto-translate.
 */

const TRANSLATIONS = {
  en: {
    // NAVBAR
    navHome: 'Home',
    navLicense: 'License',
    navCompare: 'Compare',
    navTools: 'Tools',
    navScanner: '🔍 License Scanner',
    navAnalyzer: '🛡️ Contract Analyzer',
    navRegistry: '🗂️ Creator Registry',
    navDashboard: '📊 Impact Dashboard',
    navBatch: '📋 Batch Generator',
    navAbout: 'About',
    navChat: '💬 Chat',
    navProfile: 'Set Up Profile',
    navProfileDefault: 'Set Up Profile',

    // INDEX HERO
    heroTitle1: 'Protect Your Creative Work in Sierra Leone',
    heroTitle2: 'License Your Code the Right Way',
    heroTitle3: 'Generate Legal Documents Instantly',
    heroTitle4: 'Know Your Digital Rights 🇸🇱',
    heroSub: 'Free legal tools for developers, musicians, writers and creators across Sierra Leone.',
    heroSubtitle: 'Free legal tools for developers, musicians, writers and creators across Sierra Leone.',
    heroCta1: '🚀 Get My License',
    heroCta2: '💬 Ask AI Assistant',

    // STATS
    statLicenses: 'Licenses Generated',
    statConflicts: 'Conflicts Detected',
    statCreators: 'Creators Registered',
    statNation: 'Nation Served',

    // FEATURE CARDS
    card1Title: 'License Recommender',
    card1Desc: 'Answer 4 questions. Get your perfect license instantly.',
    card2Title: 'Document Generator',
    card2Desc: 'Download LICENSE.txt, Privacy Policy, and PDF Creation Record.',
    card3Title: 'AI Legal Assistant',
    card3Desc: 'Ask anything about IP law in plain English or Krio.',
    card4Title: 'Conflict Scanner',
    card4Desc: 'Detect license conflicts in your project dependencies.',
    card5Title: 'Contract Analyzer',
    card5Desc: 'AI scans contracts for red flags against Sierra Leone law.',
    card6Title: 'Creator Registry',
    card6Desc: 'Join the public directory of Sierra Leonean open source projects.',

    // HOW IT WORKS
    howTitle: 'How It Works',
    step1: 'Answer 4 simple questions about your project type and goals',
    step2: 'Receive your license recommendation with full explanation instantly',
    step3: 'Download LICENSE.txt, Privacy Policy, and a signed PDF Creation Record',

    // RECOMMENDER
    recommenderTitle: 'Find Your License',
    recommenderSubtitle: 'Answer a few questions to get your perfect license recommendation',
    btnStartOver: 'Start Over',
    btnBack: 'Back',
    btnGenerate: '🚀 Generate My Documents',
    btnLearnMore: '📖 Learn More',
    btnShare: '📤 Share Result',
    btnWhatsApp: '📱 Share via WhatsApp',

    // GENERATOR
    generatorTitle: 'Generate Your Documents',
    labelName: 'Full Name',
    labelProject: 'Project Name',
    labelYear: 'Year',
    labelDescription: 'Project Description',
    labelUrl: 'Project URL (optional)',
    btnLicense: '📄 Download LICENSE.txt',
    btnPolicy: '📋 Download Privacy Policy',
    btnPDF: '📑 Download Creation Record PDF',
    btnPrint: '🖨️ Print Summary Card',
    btnGist: '📤 Publish to GitHub Gist',
    livePreview: 'Live Preview',
    healthScore: 'License Health Score',
    badgeTitle: '🏷️ Your GitHub Badge',

    // CHATBOT
    chatTitle: 'Legal Assistant',
    chatSubtitle: 'Ask anything about open source licenses, digital rights, and IP law in Sierra Leone',
    chatPlaceholder: 'Ask about MIT, GPL, copyright...',
    chatSend: 'Send',
    chatClear: 'Clear Chat',
    chatWelcome: '👋 Hello! I am the OpenRights SL Legal Assistant.\n\nI can help you understand open source licenses, copyright law, and digital rights in Sierra Leone.\n\nWhat would you like to know today?',
    chatDisclaimer: 'AI-generated · Not legal advice · Consult a qualified lawyer',
    chip1: 'What is the MIT License?',
    chip2: 'GPL vs Apache differences',
    chip3: 'How do I protect my app in Sierra Leone?',
    chip4: 'What is a Digital Public Good?',
    apiKeyTitle: 'Connect Your AI Assistant',
    apiKeyDesc: 'Powered by Groq AI — fast, free, privacy-friendly',
    apiKeyPlaceholder: 'Enter your Groq API key...',
    apiKeyHelper: 'Get your free API key at console.groq.com — no credit card required',
    apiKeyConnect: 'Connect',
    apiKeySkip: 'Skip for now',

    // SCANNER
    scannerTitle: 'License Conflict Scanner',
    scannerSubtitle: 'Paste your package.json to detect license conflicts',
    btnScan: '🔍 Scan for Conflicts',
    scanResults: 'Scan Results',

    // ANALYZER
    analyzerTitle: 'Contract & TOS Analyzer',
    analyzerSubtitle: 'Paste any contract for AI analysis against Sierra Leone law',
    btnAnalyze: '🛡️ Analyze Contract',

    // COMPARISON
    comparisonTitle: 'License Comparison',
    comparisonSubtitle: 'Compare all 5 open source licenses side by side',
    mixerTitle: '🧩 License Compatibility Mixer',
    mixerSubtitle: 'Drag two licenses to check if you can legally combine them',

    // REGISTRY
    registryTitle: 'Sierra Leone Creator Registry',
    registrySubtitle: 'A public directory of open source projects by Sierra Leonean creators',
    btnRegister: '🗂️ Register Project',

    // ABOUT
    aboutTitle: 'About OpenRights SL',
    aboutSubtitle: 'Built by students. Powered by AI. Free for Sierra Leone.',

    // PROFILE
    profileTitle: 'Your Creator Profile',
    btnSave: 'Save Profile',
    btnClear: 'Clear Profile',

    // HISTORY
    historyTitle: 'Certificate History',
    historyEmpty: 'No certificates generated yet.',
    btnRedownload: 'Re-Download PDF',
    btnClearHistory: 'Clear History',

    // FOOTER
    footerTagline: 'Empowering Sierra Leonean creators with legal clarity and open source knowledge.',
    footerMade: '🇸🇱 Made in Sierra Leone',
    footerNav: 'Navigate',
    footerAcademic: 'Academic Context',
    footerCopyright: '© 2026 OpenRights SL · MIT Licensed · Built as a Digital Public Good · DLAW207',

    // COMMON
    btnDownload: 'Download',
    btnCopy: '📋 Copy',
    btnCopied: '✓ Copied!',
    loading: 'Loading...',
    error: 'An error occurred. Please try again.',
    success: 'Success!',
    required: 'This field is required',

    // LANGUAGE NOTIFICATION
    langEN: '🇬🇧 English mode active!',
    langKR: '🇸🇱 Krio mode active!',
    chatSwitchEN: '🇬🇧 Switched to English mode. I will now respond in English.',
    chatSwitchKR: '🇸🇱 Krio mod aktiv naw! A go ansa ɔl yu kwestshɔn na Krio.',

    // CHATBOT SYSTEM PROMPT LANGUAGE
    chatSystemLang: 'Respond in English.'
  },

  krio: {
    // NAVBAR
    navHome: 'Ome',
    navLicense: 'Laisens',
    navCompare: 'Kompier',
    navTools: 'Tuls',
    navScanner: '🔍 Laisens Sken',
    navAnalyzer: '🛡️ Kontrak Analiza',
    navRegistry: '🗂️ Krieta Rejistri',
    navDashboard: '📊 Impak Dashbod',
    navBatch: '📋 Bash Jeneret',
    navAbout: 'Abot',
    navChat: '💬 Tok',
    navProfile: 'Set Ap Yu Profail',
    navProfileDefault: 'Set Ap Yu Profail',

    // INDEX HERO
    heroTitle1: 'Pritekt Yu Krieitiv Wok na Salone 🇸🇱',
    heroTitle2: 'Laisens Yu Kod di Rayt We',
    heroTitle3: 'Jeneret Legal Dokument Kwik Kwik',
    heroTitle4: 'No Yu Digital Raits 🇸🇱',
    heroSub: 'Fri legal tuls foh divelopa dem, myuzishen dem, rayta dem en krieta dem foh ɔl Salone.',
    heroSubtitle: 'Fri legal tuls foh divelopa dem, myuzishen dem, rayta dem en krieta dem foh ɔl Salone.',
    heroCta1: '🚀 Gɛt Mi Laisens',
    heroCta2: '💬 Aks AI Asistan',

    // STATS
    statLicenses: 'Laisens Don Jeneret',
    statConflicts: 'Konflikt Don Ditɛkt',
    statCreators: 'Krieta Don Rejista',
    statNation: 'Nashɔn We Wi Sɛv',

    // FEATURE CARDS
    card1Title: 'Laisens Rekomenda',
    card1Desc: 'Ansa 4 kwestshɔn. Gɛt yu pɛfɛkt laisens kwik.',
    card2Title: 'Dokument Jeneret',
    card2Desc: 'Dawnlod LICENSE.txt, Prayvasi Pɔlisi, en PDF Krieshɔn Rekɔd.',
    card3Title: 'AI Legal Asistan',
    card3Desc: 'Aks eniting abot IP lɔ na Krio o Inglish.',
    card4Title: 'Konflikt Sken',
    card4Desc: 'Fayn laisens konflikt dem insay yu projɛkt.',
    card5Title: 'Kontrak Analiza',
    card5Desc: 'AI de sken kontrak foh red flags agɛnst Salone lɔ.',
    card6Title: 'Krieta Rejistri',
    card6Desc: 'Join di pɔblik dayrɛktri foh Salone opn sors projɛkt dem.',

    // HOW IT WORKS
    howTitle: 'Aw I De Wok',
    step1: 'Ansa 4 simpul kwestshɔn abot yu projɛkt taip en gol dem',
    step2: 'Risiv yu laisens rekomendeshɔn wit ful eksplɔneshɔn kwik',
    step3: 'Dawnlod LICENSE.txt, Prayvasi Pɔlisi, en sain PDF Krieshɔn Rekɔd',

    // RECOMMENDER
    recommenderTitle: 'Fayn Yu Laisens',
    recommenderSubtitle: 'Ansa ɛni kwestshɔn dem foh gɛt yu pɛfɛkt laisens rekomendeshɔn',
    btnStartOver: 'Stat Bak',
    btnBack: 'Bak',
    btnGenerate: '🚀 Jeneret Mi Dokument Dem',
    btnLearnMore: '📖 Lɛn Moh',
    btnShare: '📤 Shia Rizɔlt',
    btnWhatsApp: '📱 Shia via WhatsApp',

    // GENERATOR
    generatorTitle: 'Jeneret Yu Dokument Dem',
    labelName: 'Ful Nem',
    labelProject: 'Projɛkt Nem',
    labelYear: 'Yia',
    labelDescription: 'Projɛkt Deskripshɔn',
    labelUrl: 'Projɛkt URL (ɔpshɔnɔl)',
    btnLicense: '📄 Dawnlod LICENSE.txt',
    btnPolicy: '📋 Dawnlod Prayvasi Pɔlisi',
    btnPDF: '📑 Dawnlod Krieshɔn Rekɔd PDF',
    btnPrint: '🖨️ Print Samari Kad',
    btnGist: '📤 Pɔblish tu GitHub Gist',
    livePreview: 'Laiv Priview',
    healthScore: 'Laisens Hɛlth Skɔ',
    badgeTitle: '🏷️ Yu GitHub Baj',

    // CHATBOT
    chatTitle: 'Legal Asistan',
    chatSubtitle: 'Aks eniting abot opn sors laisens, digital raits, en IP lɔ na Salone',
    chatPlaceholder: 'Aks abot MIT, GPL, kopirait...',
    chatSend: 'Sɛn',
    chatClear: 'Klia Chat',
    chatWelcome: '👋 Kushɛ! A na di OpenRights SL Legal Asistan.\n\nA fit elp yu ondastand opn sors laisens, kopirait lɔ, en digital raits na Salone.\n\nWetin yu wɛn no tɛde?',
    chatDisclaimer: 'AI don jeneret am · Nɔ na legal advais · Tok tu wan layɔ foh sirios mata',
    chip1: 'Wetin MIT Laisens min?',
    chip2: 'GPL vs Apache difrans',
    chip3: 'Aw A go pritekt mi app na Salone?',
    chip4: 'Wetin Digital Public Good min?',
    apiKeyTitle: 'Konɛkt Yu AI Asistan',
    apiKeyDesc: 'Pawa bai Groq AI — fast, fri, en prayvit',
    apiKeyPlaceholder: 'Ɛnta yu Groq API ki...',
    apiKeyHelper: 'Gɛt yu fri API ki na console.groq.com — no kɛdit kad nid',
    apiKeyConnect: 'Konɛkt',
    apiKeySkip: 'Skip foh naw',

    // SCANNER
    scannerTitle: 'Laisens Konflikt Sken',
    scannerSubtitle: 'Pɛst yu package.json foh fayn laisens konflikt',
    btnScan: '🔍 Sken foh Konflikt',
    scanResults: 'Sken Rizɔlt',

    // ANALYZER
    analyzerTitle: 'Kontrak & TOS Analiza',
    analyzerSubtitle: 'Pɛst eni kontrak foh AI analisis agɛnst Salone lɔ',
    btnAnalyze: '🛡️ Analayz Kontrak',

    // COMPARISON
    comparisonTitle: 'Laisens Kompɛrishɔn',
    comparisonSubtitle: 'Kompier ɔl 5 opn sors laisens dem said bai said',
    mixerTitle: '🧩 Laisens Compat Miksa',
    mixerSubtitle: 'Drag tu laisens foh chek if yu fit legali kombain dem',

    // REGISTRY
    registryTitle: 'Salone Krieta Rejistri',
    registrySubtitle: 'Wan pɔblik dayrɛktri foh opn sors projɛkt dem bai Salone krieta dem',
    btnRegister: '🗂️ Rejista Projɛkt',

    // ABOUT
    aboutTitle: 'Abot OpenRights SL',
    aboutSubtitle: 'Bil bai studɛnt dem. Pawa bai AI. Fri foh Salone.',

    // PROFILE
    profileTitle: 'Yu Krieta Profail',
    btnSave: 'Sev Profail',
    btnClear: 'Klia Profail',

    // HISTORY
    historyTitle: 'Sɛtifikit Istri',
    historyEmpty: 'No sɛtifikit don jeneret yɛt.',
    btnRedownload: 'Dawnlod PDF Agen',
    btnClearHistory: 'Klia Istri',

    // FOOTER
    footerTagline: 'Wi de empawo Salone krieta dem wit legal klariti en opn sors nolej.',
    footerMade: '🇸🇱 Mil na Salone',
    footerNav: 'Naviget',
    footerAcademic: 'Akademik Kontɛkst',
    footerCopyright: '© 2026 OpenRights SL · MIT Laisens · Bil as Digital Public Good · DLAW207',

    // COMMON
    btnDownload: 'Dawnlod',
    btnCopy: '📋 Kopi',
    btnCopied: '✓ Don Kopi!',
    loading: 'De lod...',
    error: 'Ɛrɔ don hapɛn. Tri agen.',
    success: 'Sɔksɛs!',
    required: 'Dis fild nid',

    // LANGUAGE NOTIFICATION
    langEN: '🇬🇧 English mode active!',
    langKR: '🇸🇱 Krio mod aktiv!',
    chatSwitchEN: '🇬🇧 Switched to English mode. I will now respond in English.',
    chatSwitchKR: '🇸🇱 Krio mod aktiv naw! A go ansa ɔl yu kwestshɔn na Krio.',

    // CHATBOT SYSTEM PROMPT LANGUAGE
    chatSystemLang: `IMPORTANT: You MUST respond entirely in Sierra Leonean Krio language.

Use natural conversational Krio as spoken in Freetown. Key terms:
License=Laisens, Copyright=Kopirayt, Software=Softwe, Rights=Raits,
Creator=Krieta, Permission=Pamishon, Open Source=Opn Sors, Law=Lɔ,
Commercial=Komashial, Free=Fri, Project=Projɛkt, Code=Kod,
Developer=Divelopa, Document=Dokumɛnt

Always end with: "Yu get moh kwestshɔn? A de yah foh elp yu! 🇸🇱"`
  }
};

// Current language state
let currentLang = localStorage.getItem('appLanguage') || 'en';

/**
 * Converts dot-notation key (nav.home) to camelCase (navHome)
 * @param {string} key
 * @returns {string}
 */
const keyToCamel = (key) => {
  return key.replace(/\.([a-z])/g, (_, c) => c.toUpperCase());
};

/**
 * Gets translation for a key
 * Supports both dot-notation (nav.home) and camelCase (navHome) keys
 * @param {string} key - Translation key
 * @returns {string} Translated text
 */
const t = (key) => {
  const camelKey = keyToCamel(key);
  return TRANSLATIONS[currentLang]?.[camelKey]
    || TRANSLATIONS['en']?.[camelKey]
    || TRANSLATIONS[currentLang]?.[key]
    || TRANSLATIONS['en']?.[key]
    || key;
};

/**
 * Applies translations to all data-i18n and data-lang elements on the page
 */
const applyTranslations = () => {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = t(key);
    if (translation) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.textContent = translation;
      }
    }
  });

  document.querySelectorAll('[data-lang]').forEach(el => {
    if (el.hasAttribute('data-i18n')) return;
    const key = el.getAttribute('data-lang');
    const translation = t(key);
    if (translation) {
      el.textContent = translation;
    }
  });

  document.documentElement.lang = currentLang === 'krio' ? 'en-SL' : 'en';

  // Update language toggle buttons
  const enBtn = document.getElementById('lang-en');
  const krBtn = document.getElementById('lang-kr');
  if (enBtn && krBtn) {
    if (currentLang === 'en') {
      enBtn.classList.add('lang-active');
      krBtn.classList.remove('lang-active');
    } else {
      krBtn.classList.add('lang-active');
      enBtn.classList.remove('lang-active');
    }
  }

  document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
};

/**
 * Switches application language
 * @param {string} lang - 'en' or 'krio'
 */
const switchLanguage = (lang) => {
  if (lang !== 'en' && lang !== 'krio') return;
  currentLang = lang;
  localStorage.setItem('appLanguage', lang);
  applyTranslations();
  showToast(t('lang' + (lang === 'en' ? 'EN' : 'KR')), 'success', 2000);
};

/**
 * Gets the current language system prompt addition for AI calls
 * @returns {string} Language instruction
 */
const getChatLanguageInstruction = () => {
  return TRANSLATIONS[currentLang]?.chatSystemLang || '';
};

/**
 * Retranslates all visible chat messages when language switches
 */
const retranslateChatMessages = () => {
  const botMessages = document.querySelectorAll('.bot-message-text');
  if (botMessages.length === 0) return;

  const history = getStorage('chatHistory', []);
  if (history.length === 0) return;

  const apiKey = getStorage('groqApiKey');
  if (!apiKey) return;

  botMessages.forEach(async (msgEl) => {
    const originalText = msgEl.dataset.originalText || msgEl.textContent;
    if (!msgEl.dataset.originalText) {
      msgEl.dataset.originalText = originalText;
    }

    if (currentLang === 'en') {
      if (msgEl.dataset.englishText) {
        msgEl.textContent = msgEl.dataset.englishText;
      }
      return;
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: localStorage.getItem('groqModel') || 'llama-3.1-8b-instant',
          messages: [{
            role: 'system',
            content: 'Translate the following text to Sierra Leonean Krio. Keep legal terms but add Krio equivalents in brackets. Keep the same meaning and tone. Respond with ONLY the translated text, nothing else.'
          }, {
            role: 'user',
            content: originalText
          }],
          max_tokens: 500
        })
      });

      if (response.ok) {
        const data = await response.json();
        const translated = data.choices[0]?.message?.content;
        if (translated) {
          if (!msgEl.dataset.englishText) {
            msgEl.dataset.englishText = msgEl.textContent;
          }
          msgEl.textContent = translated;
        }
      }
    } catch (e) {
      console.error('Translation error:', e);
    }
  });
};

// Initialize on every page load
document.addEventListener('DOMContentLoaded', () => {
  currentLang = localStorage.getItem('appLanguage') || 'en';
  applyTranslations();

  const enBtn = document.getElementById('lang-en');
  const krBtn = document.getElementById('lang-kr');

  if (enBtn) {
    enBtn.addEventListener('click', () => {
      switchLanguage('en');
      retranslateChatMessages();
    });
  }

  if (krBtn) {
    krBtn.addEventListener('click', () => {
      switchLanguage('krio');
      retranslateChatMessages();
    });
  }

  const mobileEnBtn = document.getElementById('mobile-lang-en');
  const mobileKrBtn = document.getElementById('mobile-lang-kr');

  if (mobileEnBtn) {
    mobileEnBtn.addEventListener('click', () => {
      switchLanguage('en');
      retranslateChatMessages();
    });
  }

  if (mobileKrBtn) {
    mobileKrBtn.addEventListener('click', () => {
      switchLanguage('krio');
      retranslateChatMessages();
    });
  }
});

// Expose globally
window.t = t;
window.switchLanguage = switchLanguage;
window.applyTranslations = applyTranslations;
window.getChatLanguageInstruction = getChatLanguageInstruction;
window.retranslateChatMessages = retranslateChatMessages;
