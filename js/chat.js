const conversationHistory = [];

let slLegalKnowledge = null;

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

SCOPE RESTRICTION — YOU MUST FOLLOW THIS:
You may ONLY answer questions related to:
1. Open source licensing (MIT, GPL, Apache, Creative Commons, etc.)
2. Sierra Leone intellectual property law (Copyright Act 2011, patents, trademarks)
3. Sierra Leone Cyber Security and Crime Act 2021
4. Digital rights, creator rights, and fair use in Sierra Leone
5. The OpenRights SL system itself (how to use its tools and features)
6. Differences between licenses and how to choose the right one

If a question is NOT about any of the above topics, you MUST politely refuse.
Say something like: "I'm designed to answer questions about digital rights,
open source licensing, and intellectual property law in Sierra Leone. For
assistance with other topics, please consult the appropriate specialist."
Do NOT answer off-topic questions even if they are simple.

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
        ${suggestions.map(s => `<button data-action="quick-reply" data-msg="${escapeHtml(s)}" class="chip px-3 py-1 rounded-full text-xs bg-white/10 border border-white/20 hover:bg-purple-500/30 transition">${escapeHtml(s)}</button>`).join('')}
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
                  <button data-action="read" data-msg="${escapeHtml(content)}" class="text-[10px] text-gray-400 hover:text-white transition bg-white/5 px-2 py-1 rounded-md border border-white/10">🔊 Read</button>
                  <button data-action="copy" data-msg="${escapeHtml(content)}" class="text-[10px] text-gray-400 hover:text-white transition bg-white/5 px-2 py-1 rounded-md border border-white/10">📋 Copy</button>
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
    if (conversationHistory[conversationHistory.length - 1]?.role === 'assistant') {
      conversationHistory.pop();
    }

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

  const inputField = document.getElementById('user-input');
  if (inputField) {
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  const container = document.getElementById('messages-container');
  if (container) {
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const msg = btn.dataset.msg;
      if (btn.dataset.action === 'read') {
        window.readAloud(btn, msg);
      } else if (btn.dataset.action === 'copy') {
        window.copyMessage(btn, msg);
      } else if (btn.dataset.action === 'quick-reply') {
        document.getElementById('user-input').value = msg;
        window.sendMessage(msg);
      }
    });
  }
});