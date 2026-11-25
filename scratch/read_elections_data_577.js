const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');
const lines = html.split('\n');

for (let i = 570; i < 600; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
