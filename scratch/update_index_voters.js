const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update header stats (lines 135-144)
const headerOld = `        <div class="bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-center hidden md:block">
          <div class="text-slate-400">మొత్తం జనాభా</div>
          <div class="font-bold text-cyan-400 text-sm" id="header-total-pop">1,68,940</div>
        </div>
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-center hidden sm:block">
          <div class="text-slate-400">సగటు వార్డు జనాభా</div>
          <div class="font-bold text-amber-400 text-sm">~3,248</div>
        </div>`;

const headerNew = `        <div class="bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-center hidden md:block">
          <div class="text-slate-400">మొత్తం జనాభా</div>
          <div class="font-bold text-cyan-400 text-sm" id="header-total-pop">1,68,940</div>
        </div>
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-center hidden sm:block">
          <div class="text-slate-400">మొత్తం ఓటర్లు</div>
          <div class="font-bold text-emerald-400 text-sm" id="header-total-voters">1,45,737</div>
        </div>
        <div class="bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-center hidden lg:block">
          <div class="text-slate-400">సగటు వార్డు ఓటర్లు</div>
          <div class="font-bold text-amber-400 text-sm">~2,803</div>
        </div>`;

if (html.includes(headerOld)) {
  html = html.replace(headerOld, headerNew);
  console.log('Updated header stats in index.html');
} else {
  console.log('headerOld not found');
}

// 2. Update side panel card (lines 460-463)
const cardOld = `          <div class="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
            <div class="text-slate-400">మొత్తం ఓటర్లు</div>
            <div class="font-semibold text-cyan-400">~1,24,500 మంది</div>
          </div>`;

const cardNew = `          <div class="bg-slate-950/60 p-2 rounded-lg border border-slate-800">
            <div class="text-slate-400">మొత్తం ఓటర్లు</div>
            <div class="font-semibold text-cyan-400">1,45,737 మంది</div>
          </div>`;

if (html.includes(cardOld)) {
  html = html.replace(cardOld, cardNew);
  console.log('Updated side panel total voters to 1,45,737 మంది in index.html');
} else {
  console.log('cardOld not found');
}

// 3. Update demographic calculation in index.html
const demogOld = `      // Demographic calculation
      const popBase = 2800 + ((w.ward * 113) % 1200);
      const male = Math.round(popBase * 0.495);
      const female = popBase - male;
      const sexRatio = Math.round((female / male) * 1000);
      const houses = Math.round(popBase / 3.8);
      const voters = Math.round(popBase * 0.73);
      const booths = Math.max(3, Math.min(5, Math.ceil(voters / 700)));`;

const demogNew = `      // Official Ward Demographic & Voter Statistics (Total Pop: 1,68,940 | Total Voters: 1,45,737)
      const popBase = w.pop || (2800 + ((w.ward * 113) % 1200));
      const male = w.male || Math.round(popBase * 0.493);
      const female = w.female || (popBase - male);
      const sexRatio = w.sexRatio || Math.round((female / male) * 1000);
      const houses = w.houses || Math.round(popBase / 3.78);
      const voters = w.voters || Math.round(popBase * 0.862655);
      const booths = Math.max(2, Math.min(6, Math.ceil(voters / 750)));`;

if (html.includes(demogOld)) {
  html = html.replace(demogOld, demogNew);
  console.log('Updated demographic calculation in index.html');
} else {
  console.log('demogOld not found');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html saved successfully!');
