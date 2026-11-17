const fs = require('fs');
eval(fs.readFileSync('assets/bhimavaram_52_wards_boundaries.js', 'utf8'));
eval(fs.readFileSync('assets/bhimavaram_election_candidates.js', 'utf8'));

// Attach candidates to wards data
BHIMAVARAM_52_WARDS_DATA.forEach(w => {
  w.candidate = BHIMAVARAM_ELECTION_CANDIDATES[w.ward] || null;
});

function parseSearchQuery(rawQuery) {
  let q = (rawQuery || '').trim();
  if (!q) return null;

  const qLower = q.toLowerCase();

  // 1. Check if user typed "ward X", "w X", "wX", "వార్డు X", "వార్డ్ X", "వార్డు నం X", "వార్డునం X", etc.
  const wardRegex = /^(?:ward|w|వార్డు|వార్డ్|వార్డు\s*నం|వార్డు\s*నెంబర్|వార్డునం|వార్డునెం)\s*[:#-]?\s*(\d+)$/i;
  const wardMatch = q.match(wardRegex);
  if (wardMatch) {
    const num = parseInt(wardMatch[1], 10);
    return { type: 'ward_number', value: num };
  }

  // 2. Pure number
  if (/^\d+$/.test(q)) {
    const num = parseInt(q, 10);
    return { type: 'numeric', value: num, str: q };
  }

  // 3. RS number: "RS 651", "RS.651", "RS-651", "rs651", "ఆర్.ఎస్ 651", etc.
  const rsRegex = /^(?:rs|r\.s|r\.s\.|ఆర్\.ఎస్|ఆర్ఎస్|ఆర్\s*ఎస్)\s*[:#.-]?\s*(\d+(?:\/\d+)?)$/i;
  const rsMatch = q.match(rsRegex);
  if (rsMatch) {
    return { type: 'rs_number', value: rsMatch[1] };
  }

  // 4. Door number: "D.No 5-10", "DNo 5-10", "5-10-1", etc.
  const dnoClean = q.replace(/^(?:d\.?no\.?|డోర్\s*నం\.?)\s*/i, '').trim();
  if (/\d+-\d+/.test(dnoClean)) {
    return { type: 'dno', value: dnoClean.toLowerCase() };
  }

  // 5. Text search
  return { type: 'text', value: qLower, raw: q };
}

function matchWard(w, parsed) {
  if (!parsed) return true;

  if (parsed.type === 'ward_number') {
    return w.ward === parsed.value;
  }

  if (parsed.type === 'numeric') {
    // If 1..52, match exact ward number or exact RS number
    if (parsed.value >= 1 && parsed.value <= 52 && w.ward === parsed.value) {
      return true;
    }
    if (w.rsNos && w.rsNos.some(rs => rs.toString() === parsed.str)) {
      return true;
    }
    // If > 52, also check door numbers
    if (parsed.value > 52 && w.dNos && w.dNos.some(d => d.includes(parsed.str))) {
      return true;
    }
    return false;
  }

  if (parsed.type === 'rs_number') {
    return w.rsNos && w.rsNos.some(rs => rs.toString() === parsed.value);
  }

  if (parsed.type === 'dno') {
    return w.dNos && w.dNos.some(d => d.toLowerCase().includes(parsed.value));
  }

  if (parsed.type === 'text') {
    const q = parsed.value;
    
    // Synonyms
    let qVariants = [q];
    if (q.includes('రాయలం')) qVariants.push('rayalam', 'రాయలవరం');
    if (q.includes('rayalam')) qVariants.push('రాయలం', 'రాయలవరం');
    if (q.includes('చినమిరం')) qVariants.push('chinamiram', 'చినఅమిరం');
    if (q.includes('chinamiram')) qVariants.push('చినమిరం', 'chinamiram');
    if (q.includes('గుణుపూడి')) qVariants.push('gunupudi');
    if (q.includes('gunupudi')) qVariants.push('గుణుపూడి');
    if (q.includes('వన్ టౌన్')) qVariants.push('one town');
    if (q.includes('one town')) qVariants.push('వన్ టౌన్');
    if (q.includes('టూ టౌన్')) qVariants.push('two town');
    if (q.includes('two town')) qVariants.push('టూ టౌన్');
    if (q === 'jsp' || q === 'జనసేన') qVariants.push('jsp', 'janasena', 'జనసేన');
    if (q === 'tdp' || q === 'తెలుగుదేశం') qVariants.push('tdp', 'telugudesam', 'తెలుగుదేశం');

    return qVariants.some(term => {
      const inName = (w.nameEn && w.nameEn.toLowerCase().includes(term)) || (w.nameTe && w.nameTe.toLowerCase().includes(term));
      const inZone = w.zone && w.zone.toLowerCase().includes(term);
      const inVillages = w.revenueVillages && w.revenueVillages.some(v => v.toLowerCase().includes(term));
      const inLandmarks = w.landmarks && w.landmarks.some(l => l.toLowerCase().includes(term));
      const inDnos = w.dNos && w.dNos.some(d => d.toLowerCase().includes(term));
      const inCandidate = w.candidate && (
        (w.candidate.candidateTe && w.candidate.candidateTe.toLowerCase().includes(term)) ||
        (w.candidate.candidateEn && w.candidate.candidateEn.toLowerCase().includes(term)) ||
        (w.candidate.party && w.candidate.party.toLowerCase() === term)
      );
      const inText = (term.length >= 4) && (
        (w.north && w.north.toLowerCase().includes(term)) ||
        (w.east && w.east.toLowerCase().includes(term)) ||
        (w.south && w.south.toLowerCase().includes(term)) ||
        (w.west && w.west.toLowerCase().includes(term))
      );
      return inName || inZone || inVillages || inLandmarks || inDnos || inCandidate || inText;
    });
  }

  return false;
}

const testCases = [
  '1', '2', '5', '52',
  'ward 1', 'Ward 1', 'వార్డు 1', 'వార్డు 5', 'వార్డ్ 12', 'w1', 'w 52', 'వార్డు నం 1',
  '651', '302', '100', 'RS 651', 'rs302', 'RS. 100', 'RS-651', 'ఆర్.ఎస్ 302',
  'Govindarao', 'రాయలం', 'Rayalam', 'Gunupudi', 'గుణుపూడి', 'One Town', 'Two Town',
  '5-10', 'D.No 5-10', '5-10-1',
  'లీలా మాధవి', 'రెహమాన్', 'రవీంద్రనాథ్', 'JSP', 'TDP', 'జనసేన', 'తెలుగుదేశం'
];

let failed = 0;
testCases.forEach(tc => {
  const parsed = parseSearchQuery(tc);
  const matched = BHIMAVARAM_52_WARDS_DATA.filter(w => matchWard(w, parsed));
  if (matched.length === 0) {
    console.error('❌ ZERO MATCHES for: ' + tc);
    failed++;
  } else {
    console.log('✅ ' + tc + ' => ' + matched.length + ' matches [' + matched.map(w => w.ward).slice(0, 5).join(', ') + (matched.length > 5 ? '...' : '') + ']');
  }
});

console.log('\nTotal test cases: ' + testCases.length + ', Failed: ' + failed);
