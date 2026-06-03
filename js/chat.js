const conversationHistory = [];

let slLegalKnowledge = null;

const SL_LEGAL_CONTEXT = `
SIERRA LEONE LEGAL FRAMEWORK:
You have been provided with the following
real Sierra Leone legal context. Always
reference this when answering questions
about Sierra Leone law.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SIERRA LEONE CYBER SECURITY AND CRIME
ACT 2021 — KEY PROVISIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART I — INTERPRETATION
Section 2: Definitions
- "computer" means an electronic device
  that processes data
- "computer system" means a device or
  group of interconnected devices
- "data" means representations of
  information in any form
- "electronic communication" means any
  transfer of data using electronic means

PART II — CYBERCRIME OFFENCES
Section 4: Unauthorised Access
- A person who intentionally accesses
  a computer system without authorisation
  commits an offence
- Penalty: Fine not exceeding Le 50 million
  or imprisonment not exceeding 3 years

Section 5: Unauthorised Interception
- Intercepting computer data without
  authorisation is an offence
- Penalty: Fine not exceeding Le 100 million
  or imprisonment not exceeding 5 years

Section 6: Data Interference
- Damaging, deleting, or altering computer
  data without authorisation is an offence
- Penalty: Fine not exceeding Le 100 million
  or imprisonment not exceeding 5 years

Section 7: System Interference
- Hindering the functioning of a computer
  system without authorisation is an offence

Section 10: Computer-related Fraud
- Using a computer system to obtain
  economic benefit through dishonest means
- Penalty: Fine not exceeding Le 200 million
  or imprisonment not exceeding 7 years

PART III — CONTENT-RELATED OFFENCES
Section 14: Child Pornography
- Producing or distributing child
  pornography via computer is an offence

Section 15: Hate Speech
- Using computer systems to publish
  content that promotes hatred based on
  race, ethnicity, religion is an offence

PART V — DATA PROTECTION
Section 36: Data Protection Principles
- Personal data must be collected for
  specified, explicit, legitimate purposes
- Data must not be processed in ways
  incompatible with original purpose
- Data must be adequate, relevant,
  not excessive for the purpose
- Data must be accurate and kept up to date
- Data must not be kept longer than necessary

Section 37: Rights of Data Subjects
- Right to access personal data held
- Right to correct inaccurate data
- Right to object to processing
- Right to erasure in certain circumstances

Section 38: Data Controller Obligations
- Must implement appropriate security
- Must notify of data breaches
- Must maintain records of processing

PART VI — ELECTRONIC COMMERCE
Section 41: Electronic Contracts
- Contracts formed electronically are
  valid and enforceable in Sierra Leone
- Electronic signatures are recognised

Section 42: Electronic Evidence
- Electronic records are admissible
  as evidence in court proceedings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SIERRA LEONE COPYRIGHT ACT 2011
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PART I — PROTECTED WORKS
Section 4: Works Protected
- Literary works (books, articles, code)
- Musical works and their recordings
- Artistic works (paintings, sculptures)
- Films and audiovisual works
- Computer programs ARE protected as
  literary works under this Act
- Databases may be protected

Section 5: Conditions for Protection
- Work must be original
- Must be expressed in material form
- No registration required for copyright
  to exist (automatic protection)

Section 6: Duration of Copyright
- Literary, musical, artistic works:
  Life of author plus 50 years
- Computer programs: Life plus 50 years
- Films: 50 years from creation
- Sound recordings: 50 years from creation

PART II — OWNERSHIP
Section 10: First Ownership
- Copyright first vests in the author
- EXCEPTION: Works created in employment
  — copyright belongs to the employer
  unless agreed otherwise
- This is critical for freelance developers:
  get IP ownership in writing

Section 11: Works Made for Commission
- For commissioned works, copyright
  belongs to the creator UNLESS
  the contract says otherwise
- Always specify IP ownership in contracts

PART III — ECONOMIC RIGHTS
Section 14: Rights of Copyright Owner
- Right to reproduce the work
- Right to distribute copies
- Right to perform publicly
- Right to broadcast
- Right to make adaptations/translations
- Right to make available online

Section 15: Moral Rights
- Right of attribution (to be named)
- Right of integrity (object to distortion)
- These rights cannot be transferred
- They last as long as copyright

PART IV — EXCEPTIONS AND LIMITATIONS
Section 22: Fair Dealing
- Research and private study permitted
- Criticism and review permitted
- News reporting permitted
- Teaching purposes permitted
- These exceptions are NARROW in SL law

PART V — INFRINGEMENT
Section 35: Copyright Infringement
- Using protected work without permission
- Commercial infringement penalties up to
  Le 50 million or 5 years imprisonment
- Civil remedies: injunctions and damages

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPEN SOURCE LICENSING IN SIERRA LEONE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

How Open Source Licenses Interact with
Sierra Leone Copyright Act 2011:

1. Open source licenses are legally valid
   in Sierra Leone as copyright licenses
   under the Copyright Act 2011

2. The MIT License grants permission to
   use, copy, modify under SL copyright law

3. GPL copyleft mechanism is enforceable
   in Sierra Leone as a copyright condition

4. Creative Commons licenses are valid
   copyright licenses in Sierra Leone

5. A Sierra Leonean developer who uses
   GPL code in a closed product and
   distributes it violates the GPL AND
   potentially infringes copyright under
   the Copyright Act 2011

6. Work-for-hire: Under SL Copyright Act
   Section 10, if a developer is employed
   and creates software as part of their
   job, the employer owns the copyright
   unless a written agreement says otherwise

7. Freelance developers: Under Section 11,
   commissioned work copyright belongs to
   the creator (developer) unless the
   contract explicitly transfers it to
   the client. This is different from UK/US
   law and many SL developers do not know this.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SIERRA LEONE LEGAL AID BOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Free legal assistance available at:
- Sierra Leone Legal Aid Board
- 9 Bathurst Street, Freetown
- Phone: +232 22 224 716
- Handles: Civil matters including
  basic IP and contract disputes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRACTICAL GUIDANCE FOR SL CREATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. COPYRIGHT IS AUTOMATIC IN SIERRA LEONE
   You do not need to register your work.
   As soon as you write code, compose music,
   or create art, you own the copyright
   under the Copyright Act 2011.

2. ALWAYS HAVE A WRITTEN CONTRACT
   Verbal agreements are very hard to
   enforce. For any freelance work,
   get the IP ownership clause in writing.

3. OPEN SOURCE PROTECTS YOUR WORK
   Using an open source license is a
   legal act under SL copyright law.
   It clearly states your permissions.

4. EMPLOYERS OWN YOUR WORK BY DEFAULT
   If you create software as an employee,
   your employer owns it unless your
   employment contract says otherwise.

5. FREELANCERS OWN THEIR WORK BY DEFAULT
   If you are commissioned to build
   something, you own the copyright unless
   your contract transfers it to the client.
`;

