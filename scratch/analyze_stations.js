const fs = require('fs');
const rows = JSON.parse(fs.readFileSync('scratch/parsed_docx_table.json', 'utf8'));

console.log('Total rows:', rows.length);
let currentArea = '';
const stations = [];

rows.forEach((r, idx) => {
    if (r[0] && r[0].trim()) {
        currentArea = r[0].trim();
    }
    const boothNo = r[1] ? r[1].trim() : '';
    const location = r[2] ? r[2].trim() : '';
    if (boothNo && !isNaN(parseInt(boothNo))) {
        stations.push({
            index: idx,
            area: currentArea,
            boothNo: parseInt(boothNo),
            location: location
        });
    } else {
        console.log('Skipped / header row:', idx, r);
    }
});

console.log('Total valid stations parsed:', stations.length);
const areas = {};
stations.forEach(s => {
    areas[s.area] = (areas[s.area] || 0) + 1;
});
console.log('Areas breakdown:', areas);
console.log('Booth range:', Math.min(...stations.map(s => s.boothNo)), 'to', Math.max(...stations.map(s => s.boothNo)));

fs.writeFileSync('scratch/parsed_stations.json', JSON.stringify(stations, null, 2), 'utf8');
