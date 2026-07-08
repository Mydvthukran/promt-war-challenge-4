/* ============================================
   StadiumAI 2026 — Sustainability Tracker
   Environmental impact monitoring & AI insights
   ============================================ */

const Sustainability = (() => {
  function init() {
    renderSustainabilityView();
  }

  function renderSustainabilityView() {
    const container = document.getElementById('sustainability-content');
    if (!container) return;

    const data = StadiumData.getLiveSustainabilityData();

    container.innerHTML = `
      <div class="welcome-banner" style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(0,212,170,0.1));border-color:rgba(16,185,129,0.15)">
        <div class="welcome-title"><i data-lucide="leaf" style="display:inline-block;vertical-align:text-bottom;width:28px;height:28px"></i> Sustainability Dashboard</div>
        <div class="welcome-subtitle">Tracking environmental impact in real-time. FIFA World Cup 2026 aims to set new standards for sustainable mega-events.</div>
      </div>

      <!-- Overall Score + Key Metrics -->
      <div class="dashboard-grid grid-cols-2-1" style="margin-bottom:var(--space-xl)">
        <div class="dashboard-grid grid-cols-3">
          <div class="card card-accent-teal">
            <div class="stat-widget">
              <div class="stat-icon teal"><i data-lucide="recycle"></i></div>
              <div class="stat-value">${data.wasteDiverted.toFixed(1)}%</div>
              <div class="stat-label">Waste Diverted</div>
              <span class="stat-change positive">↑ 3.2% vs target</span>
            </div>
          </div>
          <div class="card card-accent-gold">
            <div class="stat-widget">
              <div class="stat-icon gold"><i data-lucide="zap"></i></div>
              <div class="stat-value">${data.renewableEnergy.toFixed(0)}%</div>
              <div class="stat-label">Renewable Energy</div>
              <span class="stat-change positive">↑ Solar + Wind</span>
            </div>
          </div>
          <div class="card card-accent-blue">
            <div class="stat-widget">
              <div class="stat-icon blue"><i data-lucide="droplet"></i></div>
              <div class="stat-value">${data.waterRecycled.toFixed(0)}%</div>
              <div class="stat-label">Water Recycled</div>
              <span class="stat-change positive">↑ 5% vs 2022</span>
            </div>
          </div>
          <div class="card">
            <div class="stat-widget">
              <div class="stat-icon purple"><i data-lucide="globe"></i></div>
              <div class="stat-value">${data.carbonOffset.toFixed(0)}%</div>
              <div class="stat-label">Carbon Offset</div>
              <span class="stat-change positive">On track</span>
            </div>
          </div>
          <div class="card">
            <div class="stat-widget">
              <div class="stat-icon teal"><i data-lucide="coffee"></i></div>
              <div class="stat-value">${data.plasticReduced}%</div>
              <div class="stat-label">Plastic Reduction</div>
              <span class="stat-change positive">vs 2022 baseline</span>
            </div>
          </div>
          <div class="card">
            <div class="stat-widget">
              <div class="stat-icon orange"><i data-lucide="utensils"></i></div>
              <div class="stat-value">${data.foodWaste.toFixed(1)}%</div>
              <div class="stat-label">Food Waste Rate</div>
              <span class="stat-change ${data.foodWaste < 10 ? 'positive' : 'negative'}">${data.foodWaste < 10 ? '<i data-lucide="check-circle" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom"></i> Below target' : '<i data-lucide="alert-triangle" style="width:12px;height:12px;display:inline-block;vertical-align:text-bottom"></i> Above target'}</span>
            </div>
          </div>
        </div>

        <!-- Eco Score Ring -->
        <div class="card" style="display:flex;flex-direction:column;align-items:center;justify-content:center">
          <div class="eco-score">
            <div class="eco-score-ring">
              <svg width="160" height="160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="12"/>
                <circle cx="80" cy="80" r="70" fill="none" stroke="url(#eco-gradient)" stroke-width="12" stroke-linecap="round"
                        stroke-dasharray="${2 * Math.PI * 70}" stroke-dashoffset="${2 * Math.PI * 70 * (1 - data.overallScore / 100)}"
                        transform="rotate(-90, 80, 80)"/>
                <defs>
                  <linearGradient id="eco-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#10B981"/>
                    <stop offset="100%" style="stop-color:#00D4AA"/>
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
            <div class="card-title"><i data-lucide="bar-chart-2" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px"></i> Detailed Metrics</div>
          </div>
          <div class="card-body">
            <div class="metric-row">
              <div class="metric-label"><i data-lucide="trash-2" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Waste Generated</div>
              <div class="metric-value">${(data.wasteGenerated / 1000).toFixed(1)}t</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><i data-lucide="recycle" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Recycled / Composted</div>
              <div class="metric-value text-teal">${(data.wasteGenerated * data.wasteDiverted / 100000).toFixed(1)}t</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><i data-lucide="zap" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Energy Consumed</div>
              <div class="metric-value">${(data.energyUsed / 1000).toFixed(1)} MWh</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><i data-lucide="sun" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> From Renewables</div>
              <div class="metric-value text-gold">${(data.energyUsed * data.renewableEnergy / 100000).toFixed(1)} MWh</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><i data-lucide="droplet" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Water Used</div>
              <div class="metric-value">${(data.waterUsed / 1000).toFixed(0)}k L</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><i data-lucide="refresh-cw" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Water Recycled</div>
              <div class="metric-value text-blue">${(data.waterUsed * data.waterRecycled / 100000).toFixed(0)}k L</div>
            </div>
            <div class="metric-row">
              <div class="metric-label"><i data-lucide="globe" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Fan Green Transport</div>
              <div class="metric-value text-teal">${(data.fanGreenActions / 1000).toFixed(1)}k fans</div>
            </div>
          </div>
        </div>

        <!-- AI Recommendations -->
        <div style="display:flex;flex-direction:column;gap:var(--space-xl)">
          <div class="ai-card">
            <div class="ai-card-label"><i data-lucide="brain" style="width:14px;height:14px;display:inline-block;vertical-align:middle"></i> AI Sustainability Insight</div>
            <div class="ai-card-title">Water Optimization Opportunity</div>
            <div class="ai-card-text">AI analysis shows restroom water usage in Concourse A is 15% above optimal. Recommend adjusting sensor flush timing from 3.5s to 2.8s. Projected saving: 12,000 liters per match.</div>
          </div>

          <div class="ai-card">
            <div class="ai-card-label"><i data-lucide="brain" style="width:14px;height:14px;display:inline-block;vertical-align:middle"></i> AI Green Engagement</div>
            <div class="ai-card-title">Fan Engagement Boost</div>
            <div class="ai-card-text">Fans who receive the "Green Fan" digital badge spend 23% more at eco-friendly food vendors. Recommend pushing notifications about the reusable cup discount to fans within 100m of food courts.</div>
          </div>

          <div class="card card-accent-teal">
            <div class="card-header">
              <div class="card-title"><i data-lucide="trophy" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px"></i> Green Fan Leaderboard</div>
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
    if (window.lucide) lucide.createIcons();
  }

  return { init, renderSustainabilityView };
})();
