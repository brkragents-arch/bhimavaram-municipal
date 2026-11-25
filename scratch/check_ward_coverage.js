const fs = require('fs');

// Test coverage
const campusCatalog = [
    { id: "zp-high-school-anakoderu", matcher: /Anacoderu/i, wards: [42, 50] },
    { id: "mpl-ele-suryanarayanapuram", matcher: /Suryanarayana\s*puram/i, wards: [3, 4] },
    { id: "dnr-mpl-library-sivaraopeta", matcher: /D\s*N\s*R\s*Mpl\s*Library,\s*Sivaraopeta/i, wards: [4] },
    { id: "mpl-school-sivaraopeta", matcher: /Sivaraopeta|Sivarao\s*Peta/i, wards: [4, 5] },
    { id: "gali-ramayya-school", matcher: /Gali\s*Ramayya/i, wards: [5, 6] },
    { id: "rcm-ele-lankapeta", matcher: /Lankapeta/i, wards: [8, 9, 10, 11] },
    { id: "mpl-ele-durgapuram", matcher: /Durgapuram/i, wards: [12, 13] },
    { id: "srrm-school-srirampuram", matcher: /Srrm\s*Ele|Sri\s*Raja\s*Rajeswari/i, wards: [36, 37] },
    { id: "mahila-library-srirampuram", matcher: /Sarojinidevi/i, wards: [36] },
    { id: "kasturiba-seva-sangh", matcher: /Kasturiba|Court\s*Premises/i, wards: [24] },
    { id: "schbrm-high-school", matcher: /S\s*Ch\s*B\s*R\s*M|S\s*C\s*H\s*B\s*R\s*M/i, wards: [35, 36] },
    { id: "svs-school-deaf", matcher: /Duff|Basulumudi/i, wards: [38] },
    { id: "jlb-girls-high-school", matcher: /Jhansi\s*Lakshmibayi|Jlb/i, wards: [23, 24] },
    { id: "smdgmm-school", matcher: /Smdgmm/i, wards: [25] },
    { id: "ambedkar-school-pedapeta", matcher: /Pedapeta|Ambetkar|Ambedkar/i, wards: [26] },
    { id: "sjgm-high-school", matcher: /Jupudi\s*Gangaiah|Sjgm|S\s*J\s*G\s*M/i, wards: [28, 29] },
    { id: "sanskrit-high-school", matcher: /Oriental\s*Sanskrit|Rammurthy/i, wards: [27, 28] },
    { id: "lutheran-school-college", matcher: /Luthern|Lutheran/i, wards: [27] },
    { id: "adavi-bapiraju-bank-colony", matcher: /Bank\s*Colony|Adavi\s*Bapiraju|Adavibabi|Adivibapiraju|Tulasamma/i, wards: [33, 34] },
    { id: "potti-sriramulu-girls-school", matcher: /Potti\s*Sriramulu/i, wards: [29, 30] },
    { id: "mgm-school", matcher: /Mahatma\s*Gandhi\s*Memorial/i, wards: [31] },
    { id: "av-chandrarao-school", matcher: /Adabala|Chandrarao/i, wards: [32] },
    { id: "sp-street-library", matcher: /S\s*P\s*Street/i, wards: [29, 39] },
    { id: "bethany-school", matcher: /Bethan[iy]/i, wards: [14, 15, 16] },
    { id: "umasomeswara-school", matcher: /Umasomeswara/i, wards: [17, 39] },
    { id: "azad-school", matcher: /Moulana|Ajad|Azad/i, wards: [18, 19] },
    { id: "banda-veerraju-school", matcher: /Banda\s*Veerraju|Narasayya\s*Agraharam/i, wards: [4, 20] },
    { id: "st-marys-school", matcher: /St\.\s*Mari/i, wards: [21, 22] },
    { id: "chinaranganipalem-school", matcher: /Chinaranganipalem/i, wards: [8] },
    { id: "tln-school-rcpuram", matcher: /T\s*L\s*N|Rc\s*Puram/i, wards: [7] },
    { id: "indira-gandhi-tss-gunupudi", matcher: /Indiragandhi|T\s*S\s*S|Garuvupet|Gunupudi/i, wards: [6] },
    { id: "china-amiram-schools", matcher: /Chinamiram|China\s*Amiram/i, wards: [43, 44, 45] },
    { id: "rayalam-schools", matcher: /Rayalam/i, wards: [40, 41, 46] },
    { id: "komarada-schools", matcher: /Komarada/i, wards: [1, 52] },
    { id: "kovvada-schools", matcher: /Kovvada/i, wards: [48, 51] },
    { id: "annavaram-schools", matcher: /Annavaram|Vellaturu/i, wards: [47, 49, 51] },
    { id: "lvnpuram-schools", matcher: /L\s*V\s*N|Lv\s*N/i, wards: [2, 52] }
];

const coveredWards = new Set();
campusCatalog.forEach(c => {
    c.wards.forEach(w => coveredWards.add(w));
});

console.log('Covered wards count:', coveredWards.size, '/ 52');
const missingWards = [];
for (let i = 1; i <= 52; i++) {
    if (!coveredWards.has(i)) {
        missingWards.push(i);
    }
}
console.log('Missing wards:', missingWards);
