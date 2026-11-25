const fs = require('fs');

let readme = fs.readFileSync('README.md', 'utf8');

readme = readme.replace('1,22,500+ ఓటర్లు', '1,45,737 నమోదిత ఓటర్లు');
readme = readme.replace(
  '1,68,940 మొత్తం జనాభా, 84,200 పురుషులు, 84,740 స్త్రీలు (సగటు లింగ నిష్పత్తి 1006), 44,700 గృహాలు, 1,24,500 ఓటర్లు.',
  '1,68,940 మొత్తం జనాభా, 83,303 పురుషులు, 85,637 స్త్రీలు (సగటు లింగ నిష్పత్తి 1028), 44,691 గృహాలు, 1,45,737 నమోదిత ఓటర్లు.'
);

fs.writeFileSync('README.md', readme, 'utf8');
console.log('README.md updated successfully!');
