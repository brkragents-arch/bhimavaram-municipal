const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');

// Find map toolbar buttons
const mapMatch = html.match(/<div class="[^"]*absolute[^"]*z-\[1000\][^"]*"[\s\S]*?<\/div>/g) || [];
console.log('Floating divs found:', mapMatch.length);
mapMatch.forEach((m, idx) => {
    console.log(`Div ${idx}:`, m.slice(0, 200).replace(/\n/g, ' '));
});

// Also find the buttons in map area
const btnMatches = html.match(/<button[^>]*>[\s\S]*?<\/button>/g) || [];
console.log('Total buttons in page:', btnMatches.length);
btnMatches.filter(b => b.includes('setBaseLayer') || b.includes('fitAllWards') || b.includes('layer') || b.includes('పటం')).slice(0, 10).forEach(b => {
    console.log('Map button:', b.replace(/\s+/g, ' ').slice(0, 150));
});
