const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');
const lines = html.split('\n');
for (let i = 5350; i <= 5375; i++) {
    console.log((i+1) + ': ' + lines[i]);
}