const SYSTEM_PROMPT = `You are a legal
assistant specializing in open source
licensing and intellectual property law.
You help creators in Sierra Leone understand
their digital rights.

${SL_LEGAL_CONTEXT}

INSTRUCTIONS:
- Always prioritize the Sierra Leone legal
  context provided above when answering
- When a question relates to SL law,
  cite the specific Act and Section
- Example: "Under Section 10 of the
  Sierra Leone Copyright Act 2011..."
- For questions about copyright ownership,
  always mention the SL-specific rules
  about employment vs freelance
- Keep answers under 200 words
- Use plain English, avoid excessive jargon
- End every response with one follow-up
  question to continue the conversation
- Always include: "This is general legal
  information, not legal advice. For your
  specific situation, consult the Sierra
  Leone Legal Aid Board."

You were built by students at Limkokwing
University Sierra Leone for DLAW207.`;

const WELCOME_MESSAGE = `👋 Hello! I am the OpenRights SL Legal Assistant.

I can help you understand open source licenses, copyright law, and digital rights in Sierra Leone.

What would you like to know today?`;

const FOLLOWUP_SUGGESTIONS = {
  MIT: ["MIT vs Apache differences?", "Can I use MIT commercially?"],
  GPL: ["What is copyleft?", "GPL and commercial software?"],
  "Sierra Leone": ["Tell me about the 2021 Cyber Act", "Digital rights in Sierra Leone"],
  Creative: ["What is Creative Commons?", "CC-BY vs CC-BY-NC"],
  default: ["What license should I choose?", "How do I protect my work?"]
};

const loadLegalKnowledge = async () => {
  try {
    const response = await fetch('data/sl-legal-knowledge.json');
    if (response.ok) {
      slLegalKnowledge = await response.json();
      console.log('SL legal knowledge loaded');
    }
  } catch(e) {
    console.log('Legal knowledge not loaded:', e);
  }
};

