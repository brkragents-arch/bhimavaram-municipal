const fs = require('fs');
const html = fs.readFileSync('ward-boundaries.html', 'utf8');

// Simple DOM Mock
const domElements = {
  wardsListContainer: { innerHTML: '', appendChild: function(el) {} },
  displayedCount: { textContent: '' },
  clearSearchBtn: { classList: { remove: function(){}, add: function(){} } },
  wardSearchInput: { value: '' }
};

const document = {
  getElementById: function(id) {
    if (!domElements[id]) {
      domElements[id] = { innerHTML: '', textContent: '', classList: { remove: function(){}, add: function(){} } };
    }
    return domElements[id];
  },
  createElement: function(tag) {
    return {
      id: '',
      className: '',
      innerHTML: '',
      appendChild: function() {}
    };
  },
  querySelectorAll: function() { return []; }
};

const window = {
  addEventListener: function() {}
};

// Extract scripts
const startToken = 'var BHIMAVARAM_52_WARDS_DATA = [';
const startIdx = html.indexOf(startToken);
const endToken = 'var BHIMAVARAM_RS_NUMBERS_REGISTRY = [';
const endIdx = html.indexOf(endToken);
eval(html.substring(startIdx, endIdx));

// Extract Script 2 logic
const script2Start = html.lastIndexOf('<script>');
const script2End = html.lastIndexOf('</script>');
const script2Code = html.substring(script2Start + 8, script2End);

try {
  const runCode = new Function('document', 'window', 'BHIMAVARAM_52_WARDS_DATA', `
    ${script2Code}

    console.log('initially calling renderWardsList:');
    renderWardsList();
    console.log('displayedCount:', document.getElementById('displayedCount').textContent);

    console.log('calling handleSearch("651"):');
    handleSearch('651');
    console.log('displayedCount after 651:', document.getElementById('displayedCount').textContent);

    console.log('calling handleSearch("ward 1"):');
    handleSearch('ward 1');
    console.log('displayedCount after ward 1:', document.getElementById('displayedCount').textContent);

    console.log('calling handleSearch("1"):');
    handleSearch('1');
    console.log('displayedCount after 1:', document.getElementById('displayedCount').textContent);
  `);

  runCode(document, window, BHIMAVARAM_52_WARDS_DATA);
} catch(e) {
  console.error('Runtime error in script:', e);
}
