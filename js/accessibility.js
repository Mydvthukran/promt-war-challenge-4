/* ============================================
   StadiumAI 2026 — Accessibility Hub
   Accessibility services & inclusive features
   ============================================ */

const Accessibility = (() => {
  function init() {
    renderAccessibilityView();
  }

  function renderAccessibilityView() {
    const container = document.getElementById('accessibility-content');
    if (!container) return;

    const services = StadiumData.accessibilityServices;

    container.innerHTML = `
      <div class="welcome-banner" style="background:linear-gradient(135deg,rgba(168,85,247,0.1),rgba(59,130,246,0.1));border-color:rgba(168,85,247,0.15)">
        <div class="welcome-title"><i data-lucide="accessibility" style="display:inline-block;vertical-align:text-bottom;width:28px;height:28px"></i> Accessibility Hub</div>
        <div class="welcome-subtitle">FIFA World Cup 2026 is committed to being the most accessible World Cup ever. Find all inclusive services, accessible routes, and assistance options here.</div>
      </div>

      <!-- Service Status Grid -->
      <div class="section-header">
        <div class="section-title">
          <span class="section-icon"><i data-lucide="bell"></i></span>
          <h2>Available Services</h2>
        </div>
        <button class="btn btn-sm btn-primary" onclick="AIChatbot.openPanel()"><i data-lucide="message-square" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Ask AI Assistant</button>
      </div>

      <div class="dashboard-grid grid-cols-4" style="margin-bottom:var(--space-2xl)">
        ${services.map(s => `
          <div class="feature-card hover-lift">
            <div class="feature-icon">${s.icon}</div>
            <div class="feature-title">${s.name}</div>
            <div class="feature-desc">${s.description}</div>
            <div style="margin-top:var(--space-md)">
              ${s.status === 'active' 
                ? '<span class="badge badge-green">● Active Now</span>'
                : '<span class="badge badge-blue">● Available</span>'}
              ${s.count !== null ? `<span class="badge badge-purple" style="margin-left:4px">${s.count} units</span>` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="dashboard-grid grid-cols-2">
        <!-- AI Accessibility Assistant -->
        <div class="ai-card">
          <div class="ai-card-label"><i data-lucide="brain" style="width:14px;height:14px;display:inline-block;vertical-align:middle"></i> AI Accessibility Concierge</div>
          <div class="ai-card-title">Personalized Assistance</div>
          <div class="ai-card-text">
            Our AI understands your specific needs and can provide:<br><br>
            <i data-lucide="accessibility" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> <strong>Custom accessible routes</strong> avoiding stairs and crowds<br>
            <i data-lucide="brain" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> <strong>Sensory-friendly guidance</strong> — quiet times and low-stimulation paths<br>
            <i data-lucide="eye" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> <strong>Audio-described navigation</strong> for visually impaired fans<br>
            <i data-lucide="hand-metal" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> <strong>Sign language video relay</strong> for deaf and hard-of-hearing fans<br>
            <i data-lucide="accessibility" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> <strong>Mobility cart booking</strong> — real-time availability<br><br>
            <em>Just open the AI chatbot and describe what you need — it will guide you in your language.</em>
          </div>
          <button class="btn btn-primary" style="margin-top:var(--space-lg)" onclick="AIChatbot.openPanel()"><i data-lucide="message-square" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Open AI Assistant</button>
        </div>

        <!-- Accessible Route Finder -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i data-lucide="map" style="width:20px;height:20px;display:inline-block;vertical-align:text-bottom"></i> Accessible Route Planner</div>
          </div>
          <div class="card-body">
            <div style="margin-bottom:var(--space-lg)">
              <label style="font-size:var(--text-xs);color:var(--color-text-tertiary);display:block;margin-bottom:var(--space-xs)">Your Location</label>
              <select style="width:100%">
                <option>Main Gate Entrance</option>
                <option>Gate C (East)</option>
                <option>Parking Lot A</option>
                <option>Metro Station Exit</option>
              </select>
            </div>
            <div style="margin-bottom:var(--space-lg)">
              <label style="font-size:var(--text-xs);color:var(--color-text-tertiary);display:block;margin-bottom:var(--space-xs)">Destination</label>
              <select style="width:100%">
                <option>My Seat (Section 214)</option>
                <option>Sensory Room (Level 3)</option>
                <option>Accessible Restroom</option>
                <option>Medical Center</option>
                <option>Food Court</option>
              </select>
            </div>
            <div style="margin-bottom:var(--space-lg)">
              <label style="font-size:var(--text-xs);color:var(--color-text-tertiary);display:block;margin-bottom:var(--space-xs)">Accessibility Needs</label>
              <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm)">
                ${['Wheelchair', 'Visual Aid', 'Hearing Aid', 'Low Mobility', 'Sensory Sensitive', 'Service Animal'].map(need => `
                  <label style="display:flex;align-items:center;gap:4px;font-size:var(--text-xs);padding:var(--space-xs) var(--space-sm);background:var(--glass-bg);border:1px solid var(--glass-border);border-radius:var(--radius-full);cursor:pointer">
                    <input type="checkbox" style="width:14px;height:14px;padding:0"> ${need}
                  </label>
                `).join('')}
              </div>
            </div>
            <button class="btn btn-primary" style="width:100%" onclick="App.showToast('<i data-lucide=\'accessibility\' style=\'width:16px;height:16px;display:inline-block;vertical-align:text-bottom\'></i> Accessible Route Found','Elevator route via Gate C → Level 2 → Section 214. Estimated: 6 min. No stairs.','success')">
              <i data-lucide="compass" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Find Accessible Route
            </button>
          </div>
        </div>
      </div>

      <!-- Companion Matching -->
      <div class="card" style="margin-top:var(--space-xl)">
        <div class="card-header">
          <div class="card-title"><i data-lucide="handshake" style="width:20px;height:20px;display:inline-block;vertical-align:text-bottom"></i> AI Companion Matching</div>
          <span class="badge badge-purple">Powered by AI</span>
        </div>
        <div class="card-body">
          <div class="dashboard-grid grid-cols-3">
            <div style="text-align:center;padding:var(--space-xl)">
              <div style="margin-bottom:var(--space-md);display:flex;align-items:center;justify-content:center;gap:8px;color:var(--color-primary)"><i data-lucide="accessibility" style="width:32px;height:32px"></i><i data-lucide="arrow-right" style="width:24px;height:24px;opacity:0.5"></i><i data-lucide="user-check" style="width:32px;height:32px"></i></div>
              <div style="font-weight:600;margin-bottom:var(--space-xs)">Mobility Volunteers</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-tertiary);margin-bottom:var(--space-md)">Trained volunteers to assist with navigation and mobility support</div>
              <span class="badge badge-green">${StadiumData.randomBetween(15, 25)} Available Now</span>
            </div>
            <div style="text-align:center;padding:var(--space-xl)">
              <div style="margin-bottom:var(--space-md);display:flex;align-items:center;justify-content:center;gap:8px;color:var(--color-blue)"><i data-lucide="globe" style="width:32px;height:32px"></i><i data-lucide="arrow-right" style="width:24px;height:24px;opacity:0.5"></i><i data-lucide="message-circle" style="width:32px;height:32px"></i></div>
              <div style="font-weight:600;margin-bottom:var(--space-xs)">Language Buddies</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-tertiary);margin-bottom:var(--space-md)">Multilingual volunteers for fans who need language assistance</div>
              <span class="badge badge-blue">${StadiumData.randomBetween(20, 40)} Available</span>
            </div>
            <div style="text-align:center;padding:var(--space-xl)">
              <div style="margin-bottom:var(--space-md);display:flex;align-items:center;justify-content:center;gap:8px;color:var(--color-gold)"><i data-lucide="users" style="width:32px;height:32px"></i><i data-lucide="arrow-right" style="width:24px;height:24px;opacity:0.5"></i><i data-lucide="hand" style="width:32px;height:32px"></i></div>
              <div style="font-weight:600;margin-bottom:var(--space-xs)">Family Assist</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-tertiary);margin-bottom:var(--space-md)">Special assistance for families with young children or elderly members</div>
              <span class="badge badge-gold">${StadiumData.randomBetween(10, 20)} Available</span>
            </div>
          </div>
        </div>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  }

  return { init, renderAccessibilityView };
})();
