/* ============================================
   StadiumAI 2026 — Crowd Intelligence
   Crowd density visualization & AI predictions
   ============================================ */

"use strict";

const CrowdIntel = (() => {
  let updateInterval = null;
  let heatmapCanvas = null;
  let heatmapCtx = null;

  function init() {
    renderCrowdView();
    startLiveUpdates();
  }

  function renderCrowdView() {
    const container = document.getElementById('crowd-content');
    if (!container) return;

    const crowdData = StadiumData.getLiveCrowdData();
    const totalCapacity = crowdData.reduce((sum, z) => sum + z.maxCapacity, 0);
    const totalCurrent = crowdData.reduce((sum, z) => sum + z.currentCount, 0);
    const overallDensity = Math.round((totalCurrent / totalCapacity) * 100);

    container.innerHTML = `
      <!-- Stats Row -->
      <div class="dashboard-grid grid-cols-4" style="margin-bottom: var(--space-xl)">
        <div class="card card-accent-teal">
          <div class="stat-widget">
            <div class="stat-icon teal"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-building"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M12 10h.01" />  <path d="M12 14h.01" />  <path d="M12 6h.01" />  <path d="M16 10h.01" />  <path d="M16 14h.01" />  <path d="M16 6h.01" />  <path d="M8 10h.01" />  <path d="M8 14h.01" />  <path d="M8 6h.01" />  <path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />  <rect x="4" y="2" width="16" height="20" rx="2" /></svg></div>
            <div class="stat-value" data-count="${totalCurrent}">${totalCurrent.toLocaleString()}</div>
            <div class="stat-label">Total Attendance</div>
            <span class="stat-change positive">↑ 2.3% vs last match</span>
          </div>
        </div>
        <div class="card card-accent-gold">
          <div class="stat-widget">
            <div class="stat-icon gold"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-bar-chart-2"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M5 21v-6" />  <path d="M12 21V3" />  <path d="M19 21V9" /></svg></div>
            <div class="stat-value">${overallDensity}%</div>
            <div class="stat-label">Overall Capacity</div>
            <span class="stat-change ${overallDensity > 85 ? 'negative' : 'positive'}">${overallDensity > 85 ? '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-alert-triangle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom">  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />  <path d="M12 9v4" />  <path d="M12 17h.01" /></svg> High' : '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-check-circle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom">  <path d="M21.801 10A10 10 0 1 1 17 3.335" />  <path d="m9 11 3 3L22 4" /></svg> Normal'}</span>
          </div>
        </div>
        <div class="card card-accent-blue">
          <div class="stat-widget">
            <div class="stat-icon blue"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-refresh-cw"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />  <path d="M21 3v5h-5" />  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />  <path d="M8 16H3v5" /></svg></div>
            <div class="stat-value">${StadiumData.randomBetween(1200, 1800)}</div>
            <div class="stat-label">People/min Flow Rate</div>
            <span class="stat-change positive">↑ Steady flow</span>
          </div>
        </div>
        <div class="card">
          <div class="stat-widget">
            <div class="stat-icon red"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-zap"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg></div>
            <div class="stat-value">${crowdData.filter(z => z.status === 'critical' || z.status === 'high').length}</div>
            <div class="stat-label">Zones at High Density</div>
            <span class="stat-change negative">Requires attention</span>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="dashboard-grid grid-cols-2-1">
        <!-- Heatmap -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-flame"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" /></svg> Live Crowd Heatmap</div>
            <span class="badge badge-green">● LIVE</span>
          </div>
          <div class="card-body">
            <div class="stadium-map-container">
              <canvas id="crowd-heatmap" class="heatmap-canvas"></canvas>
              <div class="map-legend">
                <div class="legend-item"><div class="legend-dot" style="background:${StadiumData.THEME.green}"></div> Low</div>
                <div class="legend-item"><div class="legend-dot" style="background:${StadiumData.THEME.amber}"></div> Medium</div>
                <div class="legend-item"><div class="legend-dot" style="background:${StadiumData.THEME.red}"></div> High</div>
                <div class="legend-item"><div class="legend-dot" style="background:${StadiumData.THEME.danger}"></div> Critical</div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Predictions -->
        <div style="display:flex;flex-direction:column;gap:var(--space-xl)">
          <div class="ai-card">
            <div class="ai-card-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> AI Prediction</div>
            <div class="ai-card-title">Half-Time Crowd Movement</div>
            <div class="ai-card-text">AI predicts 35% of fans will move to concessions at half-time. Recommend pre-staging additional food service staff at Concourse A & B within the next 8 minutes.</div>
          </div>

          <div class="ai-card">
            <div class="ai-card-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> AI Insight</div>
            <div class="ai-card-title">Exit Flow Optimization</div>
            <div class="ai-card-text">Based on historical patterns and current density, recommend opening auxiliary exits at Gates F and G 5 minutes before final whistle to distribute egress load evenly.</div>
          </div>

          <div class="card card-accent-red">
            <div class="card-header">
              <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-alert-triangle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />  <path d="M12 9v4" />  <path d="M12 17h.01" /></svg> Active Alerts</div>
              <span class="badge badge-red">${crowdData.filter(z => z.status === 'critical').length} Critical</span>
            </div>
            <div class="card-body">
              ${crowdData.filter(z => z.status === 'critical' || z.status === 'high').map(z => `
                <div class="alert-card ${z.status === 'critical' ? 'alert-danger' : 'alert-warning'}" style="margin-bottom:var(--space-sm)">
                  <div class="alert-icon">${App.getIconSvg(z.status === 'critical' ? 'alert-octagon' : 'alert-triangle').replace('<svg aria-hidden="true"', '<svg style="width:14px;height:14px;display:inline-block;vertical-align:text-bottom"')}</div>
                  <div class="alert-content">
                    <div class="alert-title">${z.name}: ${z.currentDensity}%</div>
                    <div class="alert-message">${z.currentCount.toLocaleString()} / ${z.maxCapacity.toLocaleString()} capacity</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Zone Grid -->
      <div style="margin-top: var(--space-xl)">
        <div class="section-header">
          <div class="section-title">
            <span class="section-icon"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-map-pin"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />  <circle cx="12" cy="10" r="3" /></svg></span>
            <h2>Zone-by-Zone Status</h2>
          </div>
        </div>
        <div class="zone-grid">
          ${crowdData.map(z => `
            <div class="zone-item zone-${z.status}">
              <div class="zone-name">${z.name}</div>
              <div class="zone-percent">${z.currentDensity}%</div>
              <div class="zone-count">${z.currentCount.toLocaleString()} people</div>
              <div style="margin-top:var(--space-sm)">
                <div class="progress-bar">
                  <div class="progress-fill ${z.status === 'critical' ? 'red' : z.status === 'high' ? 'gold' : 'teal'}" style="width:${z.currentDensity}%"></div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    App.renderIcons(container);

    // Draw heatmap
    setTimeout(() => drawHeatmap(crowdData), 100);
  }

  function drawHeatmap(crowdData) {
    const canvas = document.getElementById('crowd-heatmap');
    if (!canvas) return;

    heatmapCanvas = canvas;
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    heatmapCtx = canvas.getContext('2d');

    const ctx = heatmapCtx;
    const w = canvas.width;
    const h = canvas.height;

    // Clear
    ctx.fillStyle = StadiumData.THEME.bgSecondary;
    ctx.fillRect(0, 0, w, h);

    // Draw stadium outline
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;

    // Outer oval
    const cx = w / 2, cy = h / 2;
    const rx = w * 0.42, ry = h * 0.42;

    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Inner oval (pitch)
    ctx.strokeStyle = 'rgba(0,212,170,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx * 0.45, ry * 0.5, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Pitch lines
    ctx.fillStyle = 'rgba(0,212,170,0.08)';
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx * 0.44, ry * 0.49, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw pitch center line
    ctx.beginPath();
    ctx.moveTo(cx, cy - ry * 0.49);
    ctx.lineTo(cx, cy + ry * 0.49);
    ctx.strokeStyle = 'rgba(0,212,170,0.2)';
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, ry * 0.12, 0, Math.PI * 2);
    ctx.stroke();

    // Draw density zones as heat blobs
    const zonePositions = [
      { zone: 'north', x: cx, y: cy - ry * 0.78 },
      { zone: 'south', x: cx, y: cy + ry * 0.78 },
      { zone: 'east', x: cx + rx * 0.78, y: cy },
      { zone: 'west', x: cx - rx * 0.78, y: cy },
      { zone: 'vip', x: cx + rx * 0.5, y: cy - ry * 0.6 },
      { zone: 'concourseA', x: cx - rx * 0.6, y: cy - ry * 0.4 },
      { zone: 'concourseB', x: cx + rx * 0.6, y: cy + ry * 0.4 },
      { zone: 'fanzone', x: cx - rx * 0.4, y: cy + ry * 0.7 },
      { zone: 'food_court', x: cx + rx * 0.3, y: cy + ry * 0.75 },
      { zone: 'gate_main', x: cx, y: cy + ry * 1.05 },
      { zone: 'gate_north', x: cx, y: cy - ry * 1.05 },
      { zone: 'gate_south', x: cx - rx * 0.7, y: cy + ry * 0.2 },
    ];

    zonePositions.forEach(pos => {
      const zoneData = crowdData.find(z => z.id === pos.zone);
      if (!zoneData) return;

      const density = zoneData.currentDensity / 100;
      const radius = 25 + density * 35;

      // Color based on density
      let color;
      if (density > 0.9) color = 'rgba(239,68,68,';
      else if (density > 0.75) color = 'rgba(255,51,102,';
      else if (density > 0.5) color = 'rgba(245,158,11,';
      else color = 'rgba(16,185,129,';

      // Draw radial gradient blob
      const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, radius);
      gradient.addColorStop(0, color + (0.6 * density).toFixed(2) + ')');
      gradient.addColorStop(0.5, color + (0.3 * density).toFixed(2) + ')');
      gradient.addColorStop(1, color + '0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(zoneData.name, pos.x, pos.y - radius - 4);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.font = 'bold 12px Outfit, sans-serif';
      ctx.fillText(zoneData.currentDensity + '%', pos.x, pos.y + 4);
    });

    // Stadium label
    ctx.fillStyle = 'rgba(0,212,170,0.5)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PITCH', cx, cy + 4);
  }

  function startLiveUpdates() {
    if (updateInterval) clearInterval(updateInterval);
    updateInterval = setInterval(() => {
      if (Router.getCurrentView() === 'crowd') {
        renderCrowdView();
      }
    }, 8000);
  }

  function destroy() {
    if (updateInterval) clearInterval(updateInterval);
  }

  return { init, renderCrowdView, destroy };
})();
