const fs = require('fs');

let html = fs.readFileSync('elections.html', 'utf8');

// Check initMap
const initMapOld = `      map.createPane('wardPolygonPane');
      map.getPane('wardPolygonPane').style.zIndex = 450;

      map.createPane('wardMarkerPane');
      map.getPane('wardMarkerPane').style.zIndex = 650;`;

const initMapNew = `      map.createPane('wardPolygonPane');
      map.getPane('wardPolygonPane').style.zIndex = 450;

      map.createPane('wardMarkerPane');
      map.getPane('wardMarkerPane').style.zIndex = 650;

      map.createPane('pollingStationPane');
      map.getPane('pollingStationPane').style.zIndex = 700;`;

if (html.includes(initMapOld)) {
    html = html.replace(initMapOld, initMapNew);
    console.log('Added pollingStationPane in initMap');
}

// Check where polling variables can be placed
const varOld = `    let map = null;
    let baseLayers = {};
    let wardLayers = {};
    let wardBadges = {};
    let activeWardId = null;
    let selectedPartyFilter = 'all';
    let searchQuery = '';`;

const varNew = `    let map = null;
    let baseLayers = {};
    let wardLayers = {};
    let wardBadges = {};
    let activeWardId = null;
    let selectedPartyFilter = 'all';
    let searchQuery = '';
    let pollingStationsLayerGroup = null;
    let pollingStationMarkers = {};
    let isPollingStationsVisible = true;`;

if (html.includes(varOld)) {
    html = html.replace(varOld, varNew);
    console.log('Added polling state variables');
}