const buildContextFromKnowledge = (userQuery) => {
  if (!slLegalKnowledge) return '';

  const query = userQuery.toLowerCase();
  const relevantProvisions = [];
  const relevantAnswers = [];

  slLegalKnowledge.sources.forEach(source => {
    source.keyProvisions.forEach(provision => {
      const isRelevant = provision.relevantTo
        .some(tag => query.includes(tag));
      if (isRelevant) {
        relevantProvisions.push(
          `${source.shortName} ${provision.section}: ${provision.summary}`
        );
      }
    });
  });

  slLegalKnowledge.commonQuestions.forEach(qa => {
    const questionWords = qa.question.toLowerCase().split(' ');
    const matchScore = questionWords.filter(word => query.includes(word)).length;
    if (matchScore > 2) {
      relevantAnswers.push(`Q: ${qa.question}\nA: ${qa.answer}`);
    }
  });

  if (relevantProvisions.length === 0 && relevantAnswers.length === 0) return '';

  let context = '\n\nRELEVANT SL LAW:\n';
  if (relevantProvisions.length > 0) {
    context += relevantProvisions.slice(0, 3).join('\n') + '\n';
  }
  if (relevantAnswers.length > 0) {
    context += '\nRELEVANT ANSWERS:\n';
    context += relevantAnswers.slice(0, 2).join('\n\n');
  }
  return context;
};

function initChatbot() {
  const keyFromConfig = window.CONFIG?.GROQ_API_KEY;
  if (keyFromConfig && !localStorage.getItem('groqApiKey')) {
    localStorage.setItem('groqApiKey', keyFromConfig);
  }
  const apiKey = localStorage.getItem('groqApiKey');
  
  if (!apiKey) {
    showApiKeyModal();
  } else {
    checkApiKeyStatus(apiKey);
  }

  loadChatHistory();
  displayWelcomeMessage();
}



function showApiKeyModal() {
  document.getElementById('api-key-modal').classList.remove('hidden');
}

function hideApiKeyModal() {
  document.getElementById('api-key-modal').classList.add('hidden');
}

function saveApiKey() {
  const apiKey = document.getElementById('api-key-input').value.trim();
  if (apiKey) {
    localStorage.setItem('groqApiKey', apiKey);
    hideApiKeyModal();
  }
}

function skipApiKey() {
  hideApiKeyModal();
}

function checkApiKeyStatus(apiKey) {
  if (!apiKey || apiKey.length < 10) {
    showApiKeyModal();
  }
}

function loadChatHistory() {
  const savedHistory = localStorage.getItem('chatHistory');
  if (savedHistory) {
    try {
      const messages = JSON.parse(savedHistory);
      messages.forEach(msg => {
        conversationHistory.push(msg);
        displayMessage(msg.role, msg.content, msg.timestamp, false);
      });
    } catch (e) {
      console.error('Error loading chat history:', e);
    }
  }
}

function saveChatHistory() {
  const toSave = conversationHistory.slice(-10);
  localStorage.setItem('chatHistory', JSON.stringify(toSave));
}

function displayWelcomeMessage() {
  if (conversationHistory.length === 0) {
    displayMessage('assistant', WELCOME_MESSAGE, new Date().toISOString(), false);
  }
}

