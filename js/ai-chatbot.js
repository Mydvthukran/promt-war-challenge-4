/* ============================================
   StadiumAI 2026 — AI Chatbot Engine
   Multilingual AI assistant
   ============================================ */

"use strict";

const AIChatbot = (() => {
  let isOpen = false;
  let currentLang = 'en';
  let messageHistory = [];
  let isTyping = false;

  // Cached DOM elements
  const DOM = {
    messages: null,
    input: null
  };

  const langNames = {
    en: 'English', es: 'Español', fr: 'Français', ar: 'العربية',
    pt: 'Português', de: 'Deutsch', ja: '日本語', hi: 'हिन्दी'
  };

  function init() {
    DOM.messages = document.getElementById('chat-messages');
    DOM.input = document.getElementById('chat-input');
    setupEventListeners();
    addBotMessage(StadiumData.chatResponses[currentLang]?.greeting || StadiumData.chatResponses['en'].greeting);
    addQuickActions();
  }

  function setupEventListeners() {
    // Toggle chat panel
    const toggleBtn = document.getElementById('chat-toggle-btn');
    const closeBtn = document.getElementById('chat-close-btn');
    const overlay = document.getElementById('chatbot-overlay');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const langSelect = document.getElementById('chat-lang-select');

    if (toggleBtn) toggleBtn.addEventListener('click', togglePanel);
    if (closeBtn) closeBtn.addEventListener('click', closePanel);
    if (overlay) overlay.addEventListener('click', closePanel);

    if (chatInput) {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);

    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        clearChat();
        addBotMessage(StadiumData.chatResponses[currentLang]?.greeting || StadiumData.chatResponses['en'].greeting);
        addQuickActions();
      });
    }
  }

  function togglePanel() {
    isOpen ? closePanel() : openPanel();
  }

  function openPanel() {
    isOpen = true;
    const panel = document.getElementById('chatbot-panel');
    const overlay = document.getElementById('chatbot-overlay');
    if (panel) panel.classList.add('open');
    if (overlay) overlay.classList.add('open');
  }

  function closePanel() {
    isOpen = false;
    const panel = document.getElementById('chatbot-panel');
    const overlay = document.getElementById('chatbot-overlay');
    if (panel) panel.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim() || isTyping) return;

    const message = input.value.trim();
    input.value = '';

    addUserMessage(message);
    showTypingIndicator();

    // Simulate AI processing delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      removeTypingIndicator();
      const response = StadiumData.getChatResponse(message, currentLang);
      typeMessage(response);
    }, delay);
  }

  function addUserMessage(text) {
    if (!DOM.messages) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.innerHTML = `
      <div>${App.escapeHtml(text)}</div>
      <div class="chat-time">${time}</div>
    `;
    DOM.messages.appendChild(bubble);
    scrollToBottom();

    messageHistory.push({ role: 'user', text, time });
  }

  function addBotMessage(text) {
    if (!DOM.messages) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    bubble.innerHTML = `
      <div>${formatMarkdown(text)}</div>
      <div class="chat-time">${time}</div>
    `;
    DOM.messages.appendChild(bubble);
    scrollToBottom();

    messageHistory.push({ role: 'bot', text, time });
  }

  function typeMessage(text) {
    isTyping = true;
    if (!DOM.messages) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    const contentDiv = document.createElement('div');
    const timeDiv = document.createElement('div');
    timeDiv.className = 'chat-time';
    timeDiv.textContent = time;

    bubble.appendChild(contentDiv);
    bubble.appendChild(timeDiv);
    DOM.messages.appendChild(bubble);

    // Type out the message character by character (fast)
    const formatted = formatMarkdown(text);
    let i = 0;
    const chars = text.split('');
    const speed = 8; // ms per character

    function typeChar() {
      if (i < chars.length) {
        i += 3; // type 3 chars at a time for speed
        contentDiv.innerHTML = formatMarkdown(text.substring(0, Math.min(i, text.length)));
        scrollToBottom();
        if (i < chars.length) {
          setTimeout(typeChar, speed);
        } else {
          isTyping = false;
          addQuickActions();
        }
      }
    }
    typeChar();

    messageHistory.push({ role: 'bot', text, time: time });
  }

  function showTypingIndicator() {
    if (!DOM.messages) return;

    const indicator = document.createElement('div');
    indicator.className = 'chat-bubble bot';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = `
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    `;
    DOM.messages.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  function addQuickActions() {
    if (!DOM.messages) return;

    // Remove existing quick actions
    const existing = DOM.messages.querySelector('.chat-quick-actions');
    if (existing) existing.remove();

    const actions = [
      { text: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-map"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px">  <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />  <path d="M15 5.764v15" />  <path d="M9 3.236v15" /></svg> Navigate', query: 'navigate to my seat' },
      { text: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-trophy"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px">  <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />  <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />  <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />  <path d="M4 22h16" />  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />  <path d="M6 9H4.5a1 1 0 0 1 0-5H6" /></svg> Match Info', query: 'match information' },
      { text: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-utensils"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px">  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />  <path d="M7 2v20" />  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg> Food', query: 'food options' },
      { text: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-car"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px">  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />  <circle cx="7" cy="17" r="2" />  <path d="M9 17h6" />  <circle cx="17" cy="17" r="2" /></svg> Transport', query: 'transportation home' },
      { text: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-accessibility"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px">  <circle cx="16" cy="4" r="1" />  <path d="m18 19 1-7-6 1" />  <path d="m5 8 3-3 5.5 3-2.36 3.5" />  <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />  <path d="M13.76 17.5a5 5 0 0 0-6.88-6" /></svg> Accessibility', query: 'accessibility services' },
      { text: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-leaf"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px">  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg> Go Green', query: 'sustainability tips' },
    ];

    const wrapper = document.createElement('div');
    wrapper.className = 'chat-quick-actions';

    actions.forEach(action => {
      const btn = document.createElement('button');
      btn.className = 'quick-action-btn';
      btn.innerHTML = action.text;
      btn.addEventListener('click', () => {
        if (DOM.input) {
          DOM.input.value = action.query;
          sendMessage();
        }
        wrapper.remove();
      });
      wrapper.appendChild(btn);
    });

    DOM.messages.appendChild(wrapper);
    scrollToBottom();
    App.renderIcons(wrapper);
  }

  function clearChat() {
    if (DOM.messages) DOM.messages.innerHTML = '';
    messageHistory = [];
  }

  function scrollToBottom() {
    if (DOM.messages) {
      DOM.messages.scrollTop = DOM.messages.scrollHeight;
    }
  }

  function formatMarkdown(text) {
    return App.escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  return { init, openPanel, closePanel, togglePanel };
})();