// Add renderPollingStationMarkers and togglePollingStationsLayer before renderElectionWardPolygons
const pollingMarkerFunctions = `
    // Render All Polling Station Markers on Map (Official 122 Booths across 37 Campuses)
    function renderPollingStationMarkers() {
      if (typeof BHIMAVARAM_POLLING_CLUSTERS === 'undefined' || !map) return;
      
      if (!pollingStationsLayerGroup) {
        pollingStationsLayerGroup = L.layerGroup().addTo(map);
      } else {
        pollingStationsLayerGroup.clearLayers();
      }
      pollingStationMarkers = {};

      BHIMAVARAM_POLLING_CLUSTERS.forEach(cluster => {
        const boothRangeText = cluster.boothNos.length > 2 
          ? \`#\${cluster.boothNos[0]}-\${cluster.boothNos[cluster.boothNos.length-1]}\`
          : \`#\${cluster.boothNos.join(', #')}\`;

        const psIcon = L.divIcon({
          className: 'polling-station-icon-wrap',
          html: \`
            <div class="ps-marker-pin" id="ps-marker-\${cluster.id}" data-campus-id="\${cluster.id}" title="\${cluster.nameTe} (\${boothRangeText})">
              <div class="ps-marker-inner">
                <span class="text-xs">🗳️</span>
                <span class="text-[10.5px] font-mono leading-none tracking-tight font-extrabold">\${boothRangeText}</span>
              </div>
              <div class="ps-marker-arrow"></div>
            </div>
          \`,
          iconSize: [68, 32],
          iconAnchor: [34, 32],
          popupAnchor: [0, -34]
        });

        const marker = L.marker([cluster.lat, cluster.lng], {
          pane: 'pollingStationPane',
          icon: psIcon,
          riseOnHover: true
        });

        // Popup Content with detailed room-by-room official list
        const popupContent = \`
          <div class="polling-station-popup p-3 rounded-2xl text-slate-100 max-w-sm">
            <div class="flex items-start justify-between gap-2 border-b border-slate-700/80 pb-2 mb-2">
              <div>
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                    🗳️ పోలింగ్ కేంద్రం (\${cluster.totalBooths} బూతులు)
                  </span>
                  <span class="text-[11px] text-emerald-400 font-bold telugu-font">\${cluster.areaTe}</span>
                </div>
                <h3 class="font-bold text-sm text-white mt-1 telugu-font leading-snug">\${cluster.nameTe}</h3>
                <div class="text-[11px] text-slate-400 font-sans leading-tight">\${cluster.name}</div>
              </div>
            </div>

            <div class="text-xs text-slate-300 mb-1.5">
              <span class="text-slate-400 font-semibold">📍 చిరునామా:</span> \${cluster.address}
            </div>

            <div class="text-xs text-slate-300 mb-2">
              <span class="text-slate-400 font-semibold">🏛️ కేటాయించిన వార్డులు:</span>
              <span class="inline-flex gap-1 flex-wrap mt-0.5">
                \${cluster.wards.map(w => \`<span class="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 text-[10px] font-mono font-bold border border-slate-700">వార్డు \${w}</span>\`).join('')}
              </span>
            </div>

            <div class="border-t border-slate-800 pt-2 mb-2">
              <div class="text-[11px] font-bold text-emerald-300 mb-1 flex items-center justify-between">
                <span>📋 పోలింగ్ బూతులు & గదుల వివరాలు:</span>
                <span class="text-[10px] text-slate-400 font-mono">\${cluster.totalBooths} గదులు</span>
              </div>
              <div class="max-h-40 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
                \${cluster.stations.map(st => \`
                  <div class="p-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px]">
                    <div class="flex items-center justify-between font-mono font-bold text-amber-400">
                      <span>బూత్ నం. #\${st.boothNo}</span>
                      <span class="text-[10px] text-slate-400 font-sans">వార్డు \${st.primaryWard}</span>
                    </div>
                    <div class="text-slate-200 telugu-font mt-0.5 leading-tight font-medium">\${st.roomDescTe}</div>
                    <div class="text-[10px] text-slate-400 leading-tight font-sans mt-0.5">\${st.roomDesc}</div>
                  </div>
                \`).join('')}
              </div>
            </div>

            <div class="border-t border-slate-800 pt-2 flex items-center justify-between text-xs">
              <a href="https://www.google.com/maps/dir/?api=1&destination=\${cluster.lat},\${cluster.lng}" 
                 target="_blank" rel="noopener noreferrer"
                 class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow transition">
                🗺️ గూగుల్ మ్యాప్స్ దారి (Directions)
              </a>
              <span class="text-[10px] text-slate-400 font-mono">\${cluster.lat.toFixed(4)}, \${cluster.lng.toFixed(4)}</span>
            </div>
          </div>
        \`;

        marker.bindPopup(popupContent, { maxWidth: 360, className: 'polling-station-leaflet-popup' });

        marker.on('click', () => {
          // Highlight associated wards
          cluster.wards.forEach(w => {
            const poly = wardLayers[w];
            if (poly) {
              poly.setStyle({ weight: 4.5, fillOpacity: 0.6, color: '#10b981' });
              setTimeout(() => {
                const theme = getWardPartyTheme(w);
                poly.setStyle({
                  weight: theme.hasCandidate ? 2.8 : 1.8,
                  fillOpacity: theme.hasCandidate ? 0.35 : 0.15,
                  color: theme.borderColor
                });
              }, 3000);
            }
          });
        });

        pollingStationsLayerGroup.addLayer(marker);
        pollingStationMarkers[cluster.id] = marker;
      });
    }

    // Toggle Polling Stations Layer on/off
    function togglePollingStationsLayer() {
      const btn = document.getElementById('btnTogglePollingStations');
      const badge = document.getElementById('badgePollingStatus');
      
      if (!pollingStationsLayerGroup) {
        renderPollingStationMarkers();
        isPollingStationsVisible = true;
      } else if (map.hasLayer(pollingStationsLayerGroup)) {
        map.removeLayer(pollingStationsLayerGroup);
        isPollingStationsVisible = false;
        if (btn) {
          btn.className = 'bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-semibold px-3 py-1.5 rounded-xl shadow border border-slate-700 flex items-center gap-1.5 transition';
          btn.innerHTML = '<span>🗳️ పోలింగ్ కేంద్రాలు (దాచబడ్డాయి)</span><span id="badgePollingStatus" class="w-2 h-2 rounded-full bg-slate-500"></span>';
        }
      } else {
        map.addLayer(pollingStationsLayerGroup);
        isPollingStationsVisible = true;
        if (btn) {
          btn.className = 'bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-emerald-400/40 flex items-center gap-1.5 transition hover:scale-105 active:scale-95';
          btn.innerHTML = '<span>🗳️ పోలింగ్ కేంద్రాలు (122)</span><span id="badgePollingStatus" class="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>';
        }
      }
    }
`;

if (!html.includes('function renderPollingStationMarkers')) {
    html = html.replace('function renderElectionWardPolygons() {', pollingMarkerFunctions + '\n    function renderElectionWardPolygons() {');
    console.log('Added renderPollingStationMarkers & togglePollingStationsLayer');
}

// In initElectionApp, make sure renderPollingStationMarkers is called
if (!html.includes('renderPollingStationMarkers();')) {
    html = html.replace('renderElectionWardPolygons();', 'renderElectionWardPolygons();\n      renderPollingStationMarkers();');
    console.log('Called renderPollingStationMarkers in initElectionApp');
}

fs.writeFileSync('elections.html', html, 'utf8');
console.log('Step 2 applied to elections.html');
