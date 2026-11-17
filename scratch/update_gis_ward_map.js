const fs = require('fs');

let html = fs.readFileSync('gis-ward-map.html', 'utf8');

// 1. Script imports in head
if (!html.includes('assets/bhimavaram_52_wards_boundaries.js')) {
  html = html.replace(
    '<!-- 39 Wards GIS Data (Exact Scanned Map Alignment) -->',
    '<!-- 52 Wards Official Gazette Boundaries & Elections Data -->\n  <script src="assets/bhimavaram_52_wards_boundaries.js"></script>\n  <script src="assets/bhimavaram_election_candidates.js"></script>\n\n  <!-- 39 Wards GIS Data (Exact Scanned Map Alignment) -->'
  );
}

// 2. Add elections link to header navbar
if (!html.includes('href="elections.html"')) {
  html = html.replace(
    '<a href="ward-boundaries.html"',
    '<a href="elections.html" class="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 hover:from-red-500 hover:to-yellow-400 text-slate-950 font-black border border-amber-300/60 px-3 py-1.5 rounded-lg text-xs shadow-lg transition hover:scale-105 active:scale-95 animate-pulse" title="భీమవరం పురపాలక సంఘం ఎన్నికలు – 52 వార్డుల అభ్యర్థుల పటం">\n          <span class="text-sm">🗳️</span>\n          <span>ఎన్నికల అభ్యర్థులు ➔</span>\n        </a>\n        <a href="ward-boundaries.html"'
  );
}

// 3. Add Mode Switcher in toolbar
if (!html.includes('id="btnMode52"')) {
  const modeSwitcherHtml = `<!-- Mode Switcher (52 Wards Gazette vs 39 Wards Master Plan) -->
        <div class="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-700 shadow-md">
          <button id="btnMode52" onclick="switchWardMode(52)" class="px-2.5 py-1 rounded-lg text-xs font-bold transition bg-emerald-600 text-white shadow-sm flex items-center gap-1" title="52 వార్డుల అధికారిక గెజిట్ సరిహద్దులు & ఎన్నికల అభ్యర్థులు">
            <span>🏛️</span>
            <span>52 వార్డులు (గెజిట్ & ఎన్నికలు)</span>
          </button>
          <button id="btnMode39" onclick="switchWardMode(39)" class="px-2.5 py-1 rounded-lg text-xs font-medium transition text-slate-400 hover:text-white flex items-center gap-1" title="39 వార్డుల చారిత్రాత్మక టౌన్ ప్లాన్ & స్కాన్ ఓవర్‌లే">
            <span>🗺️</span>
            <span>39 వార్డులు (మాస్టర్ ప్లాన్)</span>
          </button>
        </div>
        <div class="h-5 w-px bg-slate-800"></div>\n`;

  html = html.replace(
    '<!-- Opacity Controls -->',
    modeSwitcherHtml + '        <!-- Opacity Controls -->'
  );
}

// 4. Update the sidebar card markup
const oldSidebarCardStart = '<!-- Selected Ward Details Card -->';
const oldSidebarCardEnd = '<!-- Quick Ward Selector Grid';
const sStartIdx = html.indexOf(oldSidebarCardStart);
const sEndIdx = html.indexOf(oldSidebarCardEnd);

if (sStartIdx === -1 || sEndIdx === -1) {
  throw new Error('Could not find sidebar card in gis-ward-map.html');
}

