/* ============================================
   StadiumAI 2026 — Transportation Intelligence
   Real-time transport status & AI recommendations
   ============================================ */

"use strict";

const Transport = (() => {
  function init() {
    renderTransportView();
  }

  function renderTransportView() {
    const container = document.getElementById('transport-content');
    if (!container) return;

    const transportData = StadiumData.getLiveTransportData();

    container.innerHTML = `
      <div class="welcome-banner">
        <div class="welcome-title"><i data-lucide="car" style="display:inline-block;vertical-align:text-bottom;width:28px;height:28px"></i> AI Transportation Intelligence</div>
        <div class="welcome-subtitle">Real-time transport status, AI-optimized departure recommendations, and carbon footprint analysis to get you home efficiently and sustainably.</div>
      </div>

      <!-- AI Departure Recommendation -->
      <div class="ai-card" style="margin-bottom:var(--space-xl)">
        <div class="ai-card-label"><i data-lucide="brain" style="width:14px;height:14px;display:inline-block;vertical-align:middle"></i> AI Departure Optimizer</div>
        <div class="ai-card-title">Best Time to Leave</div>
        <div class="ai-card-text" style="font-size:var(--text-base)">
          Based on current crowd density (78%), match minute (72'), and transport schedules:<br><br>
          <i data-lucide="check-circle" style="color:var(--color-success);width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> <strong>Leave at 85th minute</strong> — Metro wait: ~8 min | Rideshare surge: 1.2x<br>
          <i data-lucide="alert-triangle" style="color:var(--color-warning);width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> <strong>Leave at full-time</strong> — Metro wait: ~25 min | Rideshare surge: 2.4x<br>
          <i data-lucide="alert-octagon" style="color:var(--color-danger);width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> <strong>Leave 15 min post-match</strong> — Metro wait: ~45 min | Rideshare surge: 2.8x<br><br>
          <i data-lucide="lightbulb" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> <strong>AI Recommendation:</strong> Take the NJ Transit train. Next departure 8 min after final whistle. Platform 2.
        </div>
      </div>

      <!-- Transport Status Grid -->
      <div class="section-header">
        <div class="section-title">
          <span class="section-icon"><i data-lucide="map-pin"></i></span>
          <h2>Live Transport Status</h2>
        </div>
        <span class="badge badge-green">● LIVE</span>
      </div>

      <div class="dashboard-grid grid-cols-2" style="margin-bottom:var(--space-xl)">
        ${transportData.map(t => `
          <div class="transport-card">
            <div class="transport-icon" style="background:${t.color}22">
              <span style="font-size:1.5rem">${t.icon}</span>
            </div>
            <div class="transport-info">
              <div class="transport-name">${t.name}</div>
              <div class="transport-detail">
                ${t.status === 'operational' 
                  ? '<span class="badge badge-green">● Operational</span>'
                  : '<span class="badge badge-red">⚠ Delayed</span>'}
                ${t.surgeMultiplier ? ` <span class="badge badge-gold">Surge: ${t.surgeMultiplier}x</span>` : ''}
              </div>
            </div>
            <div class="transport-status">
              <div class="transport-eta" style="color:${t.color}">${t.currentWait} min</div>
              <div class="transport-eta-label">
                ${t.capacity !== null ? `${t.capacity}% full` : `Next: ${t.nextDeparture} min`}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Carbon Footprint Comparison -->
      <div class="dashboard-grid grid-cols-2">
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i data-lucide="leaf" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px"></i> Carbon Footprint Comparison</div>
            <span class="badge badge-green">Per trip (avg 12km)</span>
          </div>
          <div class="card-body">
            <div class="carbon-bar-chart">
              ${transportData.map(t => {
                const carbon = (t.carbonPerKm * 12).toFixed(1);
                const maxCarbon = 2.6;
                const pct = Math.max(5, (carbon / maxCarbon) * 100);
                const barColor = carbon == 0 ? StadiumData.THEME.green : carbon < 1 ? StadiumData.THEME.teal : carbon < 2 ? StadiumData.THEME.amber : StadiumData.THEME.red;
                return `
                  <div class="carbon-bar-row">
                    <div class="carbon-bar-label">${t.icon} ${t.name.split(' ')[0]}</div>
                    <div class="carbon-bar-track">
                      <div class="carbon-bar-fill" style="width:${pct}%;background:${barColor}">${carbon > 0.5 ? carbon + 'kg' : ''}</div>
                    </div>
                    <div class="carbon-bar-value" style="color:${barColor}">${carbon}kg</div>
                  </div>
                `;
              }).join('')}
            </div>
            <div style="margin-top:var(--space-lg);padding:var(--space-md);background:rgba(16,185,129,0.08);border-radius:var(--radius-md);border-left:3px solid var(--color-success)">
              <div style="font-size:var(--text-sm);font-weight:600;color:var(--color-success)"><i data-lucide="globe" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Green Choice Saves</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-secondary);margin-top:4px">Taking the metro instead of driving saves <strong>1.8 kg CO₂</strong> per trip. Over 80,000 fans, that's <strong>144 tons</strong> of CO₂!</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title"><i data-lucide="parking-circle" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px"></i> Parking Intelligence</div>
          </div>
          <div class="card-body">
            <div style="display:flex;flex-direction:column;gap:var(--space-lg)">
              ${['Lot A (North)', 'Lot B (East)', 'Lot C (South)', 'Lot D (VIP)'].map((lot, i) => {
                const fill = [87, 94, 62, 45][i];
                const color = fill > 90 ? StadiumData.THEME.danger : fill > 75 ? StadiumData.THEME.amber : StadiumData.THEME.green;
                return `
                  <div>
                    <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-xs)">
                      <span style="font-size:var(--text-sm);font-weight:500">${lot}</span>
                      <span style="font-size:var(--text-sm);font-weight:700;color:${color}">${fill}%</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width:${fill}%;background:${color}"></div>
                    </div>
                    <div class="progress-info">
                      <span>${fill > 90 ? '<i data-lucide="alert-triangle" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom"></i> Almost Full' : fill > 75 ? 'Filling Up' : '<i data-lucide="check-circle" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom"></i> Available'}</span>
                      <span>${Math.round((1 - fill/100) * 500)} spots left</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="ai-card" style="margin-top:var(--space-xl)">
              <div class="ai-card-label"><i data-lucide="brain" style="width:14px;height:14px;display:inline-block;vertical-align:middle"></i> AI Parking Tip</div>
              <div class="ai-card-text">Lot C (South) has the most availability and direct metro access. Recommend for post-match quick exit. Estimated exit time: 12 min faster than Lot A.</div>
            </div>
          </div>
        </div>
      </div>
    `;
    App.renderIcons(container);
  }

  return { init, renderTransportView };
})();
