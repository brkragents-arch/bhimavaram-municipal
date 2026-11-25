const fs = require('fs');

const stationsRaw = JSON.parse(fs.readFileSync('scratch/parsed_stations.json', 'utf8'));

// Define the 35 physical campus locations with accurate Bhimavaram coordinates and ward mappings
const campusCatalog = [
    {
        id: "zp-high-school-anakoderu",
        matcher: /Anacoderu/i,
        name: "Zilla Parishad High School, Anakoderu",
        nameTe: "జిల్లా పరిషత్ ఉన్నత పాఠశాల, అనకోడేరు",
        area: "Anakoderu",
        lat: 16.5215,
        lng: 81.4925,
        wards: [42, 50],
        address: "Zilla Parishad High School, Anakoderu, Bhimavaram Mandal"
    },
    {
        id: "mpl-ele-suryanarayanapuram",
        matcher: /Suryanarayanapuram/i,
        name: "Municipal Elementary School, Suryanarayanapuram",
        nameTe: "మున్సిపల్ ఎలిమెంటరీ పాఠశాల, సూర్యనారాయణపురం",
        area: "Bhimavaram",
        lat: 16.5475,
        lng: 81.5342,
        wards: [3, 4],
        address: "Suryanarayanapuram, Near Tanuku Road, Bhimavaram"
    },
    {
        id: "dnr-mpl-library-sivaraopeta",
        matcher: /D\s*N\s*R\s*Mpl\s*Library,\s*Sivaraopeta/i,
        name: "DNR Municipal Library, Sivaraopeta",
        nameTe: "డి.ఎన్.ఆర్ మున్సిపల్ లైబ్రరీ, శివరావుపేట",
        area: "Bhimavaram",
        lat: 16.5512,
        lng: 81.5370,
        wards: [4],
        address: "DNR Library Building, Sivaraopeta, Bhimavaram"
    },
    {
        id: "mpl-school-sivaraopeta",
        matcher: /Sivaraopeta|Sivarao\s*Peta/i,
        name: "Municipal Elementary School (Regular), Sivaraopeta & Rajulapeta",
        nameTe: "మున్సిపల్ ఎలిమెంటరీ పాఠశాల (రెగ్యులర్), శివరావుపేట / రాజులపేట",
        area: "Bhimavaram",
        lat: 16.5522,
        lng: 81.5385,
        wards: [4, 5],
        address: "Rajulapeta, Sivaraopeta, Bhimavaram"
    },
    {
        id: "gali-ramayya-school",
        matcher: /Gali\s*Ramayya/i,
        name: "Gali Ramayya Municipal UP School",
        nameTe: "గాలి రామయ్య మున్సిపల్ ప్రాథమికోన్నత పాఠశాల",
        area: "Bhimavaram",
        lat: 16.5510,
        lng: 81.5488,
        wards: [5, 6],
        address: "Gali Ramayya School, Gunupudi Outer Road, Bhimavaram"
    },
    {
        id: "rcm-ele-lankapeta",
        matcher: /Lankapeta/i,
        name: "RCM Aided Elementary School, Lankapeta",
        nameTe: "ఆర్.సి.ఎం ఎయిడెడ్ ఎలిమెంటరీ పాఠశాల, లంకపేట",
        area: "Bhimavaram",
        lat: 16.5410,
        lng: 81.5390,
        wards: [8, 9],
        address: "Lankapeta, Near Junction Railway Road, Bhimavaram"
    },
    {
        id: "mpl-ele-durgapuram",
        matcher: /Durgapuram/i,
        name: "Municipal Elementary School, Durgapuram",
        nameTe: "మున్సిపల్ ఎలిమెంటరీ పాఠశాల, దుర్గాపురం",
        area: "Bhimavaram",
        lat: 16.5315,
        lng: 81.5455,
        wards: [12, 13],
        address: "Durgapuram, Bridgepeta Road, Bhimavaram"
    },
    {
        id: "srrm-school-srirampuram",
        matcher: /Srrm\s*Ele|Sri\s*Raja\s*Rajeswari/i,
        name: "Sri Raja Rajeswari Mpl Elementary School (SRRM), Srirampuram",
        nameTe: "శ్రీ రాజరాజేశ్వరి మున్సిపల్ ఎలిమెంటరీ స్కూల్ (SRRM), శ్రీరాంపురం",
        area: "Bhimavaram",
        lat: 16.5342,
        lng: 81.5128,
        wards: [36, 37],
        address: "Srirampuram Main Road, Bhimavaram"
    },
    {
        id: "mahila-library-srirampuram",
        matcher: /Sarojinidevi/i,
        name: "Smt. Sarojinidevi Municipal Mahila Library, Srirampuram",
        nameTe: "శ్రీమతి సరోజినీదేవి మున్సిపల్ మహిళా గ్రంథాలయం, శ్రీరాంపురం",
        area: "Bhimavaram",
        lat: 16.5338,
        lng: 81.5122,
        wards: [36],
        address: "Mahila Library, Srirampuram, Bhimavaram"
    },
    {
        id: "kasturiba-seva-sangh",
        matcher: /Kasturiba|Court\s*Premises/i,
        name: "Gandhi Kasturiba Seva Sangh Bhavan, Court Premises",
        nameTe: "గాంధీ కస్తూరిబా సేవా సంఘ్ భవన్, కోర్టు కాంప్లెక్స్",
        area: "Bhimavaram",
        lat: 16.5422,
        lng: 81.5232,
        wards: [24],
        address: "Court Premises, Rest House Road, Bhimavaram"
    },
    {
        id: "schbrm-high-school",
        matcher: /S\s*Ch\s*B\s*R\s*M|S\s*C\s*H\s*B\s*R\s*M/i,
        name: "S.Ch.B.R.M. High School, DNR College Road",
        nameTe: "ఎస్.సి.హెచ్.బి.ఆర్.ఎం హైస్కూల్, డి.ఎన్.ఆర్ కాలేజీ రోడ్డు",
        area: "Bhimavaram",
        lat: 16.5292,
        lng: 81.5138,
        wards: [35, 36],
        address: "DNR College Road, Bhimavaram"
    },
    {
        id: "svs-school-deaf",
        matcher: /Duff|Basulumudi/i,
        name: "SVS School for the Deaf, Balusumudi",
        nameTe: "ఎస్.వి.ఎస్ మూగ, బధిరుల పాఠశాల, బాలుసుమూడి",
        area: "Bhimavaram",
        lat: 16.5332,
        lng: 81.5082,
        wards: [38],
        address: "Balusumudi, Mavullamma Temple Area, Bhimavaram"
    },
    {
        id: "jlb-girls-high-school",
        matcher: /Jhansi\s*Lakshmibayi|Jlb/i,
        name: "Jhansi Lakshmibai (JLB) Municipal Girls High School",
        nameTe: "ఝాన్సీ లక్ష్మీబాయి (JLB) మున్సిపల్ బాలికల ఉన్నత పాఠశాల",
        area: "Bhimavaram",
        lat: 16.5412,
        lng: 81.5222,
        wards: [23, 24],
        address: "Near Rest House Road, Bhimavaram"
    },
    {
        id: "smdgmm-school",
        matcher: /Smdgmm/i,
        name: "SMDGMM Municipal UP School",
        nameTe: "ఎస్.ఎం.డి.జి.ఎం.ఎం మున్సిపల్ ప్రాథమికోన్నత పాఠశాల",
        area: "Bhimavaram",
        lat: 16.5392,
        lng: 81.5218,
        wards: [25],
        address: "Municipal Office Road, Bhimavaram"
    },
    {
        id: "ambedkar-school-pedapeta",
        matcher: /Pedapeta|Ambetkar|Ambedkar/i,
        name: "Dr. B.R. Ambedkar Municipal Elementary School, Pedapeta",
        nameTe: "డాక్టర్ బి.ఆర్. అంబేద్కర్ మున్సిపల్ ఎలిమెంటరీ పాఠశాల, పేదపేట",
        area: "Bhimavaram",
        lat: 16.5386,
        lng: 81.5178,
        wards: [26],
        address: "Pedapeta, Govt Hospital Road, Bhimavaram"
    },
    {
        id: "sjgm-high-school",
        matcher: /Jupudi\s*Gangaiah|Sjgm|S\s*J\s*G\s*M/i,
        name: "Sri Jupudi Gangaiah Memorial High School (SJGM)",
        nameTe: "శ్రీ జూపూడి గంగయ్య మెమోరియల్ హైస్కూల్ (SJGM)",
        area: "Bhimavaram",
        lat: 16.5368,
        lng: 81.5238,
        wards: [28, 29],
        address: "Katari Vari Street, Bhimavaram"
    },
    {
        id: "sanskrit-high-school",
        matcher: /Oriental\s*Sanskrit|Rammurthy/i,
        name: "Sri P.G. Rammurthy Oriental Sanskrit High School",
        nameTe: "శ్రీ పి.జి. రామ్మూర్తి ఓరియంటల్ సంస్కృత ఉన్నత పాఠశాల",
        area: "Bhimavaram",
        lat: 16.5358,
        lng: 81.5192,
        wards: [27, 28],
        address: "Near Head Post Office, Bhimavaram"
    },
    {
        id: "lutheran-school-college",
        matcher: /Luthern|Lutheran/i,
        name: "Lutheran High School & Junior College",
        nameTe: "లూథరన్ హైస్కూల్ & జూనియర్ కళాశాల",
        area: "Bhimavaram",
        lat: 16.5354,
        lng: 81.5182,
        wards: [27],
        address: "Lutheran High School Grounds, Head Post Office Road, Bhimavaram"
    },
    {
        id: "adavi-bapiraju-bank-colony",
        matcher: /Bank\s*Colony|Adavi\s*Bapiraju|Adavibabi|Adivibapiraju|Tulasamma/i,
        name: "Adavi Bapiraju Memorial Mpl Ele School & Bank Colony Mpl School",
        nameTe: "అడవి బాపిరాజు మెమోరియల్ & బ్యాంక్ కాలనీ మున్సిపల్ ప్రాథమిక పాఠశాల",
        area: "Bhimavaram",
        lat: 16.5268,
        lng: 81.5222,
        wards: [33, 34],
        address: "Bank Colony / Reddy Colony, Bhimavaram"
    },
    {
        id: "potti-sriramulu-girls-school",
        matcher: /Potti\s*Sriramulu/i,
        name: "Sri Potti Sriramulu Municipal Girls High School",
        nameTe: "శ్రీ పొట్టి శ్రీరాములు మున్సిపల్ బాలికల ఉన్నత పాఠశాల",
        area: "Bhimavaram",
        lat: 16.5346,
        lng: 81.5248,
        wards: [29, 30],
        address: "S.P. Street / Main Road, Bhimavaram"
    },
    {
        id: "mgm-school",
        matcher: /Mahatma\s*Gandhi\s*Memorial/i,
        name: "Mahatma Gandhi Memorial Elementary School",
        nameTe: "మహాత్మా గాంధీ మెమోరియల్ ఎలిమెంటరీ పాఠశాల",
        area: "Bhimavaram",
        lat: 16.5322,
        lng: 81.5212,
        wards: [31],
        address: "Ganganamma Gudi Area, Bhimavaram"
    },
    {
        id: "av-chandrarao-school",
        matcher: /Adabala|Chandrarao/i,
        name: "Sri Adabala Venkata Chandrarao Special Elementary School",
        nameTe: "శ్రీ అడబాల వెంకట చంద్రరావు స్పెషల్ ఎలిమెంటరీ పాఠశాల",
        area: "Bhimavaram",
        lat: 16.5302,
        lng: 81.5226,
        wards: [32],
        address: "Sri Krishnadevaraya Function Hall Road, Dirusumarru Road, Bhimavaram"
    },
    {
        id: "sp-street-library",
        matcher: /S\s*P\s*Street/i,
        name: "Municipal Library, S.P. Street",
        nameTe: "మున్సిపల్ గ్రంథాలయం, ఎస్.పి. స్ట్రీట్",
        area: "Bhimavaram",
        lat: 16.5352,
        lng: 81.5242,
        wards: [29],
        address: "S.P. Street, Bhimavaram"
    },
    {
        id: "bethany-school",
        matcher: /Bethan[iy]/i,
        name: "Bethany Special Municipal Elementary & Girls High School",
        nameTe: "బేతని స్పెషల్ మున్సిపల్ ఎలిమెంటరీ & బాలికల ఉన్నత పాఠశాల",
        area: "Bhimavaram",
        lat: 16.5288,
        lng: 81.5332,
        wards: [14, 16],
        address: "Bethanipeta, Near Mission Hospital South, Bhimavaram"
    },
    {
        id: "umasomeswara-school",
        matcher: /Umasomeswara/i,
        name: "Sri Uma Someswara Municipal Elementary School & Library, Nallamvari St",
        nameTe: "శ్రీ ఉమా సోమేశ్వర మున్సిపల్ ఎలిమెంటరీ స్కూల్ & లైబ్రరీ, నల్లంవారి వీధి",
        area: "Bhimavaram",
        lat: 16.5378,
        lng: 81.5268,
        wards: [17],
        address: "Nallamvari Street, Someswara Swamy Temple Ward, Bhimavaram"
    },
    {
        id: "azad-school",
        matcher: /Moulana|Ajad|Azad/i,
        name: "Maulana Abul Kalam Azad Municipal UP School & Library",
        nameTe: "మౌలానా అబుల్ కలాం ఆజాద్ మున్సిపల్ ప్రాథమికోన్నత పాఠశాల & లైబ్రరీ",
        area: "Bhimavaram",
        lat: 16.5402,
        lng: 81.5268,
        wards: [18, 19],
        address: "Pedda Masjid Road / Ayyavari Street, Bhimavaram"
    },
    {
        id: "banda-veerraju-school",
        matcher: /Banda\s*Veerraju|Narasayya\s*Agraharam/i,
        name: "Banda Veerraju Municipal Elementary School, Narasayya Agraharam",
        nameTe: "బండ వీర్రాజు మున్సిపల్ ఎలిమెంటరీ పాఠశాల, నరసయ్య అగ్రహారం",
        area: "Bhimavaram",
        lat: 16.5518,
        lng: 81.5358,
        wards: [4, 20],
        address: "Narasayya Agraharam, Srilanka Road, Bhimavaram"
    },
    {
        id: "st-marys-school",
        matcher: /St\.\s*Mari/i,
        name: "St. Mary's Lower Nursery & Elementary School",
        nameTe: "సెయింట్ మేరీస్ లోయర్ నర్సరీ & ఎలిమెంటరీ పాఠశాల",
        area: "Bhimavaram",
        lat: 16.5458,
        lng: 81.5268,
        wards: [21, 22],
        address: "RTC Complex / Goods Shed Road Area, Bhimavaram"
    },
    {
        id: "chinaranganipalem-school",
        matcher: /Chinaranganipalem/i,
        name: "Municipal High & UP School, Chinaranganipalem",
        nameTe: "మున్సిపల్ ఉన్నత & ప్రాథమికోన్నత పాఠశాల, చినరంగనిపాలెం",
        area: "Bhimavaram",
        lat: 16.5438,
        lng: 81.5415,
        wards: [8],
        address: "Chinaranganipalem, G&V Canal West Bund, Bhimavaram"
    },
    {
        id: "tln-school-rcpuram",
        matcher: /T\s*L\s*N|Rc\s*Puram/i,
        name: "T.L.N. Municipal Special Elementary School, RC Puram",
        nameTe: "టి.ఎల్.ఎన్ మున్సిపల్ స్పెషల్ ఎలిమెంటరీ పాఠశాల, ఆర్.సి.పురం",
        area: "Bhimavaram",
        lat: 16.5425,
        lng: 81.5462,
        wards: [7],
        address: "RC Puram, Bharatiya Vidya Bhavan Road, Bhimavaram"
    },
    {
        id: "indira-gandhi-tss-gunupudi",
        matcher: /Indiragandhi|T\s*S\s*S|Garuvupet|Gunupudi/i,
        name: "Indira Gandhi Spl Ele School & TSS Mpl Ele School, Gunupudi",
        nameTe: "ఇందిరా గాంధీ స్పెషల్ & టి.ఎస్.ఎస్ మున్సిపల్ పాఠశాల, గునుపూడి (గరువుపేట)",
        area: "Bhimavaram",
        lat: 16.5532,
        lng: 81.5505,
        wards: [6],
        address: "Garuvupet, Gunupudi Outer, Bhimavaram"
    },
    {
        id: "china-amiram-schools",
        matcher: /Chinamiram|China\s*Amiram/i,
        name: "Mandal Parishad Elementary & Zilla Parishad High School, China Amiram",
        nameTe: "మండల పరిషత్ ప్రాథమిక & జిల్లా పరిషత్ ఉన్నత పాఠశాల, చినఅమిరం",
        area: "China Amiram",
        lat: 16.5418,
        lng: 81.5022,
        wards: [43, 44, 45],
        address: "China Amiram Village Center, Bhimavaram"
    },
    {
        id: "rayalam-schools",
        matcher: /Rayalam/i,
        name: "Mandal Parishad Elementary Schools 1 & 2, Rayalam",
        nameTe: "మండల పరిషత్ ప్రాథమిక పాఠశాలలు 1 & 2, రాయలం",
        area: "Rayalam",
        lat: 16.5228,
        lng: 81.5024,
        wards: [40, 41, 46],
        address: "Rayalam Panchayat Office Road, Bhimavaram"
    },
    {
        id: "komarada-schools",
        matcher: /Komarada/i,
        name: "Mandal Parishad Elementary School, Komarada",
        nameTe: "మండల పరిషత్ ఎలిమెంటరీ పాఠశాల, కోమరద",
        area: "Komarada",
        lat: 16.5620,
        lng: 81.5220,
        wards: [52, 1],
        address: "Komarada Village, Tadepalligudem Bypass, Bhimavaram"
    },
    {
        id: "kovvada-schools",
        matcher: /Kovvada/i,
        name: "Mandal Parishad Elementary School, Kovvada",
        nameTe: "మండల పరిషత్ ఎలిమెంటరీ పాఠశాల, కొవ్వాడ",
        area: "Kovvada",
        lat: 16.5645,
        lng: 81.5075,
        wards: [51],
        address: "Kovvada Village, Revenue Village Boundary, Bhimavaram"
    },
    {
        id: "annavaram-schools",
        matcher: /Annavaram|Vellaturu/i,
        name: "Mandal Parishad Elementary School, Vellaturu H/O Annavaram",
        nameTe: "మండల పరిషత్ ప్రాథమిక పాఠశాల, వెల్లాటూరు (అన్నవరం)",
        area: "K Annavaram",
        lat: 16.5670,
        lng: 81.5090,
        wards: [51, 49],
        address: "Vellaturu, K. Annavaram, Bhimavaram"
    },
    {
        id: "lvnpuram-schools",
        matcher: /L\s*V\s*N|Lv\s*N/i,
        name: "Mandal Parishad UP School, L.V.N. Puram",
        nameTe: "మండల పరిషత్ ప్రాథమికోన్నత పాఠశాల, ఎల్.వి.ఎన్ పురం",
        area: "Lv N Puram",
        lat: 16.5595,
        lng: 81.5312,
        wards: [2, 52],
        address: "L.V.N. Puram Village, North Bhimavaram"
    }
];

// Map every station to a campus
const matchedStations = [];
const unmatched = [];

stationsRaw.forEach(s => {
    let matchedCampus = null;
    for (let c of campusCatalog) {
        if (c.matcher.test(s.location) || (s.area && c.matcher.test(s.area))) {
            matchedCampus = c;
            break;
        }
    }
    if (matchedCampus) {
        matchedStations.push({
            ...s,
            campusId: matchedCampus.id,
            campusName: matchedCampus.name,
            campusNameTe: matchedCampus.nameTe,
            lat: matchedCampus.lat,
            lng: matchedCampus.lng,
            wards: matchedCampus.wards
        });
    } else {
        unmatched.push(s);
    }
});

console.log('Matched stations:', matchedStations.length, '/ Total:', stationsRaw.length);
if (unmatched.length > 0) {
    console.log('Unmatched stations:', unmatched);
}
