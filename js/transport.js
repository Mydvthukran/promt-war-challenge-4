/* ============================================
   StadiumAI 2026 — Transportation Intelligence
   Real-time transport status & AI recommendations
   ============================================ */

"use strict";

const Transport = (() => {
  let isInitialized = false;

  function init() {
    renderTransportView();
  }

  function renderTransportView() {
    const container = document.getElementById('transport-content');
    if (!container) return;

    const transportData = StadiumData.getLiveTransportData();

    container.innerHTML = `
      <div class="welcome-banner">
        <div class="welcome-title"><!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-car"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:28px;height:28px">  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />  <circle cx="7" cy="17" r="2" />  <path d="M9 17h6" />  <circle cx="17" cy="17" r="2" /></svg> AI Transportation Intelligence</div>
        <div class="welcome-subtitle">Real-time transport status, AI-optimized departure recommendations, and carbon footprint analysis to get you home efficiently and sustainably.</div>
      </div>

      <!-- AI Departure Recommendation -->
      <div class="ai-card" style="margin-bottom:var(--space-xl)">
        <div class="ai-card-label"><!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> AI Departure Optimizer</div>
        <div class="ai-card-title">Best Time to Leave</div>
        <div class="ai-card-text" style="font-size:var(--text-base)">
          Based on current crowd density (78%), match minute (72'), and transport schedules:<br><br>
          <!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-check-circle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="color:var(--color-success);width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M21.801 10A10 10 0 1 1 17 3.335" />  <path d="m9 11 3 3L22 4" /></svg> <strong>Leave at 85th minute</strong> — Metro wait: ~8 min | Rideshare surge: 1.2x<br>
          <!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-alert-triangle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="color:var(--color-warning);width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />  <path d="M12 9v4" />  <path d="M12 17h.01" /></svg> <strong>Leave at full-time</strong> — Metro wait: ~25 min | Rideshare surge: 2.4x<br>
          <!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-alert-octagon"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="color:var(--color-danger);width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M12 16h.01" />  <path d="M12 8v4" />  <path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" /></svg> <strong>Leave 15 min post-match</strong> — Metro wait: ~45 min | Rideshare surge: 2.8x<br><br>
          <!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-lightbulb"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />  <path d="M9 18h6" />  <path d="M10 22h4" /></svg> <strong>AI Recommendation:</strong> Take the NJ Transit train. Next departure 8 min after final whistle. Platform 2.
        </div>
      </div>

      <!-- Transport Status Grid -->
      <div class="section-header">
        <div class="section-title">
          <span class="section-icon"><!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-map-pin"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />  <circle cx="12" cy="10" r="3" /></svg></span>
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
            <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-leaf"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg> Carbon Footprint Comparison</div>
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
              <div style="font-size:var(--text-sm);font-weight:600;color:var(--color-success)"><!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-globe"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="12" cy="12" r="10" />  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />  <path d="M2 12h20" /></svg> Green Choice Saves</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-secondary);margin-top:4px">Taking the metro instead of driving saves <strong>1.8 kg CO₂</strong> per trip. Over 80,000 fans, that's <strong>144 tons</strong> of CO₂!</div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-parking-circle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <circle cx="12" cy="12" r="10" />  <path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></svg> Parking Intelligence</div>
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
                      <span>${fill > 90 ? '<!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-alert-triangle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom">  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />  <path d="M12 9v4" />  <path d="M12 17h.01" /></svg> Almost Full' : fill > 75 ? 'Filling Up' : '<!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-check-circle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom">  <path d="M21.801 10A10 10 0 1 1 17 3.335" />  <path d="m9 11 3 3L22 4" /></svg> Available'}</span>
                      <span>${Math.round((1 - fill/100) * 500)} spots left</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <div class="ai-card" style="margin-top:var(--space-xl)">
              <div class="ai-card-label"><!-- @license lucide-static v1.23.0 - ISC --><svg  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> AI Parking Tip</div>
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
