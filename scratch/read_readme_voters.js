const fs = require('fs');
const readme = fs.readFileSync('README.md', 'utf8');

const lines = readme.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('1,24,500') || l.includes('124500') || l.includes('ఓటర్లు') || l.includes('voter') || l.includes('Voter')) {
    console.log(`${idx+1}: ${l}`);
  }
});
