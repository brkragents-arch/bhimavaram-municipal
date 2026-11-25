const fs = require('fs');

let totalPop = 0;
let totalVoters = 0;
const wardVoters = [];

for (let ward = 1; ward <= 52; ward++) {
  const popBase = 2800 + ((ward * 113) % 1200);
  const male = Math.round(popBase * 0.495);
  const female = popBase - male;
  const voters = Math.round(popBase * 0.73);
  totalPop += popBase;
  totalVoters += voters;
  wardVoters.push({ ward, pop: popBase, voters });
}

console.log('Current total population:', totalPop);
console.log('Current total voters:', totalVoters);
console.log('Target total voters:', 145737);
