const fs = require('fs');
const osm = JSON.parse(fs.readFileSync('scratch/bhimavaram_osm_roads.json', 'utf8'));

console.log('--- Analyzing Road Geometries in OSM data ---');

// Helper to convert OSM way geometry [{lat, lon}, ...] to [[lat, lon], ...]
function wayToCoords(w) {
  if (!w.geometry) return [];
  return w.geometry.map(p => [Number(p.lat.toFixed(6)), Number(p.lon.toFixed(6))]);
}

// 1. NH-165 Bypass (trunk)
const trunkWays = osm.elements.filter(e => e.tags && (e.tags.highway === 'trunk' || e.tags.ref === 'NH165'));
console.log('Trunk (NH-165) ways:', trunkWays.length);

// 2. Bhimavaram - Pippara Road (P.P. Road)
const pipparaWays = osm.elements.filter(e => e.tags && JSON.stringify(e.tags).includes('Pippara'));
console.log('P.P. Road ways:', pipparaWays.length);

// 3. Bhimavaram - Narsapuram Road (B.N. Road)
const narsapurWays = osm.elements.filter(e => e.tags && JSON.stringify(e.tags).includes('Narsapuram'));
console.log('B.N. Road ways:', narsapurWays.length);

// 4. Bhimavaram - Dongapindi Road (DNR College Road)
const dongapindiWays = osm.elements.filter(e => e.tags && JSON.stringify(e.tags).includes('Dongapindi'));
console.log('Dongapindi (DNR) ways:', dongapindiWays.length);

// 5. Bhimavaram - Gudivada Road (J.P. Road)
const gudivadaWays = osm.elements.filter(e => e.tags && JSON.stringify(e.tags).includes('Gudivada'));
console.log('Gudivada (J.P. Road) ways:', gudivadaWays.length);

// 6. Tanuku Road
const tanukuWays = osm.elements.filter(e => e.tags && JSON.stringify(e.tags).includes('Tanuku'));
console.log('Tanuku Road ways:', tanukuWays.length);

// 7. Kovada Road
const kovadaWays = osm.elements.filter(e => e.tags && JSON.stringify(e.tags).includes('Kovada'));
console.log('Kovada Road ways:', kovadaWays.length);
