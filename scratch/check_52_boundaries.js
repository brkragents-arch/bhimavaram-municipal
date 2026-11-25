const fs = require('fs');
const code = fs.readFileSync('assets/bhimavaram_52_wards_boundaries.js', 'utf8');

// Check sample ward object
const idx = code.indexOf('BHIMAVARAM_52_WARDS_BOUNDARIES');
console.log(code.substring(idx, idx + 400));
