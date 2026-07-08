/* ============================================
   StadiumAI 2026 — Operations Dashboard
   ============================================ */

"use strict";

const OpsDashboard = (() => {
  let isInitialized = false;

  function init() {
    renderOpsView();
  }

  function renderOpsView() {
    const container = document.getElementById('ops-content');
    if (!container) return;

    const kpis = StadiumData.getOperationalKPIs();
    const insights = StadiumData.aiInsights;

    container.innerHTML = `
      <!-- KPI Cards -->
      <div class="dashboard-grid grid-cols-4" style="margin-bottom:var(--space-xl)">
        <div class="card card-accent-teal">
          <div class="stat-widget">
            <div class="stat-icon teal"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-building"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M12 10h.01" />  <path d="M12 14h.01" />  <path d="M12 6h.01" />  <path d="M16 10h.01" />  <path d="M16 14h.01" />  <path d="M16 6h.01" />  <path d="M8 10h.01" />  <path d="M8 14h.01" />  <path d="M8 6h.01" />  <path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />  <rect x="4" y="2" width="16" height="20" rx="2" /></svg></div>
            <div class="stat-value">${(kpis.totalAttendance / 1000).toFixed(1)}k</div>
            <div class="stat-label">Total Attendance</div>
            <span class="stat-change positive">↑ 96% capacity</span>
          </div>
        </div>
        <div class="card card-accent-gold">
          <div class="stat-widget">
            <div class="stat-icon gold"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-zap"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg></div>
            <div class="stat-value">${kpis.gateProcessingRate}</div>
            <div class="stat-label">Gate Processing/min</div>
            <span class="stat-change positive">↑ Above target</span>
          </div>
        </div>
        <div class="card card-accent-blue">
          <div class="stat-widget">
            <div class="stat-icon blue"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-users"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />  <path d="M16 3.128a4 4 0 0 1 0 7.744" />  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />  <circle cx="9" cy="7" r="4" /></svg></div>
            <div class="stat-value">${kpis.staffDeployed}</div>
            <div class="stat-label">Staff Deployed</div>
            <span class="stat-change positive">${kpis.volunteerActive} volunteers</span>
          </div>
        </div>
        <div class="card ${kpis.securityIncidents > 3 ? 'card-accent-red' : ''}">
          <div class="stat-widget">
            <div class="stat-icon red"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-alert-triangle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />  <path d="M12 9v4" />  <path d="M12 17h.01" /></svg></div>
            <div class="stat-value">${kpis.securityIncidents}</div>
            <div class="stat-label">Security Incidents</div>
            <span class="stat-change ${kpis.securityIncidents > 3 ? 'negative' : 'positive'}">${kpis.securityIncidents > 3 ? '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-alert-triangle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom">  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />  <path d="M12 9v4" />  <path d="M12 17h.01" /></svg> Elevated' : '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-check-circle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom">  <path d="M21.801 10A10 10 0 1 1 17 3.335" />  <path d="m9 11 3 3L22 4" /></svg> Normal'}</span>
          </div>
        </div>
      </div>

      <!-- Second Row KPIs -->
      <div class="dashboard-grid grid-cols-4" style="margin-bottom:var(--space-xl)">
        <div class="card">
          <div class="stat-widget">
            <div class="stat-icon purple"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-clock"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <path d="M12 6v6l4 2" /></svg></div>
            <div class="stat-value">${kpis.avgEntryTime}m</div>
            <div class="stat-label">Avg Entry Time</div>
          </div>
        </div>
        <div class="card">
          <div class="stat-widget">
            <div class="stat-icon orange"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-heart-pulse"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />  <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" /></svg></div>
            <div class="stat-value">${kpis.medicalCalls}</div>
            <div class="stat-label">Medical Calls</div>
          </div>
        </div>
        <div class="card">
          <div class="stat-widget">
            <div class="stat-icon blue"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-wifi"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M12 20h.01" />  <path d="M2 8.82a15 15 0 0 1 20 0" />  <path d="M5 12.859a10 10 0 0 1 14 0" />  <path d="M8.5 16.429a5 5 0 0 1 7 0" /></svg></div>
            <div class="stat-value">${(kpis.wifiConnections / 1000).toFixed(1)}k</div>
            <div class="stat-label">WiFi Connections</div>
          </div>
        </div>
        <div class="card">
          <div class="stat-widget">
            <div class="stat-icon gold"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-star"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg></div>
            <div class="stat-value">${kpis.customerSatisfaction}</div>
            <div class="stat-label">Fan Satisfaction</div>
            <span class="stat-change positive">/ 5.0</span>
          </div>
        </div>
      </div>

      <!-- AI Insights + Incident Timeline -->
      <div class="dashboard-grid grid-cols-2">
        <!-- AI Decision Support -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> AI Decision Support</div>
            <span class="badge badge-teal">GenAI Powered</span>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:var(--space-md)">
            ${insights.map(insight => `
              <div class="alert-card alert-${insight.severity === 'danger' ? 'danger' : insight.severity === 'warning' ? 'warning' : insight.severity === 'success' ? 'success' : 'info'}">
                <div class="alert-icon">${App.getIconSvg(insight.severity === 'danger' ? 'alert-octagon' : insight.severity === 'warning' ? 'alert-triangle' : insight.severity === 'success' ? 'check-circle' : 'info').replace('<svg aria-hidden="true"', '<svg style="width:24px;height:24px"')}</div>
                <div class="alert-content">
                  <div class="alert-title">${insight.title}</div>
                  <div class="alert-message">${insight.message}</div>
                  <div style="margin-top:var(--space-sm);display:flex;gap:var(--space-sm);align-items:center">
                    <button class="btn btn-sm btn-primary">${insight.action}</button>
                    <span class="alert-time">${insight.time}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right Column -->
        <div style="display:flex;flex-direction:column;gap:var(--space-xl)">
          <!-- Incident Timeline -->
          <div class="card">
            <div class="card-header">
              <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-clipboard-list"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />  <path d="M12 11h4" />  <path d="M12 16h4" />  <path d="M8 11h.01" />  <path d="M8 16h.01" /></svg> Live Incident Timeline</div>
              <span class="badge badge-green">● LIVE</span>
            </div>
            <div class="card-body">
              <div class="timeline">
                <div class="timeline-item critical">
                  <div class="timeline-time">16:02</div>
                  <div class="timeline-title">Gate D Scanner Malfunction</div>
                  <div class="timeline-content">Automated fallback initiated. Manual screening active. Tech team dispatched (ETA: 3 min).</div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-time">15:47</div>
                  <div class="timeline-title">Medical — Concourse B</div>
                  <div class="timeline-content">Minor heat exhaustion case. First aid administered. Patient stable.</div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-time">15:32</div>
                  <div class="timeline-title">Lost Child — Section 300</div>
                  <div class="timeline-content">Reunited with family within 8 minutes via AI facial matching system.</div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-time">15:15</div>
                  <div class="timeline-title">VIP Delegation Arrival</div>
                  <div class="timeline-content">FIFA President and delegation escorted to VIP box. Security protocol completed.</div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-time">14:50</div>
                  <div class="timeline-title">Stadium Capacity 90%</div>
                  <div class="timeline-content">Gate flow management activated. Extra screening lanes opened at Gates A and C.</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Resource Allocation -->
          <div class="card">
            <div class="card-header">
              <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-bar-chart-2"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <path d="M5 21v-6" />  <path d="M12 21V3" />  <path d="M19 21V9" /></svg> Resource Allocation</div>
              <span class="badge badge-purple">AI Optimized</span>
            </div>
            <div class="card-body">
              ${[
                { name: 'Security Personnel', deployed: 320, total: 350, zone: 'All Gates' },
                { name: 'Medical Staff', deployed: 45, total: 50, zone: 'Stations 1-6' },
                { name: 'Volunteers', deployed: kpis.volunteerActive, total: 400, zone: 'All Zones' },
                { name: 'Cleaning Crew', deployed: 85, total: 100, zone: 'Concourses' },
                { name: 'Tech Support', deployed: 28, total: 35, zone: 'Control Room + Field' },
              ].map(r => {
                const pct = Math.round(r.deployed / r.total * 100);
                return `
                  <div style="margin-bottom:var(--space-lg)">
                    <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-xs)">
                      <span style="font-size:var(--text-sm);font-weight:500">${r.name}</span>
                      <span style="font-size:var(--text-xs);color:var(--color-text-tertiary)">${r.deployed}/${r.total} (${r.zone})</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill ${pct > 90 ? 'teal' : pct > 70 ? 'blue' : 'gold'}" style="width:${pct}%"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    App.renderIcons(container);
  }

  return { init, renderOpsView };
})();
