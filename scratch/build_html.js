// Node script to build robust ward-boundaries.html
const fs = require('fs');
const path = require('path');

const dataFileContent = fs.readFileSync(path.join(__dirname, '../assets/bhimavaram_52_wards_boundaries.js'), 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="te" class="dark h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="no-referrer">
  <title>భీమవరం పురపాలక సంఘం – 52 వార్డుల అధికారిక సరిహద్దులు & Google Streets GIS పోర్టల్ (Bhimavaram 52 Wards Official Boundaries)</title>
  
  <meta name="description" content="భీమవరం పురపాలక సంఘం 52 వార్డుల అధికారిక గెజిట్ సరిహద్దు వివరాలు (Source List as in Notification), Google Streets ఇంటరాక్టివ్ GIS మ్యాప్, ISRO భువన్ Cadastral RS Numbers రిఫరెన్స్ మరియు AP CDMA పోర్టల్ సమగ్ర వేదిక.">
  <meta name="keywords" content="భీమవరం మున్సిపాలిటీ, Bhimavaram Municipality, 52 Wards Boundaries, Source Gazette, Google Streets, ISRO Bhuvan Cadastral RS Numbers, AP CDMA GIS Map, Gunupudi, Rayalam, Chinamiram">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Leaflet CSS (Local offline + CDN fallback) -->
  <link rel="stylesheet" href="leaflet.css" onerror="this.onerror=null;this.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  
  <!-- Leaflet JS (Local offline + CDN fallback) -->
  <script src="leaflet.js" onerror="this.onerror=null;this.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';"></script>
  <script>
    if (typeof L === 'undefined') {
      document.write('<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\\/script>');
    }
  </script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Tiro+Telugu:ital@0;1&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    /* Strict Full-Height Non-Collapsing Layout */
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
      height: 56px;
      flex-shrink: 0;
    }
    
    #mainLayout {
      height: calc(100% - 56px) !important;
      max-height: calc(100% - 56px) !important;
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
    
    #sidebarHeader {
      flex-shrink: 0 !important;
    }
    
    #wardsListContainer {
      flex: 1 1 0% !important;
      min-height: 0 !important;
      height: auto !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      -webkit-overflow-scrolling: touch !important;
      overscroll-behavior: contain;
    }
    
    #sidebarFooter {
      flex-shrink: 0 !important;
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

    /* Centered Ward Badge Marker */
    .ward-num-marker {
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.95);
      border: 2px solid #38bdf8;
      color: #38bdf8;
      font-weight: 800;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      border-radius: 9999px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 0 10px rgba(56, 189, 248, 0.6);
      width: 28px !important;
      height: 28px !important;
      margin-left: -14px !important;
      margin-top: -14px !important;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: auto;
    }
    .ward-num-marker:hover, .ward-num-marker.active {
      transform: scale(1.35);
      background: #0284c7;
      color: #ffffff;
      border-color: #ffffff;
      box-shadow: 0 0 18px rgba(56, 189, 248, 1);
      z-index: 9999 !important;
    }

    /* Custom Scrollbar for Left List */
    #wardsListContainer::-webkit-scrollbar {
      width: 7px;
    }
    #wardsListContainer::-webkit-scrollbar-track {
      background: rgba(15, 23, 42, 0.9);
    }
    #wardsListContainer::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 9999px;
    }
    #wardsListContainer::-webkit-scrollbar-thumb:hover {
      background: #06b6d4;
    }

    .ward-card-highlight {
      border-color: #06b6d4 !important;
      box-shadow: 0 0 22px rgba(6, 182, 212, 0.4) !important;
    }

    .rs-pill {
      transition: all 0.15s ease-in-out;
    }
    .rs-pill:hover {
      transform: scale(1.08);
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white antialiased">

  <!-- TOP HEADER / PORTAL NAVIGATION -->
  <header id="appHeader" class="border-b border-slate-800 bg-slate-900/95 backdrop-blur z-30 px-3 md:px-5 flex items-center justify-between shadow-md">
    <div class="w-full flex items-center justify-between gap-3">
      
      <!-- Brand & Title -->
      <div class="flex items-center space-x-3">
        <a href="index.html" class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-black text-base border border-cyan-400/40 hover:scale-105 transition-transform" title="ముఖ్య వేదికకు వెళ్లండి">
          🏛️
        </a>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <h1 class="text-sm md:text-base font-extrabold tracking-tight text-white flex items-center gap-2">
              భీమవరం పురపాలక సంఘం – 52 వార్డుల అధికారిక సరిహద్దులు
            </h1>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              గెజిట్ నోటిఫికేషన్ (Source)
            </span>
            <span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Google Streets GIS
            </span>
          </div>
          <p class="text-[11px] text-slate-400 telugu-font hidden sm:block">
            అధికారిక డీలిమిటేషన్ సరిహద్దులు (Wards 1 to 52) • ISRO భువన్ RS నంబర్ల మ్యాపింగ్ • AP CDMA GIS రిఫరెన్స్
          </p>
        </div>
      </div>

      <!-- Quick Portals & Module Switcher Buttons -->
      <div class="flex items-center flex-wrap gap-2 text-xs">
        
        <!-- AP CDMA GIS Portal Link -->
        <a href="https://bhimavaram.cdma.ap.gov.in/ulbprofile/bhimavaram/gis-map/" target="_blank" rel="noopener noreferrer" 
           class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 font-semibold shadow-sm transition hover:scale-105"
           title="AP CDMA భీమవరం అధికారిక GIS పోర్టల్ కొత్త ట్యాబ్‌లో తెరవండి">
          <span class="text-sm">🌐</span>
          <span class="hidden md:inline">CDMA GIS పోర్టల్</span>
          <span class="md:hidden">CDMA</span>
          <span class="text-[10px] text-emerald-400 opacity-75">↗</span>
        </a>

        <!-- ISRO Bhuvan RS Registry Button -->
        <button onclick="openRsRegistryModal()" 
                class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/40 font-semibold shadow-sm transition hover:scale-105"
                title="ISRO Bhuvan Cadastral RS నంబర్ల రిజిస్ట్రీ మరియు డైరెక్టరీ తెరవండి">
          <span class="text-sm">🛰️</span>
          <span>RS నంబర్లు (<span id="topRsCount">76</span>)</span>
        </button>

        <!-- Navigation back to Home / Other modules -->
        <a href="index.html" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition" title="ప్రధాన వేదిక">
          <span>🏠 హోమ్</span>
        </a>
        <a href="gis-ward-map.html" class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium transition" title="39 వార్డుల పాత GIS పటం">
          <span>🗺️ 39 Wards</span>
        </a>

        <!-- Mobile View Toggle (List vs Map) -->
        <div class="flex lg:hidden bg-slate-800 rounded-lg p-0.5 border border-slate-700 ml-1">
          <button id="mobileViewListBtn" onclick="setMobileView('list')" class="px-2 py-1 rounded-md text-xs font-bold bg-cyan-600 text-white">
            జాబితా
          </button>
          <button id="mobileViewMapBtn" onclick="setMobileView('map')" class="px-2 py-1 rounded-md text-xs font-bold text-slate-300 hover:text-white">
            మ్యాప్
          </button>
        </div>

      </div>

    </div>
  </header>

  <!-- MAIN APP CONTAINER (SPLIT SCREEN: SIDEBAR LIST & MAP VIEW) -->
  <main id="mainLayout">

    <!-- LEFT SIDEBAR: SOURCE BOUNDARIES DIRECTORY & EXPLORER -->
    <aside id="sidebarPanel" class="w-full lg:w-[480px] xl:w-[540px] 2xl:w-[600px] bg-slate-900 border-r border-slate-800">
      
      <!-- Search & Filters Header -->
      <div id="sidebarHeader" class="p-3 md:p-3.5 border-b border-slate-800 bg-slate-900/95 flex flex-col gap-2">
        
        <!-- Live Instant Search Input -->
        <div class="relative">
          <input type="text" id="wardSearchInput" oninput="handleSearch(this.value)" 
                 placeholder="వార్డు నం, RS No (ఉదా: 651, 302, 100), D.No, లేదా ప్రాంతం..." 
                 class="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition shadow-inner" />
          <span class="absolute left-3 top-2.5 text-slate-500 text-xs sm:text-sm">🔍</span>
          <button id="clearSearchBtn" onclick="clearSearch()" class="hidden absolute right-2.5 top-2.5 text-slate-400 hover:text-white text-xs bg-slate-800 rounded-full w-4 h-4 flex items-center justify-center">
            ✕
          </button>
        </div>

        <!-- Filter Chips: Zones & Revenue Villages -->
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button onclick="filterByZone('all')" id="zone-chip-all" class="filter-chip px-2.5 py-1 rounded-lg font-bold bg-cyan-600 text-white whitespace-nowrap shadow-sm">
            అన్నీ (All 52)
          </button>
          <button onclick="filterByZone('North')" id="zone-chip-North" class="filter-chip px-2.5 py-1 rounded-lg font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">
            ఉత్తరం (North)
          </button>
          <button onclick="filterByZone('One Town')" id="zone-chip-OneTown" class="filter-chip px-2.5 py-1 rounded-lg font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">
            వన్ టౌన్
          </button>
          <button onclick="filterByZone('Two Town')" id="zone-chip-TwoTown" class="filter-chip px-2.5 py-1 rounded-lg font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">
            టూ టౌన్
          </button>
          <button onclick="filterByZone('Gunupudi')" id="zone-chip-Gunupudi" class="filter-chip px-2.5 py-1 rounded-lg font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">
            గునుపూడి
          </button>
          <button onclick="filterByZone('Rayalam')" id="zone-chip-Rayalam" class="filter-chip px-2.5 py-1 rounded-lg font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">
            రాయలం
          </button>
          <button onclick="filterByZone('Chinamiram')" id="zone-chip-Chinamiram" class="filter-chip px-2.5 py-1 rounded-lg font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 whitespace-nowrap">
            చినమిరం / SRKR
          </button>
        </div>

        <!-- Statistics & Control Toolbar -->
        <div class="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
          <div class="flex items-center gap-2">
            <span>చూపిస్తున్న వార్డులు: <strong id="displayedCount" class="text-cyan-400 font-bold">52</strong>/52</span>
            <span class="text-slate-600">|</span>
            <button onclick="toggleExpandAll()" id="expandAllBtn" class="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-medium">
              అన్నీ విస్తరించు
            </button>
          </div>
          <button onclick="openSourceInfoModal()" class="text-slate-400 hover:text-white flex items-center gap-1 font-medium" title="గెజిట్ నోటిఫికేషన్ వివరాలు">
            <span>ℹ️ మూలం (Source)</span>
          </button>
        </div>

      </div>

      <!-- Scrollable Wards Boundary Cards List (100% Guaranteed Scrollable) -->
      <div id="wardsListContainer" class="p-3 md:p-3.5 space-y-3">
        <!-- Rendered dynamically by JavaScript -->
      </div>

      <!-- Footer Quick Status -->
      <div id="sidebarFooter" class="p-2.5 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span class="truncate">📍 క్లిక్ చేసి మ్యాప్‌లో వార్డు సరిహద్దు వీక్షించండి</span>
        <button onclick="fitAllWardsBounds()" class="text-cyan-400 hover:text-cyan-300 font-bold whitespace-nowrap ml-2">
          ⟲ మొత్తం పట్టణం
        </button>
      </div>

    </aside>

    <!-- RIGHT MAIN PANEL: INTERACTIVE GOOGLE STREETS MAP -->
    <section id="mapPanel">
      
      <!-- Map Controls Floating Overlay Bar -->
      <div class="absolute top-3 left-3 right-3 z-[1000] pointer-events-none flex items-start justify-between gap-2">
        
        <!-- Active Basemap Selector (Pointer Events Enabled) -->
        <div class="pointer-events-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl p-1.5 shadow-xl flex items-center gap-1.5 flex-wrap">
          
          <span class="text-xs font-bold text-slate-300 pl-1.5 pr-1 flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            మ్యాప్:
          </span>

          <button onclick="setBaseLayer('google_streets')" id="btn-layer-streets" 
                  class="layer-btn px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-600 text-white shadow-sm transition">
            🚗 Google Streets
          </button>
          
          <button onclick="setBaseLayer('google_hybrid')" id="btn-layer-hybrid" 
                  class="layer-btn px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
            🛰️ Satellite & Roads
          </button>

          <button onclick="setBaseLayer('carto_streets')" id="btn-layer-carto" 
                  class="layer-btn px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
            🗺️ Voyager Streets
          </button>

          <button onclick="setBaseLayer('osm')" id="btn-layer-osm" 
                  class="layer-btn px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition">
            🌐 OSM
          </button>

        </div>

        <!-- Right Quick Action Floating Tools -->
        <div class="pointer-events-auto flex items-center gap-2">
          
          <!-- RS Numbers Directory Quick Button -->
          <button onclick="openRsRegistryModal()" 
                  class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-indigo-400/30 flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
                  title="ISRO Bhuvan RS నంబర్ల జాబితా">
            <span>🔍 RS Nos డైరెక్టరీ</span>
          </button>

          <!-- Reset Zoom to Entire Municipality -->
          <button onclick="fitAllWardsBounds()" 
                  class="bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
                  title="భీమవరం మొత్తం 52 వార్డుల వీక్షణ">
            <span>⛶ రీసెట్ వీక్షణ</span>
          </button>

        </div>

      </div>

      <!-- Floating Map Legend Card (Bottom Left) -->
      <div class="absolute bottom-4 left-4 z-[1000] pointer-events-none max-w-sm hidden sm:block">
        <div class="pointer-events-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-2xl p-3.5 shadow-2xl text-xs space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-extrabold text-white flex items-center gap-1.5">
              <span>🏛️</span>
              <span>భీమవరం పురపాలక సంఘం</span>
            </span>
            <span class="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
              52 వార్డుల సరిహద్దులు
            </span>
          </div>

          <p class="text-slate-300 text-[11px] leading-relaxed">
            ఈ మ్యాప్‌లో ప్రతి వార్డు సరిహద్దులు అధికారిక నోటిఫికేషన్ వర్ణనల ప్రకారం (ఉత్తరం, తూర్పు, దక్షిణం, పడమర) Google Streets రోడ్లపై చూపబడ్డాయి.
          </p>

          <div class="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-800 text-[10px]">
            <div class="flex items-center gap-1.5 text-slate-300">
              <span class="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-400"></span>
              <span>వార్డు సరిహద్దు (Polygon)</span>
            </div>
            <div class="flex items-center gap-1.5 text-slate-300">
              <span class="w-3 h-3 rounded-full bg-slate-900 border border-cyan-400 text-[8px] flex items-center justify-center font-bold text-cyan-300">1</span>
              <span>వార్డు నెంబర్ (Center)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Leaflet Map Canvas Container -->
      <div id="mapContainer"></div>

    </section>

  </main>

  <!-- ==================== MODALS & DRAWERS ==================== -->

  <!-- 1. ISRO BHUVAN RS NUMBERS REGISTRY MODAL -->
  <div id="rsRegistryModal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm hidden flex items-center justify-center p-3 sm:p-6">
    <div class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
      
      <div class="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between flex-wrap gap-2">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 text-lg">
            🛰️
          </div>
          <div>
            <h2 class="text-base font-bold text-white flex items-center gap-2">
              ISRO Bhuvan Cadastral RS నంబర్ల రిజిస్ట్రీ (Revenue Survey Numbers)
            </h2>
            <p class="text-xs text-slate-400 telugu-font">
              నోటిఫికేషన్‌లో పేర్కొన్న అన్ని రెవెన్యూ సర్వే నంబర్లు, గ్రామాలు మరియు వార్డులు
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <a href="https://bhuvan-app1.nrsc.gov.in/cadastral/" target="_blank" rel="noopener noreferrer" 
             class="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow-md transition">
            <span>భువన్ పోర్టల్ తెరువు</span>
            <span class="text-xs">↗</span>
          </a>
          <button onclick="closeRsRegistryModal()" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold">
            ✕
          </button>
        </div>
      </div>

      <div class="p-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-3 flex-wrap">
        <div class="relative flex-1 min-w-[200px]">
          <input type="text" id="rsModalSearchInput" oninput="filterRsTable(this.value)" 
                 placeholder="RS No (ఉదా: 651, 302, 100) లేదా గ్రామం సెర్చ్..." 
                 class="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500" />
          <span class="absolute left-2.5 top-2 text-slate-500 text-xs">🔍</span>
        </div>
        <div class="text-xs text-slate-400">
          మొత్తం ఇండెక్స్ చేయబడిన సర్వే నంబర్లు: <strong id="modalRsCount" class="text-indigo-400 font-bold">76</strong>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/40 sticky top-0">
              <th class="py-2 px-3">RS నంబర్ (R.S. No)</th>
              <th class="py-2 px-3">రెవెన్యూ గ్రామం (Revenue Village)</th>
              <th class="py-2 px-3">సంబంధిత వార్డులు (Wards)</th>
              <th class="py-2 px-3 text-right">మ్యాప్ లింకులు (Bhuvan & Google)</th>
            </tr>
          </thead>
          <tbody id="rsTableBody" class="divide-y divide-slate-800/60 font-medium">
            <!-- Rendered dynamically -->
          </tbody>
        </table>
      </div>

      <div class="p-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span>💡 RS No పై క్లిక్ చేయడం ద్వారా ఆ సర్వే నంబర్ ఉన్న వార్డులని వీక్షించవచ్చు.</span>
        <button onclick="closeRsRegistryModal()" class="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200">
          మూసివేయి (Close)
        </button>
      </div>

    </div>
  </div>

  <!-- 2. SOURCE GAZETTE NOTIFICATION & CDMA INFORMATION MODAL -->
  <div id="sourceInfoModal" class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm hidden flex items-center justify-center p-3 sm:p-6">
    <div class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
      
      <div class="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <h2 class="text-base font-bold text-white flex items-center gap-2">
          <span>📜</span>
          <span>అధికారిక గెజిట్ మూలం & రిఫరెన్స్ వివరాలు</span>
        </h2>
        <button onclick="closeSourceInfoModal()" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold">
          ✕
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-4 text-xs text-slate-300 leading-relaxed">
        <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
          <h3 class="font-bold text-cyan-400 text-sm">1. గెజిట్ నోటిఫికేషన్ వివరాలు (Official Gazette Source)</h3>
          <p>
            ఈ వెబ్‌పేజీలోని 52 వార్డుల సరిహద్దు వర్ణనలు (North, East, South, West) భీమవరం పురపాలక సంఘం అధికారిక సరిహద్దు పునర్విభజన గెజిట్ ఆర్డర్ (పేజీలు 1 నుండి 17) నుండి యథాతథంగా సేకరించబడ్డాయి.
          </p>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
          <h3 class="font-bold text-emerald-400 text-sm">2. AP CDMA GIS పోర్టల్ రిఫరెన్స్</h3>
          <a href="https://bhimavaram.cdma.ap.gov.in/ulbprofile/bhimavaram/gis-map/" target="_blank" rel="noopener noreferrer" 
             class="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-mono underline break-all">
            https://bhimavaram.cdma.ap.gov.in/ulbprofile/bhimavaram/gis-map/
          </a>
        </div>
        <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
          <h3 class="font-bold text-indigo-400 text-sm">3. ISRO భువన్ పోర్టల్ (RS Nos & Cadastral Mapping)</h3>
          <p>
            నేషనల్ రిమోట్ సెన్సింగ్ సెంటర్ (NRSC) భువన్ పోర్టల్ ద్వారా రెవెన్యూ సర్వే నంబర్ల (RS Nos) సరిహద్దుల ధృవీకరణ:
          </p>
          <div class="space-y-1 font-mono text-[11px]">
            <div>• <a href="https://bhuvan-app1.nrsc.gov.in/cadastral/" target="_blank" class="text-indigo-400 hover:underline">Bhuvan Cadastral Portal</a></div>
            <div>• <a href="https://bhuvan.nrsc.gov.in/bhuvan_2d.php" target="_blank" class="text-indigo-400 hover:underline">Bhuvan 2D/3D Geoportal</a></div>
          </div>
        </div>
      </div>

      <div class="p-3 bg-slate-950 border-t border-slate-800 text-right">
        <button onclick="closeSourceInfoModal()" class="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs">
          అర్థమైంది (Understood)
        </button>
      </div>

    </div>
  </div>

  <!-- TOAST NOTIFICATION CONTAINER -->
  <div id="toastNotification" class="fixed bottom-5 right-5 z-50 bg-slate-900 border border-cyan-500/50 text-white text-xs px-4 py-2.5 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-20 opacity-0 pointer-events-none flex items-center gap-2">
    <span class="text-base text-cyan-400">✓</span>
    <span id="toastMessage">టెక్స్ట్ కాపీ చేయబడింది!</span>
  </div>

  <!-- ==================== EMBEDDED COMPLETE DATASET ==================== -->
  <script>
${dataFileContent}
  </script>

  <!-- ==================== JAVASCRIPT LOGIC ==================== -->
  <script>
    // Global Application State
    let map = null;
    let baseLayers = {};
    let activeBaseLayer = 'google_streets';
    let wardLayers = {};
    let wardCentroidMarkers = {};
    let activeWardId = null;
    let expandedWards = new Set();
    let currentFilterZone = 'all';
    let searchQuery = '';

    // Initialize Map and UI when DOM is ready
    window.addEventListener('DOMContentLoaded', () => {
      initApp();
    });

    function initApp() {
      initMap();
      renderWardsList();
      renderRsRegistryTable();
      updateDisplayedCounts();

      // Recalculate map dimensions repeatedly after DOM rendering
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

    // 1. Initialize Leaflet Map with Panes and Multiple Basemaps
    function initMap() {
      const center = (typeof BHIMAVARAM_MUNICIPALITY_METADATA !== 'undefined' && BHIMAVARAM_MUNICIPALITY_METADATA.centerCoordinates) 
        ? BHIMAVARAM_MUNICIPALITY_METADATA.centerCoordinates 
        : [16.5449, 81.5212];
      
      const defaultZoom = (typeof BHIMAVARAM_MUNICIPALITY_METADATA !== 'undefined' && BHIMAVARAM_MUNICIPALITY_METADATA.defaultZoom)
        ? BHIMAVARAM_MUNICIPALITY_METADATA.defaultZoom
        : 14;

      map = L.map('mapContainer', {
        center: center,
        zoom: defaultZoom,
        minZoom: 11,
        maxZoom: 20,
        zoomControl: false
      });

      // Add Zoom Control at Top Right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Dedicated Panes for Crisp Z-Index Layering
      map.createPane('wardPolygonPane');
      map.getPane('wardPolygonPane').style.zIndex = 450; // Vectors above base tiles

      map.createPane('wardMarkerPane');
      map.getPane('wardMarkerPane').style.zIndex = 650; // Centered badges above vectors

      // Basemap Providers
      // 1. Google Streets (Standard high-clarity roads & labels)
      baseLayers.google_streets = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['0', '1', '2', '3'],
        attribution: '&copy; Google Maps Streets'
      });

      // 2. Google Hybrid (Satellite + Roads & Labels)
      baseLayers.google_hybrid = L.tileLayer('https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['0', '1', '2', '3'],
        attribution: '&copy; Google Satellite Hybrid'
      });

      // 3. Carto Voyager Streets (Clean, high-performance streets fallback)
      baseLayers.carto_streets = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        subdomains: 'abcd',
        attribution: '&copy; CARTO &copy; OpenStreetMap'
      });

      // 4. OpenStreetMap
      baseLayers.osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      });

      // Add Default Active Layer: Google Streets
      baseLayers.google_streets.addTo(map);

      // Render all 52 Ward Polygons & Badges
      renderWardPolygonsOnMap();

      // Listen for window resize
      window.addEventListener('resize', () => {
        if (map) map.invalidateSize();
      });
    }

    // Switch Basemap Layer
    function setBaseLayer(layerKey) {
      if (baseLayers[activeBaseLayer]) {
        map.removeLayer(baseLayers[activeBaseLayer]);
      }
      if (baseLayers[layerKey]) {
        baseLayers[layerKey].addTo(map);
        activeBaseLayer = layerKey;
      }

      // Update button styling
      document.querySelectorAll('.layer-btn').forEach(btn => {
        btn.classList.remove('bg-cyan-600', 'text-white');
        btn.classList.add('bg-slate-800', 'text-slate-300');
      });

      const btnMap = {
        'google_streets': 'btn-layer-streets',
        'google_hybrid': 'btn-layer-hybrid',
        'carto_streets': 'btn-layer-carto',
        'osm': 'btn-layer-osm'
      };

      const activeBtn = document.getElementById(btnMap[layerKey]);
      if (activeBtn) {
        activeBtn.classList.remove('bg-slate-800', 'text-slate-300');
        activeBtn.classList.add('bg-cyan-600', 'text-white');
      }
    }

    // Distinct Colors for Zones
    function getZoneColor(zone) {
      if (!zone) return '#06b6d4';
      if (zone.includes('North')) return '#38bdf8'; // Sky Blue
      if (zone.includes('One Town')) return '#f59e0b'; // Amber
      if (zone.includes('Two Town')) return '#ec4899'; // Pink
      if (zone.includes('East') || zone.includes('Gunupudi')) return '#10b981'; // Emerald
      if (zone.includes('South')) return '#8b5cf6'; // Purple
      if (zone.includes('West') || zone.includes('Rayalam')) return '#f97316'; // Orange
      if (zone.includes('Chinamiram') || zone.includes('Pedamiram')) return '#06b6d4'; // Cyan
      return '#3b82f6';
    }

    // 2. Render all 52 Ward Polygons on Leaflet Map
    function renderWardPolygonsOnMap() {
      if (typeof BHIMAVARAM_52_WARDS_DATA === 'undefined') return;

      BHIMAVARAM_52_WARDS_DATA.forEach(ward => {
        const zoneColor = getZoneColor(ward.zone);

        // Vector Polygon
        const polygon = L.polygon(ward.polygon, {
          pane: 'wardPolygonPane',
          color: zoneColor,
          weight: 2.5,
          opacity: 0.9,
          fillColor: zoneColor,
          fillOpacity: 0.28,
          className: \`ward-poly-\${ward.ward}\`
        }).addTo(map);

        // Centroid marker with ward number
        const numberIcon = L.divIcon({
          className: 'custom-div-icon',
          html: \`<div class="ward-num-marker" id="ward-marker-\${ward.ward}">\${ward.ward}</div>\`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker(ward.center, { 
          pane: 'wardMarkerPane',
          icon: numberIcon 
        }).addTo(map);

        // Tooltip on Hover
        polygon.bindTooltip(\`
          <div class="font-sans text-xs">
            <strong class="text-cyan-400 font-bold">వార్డు \${ward.ward}</strong>: \${ward.nameEn}<br/>
            <span class="text-slate-300">\${ward.nameTe}</span>
          </div>
        \`, { sticky: true, opacity: 0.95 });

        // Popup Content
        const popupContent = createWardPopupContent(ward);
        polygon.bindPopup(popupContent, { maxWidth: 380, className: 'custom-ward-popup' });
        marker.bindPopup(popupContent, { maxWidth: 380, className: 'custom-ward-popup' });

        // Click Event: Select Ward
        polygon.on('click', () => {
          selectWard(ward.ward, false);
        });
        marker.on('click', () => {
          selectWard(ward.ward, false);
        });

        // Hover Effect
        polygon.on('mouseover', () => {
          polygon.setStyle({ weight: 4, fillOpacity: 0.5 });
        });
        polygon.on('mouseout', () => {
          if (activeWardId !== ward.ward) {
            polygon.setStyle({ weight: 2.5, fillOpacity: 0.28 });
          }
        });

        wardLayers[ward.ward] = polygon;
        wardCentroidMarkers[ward.ward] = marker;
      });
    }

    // Create rich HTML popup for a ward
    function createWardPopupContent(ward) {
      const rsPills = ward.rsNos.map(rs => 
        \`<span class="px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700 font-mono text-[10px]">RS \${rs}</span>\`
      ).join(' ') || '<span class="text-slate-500 italic text-[10px]">నోటిఫికేషన్‌లో లేదు</span>';

      const dNoPills = ward.dNos.slice(0, 4).map(d => 
        \`<span class="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">D.No \${d}</span>\`
      ).join(' ') || '<span class="text-slate-500 italic text-[10px]">-</span>';

      return \`
        <div class="text-slate-100 p-1 font-sans text-xs leading-normal">
          <div class="flex items-center justify-between border-b border-slate-700 pb-2 mb-2">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-xs">
                \${ward.ward}
              </span>
              <div>
                <h4 class="font-bold text-white text-sm">వార్డు నం. \${ward.ward}</h4>
                <div class="text-[11px] text-cyan-300 font-medium">\${ward.nameEn}</div>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
              \${ward.zone}
            </span>
          </div>

          <div class="space-y-1.5 my-2">
            <div>
              <span class="text-slate-400 font-semibold text-[10px]">రెవెన్యూ గ్రామం:</span>
              <span class="text-slate-200 text-[11px] ml-1">\${ward.revenueVillages.join(', ')}</span>
            </div>
            <div>
              <span class="text-slate-400 font-semibold text-[10px]">సర్వే నంబర్లు (RS Nos):</span>
              <div class="flex flex-wrap gap-1 mt-0.5">\${rsPills}</div>
            </div>
            <div>
              <span class="text-slate-400 font-semibold text-[10px]">ముఖ్య ఇంటి నంబర్లు (D.Nos):</span>
              <div class="flex flex-wrap gap-1 mt-0.5">\${dNoPills}</div>
            </div>
          </div>

          <div class="mt-2.5 pt-2 border-t border-slate-700/80 flex items-center justify-between gap-2">
            <button onclick="selectWard(\${ward.ward}, true)" class="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[11px]">
              📋 సరిహద్దు చదవండి
            </button>
            <a href="https://www.google.com/maps/search/?api=1&query=\${ward.center[0]},\${ward.center[1]}" target="_blank" 
               class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-600 text-[11px] flex items-center gap-1">
              <span>Google Maps</span> ↗
            </a>
          </div>
        </div>
      \`;
    }

    // 3. Render Wards List on Left Sidebar
    function renderWardsList() {
      const container = document.getElementById('wardsListContainer');
      if (!container || typeof BHIMAVARAM_52_WARDS_DATA === 'undefined') return;
      container.innerHTML = '';

      let filteredWards = BHIMAVARAM_52_WARDS_DATA.filter(w => {
        // Filter by Zone
        if (currentFilterZone !== 'all') {
          if (!w.zone.toLowerCase().includes(currentFilterZone.toLowerCase()) && 
              !w.revenueVillages.some(v => v.toLowerCase().includes(currentFilterZone.toLowerCase()))) {
            return false;
          }
        }

        // Filter by Search Query
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase().trim();
          const matchesWardNum = w.ward.toString() === q;
          const matchesName = w.nameEn.toLowerCase().includes(q) || w.nameTe.toLowerCase().includes(q);
          const matchesRs = w.rsNos.some(rs => rs.toString() === q || \`rs \${rs}\`.includes(q) || \`rs.\${rs}\`.includes(q));
          const matchesDNo = w.dNos.some(d => d.toLowerCase().includes(q));
          const matchesLandmark = w.landmarks.some(l => l.toLowerCase().includes(q));
          const matchesVillage = w.revenueVillages.some(v => v.toLowerCase().includes(q));
          const matchesText = w.north.toLowerCase().includes(q) || w.east.toLowerCase().includes(q) || 
                              w.south.toLowerCase().includes(q) || w.west.toLowerCase().includes(q);

          if (!matchesWardNum && !matchesName && !matchesRs && !matchesDNo && !matchesLandmark && !matchesVillage && !matchesText) {
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
            <p class="text-sm font-semibold text-slate-400">ఎటువంటి ఫలితాలు కనుగొనబడలేదు</p>
            <p class="text-xs text-slate-500 mt-1">వేరే RS నంబర్ లేదా వార్డు పేరుతో ప్రయత్నించండి.</p>
            <button onclick="clearSearch()" class="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-400 text-xs font-semibold hover:bg-slate-700">
              ఫిల్టర్లను రీసెట్ చేయండి
            </button>
          </div>
        \`;
        return;
      }

      filteredWards.forEach(ward => {
        const isExpanded = expandedWards.has(ward.ward);
        const isSelected = activeWardId === ward.ward;
        const zoneColor = getZoneColor(ward.zone);

        const card = document.createElement('div');
        card.id = \`ward-card-\${ward.ward}\`;
        card.className = \`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer \${
          isSelected 
            ? 'bg-slate-850 border-cyan-500 shadow-lg shadow-cyan-500/15 ward-card-highlight ring-1 ring-cyan-500' 
            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
        }\`;

        // RS Nos Pills
        const rsPillsHtml = ward.rsNos.length > 0 
          ? ward.rsNos.map(rs => 
              \`<span onclick="event.stopPropagation(); searchRs(\${rs})" class="rs-pill px-1.5 py-0.5 rounded bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/60 font-mono text-[10px] font-semibold cursor-pointer" title="ఈ RS నంబర్ సెర్చ్ చేయండి">RS \${rs}</span>\`
            ).join(' ')
          : '<span class="text-slate-600 text-[10px] italic">నోటిఫికేషన్‌లో ప్రత్యేక RS నం లేదు</span>';

        // D.Nos Pills
        const dNosPillsHtml = ward.dNos.length > 0
          ? ward.dNos.map(d => 
              \`<span class="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">\${d}</span>\`
            ).join(' ')
          : '';

        // Landmarks tags
        const landmarksHtml = ward.landmarks.map(l => 
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
            
            <div class="flex items-center justify-between text-slate-400 text-[11px] font-bold">
              <span class="flex items-center gap-1 text-cyan-400">
                <span>📜</span>
                <span>అధికారిక సరిహద్దు వర్ణన (Source Text):</span>
              </span>
              <button onclick="event.stopPropagation(); copyWardText(\${ward.ward})" 
                      class="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded transition"
                      title="ఈ సరిహద్దు టెక్స్ట్ కాపీ చేయండి">
                <span>📋 కాపీ</span>
              </button>
            </div>

            <!-- North Boundary -->
            <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <div class="flex items-center gap-1.5 text-sky-400 font-bold text-[11px]">
                <span>▲</span>
                <span>ఉత్తరం (North Boundary):</span>
              </div>
              <p class="text-slate-200 text-xs leading-relaxed pl-3 border-l-2 border-sky-500/50">\${ward.north}</p>
            </div>

            <!-- East Boundary -->
            <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <div class="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                <span>▶</span>
                <span>తూర్పు (East Boundary):</span>
              </div>
              <p class="text-slate-200 text-xs leading-relaxed pl-3 border-l-2 border-emerald-500/50">\${ward.east}</p>
            </div>

            <!-- South Boundary -->
            <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <div class="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                <span>▼</span>
                <span>దక్షిణం (South Boundary):</span>
              </div>
              <p class="text-slate-200 text-xs leading-relaxed pl-3 border-l-2 border-amber-500/50">\${ward.south}</p>
            </div>

            <!-- West Boundary -->
            <div class="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <div class="flex items-center gap-1.5 text-rose-400 font-bold text-[11px]">
                <span>◀</span>
                <span>పడమర (West Boundary):</span>
              </div>
              <p class="text-slate-200 text-xs leading-relaxed pl-3 border-l-2 border-rose-500/50">\${ward.west}</p>
            </div>

            <!-- Referenced Landmarks & Door Numbers -->
            \${landmarksHtml ? \`
              <div class="pt-1">
                <span class="text-[10px] text-slate-400 font-semibold block mb-1">ప్రధాన మైలురాళ్ళు (Landmarks):</span>
                <div class="flex flex-wrap gap-1">\${landmarksHtml}</div>
              </div>
            \` : ''}

            \${dNosPillsHtml ? \`
              <div class="pt-1">
                <span class="text-[10px] text-slate-400 font-semibold block mb-1">సూచించిన ఇంటి నంబర్లు (D.Nos):</span>
                <div class="flex flex-wrap gap-1">\${dNosPillsHtml}</div>
              </div>
            \` : ''}

            <!-- Action Buttons Row -->
            <div class="pt-2 flex items-center justify-between gap-2 flex-wrap">
              <a href="https://www.google.com/maps/@\${ward.center[0]},\${ward.center[1]},17z" target="_blank" 
                 class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition"
                 onclick="event.stopPropagation()">
                <span>🗺️ Google Maps లో తెరువు</span>
                <span class="text-[10px] text-slate-400">↗</span>
              </a>

              <a href="https://bhuvan-app1.nrsc.gov.in/cadastral/" target="_blank" 
                 class="px-2.5 py-1.5 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/60 text-xs font-semibold flex items-center gap-1 transition"
                 onclick="event.stopPropagation()" title="ISRO భువన్ Cadastral పోర్టల్">
                <span>🛰️ భువన్ Cadastral</span>
                <span class="text-[10px] text-indigo-400">↗</span>
              </a>
            </div>

          </div>

          <!-- Bottom Footer Bar -->
          <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span class="text-cyan-400 font-mono text-[10px]">Lat: \${ward.center[0].toFixed(4)}, Lng: \${ward.center[1].toFixed(4)}</span>
            <button onclick="event.stopPropagation(); selectWard(\${ward.ward}, true)" class="text-cyan-400 hover:text-cyan-300 font-bold">
              మ్యాప్‌లో చూపించు ➔
            </button>
          </div>

        \`;

        container.appendChild(card);
      });
    }

    // 4. Select Ward: Pans Map, Highlights Polygon, and Scrolls Card into View
    function selectWard(wardNum, scrollToList = false) {
      activeWardId = wardNum;
      expandedWards.add(wardNum);

      const ward = BHIMAVARAM_52_WARDS_DATA.find(w => w.ward === wardNum);
      if (!ward) return;

      // Reset all polygon styles
      BHIMAVARAM_52_WARDS_DATA.forEach(w => {
        const poly = wardLayers[w.ward];
        if (poly) {
          poly.setStyle({
            weight: 2.5,
            fillOpacity: 0.28,
            color: getZoneColor(w.zone)
          });
        }
        const markerEl = document.getElementById(\`ward-marker-\${w.ward}\`);
        if (markerEl) markerEl.classList.remove('active');
      });

      // Highlight active polygon
      const activePoly = wardLayers[wardNum];
      if (activePoly) {
        activePoly.setStyle({
          weight: 4.5,
          fillOpacity: 0.58,
          color: '#ffffff'
        });
        activePoly.bringToFront();

        // Pan map smoothly to the ward
        map.fitBounds(activePoly.getBounds(), {
          padding: [50, 50],
          maxZoom: 16,
          animate: true,
          duration: 0.8
        });

        // Open popup
        activePoly.openPopup();
      }

      const activeMarkerEl = document.getElementById(\`ward-marker-\${wardNum}\`);
      if (activeMarkerEl) activeMarkerEl.classList.add('active');

      // Re-render sidebar to apply highlight & expansion
      renderWardsList();

      // Scroll card into view in the sidebar
      if (scrollToList) {
        setTimeout(() => {
          const cardEl = document.getElementById(\`ward-card-\${wardNum}\`);
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }, 100);
      }
    }

    // Toggle expansion of ward card
    function toggleWardExpand(wardNum) {
      if (expandedWards.has(wardNum)) {
        expandedWards.delete(wardNum);
      } else {
        expandedWards.add(wardNum);
      }
      renderWardsList();
    }

    // Expand all or Collapse all
    let allExpanded = false;
    function toggleExpandAll() {
      allExpanded = !allExpanded;
      if (allExpanded) {
        BHIMAVARAM_52_WARDS_DATA.forEach(w => expandedWards.add(w.ward));
        document.getElementById('expandAllBtn').textContent = 'అన్నీ కుదించు';
      } else {
        expandedWards.clear();
        document.getElementById('expandAllBtn').textContent = 'అన్నీ విస్తరించు';
      }
      renderWardsList();
    }

    // Filter by Zone
    function filterByZone(zone) {
      currentFilterZone = zone;

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

      renderWardsList();
    }

    // Instant Search
    function handleSearch(val) {
      searchQuery = val;
      const clearBtn = document.getElementById('clearSearchBtn');
      if (val.trim() !== '') {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
      renderWardsList();
    }

    function clearSearch() {
      document.getElementById('wardSearchInput').value = '';
      searchQuery = '';
      document.getElementById('clearSearchBtn').classList.add('hidden');
      currentFilterZone = 'all';
      filterByZone('all');
    }

    function searchRs(rsNo) {
      document.getElementById('wardSearchInput').value = rsNo;
      handleSearch(rsNo.toString());
      setMobileView('list');
    }

    // Reset Map to Whole Municipality
    function fitAllWardsBounds() {
      const allPolygons = Object.values(wardLayers);
      if (allPolygons.length > 0 && map) {
        const group = L.featureGroup(allPolygons);
        map.fitBounds(group.getBounds(), { padding: [25, 25], animate: true });
      }
    }

    // Copy official source text to clipboard
    function copyWardText(wardNum) {
      const ward = BHIMAVARAM_52_WARDS_DATA.find(w => w.ward === wardNum);
      if (!ward) return;

      const text = \`భీమవరం పురపాలక సంఘం - వార్డు \${ward.ward} (\${ward.nameEn})
రెవెన్యూ గ్రామం: \${ward.revenueVillages.join(', ')}
RS నంబర్లు: \${ward.rsNos.join(', ') || 'N/A'}

[ఉత్తరం / North]:
\${ward.north}

[తూర్పు / East]:
\${ward.east}

[దక్షిణం / South]:
\${ward.south}

[పడమర / West]:
\${ward.west}
\`;

      navigator.clipboard.writeText(text).then(() => {
        showToast(\`వార్డు \${wardNum} అధికారిక సరిహద్దు టెక్స్ట్ కాపీ చేయబడింది!\`);
      }).catch(err => {
        showToast(\`కాపీ విఫలమైంది: \${err}\`);
      });
    }

    // Toast message display
    function showToast(msg) {
      const toast = document.getElementById('toastNotification');
      const msgEl = document.getElementById('toastMessage');
      msgEl.textContent = msg;
      toast.classList.remove('translate-y-20', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 3500);
    }

    // 5. Render RS Numbers Registry Table in Modal
    function renderRsRegistryTable(filter = '') {
      const tbody = document.getElementById('rsTableBody');
      if (!tbody || typeof BHIMAVARAM_RS_NUMBERS_REGISTRY === 'undefined') return;
      tbody.innerHTML = '';

      let list = BHIMAVARAM_RS_NUMBERS_REGISTRY;
      if (filter.trim() !== '') {
        const q = filter.toLowerCase().trim();
        list = list.filter(item => 
          item.rsNo.toString().includes(q) || 
          item.villages.some(v => v.toLowerCase().includes(q)) ||
          item.wards.some(w => w.toString() === q)
        );
      }

      document.getElementById('modalRsCount').textContent = list.length;

      list.forEach(item => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-800/50 transition';

        const wardBadges = item.wards.map(w => 
          \`<button onclick="searchRsFromModal(\${w})" class="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold hover:bg-cyan-800 transition">వార్డు \${w}</button>\`
        ).join(' ');

        tr.innerHTML = \`
          <td class="py-2.5 px-3 font-mono font-bold text-indigo-400 text-sm">
            RS \${item.rsNo}
          </td>
          <td class="py-2.5 px-3 text-slate-200">
            \${item.villages.join(', ') || 'Bhimavaram'}
          </td>
          <td class="py-2.5 px-3">
            <div class="flex flex-wrap gap-1">\${wardBadges}</div>
          </td>
          <td class="py-2.5 px-3 text-right">
            <div class="flex items-center justify-end gap-2">
              <a href="\${item.googleMapsQuery}" target="_blank" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold">
                Google ↗
              </a>
              <a href="\${item.bhuvanUrl}" target="_blank" class="px-2 py-1 rounded bg-indigo-900 hover:bg-indigo-800 text-white text-[11px] font-bold">
                భువన్ ↗
              </a>
            </div>
          </td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function filterRsTable(q) {
      renderRsRegistryTable(q);
    }

    function searchRsFromModal(wardNum) {
      closeRsRegistryModal();
      selectWard(wardNum, true);
    }

    function openRsRegistryModal() {
      document.getElementById('rsRegistryModal').classList.remove('hidden');
    }
    function closeRsRegistryModal() {
      document.getElementById('rsRegistryModal').classList.add('hidden');
    }

    function openSourceInfoModal() {
      document.getElementById('sourceInfoModal').classList.remove('hidden');
    }
    function closeSourceInfoModal() {
      document.getElementById('sourceInfoModal').classList.add('hidden');
    }

    // Mobile View Toggle
    function setMobileView(view) {
      const sidebar = document.getElementById('sidebarPanel');
      const mapP = document.getElementById('mapPanel');
      const listBtn = document.getElementById('mobileViewListBtn');
      const mapBtn = document.getElementById('mobileViewMapBtn');

      if (view === 'list') {
        sidebar.classList.remove('hidden');
        mapP.classList.add('hidden');
        listBtn.classList.add('bg-cyan-600', 'text-white');
        listBtn.classList.remove('text-slate-300');
        mapBtn.classList.remove('bg-cyan-600', 'text-white');
        mapBtn.classList.add('text-slate-300');
      } else {
        sidebar.classList.add('hidden');
        mapP.classList.remove('hidden');
        mapBtn.classList.add('bg-cyan-600', 'text-white');
        mapBtn.classList.remove('text-slate-300');
        listBtn.classList.remove('bg-cyan-600', 'text-white');
        listBtn.classList.add('text-slate-300');

        setTimeout(() => {
          if (map) map.invalidateSize();
        }, 100);
      }
    }

    function updateDisplayedCounts() {
      if (typeof BHIMAVARAM_RS_NUMBERS_REGISTRY !== 'undefined') {
        document.getElementById('topRsCount').textContent = BHIMAVARAM_RS_NUMBERS_REGISTRY.length;
      }
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../ward-boundaries.html'), htmlContent, 'utf8');
fs.writeFileSync(path.join(__dirname, '../bhimavaram-ward-boundaries.html'), htmlContent, 'utf8');
console.log('Successfully generated ward-boundaries.html and bhimavaram-ward-boundaries.html');
