const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');

const idx = html.indexOf('top-3 left-3 right-3');
if (idx !== -1) {
    console.log(html.substring(idx - 50, idx + 1200));
}