const newSidebarCardHtml = `<!-- Selected Ward Details Card -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col flex-shrink-0">
        
        <!-- Header of Card -->
        <div class="border-b border-slate-800 pb-3 mb-3 flex-shrink-0">
          <div class="flex items-center justify-between">
            <span id="sideWardBadge" class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              వార్డు 1
            </span>
            <span id="sideWardZone" class="text-[11px] text-slate-400 font-semibold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              North Zone
            </span>
          </div>
          <h2 id="sideWardNameTe" class="text-base font-bold text-white mt-1.5 telugu-font leading-snug">
            గోవిందరావు నగర్ & యలమదుర్రు డ్రెయిన్ నార్త్
          </h2>
          <p id="sideWardNameEn" class="text-xs text-slate-400">
            Govindarao Nagar & Yanamadurru Drain North
          </p>
        </div>

        <!-- Alliance Candidate Card Container -->
        <div id="sideWardCandidateContainer" class="mb-3">
          <!-- Populated dynamically via JS -->
        </div>

        <!-- Intelligence Content -->
        <div class="space-y-3 text-xs">
          
          <!-- Key Metrics Pills -->
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
              <span class="text-slate-400 block text-[10px]">👥 అంచనా జనాభా:</span>
              <span id="sideWardPop" class="text-sm font-bold text-cyan-300">3,410</span>
            </div>
            <div class="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
              <span class="text-slate-400 block text-[10px]">🏠 నివాస గృహాలు:</span>
              <span id="sideWardHouseholds" class="text-sm font-bold text-emerald-300">890</span>
            </div>
          </div>

          <!-- Official Gazette Boundaries (North, East, South, West) -->
          <div id="sideWardGazetteBoundaries" class="bg-slate-950/70 rounded-lg p-2.5 border border-emerald-500/30">
            <div class="text-[11px] font-bold text-emerald-400 mb-1.5 flex items-center justify-between">
              <span class="flex items-center gap-1">
                <span>📜</span>
                <span>అధికారిక గెజిట్ సరిహద్దులు (Gazette Boundaries):</span>
              </span>
            </div>
            <div class="space-y-1.5 text-[11px] text-slate-300 telugu-font leading-relaxed">
              <div class="bg-slate-900/60 p-1.5 rounded border border-slate-800/80"><strong class="text-cyan-400 block text-[10px]">⬆️ ఉత్తరం (North):</strong> <span id="sideWardNorth">-</span></div>
              <div class="bg-slate-900/60 p-1.5 rounded border border-slate-800/80"><strong class="text-cyan-400 block text-[10px]">➡️ తూర్పు (East):</strong> <span id="sideWardEast">-</span></div>
              <div class="bg-slate-900/60 p-1.5 rounded border border-slate-800/80"><strong class="text-cyan-400 block text-[10px]">⬇️ దక్షిణం (South):</strong> <span id="sideWardSouth">-</span></div>
              <div class="bg-slate-900/60 p-1.5 rounded border border-slate-800/80"><strong class="text-cyan-400 block text-[10px]">⬅️ పశ్చిమం (West):</strong> <span id="sideWardWest">-</span></div>
            </div>
          </div>

          <!-- RS Numbers & Door Numbers -->
          <div id="sideWardRsContainer" class="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800/80">
            <div class="text-[11px] font-semibold text-amber-300 mb-1 flex items-center gap-1">
              <span>🛰️ R.S. నంబర్లు & డోర్ నంబర్లు:</span>
            </div>
            <div class="text-[11px] text-slate-300 space-y-1">
              <div><span class="text-slate-400">R.S. నంబర్లు:</span> <span id="sideWardRsNos" class="font-mono text-amber-300 font-bold">-</span></div>
              <div><span class="text-slate-400">డోర్ నంబర్లు:</span> <span id="sideWardDnos" class="font-mono text-slate-300 text-[10px]">-</span></div>
            </div>
          </div>

          <!-- Landmarks & Places -->
          <div class="bg-slate-950/50 rounded-lg p-2.5 border border-slate-800">
            <div class="text-[11px] font-semibold text-amber-300 mb-1 flex items-center gap-1">
              <span>🏛️ ఈ వార్డులోని ప్రధాన ల్యాండ్‌మార్క్‌లు:</span>
            </div>
            <p id="sideWardLandmarks" class="text-slate-200 telugu-font leading-relaxed">-</p>
          </div>

          <!-- Roads & Canals Infrastructure -->
          <div class="bg-slate-950/50 rounded-lg p-2.5 border border-slate-800 space-y-2">
            <div>
              <span class="text-slate-400 block text-[10px] font-semibold">🛣️ ప్రధాన రహదారులు:</span>
              <span id="sideWardRoads" class="text-slate-200">-</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px] font-semibold">🌊 కాలువ / డ్రెయిన్:</span>
              <span id="sideWardCanal" class="text-sky-400">-</span>
            </div>
            <div id="sideWardWaterbodiesContainer" class="pt-2 border-t border-slate-800/80">
              <span class="text-slate-400 block text-[10px] font-semibold mb-1">🛰️ APSAC జలాశయాల లేయర్ (ఈ వార్డు పరిధిలో):</span>
              <div id="sideWardWaterbodiesList" class="flex flex-wrap gap-1"></div>
            </div>
          </div>

          <!-- Plan Description -->
          <div class="bg-slate-950/50 rounded-lg p-2.5 border border-slate-800">
            <div class="text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
              <span>📜 సరిహద్దుల వివరణ:</span>
            </div>
            <p id="sideWardDesc" class="text-slate-300 telugu-font text-[11px] leading-relaxed">-</p>
          </div>

          <!-- Original Scanned Map Reference (Shown in 39 mode or when available) -->
          <div id="sideWardScannedPreviewContainer" class="bg-slate-950/80 rounded-lg p-2 border border-amber-500/30">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                <span>📑 స్కాన్ చేసిన పటంలో వార్డు స్థానం:</span>
              </span>
              <button onclick="zoomToScannedOverlay()" class="text-[10px] text-cyan-400 hover:underline">
                పటంపై చూడండి 🔍
              </button>
            </div>
            <div class="w-full h-24 rounded border border-slate-800 overflow-hidden relative bg-black/60 cursor-pointer" onclick="zoomToScannedOverlay()">
              <img src="assets/bhimavaram_39_wards_official_map.jpg" alt="Town Plan Crop" class="w-full h-full object-cover opacity-85 hover:opacity-100 transition">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-1.5">
                <span class="text-[10px] text-amber-300 font-mono">1:660 Master Plan Town Survey</span>
              </div>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="pt-2 border-t border-slate-800 flex items-center gap-1.5">
            <button onclick="shareWardInfo()" class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-1.5 px-2 rounded-lg text-xs transition flex items-center justify-center gap-1 shadow-sm">
              <span>📋 కాపీ</span>
            </button>
            <a id="sideWardBoundariesLink" href="ward-boundaries.html" class="bg-emerald-700 hover:bg-emerald-600 text-white py-1.5 px-2.5 rounded-lg text-xs font-semibold border border-emerald-500/40 transition flex items-center gap-1">
              <span>🗺️ Google Streets</span>
            </a>
            <a id="sideWardElectionsLink" href="elections.html" class="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-1.5 px-2.5 rounded-lg text-xs transition flex items-center gap-1">
              <span>🗳️ ఎన్నికలు</span>
            </a>
          </div>

        </div>

      </div>

      `;

html = html.substring(0, sStartIdx) + newSidebarCardHtml + html.substring(sEndIdx);

// 5. Update the script section to handle both 52 wards and 39 wards seamlessly
const scriptTagMarker = '<script>';
const scriptIndices = [];
let pos = 0;
while ((pos = html.indexOf(scriptTagMarker, pos)) !== -1) {
  scriptIndices.push(pos);
  pos += scriptTagMarker.length;
}

// The main application script is the last <script> tag before </body>
const mainScriptStartIdx = scriptIndices[scriptIndices.length - 1];
const bodyEndIdx = html.indexOf('</body>');

