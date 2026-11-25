const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const matches = html.match(/పోలింగ్[^<]*/g) || [];
console.log('index.html polling matches:', matches);

// Check where polling booths are updated in selectWard
const idx = html.indexOf('పోలింగ్');
if (idx !== -1) {
    console.log(html.substring(idx - 100, idx + 300));
}
