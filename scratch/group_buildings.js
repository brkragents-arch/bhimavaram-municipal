const fs = require('fs');
const stations = JSON.parse(fs.readFileSync('scratch/parsed_stations.json', 'utf8'));

// Group by building
const buildings = {};

stations.forEach(s => {
    // Clean up location to find base building name
    let loc = s.location;
    // Normalize building key
    let buildingName = loc
        .replace(/,Northern\s*side.*$/i, '')
        .replace(/,Southern\s*side.*$/i, '')
        .replace(/,Eastern\s*side.*$/i, '')
        .replace(/,Western\s*side.*$/i, '')
        .replace(/,North-Western\s*side.*$/i, '')
        .replace(/,South-Eastern\s*side.*$/i, '')
        .replace(/,Room\s*No.*$/i, '')
        .replace(/,.*Room.*$/i, '')
        .trim();
    
    if (!buildings[buildingName]) {
        buildings[buildingName] = {
            area: s.area,
            rawNames: new Set(),
            booths: [],
            stations: []
        };
    }
    buildings[buildingName].rawNames.add(loc);
    buildings[buildingName].booths.push(s.boothNo);
    buildings[buildingName].stations.push(s);
});

console.log('Unique building groups:', Object.keys(buildings).length);
for (let b in buildings) {
    console.log(`[${buildings[b].area}] ${b} -> Booths (${buildings[b].booths.length}): ${buildings[b].booths.join(', ')}`);
}
