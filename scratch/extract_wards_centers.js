const fs = require('fs');
const html = fs.readFileSync('elections.html', 'utf8');

// Extract BHIMAVARAM_52_WARDS_DATA
const startMatch = html.match(/var\s+BHIMAVARAM_52_WARDS_DATA\s*=\s*\[/);
if (startMatch) {
    const startIndex = startMatch.index + startMatch[0].length - 1;
    // find end of array
    let depth = 0;
    let endIndex = -1;
    for (let i = startIndex; i < html.length; i++) {
        if (html[i] === '[') depth++;
        else if (html[i] === ']') {
            depth--;
            if (depth === 0) {
                endIndex = i + 1;
                break;
            }
        }
    }
    const jsonStr = html.substring(startIndex, endIndex);
    const wards = eval(jsonStr);
    console.log('Total wards loaded:', wards.length);
    wards.forEach(w => {
        console.log(`Ward ${w.ward}: ${w.nameTe} (${w.nameEn}) | Center: [${w.center[0]}, ${w.center[1]}]`);
    });
}
