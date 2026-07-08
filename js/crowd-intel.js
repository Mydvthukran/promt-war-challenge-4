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
            <div class="stat-icon teal"><i data-lucide="building"></i></div>
            <div class="stat-value" data-count="${totalCurrent}">${totalCurrent.toLocaleString()}</div>
            <div class="stat-label">Total Attendance</div>
            <span class="stat-change positive">↑ 2.3% vs last match</span>
          </div>
        </div>
        <div class="card card-accent-gold">
          <div class="stat-widget">
            <div class="stat-icon gold"><i data-lucide="bar-chart-2"></i></div>
            <div class="stat-value">${overallDensity}%</div>
            <div class="stat-label">Overall Capacity</div>
            <span class="stat-change ${overallDensity > 85 ? 'negative' : 'positive'}">${overallDensity > 85 ? '<i data-lucide="alert-triangle" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom"></i> High' : '<i data-lucide="check-circle" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom"></i> Normal'}</span>
          </div>
        </div>
        <div class="card card-accent-blue">
          <div class="stat-widget">
            <div class="stat-icon blue"><i data-lucide="refresh-cw"></i></div>
            <div class="stat-value">${StadiumData.randomBetween(1200, 1800)}</div>
            <div class="stat-label">People/min Flow Rate</div>
            <span class="stat-change positive">↑ Steady flow</span>
          </div>
        </div>
        <div class="card">
          <div class="stat-widget">
            <div class="stat-icon red"><i data-lucide="zap"></i></div>
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
            <div class="card-title"><i data-lucide="flame" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px"></i> Live Crowd Heatmap</div>
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
            <div class="ai-card-label"><i data-lucide="brain" style="width:14px;height:14px;display:inline-block;vertical-align:middle"></i> AI Prediction</div>
            <div class="ai-card-title">Half-Time Crowd Movement</div>
            <div class="ai-card-text">AI predicts 35% of fans will move to concessions at half-time. Recommend pre-staging additional food service staff at Concourse A & B within the next 8 minutes.</div>
          </div>

          <div class="ai-card">
            <div class="ai-card-label"><i data-lucide="brain" style="width:14px;height:14px;display:inline-block;vertical-align:middle"></i> AI Insight</div>
            <div class="ai-card-title">Exit Flow Optimization</div>
            <div class="ai-card-text">Based on historical patterns and current density, recommend opening auxiliary exits at Gates F and G 5 minutes before final whistle to distribute egress load evenly.</div>
          </div>

          <div class="card card-accent-red">
            <div class="card-header">
              <div class="card-title"><i data-lucide="alert-triangle" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px"></i> Active Alerts</div>
              <span class="badge badge-red">${crowdData.filter(z => z.status === 'critical').length} Critical</span>
            </div>
            <div class="card-body">
              ${crowdData.filter(z => z.status === 'critical' || z.status === 'high').map(z => `
                <div class="alert-card ${z.status === 'critical' ? 'alert-danger' : 'alert-warning'}" style="margin-bottom:var(--space-sm)">
                  <div class="alert-icon"><i data-lucide="${z.status === 'critical' ? 'alert-octagon' : 'alert-triangle'}"></i></div>
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
            <span class="section-icon"><i data-lucide="map-pin"></i></span>
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
