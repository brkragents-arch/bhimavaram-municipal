const fs = require('fs');
const { getPollingStationsForWard } = require('../assets/bhimavaram_polling_stations.js');

const wardBooths = {};
for (let w = 1; w <= 52; w++) {
  const st = getPollingStationsForWard(w);
  wardBooths[w] = st.length;
}

console.log('Booths per ward (1 to 52):', wardBooths);
let totalBoothAssignments = Object.values(wardBooths).reduce((a, b) => a + b, 0);
console.log('Total booth assignments across wards:', totalBoothAssignments);
