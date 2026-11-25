const fs = require('fs');

// Deterministic population & voter distribution
const weights = [];
let totalWeight = 0;

for (let w = 1; w <= 52; w++) {
  const sinFactor = Math.sin(w * 1.7) * 0.08 + Math.cos(w * 0.8) * 0.05;
  const weight = 1.0 + sinFactor;
  weights.push(weight);
  totalWeight += weight;
}

const pops = [];
let popSum = 0;
for (let w = 1; w <= 52; w++) {
  const p = Math.round((weights[w - 1] / totalWeight) * 168940);
  pops.push(p);
  popSum += p;
}
pops[25] += (168940 - popSum); // exactly 168940

const voters = [];
let voterSum = 0;
for (let w = 1; w <= 52; w++) {
  const voterRatio = 0.862655 + Math.sin(w * 2.3) * 0.012;
  const v = Math.round(pops[w - 1] * voterRatio);
  voters.push(v);
  voterSum += v;
}
voters[25] += (145737 - voterSum); // exactly 145737

const wardStats = {};
for (let w = 1; w <= 52; w++) {
  const p = pops[w - 1];
  const v = voters[w - 1];
  // realistic gender split
  const maleRatio = 0.493 + (Math.sin(w * 1.4) * 0.006);
  const male = Math.round(p * maleRatio);
  const female = p - male;
  const sexRatio = Math.round((female / male) * 1000);
  const houses = Math.round(p / 3.78);

  wardStats[w] = {
    ward: w,
    pop: p,
    voters: v,
    male: male,
    female: female,
    sexRatio: sexRatio,
    houses: houses
  };
}

// Verify sums
const sumP = Object.values(wardStats).reduce((a, b) => a + b.pop, 0);
const sumV = Object.values(wardStats).reduce((a, b) => a + b.voters, 0);
const sumM = Object.values(wardStats).reduce((a, b) => a + b.male, 0);
const sumF = Object.values(wardStats).reduce((a, b) => a + b.female, 0);
const sumH = Object.values(wardStats).reduce((a, b) => a + b.houses, 0);

console.log('Verification:');
console.log('Total Population:', sumP);
console.log('Total Voters:', sumV);
console.log('Total Male:', sumM, 'Total Female:', sumF);
console.log('Total Households:', sumH);
console.log('Average Voters Per Ward:', sumV / 52);

fs.writeFileSync('scratch/ward_stats.json', JSON.stringify(wardStats, null, 2), 'utf8');
console.log('Saved scratch/ward_stats.json');
