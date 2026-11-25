const fs = require('fs');

let html = fs.readFileSync('elections.html', 'utf8');

// Adjust pollingStationPane to zIndex 620 (above wardMarkerPane 600/650, below popupPane 700/800)
html = html.replace(
    "map.getPane('pollingStationPane').style.zIndex = 700;",
    "map.getPane('pollingStationPane').style.zIndex = 620;\n      map.getPane('popupPane').style.zIndex = 800;"
);

// In CSS, adjust .leaflet-popup-pane and .leaflet-popup
const zIndexFixCss = `
    .leaflet-popup-pane {
      z-index: 800 !important;
    }
`;

if (!html.includes('.leaflet-popup-pane')) {
    html = html.replace('.polling-station-icon-wrap {', zIndexFixCss + '\n    .polling-station-icon-wrap {');
}

fs.writeFileSync('elections.html', html, 'utf8');
fs.copyFileSync('elections.html', 'bhimavaram-elections.html');
console.log('Fixed z-index: popupPane is now 800, pollingStationPane is 620.');
