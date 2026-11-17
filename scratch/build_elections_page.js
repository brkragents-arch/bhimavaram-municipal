// Node script to build elections.html
const fs = require('fs');
const path = require('path');

const candidatesFile = fs.readFileSync(path.join(__dirname, '../assets/bhimavaram_election_candidates.js'), 'utf8');
const boundariesFile = fs.readFileSync(path.join(__dirname, '../assets/bhimavaram_52_wards_boundaries.js'), 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="te" class="dark h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="no-referrer">
  <title>భీమవరం పురపాలక సంఘం ఎన్నికలు – 52 వార్డుల అభ్యర్థులు & ఇంటరాక్టివ్ మ్యాప్ (Bhimavaram Municipal Elections)</title>
  
  <meta name="description" content="భీమవరం పురపాలక సంఘం ఎన్నికలు: 52 వార్డుల అభ్యర్థుల అధికారిక జాబితా (జనసేన & టీడీపీ కూటమి), Google Streets ఇంటరాక్టివ్ GIS మ్యాప్, మరియు మౌస్ హోవర్ ద్వారా అభ్యర్థుల వివరాల ప్రత్యక్ష వీక్షణ.">
  <meta name="keywords" content="భీమవరం మున్సిపాలిటీ ఎన్నికలు, Bhimavaram Elections, Ward Candidates, Janasena Party, TDP, Google Streets, Hover Preview, Bhimavaram Wards">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Leaflet CSS (Offline first with CDN fallback) -->
  <link rel="stylesheet" href="leaflet.css" onerror="this.onerror=null;this.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  
  <!-- Leaflet JS (Offline first with CDN fallback) -->
  <script src="leaflet.js" onerror="this.onerror=null;this.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';"></script>
  <script>
    if (typeof L === 'undefined') {
      document.write('<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\\/script>');
    }
  </script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tiro+Telugu:ital@0;1&family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    /* Strict Viewport Layout */
    html, body {
      height: 100% !important;
      max-height: 100% !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
      background-color: #020617;
    }
    body {
      font-family: 'Inter', 'Tiro Telugu', sans-serif;
    }
    .telugu-font {
      font-family: 'Tiro Telugu', 'Gautami', 'Nirmala UI', sans-serif;
    }
    .mono-font {
      font-family: 'JetBrains Mono', monospace;
    }
    
    #appHeader {
      height: 60px;
      flex-shrink: 0;
    }
    
    #mainLayout {
      height: calc(100% - 60px) !important;
      max-height: calc(100% - 60px) !important;
      width: 100% !important;
      display: flex !important;
      flex-direction: row !important;
      overflow: hidden !important;
      min-height: 0 !important;
    }
    
    #sidebarPanel {
      height: 100% !important;
      max-height: 100% !important;
      min-height: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      flex-shrink: 0 !important;
    }
    
    #candidatesListContainer {
      flex: 1 1 0% !important;
      min-height: 0 !important;
      height: auto !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      -webkit-overflow-scrolling: touch !important;
      overscroll-behavior: contain;
    }
    
    #mapPanel {
      flex: 1 1 0% !important;
      height: 100% !important;
      max-height: 100% !important;
      min-height: 0 !important;
      position: relative !important;
      overflow: hidden !important;
      background: #090d16;
    }
    
    #mapContainer {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background: #090d16 !important;
      z-index: 1;
    }

    /* Party Centered Badges */
    .election-ward-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      border-radius: 9999px;
      width: 30px !important;
      height: 30px !important;
      margin-left: -15px !important;
      margin-top: -15px !important;
      cursor: pointer;
      transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.8);
      pointer-events: auto;
    }
    .badge-jsp {
      background: rgba(185, 28, 28, 0.95);
      border: 2px solid #f87171;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.6);
    }
    .badge-tdp {
      background: rgba(161, 98, 7, 0.95);
      border: 2px solid #fde047;
      color: #ffffff;
      box-shadow: 0 0 12px rgba(234, 179, 8, 0.6);
    }
    .badge-pending {
      background: rgba(30, 41, 59, 0.95);
      border: 1.8px solid #94a3b8;
      color: #cbd5e1;
    }
    .election-ward-badge:hover, .election-ward-badge.active {
      transform: scale(1.4);
      z-index: 9999 !important;
      box-shadow: 0 0 20px #ffffff;
    }

    /* Live Floating Hover Tooltip on Map */
    #liveHoverCard {
      position: absolute;
      z-index: 1000;
      pointer-events: none;
      transition: opacity 0.15s ease, transform 0.1s ease;
      opacity: 0;
      max-width: 340px;
    }

    /* Custom Scrollbar */
    #candidatesListContainer::-webkit-scrollbar {
      width: 7px;
    }
    #candidatesListContainer::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.9);
    }
    #candidatesListContainer::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 9999px;
    }
    #candidatesListContainer::-webkit-scrollbar-thumb:hover {
      background: #f59e0b;
    }

    .card-highlight {
      border-color: #38bdf8 !important;
      box-shadow: 0 0 20px rgba(56, 189, 248, 0.35) !important;
      transform: translateX(4px);
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950 antialiased">

  <!-- TOP HEADER -->
  <header id="appHeader" class="border-b border-slate-800 bg-slate-900/95 backdrop-blur z-30 px-3 md:px-5 flex items-center justify-between shadow-md">
    <div class="w-full flex items-center justify-between gap-3">
      
      <!-- Brand & Title -->
      <div class="flex items-center space-x-3">
        <a href="index.html" class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-red-600 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black text-lg border border-amber-400/40 hover:scale-105 transition-transform" title="ముఖ్య వేదికకు వెళ్లండి">
          🗳️
        </a>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="text-sm md:text-base font-extrabold tracking-tight text-white flex items-center gap-2">
              భీమవరం పురపాలక సంఘం ఎన్నికలు – 52 వార్డుల అభ్యర్థుల పటం
            </h1>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1">
              <span>⭐</span> జనసేన 19
            </span>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 flex items-center gap-1">
              <span>🚲</span> టీడీపీ 24
            </span>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              మౌస్ హోవర్ వీక్షణ (Hover)
            </span>
          </div>
          <p class="text-[11px] text-slate-400 telugu-font hidden sm:block">
            వార్డుపై మౌస్ ఉంచినప్పుడు పోటీ చేయు అభ్యర్థి పేరు మరియు వివరాలు ప్రత్యక్షంగా కనిపిస్తాయి • కూటమి అధికారిక జాబితా
          </p>
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex items-center flex-wrap gap-2 text-xs">
        
        <!-- View Source Poster Modal -->
        <button onclick="openPosterModal()" 
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-yellow-600 hover:from-red-500 hover:to-yellow-500 text-white font-extrabold shadow-md transition hover:scale-105 active:scale-95"
                title="అసలు ఎన్నికల అభ్యర్థుల పోస్టర్ చూడండి">
          <span>📜</span>
          <span class="hidden sm:inline">అధికారిక పోస్టర్</span>
          <span class="sm:hidden">పోస్టర్</span>
        </button>

        <!-- Ward Boundaries Page Link -->
        <a href="ward-boundaries.html" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold transition" title="52 వార్డుల గెజిట్ సరిహద్దులు">
          <span>📐 సరిహద్దులు</span>
        </a>

        <!-- Home -->
        <a href="index.html" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition" title="హోమ్ పేజీ">
          <span>🏠 హోమ్</span>
        </a>

        <!-- Mobile View Toggle (List vs Map) -->
        <div class="flex lg:hidden bg-slate-800 rounded-lg p-0.5 border border-slate-700 ml-1">
          <button id="mobileViewListBtn" onclick="setMobileView('list')" class="px-2 py-1 rounded-md text-xs font-bold bg-amber-600 text-white">
            జాబితా
          </button>
          <button id="mobileViewMapBtn" onclick="setMobileView('map')" class="px-2 py-1 rounded-md text-xs font-bold text-slate-300 hover:text-white">
            మ్యాప్
          </button>
        </div>

      </div>

    </div>
  </header>

  <!-- MAIN APP CONTAINER (SPLIT SCREEN) -->
  <main id="mainLayout">

    <!-- LEFT SIDEBAR: CANDIDATE DIRECTORY & POSTER VIEW -->
    <aside id="sidebarPanel" class="w-full lg:w-[480px] xl:w-[530px] 2xl:w-[580px] bg-slate-900 border-r border-slate-800">
      
      <!-- Search & Party Filters -->
      <div class="p-3 md:p-3.5 border-b border-slate-800 bg-slate-900/95 flex flex-col gap-2.5 flex-none">
        
        <!-- Live Search Input -->
        <div class="relative">
          <input type="text" id="candidateSearchInput" oninput="handleSearch(this.value)" 
                 placeholder="అభ్యర్థి పేరు (తెలుగు/English), వార్డు నంబర్ సెర్చ్..." 
                 class="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition shadow-inner" />
          <span class="absolute left-3 top-2.5 text-slate-500 text-xs sm:text-sm">🔍</span>
          <button id="clearSearchBtn" onclick="clearSearch()" class="hidden absolute right-2.5 top-2.5 text-slate-400 hover:text-white text-xs bg-slate-800 rounded-full w-4 h-4 flex items-center justify-center">
            ✕
          </button>
        </div>

        <!-- Party Filter Chips -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs no-scrollbar">
          <button onclick="filterByParty('all')" id="party-chip-all" class="party-chip px-3 py-1.5 rounded-lg font-bold bg-amber-600 text-white whitespace-nowrap shadow-sm">
            అన్ని వార్డులు (52)
          </button>
          <button onclick="filterByParty('JSP')" id="party-chip-JSP" class="party-chip px-3 py-1.5 rounded-lg font-bold bg-slate-800 text-red-400 hover:bg-slate-700 whitespace-nowrap flex items-center gap-1">
            <span>⭐</span> జనసేన (19)
          </button>
          <button onclick="filterByParty('TDP')" id="party-chip-TDP" class="party-chip px-3 py-1.5 rounded-lg font-bold bg-slate-800 text-yellow-400 hover:bg-slate-700 whitespace-nowrap flex items-center gap-1">
            <span>🚲</span> టీడీపీ (24)
          </button>
          <button onclick="filterByParty('pending')" id="party-chip-pending" class="party-chip px-3 py-1.5 rounded-lg font-medium bg-slate-800 text-slate-400 hover:bg-slate-700 whitespace-nowrap">
            పెండింగ్ (9)
          </button>
        </div>

        <!-- Alliance Summary Stats Bar -->
        <div class="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
          <div class="p-1.5 rounded-lg bg-red-950/60 border border-red-500/30">
            <span class="text-[10px] text-red-300 block">జనసేన పార్టీ</span>
            <strong class="text-sm font-extrabold text-red-400">19 వార్డులు</strong>
          </div>
          <div class="p-1.5 rounded-lg bg-yellow-950/60 border border-yellow-500/30">
            <span class="text-[10px] text-yellow-300 block">తెలుగుదేశం</span>
            <strong class="text-sm font-extrabold text-yellow-400">24 వార్డులు</strong>
          </div>
          <div class="p-1.5 rounded-lg bg-slate-950 border border-slate-800">
            <span class="text-[10px] text-slate-400 block">మొత్తం కేటాయింపు</span>
            <strong class="text-sm font-extrabold text-emerald-400">43 / 52</strong>
          </div>
        </div>

      </div>

      <!-- Candidate Cards Scrollable Roster -->
      <div id="candidatesListContainer" class="p-3 md:p-3.5 space-y-2.5">
        <!-- Rendered dynamically -->
      </div>

      <!-- Footer Quick Status -->
      <div class="p-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between flex-none">
        <span>💡 కార్డ్ లేదా మ్యాప్‌పై హోవర్ చేసి వివరాలు చూడండి</span>
        <button onclick="fitAllWardsBounds()" class="text-amber-400 hover:text-amber-300 font-bold whitespace-nowrap ml-2">
          ⟲ మొత్తం పట్టణం
        </button>
      </div>

    </aside>

    <!-- RIGHT MAIN PANEL: INTERACTIVE ELECTION MAP -->
    <section id="mapPanel">
      
      <!-- Floating Map Top Control Bar -->
      <div class="absolute top-3 left-3 right-3 z-[1000] pointer-events-none flex items-start justify-between gap-2">
        
        <!-- Active Basemap Selector -->
        <div class="pointer-events-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-1.5 shadow-xl flex items-center gap-1.5 flex-wrap">
          <span class="text-xs font-bold text-slate-300 pl-1.5 pr-1 flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            మ్యాప్:
          </span>

          <button onclick="setBaseLayer('google_streets')" id="btn-layer-streets" 
                  class="layer-btn px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-600 text-white shadow-sm transition">
            🚗 Google Streets
          </button>
          
          <button onclick="setBaseLayer('google_hybrid')" id="btn-layer-hybrid" 
                  class="layer-btn px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
            🛰️ Hybrid
          </button>

          <button onclick="setBaseLayer('osm')" id="btn-layer-osm" 
                  class="layer-btn px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
            🌐 OSM
          </button>
        </div>

        <!-- Right Quick Action Floating Tools -->
        <div class="pointer-events-auto flex items-center gap-2">
          <button onclick="openPosterModal()" 
                  class="bg-gradient-to-r from-red-600 to-yellow-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-lg border border-amber-400/40 flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
                  title="పోస్టర్ చిత్రం చూడండి">
            <span>🖼️ పోస్టర్ వీక్షణ</span>
          </button>

          <button onclick="fitAllWardsBounds()" 
                  class="bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
                  title="మొత్తం 52 వార్డుల వీక్షణ">
            <span>⛶ రీసెట్</span>
          </button>
        </div>

      </div>

      <!-- Floating Map Legend Card (Bottom Left) -->
      <div class="absolute bottom-4 left-4 z-[1000] pointer-events-none max-w-sm hidden sm:block">
        <div class="pointer-events-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl text-xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-extrabold text-white flex items-center gap-1.5">
              <span>🗳️</span>
              <span>ఎన్నికల అభ్యర్థుల పటం</span>
            </span>
            <span class="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
              కూటమి అభ్యర్థులు
            </span>
          </div>

          <p class="text-slate-300 text-[11px] leading-relaxed">
            మౌస్ పాయింటర్‌ను ఏదైనా వార్డుపై ఉంచినప్పుడు ఆ వార్డు అభ్యర్థి పేరు మరియు గుర్తు ప్రత్యక్షంగా కనిపిస్తాయి.
          </p>

          <div class="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-800 text-[10px]">
            <div class="flex items-center gap-1.5 text-slate-200">
              <span class="w-3.5 h-3.5 rounded-full bg-red-600 border border-red-300 flex items-center justify-center text-[8px] text-white">⭐</span>
              <span>జనసేన అభ్యర్థి (19)</span>
            </div>
            <div class="flex items-center gap-1.5 text-slate-200">
              <span class="w-3.5 h-3.5 rounded-full bg-yellow-500 border border-yellow-200 flex items-center justify-center text-[8px] text-slate-950">🚲</span>
              <span>టీడీపీ అభ్యర్థి (24)</span>
            </div>
            <div class="flex items-center gap-1.5 text-slate-400">
              <span class="w-3.5 h-3.5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-[8px]">•</span>
              <span>ప్రకటన పెండింగ్ (9)</span>
            </div>
            <div class="flex items-center gap-1.5 text-cyan-300">
              <span class="w-3.5 h-1 bg-cyan-400 rounded"></span>
              <span>గెజిట్ సరిహద్దులు</span>
            </div>
          </div>
        </div>
      </div>

      <!-- LIVE FLOATING HOVER CARD -->
      <div id="liveHoverCard" class="bg-slate-900/95 backdrop-blur-md border rounded-2xl p-3.5 shadow-2xl text-xs space-y-2 border-slate-700">
        <!-- Rendered dynamically during mouse hover -->
      </div>

      <!-- Leaflet Map Container -->
      <div id="mapContainer"></div>

    </section>

  </main>

  <!-- ==================== POSTER MODAL ==================== -->
  <div id="posterModal" class="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md hidden flex items-center justify-center p-3 sm:p-6">
    <div class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
      
      <div class="p-3.5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <h2 class="text-sm font-bold text-white flex items-center gap-2">
          <span>📜</span>
          <span>భీమవరం మున్సిపాలిటీ ఎన్నికలు – అధికారిక అభ్యర్థుల పోస్టర్</span>
        </h2>
        <button onclick="closePosterModal()" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold">
          ✕
        </button>
      </div>

      <div class="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-950">
        <img src="assets/bhimavaram_election_candidates_poster.png" alt="Bhimavaram Municipal Elections Candidates Poster" 
             class="max-w-full max-h-[75vh] rounded-xl shadow-2xl border border-slate-800 object-contain" />
      </div>

      <div class="p-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span>జనసేన పార్టీ (19 వార్డులు) & టీడీపీ (24 వార్డులు) అభ్యర్థుల అధికారిక ప్రకటన.</span>
        <button onclick="closePosterModal()" class="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200">
          మూసివేయి
        </button>
      </div>

    </div>
  </div>

  <!-- ==================== EMBEDDED DATASETS ==================== -->
  <script>
${boundariesFile}
  </script>
  <script>
${candidatesFile}
  </script>

  <!-- ==================== JAVASCRIPT APP LOGIC ==================== -->
  <script>
    let map = null;
    let baseLayers = {};
    let activeBaseLayer = 'google_streets';
    let wardLayers = {};
    let wardBadges = {};
    let activeWardId = null;
    let selectedPartyFilter = 'all';
    let searchQuery = '';

    window.addEventListener('DOMContentLoaded', () => {
      initElectionApp();
    });

    function initElectionApp() {
      initMap();
      renderCandidatesList();

      setTimeout(() => {
        if (map) {
          map.invalidateSize();
          fitAllWardsBounds();
        }
      }, 150);

      setTimeout(() => {
        if (map) map.invalidateSize();
      }, 500);

      setTimeout(() => {
        if (map) map.invalidateSize();
      }, 1200);
    }

    // Initialize Map with Panes and Styles
    function initMap() {
      const center = [16.5449, 81.5212];
      map = L.map('mapContainer', {
        center: center,
        zoom: 14,
        minZoom: 11,
        maxZoom: 20,
        zoomControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      map.createPane('wardPolygonPane');
      map.getPane('wardPolygonPane').style.zIndex = 450;

      map.createPane('wardMarkerPane');
      map.getPane('wardMarkerPane').style.zIndex = 650;

      baseLayers.google_streets = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['0', '1', '2', '3'],
        attribution: '&copy; Google Maps Streets'
      });

      baseLayers.google_hybrid = L.tileLayer('https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['0', '1', '2', '3'],
        attribution: '&copy; Google Satellite Hybrid'
      });

      baseLayers.osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      });

      baseLayers.google_streets.addTo(map);

      renderElectionWardPolygons();

      window.addEventListener('resize', () => {
        if (map) map.invalidateSize();
      });

      // Track mouse movement for live hover card positioning
      const mapContainerEl = document.getElementById('mapContainer');
      const hoverCard = document.getElementById('liveHoverCard');

      map.on('mousemove', (e) => {
        if (hoverCard.style.opacity === '1') {
          const pt = map.latLngToContainerPoint(e.latlng);
          hoverCard.style.left = Math.min(pt.x + 18, window.innerWidth - 360) + 'px';
          hoverCard.style.top = Math.min(pt.y + 18, window.innerHeight - 240) + 'px';
        }
      });
    }

    function setBaseLayer(layerKey) {
      if (baseLayers[activeBaseLayer]) {
        map.removeLayer(baseLayers[activeBaseLayer]);
      }
      if (baseLayers[layerKey]) {
        baseLayers[layerKey].addTo(map);
        activeBaseLayer = layerKey;
      }

      document.querySelectorAll('.layer-btn').forEach(btn => {
        btn.classList.remove('bg-amber-600', 'text-white');
        btn.classList.add('bg-slate-800', 'text-slate-300');
      });

      const btnMap = {
        'google_streets': 'btn-layer-streets',
        'google_hybrid': 'btn-layer-hybrid',
        'osm': 'btn-layer-osm'
      };

      const activeBtn = document.getElementById(btnMap[layerKey]);
      if (activeBtn) {
        activeBtn.classList.remove('bg-slate-800', 'text-slate-300');
        activeBtn.classList.add('bg-amber-600', 'text-white');
      }
    }

    // Get Party Theming for a Ward
    function getWardPartyTheme(wardNum) {
      const candidate = BHIMAVARAM_ELECTION_CANDIDATES[wardNum];
      if (!candidate) {
        return {
          party: 'NONE',
          fillColor: '#334155', // Slate
          borderColor: '#64748b',
          badgeClass: 'badge-pending',
          symbol: '•',
          partyLabel: 'ప్రకటన పెండింగ్',
          hasCandidate: false
        };
      }

      if (candidate.party === 'JSP') {
        return {
          party: 'JSP',
          fillColor: '#dc2626', // Red
          borderColor: '#f87171',
          badgeClass: 'badge-jsp',
          symbol: '⭐',
          partyLabel: 'జనసేన పార్టీ',
          hasCandidate: true
        };
      }

      return {
        party: 'TDP',
        fillColor: '#ca8a04', // Yellow / Gold
        borderColor: '#fde047',
        badgeClass: 'badge-tdp',
        symbol: '🚲',
        partyLabel: 'తెలుగుదేశం పార్టీ',
        hasCandidate: true
      };
    }

    // Render Polygons with Party Colors and Mouse Hover Events
    function renderElectionWardPolygons() {
      if (typeof BHIMAVARAM_52_WARDS_DATA === 'undefined') return;

      BHIMAVARAM_52_WARDS_DATA.forEach(ward => {
        const theme = getWardPartyTheme(ward.ward);

        // Vector Polygon
        const polygon = L.polygon(ward.polygon, {
          pane: 'wardPolygonPane',
          color: theme.borderColor,
          weight: theme.hasCandidate ? 2.8 : 1.8,
          opacity: 0.95,
          fillColor: theme.fillColor,
          fillOpacity: theme.hasCandidate ? 0.35 : 0.15,
          className: \`election-poly-\${ward.ward}\`
        }).addTo(map);

        // Centered Badge
        const numberIcon = L.divIcon({
          className: 'custom-div-icon',
          html: \`<div class="election-ward-badge \${theme.badgeClass}" id="election-badge-\${ward.ward}">
                  \${ward.ward}
                 </div>\`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = L.marker(ward.center, { 
          pane: 'wardMarkerPane',
          icon: numberIcon 
        }).addTo(map);

        // MOUSE HOVER OVER WARD EVENT (Crucial User Requirement!)
        polygon.on('mouseover', (e) => {
          showWardHoverPreview(ward.ward, e);
          polygon.setStyle({
            weight: 4.5,
            fillOpacity: 0.65,
            color: '#ffffff'
          });
          polygon.bringToFront();
          highlightSidebarCard(ward.ward);
        });

        polygon.on('mouseout', () => {
          hideWardHoverPreview();
          if (activeWardId !== ward.ward) {
            polygon.setStyle({
              weight: theme.hasCandidate ? 2.8 : 1.8,
              fillOpacity: theme.hasCandidate ? 0.35 : 0.15,
              color: theme.borderColor
            });
          }
        });

        marker.on('mouseover', (e) => {
          showWardHoverPreview(ward.ward, e);
          highlightSidebarCard(ward.ward);
        });

        marker.on('mouseout', () => {
          hideWardHoverPreview();
        });

        // Click Event: Select and focus ward
        polygon.on('click', () => {
          selectElectionWard(ward.ward, true);
        });
        marker.on('click', () => {
          selectElectionWard(ward.ward, true);
        });

        wardLayers[ward.ward] = polygon;
        wardBadges[ward.ward] = marker;
      });
    }

    // Show Live Hover Floating Preview Card
    function showWardHoverPreview(wardNum, e) {
      const hoverCard = document.getElementById('liveHoverCard');
      const ward = BHIMAVARAM_52_WARDS_DATA.find(w => w.ward === wardNum);
      const candidate = BHIMAVARAM_ELECTION_CANDIDATES[wardNum];

      if (!ward) return;

      let candidateHtml = '';
      let partyBadge = '';
      let borderColor = '#64748b';

      if (candidate) {
        if (candidate.party === 'JSP') {
          borderColor = '#ef4444';
          partyBadge = \`<span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-600 text-white shadow-sm flex items-center gap-1">
                          ⭐ జనసేన పార్టీ (JSP)
                        </span>\`;
        } else {
          borderColor = '#eab308';
          partyBadge = \`<span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-yellow-500 text-slate-950 shadow-sm flex items-center gap-1">
                          🚲 తెలుగుదేశం పార్టీ (TDP)
                        </span>\`;
        }

        candidateHtml = \`
          <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 space-y-1">
            <span class="text-[10px] text-slate-400 font-semibold block">పోటీ చేయు కూటమి అభ్యర్థి (Contesting Candidate):</span>
            <div class="text-base font-black text-white leading-tight telugu-font">
              \${candidate.candidateTe}
            </div>
            <div class="text-xs text-amber-300 font-semibold font-sans">
              \${candidate.candidateEn}
            </div>
          </div>
        \`;
      } else {
        borderColor = '#475569';
        partyBadge = \`<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                        ప్రకటన పెండింగ్ (Pending)
                      </span>\`;
        candidateHtml = \`
          <div class="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 italic text-xs">
            ఈ వార్డుకు అభ్యర్థి కేటాయింపు ప్రకటన పెండింగ్‌లో ఉన్నది / పొత్తు కేటాయింపు.
          </div>
        \`;
      }

      hoverCard.style.borderColor = borderColor;
      hoverCard.innerHTML = \`
        <div class="flex items-center justify-between gap-2 border-b border-slate-700/80 pb-2">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-xs border border-slate-600">
              \${ward.ward}
            </span>
            <div>
              <h4 class="font-bold text-white text-xs sm:text-sm leading-tight">వార్డు \${ward.ward}</h4>
              <div class="text-[11px] text-slate-300 font-medium truncate">\${ward.nameEn}</div>
            </div>
          </div>
          \${partyBadge}
        </div>

        \${candidateHtml}

        <div class="text-[10px] text-slate-400 pt-1 flex items-center justify-between border-t border-slate-800">
          <span>ప్రాంతం: \${ward.zone}</span>
          <span class="text-cyan-400 font-medium">క్లిక్ చేసి పూర్తి వివరాలు చూడండి ➔</span>
        </div>
      \`;

      hoverCard.style.opacity = '1';

      if (e && e.containerPoint) {
        hoverCard.style.left = Math.min(e.containerPoint.x + 18, window.innerWidth - 360) + 'px';
        hoverCard.style.top = Math.min(e.containerPoint.y + 18, window.innerHeight - 240) + 'px';
      }
    }

    function hideWardHoverPreview() {
      const hoverCard = document.getElementById('liveHoverCard');
      hoverCard.style.opacity = '0';
    }

    // Highlight corresponding card in the sidebar list
    function highlightSidebarCard(wardNum) {
      document.querySelectorAll('.candidate-card').forEach(c => c.classList.remove('card-highlight'));
      const targetCard = document.getElementById(\`candidate-card-\${wardNum}\`);
      if (targetCard) {
        targetCard.classList.add('card-highlight');
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Select Ward on Click
    function selectElectionWard(wardNum, centerMap = true) {
      activeWardId = wardNum;
      const ward = BHIMAVARAM_52_WARDS_DATA.find(w => w.ward === wardNum);
      const poly = wardLayers[wardNum];

      if (poly && centerMap) {
        map.fitBounds(poly.getBounds(), {
          padding: [50, 50],
          maxZoom: 16,
          animate: true,
          duration: 0.8
        });
        showWardHoverPreview(wardNum, { containerPoint: { x: window.innerWidth / 2, y: window.innerHeight / 2 } });
      }

      highlightSidebarCard(wardNum);
    }

    // Render Candidates Roster in Sidebar
    function renderCandidatesList() {
      const container = document.getElementById('candidatesListContainer');
      if (!container || typeof BHIMAVARAM_52_WARDS_DATA === 'undefined') return;
      container.innerHTML = '';

      let list = BHIMAVARAM_52_WARDS_DATA.map(w => {
        const candidate = BHIMAVARAM_ELECTION_CANDIDATES[w.ward];
        return {
          ...w,
          candidate: candidate || null
        };
      });

      // Filter by party
      if (selectedPartyFilter === 'JSP') {
        list = list.filter(w => w.candidate && w.candidate.party === 'JSP');
      } else if (selectedPartyFilter === 'TDP') {
        list = list.filter(w => w.candidate && w.candidate.party === 'TDP');
      } else if (selectedPartyFilter === 'pending') {
        list = list.filter(w => !w.candidate);
      }

      // Filter by search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        list = list.filter(w => {
          const matchWard = w.ward.toString() === q;
          const matchName = w.nameEn.toLowerCase().includes(q) || w.nameTe.toLowerCase().includes(q);
          const matchCandTe = w.candidate && w.candidate.candidateTe.toLowerCase().includes(q);
          const matchCandEn = w.candidate && w.candidate.candidateEn.toLowerCase().includes(q);
          return matchWard || matchName || matchCandTe || matchCandEn;
        });
      }

      if (list.length === 0) {
        container.innerHTML = \`
          <div class="p-8 text-center text-slate-500">
            <span class="text-3xl block mb-2">🔍</span>
            <p class="text-sm font-semibold text-slate-400">అభ్యర్థులు కనుగొనబడలేదు</p>
            <button onclick="clearSearch()" class="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 text-amber-400 text-xs font-semibold hover:bg-slate-700">
              ఫిల్టర్లను రీసెట్ చేయండి
            </button>
          </div>
        \`;
        return;
      }

      list.forEach(w => {
        const c = w.candidate;
        const card = document.createElement('div');
        card.id = \`candidate-card-\${w.ward}\`;
        card.className = \`candidate-card p-3 rounded-2xl border transition-all duration-200 cursor-pointer \${
          c ? (c.party === 'JSP' ? 'bg-red-950/20 border-red-900/60 hover:border-red-500/80 hover:bg-red-950/40' : 'bg-yellow-950/20 border-yellow-900/60 hover:border-yellow-500/80 hover:bg-yellow-950/40') : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
        }\`;

        // Card Hover on list highlights ward on map
        card.addEventListener('mouseenter', (e) => {
          showWardHoverPreview(w.ward, e);
          const poly = wardLayers[w.ward];
          if (poly) {
            poly.setStyle({ weight: 4.5, fillOpacity: 0.65, color: '#ffffff' });
            poly.bringToFront();
          }
        });

        card.addEventListener('mouseleave', () => {
          hideWardHoverPreview();
          const poly = wardLayers[w.ward];
          const theme = getWardPartyTheme(w.ward);
          if (poly && activeWardId !== w.ward) {
            poly.setStyle({
              weight: theme.hasCandidate ? 2.8 : 1.8,
              fillOpacity: theme.hasCandidate ? 0.35 : 0.15,
              color: theme.borderColor
            });
          }
        });

        card.addEventListener('click', () => {
          selectElectionWard(w.ward, true);
        });

        let partyPill = '';
        let candidateNameHtml = '';

        if (c) {
          if (c.party === 'JSP') {
            partyPill = \`<span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-600 text-white flex items-center gap-1 shadow-sm">
                          ⭐ జనసేన
                         </span>\`;
          } else {
            partyPill = \`<span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-yellow-500 text-slate-950 flex items-center gap-1 shadow-sm">
                          🚲 టీడీపీ
                         </span>\`;
          }

          candidateNameHtml = \`
            <div class="mt-1.5 pt-1.5 border-t border-slate-800/80 flex items-start gap-2">
              <div class="w-8 h-8 rounded-full \${c.party === 'JSP' ? 'bg-red-600/30 text-red-300 border-red-500/50' : 'bg-yellow-600/30 text-yellow-300 border-yellow-500/50'} border flex items-center justify-center font-bold text-sm flex-none">
                \${c.party === 'JSP' ? '⭐' : '🚲'}
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-xs sm:text-sm font-black text-white telugu-font leading-tight truncate">
                  \${c.candidateTe}
                </div>
                <div class="text-[11px] text-slate-300 truncate">
                  \${c.candidateEn}
                </div>
              </div>
            </div>
          \`;
        } else {
          partyPill = \`<span class="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
                        పెండింగ్
                       </span>\`;
          candidateNameHtml = \`
            <div class="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[11px] text-slate-500 italic">
              అభ్యర్థి కేటాయింపు ప్రకటన పెండింగ్‌లో ఉంది.
            </div>
          \`;
        }

        card.innerHTML = \`
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 font-mono font-bold text-xs flex items-center justify-center text-white">
                \${w.ward}
              </span>
              <div>
                <h4 class="font-bold text-white text-xs truncate">వార్డు నం. \${w.ward}</h4>
                <div class="text-[10px] text-slate-400 truncate">\${w.nameEn}</div>
              </div>
            </div>
            \${partyPill}
          </div>

          \${candidateNameHtml}

          <div class="mt-2 pt-1 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
            <span>\${w.zone}</span>
            <span class="text-amber-400 font-semibold">మ్యాప్‌లో వీక్షించండి ➔</span>
          </div>
        \`;

        container.appendChild(card);
      });
    }

    function filterByParty(party) {
      selectedPartyFilter = party;

      document.querySelectorAll('.party-chip').forEach(chip => {
        chip.classList.remove('bg-amber-600', 'text-white');
        chip.classList.add('bg-slate-800', 'text-slate-300');
      });

      const activeChip = document.getElementById(\`party-chip-\${party}\`);
      if (activeChip) {
        activeChip.classList.remove('bg-slate-800', 'text-slate-300');
        activeChip.classList.add('bg-amber-600', 'text-white');
      }

      renderCandidatesList();
    }

    function handleSearch(val) {
      searchQuery = val;
      const clearBtn = document.getElementById('clearSearchBtn');
      if (val.trim() !== '') {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
      renderCandidatesList();
    }

    function clearSearch() {
      document.getElementById('candidateSearchInput').value = '';
      searchQuery = '';
      document.getElementById('clearSearchBtn').classList.add('hidden');
      selectedPartyFilter = 'all';
      filterByParty('all');
    }

    function fitAllWardsBounds() {
      const allPolys = Object.values(wardLayers);
      if (allPolys.length > 0 && map) {
        const group = L.featureGroup(allPolys);
        map.fitBounds(group.getBounds(), { padding: [25, 25], animate: true });
      }
    }

    function openPosterModal() {
      document.getElementById('posterModal').classList.remove('hidden');
    }
    function closePosterModal() {
      document.getElementById('posterModal').classList.add('hidden');
    }

    function setMobileView(view) {
      const sidebar = document.getElementById('sidebarPanel');
      const mapP = document.getElementById('mapPanel');
      const listBtn = document.getElementById('mobileViewListBtn');
      const mapBtn = document.getElementById('mobileViewMapBtn');

      if (view === 'list') {
        sidebar.classList.remove('hidden');
        mapP.classList.add('hidden');
        listBtn.classList.add('bg-amber-600', 'text-white');
        listBtn.classList.remove('text-slate-300');
        mapBtn.classList.remove('bg-amber-600', 'text-white');
        mapBtn.classList.add('text-slate-300');
      } else {
        sidebar.classList.add('hidden');
        mapP.classList.remove('hidden');
        mapBtn.classList.add('bg-amber-600', 'text-white');
        mapBtn.classList.remove('text-slate-300');
        listBtn.classList.remove('bg-amber-600', 'text-white');
        listBtn.classList.add('text-slate-300');

        setTimeout(() => {
          if (map) map.invalidateSize();
        }, 100);
      }
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../elections.html'), htmlContent, 'utf8');
fs.writeFileSync(path.join(__dirname, '../bhimavaram-elections.html'), htmlContent, 'utf8');
console.log('Successfully generated elections.html and bhimavaram-elections.html');