function formatTime(date) {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function getFollowupSuggestions(responseText) {
  const text = responseText.toLowerCase();
  
  if (text.includes('mit')) return FOLLOWUP_SUGGESTIONS.MIT;
  if (text.includes('gpl') || text.includes('general public')) return FOLLOWUP_SUGGESTIONS.GPL;
  if (text.includes('sierra leone') || text.includes('cyber act')) return FOLLOWUP_SUGGESTIONS['Sierra Leone'];
  if (text.includes('creative commons') || text.includes('cc-')) return FOLLOWUP_SUGGESTIONS.Creative;
  
  return FOLLOWUP_SUGGESTIONS.default;
}

/**
 * Displays a message in the chat interface
 * @param {string} role - The sender's role ('user' or 'assistant')
 * @param {string} content - The message content
 * @param {string|null} timestamp - Optional timestamp string
 * @param {boolean} shouldSave - Whether to save to history
 * @param {boolean} showSuggestions - Whether to show quick reply suggestions
 */
function displayMessage(role, content, timestamp = null, shouldSave = true, showSuggestions = false) {
  const container = document.getElementById('messages-container');
  const time = timestamp ? formatTime(timestamp) : formatTime(new Date());
  
  if (shouldSave && role === 'user') {
    conversationHistory.push({ role: 'user', content, timestamp: timestamp || new Date().toISOString() });
  }
  
  if (role === 'user') {
    container.innerHTML += `
      <div class="flex justify-end mb-4 animate-slide-in">
        <div class="bg-purple-600 text-white p-3 rounded-2xl max-w-[80%] shadow-sm hover:-translate-y-0.5 transition-transform">
          <p class="text-sm">${escapeHtml(content)}</p>
          <p class="text-[10px] text-white/60 mt-1 text-right">${time}</p>
        </div>
      </div>
    `;
  } else {
    const suggestions = showSuggestions ? getFollowupSuggestions(content) : [];
    const suggestionsHtml = suggestions.length > 0 ? `
      <div class="flex flex-wrap gap-2 mt-3">
        ${suggestions.map(s => `<button onclick="sendQuickReply('${escapeHtml(s)}')" class="chip px-3 py-1 rounded-full text-xs bg-white/10 border border-white/20 hover:bg-purple-500/30 transition">${escapeHtml(s)}</button>`).join('')}
      </div>
    ` : '';
    
    container.innerHTML += `
      <div class="flex justify-start mb-4 animate-slide-in" style="animation-delay: 0.1s">
        <div class="glass-card p-3 rounded-2xl max-w-[85%] hover:-translate-y-0.5 transition-transform">
          <div class="flex items-start gap-2">
            <div class="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <span class="text-white text-xs font-bold">AI</span>
            </div>
            <div class="flex-1">
              <p class="text-sm whitespace-pre-wrap">${content.replace(/\n/g, '<br>')}</p>
              <p class="text-[10px] text-gray-400 mt-2 border-t border-white/10 pt-1">AI-generated · Not legal advice</p>
              <div class="flex justify-between items-center mt-1">
                <p class="text-[10px] text-gray-500">${time}</p>
                <div class="flex gap-2">
                  <button onclick="readAloud(this, '${escapeHtml(content).replace(/'/g, "\\'")}')" class="text-[10px] text-gray-400 hover:text-white transition bg-white/5 px-2 py-1 rounded-md border border-white/10">🔊 Read</button>
                  <button onclick="copyMessage(this, '${escapeHtml(content).replace(/'/g, "\\'")}')" class="text-[10px] text-gray-400 hover:text-white transition bg-white/5 px-2 py-1 rounded-md border border-white/10">📋 Copy</button>
                </div>
              </div>
              ${suggestionsHtml}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  scrollToBottom();
}

function copyMessage(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copied!';
    setTimeout(() => {
      btn.textContent = '📋 Copy';
    }, 2000);
  });
}

function displayErrorMessage(content) {
  const container = document.getElementById('messages-container');
  container.innerHTML += `
    <div class="flex justify-center mb-4">
      <div class="bg-red-900/30 border border-red-500/50 rounded-xl px-4 py-3 max-w-[80%]">
        <p class="text-sm text-red-300">${escapeHtml(content)}</p>
      </div>
    </div>
  `;
  scrollToBottom();
}

function showTypingIndicator() {
  document.getElementById('typing-indicator').classList.remove('hidden');
  scrollToBottom();
}

function hideTypingIndicator() {
  document.getElementById('typing-indicator').classList.add('hidden');
}

/**
 * Scrolls the chat to the bottom
 */
function scrollToBottom() {
  const messages = document.getElementById('chat-messages');
  if (messages) {
    messages.scrollTop = messages.scrollHeight;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Sends a message to Groq API and displays response
 * @param {string} userText - The user's input message
 */
const sendMessage = async (userText) => {
  const text = (typeof userText === 'string' ? userText : '') || document.getElementById('user-input').value.trim();
  if (!text) return;
  
  document.getElementById('user-input').value = '';
  
  const apiKey = localStorage.getItem('groqApiKey');
  if (!apiKey) {
    setTimeout(() => {
      displayErrorMessage('Please set up your API key to enable AI responses. Click "Change API Key" below.');
    }, 500);
    return;
  }
  
  // Display user bubble and save to history
  displayMessage("user", text);
  showTypingIndicator();

  try {
    const dynamicContext = buildContextFromKnowledge(text);
    const langInstruction = typeof getChatLanguageInstruction === 'function'
      ? '\n\n' + getChatLanguageInstruction()
      : '';
    const activeSystemPrompt = SYSTEM_PROMPT + dynamicContext + langInstruction;

    // Define fallback models
    const MODELS = [
      'llama-3.1-8b-instant',
      'llama3-8b-8192',
      'mixtral-8x7b-32768'
    ];
    
    let response = null;
    let successModel = null;
    let lastError = null;

    // Try models in order until one works
    for (const model of MODELS) {
      try {
        response = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: model,
              messages: [
                { role: "system", content: activeSystemPrompt },
                ...conversationHistory.map(msg => ({ role: msg.role, content: msg.content }))
              ],
              max_tokens: 500,
              temperature: 0.7
            })
          }
        );

        if (response.ok) {
          successModel = model;
          break; // Success! Exit the loop.
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || `API error: ${response.status}`);
        }
      } catch (err) {
        lastError = err;
        console.warn(`Model ${model} failed:`, err.message);
        // Continue to the next model in the array
      }
    }

    // Handle complete failure
    if (!response || !response.ok) {
      throw lastError || new Error("All AI models failed to respond.");
    }

    // Parse and display response
    const data = await response.json();
    const reply = data.choices[0].message.content;

    // Add assistant response to history
    conversationHistory.push({ role: "assistant", content: reply, timestamp: new Date().toISOString() });
    displayMessage("assistant", reply, null, false, true);

    // Save to localStorage (last 10 messages only)
    const recentHistory = conversationHistory.slice(-10);
    localStorage.setItem('chatHistory', JSON.stringify(recentHistory));

  } catch (error) {
    // Show specific error messages
    let errorMsg = `Sorry, I could not connect. (${error.message})`;
    
    if (error.message.includes("401") || error.message.includes("invalid")) {
      errorMsg = "❌ Invalid API key. Click '🔑 Change API Key' below to update it.";
    } else if (error.message.includes("429")) {
      errorMsg = "⏳ Too many requests. Please wait a moment and try again.";
    } else if (error.message.includes("Failed to fetch") || error.message.includes("network")) {
      errorMsg = "🌐 No internet connection detected. Please check your network.";
    }

    displayMessage("assistant", errorMsg);
    conversationHistory.pop();

  } finally {
    hideTypingIndicator();
    scrollToBottom();
  }
};

function sendQuickReply(text) {
  document.getElementById('user-input').value = text;
  sendMessage(text);
}

/**
 * Clears chat history completely
 */
function clearChat() {
  if (confirm('Clear all chat messages?')) {
    conversationHistory.length = 0;
    localStorage.removeItem('chatHistory');
    const container = document.getElementById('messages-container');
    if (container) container.innerHTML = '';
    displayWelcomeMessage();
  }
}

window.sendMessage = sendMessage;
window.sendQuickReply = sendQuickReply;
window.clearChat = clearChat;
window.showApiKeyModal = showApiKeyModal;
window.saveApiKey = saveApiKey;
window.skipApiKey = skipApiKey;
window.copyMessage = copyMessage;

// New Phase 7 Features
let recognition = null;
let isRecording = false;

function initSpeechRecognition() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  recognition.onstart = function() {
    isRecording = true;
    const btn = document.getElementById('voice-btn');
    if (btn) {
      btn.classList.add('text-red-400', 'animate-pulse');
      btn.classList.remove('text-gray-400', 'hover:text-purple-400');
    }
  };
  
  recognition.onresult = function(event) {
    const text = event.results[0][0].transcript;
    document.getElementById('user-input').value = text;
  };
  
  recognition.onend = function() {
    isRecording = false;
    const btn = document.getElementById('voice-btn');
    if (btn) {
      btn.classList.remove('text-red-400', 'animate-pulse');
      btn.classList.add('text-gray-400', 'hover:text-purple-400');
    }
    
    if (document.getElementById('user-input').value.trim() !== '') {
      sendMessage();
    }
  };
  
  recognition.onerror = function(event) {
    console.error('Speech recognition error', event.error);
    isRecording = false;
    const btn = document.getElementById('voice-btn');
    if (btn) {
      btn.classList.remove('text-red-400', 'animate-pulse');
      btn.classList.add('text-gray-400', 'hover:text-purple-400');
    }
  };
}

window.toggleVoiceInput = function() {
  if (!recognition) initSpeechRecognition();
  if (!recognition) {
    showToast('Voice input is not supported in your browser.');
    return;
  }
  
  if (isRecording) {
    recognition.stop();
  } else {
    recognition.start();
  }
};

window.readAloud = function(btn, text) {
  if (!('speechSynthesis' in window)) {
    showToast('Text-to-speech is not supported in your browser.');
    return;
  }
  
  const cleanText = text.replace(/<[^>]*>?/gm, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  utterance.onstart = () => {
    btn.textContent = '🔊 Playing...';
    btn.classList.add('text-purple-400');
  };
  
  utterance.onend = () => {
    btn.textContent = '🔊 Read';
    btn.classList.remove('text-purple-400');
  };
  
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

document.addEventListener('DOMContentLoaded', () => {
  loadLegalKnowledge();
  initChatbot();
});