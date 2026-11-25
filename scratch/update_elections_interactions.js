const fs = require('fs');

let html = fs.readFileSync('elections.html', 'utf8');

// 1. Update showWardHoverPreview
const hoverTarget = `        <div class="text-[10px] text-slate-400 pt-1 flex items-center justify-between border-t border-slate-800">
          <span>ప్రాంతం: \${ward.zone}</span>
          <span class="text-cyan-400 font-medium">క్లిక్ చేసి పూర్తి వివరాలు చూడండి ➔</span>
        </div>`;

const hoverReplacement = `        \${(function() {
          if (typeof getPollingStationsForWard !== 'function') return '';
          const stList = getPollingStationsForWard(ward.ward);
          if (!stList || stList.length === 0) return '';
          const boothNos = stList.map(s => s.boothNo);
          const bText = boothNos.length > 2 ? \`#\${boothNos[0]}-\${boothNos[boothNos.length-1]}\` : \`#\${boothNos.join(', #')}\`;
          return \`
            <div class="mt-2 p-2 rounded-xl bg-emerald-950/40 border border-emerald-700/60 flex items-center justify-between text-xs">
              <div class="min-w-0 flex-1">
                <div class="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span>🗳️ పోలింగ్ కేంద్రం:</span>
                </div>
                <div class="text-xs text-white font-bold telugu-font truncate">
                  \${stList[0].buildingNameTe}
                </div>
              </div>
              <span class="ml-2 px-2 py-0.5 rounded bg-emerald-600 text-white text-[11px] font-mono font-extrabold shadow-sm whitespace-nowrap">
                బూత్ \${bText}
              </span>
            </div>
          \`;
        })()}

        <div class="text-[10px] text-slate-400 pt-1 flex items-center justify-between border-t border-slate-800">
          <span>ప్రాంతం: \${ward.zone}</span>
          <span class="text-cyan-400 font-medium">క్లిక్ చేసి పూర్తి వివరాలు చూడండి ➔</span>
        </div>`;

if (html.includes(hoverTarget)) {
    html = html.replace(hoverTarget, hoverReplacement);
    console.log('Updated showWardHoverPreview with polling station preview');
}

// 2. Update selectElectionWard to highlight polling station markers
const selectTarget = `      if (poly && centerMap) {
        map.fitBounds(poly.getBounds(), {
          padding: [50, 50],
          maxZoom: 16,
          animate: true,
          duration: 0.8
        });
        showWardHoverPreview(wardNum, { containerPoint: { x: window.innerWidth / 2, y: window.innerHeight / 2 } });
      }

      highlightSidebarCard(wardNum);`;

const selectReplacement = `      if (poly && centerMap) {
        map.fitBounds(poly.getBounds(), {
          padding: [50, 50],
          maxZoom: 16,
          animate: true,
          duration: 0.8
        });
        showWardHoverPreview(wardNum, { containerPoint: { x: window.innerWidth / 2, y: window.innerHeight / 2 } });
      }

      // Highlight assigned polling station markers
      document.querySelectorAll('.ps-marker-pin').forEach(el => el.classList.remove('ps-active'));
      if (typeof getPollingClustersForWard === 'function') {
        const assignedClusters = getPollingClustersForWard(wardNum);
        assignedClusters.forEach(cl => {
          const pinEl = document.getElementById(\`ps-marker-\${cl.id}\`);
          if (pinEl) pinEl.classList.add('ps-active');
          const m = pollingStationMarkers[cl.id];
          if (m && isPollingStationsVisible) {
            // Optional: open popup of first assigned campus if centered
            // m.openPopup();
          }
        });
      }

      highlightSidebarCard(wardNum);`;

if (html.includes(selectTarget)) {
    html = html.replace(selectTarget, selectReplacement);
    console.log('Updated selectElectionWard with polling station marker highlighting');
}

// 3. Update search filter in renderCandidatesList
const searchOld = `          const matchWard = w.ward.toString() === q;
          const matchName = w.nameEn.toLowerCase().includes(q) || w.nameTe.toLowerCase().includes(q);
          const matchCandTe = w.candidate && w.candidate.candidateTe.toLowerCase().includes(q);
          const matchCandEn = w.candidate && w.candidate.candidateEn.toLowerCase().includes(q);
          return matchWard || matchName || matchCandTe || matchCandEn;`;

const searchNew = `          const matchWard = w.ward.toString() === q;
          const matchName = w.nameEn.toLowerCase().includes(q) || w.nameTe.toLowerCase().includes(q);
          const matchCandTe = w.candidate && w.candidate.candidateTe.toLowerCase().includes(q);
          const matchCandEn = w.candidate && w.candidate.candidateEn.toLowerCase().includes(q);
          const stations = (typeof getPollingStationsForWard === 'function') ? getPollingStationsForWard(w.ward) : [];
          const matchBooth = stations.some(s => s.boothNo.toString() === q);
          const matchStation = stations.some(s => 
            s.buildingName.toLowerCase().includes(q) || 
            s.buildingNameTe.toLowerCase().includes(q) || 
            s.roomDesc.toLowerCase().includes(q) ||
            s.area.toLowerCase().includes(q)
          );
          return matchWard || matchName || matchCandTe || matchCandEn || matchBooth || matchStation;`;

if (html.includes(searchOld)) {
    html = html.replace(searchOld, searchNew);
    console.log('Updated search filter in renderCandidatesList');
}

// 4. Update card rendering in renderCandidatesList
const cardHtmlOld = `          <div class="mt-2 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>ప్రాంతం: <strong class="text-slate-300 font-semibold">\${w.zone}</strong></span>
            <span class="text-amber-400 font-mono text-[10px]">వివరాలు ➔</span>
          </div>`;

const cardHtmlNew = `          \${(function() {
            if (typeof getPollingStationsForWard !== 'function') return '';
            const stList = getPollingStationsForWard(w.ward);
            if (!stList || stList.length === 0) return '';
            const boothNos = stList.map(s => s.boothNo);
            const bText = boothNos.length > 2 ? \`#\${boothNos[0]}-\${boothNos[boothNos.length-1]}\` : \`#\${boothNos.join(', #')}\`;
            return \`
              <div class="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <div class="text-slate-300 truncate flex items-center gap-1.5 min-w-0 pr-1">
                  <span class="text-xs text-emerald-400">🗳️</span>
                  <span class="truncate telugu-font text-slate-200">\${stList[0].buildingNameTe}</span>
                </div>
                <span class="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-700/60 text-emerald-300 font-mono font-bold text-[10px] whitespace-nowrap">
                  \${bText}
                </span>
              </div>
            \`;
          })()}

          <div class="mt-1.5 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>ప్రాంతం: <strong class="text-slate-300 font-semibold">\${w.zone}</strong></span>
            <span class="text-amber-400 font-mono text-[10px]">మ్యాప్‌లో చూడు ➔</span>
          </div>`;

if (html.includes(cardHtmlOld)) {
    html = html.replace(cardHtmlOld, cardHtmlNew);
    console.log('Updated candidate card with polling station details');
}

fs.writeFileSync('elections.html', html, 'utf8');
console.log('Interaction updates successfully written to elections.html');
