const fs = require('fs');
const stations = JSON.parse(fs.readFileSync('scratch/parsed_stations.json', 'utf8'));

console.log('Sample stations:');
stations.forEach((s, idx) => {
    console.log(`[${idx+1}] #${s.boothNo} | ${s.area} | ${s.location}`);
});
