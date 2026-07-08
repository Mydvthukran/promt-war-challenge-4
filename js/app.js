/* ============================================
   StadiumAI 2026 — Main Application Controller
   ============================================ */

"use strict";

const App = (() => {
  let currentRole = null;
  let clockInterval = null;

  const roleNavItems = {
    fan: [
      { id: 'overview', icon: 'home', label: 'Dashboard', section: 'main' },
      { id: 'navigation', icon: 'map', label: 'Stadium Navigation', section: 'main' },
      { id: 'transport', icon: 'car', label: 'Transportation', section: 'main' },
      { id: 'accessibility', icon: 'accessibility', label: 'Accessibility', section: 'main' },
      { id: 'sustainability', icon: 'leaf', label: 'Go Green', section: 'explore' },
    ],
    organizer: [
      { id: 'overview', icon: 'home', label: 'Dashboard', section: 'main' },
      { id: 'crowd', icon: 'users', label: 'Crowd Intelligence', section: 'main' },
      { id: 'ops', icon: 'activity', label: 'Operations Center', section: 'main' },
      { id: 'navigation', icon: 'map', label: 'Stadium Map', section: 'main' },
      { id: 'transport', icon: 'car', label: 'Transport Hub', section: 'analytics' },
      { id: 'sustainability', icon: 'leaf', label: 'Sustainability', section: 'analytics' },
      { id: 'accessibility', icon: 'accessibility', label: 'Accessibility', section: 'analytics' },
    ],
    volunteer: [
      { id: 'overview', icon: 'home', label: 'Dashboard', section: 'main' },
      { id: 'navigation', icon: 'map', label: 'Stadium Map', section: 'main' },
      { id: 'crowd', icon: 'users', label: 'Crowd Status', section: 'main' },
      { id: 'accessibility', icon: 'accessibility', label: 'Accessibility', section: 'assist' },
      { id: 'transport', icon: 'car', label: 'Transport Info', section: 'assist' },
    ],
    staff: [
      { id: 'overview', icon: 'home', label: 'Dashboard', section: 'main' },
      { id: 'ops', icon: 'activity', label: 'Operations Center', section: 'main' },
      { id: 'crowd', icon: 'users', label: 'Crowd Intelligence', section: 'main' },
      { id: 'navigation', icon: 'map', label: 'Stadium Map', section: 'operations' },
      { id: 'transport', icon: 'car', label: 'Transport Ops', section: 'operations' },
      { id: 'sustainability', icon: 'leaf', label: 'Sustainability', section: 'operations' },
      { id: 'accessibility', icon: 'accessibility', label: 'Accessibility', section: 'operations' },
    ],
  };

  const routeMap = {
    overview: { title: 'Dashboard Overview' },
    navigation: { title: 'Stadium Navigation' },
    crowd: { title: 'Crowd Intelligence' },
    transport: { title: 'Transportation Hub' },
    accessibility: { title: 'Accessibility Hub' },
    sustainability: { title: 'Sustainability Tracker' },
    ops: { title: 'Operations Center' },
  };

  /**
   * Initializes the core application, sets up routing, and boots modules.
   * @public
   */
  function init() {
    createParticles();
    setupRoleSelection();
    startClock();
  }

  function setupRoleSelection() {
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
      const handleSelect = () => {
        const role = card.dataset.role;
        selectRole(role);
      };
      card.addEventListener('click', handleSelect);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      });
    });

    // Also handle dropdown change
    const roleSelect = document.getElementById('role-select');
    if (roleSelect) {
      roleSelect.addEventListener('change', (e) => {
        selectRole(e.target.value);
      });
    }
  }

  /**
   * Switches the active UI layout based on the user's role.
   * @param {string} role - The selected role (e.g., 'fan', 'organizer').
   * @public
   */
  function selectRole(role) {
    currentRole = role;

    // Hide role selection screen
    const roleScreen = document.getElementById('role-screen');
    if (roleScreen) {
      roleScreen.classList.add('hidden');
      setTimeout(() => roleScreen.style.display = 'none', 600);
    }

    // Update sidebar navigation
    buildNavigation(role);

    // Update role selector dropdown
    const roleSelect = document.getElementById('role-select');
    if (roleSelect) roleSelect.value = role;

    // Initialize all modules
    initModules();

    // Navigate to overview
    Router.init(routeMap);

    // Initialize chatbot
    AIChatbot.init();
  }

  function buildNavigation(role) {
    const navContainer = document.getElementById('sidebar-nav');
    if (!navContainer) return;

    const items = roleNavItems[role] || roleNavItems.fan;

    // Group by section
    const sections = {};
    items.forEach(item => {
      if (!sections[item.section]) sections[item.section] = [];
      sections[item.section].push(item);
    });

    const sectionLabels = {
      main: 'Main',
      explore: 'Explore',
      analytics: 'Analytics',
      assist: 'Assist',
      operations: 'Operations'
    };

    let html = '';
    for (const [section, sectionItems] of Object.entries(sections)) {
      html += `
        <div class="nav-section">
          <div class="nav-section-title">${sectionLabels[section] || section}</div>
          ${sectionItems.map(item => `
            <div class="nav-item" data-view="${item.id}" role="button" tabindex="0" onclick="Router.navigate('${item.id}')" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); Router.navigate('${item.id}'); }">
              <span class="nav-icon">${App.getIconSvg(item.icon)}</span>
              <span class="nav-label">${item.label}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    navContainer.innerHTML = html;
    App.renderIcons(navContainer);
  }

  function initModules() {
    // Render overview
    renderOverview();

    // Init modules (they render lazily when their view is activated)
    Router.onChange((viewId, prevView) => {
      // Cleanup previous view to prevent memory leaks
      switch (prevView) {
        case 'crowd':
          if (typeof CrowdIntel !== 'undefined' && CrowdIntel.destroy) CrowdIntel.destroy();
          break;
      }

      switch (viewId) {
        case 'overview':
          renderOverview();
          break;
        case 'crowd':
          CrowdIntel.init();
          break;
        case 'navigation':
          StadiumMap.init();
          break;
        case 'transport':
          Transport.init();
          break;
        case 'accessibility':
          Accessibility.init();
          break;
        case 'sustainability':
          Sustainability.init();
          break;
        case 'ops':
          OpsDashboard.init();
          break;
      }
    });
  }

  function renderOverview() {
    const container = document.getElementById('overview-content');
    if (!container) return;

    const match = StadiumData.matches.find(m => m.status === 'live') || StadiumData.matches[0];
    const venue = StadiumData.venues.find(v => v.id === match.venue) || StadiumData.venues[0];
    const crowdData = StadiumData.getLiveCrowdData();
    const kpis = StadiumData.getOperationalKPIs();

    const totalPeople = crowdData.reduce((s, z) => s + z.currentCount, 0);
    const highZones = crowdData.filter(z => z.status === 'high' || z.status === 'critical').length;

    container.innerHTML = `
      <!-- Welcome Banner -->
      <div class="welcome-banner">
        <div class="welcome-title gradient-text">Welcome to StadiumAI 2026</div>
        <div class="welcome-subtitle">Your AI-powered command center for FIFA World Cup 2026. Role: <strong style="color:var(--color-accent-teal)">${currentRole ? currentRole.charAt(0).toUpperCase() + currentRole.slice(1) : 'Fan'}</strong></div>
      </div>

      <!-- Live Match -->
      <div class="section-header">
        <div class="section-title">
          <span class="section-icon"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-trophy"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />  <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />  <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />  <path d="M4 22h16" />  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />  <path d="M6 9H4.5a1 1 0 0 1 0-5H6" /></svg></span>
          <h2>Live Match</h2>
        </div>
        <span class="badge badge-red" style="animation:pulse-dot 2s infinite">● LIVE</span>
      </div>

      <div class="match-card" style="margin-bottom:var(--space-2xl);background:linear-gradient(135deg,rgba(0,212,170,0.05),rgba(255,184,0,0.05));border-color:rgba(255,184,0,0.2)">
        <div class="match-teams">
          <div class="match-team">
            <span class="flag">${match.flag1}</span>
            <span>${match.team1}</span>
          </div>
          <div class="match-vs">VS</div>
          <div class="match-team">
            <span class="flag">${match.flag2}</span>
            <span>${match.team2}</span>
          </div>
        </div>
        <div class="match-info">
          <div class="match-time">${match.time} ET</div>
          <div class="match-venue">${venue.name}, ${venue.city}</div>
          <div style="margin-top:4px"><span class="badge badge-gold">${match.stage}</span></div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="dashboard-grid grid-cols-4 stagger-children" style="margin-bottom:var(--space-2xl)">
        <div class="card card-accent-teal animate-fade-in-up">
          <div class="stat-widget">
            <div class="stat-icon teal"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-building"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M12 10h.01" />  <path d="M12 14h.01" />  <path d="M12 6h.01" />  <path d="M16 10h.01" />  <path d="M16 14h.01" />  <path d="M16 6h.01" />  <path d="M8 10h.01" />  <path d="M8 14h.01" />  <path d="M8 6h.01" />  <path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />  <rect x="4" y="2" width="16" height="20" rx="2" /></svg></div>
            <div class="stat-value">${(totalPeople / 1000).toFixed(1)}k</div>
            <div class="stat-label">In Stadium</div>
          </div>
        </div>
        <div class="card card-accent-gold animate-fade-in-up">
          <div class="stat-widget">
            <div class="stat-icon gold"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-zap"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg></div>
            <div class="stat-value">${highZones}</div>
            <div class="stat-label">High Density Zones</div>
          </div>
        </div>
        <div class="card card-accent-blue animate-fade-in-up">
          <div class="stat-widget">
            <div class="stat-icon blue"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-star"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg></div>
            <div class="stat-value">${kpis.customerSatisfaction}</div>
            <div class="stat-label">Fan Rating</div>
          </div>
        </div>
        <div class="card animate-fade-in-up">
          <div class="stat-widget">
            <div class="stat-icon purple"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-leaf"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg></div>
            <div class="stat-value">${StadiumData.randomBetween(80, 95)}</div>
            <div class="stat-label">Eco Score</div>
          </div>
        </div>
      </div>

      <!-- Two Column: AI Insights + Upcoming Matches -->
      <div class="dashboard-grid grid-cols-2">
        <!-- AI Highlights -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> AI Highlights</div>
            <span class="badge badge-teal">GenAI</span>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:var(--space-md)">
            <div class="ai-card">
              <div class="ai-card-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> Real-time insight</div>
              <div class="ai-card-title">Crowd Flow Prediction</div>
              <div class="ai-card-text">Based on match dynamics, AI predicts a 35% surge in concourse movement at half-time. Food courts should prepare for peak demand in ~12 minutes.</div>
            </div>
            <div class="alert-card alert-info">
              <div class="alert-icon"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-lightbulb"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />  <path d="M9 18h6" />  <path d="M10 22h4" /></svg></div>
              <div class="alert-content">
                <div class="alert-title">AI Suggestion</div>
                <div class="alert-message">Metro Line A will be the fastest route post-match. Pre-book your rideshare now to avoid 2.5x surge pricing.</div>
              </div>
            </div>
            <div class="alert-card alert-success">
              <div class="alert-icon"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-leaf"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg></div>
              <div class="alert-content">
                <div class="alert-title">Sustainability Update</div>
                <div class="alert-message">62% of fans used green transport today! Stadium is on track for its best sustainability score this tournament.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Matches -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-calendar"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <path d="M8 2v4" />  <path d="M16 2v4" />  <rect width="18" height="18" x="3" y="4" rx="2" />  <path d="M3 10h18" /></svg> Match Schedule</div>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:var(--space-md)">
            ${StadiumData.matches.map(m => {
              const v = StadiumData.venues.find(x => x.id === m.venue);
              return `
                <div class="match-card">
                  <div class="match-teams">
                    <div class="match-team">
                      <span class="flag">${m.flag1}</span>
                      <span>${m.team1}</span>
                    </div>
                    <div class="match-vs">${m.score || 'VS'}</div>
                    <div class="match-team">
                      <span class="flag">${m.flag2}</span>
                      <span>${m.team2}</span>
                    </div>
                  </div>
                  <div class="match-info">
                    <div class="match-time">${m.time}</div>
                    <div class="match-venue">${v ? v.city : ''}</div>
                    <div style="margin-top:4px">
                      <span class="badge ${m.status === 'live' ? 'badge-red' : m.status === 'completed' ? 'badge-green' : 'badge-blue'}">
                        ${m.status === 'live' ? '● LIVE' : m.status === 'completed' ? '✓ FT' : m.date}
                      </span>
                      <span class="badge badge-gold" style="margin-left:4px">${m.stage}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
    App.renderIcons(container);
  }

  function startClock() {
    const updateClock = () => {
      const now = new Date();
      const timeEl = document.getElementById('header-time');
      if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString('en-US', { 
          hour: '2-digit', minute: '2-digit', second: '2-digit' 
        });
      }
    };
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
  }

  function createParticles() {
    const container = document.getElementById('particles-bg');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (8 + Math.random() * 15) + 's';
      particle.style.animationDelay = (Math.random() * 10) + 's';
      particle.style.opacity = (0.1 + Math.random() * 0.3).toString();
      particle.style.width = (1 + Math.random() * 3) + 'px';
      particle.style.height = particle.style.width;
      container.appendChild(particle);
    }
  }

  /**
   * Displays a dynamic toast notification.
   * @param {string} title - The title of the toast.
   * @param {string} message - The message content.
   * @param {string} [type='info'] - The type ('success', 'warning', 'error', 'info').
   * @public
   */
  function showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = { info: 'lightbulb', success: 'check-circle', warning: 'alert-triangle', danger: 'alert-octagon' };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">${App.getIconSvg(icons[type] || 'lightbulb')}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close notification" onclick="this.parentElement.classList.add('removing');setTimeout(()=>this.parentElement.remove(),300)"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-x"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px">  <path d="M18 6 6 18" />  <path d="m6 6 12 12" /></svg></button>
    `;
    container.appendChild(toast);
    

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }

  /**
   * Safely escapes HTML entities to prevent Cross-Site Scripting (XSS).
   * @param {string} str - The unescaped input string.
   * @returns {string} The escaped, safe HTML string.
   * @public
   */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function renderIcons() { }

  const ICON_MAP = {
    'home': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-home"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>`,
    'map': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-map"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />  <path d="M15 5.764v15" />  <path d="M9 3.236v15" /></svg>`,
    'car': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-car"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />  <circle cx="7" cy="17" r="2" />  <path d="M9 17h6" />  <circle cx="17" cy="17" r="2" /></svg>`,
    'accessibility': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-accessibility"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="16" cy="4" r="1" />  <path d="m18 19 1-7-6 1" />  <path d="m5 8 3-3 5.5 3-2.36 3.5" />  <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />  <path d="M13.76 17.5a5 5 0 0 0-6.88-6" /></svg>`,
    'leaf': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-leaf"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>`,
    'users': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-users"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />  <path d="M16 3.128a4 4 0 0 1 0 7.744" />  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />  <circle cx="9" cy="7" r="4" /></svg>`,
    'activity': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-activity"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" /></svg>`,
    'lightbulb': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-lightbulb"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />  <path d="M9 18h6" />  <path d="M10 22h4" /></svg>`,
    'info': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-info"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <path d="M12 16v-4" />  <path d="M12 8h.01" /></svg>`,
    'check-circle': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-check-circle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M21.801 10A10 10 0 1 1 17 3.335" />  <path d="m9 11 3 3L22 4" /></svg>`,
    'alert-triangle': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-alert-triangle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />  <path d="M12 9v4" />  <path d="M12 17h.01" /></svg>`,
    'alert-octagon': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-alert-octagon"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M12 16h.01" />  <path d="M12 8v4" />  <path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" /></svg>`,
    'x': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-x"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M18 6 6 18" />  <path d="m6 6 12 12" /></svg>`,
    'compass': `<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-compass"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /></svg>`,
  };
  
  App.getIconSvg = (name) => ICON_MAP[name] || ICON_MAP['lightbulb'];
  

  return { init, selectRole, showToast, escapeHtml, renderIcons, getIconSvg, currentRole: () => currentRole };
})();

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
