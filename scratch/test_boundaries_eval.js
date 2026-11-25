const fs = require('fs');

// Test that assets/bhimavaram_52_wards_boundaries.js evaluates cleanly
const boundCode = fs.readFileSync('assets/bhimavaram_52_wards_boundaries.js', 'utf8');
const sandbox = {};
eval(boundCode);

console.log('Total wards in BHIMAVARAM_52_WARDS_DATA:', BHIMAVARAM_52_WARDS_DATA.length);
let sumPop = 0;
let sumVoters = 0;
BHIMAVARAM_52_WARDS_DATA.forEach(w => {
  sumPop += w.pop;
  sumVoters += w.voters;
});

console.log('Calculated Sum Pop:', sumPop, '(Expected 168940)');
console.log('Calculated Sum Voters:', sumVoters, '(Expected 145737)');
console.log('Metadata Total Voters:', BHIMAVARAM_MUNICIPALITY_STATS.totalVoters);
console.log('Metadata Total Population:', BHIMAVARAM_MUNICIPALITY_STATS.totalPopulation);

if (sumPop === 168940 && sumVoters === 145737) {
  console.log('PERFECT! Both population and voter statistics match exactly.');
} else {
  console.error('MISMATCH!');
  process.exit(1);
}
