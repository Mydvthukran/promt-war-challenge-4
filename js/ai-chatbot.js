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

  const langNames = {
    en: 'English', es: 'Español', fr: 'Français', ar: 'العربية',
    pt: 'Português', de: 'Deutsch', ja: '日本語', hi: 'हिन्दी'
  };

  function init() {
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
    const container = document.getElementById('chat-messages');
    if (!container) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.innerHTML = `
      <div>${App.escapeHtml(text)}</div>
      <div class="chat-time">${time}</div>
    `;
    container.appendChild(bubble);
    scrollToBottom();

    messageHistory.push({ role: 'user', text, time });
  }

  function addBotMessage(text) {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    bubble.innerHTML = `
      <div>${formatMarkdown(text)}</div>
      <div class="chat-time">${time}</div>
    `;
    container.appendChild(bubble);
    scrollToBottom();

    messageHistory.push({ role: 'bot', text, time });
  }

  function typeMessage(text) {
    isTyping = true;
    const container = document.getElementById('chat-messages');
    if (!container) return;

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
    container.appendChild(bubble);

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
    const container = document.getElementById('chat-messages');
    if (!container) return;

    const indicator = document.createElement('div');
    indicator.className = 'chat-bubble bot';
    indicator.id = 'typing-indicator';
    indicator.innerHTML = `
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    `;
    container.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
  }

  function addQuickActions() {
    const container = document.getElementById('chat-messages');
    if (!container) return;

    // Remove existing quick actions
    const existing = container.querySelector('.chat-quick-actions');
    if (existing) existing.remove();

    const actions = [
      { text: '<i data-lucide="map" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px"></i> Navigate', query: 'navigate to my seat' },
      { text: '<i data-lucide="trophy" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px"></i> Match Info', query: 'match information' },
      { text: '<i data-lucide="utensils" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px"></i> Food', query: 'food options' },
      { text: '<i data-lucide="car" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px"></i> Transport', query: 'transportation home' },
      { text: '<i data-lucide="accessibility" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px"></i> Accessibility', query: 'accessibility services' },
      { text: '<i data-lucide="leaf" style="width:14px;height:14px;display:inline-block;vertical-align:middle;margin-right:4px"></i> Go Green', query: 'sustainability tips' },
    ];

    const wrapper = document.createElement('div');
    wrapper.className = 'chat-quick-actions';

    actions.forEach(action => {
      const btn = document.createElement('button');
      btn.className = 'quick-action-btn';
      btn.innerHTML = action.text;
      btn.addEventListener('click', () => {
        const input = document.getElementById('chat-input');
        if (input) {
          input.value = action.query;
          sendMessage();
        }
        wrapper.remove();
      });
      wrapper.appendChild(btn);
    });

    container.appendChild(wrapper);
    scrollToBottom();
    App.renderIcons(wrapper);
  }

  function clearChat() {
    const container = document.getElementById('chat-messages');
    if (container) container.innerHTML = '';
    messageHistory = [];
  }

  function scrollToBottom() {
    const container = document.getElementById('chat-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
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
