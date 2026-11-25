const fs = require('fs');

const wardStats = JSON.parse(fs.readFileSync('scratch/ward_stats.json', 'utf8'));

let html = fs.readFileSync('elections.html', 'utf8');

// 1. Update embedded BHIMAVARAM_52_WARDS_DATA
const arrayStart = html.indexOf('var BHIMAVARAM_52_WARDS_DATA = [');
const arrayEnd = html.indexOf('];', arrayStart);
const dataStr = html.substring(arrayStart + 'var BHIMAVARAM_52_WARDS_DATA = '.length, arrayEnd + 1);
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
html = html.substring(0, arrayStart + 'var BHIMAVARAM_52_WARDS_DATA = '.length) + 
       updatedArrayStr + 
       html.substring(arrayEnd + 1);
console.log('Updated embedded BHIMAVARAM_52_WARDS_DATA in elections.html');

// 2. Add total voters badge in header
const headerBadgeTarget = `<span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              మౌస్ హోవర్ వీక్షణ (Hover)
            </span>`;

const headerBadgeNew = `<span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
              <span>👥</span> మొత్తం ఓటర్లు: 1,45,737
            </span>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              మౌస్ హోవర్ వీక్షణ (Hover)
            </span>`;

if (html.includes(headerBadgeTarget) && !html.includes('మొత్తం ఓటర్లు: 1,45,737')) {
  html = html.replace(headerBadgeTarget, headerBadgeNew);
  console.log('Added total voters badge in header of elections.html');
}

// 3. Add voter info to showWardHoverPreview
const hoverTarget = `        <div class="text-[10px] text-slate-400 pt-1 flex items-center justify-between border-t border-slate-800">
          <span>ప్రాంతం: \${ward.zone}</span>
          <span class="text-cyan-400 font-medium">క్లిక్ చేసి పూర్తి వివరాలు చూడండి ➔</span>
        </div>`;

const hoverNew = `        <div class="py-1 px-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
          <span>👥 నమోదిత ఓటర్లు: <strong class="text-amber-300 font-mono font-bold">\${(ward.voters || 2803).toLocaleString('en-IN')}</strong> మంది</span>
          <span class="text-slate-400 text-[10px]">జనాభా: \${(ward.pop || 3249).toLocaleString('en-IN')}</span>
        </div>

        <div class="text-[10px] text-slate-400 pt-1 flex items-center justify-between border-t border-slate-800">
          <span>ప్రాంతం: \${ward.zone}</span>
          <span class="text-cyan-400 font-medium">క్లిక్ చేసి పూర్తి వివరాలు చూడండి ➔</span>
        </div>`;

if (html.includes(hoverTarget)) {
  html = html.replace(hoverTarget, hoverNew);
  console.log('Added voter count to showWardHoverPreview in elections.html');
}

// 4. Update sidebar candidate card
const cardTarget = `          <div class="mt-1.5 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
            <span>\${w.zone}</span>
            <span class="text-amber-400 font-semibold">మ్యాప్‌లో వీక్షించండి ➔</span>
          </div>`;

const cardNew = `          <div class="mt-1.5 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
            <span>👥 ఓటర్లు: <strong class="text-amber-300 font-mono font-bold">\${(w.voters || 2803).toLocaleString('en-IN')}</strong></span>
            <span class="text-amber-400 font-semibold">మ్యాప్‌లో చూడు ➔</span>
          </div>`;

if (html.includes(cardTarget)) {
  html = html.replace(cardTarget, cardNew);
  console.log('Added voter count to candidate card in elections.html');
}

fs.writeFileSync('elections.html', html, 'utf8');
fs.copyFileSync('elections.html', 'bhimavaram-elections.html');
console.log('elections.html and bhimavaram-elections.html saved successfully!');