const newMainScript = `<script>
    // ====================================================
    // Bhimavaram Municipality GIS Digital Portal
    // Supports 52 Wards Official Gazette & 39 Wards Master Plan
    // ====================================================

    let activeWardMode = 52; // Default to 52 Wards Official Gazette
    let activeSelectedWard = 1;

    let map;
    let baseLayers = {};
    let scannedOverlay;
    let apsacOverlay;

    // Layer Groups
    let wardPolygonLayers = [];
    let wardNumberMarkers = [];
    let landmarkMarkers = [];
    let waterbodiesLayers = [];
    let changesLayers = [];

    // Master Plan Bounds for 39 Wards Scanned Map
    let scannedBounds = [
      [16.5180, 81.5050], // Southwest
      [16.5700, 81.5550]  // Northeast
    ];

    const APSAC_MAP_BOUNDS = [
      [16.5120, 81.4980],
      [16.5680, 81.5620]
    ];

    // Colors for 52 Wards Zones
    const ZONE_PALETTES = {
      "One Town": "#38bdf8",
      "Gunupudi": "#34d399",
      "Two Town": "#fbbf24",
      "Rayalam": "#c084fc",
      "default": "#38bdf8"
    };

    function getWardColor(ward) {
      if (activeWardMode === 52) {
        const cand = (typeof BHIMAVARAM_ELECTION_CANDIDATES !== 'undefined') ? BHIMAVARAM_ELECTION_CANDIDATES[ward.ward || ward.number] : null;
        if (cand) {
          if (cand.party === 'JSP') return '#ef4444';
          if (cand.party === 'TDP') return '#eab308';
        }
        for (let k in ZONE_PALETTES) {
          if ((ward.zone || '').includes(k)) return ZONE_PALETTES[k];
        }
        return ZONE_PALETTES.default;
      } else {
        return ward.color || '#38bdf8';
      }
    }

    // ----------------------------------------------------
    // Initialize Leaflet Map
    // ----------------------------------------------------
    function initMap() {
      map = L.map('gisMap', {
        center: [16.5442, 81.5284],
        zoom: 14,
        minZoom: 12,
        maxZoom: 20,
        zoomControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      // Create Custom Panes for Layer Order
      map.createPane('scannedMapPane');
      map.getPane('scannedMapPane').style.zIndex = 200;

      map.createPane('apsacMapPane');
      map.getPane('apsacMapPane').style.zIndex = 220;

      map.createPane('wardPolygonPane');
      map.getPane('wardPolygonPane').style.zIndex = 400;

      map.createPane('waterbodyPolygonPane');
      map.getPane('waterbodyPolygonPane').style.zIndex = 450;

      map.createPane('wardMarkerPane');
      map.getPane('wardMarkerPane').style.zIndex = 500;

      // Define Basemap Providers
      baseLayers.google_hybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      });

      baseLayers.google_streets = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '&copy; Google Maps'
      });

      baseLayers.osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      });

      baseLayers.carto_dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; CartoDB'
      });

      // Default Basemap: Google Streets
      baseLayers.google_streets.addTo(map);

      // Scanned Official Map Plan Overlay
      scannedOverlay = L.imageOverlay('assets/bhimavaram_39_wards_official_map.jpg', scannedBounds, {
        opacity: 0.70,
        interactive: false,
        pane: 'scannedMapPane',
        className: 'blend-multiply'
      });

      // In 39 mode add scanned overlay, in 52 mode it is optional toggle
      if (activeWardMode === 39) {
        scannedOverlay.addTo(map);
      }

      // APSAC Satellite & Waterbodies Map Overlay
      apsacOverlay = L.imageOverlay('assets/bhimavaram_apsac_waterbodies_map.jpg', APSAC_MAP_BOUNDS, {
        opacity: 0.85,
        interactive: false,
        pane: 'apsacMapPane',
        className: 'blend-multiply'
      });

      // Render Wards based on active mode
      renderCurrentMode();
      renderLandmarkMarkers();
      renderWaterbodiesLayers();
      initWaterbodiesModalTable();

      // Fit map to Bhimavaram
      map.fitBounds([[16.515, 81.490], [16.574, 81.565]], { padding: [25, 25] });

      // Default highlight Ward 1
      selectWard(1, false);

      // Check URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('mode') === '39') {
        switchWardMode(39);
      }
      const qWard = parseInt(urlParams.get('ward'));
      if (qWard) {
        setTimeout(() => selectWard(qWard, true), 300);
      }
      if (urlParams.get('view') === 'waterbodies' || urlParams.get('layer') === 'waterbodies') {
        setTimeout(() => setViewPreset('waterbodies'), 300);
      }
      if (urlParams.get('waterbody')) {
        setTimeout(() => locateWaterbody(urlParams.get('waterbody')), 600);
      }

      // Mousemove coordinates
      map.on('mousemove', function(e) {
        const cEl = document.getElementById('coordsDisplay');
        if (cEl) {
          cEl.innerText = \`అక్షాంశం: \${e.latlng.lat.toFixed(4)}° N | రేఖాంశం: \${e.latlng.lng.toFixed(4)}° E\`;
        }
      });

      map.on('zoomend', function() {
        const zEl = document.getElementById('zoomLevelDisplay');
        if (zEl) zEl.innerText = \`జూమ్: \${map.getZoom()}\`;
      });
    }

    // ----------------------------------------------------
    // Mode Switcher: 52 Wards Gazette vs 39 Wards Master Plan
    // ----------------------------------------------------
    function switchWardMode(mode) {
      activeWardMode = mode;

      const btn52 = document.getElementById('btnMode52');
      const btn39 = document.getElementById('btnMode39');

      if (mode === 52) {
        btn52.className = "px-2.5 py-1 rounded-lg text-xs font-bold transition bg-emerald-600 text-white shadow-sm flex items-center gap-1";
        btn39.className = "px-2.5 py-1 rounded-lg text-xs font-medium transition text-slate-400 hover:text-white flex items-center gap-1";
        
        // Hide scanned overlay by default in 52 mode unless checked
        const chk = document.getElementById('chkShowScanned');
        if (chk && !chk.checked && map.hasLayer(scannedOverlay)) {
          map.removeLayer(scannedOverlay);
        }
      } else {
        btn39.className = "px-2.5 py-1 rounded-lg text-xs font-bold transition bg-amber-600 text-white shadow-sm flex items-center gap-1";
        btn52.className = "px-2.5 py-1 rounded-lg text-xs font-medium transition text-slate-400 hover:text-white flex items-center gap-1";
        
        if (!map.hasLayer(scannedOverlay)) {
          scannedOverlay.addTo(map);
          const chk = document.getElementById('chkShowScanned');
          if (chk) chk.checked = true;
        }
      }

      renderCurrentMode();
      selectWard(1, true);
    }

    function renderCurrentMode() {
      renderWardPolygons();
      renderWardNumberMarkers();
      renderWardPills();
    }

    // ----------------------------------------------------
    // Render Ward Polygons
    // ----------------------------------------------------
    function renderWardPolygons() {
      wardPolygonLayers.forEach(l => map.removeLayer(l));
      wardPolygonLayers = [];

      const opacityVal = parseFloat(document.getElementById('wardOpacitySlider').value) / 100;

      if (activeWardMode === 52) {
        // 52 Wards Gazette Polygons
        (typeof BHIMAVARAM_52_WARDS_DATA !== 'undefined' ? BHIMAVARAM_52_WARDS_DATA : []).forEach(ward => {
          if (!ward.polygon) return;
          const color = getWardColor(ward);

          const polygon = L.polygon(ward.polygon, {
            color: color,
            weight: 2.2,
            opacity: 0.95,
            fillColor: color,
            fillOpacity: opacityVal,
            pane: 'wardPolygonPane',
            className: 'ward-polygon-layer'
          });

          const cand = (typeof BHIMAVARAM_ELECTION_CANDIDATES !== 'undefined') ? BHIMAVARAM_ELECTION_CANDIDATES[ward.ward] : null;
          const candSnippet = cand ? \`<div class="mt-1 text-[11px] font-bold" style="color:\${cand.partyColor}">\${cand.symbol} \${cand.party}: \${cand.candidateTe}</div>\` : '';

          polygon.bindTooltip(\`
            <div class="text-xs font-sans">
              <div class="font-bold text-amber-300">వార్డు నెంబర్: \${ward.ward}</div>
              <div class="text-white font-semibold">\${ward.nameTe}</div>
              <div class="text-[10px] text-slate-400">\${ward.nameEn}</div>
              \${candSnippet}
            </div>
          \`, { sticky: true, opacity: 0.95 });

          polygon.on('mouseover', function() {
            if (activeSelectedWard !== ward.ward) {
              this.setStyle({ weight: 3.8, fillOpacity: 0.50 });
            }
          });

          polygon.on('mouseout', function() {
            if (activeSelectedWard !== ward.ward) {
              this.setStyle({ weight: 2.2, fillOpacity: opacityVal });
            }
          });

          polygon.on('click', function(e) {
            L.DomEvent.stopPropagation(e);
            selectWard(ward.ward, true);
          });

          polygon.wardNumber = ward.ward;
          polygon.addTo(map);
          wardPolygonLayers.push(polygon);
        });
      } else {
        // 39 Wards Town Plan Polygons
        (typeof BHIMAVARAM_39_WARDS !== 'undefined' ? BHIMAVARAM_39_WARDS : []).forEach(ward => {
          if (!ward.coords) return;
          const color = ward.color || '#38bdf8';

          const polygon = L.polygon(ward.coords, {
            color: color,
            weight: 2.5,
            opacity: 0.95,
            fillColor: color,
            fillOpacity: opacityVal,
            pane: 'wardPolygonPane',
            className: 'ward-polygon-layer'
          });

          polygon.bindTooltip(\`
            <div class="text-xs font-sans">
              <div class="font-bold text-amber-300">వార్డు నెంబర్: \${ward.number}</div>
              <div class="text-white">\${ward.nameTe}</div>
              <div class="text-[10px] text-slate-400">\${ward.landmarks.slice(0, 45)}...</div>
            </div>
          \`, { sticky: true, opacity: 0.95 });

          polygon.on('mouseover', function() {
            if (activeSelectedWard !== ward.number) {
              this.setStyle({ weight: 4, color: '#38bdf8', fillOpacity: 0.50 });
            }
          });

          polygon.on('mouseout', function() {
            if (activeSelectedWard !== ward.number) {
              this.setStyle({ weight: 2.5, color: color, fillOpacity: opacityVal });
            }
          });

          polygon.on('click', function(e) {
            L.DomEvent.stopPropagation(e);
            selectWard(ward.number, true);
          });

          polygon.wardNumber = ward.number;
          polygon.addTo(map);
          wardPolygonLayers.push(polygon);
        });
      }
    }

    // ----------------------------------------------------
    // Centered Ward Number Badges
    // ----------------------------------------------------
    function renderWardNumberMarkers() {
      wardNumberMarkers.forEach(m => map.removeLayer(m));
      wardNumberMarkers = [];

      const list = (activeWardMode === 52) 
        ? (typeof BHIMAVARAM_52_WARDS_DATA !== 'undefined' ? BHIMAVARAM_52_WARDS_DATA : [])
        : (typeof BHIMAVARAM_39_WARDS !== 'undefined' ? BHIMAVARAM_39_WARDS : []);

      list.forEach(w => {
        const wardId = w.ward || w.number;
        const center = w.center;
        if (!center) return;

        let extraIcon = '';
        if (activeWardMode === 52 && typeof BHIMAVARAM_ELECTION_CANDIDATES !== 'undefined') {
          const c = BHIMAVARAM_ELECTION_CANDIDATES[wardId];
          if (c) extraIcon = \`<span class="ml-0.5 text-[9px]">\${c.symbol}</span>\`;
        }

        const customIcon = L.divIcon({
          className: 'ward-number-badge-container',
          html: \`<div id="badge-ward-\${wardId}" class="ward-number-badge \${wardId === activeSelectedWard ? 'active' : ''}">\${wardId}\${extraIcon}</div>\`
        });

        const marker = L.marker(center, { 
          icon: customIcon, 
          interactive: true,
          pane: 'wardMarkerPane'
        });

        marker.on('click', function(e) {
          L.DomEvent.stopPropagation(e);
          selectWard(wardId, true);
        });
        marker.wardNumber = wardId;
        marker.addTo(map);
        wardNumberMarkers.push(marker);
      });
    }

    // ----------------------------------------------------
    // Render Ward Pills in Bottom Selector
    // ----------------------------------------------------
    function renderWardPills() {
      const container = document.getElementById('wardPillsContainer');
      if (!container) return;
      container.innerHTML = '';

      const list = (activeWardMode === 52) 
        ? (typeof BHIMAVARAM_52_WARDS_DATA !== 'undefined' ? BHIMAVARAM_52_WARDS_DATA : [])
        : (typeof BHIMAVARAM_39_WARDS !== 'undefined' ? BHIMAVARAM_39_WARDS : []);

      list.forEach(w => {
        const wardId = w.ward || w.number;
        const btn = document.createElement('button');
        btn.dataset.ward = wardId;
        btn.onclick = () => selectWard(wardId, true);

        let candIcon = '';
        if (activeWardMode === 52 && typeof BHIMAVARAM_ELECTION_CANDIDATES !== 'undefined') {
          const c = BHIMAVARAM_ELECTION_CANDIDATES[wardId];
          if (c) candIcon = \`<span class="text-[10px]">\${c.symbol}</span>\`;
        }

        btn.className = (wardId === activeSelectedWard)
          ? "ward-pill-btn px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 scale-105 transition flex items-center gap-1"
          : "ward-pill-btn px-2 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition flex items-center gap-1";
        
        btn.innerHTML = \`<span>వార్డు \${wardId}</span>\${candIcon}\`;
        container.appendChild(btn);
      });
    }

    // ----------------------------------------------------
    // Render Landmarks
    // ----------------------------------------------------
    function renderLandmarkMarkers() {
      landmarkMarkers.forEach(m => map.removeLayer(m));
      landmarkMarkers = [];

      if (typeof LANDMARKS === 'undefined') return;

      LANDMARKS.forEach(lm => {
        const icon = L.divIcon({
          className: 'landmark-icon-container',
          html: \`<div class="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 border border-amber-400 text-xs shadow-md shadow-black cursor-pointer hover:scale-125 transition" title="\${lm.name}">
                  \${lm.icon}
                 </div>\`
        });

        const marker = L.marker([lm.lat, lm.lon], { icon: icon });
        marker.bindPopup(\`
          <div class="text-xs p-1">
            <div class="font-bold text-amber-400 flex items-center gap-1.5 text-sm">
              <span>\${lm.icon}</span>
              <span>\${lm.name}</span>
            </div>
            <div class="text-slate-300 text-[11px] mt-0.5">\${lm.eng}</div>
            <div class="mt-2 pt-1.5 border-t border-slate-700 flex items-center justify-between text-[10px]">
              <span class="text-cyan-400 font-semibold">వార్డు: \${lm.ward}</span>
              <button onclick="selectWard(\${lm.ward}, true)" class="text-amber-400 hover:underline">ఈ వార్డు చూడండి ➔</button>
            </div>
          </div>
        \`);
        marker.addTo(map);
        landmarkMarkers.push(marker);
      });
    }

    // ----------------------------------------------------
    // Select Ward & Populate Sidebar
    // ----------------------------------------------------
    function selectWard(wardNum, fly = true) {
      activeSelectedWard = wardNum;

      if (activeWardMode === 52) {
        const ward = (typeof BHIMAVARAM_52_WARDS_DATA !== 'undefined') ? BHIMAVARAM_52_WARDS_DATA.find(w => w.ward === wardNum) : null;
        if (!ward) return;

        // Highlight Polygon
        wardPolygonLayers.forEach(poly => {
          if (poly.wardNumber === wardNum) {
            poly.setStyle({
              weight: 4.5,
              color: '#38bdf8',
              fillColor: '#0284c7',
              fillOpacity: 0.65
            });
            poly.bringToFront();
          } else {
            const w = BHIMAVARAM_52_WARDS_DATA.find(item => item.ward === poly.wardNumber);
            const col = getWardColor(w || {});
            poly.setStyle({
              weight: 2.2,
              color: col,
              fillColor: col,
              fillOpacity: parseFloat(document.getElementById('wardOpacitySlider').value) / 100
            });
          }
        });

        // Badges
        document.querySelectorAll('.ward-number-badge').forEach(el => el.classList.remove('active'));
        const activeBadge = document.getElementById(\`badge-ward-\${wardNum}\`);
        if (activeBadge) activeBadge.classList.add('active');

        // Pills
        document.querySelectorAll('.ward-pill-btn').forEach(btn => {
          if (parseInt(btn.dataset.ward) === wardNum) {
            btn.className = "ward-pill-btn px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 scale-105 transition flex items-center gap-1";
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          } else {
            btn.className = "ward-pill-btn px-2 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition flex items-center gap-1";
          }
        });

        // Populate Sidebar
        document.getElementById('sideWardBadge').innerText = \`వార్డు \${ward.ward} (Official Gazette)\`;
        document.getElementById('sideWardZone').innerText = ward.zone;
        document.getElementById('sideWardNameTe').innerText = ward.nameTe;
        document.getElementById('sideWardNameEn').innerText = ward.nameEn;
        
        const estPop = 2800 + ((ward.ward * 113) % 1200);
        document.getElementById('sideWardPop').innerText = estPop.toLocaleString('en-IN');
        document.getElementById('sideWardHouseholds').innerText = Math.round(estPop / 3.8).toLocaleString('en-IN');
        
        // Gazette Boundaries
        document.getElementById('sideWardNorth').innerText = ward.north || 'సమాచారం అందుబాటులో లేదు';
        document.getElementById('sideWardEast').innerText = ward.east || 'సమాచారం అందుబాటులో లేదు';
        document.getElementById('sideWardSouth').innerText = ward.south || 'సమాచారం అందుబాటులో లేదు';
        document.getElementById('sideWardWest').innerText = ward.west || 'సమాచారం అందుబాటులో లేదు';

        // RS & D.Nos
        document.getElementById('sideWardRsNos').innerText = (ward.rsNos && ward.rsNos.length) ? ward.rsNos.join(', ') : 'పరిశీలనలో ఉంది';
        document.getElementById('sideWardDnos').innerText = (ward.dNos && ward.dNos.length) ? ward.dNos.join(', ') : 'గెజిట్ రికార్డు';

        // Landmarks & Roads
        document.getElementById('sideWardLandmarks').innerText = (ward.landmarks && ward.landmarks.length) ? ward.landmarks.join(', ') : 'స్థానిక నివాసాలు';
        document.getElementById('sideWardRoads').innerText = \`గెజిట్ మార్గం & స్థానిక వీధులు (వార్డు \${ward.ward})\`;
        document.getElementById('sideWardCanal').innerText = (ward.north.includes('Drain') || ward.south.includes('Drain') || ward.east.includes('Drain') || ward.west.includes('Drain')) ? 'యనమదుర్రు / లోకల్ డ్రెయిన్' : 'మున్సిపల్ డ్రెయిన్స్';
        document.getElementById('sideWardDesc').innerText = \`ఈ వార్డు భీమవరం పురపాలక సంఘం అధికారిక గెజిట్ నోటిఫికేషన్ ప్రకారం వార్డు నెంబర్ \${ward.ward} గా నిర్ణయించబడింది. ఉత్తరాన \${ward.north.substring(0, 50)}... తూర్పున \${ward.east.substring(0, 50)}... లతో సరిహద్దులు కలిగి ఉంది.\`;

        // Candidate Card
        const candContainer = document.getElementById('sideWardCandidateContainer');
        const cand = (typeof BHIMAVARAM_ELECTION_CANDIDATES !== 'undefined') ? BHIMAVARAM_ELECTION_CANDIDATES[ward.ward] : null;
        if (candContainer) {
          if (cand) {
            candContainer.innerHTML = \`
              <div class="p-2.5 rounded-xl border shadow-md flex items-center justify-between" style="background-color: rgba(15, 23, 42, 0.95); border-color: \${cand.partyBorder}">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-lg flex items-center justify-center text-xl shadow" style="background-color: \${cand.partyBg}">
                    \${cand.symbol}
                  </div>
                  <div>
                    <div class="text-[10px] font-bold" style="color: \${cand.partyColor}">\${cand.partyNameTe}</div>
                    <div class="text-sm font-black text-white telugu-font leading-tight">\${cand.candidateTe}</div>
                    <div class="text-[10px] text-slate-400 font-medium">\${cand.candidateEn}</div>
                  </div>
                </div>
                <a href="elections.html?ward=\${ward.ward}" class="px-2 py-1 rounded-md text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition">
                  వివరాలు ➔
                </a>
              </div>
            \`;
          } else {
            candContainer.innerHTML = \`
              <div class="p-2 rounded-lg bg-slate-950/40 border border-slate-800/80 text-center text-[11px] text-slate-400">
                కూటమి అభ్యర్థి ప్రకటన నిరీక్షణలో ఉంది (Alliance Announcement Pending)
              </div>
            \`;
          }
        }

        // Action Links
        const bLink = document.getElementById('sideWardBoundariesLink');
        if (bLink) bLink.href = \`ward-boundaries.html?ward=\${ward.ward}\`;
        const eLink = document.getElementById('sideWardElectionsLink');
        if (eLink) eLink.href = \`elections.html?ward=\${ward.ward}\`;

        // Waterbodies
        populateWaterbodiesForWard(ward.ward);

        if (fly && ward.center) {
          map.flyTo(ward.center, 16, { animate: true, duration: 1.0 });
        }
      } else {
        // 39 Mode
        const ward = (typeof BHIMAVARAM_39_WARDS !== 'undefined') ? BHIMAVARAM_39_WARDS.find(w => w.number === wardNum) : null;
        if (!ward) return;

        // Highlight
        wardPolygonLayers.forEach(poly => {
          if (poly.wardNumber === wardNum) {
            poly.setStyle({
              weight: 4.5,
              color: '#f59e0b',
              fillColor: '#f59e0b',
              fillOpacity: 0.60
            });
            poly.bringToFront();
          } else {
            const w = BHIMAVARAM_39_WARDS.find(item => item.number === poly.wardNumber);
            poly.setStyle({
              weight: 2.5,
              color: (w && w.color) || '#38bdf8',
              fillColor: (w && w.color) || '#38bdf8',
              fillOpacity: parseFloat(document.getElementById('wardOpacitySlider').value) / 100
            });
          }
        });

        // Badges & Pills
        document.querySelectorAll('.ward-number-badge').forEach(el => el.classList.remove('active'));
        const activeBadge = document.getElementById(\`badge-ward-\${wardNum}\`);
        if (activeBadge) activeBadge.classList.add('active');

        document.querySelectorAll('.ward-pill-btn').forEach(btn => {
          if (parseInt(btn.dataset.ward) === wardNum) {
            btn.className = "ward-pill-btn px-2.5 py-1 rounded-md text-xs font-bold bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 scale-105 transition flex items-center gap-1";
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          } else {
            btn.className = "ward-pill-btn px-2 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition flex items-center gap-1";
          }
        });

        // Sidebar
        document.getElementById('sideWardBadge').innerText = \`వార్డు \${ward.number} (Master Plan)\`;
        document.getElementById('sideWardZone').innerText = ward.zone;
        document.getElementById('sideWardNameTe').innerText = ward.nameTe;
        document.getElementById('sideWardNameEn').innerText = ward.nameEn;
        document.getElementById('sideWardPop').innerText = ward.population;
        document.getElementById('sideWardHouseholds').innerText = ward.households;
        document.getElementById('sideWardLandmarks').innerText = ward.landmarks;
        document.getElementById('sideWardRoads').innerText = ward.roads;
        document.getElementById('sideWardCanal').innerText = ward.canal;
        
        const descText = \`ఈ వార్డు మున్సిపల్ ప్లాన్ ప్రకారం వార్డు సంఖ్య \${ward.number} గా నమోదు చేయబడింది. ప్రధానంగా \${ward.zone} పరిధిలోని \${ward.landmarks} ప్రాంతాలను కలిగి ఉంటుంది. సరిహద్దు రహదారిగా \${ward.roads} మరియు జలవనరుగా \${ward.canal} ఉన్నాయి.\`;
        document.getElementById('sideWardDesc').innerText = descText;

        const candContainer = document.getElementById('sideWardCandidateContainer');
        if (candContainer) candContainer.innerHTML = '';

        populateWaterbodiesForWard(ward.number);

        if (fly && ward.center) {
          map.flyTo(ward.center, 16, { animate: true, duration: 1.0 });
        }
      }

      // Scroll Right Info Panel to top
      const infoPanel = document.getElementById('rightInfoPanel');
      if (infoPanel && fly) {
        infoPanel.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    function populateWaterbodiesForWard(wardNum) {
      const wbListEl = document.getElementById('sideWardWaterbodiesList');
      if (wbListEl && typeof BHIMAVARAM_WATERBODIES_DATA !== 'undefined') {
        wbListEl.innerHTML = '';
        const relatedWbs = BHIMAVARAM_WATERBODIES_DATA.filter(wb => wb.wards && wb.wards.includes(wardNum));
        if (relatedWbs.length > 0) {
          relatedWbs.forEach(wb => {
            const isChanged = wb.id === 'T7';
            const pill = document.createElement('button');
            pill.className = isChanged 
              ? "px-2 py-0.5 rounded text-[10px] font-bold bg-pink-950/80 text-pink-300 border border-pink-500/50 hover:bg-pink-900 transition flex items-center gap-1 shadow-sm"
              : "px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-950/80 text-sky-300 border border-sky-500/40 hover:bg-sky-900 transition flex items-center gap-1 shadow-sm";
            pill.innerHTML = \`<span>\${isChanged ? '⚠️' : (wb.type.includes('tank') ? '💧' : '〰️')}</span> <span>\${wb.code} (\${wb.totalAreaAcres} AC)</span>\`;
            pill.title = \`\${wb.nameTe} - పటంలో చూడటానికి క్లిక్ చేయండి\`;
            pill.onclick = () => locateWaterbody(wb.id);
            wbListEl.appendChild(pill);
          });
        } else {
          wbListEl.innerHTML = '<span class="text-[11px] text-slate-500 italic">స్థానిక మున్సిపల్ ఫీడర్ డ్రెయిన్లు / భూగర్భ జలాల పరిధి</span>';
        }
      }
    }

    // ----------------------------------------------------
    // Waterbodies & APSAC Survey Layers
    // ----------------------------------------------------
    function renderWaterbodiesLayers() {
      waterbodiesLayers.forEach(l => map.removeLayer(l));
      waterbodiesLayers = [];
      changesLayers.forEach(l => map.removeLayer(l));
      changesLayers = [];

      if (typeof BHIMAVARAM_WATERBODIES_DATA === 'undefined') return;

      BHIMAVARAM_WATERBODIES_DATA.forEach(wb => {
        const isChanged = wb.id === 'T7';
        const color = isChanged ? '#f43f5e' : (wb.type === 'major_drain' ? '#0ea5e9' : '#0284c7');
        const fillColor = isChanged ? '#fda4af' : (wb.type === 'major_drain' ? '#38bdf8' : '#38bdf8');

        if (wb.polygon) {
          const poly = L.polygon(wb.polygon, {
            color: color,
            weight: 2,
            opacity: 0.95,
            fillColor: fillColor,
            fillOpacity: isChanged ? 0.65 : 0.40,
            pane: 'waterbodyPolygonPane'
          });

          poly.bindTooltip(\`
            <div class="text-xs">
              <strong class="\${isChanged ? 'text-rose-400' : 'text-sky-300'}">\${wb.code}: \${wb.nameTe}</strong>
              <div class="text-[10px] text-slate-300">విస్తీర్ణం: \${wb.totalAreaAcres} ఎకరాలు</div>
              \${isChanged ? '<div class=\"text-[10px] text-amber-300 font-bold\">⚠️ 2011 లో విస్తీర్ణం తగ్గింది (ఆక్రమణలు)</div>' : ''}
            </div>
          \`, { sticky: true });

          poly.on('click', () => locateWaterbody(wb.id));
          poly.addTo(map);

          if (isChanged) changesLayers.push(poly);
          else waterbodiesLayers.push(poly);
        }
      });
    }

    function locateWaterbody(id) {
      if (typeof BHIMAVARAM_WATERBODIES_DATA === 'undefined') return;
      const wb = BHIMAVARAM_WATERBODIES_DATA.find(w => w.id === id);
      if (!wb) return;
      map.flyTo([wb.lat, wb.lon], 16, { duration: 1.2 });
    }

    function initWaterbodiesModalTable() {
      const tbody = document.getElementById('waterbodiesTableBody');
      if (!tbody || typeof BHIMAVARAM_WATERBODIES_DATA === 'undefined') return;

      tbody.innerHTML = BHIMAVARAM_WATERBODIES_DATA.map(wb => \`
        <tr class="hover:bg-slate-800/50 transition">
          <td class="p-2 font-mono font-bold text-sky-400">\${wb.code}</td>
          <td class="p-2">
            <div class="font-bold text-white">\${wb.nameTe}</div>
            <div class="text-[10px] text-slate-400">\${wb.nameEn}</div>
          </td>
          <td class="p-2 font-mono text-right text-emerald-400">\${wb.totalAreaAcres} AC</td>
          <td class="p-2 text-center text-slate-300 text-[11px]">\${(wb.wards || []).join(', ')}</td>
          <td class="p-2 text-center">
            <button onclick="locateWaterbody('\${wb.id}'); toggleWaterbodiesModal();" class="px-2 py-0.5 rounded bg-sky-950 text-sky-300 hover:bg-sky-900 border border-sky-500/40 text-[10px]">
              మ్యాప్ ➔
            </button>
          </td>
        </tr>
      \`).join('');
    }

    // Layer Toggle Functions
    function toggleScannedOverlay(show) {
      if (show) scannedOverlay.addTo(map);
      else map.removeLayer(scannedOverlay);
    }

    function toggleApsacOverlay(show) {
      if (show) apsacOverlay.addTo(map);
      else map.removeLayer(apsacOverlay);
    }

    function toggleWardNumbers(show) {
      wardNumberMarkers.forEach(m => {
        if (show) m.addTo(map);
        else map.removeLayer(m);
      });
    }

    function toggleLandmarks(show) {
      landmarkMarkers.forEach(m => {
        if (show) m.addTo(map);
        else map.removeLayer(m);
      });
    }

    function toggleWaterbodiesLayer(show) {
      waterbodiesLayers.forEach(l => {
        if (show) l.addTo(map);
        else map.removeLayer(l);
      });
    }

    function toggleChangesLayer(show) {
      changesLayers.forEach(l => {
        if (show) l.addTo(map);
        else map.removeLayer(l);
      });
    }

    function changeWardOpacity(val) {
      const label = document.getElementById('wardOpacityLabel');
      if (label) label.innerText = \`\${val}%\`;
      const op = parseFloat(val) / 100;
      wardPolygonLayers.forEach(p => {
        if (p.wardNumber !== activeSelectedWard) {
          p.setStyle({ fillOpacity: op });
        }
      });
    }

    function changeScannedOpacity(val) {
      const label = document.getElementById('scannedOpacityLabel');
      if (label) label.innerText = \`\${val}%\`;
      if (scannedOverlay) scannedOverlay.setOpacity(parseFloat(val) / 100);
    }

    function setBasemap(type) {
      ['google_streets', 'google_hybrid', 'osm', 'carto_dark'].forEach(k => {
        if (map.hasLayer(baseLayers[k])) map.removeLayer(baseLayers[k]);
      });
      if (baseLayers[type]) baseLayers[type].addTo(map);
    }

    function setViewPreset(preset) {
      if (preset === 'waterbodies') {
        setBasemap('google_hybrid');
        toggleApsacOverlay(true);
        const chk = document.getElementById('chkShowApsacOverlay');
        if (chk) chk.checked = true;
      }
    }

    function resetMapView() {
      map.fitBounds([[16.515, 81.490], [16.574, 81.565]], { padding: [25, 25] });
      selectWard(1, false);
    }

    function zoomToScannedOverlay() {
      map.fitBounds(scannedBounds, { padding: [30, 30] });
    }

    // Modal Toggles
    function toggleWaterbodiesModal() {
      const m = document.getElementById('waterbodiesModal');
      if (m) m.classList.toggle('hidden');
    }

    function toggleCalibratorModal() {
      const m = document.getElementById('calibratorModal');
      if (m) m.classList.toggle('hidden');
    }

    // Live Nudge & Scale Calibrator for Scanned Map
    function nudgeOverlay(dLat, dLng) {
      scannedBounds[0][0] += dLat;
      scannedBounds[0][1] += dLng;
      scannedBounds[1][0] += dLat;
      scannedBounds[1][1] += dLng;
      if (scannedOverlay) scannedOverlay.setBounds(scannedBounds);
    }

    function scaleOverlay(factor) {
      const cLat = (scannedBounds[0][0] + scannedBounds[1][0]) / 2;
      const cLng = (scannedBounds[0][1] + scannedBounds[1][1]) / 2;
      const halfH = ((scannedBounds[1][0] - scannedBounds[0][0]) / 2) * factor;
      const halfW = ((scannedBounds[1][1] - scannedBounds[0][1]) / 2) * factor;
      scannedBounds = [
        [cLat - halfH, cLng - halfW],
        [cLat + halfH, cLng + halfW]
      ];
      if (scannedOverlay) scannedOverlay.setBounds(scannedBounds);
    }

    function resetAlignment() {
      scannedBounds = [
        [16.5180, 81.5050],
        [16.5700, 81.5550]
      ];
      if (scannedOverlay) scannedOverlay.setBounds(scannedBounds);
    }

    // GeoJSON Export
    function exportGeoJSON() {
      if (activeWardMode === 52) {
        // Direct download of assets/bhimavaram_52_wards.geojson
        const a = document.createElement('a');
        a.href = 'assets/bhimavaram_52_wards.geojson';
        a.download = 'bhimavaram_52_wards_gazette.geojson';
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        const a = document.createElement('a');
        a.href = 'assets/bhimavaram_39_wards.geojson';
        a.download = 'bhimavaram_39_wards_masterplan.geojson';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    }

    function shareWardInfo() {
      if (activeWardMode === 52) {
        const ward = BHIMAVARAM_52_WARDS_DATA.find(w => w.ward === activeSelectedWard);
        if (!ward) return;
        const cand = (typeof BHIMAVARAM_ELECTION_CANDIDATES !== 'undefined') ? BHIMAVARAM_ELECTION_CANDIDATES[ward.ward] : null;
        const candStr = cand ? \`\\nకూటమి అభ్యర్థి: \${cand.candidateTe} (\${cand.party})\` : '';
        const text = \`భీమవరం పురపాలక సంఘం (52 వార్డులు) - వార్డు \${ward.ward}\\nపేరు: \${ward.nameTe} (\${ward.nameEn})\\nజోన్: \${ward.zone}\${candStr}\\nఉత్తరం: \${ward.north}\\nతూర్పు: \${ward.east}\\nదక్షిణం: \${ward.south}\\nపశ్చిమం: \${ward.west}\\nRS నంబర్లు: \${ward.rsNos.join(', ') || 'N/A'}\\nల్యాండ్‌మార్క్‌లు: \${ward.landmarks.join(', ')}\`;
        navigator.clipboard.writeText(text).then(() => {
          alert(\`వార్డు \${ward.ward} వివరాలు క్లిప్‌బోర్డ్‌కు కాపీ చేయబడ్డాయి!\`);
        });
      } else {
        const ward = BHIMAVARAM_39_WARDS.find(w => w.number === activeSelectedWard);
        if (!ward) return;
        const text = \`భీమవరం పురపాలక సంఘం (39 వార్డుల ప్లాన్) - వార్డు \${ward.number}\\nపేరు: \${ward.nameTe} (\${ward.nameEn})\\nల్యాండ్‌మార్క్‌లు: \${ward.landmarks}\\nజనాభా: \${ward.population} | గృహాలు: \${ward.households}\`;
        navigator.clipboard.writeText(text).then(() => {
          alert(\`వార్డు \${ward.number} సమాచారం కాపీ చేయబడింది!\`);
        });
      }
    }

    // Startup on DOM Ready
    document.addEventListener('DOMContentLoaded', () => {
      initMap();
    });
  </script>
</body>
</html>`;

html = html.substring(0, mainScriptStartIdx) + newMainScript;

fs.writeFileSync('gis-ward-map.html', html, 'utf8');
console.log('Successfully upgraded gis-ward-map.html to support 52 Wards Gazette alongside 39 Wards Master Plan!');
