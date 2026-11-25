const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add script tag in index.html
if (!html.includes('assets/bhimavaram_polling_stations.js')) {
    html = html.replace(
        '<script src="assets/bhimavaram_waterbodies_data.js"></script>',
        '<script src="assets/bhimavaram_waterbodies_data.js"></script>\n  <script src="assets/bhimavaram_polling_stations.js"></script>'
    );
    console.log('Added assets/bhimavaram_polling_stations.js to index.html');
}

// 2. Enhance detailBooths in selectWard
const oldBooths = `      const dBooths = document.getElementById('detailBooths');
      if (dBooths) dBooths.textContent = \`\${ward.booths} పోలింగ్ కేంద్రాలు\`;`;

const newBooths = `      const dBooths = document.getElementById('detailBooths');
      if (dBooths) {
        if (typeof getPollingStationsForWard === 'function') {
          const stList = getPollingStationsForWard(ward.id);
          if (stList && stList.length > 0) {
            const bNos = stList.map(s => s.boothNo);
            const bTxt = bNos.length > 2 ? \`#\${bNos[0]}-\${bNos[bNos.length-1]}\` : \`#\${bNos.join(', #')}\`;
            dBooths.textContent = \`\${stList.length} పోలింగ్ కేంద్రాలు (\${bTxt})\`;
          } else {
            dBooths.textContent = \`\${ward.booths} పోలింగ్ కేంద్రాలు\`;
          }
        } else {
          dBooths.textContent = \`\${ward.booths} పోలింగ్ కేంద్రాలు\`;
        }
      }`;

if (html.includes(oldBooths)) {
    html = html.replace(oldBooths, newBooths);
    console.log('Updated detailBooths in selectWard in index.html');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully!');
