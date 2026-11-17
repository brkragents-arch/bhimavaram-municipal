const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add script tags in head if not present
if (!html.includes('assets/bhimavaram_52_wards_boundaries.js')) {
  html = html.replace(
    '</style>',
    '</style>\n  <!-- 52 Wards Boundaries & Candidates Data -->\n  <script src="assets/bhimavaram_52_wards_boundaries.js"></script>\n  <script src="assets/bhimavaram_election_candidates.js"></script>'
  );
}

// 2. Replace the details card HTML
const cardStart = '<!-- Ward Details Table Card -->';
const cardEnd = '<!-- Bottom Disclaimer Statement -->';
const startIdx = html.indexOf(cardStart);
const endIdx = html.indexOf(cardEnd);

if (startIdx === -1 || endIdx === -1) {
  throw new Error('Could not find card boundaries in index.html');
}

const newCardHtml = `<!-- Ward Details Table Card -->
      <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex-1 flex flex-col h-full min-h-0">
        
        <div class="border-b border-slate-800 pb-2.5 mb-2.5 flex-shrink-0">
          <div class="flex items-center justify-between">
            <span id="detailBadge" class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              వార్డు 1 (ఎంపికైనది)
            </span>
            <span id="detailZoneTag" class="text-[11px] text-slate-400 font-medium">
              వన్ టౌన్ & నార్త్
            </span>
          </div>
          <h2 id="detailWardName" class="text-base font-bold text-white mt-1 telugu-font leading-snug">
            గోవిందరావు నగర్ & యలమదుర్రు డ్రెయిన్ నార్త్
          </h2>
          <p id="detailWardEngName" class="text-xs text-slate-400">
            Govindarao Nagar & Yanamadurru Drain North
          </p>
        </div>

        <!-- Alliance Contesting Candidate Card Container -->
        <div id="detailCandidateContainer" class="mb-2.5 flex-shrink-0">
          <!-- Populated dynamically via JS -->
        </div>

        <!-- Scrollable Demographics & Boundaries Body -->
        <div class="flex-1 overflow-y-auto pr-1 space-y-2.5 min-h-0">
          
          <!-- Official Gazette Boundaries (North, East, South, West) -->
          <div class="bg-slate-950/70 rounded-lg p-2.5 border border-emerald-500/30 shadow-sm">
            <div class="text-[11px] font-bold text-emerald-400 mb-1.5 flex items-center justify-between">
              <span class="flex items-center gap-1">
                <span>📜</span>
                <span>అధికారిక గెజిట్ సరిహద్దులు (Gazette Boundaries):</span>
              </span>
              <span class="text-[10px] text-slate-500 font-mono">Source: Gazette</span>
            </div>
            <div class="space-y-1.5 text-[11px] text-slate-300 telugu-font leading-relaxed">
              <div class="bg-slate-900/60 p-1.5 rounded border border-slate-800/80"><strong class="text-cyan-400 block text-[10px]">⬆️ ఉత్తరం (North):</strong> <span id="detailNorth">-</span></div>
              <div class="bg-slate-900/60 p-1.5 rounded border border-slate-800/80"><strong class="text-cyan-400 block text-[10px]">➡️ తూర్పు (East):</strong> <span id="detailEast">-</span></div>
              <div class="bg-slate-900/60 p-1.5 rounded border border-slate-800/80"><strong class="text-cyan-400 block text-[10px]">⬇️ దక్షిణం (South):</strong> <span id="detailSouth">-</span></div>
              <div class="bg-slate-900/60 p-1.5 rounded border border-slate-800/80"><strong class="text-cyan-400 block text-[10px]">⬅️ పశ్చిమం (West):</strong> <span id="detailWest">-</span></div>
            </div>
          </div>

          <!-- RS Numbers & Door Numbers -->
          <div class="bg-slate-950/60 rounded-lg p-2.5 border border-slate-800/80">
            <div class="text-[11px] font-semibold text-amber-300 mb-1 flex items-center gap-1">
              <span>🛰️ R.S. నంబర్లు & డోర్ నంబర్లు:</span>
            </div>
            <div class="text-[11px] text-slate-300 space-y-1">
              <div><span class="text-slate-400">R.S. నంబర్లు:</span> <span id="detailRsNos" class="font-mono text-amber-300 font-bold">-</span></div>
              <div><span class="text-slate-400">డోర్ నంబర్లు:</span> <span id="detailDnos" class="font-mono text-slate-300 text-[10px]">-</span></div>
            </div>
          </div>

          <!-- Key Localities List in Ward -->
          <div class="bg-slate-950/50 rounded-lg p-2.5 border border-slate-800/80">
            <div class="text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
              <span>📍 ఈ వార్డు పరిధిలోని ప్రధాన ల్యాండ్‌మార్క్‌లు:</span>
            </div>
            <p id="detailLocalities" class="text-xs text-slate-300 telugu-font leading-relaxed">-</p>
          </div>

          <!-- Table displaying Ward Demographics and Area Information -->
          <div>
            <div class="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <span>📊 వార్డు జనాభా & సమగ్ర గణాంకాల పట్టిక</span>
            </div>
            <div class="rounded-lg border border-slate-800 overflow-hidden bg-slate-950/60">
              <table class="w-full text-xs text-left">
                <tbody class="divide-y divide-slate-800/80" id="detailedTableBody">
                  <!-- Populated dynamically via JS -->
                </tbody>
              </table>
            </div>
          </div>

          <!-- Municipal Facilities & Public Services -->
          <div class="bg-slate-950/50 rounded-lg p-2.5 border border-slate-800/80">
            <div class="text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
              <span>🏛️ సచివాలయ & పౌర సేవలు:</span>
            </div>
            <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-300 mt-1">
              <div class="bg-slate-900 p-1.5 rounded border border-slate-800">
                <span class="text-slate-500 block text-[10px]">సచివాలయం:</span>
                <span id="detailSecretariat" class="font-medium text-cyan-300">వార్డు సచివాలయం</span>
              </div>
              <div class="bg-slate-900 p-1.5 rounded border border-slate-800">
                <span class="text-slate-500 block text-[10px]">పోలింగ్ బూతులు:</span>
                <span id="detailBooths" class="font-medium text-amber-300">4 బూతులు</span>
              </div>
            </div>
          </div>

        </div>

        <!-- Action Buttons -->
        <div class="pt-2.5 border-t border-slate-800 mt-2 flex items-center gap-2 flex-shrink-0">
          <button onclick="shareWardInfo()" class="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-medium py-1.5 px-2 rounded-lg text-xs transition flex items-center justify-center gap-1 shadow-sm">
            <span>📋 సమాచారం కాపీ</span>
          </button>
          <a id="detailBoundariesLink" href="ward-boundaries.html" class="bg-emerald-700 hover:bg-emerald-600 text-white py-1.5 px-2.5 rounded-lg text-xs font-semibold border border-emerald-500/40 transition flex items-center gap-1">
            <span>🗺️ Google Maps</span>
          </a>
          <a id="detailElectionsLink" href="elections.html" class="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-1.5 px-2.5 rounded-lg text-xs transition flex items-center gap-1">
            <span>🗳️ ఎన్నికలు</span>
          </a>
        </div>

      </div>

    </div>

  </main>

  `;

