const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');
const lines = html.split('\n');
for (let i = 5304; i <= 5335; i++) {
    console.log((i+1) + ': ' + lines[i]);
}
