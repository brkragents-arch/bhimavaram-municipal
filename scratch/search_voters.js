const fs = require('fs');
const path = require('path');

function searchInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === '.git' || f === 'scratch' || f === '.gemini') continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      searchInDir(full);
    } else if (f.endsWith('.js') || f.endsWith('.html') || f.endsWith('.json') || f.endsWith('.geojson')) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        if (l.includes('ఓటర్లు') || l.includes('voters') || l.includes('Voters') || l.includes('నమోదిత ఓట్లు') || l.includes('1,24,500') || l.includes('124500')) {
          if (!l.includes('svg') && !l.includes('d="M') && l.length < 300) {
            console.log(`${full}:${idx+1}: ${l.trim()}`);
          }
        }
      });
    }
  }
}

searchInDir('.');
