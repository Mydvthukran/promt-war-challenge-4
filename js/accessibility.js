/* ============================================
   StadiumAI 2026 — Accessibility Hub
   Services and inclusive routing
   ============================================ */

"use strict";

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
        <div class="welcome-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-accessibility"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:28px;height:28px">  <circle cx="16" cy="4" r="1" />  <path d="m18 19 1-7-6 1" />  <path d="m5 8 3-3 5.5 3-2.36 3.5" />  <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />  <path d="M13.76 17.5a5 5 0 0 0-6.88-6" /></svg> Accessibility Hub</div>
        <div class="welcome-subtitle">FIFA World Cup 2026 is committed to being the most accessible World Cup ever. Find all inclusive services, accessible routes, and assistance options here.</div>
      </div>

      <!-- Service Status Grid -->
      <div class="section-header">
        <div class="section-title">
          <span class="section-icon"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-bell"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M10.268 21a2 2 0 0 0 3.464 0" />  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" /></svg></span>
          <h2>Available Services</h2>
        </div>
        <button class="btn btn-sm btn-primary" onclick="AIChatbot.openPanel()"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-message-square"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" /></svg> Ask AI Assistant</button>
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
          <div class="ai-card-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> AI Accessibility Concierge</div>
          <div class="ai-card-title">Personalized Assistance</div>
          <div class="ai-card-text">
            Our AI understands your specific needs and can provide:<br><br>
            <!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-accessibility"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="16" cy="4" r="1" />  <path d="m18 19 1-7-6 1" />  <path d="m5 8 3-3 5.5 3-2.36 3.5" />  <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />  <path d="M13.76 17.5a5 5 0 0 0-6.88-6" /></svg> <strong>Custom accessible routes</strong> avoiding stairs and crowds<br>
            <!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> <strong>Sensory-friendly guidance</strong> — quiet times and low-stimulation paths<br>
            <!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-eye"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />  <circle cx="12" cy="12" r="3" /></svg> <strong>Audio-described navigation</strong> for visually impaired fans<br>
            <!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-hand-metal"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" />  <path d="M14 11V9a2 2 0 1 0-4 0v2" />  <path d="M10 10.5V5a2 2 0 1 0-4 0v9" />  <path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5" /></svg> <strong>Sign language video relay</strong> for deaf and hard-of-hearing fans<br>
            <!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-accessibility"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="16" cy="4" r="1" />  <path d="m18 19 1-7-6 1" />  <path d="m5 8 3-3 5.5 3-2.36 3.5" />  <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />  <path d="M13.76 17.5a5 5 0 0 0-6.88-6" /></svg> <strong>Mobility cart booking</strong> — real-time availability<br><br>
            <em>Just open the AI chatbot and describe what you need — it will guide you in your language.</em>
          </div>
          <button class="btn btn-primary" style="margin-top:var(--space-lg)" onclick="AIChatbot.openPanel()"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-message-square"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" /></svg> Open AI Assistant</button>
        </div>

        <!-- Accessible Route Finder -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-map"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px;display:inline-block;vertical-align:text-bottom">  <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />  <path d="M15 5.764v15" />  <path d="M9 3.236v15" /></svg> Accessible Route Planner</div>
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
                    <input type="checkbox" style="width:14px;height:14px;padding:0" aria-label="${need}"> ${need}
                  </label>
                `).join('')}
              </div>
            </div>
            <button class="btn btn-primary" style="width:100%" onclick="App.showToast('<i data-lucide=\'accessibility\' style=\'width:16px;height:16px;display:inline-block;vertical-align:text-bottom\'></i> Accessible Route Found','Elevator route via Gate C → Level 2 → Section 214. Estimated: 6 min. No stairs.','success')">
              <!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-compass"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="12" cy="12" r="10" />  <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /></svg> Find Accessible Route
            </button>
          </div>
        </div>
      </div>

      <!-- Companion Matching -->
      <div class="card" style="margin-top:var(--space-xl)">
        <div class="card-header">
          <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-handshake"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px;display:inline-block;vertical-align:text-bottom">  <path d="m11 17 2 2a1 1 0 1 0 3-3" />  <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />  <path d="m21 3 1 11h-2" />  <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />  <path d="M3 4h8" /></svg> AI Companion Matching</div>
          <span class="badge badge-purple">Powered by AI</span>
        </div>
        <div class="card-body">
          <div class="dashboard-grid grid-cols-3">
            <div style="text-align:center;padding:var(--space-xl)">
              <div style="margin-bottom:var(--space-md);display:flex;align-items:center;justify-content:center;gap:8px;color:var(--color-primary)"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-accessibility"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:32px;height:32px">  <circle cx="16" cy="4" r="1" />  <path d="m18 19 1-7-6 1" />  <path d="m5 8 3-3 5.5 3-2.36 3.5" />  <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />  <path d="M13.76 17.5a5 5 0 0 0-6.88-6" /></svg><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-arrow-right"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:24px;height:24px;opacity:0.5">  <path d="M5 12h14" />  <path d="m12 5 7 7-7 7" /></svg><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-user-check"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:32px;height:32px">  <path d="m16 11 2 2 4-4" />  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />  <circle cx="9" cy="7" r="4" /></svg></div>
              <div style="font-weight:600;margin-bottom:var(--space-xs)">Mobility Volunteers</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-tertiary);margin-bottom:var(--space-md)">Trained volunteers to assist with navigation and mobility support</div>
              <span class="badge badge-green">${StadiumData.randomBetween(15, 25)} Available Now</span>
            </div>
            <div style="text-align:center;padding:var(--space-xl)">
              <div style="margin-bottom:var(--space-md);display:flex;align-items:center;justify-content:center;gap:8px;color:var(--color-blue)"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-globe"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:32px;height:32px">  <circle cx="12" cy="12" r="10" />  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />  <path d="M2 12h20" /></svg><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-arrow-right"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:24px;height:24px;opacity:0.5">  <path d="M5 12h14" />  <path d="m12 5 7 7-7 7" /></svg><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-message-circle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:32px;height:32px">  <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" /></svg></div>
              <div style="font-weight:600;margin-bottom:var(--space-xs)">Language Buddies</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-tertiary);margin-bottom:var(--space-md)">Multilingual volunteers for fans who need language assistance</div>
              <span class="badge badge-blue">${StadiumData.randomBetween(20, 40)} Available</span>
            </div>
            <div style="text-align:center;padding:var(--space-xl)">
              <div style="margin-bottom:var(--space-md);display:flex;align-items:center;justify-content:center;gap:8px;color:var(--color-gold)"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-users"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:32px;height:32px">  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />  <path d="M16 3.128a4 4 0 0 1 0 7.744" />  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />  <circle cx="9" cy="7" r="4" /></svg><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-arrow-right"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:24px;height:24px;opacity:0.5">  <path d="M5 12h14" />  <path d="m12 5 7 7-7 7" /></svg><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-hand"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:32px;height:32px">  <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />  <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />  <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></svg></div>
              <div style="font-weight:600;margin-bottom:var(--space-xs)">Family Assist</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-tertiary);margin-bottom:var(--space-md)">Special assistance for families with young children or elderly members</div>
              <span class="badge badge-gold">${StadiumData.randomBetween(10, 20)} Available</span>
            </div>
          </div>
        </div>
      </div>
    `;

    App.renderIcons(container);
  }

  return { init, renderAccessibilityView };
})();
