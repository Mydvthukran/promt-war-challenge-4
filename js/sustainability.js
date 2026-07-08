/* ============================================
   StadiumAI 2026 — Sustainability Tracker
   Environmental impact monitoring & AI insights
   ============================================ */

"use strict";

const Sustainability = (() => {
  let isInitialized = false;

  function init() {
    renderSustainabilityView();
  }

  function renderSustainabilityView() {
    const container = document.getElementById('sustainability-content');
    if (!container) return;

    const data = StadiumData.getLiveSustainabilityData();

    container.innerHTML = `
      <div class="welcome-banner" style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(0,212,170,0.1));border-color:rgba(16,185,129,0.15)">
        <div class="welcome-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-leaf"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:28px;height:28px">  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg> Sustainability Dashboard</div>
        <div class="welcome-subtitle">Tracking environmental impact in real-time. FIFA World Cup 2026 aims to set new standards for sustainable mega-events.</div>
      </div>

      <!-- Overall Score + Key Metrics -->
      <div class="dashboard-grid grid-cols-2-1" style="margin-bottom:var(--space-xl)">
        <div class="dashboard-grid grid-cols-3">
          <div class="card card-accent-teal">
            <div class="stat-widget">
              <div class="stat-icon teal"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-recycle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />  <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />  <path d="m14 16-3 3 3 3" />  <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />  <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />  <path d="m13.378 9.633 4.096 1.098 1.097-4.096" /></svg></div>
              <div class="stat-value">${data.wasteDiverted.toFixed(1)}%</div>
              <div class="stat-label">Waste Diverted</div>
              <span class="stat-change positive">↑ 3.2% vs target</span>
            </div>
          </div>
          <div class="card card-accent-gold">
            <div class="stat-widget">
              <div class="stat-icon gold"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-zap"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg></div>
              <div class="stat-value">${data.renewableEnergy.toFixed(0)}%</div>
              <div class="stat-label">Renewable Energy</div>
              <span class="stat-change positive">↑ Solar + Wind</span>
            </div>
          </div>
          <div class="card card-accent-blue">
            <div class="stat-widget">
              <div class="stat-icon blue"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-droplet"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /></svg></div>
              <div class="stat-value">${data.waterRecycled.toFixed(0)}%</div>
              <div class="stat-label">Water Recycled</div>
              <span class="stat-change positive">↑ 5% vs 2022</span>
            </div>
          </div>
          <div class="card">
            <div class="stat-widget">
              <div class="stat-icon purple"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-globe"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />  <path d="M2 12h20" /></svg></div>
              <div class="stat-value">${data.carbonOffset.toFixed(0)}%</div>
              <div class="stat-label">Carbon Offset</div>
              <span class="stat-change positive">On track</span>
            </div>
          </div>
          <div class="card">
            <div class="stat-widget">
              <div class="stat-icon teal"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-coffee"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M10 2v2" />  <path d="M14 2v2" />  <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />  <path d="M6 2v2" /></svg></div>
              <div class="stat-value">${data.plasticReduced}%</div>
              <div class="stat-label">Plastic Reduction</div>
              <span class="stat-change positive">vs 2022 baseline</span>
            </div>
          </div>
          <div class="card">
            <div class="stat-widget">
              <div class="stat-icon orange"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-utensils"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />  <path d="M7 2v20" />  <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></svg></div>
              <div class="stat-value">${data.foodWaste.toFixed(1)}%</div>
              <div class="stat-label">Food Waste Rate</div>
              <span class="stat-change ${data.foodWaste < 10 ? 'positive' : 'negative'}">${data.foodWaste < 10 ? '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-check-circle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom">  <path d="M21.801 10A10 10 0 1 1 17 3.335" />  <path d="m9 11 3 3L22 4" /></svg> Below target' : '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-alert-triangle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom">  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />  <path d="M12 9v4" />  <path d="M12 17h.01" /></svg> Above target'}</span>
            </div>
          </div>
        </div>

        <!-- Eco Score Ring -->
        <div class="card" style="display:flex;flex-direction:column;align-items:center;justify-content:center">
          <div class="eco-score">
            <div class="eco-score-ring">
              <svg aria-hidden="true" width="160" height="160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="12"/>
                <circle cx="80" cy="80" r="70" fill="none" stroke="url(#eco-gradient)" stroke-width="12" stroke-linecap="round"
                        stroke-dasharray="${2 * Math.PI * 70}" stroke-dashoffset="${2 * Math.PI * 70 * (1 - data.overallScore / 100)}"
                        transform="rotate(-90, 80, 80)"/>
                <defs>
                  <linearGradient id="eco-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:${StadiumData.THEME.green}"/>
                    <stop offset="100%" style="stop-color:${StadiumData.THEME.teal}"/>
                  </linearGradient>
                </defs>
              </svg>
              <div class="eco-score-value">
                <div class="score">${data.overallScore}</div>
                <div class="label">/ 100</div>
              </div>
            </div>
            <div style="text-align:center">
              <div style="font-family:var(--font-display);font-weight:800;font-size:var(--text-lg);color:var(--color-success)">Excellent</div>
              <div style="font-size:var(--text-xs);color:var(--color-text-tertiary)">Overall Sustainability Score</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Metrics + AI Insights -->
      <div class="dashboard-grid grid-cols-2">
        <!-- Detailed Breakdown -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-bar-chart-2"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <path d="M5 21v-6" />  <path d="M12 21V3" />  <path d="M19 21V9" /></svg> Detailed Metrics</div>
          </div>
          <div class="card-body">
            <div class="metric-row">
              <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-trash-2"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M10 11v6" />  <path d="M14 11v6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />  <path d="M3 6h18" />  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg> Waste Generated</div>
              <div class="metric-value">${(data.wasteGenerated / 1000).toFixed(1)}t</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-recycle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />  <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />  <path d="m14 16-3 3 3 3" />  <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />  <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />  <path d="m13.378 9.633 4.096 1.098 1.097-4.096" /></svg> Recycled / Composted</div>
              <div class="metric-value text-teal">${(data.wasteGenerated * data.wasteDiverted / 100000).toFixed(1)}t</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-zap"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg> Energy Consumed</div>
              <div class="metric-value">${(data.energyUsed / 1000).toFixed(1)} MWh</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-sun"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="12" cy="12" r="4" />  <path d="M12 2v2" />  <path d="M12 20v2" />  <path d="m4.93 4.93 1.41 1.41" />  <path d="m17.66 17.66 1.41 1.41" />  <path d="M2 12h2" />  <path d="M20 12h2" />  <path d="m6.34 17.66-1.41 1.41" />  <path d="m19.07 4.93-1.41 1.41" /></svg> From Renewables</div>
              <div class="metric-value text-gold">${(data.energyUsed * data.renewableEnergy / 100000).toFixed(1)} MWh</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-droplet"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" /></svg> Water Used</div>
              <div class="metric-value">${(data.waterUsed / 1000).toFixed(0)}k L</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-refresh-cw"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />  <path d="M21 3v5h-5" />  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />  <path d="M8 16H3v5" /></svg> Water Recycled</div>
              <div class="metric-value text-blue">${(data.waterUsed * data.waterRecycled / 100000).toFixed(0)}k L</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-globe"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="12" cy="12" r="10" />  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />  <path d="M2 12h20" /></svg> Fan Green Transport</div>
              <div class="metric-value text-teal">${(data.fanGreenActions / 1000).toFixed(1)}k fans</div>
            </div>
          </div>
        </div>

        <!-- AI Recommendations -->
        <div style="display:flex;flex-direction:column;gap:var(--space-xl)">
          <div class="ai-card">
            <div class="ai-card-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> AI Sustainability Insight</div>
            <div class="ai-card-title">Water Optimization Opportunity</div>
            <div class="ai-card-text">AI analysis shows restroom water usage in Concourse A is 15% above optimal. Recommend adjusting sensor flush timing from 3.5s to 2.8s. Projected saving: 12,000 liters per match.</div>
          </div>

          <div class="ai-card">
            <div class="ai-card-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> AI Green Engagement</div>
            <div class="ai-card-title">Fan Engagement Boost</div>
            <div class="ai-card-text">Fans who receive the "Green Fan" digital badge spend 23% more at eco-friendly food vendors. Recommend pushing notifications about the reusable cup discount to fans within 100m of food courts.</div>
          </div>

          <div class="card card-accent-teal">
            <div class="card-header">
              <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-trophy"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />  <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />  <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />  <path d="M4 22h16" />  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />  <path d="M6 9H4.5a1 1 0 0 1 0-5H6" /></svg> Green Fan Leaderboard</div>
            </div>
            <div class="card-body">
              ${['1. Section 214 — 94% green transport', '2. Section 108 — 91% green transport', '3. Section 302 — 88% green transport', '4. Section 415 — 85% green transport', '5. Section 120 — 82% green transport'].map(item => `
                <div style="padding:var(--space-sm) 0;font-size:var(--text-sm);border-bottom:1px solid rgba(255,255,255,0.03)">${item}</div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    App.renderIcons(container);
  }

  return { init, renderSustainabilityView };
})();
