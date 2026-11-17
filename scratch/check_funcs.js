const fs = require('fs');
const html = fs.readFileSync('ward-boundaries.html', 'utf8');

const funcsToCheck = [
  'openRsRegistryModal',
  'closeRsRegistryModal',
  'setMobileView',
  'handleSearch',
  'clearSearch',
  'filterByZone',
  'toggleExpandAll',
  'openSourceInfoModal',
  'closeSourceInfoModal',
  'fitAllWardsBounds',
  'setBaseLayer',
  'filterRsTable',
  'selectWard',
  'searchRs',
  'toggleWardExpand',
  'copyWardText',
  'searchRsFromModal'
];

funcsToCheck.forEach(fn => {
  const exists = html.includes('function ' + fn);
  console.log(fn + ': ' + (exists ? 'EXISTS' : 'MISSING!'));
});
