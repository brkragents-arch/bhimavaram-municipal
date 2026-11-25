const fs = require('fs');

let html = fs.readFileSync('elections.html', 'utf8');

// 1. Declare variables at top of script
const oldHeader = `    let map = null;
    let baseLayers = {};
    let activeBaseLayer = 'google_streets';
    let wardLayers = {};
    let wardBadges = {};
    let activeWardId = null;
    let selectedPartyFilter = 'all';
    let searchQuery = '';`;

const newHeader = `    let map = null;
    let baseLayers = {};
    let activeBaseLayer = 'google_streets';
    let wardLayers = {};
    let wardBadges = {};
    let activeWardId = null;
    let selectedPartyFilter = 'all';
    let searchQuery = '';
    var pollingStationsLayerGroup = null;
    var pollingStationMarkers = {};
    var isPollingStationsVisible = true;`;

if (html.includes(oldHeader)) {
    html = html.replace(oldHeader, newHeader);
    console.log('Declared pollingStationsLayerGroup, pollingStationMarkers, isPollingStationsVisible');
} else {
    console.log('oldHeader not found!');
}

// 2. Call renderPollingStationMarkers() right after renderElectionWardPolygons();
const callOld = `      baseLayers.google_streets.addTo(map);

      renderElectionWardPolygons();`;

const callNew = `      baseLayers.google_streets.addTo(map);

      renderElectionWardPolygons();
      renderPollingStationMarkers();`;

if (html.includes(callOld)) {
    html = html.replace(callOld, callNew);
    console.log('Called renderPollingStationMarkers() in initMap()');
} else {
    console.log('callOld not found!');
}

fs.writeFileSync('elections.html', html, 'utf8');
fs.copyFileSync('elections.html', 'bhimavaram-elections.html');
console.log('Updated elections.html and synced bhimavaram-elections.html successfully!');
