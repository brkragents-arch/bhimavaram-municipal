const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');

const lines = html.split('\n');
console.log('Total lines in elections.html:', lines.length);

lines.forEach((line, idx) => {
    if (line.includes('BHIMAVARAM_') || line.includes('candidate') || line.includes('candidates')) {
        if (idx < 50 || idx > lines.length - 200 || line.includes('const ') || line.includes('var ') || line.includes('let ')) {
            console.log(`Line ${idx + 1}: ${line.trim().slice(0, 100)}`);
        }
    }
});
