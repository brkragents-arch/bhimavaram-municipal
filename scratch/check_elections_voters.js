const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');

const matches = [];
const lines = html.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('1,68,940') || l.includes('జనాభా') || l.includes('ఓటర్') || l.includes('ఓట్లు') || l.includes('voter') || l.includes('Voter')) {
    if (l.length < 250) {
      matches.push(`${idx+1}: ${l.trim()}`);
    }
  }
});

console.log('elections.html matches count:', matches.length);
matches.slice(0, 30).forEach(m => console.log(m));
