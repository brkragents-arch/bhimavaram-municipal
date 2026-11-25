const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');

const lines = html.split('\n');
for (let i = 280; i < 350; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
