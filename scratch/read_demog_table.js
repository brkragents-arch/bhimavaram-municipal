const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

for (let i = 1350; i < 1400; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
