const fs = require('fs');
eval(fs.readFileSync('assets/bhimavaram_52_wards_boundaries.js', 'utf8'));

function parseSearchQuery(rawQuery) {
  let q = (rawQuery || '').trim();
  if (!q) return null;

  const qLower = q.toLowerCase();

  const wardRegex = /^(?:ward|w|వార్డు|వార్డ్|వార్డు నం|వార్డు నెంబర్|వార్డునం|వార్డునెం)\s*[:#-]?\s*(\d+)$/i;
  const wardMatch = q.match(wardRegex);
  if (wardMatch) {
    return { type: 'ward_number', value: parseInt(wardMatch[1], 10) };
  }

  if (/^\d+$/.test(q)) {
    return { type: 'numeric', value: parseInt(q, 10), str: q };
  }

  const rsRegex = /^(?:rs|r\.s|r\.s\.|ఆర్\.ఎస్|ఆర్ఎస్|ఆర్ ఎస్)\s*[:#-]?\s*(\d+(?:\/\d+)?)$/i;
  const rsMatch = q.match(rsRegex);
  if (rsMatch) {
    return { type: 'rs_number', value: rsMatch[1] };
  }

  return { type: 'text', value: qLower, raw: q };
}

function matchWard(w, parsed) {
  if (!parsed) return true;

  if (parsed.type === 'ward_number') {
    return w.ward === parsed.value;
  }

  if (parsed.type === 'numeric') {
    if (parsed.value >= 1 && parsed.value <= 52 && w.ward === parsed.value) {
      return true;
    }
    if (w.rsNos && w.rsNos.some(rs => rs.toString() === parsed.str)) {
      return true;
    }
    if (w.dNos && w.dNos.some(d => d.includes(parsed.str))) {
      return true;
    }
    return false;
  }

  if (parsed.type === 'rs_number') {
    return w.rsNos && w.rsNos.some(rs => rs.toString() === parsed.value);
  }

  if (parsed.type === 'text') {
    const q = parsed.value;
    
    // Synonyms
    let qVariants = [q];
    if (q.includes('రాయలం')) qVariants.push('rayalam', 'రాయలవరం');
    if (q.includes('rayalam')) qVariants.push('రాయలం', 'రాయలవరం');
    if (q.includes('చినమిరం')) qVariants.push('chinamiram', 'చినఅమిరం');
    if (q.includes('chinamiram')) qVariants.push('చినమిరం');
    if (q.includes('గుణుపూడి')) qVariants.push('gunupudi');
    if (q.includes('gunupudi')) qVariants.push('గుణుపూడి');
    if (q.includes('వన్ టౌన్')) qVariants.push('one town');
    if (q.includes('one town')) qVariants.push('వన్ టౌన్');
    if (q.includes('టూ టౌన్')) qVariants.push('two town');
    if (q.includes('two town')) qVariants.push('టూ టౌన్');

    return qVariants.some(term => {
      const inName = (w.nameEn && w.nameEn.toLowerCase().includes(term)) || (w.nameTe && w.nameTe.toLowerCase().includes(term));
      const inZone = w.zone && w.zone.toLowerCase().includes(term);
      const inVillages = w.revenueVillages && w.revenueVillages.some(v => v.toLowerCase().includes(term));
      const inLandmarks = w.landmarks && w.landmarks.some(l => l.toLowerCase().includes(term));
      const inDnos = w.dNos && w.dNos.some(d => d.toLowerCase().includes(term));
      const inText = (term.length >= 4) && (
        (w.north && w.north.toLowerCase().includes(term)) ||
        (w.east && w.east.toLowerCase().includes(term)) ||
        (w.south && w.south.toLowerCase().includes(term)) ||
        (w.west && w.west.toLowerCase().includes(term))
      );
      return inName || inZone || inVillages || inLandmarks || inDnos || inText;
    });
  }

  return false;
}

const queries = [
  '1', '2', '5', '52',
  'ward 1', 'Ward 1', 'వార్డు 1', 'వార్డు 5', 'వార్డ్ 12', 'w1', 'w 52',
  '651', '302', '100', 'RS 651', 'rs302', 'RS. 100',
  'Govindarao', 'రాయలం', 'Rayalam', 'Gunupudi', 'గుణుపూడి', 'One Town', 'Two Town',
  'D.No 5-10', 'రైల్వే'
];

queries.forEach(q => {
  const parsed = parseSearchQuery(q);
  const matched = BHIMAVARAM_52_WARDS_DATA.filter(w => matchWard(w, parsed));
  console.log('Query: ' + q + ' => ' + matched.length + ' matches: [' + matched.map(w => w.ward).join(', ') + ']');
});
