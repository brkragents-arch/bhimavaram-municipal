const fs = require('fs');

const files = [
  'index.html',
  'elections.html',
  'bhimavaram-elections.html',
  'bhimavaram-ward-boundaries.html',
  'ward-boundaries.html',
  'gis-ward-map.html',
  'assets/bhimavaram_52_wards_boundaries.js',
  'assets/bhimavaram_39_wards_data.js',
  'assets/bhimavaram_52_wards.geojson',
  'README.md'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    const has124 = content.includes('1,24,500') || content.includes('124500') || content.includes('124,500');
    const hasVoters = content.includes('voters') || content.includes('Voters') || content.includes('ఓటర్లు');
    console.log(`${f}: has124=${has124}, hasVoters=${hasVoters}`);
  }
});
