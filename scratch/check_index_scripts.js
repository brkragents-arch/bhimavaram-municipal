const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const scripts = html.match(/<script[^>]*src=[^>]+>/g) || [];
console.log('index.html scripts:', scripts);

const idx = html.indexOf('function updateWardDetails');
if (idx !== -1) {
    console.log(html.substring(idx, idx + 800));
}
