const https = require('https');
const fs = require('fs');

// Bounding box for Bhimavaram Municipality:
// south, west, north, east: 16.515, 81.490, 16.575, 81.560
const query = `[out:json][timeout:30];
(
  way["highway"~"trunk|primary|secondary|tertiary|residential|unclassified"](16.515,81.490,16.575,81.560);
);
out geom;`;

console.log('Fetching exact road vectors from Overpass API for Bhimavaram...');

const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);

const req = https.get(url, { headers: { 'User-Agent': 'BhimavaramTrafficPlanner/1.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('Overpass response elements count:', json.elements ? json.elements.length : 0);
      if (json.elements && json.elements.length > 0) {
        fs.writeFileSync('scratch/bhimavaram_osm_roads.json', JSON.stringify(json, null, 2), 'utf8');
        console.log('Saved scratch/bhimavaram_osm_roads.json successfully!');
      } else {
        console.log('No elements found or empty response:', data.slice(0, 200));
      }
    } catch(e) {
      console.error('JSON parse error:', e.message, 'Preview:', data.slice(0, 200));
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});
