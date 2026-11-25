const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');
console.log('elections.html length:', html.length);

const scripts = html.match(/<script[^>]*src=[^>]+>/g) || [];
console.log('Script tags:', scripts);

// Look for functions related to map or selection
const fnMatches = html.match(/function\s+([a-zA-Z0-9_]+)\s*\(/g) || [];
console.log('Functions found:', fnMatches.slice(0, 30));

// Find map controls or toolbar
const idxMap = html.indexOf('L.map(');
if (idxMap !== -1) {
    console.log('L.map context:', html.substring(idxMap - 100, idxMap + 300));
}

// Find candidate card or sidebar rendering
const idxRender = html.indexOf('renderElectionWardPolygons');
if (idxRender !== -1) {
    console.log('renderElectionWardPolygons found at:', idxRender);
}
const idxSelect = html.indexOf('function selectElectionWard');
if (idxSelect !== -1) {
    console.log('selectElectionWard found at:', idxSelect);
    console.log(html.substring(idxSelect, idxSelect + 600));
}