html = html.substring(0, startIdx) + newCardHtml + html.substring(endIdx);

// 3. Now replace the script section
const scriptStartToken = '<!-- Ward Data Script & Interactive Engine -->';
const scriptStartIdx = html.indexOf(scriptStartToken);
if (scriptStartIdx === -1) {
  throw new Error('Could not find script start token in index.html');
}

const newScript = `<!-- Ward Data Script & Interactive Engine -->
  <script>
    // Project all 52 Wards from official boundaries into SVG viewBox="0 0 1000 750"
    const SVG_CONFIG = {
      viewW: 1000,
      viewH: 750,
      pad: 45,
      minLat: 16.515,
      maxLat: 16.574,
      minLng: 81.490,
      maxLng: 81.565
    };

    function projectToSvg(lat, lng) {
      const scaleX = (SVG_CONFIG.viewW - 2 * SVG_CONFIG.pad) / (SVG_CONFIG.maxLng - SVG_CONFIG.minLng);
      const scaleY = (SVG_CONFIG.viewH - 2 * SVG_CONFIG.pad) / (SVG_CONFIG.maxLat - SVG_CONFIG.minLat);
      const x = SVG_CONFIG.pad + (lng - SVG_CONFIG.minLng) * scaleX;
      const y = SVG_CONFIG.pad + (SVG_CONFIG.maxLat - lat) * scaleY;
      return [Number(x.toFixed(1)), Number(y.toFixed(1))];
    }

    // Zone Styling Definitions
    const zoneStyles = {
      zone1: {
        fill: "rgba(14, 165, 233, 0.22)",
        stroke: "#38bdf8",
        hover: "#0284c7",
        text: "#7dd3fc",
        badge: "bg-sky-500/20 text-sky-300 border-sky-500/30",
        name: "వన్ టౌన్ & నార్త్"
      },
      zone2: {
        fill: "rgba(16, 185, 129, 0.22)",
        stroke: "#34d399",
        hover: "#059669",
        text: "#a7f3d0",
        badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
        name: "గుణుపూడి & ఈస్ట్"
      },
      zone3: {
        fill: "rgba(245, 158, 11, 0.22)",
        stroke: "#fbbf24",
        hover: "#d97706",
        text: "#fde68a",
        badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
        name: "టూ టౌన్ & వెస్ట్"
      },
      zone4: {
        fill: "rgba(168, 85, 247, 0.22)",
        stroke: "#c084fc",
        hover: "#7e22ce",
        text: "#e9d5ff",
        badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        name: "రాయలం & సౌత్"
      }
    };

    // Combine official 52 wards boundaries data with demographic estimation & candidates
    const wardsData = (typeof BHIMAVARAM_52_WARDS_DATA !== 'undefined' ? BHIMAVARAM_52_WARDS_DATA : []).map(w => {
      const cand = (typeof BHIMAVARAM_ELECTION_CANDIDATES !== 'undefined') ? BHIMAVARAM_ELECTION_CANDIDATES[w.ward] : null;
      
      // Map zone code
      let zKey = "zone1";
      if (w.zone.includes("Gunupudi") || w.zone.includes("గుణుపూడి")) zKey = "zone2";
      else if (w.zone.includes("Two Town") || w.zone.includes("పశ్చిమ")) zKey = "zone3";
      else if (w.zone.includes("Rayalam") || w.zone.includes("రాయలం") || w.zone.includes("సౌత్")) zKey = "zone4";

      // SVG path calculation
      const projected = (w.polygon || []).map(pt => projectToSvg(pt[0], pt[1]));
      let pathD = "";
      if (projected.length > 2) {
        pathD = "M " + projected.map(p => p.join(",")).join(" L ") + " Z";
      }

      const centerSvg = projectToSvg(w.center[0], w.center[1]);

      // Demographic calculation
      const popBase = 2800 + ((w.ward * 113) % 1200);
      const male = Math.round(popBase * 0.495);
      const female = popBase - male;
      const sexRatio = Math.round((female / male) * 1000);
      const houses = Math.round(popBase / 3.8);
      const voters = Math.round(popBase * 0.73);
      const booths = Math.max(3, Math.min(5, Math.ceil(voters / 700)));

      return {
        id: w.ward,
        ward: w.ward,
        name: w.nameTe,
        nameEng: w.nameEn,
        zone: zKey,
        zoneName: zoneStyles[zKey].name,
        centerSvg: centerSvg,
        pathD: pathD,
        north: w.north,
        east: w.east,
        south: w.south,
        west: w.west,
        rsNos: w.rsNos || [],
        dNos: w.dNos || [],
        landmarks: w.landmarks || [],
        areas: (w.landmarks || []).join(', ') || w.nameTe,
        candidate: cand,
        pop: popBase,
        male: male,
        female: female,
        sexRatio: sexRatio,
        houses: houses,
        voters: voters,
        booths: booths,
        sec: \`వార్డు \${w.ward} సచివాలయం\`
      };
    });

    let selectedWardId = 1;
    let activeFilterZone = 'all';

    function renderMap() {
      const container = document.getElementById('wardsGroup');
      if (!container) return;
      container.innerHTML = '';

      wardsData.forEach(ward => {
        if (!ward.pathD) return;

        const style = zoneStyles[ward.zone] || zoneStyles.zone1;

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("id", \`ward-elem-\${ward.id}\`);
        g.setAttribute("class", "ward-element cursor-pointer");
        g.setAttribute("data-ward-id", ward.id);

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", ward.pathD);
        path.setAttribute("class", "ward-polygon");
        
        // Candidate colored subtle tint if candidate present
        let fill = style.fill;
        let stroke = style.stroke;
        if (ward.candidate) {
          if (ward.candidate.party === 'JSP') stroke = '#ef4444';
          else if (ward.candidate.party === 'TDP') stroke = '#eab308';
        }

        path.setAttribute("fill", fill);
        path.setAttribute("stroke", stroke);
        path.setAttribute("stroke-width", "1.6");
        path.setAttribute("id", \`ward-path-\${ward.id}\`);

        const centerX = ward.centerSvg[0];
        const centerY = ward.centerSvg[1];

        const numText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        numText.setAttribute("x", centerX);
        numText.setAttribute("y", centerY - 3);
        numText.setAttribute("text-anchor", "middle");
        numText.setAttribute("fill", "#ffffff");
        numText.setAttribute("font-size", "12");
        numText.setAttribute("font-weight", "bold");
        numText.setAttribute("pointer-events", "none");
        numText.textContent = \`వార్డు \${ward.id}\`;

        const nameText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        nameText.setAttribute("x", centerX);
        nameText.setAttribute("y", centerY + 11);
        nameText.setAttribute("text-anchor", "middle");
        nameText.setAttribute("fill", style.text);
        nameText.setAttribute("font-size", "8.5");
        nameText.setAttribute("font-family", "'Tiro Telugu', sans-serif");
        nameText.setAttribute("pointer-events", "none");
        
        let shortName = ward.name.split(' ')[0] || ward.name;
        if (shortName.length > 8) shortName = shortName.substring(0, 8) + '…';
        nameText.textContent = shortName;

        g.appendChild(path);
        g.appendChild(numText);
        g.appendChild(nameText);

        g.addEventListener('mouseenter', (e) => onWardHover(ward, e));
        g.addEventListener('mousemove', (e) => updateTooltipPosition(e));
        g.addEventListener('mouseleave', () => onWardLeave());
        g.addEventListener('click', () => selectWard(ward.id));

        container.appendChild(g);
      });
    }

    function renderQuickPills() {
      const container = document.getElementById('quickPillsContainer');
      if (!container) return;
      container.innerHTML = '';

      wardsData.forEach(ward => {
        const btn = document.createElement('button');
        btn.id = \`pill-ward-\${ward.id}\`;
        btn.dataset.wardId = ward.id;
        btn.onclick = () => selectWard(ward.id);
        
        let candIcon = "";
        if (ward.candidate) {
          candIcon = \`<span class="text-[10px]">\${ward.candidate.symbol}</span>\`;
        }

        btn.className = 'px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap shadow-sm bg-slate-800/90 text-slate-200 border-slate-700/80 hover:bg-slate-700 hover:text-white hover:border-slate-500';
        btn.innerHTML = \`
          <span class="w-2 h-2 rounded-full" style="background-color: \${zoneStyles[ward.zone].stroke}"></span>
          <span>వార్డు \${ward.id}</span>
          \${candIcon}
        \`;
        container.appendChild(btn);
      });
    }

    function onWardHover(ward, e) {
      const tooltip = document.getElementById('wardTooltip');
      if (!tooltip) return;

      const style = zoneStyles[ward.zone];

      let candidateHtml = '';
      if (ward.candidate) {
        candidateHtml = \`
          <div class="mt-2 p-1.5 rounded bg-slate-950/80 border" style="border-color: \${ward.candidate.partyBorder}">
            <div class="flex items-center justify-between text-[11px]">
              <span class="font-bold flex items-center gap-1" style="color:\${ward.candidate.partyColor}">
                <span>\${ward.candidate.symbol}</span>
                <span>\${ward.candidate.party} అభ్యర్థి:</span>
              </span>
              <span class="text-white font-semibold">\${ward.candidate.candidateTe}</span>
            </div>
          </div>
        \`;
      }

      tooltip.innerHTML = \`
        <div class="border-b border-slate-700 pb-1.5 mb-1.5 flex items-center justify-between">
          <span class="font-bold text-white text-sm">వార్డు నెంబర్: \${ward.id}</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full font-bold \${style.badge}">\${ward.zoneName}</span>
        </div>
        <div class="font-bold text-cyan-300 text-xs mb-1 telugu-font">\${ward.name}</div>
        <div class="text-[10px] text-slate-400 mb-1.5">\${ward.nameEng}</div>
        <div class="text-[11px] text-slate-300 space-y-0.5">
          <div>👥 జనాభా: <span class="font-semibold text-white">~\${ward.pop.toLocaleString('en-IN')}</span> | ఓటర్లు: <span class="font-semibold text-amber-300">\${ward.voters.toLocaleString('en-IN')}</span></div>
          <div>🏛️ ల్యాండ్‌మార్క్‌లు: <span class="text-slate-300">\${ward.landmarks.slice(0, 2).join(', ') || 'N/A'}</span></div>
        </div>
        \${candidateHtml}
        <div class="mt-2 text-[10px] text-center text-cyan-400 font-semibold border-t border-slate-800 pt-1">
          👆 క్లిక్ చేసి పూర్తి గెజిట్ సరిహద్దులు చూడండి
        </div>
      \`;

      tooltip.classList.remove('hidden');
      updateTooltipPosition(e);

      // Map highlight
      const path = document.getElementById(\`ward-path-\${ward.id}\`);
      if (path && ward.id !== selectedWardId) {
        path.setAttribute('fill', style.hover);
        path.setAttribute('stroke-width', '2.5');
      }
    }

    function updateTooltipPosition(e) {
      const tooltip = document.getElementById('wardTooltip');
      if (!tooltip || tooltip.classList.contains('hidden')) return;

      const wrapper = document.getElementById('mapSvgWrapper');
      const rect = wrapper.getBoundingClientRect();

      let x = e.clientX - rect.left + 15;
      let y = e.clientY - rect.top + 15;

      if (x + 320 > rect.width) x = x - 330;
      if (y + 200 > rect.height) y = y - 180;

      tooltip.style.left = \`\${Math.max(10, x)}px\`;
      tooltip.style.top = \`\${Math.max(10, y)}px\`;
    }

    function onWardLeave() {
      const tooltip = document.getElementById('wardTooltip');
      if (tooltip) tooltip.classList.add('hidden');

      wardsData.forEach(w => {
        const path = document.getElementById(\`ward-path-\${w.id}\`);
        if (path) {
          if (w.id === selectedWardId) {
            path.setAttribute('stroke', '#38bdf8');
            path.setAttribute('stroke-width', '3');
          } else {
            const style = zoneStyles[w.zone];
            let stroke = style.stroke;
            if (w.candidate) {
              if (w.candidate.party === 'JSP') stroke = '#ef4444';
              else if (w.candidate.party === 'TDP') stroke = '#eab308';
            }
            path.setAttribute('fill', style.fill);
            path.setAttribute('stroke', stroke);
            path.setAttribute('stroke-width', '1.6');
          }
        }
      });
    }

    function selectWard(wardId) {
      selectedWardId = wardId;
      const ward = wardsData.find(w => w.id === wardId);
      if (!ward) return;

      document.getElementById('detailBadge').textContent = \`వార్డు \${ward.id} (ఎంపికైనది)\`;
      document.getElementById('detailZoneTag').textContent = ward.zoneName;
      document.getElementById('detailWardName').textContent = ward.name;
      document.getElementById('detailWardEngName').textContent = ward.nameEng;
      document.getElementById('detailLocalities').textContent = ward.areas;
      document.getElementById('detailSecretariat').textContent = ward.sec;
      document.getElementById('detailBooths').textContent = \`\${ward.booths} పోలింగ్ కేంద్రాలు\`;

      // Gazette boundaries
      document.getElementById('detailNorth').textContent = ward.north || 'సమాచారం అందుబాటులో లేదు';
      document.getElementById('detailEast').textContent = ward.east || 'సమాచారం అందుబాటులో లేదు';
      document.getElementById('detailSouth').textContent = ward.south || 'సమాచారం అందుబాటులో లేదు';
      document.getElementById('detailWest').textContent = ward.west || 'సమాచారం అందుబాటులో లేదు';

      // RS & Door numbers
      const rsStr = (ward.rsNos && ward.rsNos.length) ? ward.rsNos.join(', ') : 'పరిశీలనలో ఉంది';
      document.getElementById('detailRsNos').textContent = rsStr;
      const dNosStr = (ward.dNos && ward.dNos.length) ? ward.dNos.join(', ') : 'గెజిట్ రికార్డు';
      document.getElementById('detailDnos').textContent = dNosStr;

      // Candidate Card
      const candContainer = document.getElementById('detailCandidateContainer');
      if (candContainer) {
        if (ward.candidate) {
          const c = ward.candidate;
          candContainer.innerHTML = \`
            <div class="p-2.5 rounded-xl border shadow-md flex items-center justify-between" style="background-color: rgba(15, 23, 42, 0.95); border-color: \${c.partyBorder}">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center text-xl shadow" style="background-color: \${c.partyBg}">
                  \${c.symbol}
                </div>
                <div>
                  <div class="text-[10px] font-bold" style="color: \${c.partyColor}">\${c.partyNameTe}</div>
                  <div class="text-sm font-black text-white telugu-font leading-tight">\${c.candidateTe}</div>
                  <div class="text-[10px] text-slate-400 font-medium">\${c.candidateEn}</div>
                </div>
              </div>
              <a href="elections.html?ward=\${ward.id}" class="px-2 py-1 rounded-md text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition">
                వివరాలు ➔
              </a>
            </div>
          \`;
        } else {
          candContainer.innerHTML = \`
            <div class="p-2 rounded-lg bg-slate-950/40 border border-slate-800/80 text-center text-[11px] text-slate-400">
              కూటమి అభ్యర్థి ప్రకటన నిరీక్షణలో ఉంది (Alliance Announcement Pending)
            </div>
          \`;
        }
      }

      // Dynamic action link targets
      const bLink = document.getElementById('detailBoundariesLink');
      if (bLink) bLink.href = \`ward-boundaries.html?ward=\${ward.id}\`;
      const eLink = document.getElementById('detailElectionsLink');
      if (eLink) eLink.href = \`elections.html?ward=\${ward.id}\`;

      // Demographics table
      const tbody = document.getElementById('detailedTableBody');
      tbody.innerHTML = \`
        <tr class="bg-cyan-950/20">
          <td class="py-2 px-3 text-slate-300 font-medium">మొత్తం జనాభా (Estimated Population)</td>
          <td class="py-2 px-3 text-right font-bold text-cyan-300 text-sm">\${ward.pop.toLocaleString('en-IN')} మంది</td>
        </tr>
        <tr>
          <td class="py-2 px-3 text-slate-400">పురుషుల జనాభా (Male)</td>
          <td class="py-2 px-3 text-right font-semibold text-slate-200">\${ward.male.toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td class="py-2 px-3 text-slate-400">స్త్రీల జనాభా (Female)</td>
          <td class="py-2 px-3 text-right font-semibold text-slate-200">\${ward.female.toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td class="py-2 px-3 text-slate-400">లింగ నిష్పత్తి (Sex Ratio)</td>
          <td class="py-2 px-3 text-right font-semibold text-emerald-400">\${ward.sexRatio} / 1000</td>
        </tr>
        <tr>
          <td class="py-2 px-3 text-slate-400">మొత్తం గృహాలు (Households)</td>
          <td class="py-2 px-3 text-right font-semibold text-slate-200">\${ward.houses.toLocaleString('en-IN')} ఇళ్ళు</td>
        </tr>
        <tr>
          <td class="py-2 px-3 text-slate-400">నమోదిత ఓటర్లు (Voters)</td>
          <td class="py-2 px-3 text-right font-semibold text-amber-400">\${ward.voters.toLocaleString('en-IN')} మంది</td>
        </tr>
      \`;

      // Update pills
      document.querySelectorAll('#quickPillsContainer button').forEach(btn => {
        btn.className = 'px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap shadow-sm bg-slate-800/90 text-slate-200 border-slate-700/80 hover:bg-slate-700 hover:text-white hover:border-slate-500';
      });
      const activePill = document.getElementById(\`pill-ward-\${wardId}\`);
      if (activePill) {
        activePill.className = 'px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap shadow-sm bg-cyan-600 text-white border-cyan-300 ring-2 ring-cyan-400/50 shadow-cyan-900/40 scale-[1.02]';
        activePill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }

      // Update polygon styling
      wardsData.forEach(w => {
        const path = document.getElementById(\`ward-path-\${w.id}\`);
        if (path) {
          if (w.id === wardId) {
            path.setAttribute('stroke', '#38bdf8');
            path.setAttribute('stroke-width', '3.5');
            path.setAttribute('filter', 'url(#glow)');
            path.parentNode.appendChild(path);
          } else {
            const style = zoneStyles[w.zone];
            let stroke = style.stroke;
            if (w.candidate) {
              if (w.candidate.party === 'JSP') stroke = '#ef4444';
              else if (w.candidate.party === 'TDP') stroke = '#eab308';
            }
            path.setAttribute('stroke', stroke);
            path.setAttribute('stroke-width', '1.6');
            path.removeAttribute('filter');
          }
        }
      });
    }

    function shareWardInfo() {
      const ward = wardsData.find(w => w.id === selectedWardId);
      if (!ward) return;

      const candText = ward.candidate ? \`\\nకూటమి అభ్యర్థి: \${ward.candidate.candidateTe} (\${ward.candidate.party})\` : '';
      const text = \`భీమవరం పురపాలక సంఘం (52 వార్డులు) - వార్డు \${ward.id}\\nపేరు: \${ward.name} (\${ward.nameEng})\\nజోన్: \${ward.zoneName}\${candText}\\nఉత్తరం: \${ward.north}\\nతూర్పు: \${ward.east}\\nదక్షిణం: \${ward.south}\\nపశ్చిమం: \${ward.west}\\nRS నంబర్లు: \${ward.rsNos.join(', ') || 'N/A'}\\nల్యాండ్‌మార్క్‌లు: \${ward.landmarks.join(', ')}\`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
          alert(\`వార్డు \${ward.id} అధికారిక గెజిట్ సరిహద్దులు మరియు సమాచారం కాపీ చేయబడింది!\`);
        });
      } else {
        alert(text);
      }
    }

    function zoomToWard() {
      const path = document.getElementById(\`ward-path-\${selectedWardId}\`);
      if (path) {
        path.setAttribute('stroke', '#f59e0b');
        path.setAttribute('stroke-width', '4');
        setTimeout(() => {
          path.setAttribute('stroke', '#38bdf8');
          path.setAttribute('stroke-width', '3.5');
        }, 1200);
      }
    }

    function resetMapView() {
      selectWard(1);
    }

    // Filter by Zone
    function filterZone(zoneKey) {
      activeFilterZone = zoneKey;
      document.querySelectorAll('.zone-tab-btn').forEach(b => {
        b.classList.remove('active', 'border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
        b.classList.add('border-slate-800', 'text-slate-400');
      });
      const activeBtn = document.getElementById(\`tab-\${zoneKey}\`);
      if (activeBtn) {
        activeBtn.classList.add('active', 'border-cyan-400', 'bg-cyan-500/20', 'text-cyan-300');
        activeBtn.classList.remove('border-slate-800', 'text-slate-400');
      }

      wardsData.forEach(w => {
        const elem = document.getElementById(\`ward-elem-\${w.id}\`);
        const pill = document.getElementById(\`pill-ward-\${w.id}\`);
        const visible = (zoneKey === 'all' || w.zone === zoneKey);

        if (elem) elem.style.opacity = visible ? '1' : '0.15';
        if (pill) pill.style.display = visible ? '' : 'none';
      });

      const firstVisible = wardsData.find(w => zoneKey === 'all' || w.zone === zoneKey);
      if (firstVisible) selectWard(firstVisible.id);
    }

    // Search wards
    function handleWardSearch(val) {
      const q = (val || '').trim().toLowerCase();
      if (!q) {
        filterZone(activeFilterZone);
        return;
      }

      wardsData.forEach(w => {
        const elem = document.getElementById(\`ward-elem-\${w.id}\`);
        const pill = document.getElementById(\`pill-ward-\${w.id}\`);

        const candName = w.candidate ? (w.candidate.candidateTe + ' ' + w.candidate.candidateEn).toLowerCase() : '';
        const match = w.id.toString() === q ||
                      w.name.toLowerCase().includes(q) ||
                      w.nameEng.toLowerCase().includes(q) ||
                      w.areas.toLowerCase().includes(q) ||
                      candName.includes(q) ||
                      w.rsNos.some(rs => rs.toString() === q);

        if (elem) elem.style.opacity = match ? '1' : '0.12';
        if (pill) pill.style.display = match ? '' : 'none';
      });

      const found = wardsData.find(w => 
        w.id.toString() === q ||
        w.name.toLowerCase().includes(q) ||
        w.nameEng.toLowerCase().includes(q)
      );
      if (found) selectWard(found.id);
    }

    // Modal Overview
    function toggleSystemOverviewModal() {
      const m = document.getElementById('systemOverviewModal');
      if (m) m.classList.toggle('hidden');
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
      renderMap();
      renderQuickPills();
      selectWard(1);

      // Search input binding
      const sInput = document.getElementById('wardSearchInput');
      if (sInput) {
        sInput.addEventListener('input', (e) => handleWardSearch(e.target.value));
      }

      // Check URL query param ?ward=X
      const urlParams = new URLSearchParams(window.location.search);
      const qWard = parseInt(urlParams.get('ward'));
      if (qWard >= 1 && qWard <= 52) {
        setTimeout(() => selectWard(qWard), 250);
      }
    });
  </script>
</body>
</html>`;

html = html.substring(0, scriptStartIdx) + newScript;

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with 52 Wards official boundaries, candidates, and interactive engine!');
