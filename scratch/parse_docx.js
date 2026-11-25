const fs = require('fs');

const xml = fs.readFileSync('scratch/docx_temp/word/document.xml', 'utf8');

// Match table rows <w:tr>
const rows = xml.match(/<w:tr[\s>][\s\S]*?<\/w:tr>/g) || [];
console.log('Total table rows:', rows.length);

const parsedRows = [];
rows.forEach((rowXml, idx) => {
    const cells = rowXml.match(/<w:tc[\s>][\s\S]*?<\/w:tc>/g) || [];
    const cellTexts = cells.map(cellXml => {
        const textMatches = cellXml.match(/<w:t[\s>][\s\S]*?<\/w:t>/g) || [];
        return textMatches.map(t => t.replace(/<[^>]+>/g, '')).join('').trim();
    });
    parsedRows.push(cellTexts);
    if (idx < 15) {
        console.log(`Row ${idx} (${cells.length} cols):`, cellTexts);
    }
});

fs.writeFileSync('scratch/parsed_docx_table.json', JSON.stringify(parsedRows, null, 2), 'utf8');
console.log('Saved scratch/parsed_docx_table.json successfully!');
