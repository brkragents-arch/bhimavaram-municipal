const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');

const styleMatch = html.match(/<style[\s\S]*?<\/style>/g) || [];
console.log('Total style tags:', styleMatch.length);
if (styleMatch.length > 0) {
    console.log('Styles sample:', styleMatch[0].slice(0, 1000));
}
