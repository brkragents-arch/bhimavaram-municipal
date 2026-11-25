const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');

console.log('--- Lines 445 - 480 ---');
for (let i = 444; i < 480; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}

console.log('--- Lines 985 - 1040 ---');
for (let i = 984; i < 1040; i++) {
  console.log(`${i+1}: ${lines[i]}`);
}
