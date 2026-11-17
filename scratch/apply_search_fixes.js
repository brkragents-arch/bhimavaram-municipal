const fs = require('fs');

function updateFile(filename) {
  let html = fs.readFileSync(filename, 'utf8');

  // 1. Ensure candidates script is in head
  if (!html.includes('assets/bhimavaram_election_candidates.js')) {
    html = html.replace(
      '<link href="https://fonts.googleapis.com',
      '<script src="assets/bhimavaram_election_candidates.js"></script>\n  <link href="https://fonts.googleapis.com'
    );
  }

  // 2. Locate renderWardsList start
  const renderStart = '    // 3. Render Wards List on Left Sidebar';
  const renderEnd = '    // 4. Select Ward: Pans Map';
  const startIdx = html.indexOf(renderStart);
  const endIdx = html.indexOf(renderEnd);

  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Could not find renderWardsList in ' + filename);
  }

  const newRenderAndSearchCode = `    // ============================================================
    // SMART SEARCH & QUERY PARSER
    // Supports:
    //  - Exact Ward: 1, 2, 52, "ward 1", "Ward 1", "వార్డు 1", "వార్డు 5", "వార్డ్ 12", "w1", "w 52", "వార్డు నం 1"
    //  - RS Numbers: 651, 302, 100, "RS 651", "rs302", "RS. 100", "RS-651", "ఆర్.ఎస్ 302"
    //  - Door Numbers: "5-10", "D.No 5-10", "5-10-1", "DNo"
    //  - Localities & Towns: "Govindarao", "రాయలం", "Rayalam", "Gunupudi", "గుణుపూడి", "One Town", "Two Town", "చినమిరం"
    //  - Candidates & Parties: "లీలా మాధవి", "రెహమాన్", "రవీంద్రనాథ్", "JSP", "TDP", "జనసేన", "తెలుగుదేశం"
    // ============================================================

    function parseSearchQuery(rawQuery) {
      let q = (rawQuery || '').trim();
      if (!q) return null;

      const qLower = q.toLowerCase();

      // 1. "ward X", "w X", "wX", "వార్డు X", "వార్డ్ X", "వార్డు నం X", "వార్డునం X", etc.
      const wardRegex = /^(?:ward|w|వార్డు|వార్డ్|వార్డు\\s*నం|వార్డు\\s*నెంబర్|వార్డునం|వార్డునెం)\\s*[:#-]?\\s*(\\d+)$/i;
      const wardMatch = q.match(wardRegex);
      if (wardMatch) {
        return { type: 'ward_number', value: parseInt(wardMatch[1], 10) };
      }

      // 2. Pure number: could be Ward 1..52 OR an RS number (e.g. 651, 302, 100)
      if (/^\\d+$/.test(q)) {
        return { type: 'numeric', value: parseInt(q, 10), str: q };
      }

      // 3. RS number: "RS 651", "RS.651", "RS-651", "rs651", "ఆర్.ఎస్ 651", etc.
      const rsRegex = /^(?:rs|r\\.s|r\\.s\\.|ఆర్\\.ఎస్|ఆర్ఎస్|ఆర్\\s*ఎస్)\\s*[:#.-]?\\s*(\\d+(?:\\/\\d+)?)$/i;
      const rsMatch = q.match(rsRegex);
      if (rsMatch) {
        return { type: 'rs_number', value: rsMatch[1] };
      }

      // 4. Door number: "D.No 5-10", "DNo 5-10", "5-10-1", etc.
      const dnoClean = q.replace(/^(?:d\\.?no\\.?|డోర్\\s*నం\\.?)\\s*/i, '').trim();
      if (/\\d+-\\d+/.test(dnoClean)) {
        return { type: 'dno', value: dnoClean.toLowerCase() };
      }

      // 5. General text search
      return { type: 'text', value: qLower, raw: q };
    }

    function matchWardWithQuery(w, parsed) {
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
        // If > 52, also match door numbers containing it
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
        
        // Telugu & English synonyms
        let qVariants = [q];
        if (q.includes('రాయలం') || q.includes('రాయలవరం')) qVariants.push('rayalam', 'రాయలవరం', 'రాయలం');
        if (q.includes('rayalam')) qVariants.push('రాయలం', 'రాయలవరం');
        if (q.includes('చినమిరం') || q.includes('చినఅమిరం')) qVariants.push('chinamiram', 'చినమిరం', 'చినఅమిరం');
        if (q.includes('chinamiram')) qVariants.push('చినమిరం', 'chinamiram');
        if (q.includes('గుణుపూడి')) qVariants.push('gunupudi');
        if (q.includes('gunupudi')) qVariants.push('గుణుపూడి');
        if (q.includes('వన్ టౌన్')) qVariants.push('one town');
        if (q.includes('one town')) qVariants.push('వన్ టౌన్');
        if (q.includes('టూ టౌన్')) qVariants.push('two town');
        if (q.includes('two town')) qVariants.push('టూ టౌన్');
        if (q === 'jsp' || q === 'జనసేన') qVariants.push('jsp', 'janasena', 'జనసేన');
        if (q === 'tdp' || q === 'తెలుగుదేశం') qVariants.push('tdp', 'telugudesam', 'తెలుగుదేశం');

        const cand = (typeof BHIMAVARAM_ELECTION_CANDIDATES !== 'undefined') ? BHIMAVARAM_ELECTION_CANDIDATES[w.ward] : null;

        return qVariants.some(term => {
          const inName = (w.nameEn && w.nameEn.toLowerCase().includes(term)) || (w.nameTe && w.nameTe.toLowerCase().includes(term));
          const inZone = w.zone && w.zone.toLowerCase().includes(term);
          const inVillages = w.revenueVillages && w.revenueVillages.some(v => v.toLowerCase().includes(term));
          const inLandmarks = w.landmarks && w.landmarks.some(l => l.toLowerCase().includes(term));
          const inDnos = w.dNos && w.dNos.some(d => d.toLowerCase().includes(term));
          const inCandidate = cand && (
            (cand.candidateTe && cand.candidateTe.toLowerCase().includes(term)) ||
            (cand.candidateEn && cand.candidateEn.toLowerCase().includes(term)) ||
            (cand.party && cand.party.toLowerCase() === term)
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

    // 3. Render Wards List on Left Sidebar
    function renderWardsList() {
      const container = document.getElementById('wardsListContainer');
      if (!container || typeof BHIMAVARAM_52_WARDS_DATA === 'undefined') return [];
      container.innerHTML = '';

      const parsedQuery = parseSearchQuery(searchQuery);

      let filteredWards = BHIMAVARAM_52_WARDS_DATA.filter(w => {
        // If there is an active search query, search globally across all wards
        if (!parsedQuery && currentFilterZone !== 'all') {
          if (!w.zone.toLowerCase().includes(currentFilterZone.toLowerCase()) && 
              !w.revenueVillages.some(v => v.toLowerCase().includes(currentFilterZone.toLowerCase()))) {
            return false;
          }
        }

        // Apply smart search query match
        if (parsedQuery) {
          if (!matchWardWithQuery(w, parsedQuery)) {
            return false;
          }
        }

        return true;
      });

      document.getElementById('displayedCount').textContent = filteredWards.length;

      if (filteredWards.length === 0) {
        container.innerHTML = \`
          <div class="p-8 text-center text-slate-500">
            <span class="text-3xl block mb-2">🔍</span>
            <p class="text-sm font-semibold text-slate-300">ఎటువంటి ఫలితాలు కనుగొనబడలేదు</p>
            <p class="text-xs text-slate-500 mt-1">"\${searchQuery}" కోసం సరిపోలే వార్డు లేదా RS నంబర్ లేదు.</p>
            <p class="text-[11px] text-slate-600 mt-1">చిట్కా: వార్డు సంఖ్య (ఉదా: 1, 5, 52), లేదా RS నంబర్ (ఉదా: 651, 302, 100) టైప్ చేయండి.</p>
            <button onclick="clearSearch()" class="mt-3 px-3 py-1.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white text-xs font-semibold shadow-md transition">
              శోధనను క్లియర్ చేయండి (All 52 Wards)
            </button>
          </div>
        \`;
        return filteredWards;
      }

      filteredWards.forEach(ward => {
        const isExpanded = expandedWards.has(ward.ward);
        const isSelected = activeWardId === ward.ward;
        const zoneColor = getZoneColor(ward.zone);
        const cand = (typeof BHIMAVARAM_ELECTION_CANDIDATES !== 'undefined') ? BHIMAVARAM_ELECTION_CANDIDATES[ward.ward] : null;

        const card = document.createElement('div');
        card.id = \`ward-card-\${ward.ward}\`;
        card.className = \`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer \${
          isSelected 
            ? 'bg-slate-850 border-cyan-500 shadow-lg shadow-cyan-500/20 ward-card-highlight ring-1 ring-cyan-500' 
            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
        }\`;

        // RS Nos Pills
        const rsPillsHtml = ward.rsNos.length > 0 
          ? ward.rsNos.map(rs => 
              \`<span onclick="event.stopPropagation(); searchRs(\${rs})" class="rs-pill px-1.5 py-0.5 rounded bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/60 font-mono text-[10px] font-semibold cursor-pointer" title="ఈ RS నంబర్ సెర్చ్ చేయండి">RS \${rs}</span>\`
            ).join(' ')
          : '<span class="text-slate-600 text-[10px] italic">నోటిఫికేషన్‌లో ప్రత్యేక RS నం లేదు</span>';

        // Candidate Badge
        let candidateBadgeHtml = '';
        if (cand) {
          candidateBadgeHtml = \`
            <div class="mt-2 p-1.5 rounded-lg border flex items-center justify-between" style="background-color: rgba(15, 23, 42, 0.95); border-color: \${cand.partyBorder}">
              <div class="flex items-center gap-2">
                <span class="text-sm">\${cand.symbol}</span>
                <div>
                  <span class="text-[10px] font-bold block" style="color: \${cand.partyColor}">\${cand.partyNameTe}</span>
                  <span class="text-xs font-bold text-white telugu-font leading-tight">\${cand.candidateTe}</span>
                </div>
              </div>
              <a href="elections.html?ward=\${ward.ward}" class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition">
                ఎన్నికలు ➔
              </a>
            </div>
          \`;
        }

        // Landmarks tags
        const landmarksHtml = (ward.landmarks || []).map(l => 
          \`<span class="px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 text-[10px]">\${l}</span>\`
        ).join(' ');

        card.innerHTML = \`
          <!-- Card Header -->
          <div class="flex items-start justify-between gap-2.5" onclick="selectWard(\${ward.ward}, true)">
            
            <div class="flex items-start gap-2.5 flex-1 min-w-0">
              <span class="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-md flex-none" style="background-color: \${zoneColor}">
                \${ward.ward}
              </span>
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-bold text-white text-sm truncate">వార్డు \${ward.ward}</h3>
                  <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                    \${ward.zone}
                  </span>
                </div>
                <div class="text-xs text-cyan-300 font-semibold truncate mt-0.5">\${ward.nameEn}</div>
                <div class="text-[11px] text-slate-400 telugu-font truncate">\${ward.nameTe}</div>
              </div>
            </div>

            <!-- Expand / Collapse Arrow -->
            <button onclick="event.stopPropagation(); toggleWardExpand(\${ward.ward})" 
                    class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition flex-none" 
                    title="\${isExpanded ? 'కుదించు' : 'విస్తరించు'}">
              <span class="transform transition-transform text-xs \${isExpanded ? 'rotate-180' : ''}">▼</span>
            </button>

          </div>

          <!-- Candidate Badge Row -->
          \${candidateBadgeHtml}

          <!-- Quick Metadata Row: Villages & RS Numbers -->
          <div class="mt-2.5 pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5 text-xs" onclick="selectWard(\${ward.ward}, true)">
            <span class="text-[10px] text-slate-400 font-semibold">రెవెన్యూ గ్రామం:</span>
            <span class="text-[11px] text-slate-200 font-medium">\${ward.revenueVillages.join(', ')}</span>
          </div>

          <div class="mt-1.5 flex flex-wrap items-center gap-1 text-xs" onclick="selectWard(\${ward.ward}, true)">
            <span class="text-[10px] text-slate-400 font-semibold mr-1">RS నంబర్లు:</span>
            \${rsPillsHtml}
          </div>

          <!-- Collapsible Official Boundary Description (Source as in Notification) -->
          <div class="\${isExpanded ? 'block' : 'hidden'} mt-3 pt-3 border-t border-slate-800/80 space-y-2.5 text-xs">
            
            <!-- Landmarks & Localities -->
            <div class="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              <div class="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <span>📍 ప్రధాన ల్యాండ్‌మార్క్‌లు & కాలనీలు</span>
              </div>
              <div class="flex flex-wrap gap-1 mt-1">
                \${landmarksHtml || '<span class=\"text-slate-500 italic\">ల్యాండ్‌మార్క్ వివరాలు లేవు</span>'}
              </div>
            </div>

            <!-- Door Numbers -->
            <div class="bg-slate-950/60 p-2 rounded-xl border border-slate-800 text-[11px]">
              <span class="text-slate-400 font-semibold block text-[10px]">డోర్ నంబర్ల శ్రేణి (D.Nos):</span>
              <span class="font-mono text-slate-300">\${ward.dNos.join(', ') || 'నోటిఫికేషన్ రికార్డు'}</span>
            </div>

            <!-- VERBATIM 4 BOUNDARIES AS IN NOTIFICATION -->
            <div class="space-y-2 font-mono text-[11px] leading-relaxed">
              
              <!-- North -->
              <div class="boundary-box-north p-2 rounded-xl border">
                <div class="text-[10px] font-bold text-sky-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                  <span>⬆️ ఉత్తరం (North Boundary)</span>
                </div>
                <p class="text-slate-200 telugu-font leading-normal">\${ward.north}</p>
              </div>

              <!-- East -->
              <div class="boundary-box-east p-2 rounded-xl border">
                <div class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                  <span>➡️ తూర్పు (East Boundary)</span>
                </div>
                <p class="text-slate-200 telugu-font leading-normal">\${ward.east}</p>
              </div>

              <!-- South -->
              <div class="boundary-box-south p-2 rounded-xl border">
                <div class="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                  <span>⬇️ దక్షిణం (South Boundary)</span>
                </div>
                <p class="text-slate-200 telugu-font leading-normal">\${ward.south}</p>
              </div>

              <!-- West -->
              <div class="boundary-box-west p-2 rounded-xl border">
                <div class="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                  <span>⬅️ పశ్చిమం (West Boundary)</span>
                </div>
                <p class="text-slate-200 telugu-font leading-normal">\${ward.west}</p>
              </div>

            </div>

            <!-- Bottom Actions inside expanded card -->
            <div class="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
              <button onclick="event.stopPropagation(); copyWardText(\${ward.ward})" 
                      class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-semibold border border-slate-700 transition flex items-center gap-1">
                <span>📋 కాపీ</span>
              </button>
              <div class="flex items-center gap-1.5">
                <a href="https://bhimavaram.cdma.ap.gov.in/ulbprofile/bhimavaram/gis-map/" target="_blank" rel="noopener noreferrer" 
                   onclick="event.stopPropagation()"
                   class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[10px] font-semibold transition border border-slate-700">
                  AP CDMA పోర్టల్ ↗
                </a>
                <button onclick="event.stopPropagation(); selectWard(\${ward.ward}, true)" 
                        class="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold shadow transition flex items-center gap-1">
                  <span>మ్యాప్‌పై జూమ్ 🔍</span>
                </button>
              </div>
            </div>

          </div>
        \`;

        container.appendChild(card);
      });

      return filteredWards;
    }

    // Synchronize Leaflet Map Polygons & Camera with Search Results
    function updateMapWithSearchResults(matchedWards) {
      if (!map || typeof BHIMAVARAM_52_WARDS_DATA === 'undefined') return;

      const hasQuery = searchQuery.trim() !== '' || currentFilterZone !== 'all';
      const matchedIds = new Set(matchedWards.map(w => w.ward));

      BHIMAVARAM_52_WARDS_DATA.forEach(w => {
        const poly = wardLayers[w.ward];
        const isMatched = !hasQuery || matchedIds.has(w.ward);

        if (poly) {
          if (!hasQuery) {
            poly.setStyle({
              weight: 2.5,
              opacity: 0.9,
              fillOpacity: 0.28,
              color: getZoneColor(w.zone)
            });
          } else if (isMatched) {
            poly.setStyle({
              weight: 4.0,
              opacity: 1.0,
              fillOpacity: 0.60,
              color: '#38bdf8'
            });
          } else {
            poly.setStyle({
              weight: 1,
              opacity: 0.15,
              fillOpacity: 0.05,
              color: '#475569'
            });
          }
        }

        const markerEl = document.getElementById(\`ward-marker-\${w.ward}\`);
        if (markerEl) {
          markerEl.style.opacity = isMatched ? '1' : '0.15';
        }
      });

      if (hasQuery && matchedWards.length === 1) {
        const target = matchedWards[0];
        const poly = wardLayers[target.ward];
        if (poly) {
          map.fitBounds(poly.getBounds(), { padding: [50, 50], maxZoom: 16, animate: true, duration: 0.8 });
          poly.openPopup();
        }
      } else if (hasQuery && matchedWards.length > 1 && matchedWards.length < 52) {
        const matchedPolys = matchedWards.map(w => wardLayers[w.ward]).filter(Boolean);
        if (matchedPolys.length > 0) {
          map.fitBounds(L.featureGroup(matchedPolys).getBounds(), { padding: [40, 40], animate: true, duration: 0.8 });
        }
      } else if (!hasQuery) {
        fitAllWardsBounds();
      }
    }

    // Instant Search Handler (Called on typing into wardSearchInput)
    function handleSearch(val) {
      searchQuery = val || '';
      const clearBtn = document.getElementById('clearSearchBtn');
      if (searchQuery.trim() !== '') {
        if (clearBtn) clearBtn.classList.remove('hidden');
        // When user types in search box, reset zone chip styling to "All"
        document.querySelectorAll('.filter-chip').forEach(chip => {
          chip.classList.remove('bg-cyan-600', 'text-white');
          chip.classList.add('bg-slate-800', 'text-slate-300');
        });
        const allChip = document.getElementById('zone-chip-all');
        if (allChip) {
          allChip.classList.remove('bg-slate-800', 'text-slate-300');
          allChip.classList.add('bg-cyan-600', 'text-white');
        }
        currentFilterZone = 'all';
      } else {
        if (clearBtn) clearBtn.classList.add('hidden');
      }

      const matched = renderWardsList();
      updateMapWithSearchResults(matched);
    }

    function clearSearch() {
      const sInput = document.getElementById('wardSearchInput');
      if (sInput) sInput.value = '';
      searchQuery = '';
      const clearBtn = document.getElementById('clearSearchBtn');
      if (clearBtn) clearBtn.classList.add('hidden');
      currentFilterZone = 'all';

      document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('bg-cyan-600', 'text-white');
        chip.classList.add('bg-slate-800', 'text-slate-300');
      });
      const allChip = document.getElementById('zone-chip-all');
      if (allChip) {
        allChip.classList.remove('bg-slate-800', 'text-slate-300');
        allChip.classList.add('bg-cyan-600', 'text-white');
      }

      const matched = renderWardsList();
      updateMapWithSearchResults(matched);
    }

    function searchRs(rsNo) {
      const sInput = document.getElementById('wardSearchInput');
      if (sInput) sInput.value = rsNo;
      handleSearch(rsNo.toString());
      setMobileView('list');
    }

    function filterByZone(zone) {
      currentFilterZone = zone;
      searchQuery = '';
      const sInput = document.getElementById('wardSearchInput');
      if (sInput) sInput.value = '';
      const clearBtn = document.getElementById('clearSearchBtn');
      if (clearBtn) clearBtn.classList.add('hidden');

      // Update chip styles
      document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('bg-cyan-600', 'text-white');
        chip.classList.add('bg-slate-800', 'text-slate-300');
      });

      const activeChip = document.getElementById(\`zone-chip-\${zone.replace(/\\s+/g, '')}\`);
      if (activeChip) {
        activeChip.classList.remove('bg-slate-800', 'text-slate-300');
        activeChip.classList.add('bg-cyan-600', 'text-white');
      }

      const matched = renderWardsList();
      updateMapWithSearchResults(matched);
    }

`;

  // We also need to replace the old filterByZone, handleSearch, clearSearch, searchRs located further down!
  const oldFilterFuncMarker = '    // Filter by Zone\n    function filterByZone';
  const oldFitAllMarker = '    // Reset Map to Whole Municipality';
  
  const oldFilterStart = html.indexOf(oldFilterFuncMarker);
  const oldFitAllStart = html.indexOf(oldFitAllMarker);

  if (oldFilterStart !== -1 && oldFitAllStart !== -1) {
    // Remove the old filterByZone, handleSearch, clearSearch, searchRs since they are now included in the new code block
    html = html.substring(0, oldFilterStart) + html.substring(oldFitAllStart);
  }

  // Now replace the renderWardsList block with new code
  const reStartIdx = html.indexOf(renderStart);
  const reEndIdx = html.indexOf(renderEnd);

  html = html.substring(0, reStartIdx) + newRenderAndSearchCode + html.substring(reEndIdx);

  fs.writeFileSync(filename, html, 'utf8');
  console.log('Successfully updated ' + filename + ' with smart search engine and map sync!');
}

updateFile('ward-boundaries.html');
updateFile('bhimavaram-ward-boundaries.html');
