const fs = require('fs');
const html = fs.readFileSync('ward-boundaries.html', 'utf8');

const regex = /on[a-z]+\s*=\s*"([^"]+)"/gi;
const handlers = new Set();
let match;
while ((match = regex.exec(html)) !== null) {
  handlers.add(match[1].trim());
}

console.log('HTML event handlers found:');
for (const h of handlers) {
  console.log(' - ' + h);
}
