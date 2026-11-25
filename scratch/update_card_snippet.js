const fs = require('fs');

let html = fs.readFileSync('elections.html', 'utf8');

const targetSnippet = `          <div class="mt-2 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
            <span>\${w.zone}</span>
            <span class="text-amber-400 font-semibold">మ్యాప్‌లో వీక్షించండి ➔</span>
          </div>`;

const replacementSnippet = `          \${(function() {
            if (typeof getPollingStationsForWard !== 'function') return '';
            const stList = getPollingStationsForWard(w.ward);
            if (!stList || stList.length === 0) return '';
            const boothNos = stList.map(s => s.boothNo);
            const bText = boothNos.length > 2 ? \`#\${boothNos[0]}-\${boothNos[boothNos.length-1]}\` : \`#\${boothNos.join(', #')}\`;
            return \`
              <div class="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <div class="text-slate-300 truncate flex items-center gap-1 min-w-0 pr-1">
                  <span class="text-xs text-emerald-400">🗳️</span>
                  <span class="truncate telugu-font text-slate-200 text-[11px] font-medium">\${stList[0].buildingNameTe}</span>
                </div>
                <span class="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-mono font-bold text-[10px] whitespace-nowrap shadow-sm">
                  బూత్ \${bText}
                </span>
              </div>
            \`;
          })()}

          <div class="mt-1.5 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
            <span>\${w.zone}</span>
            <span class="text-amber-400 font-semibold">మ్యాప్‌లో వీక్షించండి ➔</span>
          </div>`;

if (html.includes(targetSnippet)) {
    html = html.replace(targetSnippet, replacementSnippet);
    fs.writeFileSync('elections.html', html, 'utf8');
    console.log('Successfully updated card polling station snippet in elections.html!');
} else {
    console.log('Target snippet not found in elections.html');
}
