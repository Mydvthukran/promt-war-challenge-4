/* ============================================
   StadiumAI 2026 — Data & Mock Backend
   ============================================ */

"use strict";

const StadiumData = (() => {
  const THEME = {
    teal: '#00D4AA',
    gold: '#FFB800',
    red: '#FF3366',
    blue: '#3B82F6',
    purple: '#A855F7',
    orange: '#F97316',
    green: '#10B981',
    amber: '#F59E0B',
    danger: '#EF4444',
    bgSecondary: '#0A1628'
  };

  // ── FIFA World Cup 2026 Venues ──
  const venues = [
    { id: 'metlife', name: 'MetLife Stadium', city: 'New York/New Jersey', capacity: 82500, country: '🇺🇸' },
    { id: 'rosebowl', name: 'Rose Bowl', city: 'Los Angeles', capacity: 88432, country: '🇺🇸' },
    { id: 'att', name: 'AT&T Stadium', city: 'Dallas', capacity: 80000, country: '🇺🇸' },
    { id: 'sofi', name: 'SoFi Stadium', city: 'Inglewood', capacity: 70240, country: '🇺🇸' },
    { id: 'hard_rock', name: 'Hard Rock Stadium', city: 'Miami', capacity: 64767, country: '🇺🇸' },
    { id: 'lincoln', name: 'Lincoln Financial Field', city: 'Philadelphia', capacity: 69176, country: '🇺🇸' },
    { id: 'lumen', name: 'Lumen Field', city: 'Seattle', capacity: 68740, country: '🇺🇸' },
    { id: 'levis', name: "Levi's Stadium", city: 'San Francisco', capacity: 68500, country: '🇺🇸' },
    { id: 'nrg', name: 'NRG Stadium', city: 'Houston', capacity: 72220, country: '🇺🇸' },
    { id: 'arrowhead', name: 'GEHA Field at Arrowhead', city: 'Kansas City', capacity: 76416, country: '🇺🇸' },
    { id: 'mercedes', name: 'Mercedes-Benz Stadium', city: 'Atlanta', capacity: 71000, country: '🇺🇸' },
    { id: 'azteca', name: 'Estadio Azteca', city: 'Mexico City', capacity: 87523, country: '🇲🇽' },
    { id: 'akron', name: 'Estadio Akron', city: 'Guadalajara', capacity: 49850, country: '🇲🇽' },
    { id: 'monterrey', name: 'Estadio BBVA', city: 'Monterrey', capacity: 53500, country: '🇲🇽' },
    { id: 'bmo', name: 'BMO Field', city: 'Toronto', capacity: 45736, country: '🇨🇦' },
    { id: 'bc_place', name: 'BC Place', city: 'Vancouver', capacity: 54500, country: '🇨🇦' },
  ];

  // ── Match Schedule (sample matches around current date July 8, 2026) ──
  const matches = [
    { id: 'm1', team1: 'Brazil', flag1: '🇧🇷', team2: 'Germany', flag2: '🇩🇪', date: '2026-07-08', time: '18:00', venue: 'metlife', stage: 'Quarter-Final', status: 'live' },
    { id: 'm2', team1: 'Argentina', flag1: '🇦🇷', team2: 'France', flag2: '🇫🇷', date: '2026-07-08', time: '21:00', venue: 'att', stage: 'Quarter-Final', status: 'upcoming' },
    { id: 'm3', team1: 'Spain', flag1: '🇪🇸', team2: 'England', flag2: '🏴\u200d☠️', date: '2026-07-09', time: '18:00', venue: 'rosebowl', stage: 'Quarter-Final', status: 'upcoming' },
    { id: 'm4', team1: 'Portugal', flag1: '🇵🇹', team2: 'Netherlands', flag2: '🇳🇱', date: '2026-07-09', time: '21:00', venue: 'hard_rock', stage: 'Quarter-Final', status: 'upcoming' },
    { id: 'm5', team1: 'USA', flag1: '🇺🇸', team2: 'Mexico', flag2: '🇲🇽', date: '2026-07-07', time: '20:00', venue: 'sofi', stage: 'Round of 16', status: 'completed', score: '2 - 1' },
    { id: 'm6', team1: 'Japan', flag1: '🇯🇵', team2: 'South Korea', flag2: '🇰🇷', date: '2026-07-07', time: '16:00', venue: 'lumen', stage: 'Round of 16', status: 'completed', score: '1 - 3' },
  ];

  // ── Stadium Zones ──
  const zones = [
    { id: 'north', name: 'North Stand', type: 'seating', maxCapacity: 18000 },
    { id: 'south', name: 'South Stand', type: 'seating', maxCapacity: 18000 },
    { id: 'east', name: 'East Wing', type: 'seating', maxCapacity: 15000 },
    { id: 'west', name: 'West Wing', type: 'seating', maxCapacity: 15000 },
    { id: 'vip', name: 'VIP Lounge', type: 'premium', maxCapacity: 3000 },
    { id: 'concourseA', name: 'Concourse A', type: 'concourse', maxCapacity: 5000 },
    { id: 'concourseB', name: 'Concourse B', type: 'concourse', maxCapacity: 5000 },
    { id: 'fanzone', name: 'Fan Zone', type: 'entertainment', maxCapacity: 8000 },
    { id: 'food_court', name: 'Food Court', type: 'services', maxCapacity: 4000 },
    { id: 'gate_main', name: 'Main Gate', type: 'entry', maxCapacity: 6000 },
    { id: 'gate_north', name: 'North Gate', type: 'entry', maxCapacity: 4000 },
    { id: 'gate_south', name: 'South Gate', type: 'entry', maxCapacity: 4000 },
  ];

  // ── Transport Options ──
  const transportModes = [
    { id: 'metro', name: 'Metro / Subway', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-train"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <rect width="16" height="16" x="4" y="3" rx="2" />  <path d="M4 11h16" />  <path d="M12 3v8" />  <path d="m8 19-2 3" />  <path d="m18 22-2-3" />  <path d="M8 15h.01" />  <path d="M16 15h.01" /></svg>', color: '#3B82F6', avgTime: 25, carbonPerKm: 0.041 },
    { id: 'bus', name: 'Shuttle Bus', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-bus"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <path d="M8 6v6" />  <path d="M15 6v6" />  <path d="M2 12h19.6" />  <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />  <circle cx="7" cy="18" r="2" />  <path d="M9 18h5" />  <circle cx="16" cy="18" r="2" /></svg>', color: '#10B981', avgTime: 35, carbonPerKm: 0.089 },
    { id: 'rideshare', name: 'Rideshare', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-car"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />  <circle cx="7" cy="17" r="2" />  <path d="M9 17h6" />  <circle cx="17" cy="17" r="2" /></svg>', color: '#F59E0B', avgTime: 20, carbonPerKm: 0.192 },
    { id: 'bicycle', name: 'Bike Share', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-bike"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <circle cx="18.5" cy="17.5" r="3.5" />  <circle cx="5.5" cy="17.5" r="3.5" />  <circle cx="15" cy="5" r="1" />  <path d="M12 17.5V14l-3-3 4-3 2 3h2" /></svg>', color: '#00D4AA', avgTime: 40, carbonPerKm: 0.0 },
    { id: 'walk', name: 'Walking', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-footprints"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />  <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />  <path d="M16 17h4" />  <path d="M4 13h4" /></svg>', color: '#A855F7', avgTime: 55, carbonPerKm: 0.0 },
    { id: 'parking', name: 'Self Drive', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-parking-circle"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <circle cx="12" cy="12" r="10" />  <path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></svg>', color: '#FF3366', avgTime: 15, carbonPerKm: 0.210 },
  ];

  // ── Accessibility Services ──
  const accessibilityServices = [
    { id: 'wheelchair', name: 'Wheelchair Accessible Seating', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-accessibility"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <circle cx="16" cy="4" r="1" />  <path d="m18 19 1-7-6 1" />  <path d="m5 8 3-3 5.5 3-2.36 3.5" />  <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />  <path d="M13.76 17.5a5 5 0 0 0-6.88-6" /></svg>', status: 'available', count: 450, description: 'Designated wheelchair spaces with companion seating across all levels' },
    { id: 'sensory', name: 'Sensory Rooms', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-brain"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <path d="M12 18V5" />  <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />  <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />  <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />  <path d="M18 18a4 4 0 0 0 2-7.464" />  <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />  <path d="M6 18a4 4 0 0 1-2-7.464" />  <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" /></svg>', status: 'available', count: 4, description: 'Quiet, low-stimulation rooms for neurodivergent fans and those with sensory needs' },
    { id: 'audio_desc', name: 'Audio Description', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-headphones"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /></svg>', status: 'active', count: null, description: 'Live audio description of match action for visually impaired fans' },
    { id: 'sign_lang', name: 'Sign Language Services', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-hand-metal"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <path d="M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" />  <path d="M14 11V9a2 2 0 1 0-4 0v2" />  <path d="M10 10.5V5a2 2 0 1 0-4 0v9" />  <path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5" /></svg>', status: 'available', count: 8, description: 'Sign language interpreters at key service points and info desks' },
    { id: 'mobility', name: 'Mobility Assistance', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-accessibility"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <circle cx="16" cy="4" r="1" />  <path d="m18 19 1-7-6 1" />  <path d="m5 8 3-3 5.5 3-2.36 3.5" />  <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />  <path d="M13.76 17.5a5 5 0 0 0-6.88-6" /></svg>', status: 'available', count: 30, description: 'Electric carts and volunteer escorts for mobility-impaired fans' },
    { id: 'guide_dogs', name: 'Guide Dog Relief', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-dog"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <path d="M11.25 16.25h1.5L12 17z" />  <path d="M16 14v.5" />  <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309" />  <path d="M8 14v.5" />  <path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" /></svg>', status: 'available', count: 3, description: 'Designated relief areas for service animals with water stations' },
    { id: 'braille', name: 'Braille & Tactile Maps', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-clipboard"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /></svg>', status: 'available', count: 12, description: 'Tactile stadium maps and braille information at entry points' },
    { id: 'hearing_loop', name: 'Hearing Loop System', icon: '<!-- @license lucide-static v1.23.0 - ISC --><svg aria-hidden="true"  class="lucide lucide-ear"  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round" style="width:20px;height:20px">  <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />  <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" /></svg>', status: 'active', count: null, description: 'Induction loop system in main stands for hearing aid users' },
  ];

  // ── Sustainability Metrics ──
  const sustainabilityBaseline = {
    wasteGenerated: 12500,   // kg per match
    wasteDiverted: 78,       // percentage recycled/composted
    energyUsed: 45000,       // kWh per match
    renewableEnergy: 62,     // percentage from renewable
    waterUsed: 380000,       // liters per match
    waterRecycled: 45,       // percentage
    carbonOffset: 85,        // percentage
    fanGreenActions: 34200,  // fans who chose green transport
    plasticReduced: 92,      // percentage reduction vs 2022
    foodWaste: 8,            // percentage of food wasted
  };

  // ── AI Chatbot Responses (Multilingual) ──
  const chatResponses = {
    en: {
      greeting: "👋 Welcome to StadiumAI! I'm your AI assistant for FIFA World Cup 2026. How can I help you today?",
      navigation: "🗺️ I can help you navigate the stadium! Which destination would you like directions to?\n\n• 🍔 Food Court (Concourse B, Level 2)\n• 🚻 Nearest Restroom (50m, Gate C)\n• 🏥 Medical Center (North Gate)\n• 🎒 Lost & Found (Main Entrance)\n• ♿ Accessible Routes Available",
      match_info: "⚽ **Today's Match:**\n🇧🇷 Brazil vs Germany 🇩🇪\n📍 MetLife Stadium, New York\n🕕 6:00 PM ET | Quarter-Final\n🏟️ Attendance: ~78,000\n\n🔥 This is a rematch of the iconic 2014 semi-final!",
      food: "🍽️ **Food Options Near You:**\n\n1. 🌮 *Taco Fiesta* — Gate B, Level 1 (5 min wait)\n2. 🍔 *Stadium Burger* — Concourse A (8 min wait)\n3. 🍕 *Pizza Arena* — Section 112 (3 min wait)\n4. 🥗 *Green Bowl* — VIP Level (no wait)\n5. 🍺 *Craft Beer Stand* — Gate D (12 min wait)\n\n💡 AI Tip: Pizza Arena has the shortest wait right now!",
      transport: "🚗 **Getting Home After the Match:**\n\nBased on crowd predictions, here's my advice:\n\n🟢 **Leave at 85th min** — Metro wait: ~8 min\n🟡 **Leave at full-time** — Metro wait: ~25 min\n🔴 **Leave 15 min after** — Metro wait: ~45 min\n\n💡 I recommend the NJ Transit train from Meadowlands station. Next departure: 8 min after final whistle.",
      accessibility: "♿ **Accessibility Services:**\n\nI can help you find:\n• Wheelchair-accessible seating & routes\n• Sensory quiet rooms (Level 3, Section 201)\n• Audio description headsets (Info Desk)\n• Sign language interpreters\n• Mobility assistance carts\n\nWould you like me to plan an accessible route to your seat?",
      emergency: "🚨 **Emergency Information:**\n\n📞 Stadium Emergency: Dial 555-WC26\n🏥 Medical stations: Gates A, C, E (Level 1)\n👮 Security: Every gate entrance\n🚪 Emergency exits: Clearly marked green signs\n\n⚠️ If you need immediate help, text your location to me and I'll alert nearest staff.",
      sustainability: "🌱 **Green Fan Tips:**\n\n♻️ Use designated recycling bins (blue & green)\n🚇 Take public transit — save 4.2kg CO₂ vs driving\n🥤 Bring your reusable cup — get $2 discount\n🌿 Join the Fan Green Challenge on the stadium app\n\n🏆 This World Cup aims to be the most sustainable ever!",
      weather: "🌤️ **Weather Update:**\n\nCurrent: 24°C (75°F) — Partly Cloudy\nMatch time: 22°C (72°F) — Clear\nHumidity: 58%\nWind: 12 km/h NW\n\n☀️ Sunscreen recommended for early arrivals. Shaded areas in Sections 300-340.",
      fallback: "🤔 I'm not sure I understood that. Here's what I can help with:\n\n🗺️ Stadium Navigation\n⚽ Match Information\n🍽️ Food & Dining\n🚗 Transportation\n♿ Accessibility\n🌱 Sustainability\n🚨 Emergency Help\n🌤️ Weather\n\nJust ask me anything!"
    },
    es: {
      greeting: "👋 ¡Bienvenido a StadiumAI! Soy tu asistente de IA para la Copa Mundial FIFA 2026. ¿Cómo puedo ayudarte?",
      navigation: "🗺️ ¡Puedo ayudarte a navegar el estadio! ¿A dónde te gustaría ir?\n\n• 🍔 Patio de Comidas (Pasillo B, Nivel 2)\n• 🚻 Baño más cercano (50m, Puerta C)\n• 🏥 Centro Médico (Puerta Norte)\n• ♿ Rutas Accesibles Disponibles",
      match_info: "⚽ **Partido de Hoy:**\n🇧🇷 Brasil vs Alemania 🇩🇪\n📍 MetLife Stadium, Nueva York\n🕕 6:00 PM ET | Cuartos de Final\n\n🔥 ¡Revancha del icónico semifinal de 2014!",
      food: "🍽️ **Opciones de comida cerca:**\n\n1. 🌮 *Taco Fiesta* — Puerta B (5 min de espera)\n2. 🍔 *Stadium Burger* — Pasillo A (8 min)\n3. 🍕 *Pizza Arena* — Sección 112 (3 min)\n\n💡 ¡Pizza Arena tiene la espera más corta ahora!",
      fallback: "🤔 No estoy seguro de haber entendido. Puedo ayudarte con:\n\n🗺️ Navegación\n⚽ Información del Partido\n🍽️ Comida\n🚗 Transporte\n♿ Accesibilidad\n🌱 Sostenibilidad"
    },
    fr: {
      greeting: "👋 Bienvenue sur StadiumAI ! Je suis votre assistant IA pour la Coupe du Monde FIFA 2026. Comment puis-je vous aider ?",
      match_info: "⚽ **Match d'aujourd'hui :**\n🇧🇷 Brésil vs Allemagne 🇩🇪\n📍 MetLife Stadium, New York\n🕕 18h00 ET | Quart de finale\n\n🔥 Revanche de l'iconique demi-finale de 2014 !",
      fallback: "🤔 Je ne suis pas sûr d'avoir compris. Je peux vous aider avec :\n\n🗺️ Navigation\n⚽ Infos Match\n🍽️ Restauration\n🚗 Transport\n♿ Accessibilité"
    },
    ar: {
      greeting: "👋 مرحباً بك في StadiumAI! أنا مساعدك الذكي لكأس العالم FIFA 2026. كيف يمكنني مساعدتك؟",
      match_info: "⚽ **مباراة اليوم:**\n🇧🇷 البرازيل ضد ألمانيا 🇩🇪\n📍 ملعب ميتلايف، نيويورك\n🕕 6:00 مساءً | ربع النهائي",
      fallback: "🤔 لم أفهم ذلك. يمكنني مساعدتك في:\n\n🗺️ التنقل\n⚽ معلومات المباراة\n🍽️ الطعام\n🚗 النقل\n♿ إمكانية الوصول"
    },
    pt: {
      greeting: "👋 Bem-vindo ao StadiumAI! Sou seu assistente de IA para a Copa do Mundo FIFA 2026. Como posso ajudar?",
      match_info: "⚽ **Jogo de Hoje:**\n🇧🇷 Brasil vs Alemanha 🇩🇪\n📍 MetLife Stadium, Nova York\n🕕 18:00 ET | Quartas de Final",
      fallback: "🤔 Não entendi. Posso ajudar com:\n\n🗺️ Navegação\n⚽ Info do Jogo\n🍽️ Alimentação\n🚗 Transporte\n♿ Acessibilidade"
    },
    de: {
      greeting: "👋 Willkommen bei StadiumAI! Ich bin Ihr KI-Assistent für die FIFA WM 2026. Wie kann ich helfen?",
      match_info: "⚽ **Heutiges Spiel:**\n🇧🇷 Brasilien vs Deutschland 🇩🇪\n📍 MetLife Stadium, New York\n🕕 18:00 ET | Viertelfinale",
      fallback: "🤔 Das habe ich nicht verstanden. Ich kann helfen mit:\n\n🗺️ Navigation\n⚽ Spielinfo\n🍽️ Essen\n🚗 Transport\n♿ Barrierefreiheit"
    },
    ja: {
      greeting: "👋 StadiumAIへようこそ！FIFA ワールドカップ 2026のAIアシスタントです。何かお手伝いできますか？",
      match_info: "⚽ **本日の試合:**\n🇧🇷 ブラジル vs ドイツ 🇩🇪\n📍 メットライフスタジアム、ニューヨーク\n🕕 18:00 ET | 準々決勝",
      fallback: "🤔 すみません、理解できませんでした。以下のことでお手伝いできます:\n\n🗺️ ナビゲーション\n⚽ 試合情報\n🍽️ 食事\n🚗 交通\n♿ アクセシビリティ"
    },
    hi: {
      greeting: "👋 StadiumAI में आपका स्वागत है! मैं FIFA विश्व कप 2026 के लिए आपका AI सहायक हूं। मैं कैसे मदद कर सकता हूं?",
      match_info: "⚽ **आज का मैच:**\n🇧🇷 ब्राज़ील बनाम जर्मनी 🇩🇪\n📍 मेटलाइफ स्टेडियम, न्यूयॉर्क\n🕕 शाम 6:00 ET | क्वार्टर-फ़ाइनल",
      fallback: "🤔 मैं समझ नहीं पाया। मैं इनमें मदद कर सकता हूं:\n\n🗺️ नेविगेशन\n⚽ मैच जानकारी\n🍽️ खाना\n🚗 परिवहन\n♿ सुलभता"
    }
  };

  // ── AI keyword matching for chatbot ──
  const intentKeywords = {
    navigation: ['navigate', 'directions', 'find', 'where', 'map', 'route', 'way', 'how to get', 'location', 'go to', 'seat', 'section', 'dónde', 'cómo llego', 'navegar'],
    match_info: ['match', 'game', 'score', 'team', 'play', 'kick off', 'kickoff', 'lineup', 'who is playing', 'partido', 'juego', 'match', '試合', 'مباراة', 'मैच'],
    food: ['food', 'eat', 'restaurant', 'drink', 'beer', 'burger', 'pizza', 'hungry', 'thirsty', 'snack', 'comida', 'comer', 'beber'],
    transport: ['transport', 'metro', 'bus', 'taxi', 'uber', 'parking', 'car', 'train', 'ride', 'home', 'leave', 'depart', 'transporte', 'tren'],
    accessibility: ['accessible', 'wheelchair', 'disability', 'blind', 'deaf', 'sensory', 'mobility', 'hearing', 'accesible', 'discapacidad'],
    emergency: ['emergency', 'help', 'medical', 'police', 'lost', 'stolen', 'hurt', 'injury', 'first aid', 'emergencia', 'ayuda'],
    sustainability: ['green', 'recycle', 'sustainable', 'environment', 'carbon', 'eco', 'waste', 'sostenible', 'reciclaje'],
    weather: ['weather', 'rain', 'temperature', 'hot', 'cold', 'sun', 'forecast', 'clima', 'lluvia', 'temperatura']
  };

  // ── Operational AI Insights ──
  const aiInsights = [
    {
      severity: 'warning',
      title: 'Crowd Density Alert — North Stand',
      message: 'AI predicts North Stand concourse will reach 92% capacity in 15 minutes. Recommend opening auxiliary corridors and deploying 4 additional stewards.',
      action: 'Deploy Resources',
      time: '2 min ago'
    },
    {
      severity: 'info',
      title: 'Optimal Egress Strategy Generated',
      message: 'Based on current crowd distribution and transport schedules, AI recommends staggered exit protocol: East gates first at 88th minute, followed by North/South at final whistle.',
      action: 'Review Plan',
      time: '5 min ago'
    },
    {
      severity: 'success',
      title: 'Waste Diversion Target Exceeded',
      message: 'Current waste diversion rate is 82%, exceeding the 75% target. Recycling stations in Concourse B performing 23% above average.',
      action: 'View Details',
      time: '8 min ago'
    },
    {
      severity: 'warning',
      title: 'Weather-Adjusted Staffing',
      message: 'Temperature dropping to 18°C post-match. AI suggests pre-positioning hot beverage carts at Gates C and E, and activating additional covered waiting areas.',
      action: 'Approve Adjustment',
      time: '12 min ago'
    },
    {
      severity: 'danger',
      title: 'Anomaly Detected — Gate D Queue',
      message: 'Unusual queue buildup at Gate D (3x normal). Possible scanner malfunction or security incident. Nearest available response team: Unit 7 (120m away).',
      action: 'Dispatch Team',
      time: '1 min ago'
    },
    {
      severity: 'info',
      title: 'Post-Match Transport Optimization',
      message: 'AI has coordinated with NJ Transit to add 3 extra trains at Meadowlands. Expected to reduce post-match wait times by 40%. Rideshare surge pricing expected: recommend directing fans to metro.',
      action: 'View Schedule',
      time: '15 min ago'
    }
  ];

  // ── Volunteer Tasks ──
  const volunteerTasks = [
    { id: 't1', title: 'Assist Wheelchair Users at Gate A', priority: 'high', zone: 'gate_main', status: 'active', assignee: 'You', eta: '10 min' },
    { id: 't2', title: 'Distribute Fan Guides — Section 200', priority: 'medium', zone: 'east', status: 'pending', assignee: 'Unassigned', eta: '30 min' },
    { id: 't3', title: 'Crowd Flow Monitoring — Concourse B', priority: 'high', zone: 'concourseB', status: 'active', assignee: 'Team Delta', eta: 'Ongoing' },
    { id: 't4', title: 'Multilingual Info Desk — Main Gate', priority: 'medium', zone: 'gate_main', status: 'active', assignee: 'You', eta: 'Until HT' },
    { id: 't5', title: 'Sensory Room Check — Level 3', priority: 'low', zone: 'vip', status: 'completed', assignee: 'You', eta: 'Done' },
    { id: 't6', title: 'Recycling Station Restock — Fan Zone', priority: 'medium', zone: 'fanzone', status: 'pending', assignee: 'Team Alpha', eta: '15 min' },
  ];

  // ── Helper Functions ──

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomFloat(min, max, decimals = 1) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
  }

  // Generate crowd density for a zone (0-100)
  function generateZoneDensity(zone) {
    const baseRanges = {
      seating: [55, 95],
      premium: [40, 75],
      concourse: [30, 85],
      entertainment: [50, 90],
      services: [35, 80],
      entry: [20, 70]
    };
    const range = baseRanges[zone.type] || [30, 80];
    return randomBetween(range[0], range[1]);
  }

  // Get live crowd data for all zones
  function getLiveCrowdData() {
    return zones.map(zone => {
      const density = generateZoneDensity(zone);
      const count = Math.floor(zone.maxCapacity * density / 100);
      return {
        ...zone,
        currentDensity: density,
        currentCount: count,
        trend: Math.random() > 0.5 ? 'increasing' : 'decreasing',
        trendValue: randomFloat(-5, 8),
        status: density > 90 ? 'critical' : density > 75 ? 'high' : density > 50 ? 'medium' : 'low'
      };
    });
  }

  // Get live transport data
  function getLiveTransportData() {
    return transportModes.map(mode => ({
      ...mode,
      currentWait: randomBetween(Math.max(3, mode.avgTime - 15), mode.avgTime + 20),
      capacity: mode.id === 'parking' ? randomBetween(15, 60) : null,
      status: Math.random() > 0.15 ? 'operational' : 'delayed',
      nextDeparture: randomBetween(2, 15),
      surgeMultiplier: mode.id === 'rideshare' ? randomFloat(1.2, 2.8) : null
    }));
  }

  // Get sustainability live data
  function getLiveSustainabilityData() {
    const base = { ...sustainabilityBaseline };
    return {
      wasteGenerated: base.wasteGenerated + randomBetween(-500, 500),
      wasteDiverted: Math.min(100, base.wasteDiverted + randomFloat(-3, 5)),
      energyUsed: base.energyUsed + randomBetween(-2000, 2000),
      renewableEnergy: Math.min(100, base.renewableEnergy + randomFloat(-2, 3)),
      waterUsed: base.waterUsed + randomBetween(-10000, 10000),
      waterRecycled: Math.min(100, base.waterRecycled + randomFloat(-2, 4)),
      carbonOffset: Math.min(100, base.carbonOffset + randomFloat(-3, 3)),
      fanGreenActions: base.fanGreenActions + randomBetween(-1000, 2000),
      plasticReduced: base.plasticReduced,
      foodWaste: Math.max(2, base.foodWaste + randomFloat(-2, 2)),
      overallScore: randomBetween(78, 95)
    };
  }

  // Get operational KPIs
  function getOperationalKPIs() {
    return {
      totalAttendance: randomBetween(72000, 80000),
      gateProcessingRate: randomBetween(1200, 1800), // people per minute
      avgEntryTime: randomFloat(2.5, 6.0), // minutes
      securityIncidents: randomBetween(0, 5),
      medicalCalls: randomBetween(3, 15),
      lostChildReports: randomBetween(0, 3),
      staffDeployed: randomBetween(850, 1100),
      volunteerActive: randomBetween(250, 400),
      customerSatisfaction: randomFloat(4.2, 4.9),
      wifiConnections: randomBetween(35000, 55000),
      concessionRevenue: randomBetween(180000, 320000),
      parkingUtilization: randomBetween(65, 98),
    };
  }

  // Detect chat intent from message
  function detectIntent(message) {
    const lower = message.toLowerCase();
    for (const [intent, keywords] of Object.entries(intentKeywords)) {
      for (const keyword of keywords) {
        if (lower.includes(keyword)) {
          return intent;
        }
      }
    }
    return 'fallback';
  }

  // Get chatbot response
  function getChatResponse(message, lang = 'en') {
    const intent = detectIntent(message);
    const langResponses = chatResponses[lang] || chatResponses['en'];
    return langResponses[intent] || langResponses['fallback'] || chatResponses['en']['fallback'];
  }

  // ── Public API ──
  return {
    THEME,
    venues,
    matches,
    zones,
    transportModes,
    accessibilityServices,
    aiInsights,
    volunteerTasks,
    chatResponses,
    getLiveCrowdData,
    getLiveTransportData,
    getLiveSustainabilityData,
    getOperationalKPIs,
    detectIntent,
    getChatResponse,
    randomBetween,
    randomFloat
  };

})();
