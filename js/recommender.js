let licenseData = null;
let state = {
  currentQuestionId: 'q1',
  answers: []
};
let answerHistory = [];

const licenseColors = {
  MIT: { border: '#3b82f6', text: 'text-blue-400', bg: 'bg-blue-900/30' },
  'Apache-2.0': { border: '#f97316', text: 'text-orange-400', bg: 'bg-orange-900/30' },
  'GPL-v3': { border: '#ef4444', text: 'text-red-400', bg: 'bg-red-900/30' },
  'CC-BY-4.0': { border: '#22c55e', text: 'text-green-400', bg: 'bg-green-900/30' },
  'CC-BY-NC-4.0': { border: '#a855f7', text: 'text-purple-400', bg: 'bg-purple-900/30' }
};

/**
 * Krio Legal Glossary - Legal terms with Krio translations for Sierra Leonean users
 */
const legalGlossary = {
  'Liability': 'Your responsibility for any damage or loss from your creation.',
  'Patent': 'Government right that gives you exclusive control over your invention.',
  'Copyleft': 'Rule that requires anyone using your creation to share the code open.',
  'Copyright': 'Your exclusive right to take your creation.',
  'License': 'Permission that allows you to use someone elses creation.',
  'Attribution': 'Credit that you give to the original creator.',
  'Derivative': 'New version made from the original creation.',
  'Commercial Use': 'Use for making money.',
  'Trademark': 'Sign that identifies your brand and makes it different.',
  'Open Source': 'Code that anyone can use and modify.',
  'Permissive': 'No strict rules on how you use it.'
};

/**
 * Krio Tooltip Installer - Wraps legal terms in tooltip spans
 */
function installKrioTooltips() {
  const containers = document.querySelectorAll('#question-container, #answer-trail');
  const terms = Object.keys(legalGlossary);
  
  containers.forEach(container => {
    if (!container) return;
    let html = container.innerHTML;
    
    terms.forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      if (regex.test(html)) {
        html = html.replace(regex, (match) => {
          return `<span class="krio-tooltip" data-term="${term}">${match}<span class="tooltip-text">${sanitize(legalGlossary[term])}</span></span>`;
        });
      }
    });
    
    container.innerHTML = html;
  });
}

/**
 * Initializes the recommender by fetching the license data and loading the first question.
 * @returns {Promise<void>}
 */
async function initRecommender() {
  try {
    const response = await fetch('data/licenses.json');
    if (!response.ok) throw new Error('Failed to load license data');
    licenseData = await response.json();
    loadQuestion('q1');
  } catch (error) {
    console.error('Error loading licenses:', error);
    document.getElementById('question-container').innerHTML = `
      <p class="text-red-400 text-center">Failed to load license data. Please try again.</p>
    `;
  }
}

/**
 * Loads and displays a specific question by its ID.
 * @param {string} id - The ID of the question to load.
 */
function loadQuestion(id) {
  state.currentQuestionId = id;
  const question = licenseData.questions.find(q => q.id === id);
  if (!question) return;

  updateProgress();

  const container = document.getElementById('question-container');
  container.classList.remove('question-slide-in');
  void container.offsetWidth;
  container.classList.add('question-slide-in');

  container.innerHTML = `
    <h2 class="text-2xl font-semibold mb-6 text-center">${sanitize(question.text)}</h2>
    <div class="flex flex-col gap-4">
      ${question.options.map((opt, idx) => `
        <button 
          class="option-btn rounded-xl px-6 py-4 text-white text-lg"
          onclick="handleAnswer(${JSON.stringify(opt).replace(/"/g, '&quot;')})"
        >
          ${sanitize(opt.label)}
        </button>
      `).join('')}
    </div>
  `;
  
  installKrioTooltips();
}

/**
 * Handles the user's selection for a question.
 * @param {Object} option - The selected option object.
 */
function handleAnswer(option) {
  const answerData = {
    questionId: state.currentQuestionId,
    label: option.label
  };
  state.answers.push(answerData);
  answerHistory.push(answerData);
  updateTrail();

  // Check for legal conflicts before proceeding
  const conflict = checkConflict(state.answers, option);
  if (conflict) {
    showConflictModal(conflict);
    return;
  }

  if (option.result) {
    showLoading();
    setTimeout(() => {
      showResult(option.result);
    }, 1000);
  } else if (option.next) {
    showLoading();
    setTimeout(() => {
      loadQuestion(option.next);
    }, 600);
  }
}

/**
 * Logic Conflict Engine - Detects contradictions in user choices
 */
