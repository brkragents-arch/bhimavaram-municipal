const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scriptIdx = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  const code = match[1];
  scriptIdx++;
  console.log(`Checking index.html inline script #${scriptIdx} (length: ${code.length})...`);
  try {
    new Function(code);
    console.log(`Script #${scriptIdx} syntax OK!`);
  } catch (e) {
    console.error(`Syntax error in script #${scriptIdx}:`, e.message);
  }
}
