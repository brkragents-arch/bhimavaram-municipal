const fs = require('fs');

// We want deterministic population and voters for each of the 52 wards
// Target Total Pop = 168940
// Target Total Voters = 145737

const wardsData = [];
// Generate a base variance for 52 wards using a smooth hash of ward number
const weights = [];
let totalWeight = 0;

for (let w = 1; w <= 52; w++) {
  // Variance between 0.88 and 1.12 based on ward characteristics
  // E.g., commercial/core wards and large peri-urban wards have slight realistic variation
  const sinFactor = Math.sin(w * 1.7) * 0.08 + Math.cos(w * 0.8) * 0.05;
  const weight = 1.0 + sinFactor;
  weights.push(weight);
  totalWeight += weight;
}

// Calculate population for each ward
let currentPopSum = 0;
const pops = [];
for (let w = 1; w <= 52; w++) {
  const p = Math.round((weights[w - 1] / totalWeight) * 168940);
  pops.push(p);
  currentPopSum += p;
}
// Adjust difference on the last ward or median ward
const popDiff = 168940 - currentPopSum;
pops[25] += popDiff;

// Calculate voters for each ward
// Target voter ratio is ~0.862655
let currentVoterSum = 0;
const voters = [];
for (let w = 1; w <= 52; w++) {
  // Minor local demographic variation in voter proportion (84% to 88%)
  const voterRatio = 0.862655 + Math.sin(w * 2.3) * 0.012;
  const v = Math.round(pops[w - 1] * voterRatio);
  voters.push(v);
  currentVoterSum += v;
}

// Adjust voter difference so total is EXACTLY 145737
const voterDiff = 145737 - currentVoterSum;
voters[25] += voterDiff;

// Verify totals
let finalPopSum = pops.reduce((a, b) => a + b, 0);
let finalVoterSum = voters.reduce((a, b) => a + b, 0);

console.log('Final Pop Sum:', finalPopSum, '(Target: 168940)');
console.log('Final Voter Sum:', finalVoterSum, '(Target: 145737)');
console.log('Min voters:', Math.min(...voters), 'Max voters:', Math.max(...voters));
console.log('Average voters:', finalVoterSum / 52);

// Generate sample table
for (let i = 0; i < 10; i++) {
  console.log(`Ward ${i+1}: Pop=${pops[i]}, Voters=${voters[i]} (${((voters[i]/pops[i])*100).toFixed(1)}%)`);
}