function checkConflict(answers, selectedOption) {
  // Extract user choices for analysis
  const commercialChoice = answers.find(a => a.label === 'Yes' || a.label === 'No')?.label;
  const commercialAnswer = answers.find(a => a.questionId === 'q2');
  const patentAnswer = answers.find(a => a.questionId === 'q3');
  const contentAnswer = answers.find(a => a.questionId === 'q4');
  
  // Conflict 1: No commercial but selecting MIT (which allows commercial)
  if (commercialAnswer && commercialAnswer.label === 'No' && selectedOption.result === 'MIT') {
    return {
      title: 'Legal Conflict Detected',
      message: 'MIT License allows commercial use, but you selected "No" for commercial use.',
      suggestion: 'Consider using GPL-v3 if you want to restrict commercial use.'
    };
  }
  
  // Conflict 2: Code path but selecting CC-BY-NC (for content only)
  if (contentAnswer && selectedOption.result?.startsWith('CC-') && patentAnswer?.label === 'Yes') {
    return {
      title: 'License Path Conflict',
      message: 'You selected code (software) but chose a content license (Creative Commons).',
      suggestion: 'For code, use software licenses like MIT, Apache-2.0, or GPL-v3.'
    };
  }
  
  // Conflict 3: Private code but selecting GPL (which requires open distribution)
  if (commercialAnswer && commercialAnswer.label === 'No' && selectedOption.result === 'GPL-v3') {
    // This is actually valid - GPL doesn't allow commercial, so it's OK
  }
  
  return null;
}

/**
 * Show Conflict Warning Modal
 */
