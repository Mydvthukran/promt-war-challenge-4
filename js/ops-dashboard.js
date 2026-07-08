/* ============================================
   StadiumAI 2026 — Operational Intelligence
   Staff dashboard with AI decision support
   ============================================ */

const OpsDashboard = (() => {
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
            <div class="stat-icon teal">🏟️</div>
            <div class="stat-value">${(kpis.totalAttendance / 1000).toFixed(1)}k</div>
            <div class="stat-label">Total Attendance</div>
            <span class="stat-change positive">↑ 96% capacity</span>
          </div>
        </div>
        <div class="card card-accent-gold">
          <div class="stat-widget">
            <div class="stat-icon gold">⚡</div>
            <div class="stat-value">${kpis.gateProcessingRate}</div>
            <div class="stat-label">Gate Processing/min</div>
            <span class="stat-change positive">↑ Above target</span>
          </div>
        </div>
        <div class="card card-accent-blue">
          <div class="stat-widget">
            <div class="stat-icon blue">👥</div>
            <div class="stat-value">${kpis.staffDeployed}</div>
            <div class="stat-label">Staff Deployed</div>
            <span class="stat-change positive">${kpis.volunteerActive} volunteers</span>
          </div>
        </div>
        <div class="card ${kpis.securityIncidents > 3 ? 'card-accent-red' : ''}">
          <div class="stat-widget">
            <div class="stat-icon red">🚨</div>
            <div class="stat-value">${kpis.securityIncidents}</div>
            <div class="stat-label">Security Incidents</div>
            <span class="stat-change ${kpis.securityIncidents > 3 ? 'negative' : 'positive'}">${kpis.securityIncidents > 3 ? '⚠️ Elevated' : '✅ Normal'}</span>
          </div>
        </div>
      </div>

      <!-- Second Row KPIs -->
      <div class="dashboard-grid grid-cols-4" style="margin-bottom:var(--space-xl)">
        <div class="card">
          <div class="stat-widget">
            <div class="stat-icon purple">⏱️</div>
            <div class="stat-value">${kpis.avgEntryTime}m</div>
            <div class="stat-label">Avg Entry Time</div>
          </div>
        </div>
        <div class="card">
          <div class="stat-widget">
            <div class="stat-icon orange">🏥</div>
            <div class="stat-value">${kpis.medicalCalls}</div>
            <div class="stat-label">Medical Calls</div>
          </div>
        </div>
        <div class="card">
          <div class="stat-widget">
            <div class="stat-icon blue">📶</div>
            <div class="stat-value">${(kpis.wifiConnections / 1000).toFixed(1)}k</div>
            <div class="stat-label">WiFi Connections</div>
          </div>
        </div>
        <div class="card">
          <div class="stat-widget">
            <div class="stat-icon gold">⭐</div>
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
            <div class="card-title">🧠 AI Decision Support</div>
            <span class="badge badge-teal">GenAI Powered</span>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:var(--space-md)">
            ${insights.map(insight => `
              <div class="alert-card alert-${insight.severity === 'danger' ? 'danger' : insight.severity === 'warning' ? 'warning' : insight.severity === 'success' ? 'success' : 'info'}">
                <div class="alert-icon">${insight.severity === 'danger' ? '🔴' : insight.severity === 'warning' ? '🟡' : insight.severity === 'success' ? '🟢' : '🔵'}</div>
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
              <div class="card-title">📋 Live Incident Timeline</div>
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
              <div class="card-title">📊 Resource Allocation</div>
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
  }

  return { init, renderOpsView };
})();
