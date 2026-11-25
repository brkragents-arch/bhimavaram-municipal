const fs = require('fs');

const wardStats = JSON.parse(fs.readFileSync('scratch/ward_stats.json', 'utf8'));

// 1. Update assets/bhimavaram_52_wards_boundaries.js
console.log('--- Updating assets/bhimavaram_52_wards_boundaries.js ---');
let boundFile = fs.readFileSync('assets/bhimavaram_52_wards_boundaries.js', 'utf8');

// Find the array
const arrayStart = boundFile.indexOf('var BHIMAVARAM_52_WARDS_DATA = [');
const arrayEnd = boundFile.indexOf('];', arrayStart);
const dataStr = boundFile.substring(arrayStart + 'var BHIMAVARAM_52_WARDS_DATA = '.length, arrayEnd + 1);
const wardsArr = eval(dataStr);

wardsArr.forEach(w => {
  const s = wardStats[w.ward];
  if (s) {
    w.pop = s.pop;
    w.voters = s.voters;
    w.male = s.male;
    w.female = s.female;
    w.sexRatio = s.sexRatio;
    w.houses = s.houses;
  }
});

const updatedArrayStr = JSON.stringify(wardsArr, null, 2);
boundFile = boundFile.substring(0, arrayStart + 'var BHIMAVARAM_52_WARDS_DATA = '.length) + 
            updatedArrayStr + 
            boundFile.substring(arrayEnd + 1);

// Add stats metadata if not present
if (!boundFile.includes('BHIMAVARAM_MUNICIPALITY_STATS')) {
  boundFile += `\n\nvar BHIMAVARAM_MUNICIPALITY_STATS = {
  totalPopulation: 168940,
  totalVoters: 145737,
  totalMale: 83303,
  totalFemale: 85637,
  totalHouseholds: 44691,
  overallSexRatio: 1028,
  totalWards: 52,
  averageWardVoters: 2803,
  averageWardPopulation: 3249
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BHIMAVARAM_52_WARDS_DATA,
    BHIMAVARAM_MUNICIPALITY_STATS
  };
}
`;
}

fs.writeFileSync('assets/bhimavaram_52_wards_boundaries.js', boundFile, 'utf8');
console.log('assets/bhimavaram_52_wards_boundaries.js updated successfully!');
