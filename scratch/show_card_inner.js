const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');

const idx = html.indexOf('card.innerHTML = `');
console.log(html.substring(idx, idx + 600));
