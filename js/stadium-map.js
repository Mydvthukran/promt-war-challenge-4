/* ============================================
   StadiumAI 2026 — Stadium Map
   Interactive SVG stadium visualization
   ============================================ */

"use strict";

const StadiumMap = (() => {
  function init() {
    renderMapView();
  }

  function renderMapView() {
    const container = document.getElementById('navigation-content');
    if (!container) return;

    const crowdData = StadiumData.getLiveCrowdData();

    container.innerHTML = `
      <div class="welcome-banner">
        <div class="welcome-title"><i data-lucide="map" style="display:inline-block;vertical-align:text-bottom;width:28px;height:28px"></i> AI-Powered Stadium Navigation</div>
        <div class="welcome-subtitle">Get intelligent directions based on real-time crowd density. The AI will route you through the least congested paths to your destination.</div>
      </div>

      <div class="dashboard-grid grid-cols-2-1">
        <!-- Interactive Map -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><i data-lucide="building" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px"></i> Interactive Stadium Map</div>
            <div class="section-actions">
              <button class="btn btn-sm btn-secondary" onclick="StadiumMap.togglePOI()"><i data-lucide="map-pin" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Toggle POIs</button>
              <button class="btn btn-sm btn-primary" onclick="StadiumMap.findRoute()"><i data-lucide="compass" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Find Route</button>
            </div>
          </div>
          <div class="card-body">
            <div class="stadium-map-container" id="stadium-map-svg-container">
              ${generateStadiumSVG(crowdData)}
            </div>
          </div>
        </div>

        <!-- Navigation Panel -->
        <div style="display:flex;flex-direction:column;gap:var(--space-xl)">
          <!-- AI Route Suggestion -->
          <div class="ai-card">
            <div class="ai-card-label"><i data-lucide="brain" style="width:14px;height:14px;display:inline-block;vertical-align:middle"></i> AI Route</div>
            <div class="ai-card-title">Recommended Path to Your Seat</div>
            <div class="ai-card-text">
              Section 214, Row F → Enter via <strong>Gate C (East)</strong><br><br>
              <i data-lucide="check-circle" style="color:var(--color-success);width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> 42% less crowded than Gate A<br>
              <i data-lucide="clock" style="color:var(--color-text-secondary);width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Estimated walk: 4 min<br>
              <i data-lucide="accessibility" style="color:var(--color-blue);width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Elevator available at Level 2 junction<br><br>
              <em>Route avoids Concourse A (currently at 87% capacity)</em>
            </div>
          </div>

          <!-- Points of Interest -->
          <div class="card">
            <div class="card-header">
              <div class="card-title"><i data-lucide="map-pin" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px"></i> Nearby Points of Interest</div>
            </div>
            <div class="card-body">
              <div class="metric-row">
                <div class="metric-label"><i data-lucide="pizza" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Food Court</div>
                <div class="metric-value text-teal">120m</div>
              </div>
              <div class="metric-row">
                <div class="metric-label"><i data-lucide="user" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Restroom</div>
                <div class="metric-value text-teal">45m</div>
              </div>
              <div class="metric-row">
                <div class="metric-label"><i data-lucide="heart-pulse" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Medical</div>
                <div class="metric-value text-gold">250m</div>
              </div>
              <div class="metric-row">
                <div class="metric-label"><i data-lucide="accessibility" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Elevator</div>
                <div class="metric-value text-teal">80m</div>
              </div>
              <div class="metric-row">
                <div class="metric-label"><i data-lucide="briefcase" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Lost & Found</div>
                <div class="metric-value text-gold">310m</div>
              </div>
              <div class="metric-row">
                <div class="metric-label"><i data-lucide="door-open" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Nearest Exit</div>
                <div class="metric-value text-teal">60m</div>
              </div>
            </div>
          </div>

          <!-- Seat Finder -->
          <div class="card">
            <div class="card-header">
              <div class="card-title"><i data-lucide="armchair" style="width:20px;height:20px;display:inline-block;vertical-align:text-bottom"></i> Quick Seat Finder</div>
            </div>
            <div class="card-body">
              <input type="text" placeholder="Enter Section-Row-Seat (e.g. 214-F-12)" style="width:100%;margin-bottom:var(--space-md)">
              <button class="btn btn-primary" style="width:100%" onclick="StadiumMap.findRoute()"><i data-lucide="compass" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> Navigate to Seat</button>
            </div>
          </div>
        </div>
      </div>
    `;
    App.renderIcons(container);
  }

  function generateStadiumSVG(crowdData) {
    const getColor = (density) => {
      if (density > 90) return StadiumData.THEME.danger;
      if (density > 75) return StadiumData.THEME.red;
      if (density > 50) return StadiumData.THEME.amber;
      return StadiumData.THEME.green;
    };

    const getOpacity = (density) => (0.3 + (density / 100) * 0.5).toFixed(2);

    const zoneData = {};
    crowdData.forEach(z => { zoneData[z.id] = z; });

    return `
      <svg viewBox="0 0 800 500" class="stadium-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pitch-grad" cx="50%" cy="50%">
            <stop offset="0%" style="stop-color:${StadiumData.THEME.teal};stop-opacity:0.15"/>
            <stop offset="100%" style="stop-color:${StadiumData.THEME.teal};stop-opacity:0.03"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Stadium Outer Shell -->
        <ellipse cx="400" cy="250" rx="370" ry="220" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
        <ellipse cx="400" cy="250" rx="350" ry="205" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="30"/>

        <!-- Seating Zones -->
        <!-- North Stand -->
        <path d="M 200,65 Q 400,15 600,65 L 580,110 Q 400,65 220,110 Z" 
              fill="${getColor(zoneData.north?.currentDensity || 50)}" opacity="${getOpacity(zoneData.north?.currentDensity || 50)}" 
              stroke="rgba(255,255,255,0.1)" stroke-width="1" class="zone-hover" data-zone="north"/>
        <text x="400" y="80" text-anchor="middle" fill="white" font-size="11" font-family="Inter" font-weight="600">NORTH STAND</text>
        <text x="400" y="95" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10" font-family="Outfit" font-weight="800">${zoneData.north?.currentDensity || 0}%</text>

        <!-- South Stand -->
        <path d="M 200,435 Q 400,485 600,435 L 580,390 Q 400,435 220,390 Z" 
              fill="${getColor(zoneData.south?.currentDensity || 50)}" opacity="${getOpacity(zoneData.south?.currentDensity || 50)}"
              stroke="rgba(255,255,255,0.1)" stroke-width="1" class="zone-hover" data-zone="south"/>
        <text x="400" y="430" text-anchor="middle" fill="white" font-size="11" font-family="Inter" font-weight="600">SOUTH STAND</text>
        <text x="400" y="445" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10" font-family="Outfit" font-weight="800">${zoneData.south?.currentDensity || 0}%</text>

        <!-- East Wing -->
        <path d="M 640,100 Q 720,250 640,400 L 600,375 Q 670,250 600,125 Z" 
              fill="${getColor(zoneData.east?.currentDensity || 50)}" opacity="${getOpacity(zoneData.east?.currentDensity || 50)}"
              stroke="rgba(255,255,255,0.1)" stroke-width="1" class="zone-hover" data-zone="east"/>
        <text x="665" y="245" text-anchor="middle" fill="white" font-size="10" font-family="Inter" font-weight="600" transform="rotate(90,665,245)">EAST WING</text>
        <text x="665" y="265" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10" font-family="Outfit" font-weight="800">${zoneData.east?.currentDensity || 0}%</text>

        <!-- West Wing -->
        <path d="M 160,100 Q 80,250 160,400 L 200,375 Q 130,250 200,125 Z" 
              fill="${getColor(zoneData.west?.currentDensity || 50)}" opacity="${getOpacity(zoneData.west?.currentDensity || 50)}"
              stroke="rgba(255,255,255,0.1)" stroke-width="1" class="zone-hover" data-zone="west"/>
        <text x="138" y="245" text-anchor="middle" fill="white" font-size="10" font-family="Inter" font-weight="600" transform="rotate(-90,138,245)">WEST WING</text>
        <text x="138" y="265" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="10" font-family="Outfit" font-weight="800">${zoneData.west?.currentDensity || 0}%</text>

        <!-- Pitch -->
        <ellipse cx="400" cy="250" rx="155" ry="110" fill="url(#pitch-grad)" stroke="rgba(0,212,170,0.3)" stroke-width="1.5"/>
        <!-- Pitch lines -->
        <line x1="400" y1="140" x2="400" y2="360" stroke="rgba(0,212,170,0.2)" stroke-width="1"/>
        <circle cx="400" cy="250" r="30" fill="none" stroke="rgba(0,212,170,0.2)" stroke-width="1"/>
        <circle cx="400" cy="250" r="3" fill="rgba(0,212,170,0.5)"/>
        <text x="400" y="254" text-anchor="middle" fill="rgba(0,212,170,0.4)" font-size="12" font-family="Inter" font-weight="600">PITCH</text>

        <!-- VIP -->
        <rect x="520" y="115" width="65" height="40" rx="6" 
              fill="${getColor(zoneData.vip?.currentDensity || 50)}" opacity="${getOpacity(zoneData.vip?.currentDensity || 50)}"
              stroke="rgba(255,184,0,0.3)" stroke-width="1"/>
        <text x="552" y="137" text-anchor="middle" fill="white" font-size="9" font-family="Inter" font-weight="600">VIP</text>
        <text x="552" y="149" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="8" font-family="Outfit" font-weight="800">${zoneData.vip?.currentDensity || 0}%</text>

        <!-- POI Markers -->
        <g filter="url(#glow)" id="poi-markers">
          <!-- Food -->
          <circle cx="500" cy="400" r="10" fill="rgba(255,184,0,0.9)"/>
          <text x="500" y="404" text-anchor="middle" fill="white" font-size="10" font-family="Inter" font-weight="bold">F</text>
          <text x="500" y="420" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="8" font-family="Inter">Food</text>

          <!-- Medical -->
          <circle cx="200" cy="80" r="10" fill="rgba(255,51,102,0.9)"/>
          <text x="200" y="84" text-anchor="middle" fill="white" font-size="10" font-family="Inter" font-weight="bold">+</text>
          <text x="200" y="100" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="8" font-family="Inter">Medical</text>

          <!-- Restroom -->
          <circle cx="300" cy="400" r="10" fill="rgba(59,130,246,0.9)"/>
          <text x="300" y="404" text-anchor="middle" fill="white" font-size="10" font-family="Inter" font-weight="bold">W</text>
          <text x="300" y="420" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="8" font-family="Inter">WC</text>

          <!-- Exit -->
          <circle cx="400" cy="475" r="10" fill="rgba(16,185,129,0.9)"/>
          <text x="400" y="479" text-anchor="middle" fill="white" font-size="10" font-family="Inter" font-weight="bold">E</text>
          <text x="400" y="493" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="8" font-family="Inter">Main Exit</text>

          <!-- Accessibility -->
          <circle cx="640" cy="300" r="10" fill="rgba(168,85,247,0.9)"/>
          <text x="640" y="304" text-anchor="middle" fill="white" font-size="10" font-family="Inter" font-weight="bold">A</text>
          <text x="640" y="320" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="8" font-family="Inter">Access</text>

          <!-- Info -->
          <circle cx="250" cy="310" r="10" fill="rgba(0,212,170,0.9)"/>
          <text x="250" y="314" text-anchor="middle" fill="white" font-size="10" font-family="Inter" font-weight="bold">i</text>
          <text x="250" y="330" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="8" font-family="Inter">Info</text>
        </g>

        <!-- Gate Labels -->
        <text x="400" y="20" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="10" font-family="Inter" font-weight="600">GATE A (NORTH)</text>
        <text x="400" y="498" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="10" font-family="Inter" font-weight="600">GATE B (SOUTH)</text>
        <text x="760" y="254" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="10" font-family="Inter" font-weight="600" transform="rotate(90,760,254)">GATE C (EAST)</text>
        <text x="40" y="254" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="10" font-family="Inter" font-weight="600" transform="rotate(-90,40,254)">GATE D (WEST)</text>

      </svg>
    `;
  }

  function togglePOI() {
    const markers = document.getElementById('poi-markers');
    if (markers) {
      markers.style.display = markers.style.display === 'none' ? 'block' : 'none';
    }
  }

  function findRoute() {
    // Show AI route toast
    App.showToast('<i data-lucide="compass" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom"></i> AI Route Calculated', 'Optimal path via Gate C → Concourse B → Section 214. Estimated time: 4 minutes.', 'success');
  }

  return { init, renderMapView, togglePOI, findRoute };
})();
