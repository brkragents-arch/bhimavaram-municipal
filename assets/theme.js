// ====================================================
// Bhimavaram Municipal Portal - Theme Manager (Light & Dark)
// ====================================================

(function() {
  function getPreferredTheme() {
    const saved = localStorage.getItem('bm_theme');
    if (saved) return saved;
    // Default to dark for GIS/mapping, but respect OS if light
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('bm_theme', theme);
    updateThemeToggleUI(theme);

    // Dispatch theme change event for SVG maps and dynamic components
    try {
      window.dispatchEvent(new CustomEvent('themechanged', { detail: { theme } }));
    } catch(e) {}

    // If Leaflet map exists with carto_dark, switch to google_streets or osm in light mode
    try {
      if (typeof map !== 'undefined' && map && typeof baseLayers !== 'undefined') {
        if (theme === 'light') {
          if (baseLayers.carto_dark && map.hasLayer(baseLayers.carto_dark)) {
            if (baseLayers.google_streets) {
              map.removeLayer(baseLayers.carto_dark);
              baseLayers.google_streets.addTo(map);
            } else if (baseLayers.osm) {
              map.removeLayer(baseLayers.carto_dark);
              baseLayers.osm.addTo(map);
            }
          }
        }
      }
    } catch(e) {
      console.warn('Map basemap switch error:', e);
    }
  }

  function updateThemeToggleUI(theme) {
    const iconEls = document.querySelectorAll('.theme-toggle-icon, #themeToggleIcon');
    const textEls = document.querySelectorAll('.theme-toggle-text, #themeToggleText');
    const btnEls = document.querySelectorAll('.theme-toggle-btn, #themeToggleBtn');

    iconEls.forEach(el => {
      el.innerText = (theme === 'light') ? '🌙' : '☀️';
    });
    textEls.forEach(el => {
      el.innerText = (theme === 'light') ? 'డార్క్ మోడ్' : 'లైట్ మోడ్';
    });
    btnEls.forEach(el => {
      el.title = (theme === 'light') ? 'డార్క్ మోడ్‌కు మార్చండి (Switch to Dark)' : 'లైట్ మోడ్‌కు మార్చండి (Switch to Light)';
      if (theme === 'light') {
        el.classList.remove('bg-slate-800', 'text-amber-300', 'border-slate-700');
        el.classList.add('bg-amber-100', 'text-amber-900', 'border-amber-300');
      } else {
        el.classList.remove('bg-amber-100', 'text-amber-900', 'border-amber-300');
        el.classList.add('bg-slate-800', 'text-amber-300', 'border-slate-700');
      }
    });
  }

  window.toggleTheme = function() {
    const isLight = document.documentElement.classList.contains('light');
    applyTheme(isLight ? 'dark' : 'light');
  };

  window.applyTheme = applyTheme;

  // Immediately apply theme before DOMContentLoaded to avoid flash
  const initialTheme = getPreferredTheme();
  if (initialTheme === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  } else {
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add('dark');
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateThemeToggleUI(initialTheme);
  });
})();
