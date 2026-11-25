const fs = require('fs');

let html = fs.readFileSync('elections.html', 'utf8');

// 1. Add script tag in <head>
if (!html.includes('assets/bhimavaram_polling_stations.js')) {
    html = html.replace(
        '<script src="assets/theme.js"></script>',
        '<script src="assets/theme.js"></script>\n  <!-- Bhimavaram Polling Stations Dataset (122 Booths, 37 Campuses) -->\n  <script src="assets/bhimavaram_polling_stations.js"></script>'
    );
    console.log('Added script tag for assets/bhimavaram_polling_stations.js');
}

// 2. Add Polling Stations styles into <style>
const pollingStyles = `
    /* Polling Station Map Pins & Popups */
    .polling-station-icon-wrap {
      background: transparent !important;
      border: none !important;
    }
    .ps-marker-pin {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      filter: drop-shadow(0 3px 6px rgba(0,0,0,0.45));
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.2s ease;
    }
    .ps-marker-pin:hover, .ps-marker-pin.ps-active {
      transform: scale(1.18);
      filter: drop-shadow(0 6px 14px rgba(16, 185, 129, 0.75));
      z-index: 1000 !important;
    }
    .ps-marker-inner {
      display: flex;
      align-items: center;
      gap: 5px;
      background: linear-gradient(135deg, #059669, #10b981);
      color: #ffffff;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 9999px;
      border: 2px solid #a7f3d0;
      box-shadow: 0 4px 10px rgba(0,0,0,0.35);
      font-size: 11px;
      white-space: nowrap;
    }
    .ps-marker-pin.ps-active .ps-marker-inner {
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      border-color: #bfdbfe;
      animation: pulseGlow 1.5s infinite;
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
      50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
    }
    .ps-marker-arrow {
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid #059669;
      margin-top: -1px;
    }
    .ps-marker-pin.ps-active .ps-marker-arrow {
      border-top-color: #2563eb;
    }
    .leaflet-popup-content-wrapper {
      background: #090d16 !important;
      color: #f8fafc !important;
      border-radius: 1rem !important;
      padding: 0 !important;
      border: 1px solid rgba(16, 185, 129, 0.45) !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6) !important;
      overflow: hidden !important;
    }
    .leaflet-popup-content {
      margin: 0 !important;
      line-height: 1.4 !important;
    }
    .leaflet-popup-tip {
      background: #090d16 !important;
    }
    html.light .leaflet-popup-content-wrapper {
      background: #ffffff !important;
      color: #0f172a !important;
      border-color: #10b981 !important;
      box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.15) !important;
    }
    html.light .leaflet-popup-tip {
      background: #ffffff !important;
    }
    html.light .polling-station-popup {
      background-color: #ffffff !important;
      color: #0f172a !important;
    }
    html.light .polling-station-popup h3 {
      color: #0f172a !important;
    }
    html.light .polling-station-popup .bg-slate-950\\/70,
    html.light .polling-station-popup .bg-slate-950\\/80 {
      background-color: #f8fafc !important;
      border-color: #e2e8f0 !important;
      color: #1e293b !important;
    }
    html.light .polling-station-popup .text-slate-200 {
      color: #1e293b !important;
    }
    html.light .polling-station-popup .border-slate-800,
    html.light .polling-station-popup .border-slate-700\\/80 {
      border-color: #e2e8f0 !important;
    }
`;

if (!html.includes('.polling-station-icon-wrap')) {
    html = html.replace('</style>', pollingStyles + '\n  </style>');
    console.log('Added polling station CSS');
}

// 3. Add toggle button in Map Top Control Bar
const toggleButtonHtml = `
          <!-- Polling Stations Layer Toggle -->
          <button onclick="togglePollingStationsLayer()" id="btnTogglePollingStations" 
                  class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-emerald-400/40 flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
                  title="పోలింగ్ కేంద్రాలు చూపించు/దాచు (122 కేంద్రాలు)">
            <span>🗳️ పోలింగ్ కేంద్రాలు (122)</span>
            <span id="badgePollingStatus" class="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
          </button>
`;

if (!html.includes('btnTogglePollingStations')) {
    html = html.replace(
        '<div class="pointer-events-auto flex items-center gap-2">',
        '<div class="pointer-events-auto flex items-center gap-2">\n' + toggleButtonHtml
    );
    console.log('Added btnTogglePollingStations button in map top toolbar');
}

fs.writeFileSync('elections.html', html, 'utf8');
console.log('Step 1 applied successfully to elections.html');