function showConflictModal(conflict) {
  const modal = document.createElement('div');
  modal.id = 'conflict-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="glass max-w-md p-8 rounded-2xl text-center">
      <div class="text-6xl mb-4">⚠️</div>
      <h2 class="text-2xl font-bold text-yellow-400 mb-4">${conflict.title}</h2>
      <p class="text-gray-300 mb-4">${conflict.message}</p>
      <div class="glass rounded-xl p-4 mb-6 text-left">
        <p class="text-sm text-gray-400">Suggestion:</p>
        <p class="text-white">${conflict.suggestion}</p>
      </div>
      <button onclick="dismissConflictModal()" class="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl">
        Understood
      </button>
    </div>
  `;
  document.body.appendChild(modal);
}

function dismissConflictModal() {
  const modal = document.getElementById('conflict-modal');
  if (modal) modal.remove();
  
  // Continue with the quiz
  answerHistory.pop();
  state.answers.pop();
  updateTrail();
  if (answerHistory.length > 0) {
    loadQuestion(state.currentQuestionId);
  } else {
    loadQuestion('q1');
  }
}

/**
 * Updates the breadcrumb trail of previous answers.
 */
function updateTrail() {
  const trail = document.getElementById('answer-trail');
  const backBtn = document.getElementById('back-btn');
  
  if (!trail || !backBtn) return;

  trail.innerHTML = answerHistory.map((a, i) => `
    <button class="answer-badge px-2 py-1 rounded-full text-xs cursor-pointer" onclick="jumpTo(${i})">
      ${a.label}
    </button>
  `).join('');
  
  backBtn.classList.toggle('hidden', answerHistory.length === 0);
  
  installKrioTooltips();
}

/**
 * Jumps back to a specific previous question in the trail.
 * @param {number} index - The index of the question in the history to jump to.
 */
function jumpTo(index) {
  answerHistory = answerHistory.slice(0, index + 1);
  const target = answerHistory[index];
  if (target && target.questionId) {
    state.currentQuestionId = target.questionId;
    updateTrail();
    loadQuestion(target.questionId);
  } else {
    state.currentQuestionId = 'q1';
    updateTrail();
    loadQuestion('q1');
  }
}

/**
 * Updates the progress bar based on the current question.
 */
function updateProgress() {
  const progressMap = {
    'q1': '25%',
    'q2': '50%',
    'q3': '75%',
    'q4': '100%'
  };
  const progress = progressMap[state.currentQuestionId] || '25%';
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) progressBar.style.width = progress;
}

/**
 * Displays a loading indicator in the question container.
 */
function showLoading() {
  const container = document.getElementById('question-container');
  if (!container) return;
  container.innerHTML = `
    <div class="text-center py-12">
      <div class="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-gray-300">Processing your choices...</p>
    </div>
  `;
}

/**
 * Hides the loading indicator (noop as it's replaced).
 */
function hideLoading() {
  return;
}

/**
 * Shows the final recommended license result.
 * @param {string} licenseKey - The key of the recommended license.
 */
function showResult(licenseKey) {
  const progressBar = document.getElementById('progress-bar');
  if (progressBar) progressBar.style.width = '100%';
  
  const license = licenseData.licenses[licenseKey];
  if (!license) return;

  const colors = licenseColors[licenseKey] || { border: '#a78bfa', text: 'text-purple-400', bg: 'bg-purple-900/30' };

  const container = document.getElementById('question-container');
  container.style.borderTop = `4px solid ${colors.border}`;
  container.classList.add('question-slide-in');

  container.innerHTML = `
    <div class="text-center mb-6">
      <div class="text-6xl mb-4">🎉</div>
      <h2 class="text-2xl font-bold ${colors.text} mb-2">Recommended License</h2>
      <h3 class="text-3xl font-bold mb-4">${license.name}</h3>
      <div class="flex flex-wrap justify-center gap-2 mb-4">
        <span class="${colors.bg} border rounded-full px-3 py-1 text-sm flex items-center gap-1">
          ${license.commercial ? '<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Commercial Use' : '<svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> No Commercial'}
        </span>
        <span class="${colors.bg} border rounded-full px-3 py-1 text-sm flex items-center gap-1">
          ${license.patentProtection ? '<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Patent Protection' : '<svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> No Patents'}
        </span>
        <span class="${colors.bg} border rounded-full px-3 py-1 text-sm flex items-center gap-1">
          ${license.copyleft ? '<svg class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path></svg> Copyleft' : '<svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Permissive'}
        </span>
      </div>
    </div>
    <div class="text-left space-y-4 mb-6">
      <p class="text-gray-300">${license.summary}</p>
      <div class="glass rounded-xl p-4">
        <p class="text-sm text-gray-400 mb-1">Best for:</p>
        <p class="text-white">${license.bestFor}</p>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <button 
        onclick="generateDocuments('${licenseKey}')"
        class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl px-6 py-4 text-white font-semibold text-lg transition"
      >
        Generate My Documents
      </button>
      <button 
        onclick="startOver()"
        class="option-btn rounded-xl px-6 py-3 text-white transition"
      >
        Start Over
      </button>
      <a 
        href="${license.url}" 
        target="_blank"
        class="option-btn rounded-xl px-6 py-3 text-white text-center transition"
      >
        Learn More ↗
      </a>
      <button 
        onclick="shareResult()"
        class="option-btn rounded-xl px-6 py-3 text-white transition"
      >
        Share Result
      </button>
    </div>
    <div class="mt-8 border-t border-white/10 pt-6 text-center">
      <p class="text-sm text-gray-400 mb-4">Have more questions?</p>
      <div class="flex flex-wrap justify-center gap-2">
        <a href="chatbot.html?q=What does Commercial Use mean?" class="glass rounded-full px-4 py-2 text-xs hover:bg-white/10 transition">What does Commercial Use mean?</a>
        <a href="chatbot.html?q=Can I change licenses later?" class="glass rounded-full px-4 py-2 text-xs hover:bg-white/10 transition">Can I change licenses later?</a>
        <a href="chatbot.html?q=Is this legally binding in Salone?" class="glass rounded-full px-4 py-2 text-xs hover:bg-white/10 transition">Is this legally binding in Salone?</a>
      </div>
    </div>
  `;

  installKrioTooltips();
  window.currentLicenseKey = licenseKey;
  launchConfetti();
}

/**
 * Launches a celebratory confetti animation upon completing the quiz.
 */
function launchConfetti() {
  const confettiContainer = document.getElementById('confetti');
  if (!confettiContainer) return;
  
  document.querySelectorAll('.confetti-piece').forEach(p => p.remove());
  
  const colors = ['#a78bfa', '#f472b6', '#22c55e', '#3b82f6', '#f97316'];
  
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = (Math.random() * 100) + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 0.5) + 's';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confettiContainer.appendChild(piece);
  }
  
  setTimeout(() => {
    confettiContainer.querySelectorAll('.confetti-piece').forEach(p => p.remove());
  }, 3500);
}

/**
 * Copies a pre-filled shareable message to the clipboard.
 */
function shareResult() {
  const licenseKey = window.currentLicenseKey || (state.answers.length > 0 ? null : null);
  const license = licenseData?.licenses?.[licenseKey];
  const licenseName = license?.name || 'a recommended open source license';
  const shareText = `I just found out my project should use ${licenseName} — Try OpenRights SL at openrights-sl.github.io`;
  
  navigator.clipboard.writeText(shareText).then(() => {
    if (typeof showToast === 'function') {
      showToast('Copied to clipboard!');
    } else {
      const toast = document.getElementById('toast');
      if (toast) {
        toast.textContent = 'Copied to clipboard!';
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
      }
    }
  }).catch(() => {
    const textArea = document.createElement('textarea');
    textArea.value = shareText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  });
}

/**
 * Saves the selected license and navigates to the document generator.
 * @param {string} licenseKey - The key of the license to generate documents for.
 */
function generateDocuments(licenseKey) {
  const license = licenseData.licenses[licenseKey];
  license.key = licenseKey;
  localStorage.setItem('selectedLicense', JSON.stringify(license));
  window.location.href = './generator.html';
}

/**
 * Resets the recommender state to the beginning.
 */
function startOver() {
  answerHistory = [];
  state = {
    currentQuestionId: 'q1',
    answers: []
  };
  updateTrail();
  loadQuestion('q1');
}

/**
 * Navigates to di previous question in di history trail.
 */
function goBack() {
  if (answerHistory.length === 0) return;
  const popped = answerHistory.pop();
  state.answers.pop();
  updateTrail();
  loadQuestion(popped.questionId);
}

window.handleAnswer = handleAnswer;
window.generateDocuments = generateDocuments;
window.startOver = startOver;
window.jumpTo = jumpTo;
window.shareResult = shareResult;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.dismissConflictModal = dismissConflictModal;
window.goBack = goBack;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initRecommender);
} else {
  initRecommender();
}