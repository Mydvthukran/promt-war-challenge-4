/* ============================================
   StadiumAI 2026 — Main Application Controller
   ============================================ */

const App = (() => {
  let currentRole = null;
  let clockInterval = null;

  const roleNavItems = {
    fan: [
      { id: 'overview', icon: '🏠', label: 'Dashboard', section: 'main' },
      { id: 'navigation', icon: '🗺️', label: 'Stadium Navigation', section: 'main' },
      { id: 'transport', icon: '🚗', label: 'Transportation', section: 'main' },
      { id: 'accessibility', icon: '♿', label: 'Accessibility', section: 'main' },
      { id: 'sustainability', icon: '🌱', label: 'Go Green', section: 'explore' },
    ],
    organizer: [
      { id: 'overview', icon: '🏠', label: 'Dashboard', section: 'main' },
      { id: 'crowd', icon: '📊', label: 'Crowd Intelligence', section: 'main' },
      { id: 'ops', icon: '🧠', label: 'Operations Center', section: 'main' },
      { id: 'navigation', icon: '🗺️', label: 'Stadium Map', section: 'main' },
      { id: 'transport', icon: '🚗', label: 'Transport Hub', section: 'analytics' },
      { id: 'sustainability', icon: '🌱', label: 'Sustainability', section: 'analytics' },
      { id: 'accessibility', icon: '♿', label: 'Accessibility', section: 'analytics' },
    ],
    volunteer: [
      { id: 'overview', icon: '🏠', label: 'Dashboard', section: 'main' },
      { id: 'navigation', icon: '🗺️', label: 'Stadium Map', section: 'main' },
      { id: 'crowd', icon: '📊', label: 'Crowd Status', section: 'main' },
      { id: 'accessibility', icon: '♿', label: 'Accessibility', section: 'assist' },
      { id: 'transport', icon: '🚗', label: 'Transport Info', section: 'assist' },
    ],
    staff: [
      { id: 'overview', icon: '🏠', label: 'Dashboard', section: 'main' },
      { id: 'ops', icon: '🧠', label: 'Operations Center', section: 'main' },
      { id: 'crowd', icon: '📊', label: 'Crowd Intelligence', section: 'main' },
      { id: 'navigation', icon: '🗺️', label: 'Stadium Map', section: 'operations' },
      { id: 'transport', icon: '🚗', label: 'Transport Ops', section: 'operations' },
      { id: 'sustainability', icon: '🌱', label: 'Sustainability', section: 'operations' },
      { id: 'accessibility', icon: '♿', label: 'Accessibility', section: 'operations' },
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

  function init() {
    createParticles();
    setupRoleSelection();
    startClock();
  }

  function setupRoleSelection() {
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
      card.addEventListener('click', () => {
        const role = card.dataset.role;
        selectRole(role);
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
            <div class="nav-item" data-view="${item.id}" onclick="Router.navigate('${item.id}')">
              <span class="nav-icon">${item.icon}</span>
              <span class="nav-label">${item.label}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    navContainer.innerHTML = html;
  }

  function initModules() {
    // Render overview
    renderOverview();

    // Init modules (they render lazily when their view is activated)
    Router.onChange((viewId) => {
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
          <span class="section-icon">⚽</span>
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
            <div class="stat-icon teal">🏟️</div>
            <div class="stat-value">${(totalPeople / 1000).toFixed(1)}k</div>
            <div class="stat-label">In Stadium</div>
          </div>
        </div>
        <div class="card card-accent-gold animate-fade-in-up">
          <div class="stat-widget">
            <div class="stat-icon gold">⚡</div>
            <div class="stat-value">${highZones}</div>
            <div class="stat-label">High Density Zones</div>
          </div>
        </div>
        <div class="card card-accent-blue animate-fade-in-up">
          <div class="stat-widget">
            <div class="stat-icon blue">⭐</div>
            <div class="stat-value">${kpis.customerSatisfaction}</div>
            <div class="stat-label">Fan Rating</div>
          </div>
        </div>
        <div class="card animate-fade-in-up">
          <div class="stat-widget">
            <div class="stat-icon purple">🌱</div>
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
            <div class="card-title">🧠 AI Highlights</div>
            <span class="badge badge-teal">GenAI</span>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:var(--space-md)">
            <div class="ai-card">
              <div class="ai-card-label">🧠 Real-time insight</div>
              <div class="ai-card-title">Crowd Flow Prediction</div>
              <div class="ai-card-text">Based on match dynamics, AI predicts a 35% surge in concourse movement at half-time. Food courts should prepare for peak demand in ~12 minutes.</div>
            </div>
            <div class="alert-card alert-info">
              <div class="alert-icon">💡</div>
              <div class="alert-content">
                <div class="alert-title">AI Suggestion</div>
                <div class="alert-message">Metro Line A will be the fastest route post-match. Pre-book your rideshare now to avoid 2.5x surge pricing.</div>
              </div>
            </div>
            <div class="alert-card alert-success">
              <div class="alert-icon">🌱</div>
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
            <div class="card-title">📅 Match Schedule</div>
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

  function showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = { info: '💡', success: '✅', warning: '⚠️', danger: '🚨' };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || '💡'}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <div class="toast-close" onclick="this.parentElement.classList.add('removing');setTimeout(()=>this.parentElement.remove(),300)">✕</div>
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

  return { init, selectRole, showToast, currentRole: () => currentRole };
})();

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
