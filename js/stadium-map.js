/* ============================================
   StadiumAI 2026 — Stadium Map
   Interactive SVG stadium visualization
   ============================================ */

"use strict";

const StadiumMap = (() => {
  let isInitialized = false;

  function init() {
    renderMapView();
  }

  function renderMapView() {
    const container = document.getElementById('navigation-content');
    if (!container) return;

    const crowdData = StadiumData.getLiveCrowdData();

    container.innerHTML = `
      <div class="welcome-banner">
        <div class="welcome-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-map"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:28px;height:28px">  <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />  <path d="M15 5.764v15" />  <path d="M9 3.236v15" /></svg> AI-Powered Stadium Navigation</div>
        <div class="welcome-subtitle">Get intelligent directions based on real-time crowd density. The AI will route you through the least congested paths to your destination.</div>
      </div>

      <div class="dashboard-grid grid-cols-2-1">
        <!-- Interactive Map -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-building"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <path d="M12 10h.01" />  <path d="M12 14h.01" />  <path d="M12 6h.01" />  <path d="M16 10h.01" />  <path d="M16 14h.01" />  <path d="M16 6h.01" />  <path d="M8 10h.01" />  <path d="M8 14h.01" />  <path d="M8 6h.01" />  <path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />  <rect x="4" y="2" width="16" height="20" rx="2" /></svg> Interactive Stadium Map</div>
            <div class="section-actions">
              <button class="btn btn-sm btn-secondary" onclick="StadiumMap.togglePOI()"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-map-pin"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />  <circle cx="12" cy="10" r="3" /></svg> Toggle POIs</button>
              <button class="btn btn-sm btn-primary" onclick="StadiumMap.findRoute()"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-compass"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="12" cy="12" r="10" />  <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /></svg> Find Route</button>
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
            <div class="ai-card-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:14px;height:14px;display:inline-block;vertical-align:middle">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg> AI Route</div>
            <div class="ai-card-title">Recommended Path to Your Seat</div>
            <div class="ai-card-text">
              Section 214, Row F → Enter via <strong>Gate C (East)</strong><br><br>
              <!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-check-circle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="color:var(--color-success);width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M21.801 10A10 10 0 1 1 17 3.335" />  <path d="m9 11 3 3L22 4" /></svg> 42% less crowded than Gate A<br>
              <!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-clock"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="color:var(--color-text-secondary);width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="12" cy="12" r="10" />  <path d="M12 6v6l4 2" /></svg> Estimated walk: 4 min<br>
              <!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-accessibility"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="color:var(--color-blue);width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="16" cy="4" r="1" />  <path d="m18 19 1-7-6 1" />  <path d="m5 8 3-3 5.5 3-2.36 3.5" />  <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />  <path d="M13.76 17.5a5 5 0 0 0-6.88-6" /></svg> Elevator available at Level 2 junction<br><br>
              <em>Route avoids Concourse A (currently at 87% capacity)</em>
            </div>
          </div>

          <!-- Points of Interest -->
          <div class="card">
            <div class="card-header">
              <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-map-pin"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="display:inline-block;vertical-align:text-bottom;width:20px;height:20px">  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />  <circle cx="12" cy="10" r="3" /></svg> Nearby Points of Interest</div>
            </div>
            <div class="card-body">
              <div class="metric-row">
                <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-pizza"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="m12 14-1 1" />  <path d="m13.75 18.25-1.25 1.42" />  <path d="M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12" />  <path d="M18.8 9.3a1 1 0 0 0 2.1 7.7" />  <path d="M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z" /></svg> Food Court</div>
                <div class="metric-value text-teal">120m</div>
              </div>
              <div class="metric-row">
                <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-user"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg> Restroom</div>
                <div class="metric-value text-teal">45m</div>
              </div>
              <div class="metric-row">
                <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-heart-pulse"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />  <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" /></svg> Medical</div>
                <div class="metric-value text-gold">250m</div>
              </div>
              <div class="metric-row">
                <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-accessibility"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="16" cy="4" r="1" />  <path d="m18 19 1-7-6 1" />  <path d="m5 8 3-3 5.5 3-2.36 3.5" />  <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />  <path d="M13.76 17.5a5 5 0 0 0-6.88-6" /></svg> Elevator</div>
                <div class="metric-value text-teal">80m</div>
              </div>
              <div class="metric-row">
                <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-briefcase"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />  <rect width="20" height="14" x="2" y="6" rx="2" /></svg> Lost & Found</div>
                <div class="metric-value text-gold">310m</div>
              </div>
              <div class="metric-row">
                <div class="metric-label"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-door-open"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <path d="M11 20H2" />  <path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" />  <path d="M11 4H8a2 2 0 0 0-2 2v14" />  <path d="M14 12h.01" />  <path d="M22 20h-3" /></svg> Nearest Exit</div>
                <div class="metric-value text-teal">60m</div>
              </div>
            </div>
          </div>

          <!-- Seat Finder -->
          <div class="card">
            <div class="card-header">
              <div class="card-title"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-armchair"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px;display:inline-block;vertical-align:text-bottom">  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />  <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />  <path d="M5 18v2" />  <path d="M19 18v2" /></svg> Quick Seat Finder</div>
            </div>
            <div class="card-body">
              <input type="text" placeholder="Enter Section-Row-Seat (e.g. 214-F-12)" style="width:100%;margin-bottom:var(--space-md)" aria-label="Enter Section-Row-Seat">
              <button class="btn btn-primary" style="width:100%" onclick="StadiumMap.findRoute()"><!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-compass"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="12" cy="12" r="10" />  <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /></svg> Navigate to Seat</button>
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
      <svg aria-hidden="true" viewBox="0 0 800 500" class="stadium-svg" xmlns="http://www.w3.org/2000/svg">
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
    App.showToast('<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-compass"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:16px;height:16px;display:inline-block;vertical-align:text-bottom">  <circle cx="12" cy="12" r="10" />  <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" /></svg> AI Route Calculated', 'Optimal path via Gate C → Concourse B → Section 214. Estimated time: 4 minutes.', 'success');
  }

  return { init, renderMapView, togglePOI, findRoute };
})();
