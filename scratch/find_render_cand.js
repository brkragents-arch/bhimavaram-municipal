const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');
const lines = html.split('\n');

lines.forEach((l, idx) => {
    if (l.includes('function renderCandidatesList')) {
        console.log('renderCandidatesList at line', idx + 1);
        for (let j = idx; j < Math.min(idx + 140, lines.length); j++) {
            console.log(`${j+1}: ${lines[j]}`);
        }
    }
});
