const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');
const lines = html.split('\n');

for (let i = 5600; i < Math.min(5700, lines.length); i++) {
    console.log(`${i+1}: ${lines[i]}`);
}
