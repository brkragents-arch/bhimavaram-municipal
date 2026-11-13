const fs = require('fs');

const updatedHotspots = [
  {
    id: "HS-01",
    rank: 1,
    name: "Prakasham Chowk & Town Railway Underpass (RuB) Junction",
    nameTe: "ప్రకాశం చౌక్ & రైల్వే అండర్‌పాస్ (RuB) కూడలి",
    ward: 20,
    ward_name: "B.T. Center & Railway West",
    coords: [16.5448, 81.5235],
    road: "P.P. Road & Station Road Approach (RuB Underpass Corridor)",
    junction_type: "5-Arm Grade-Separated Railway Underpass Approach Throats",
    peak_pcu_hr: 3840,
    two_wheelers_pct: 54.2,
    autos_pct: 22.8,
    cars_pct: 12.5,
    heavy_vehicles_pct: 4.2,
    pedestrians_hr: 2850,
    avg_speed_kmh: 8.2,
    queue_length_m: 460,
    avg_delay_sec: 195,
    los: "F",
    severity: "Critical",
    major_causes: [
      "5 వేర్వేరు ప్రధాన రోడ్ల ట్రాఫిక్ ఒకే అండర్‌పాస్ (RuB) అప్రోచ్ వద్ద కలుసుకోవడం",
      "అండర్‌పాస్ ప్రవేశం వద్ద అనధికార ఆటో-రిక్షా నిలపడం మరియు ఇరుకైన గ్రేడియంట్ బాటిల్‌నెక్",
      "పీక్ అవర్స్‌లో పాదచారులకు ప్రత్యేక ఫుట్‌పాత్ లేకపోవడం వల్ల వాహనాల వేగం మందగించడం",
      "వర్షాకాలంలో అండర్‌పాస్ సంపులో నీరు నిలిచినప్పుడు ట్రాఫిక్ నెమ్మదించడం"
    ],
    proposed_interventions: [
      "అండర్‌పాస్ రెండు వైపులా 50 మీటర్ల పరిధిని స్ట్రిక్ట్ నో-హాకింగ్ & నో-పార్కింగ్ జోన్‌గా అమలు చేయడం",
      "ఆటోల కొరకు అండర్‌పాస్ వెలుపల 30 మీటర్ల దూరంలో ప్రత్యేక 'డ్రాప్-ఆఫ్ బే' ఏర్పాటు",
      "గ్రేడ్-సెపరేటెడ్ ప్రవాహం కొరకు వెబ్‌స్టర్ పద్ధతిలో సెమీ-యాక్చుయేటెడ్ సిగ్నల్ కోఆర్డినేషన్",
      "భారీ వర్షాల సమయంలో ఆటోమేటిక్ సెన్సార్లతో కూడిన హై-కెపాసిటీ డీవాటరింగ్ పంపుల నిర్వహణ"
    ]
  },
  {
    id: "HS-02",
    rank: 2,
    name: "Old Bus Stand & Gandhi Statue Center",
    nameTe: "పాత బస్టాండ్ & గాంధీ విగ్రహం కూడలి",
    ward: 20,
    ward_name: "B.T. Center & Railway West",
    coords: [16.5432, 81.5242],
    road: "P.P. Road & B.N. Road Main Commercial Spine",
    junction_type: "4-Arm Unsignalized Rotary Intersection",
    peak_pcu_hr: 3420,
    two_wheelers_pct: 58.0,
    autos_pct: 20.5,
    cars_pct: 11.2,
    heavy_vehicles_pct: 3.1,
    pedestrians_hr: 3400,
    avg_speed_kmh: 9.5,
    queue_length_m: 390,
    avg_delay_sec: 172,
    los: "F",
    severity: "Critical",
    major_causes: [
      "రోటరీ చుట్టూ అనియంత్రిత కమర్షియల్ పార్కింగ్ మరియు రోడ్డుపై దుకాణాల ఆక్రమణలు",
      "పీ.పీ. రోడ్ నుండి మెయిన్ బజార్‌లోకి ప్రవేశించే పాదచారుల రద్దీకి జీబ్రా క్రాసింగ్ లేకపోవడం",
      "ఆటోలు రౌండ్‌ఎబౌట్ సర్కిల్ వద్ద ఆగి ప్రయాణికులను ఎక్కించుకోవడం వల్ల ఏర్పడే క్యూలు"
    ],
    proposed_interventions: [
      "గాంధీ విగ్రహ రోటరీ వ్యాసార్థాన్ని కుదించి ఛానలైజేషన్ ట్రాఫిక్ ఐలాండ్స్ నిర్మించడం",
      "ఆటోల కోసం 50 మీటర్ల అవతల ప్రత్యేక బే కేటాయించి, సర్కిల్ చుట్టూ పెలికాన్ సిగ్నల్ ఏర్పాటు",
      "వన్-వే లూప్ (దృశ్యం A) ద్వారా మెయిన్ బజార్ ట్రాఫిక్‌ను క్రమబద్ధీకరించడం"
    ]
  },
  {
    id: "HS-03",
    rank: 3,
    name: "Sri Someswara Swamy Temple & Somaramam Pancharama Center (Gunupudi)",
    nameTe: "శ్రీ సోమేశ్వర స్వామి వారి ఆలయం & సోమారామం కూడలి (గునుపూడి)",
    ward: 16,
    ward_name: "Sri Someswara Swamy Temple (Somaramam)",
    coords: [16.5412, 81.5312],
    road: "Someswara Temple Street & Main Bazaar Corridor",
    junction_type: "T-Junction with Heritage Narrow Throat",
    peak_pcu_hr: 2980,
    two_wheelers_pct: 64.0,
    autos_pct: 18.5,
    cars_pct: 10.5,
    heavy_vehicles_pct: 1.0,
    pedestrians_hr: 4100,
    avg_speed_kmh: 7.4,
    queue_length_m: 320,
    avg_delay_sec: 164,
    los: "F",
    severity: "Critical",
    major_causes: [
      "చంద్ర పుష్కరిణి రోడ్డులో క్యారేజ్‌వే వెడల్పు కేవలం 5.5 మీటర్లు మాత్రమే ఉండడం",
      "సోమవారాలు, మాసశివరాత్రి మరియు ఉత్సవాల రోజుల్లో భక్తుల వాహనాల అడ్డగోలు పార్కింగ్",
      "షాపింగ్ వీధిలో పండ్లు, పూల దుకాణాలు కాలిబాటలను పూర్తిగా ఆక్రమించడం"
    ],
    proposed_interventions: [
      "ఉత్సవ దినాల్లో ఆలయ వీధిని 'పాదచారుల ప్రాధాన్యతా జోన్ (Pedestrian-Only Zone)'గా ప్రకటించడం",
      "ఆలయానికి 200 మీటర్ల దూరంలో మున్సిపల్ యాత్రికుల పార్కింగ్ స్థలాన్ని (PK-07) అభివృద్ధి చేయడం",
      "గునుపూడి ఆర్టీసీ బస్సులను బైపాస్ ద్వారా మళ్లించి, ఆలయం వద్ద బ్యాటరీ ఫీడర్లను మాత్రమే అనుమతించడం"
    ]
  },
  {
    id: "HS-04",
    rank: 4,
    name: "APSRTC Central Bus Station Complex Junction",
    nameTe: "ఆర్టీసీ బస్ స్టేషన్ కాంప్లెక్స్ కూడలి",
    ward: 24,
    ward_name: "S.P. Road East & RTC Complex",
    coords: [16.5415, 81.5285],
    road: "Rest House Road & RTC Depot Approach",
    junction_type: "3-Arm Major Transit Terminal Intersect",
    peak_pcu_hr: 3180,
    two_wheelers_pct: 42.5,
    autos_pct: 26.5,
    cars_pct: 14.0,
    heavy_vehicles_pct: 14.5,
    pedestrians_hr: 2900,
    avg_speed_kmh: 11.2,
    queue_length_m: 290,
    avg_delay_sec: 148,
    los: "E",
    severity: "Critical",
    major_causes: [
      "ఆర్టీసీ బస్సులు డిపో నుండి బయటకు వచ్చే సమయంలో రెస్ట్ హౌస్ రోడ్డులో ట్రాఫిక్ స్తంభించడం",
      "బస్టాండ్ గేటు ముందే ప్రైవేట్ ట్రావెల్స్, ఆటోలు గుమిగూడడం",
      "రైల్వే స్టేషన్ - బస్టాండ్ మధ్య ప్రయాణించే పాదచారులకు రక్షిత క్రాసింగ్ లేకపోవడం"
    ],
    proposed_interventions: [
      "బస్టాండ్ ఎగ్జిట్ వద్ద వెబ్‌స్టర్ సిగ్నల్ (గ్రీన్ స్ప్లిట్ 25 సెకన్లు) అమర్చి బస్సులకు ప్రాధాన్యత కల్పించడం",
      "గేటు వెలుపల ఉన్న ఆటోలను బస్టాండ్ ప్రాంగణంలో నిర్దేశించిన ఆటో బే (AS-02) లోకి తరలించడం",
      "బస్టాండ్ కాంప్లెక్స్ ఎదురుగా స్మార్ట్ ట్రాఫిక్ సెన్సార్లతో కూడిన పెడెస్ట్రియన్ రెఫ్యూజ్ ఐలాండ్ నిర్మించడం"
    ]
  },
  {
    id: "HS-05",
    rank: 5,
    name: "DNR College Main Road Junction",
    nameTe: "డి.ఎన్.ఆర్. కళాశాల ప్రధాన రోడ్డు కూడలి",
    ward: 29,
    ward_name: "D.N.R. College & Balusumudi South",
    coords: [16.5320, 81.5160],
    road: "DNR College Main Road & Sompeta Corridor",
    junction_type: "4-Arm Institutional Crossroads",
    peak_pcu_hr: 3350,
    two_wheelers_pct: 66.5,
    autos_pct: 18.2,
    cars_pct: 8.5,
    heavy_vehicles_pct: 2.5,
    pedestrians_hr: 3800,
    avg_speed_kmh: 10.4,
    queue_length_m: 310,
    avg_delay_sec: 142,
    los: "E",
    severity: "Critical",
    major_causes: [
      "కాలేజీ తెరిచే (8:45-9:30 AM) మరియు ముగిసే (4:15-5:15 PM) వేళల్లో విద్యార్థుల బైకుల రద్దీ",
      "కాలేజీ ఎదురుగా రోడ్డు ఇరువైపులా నిలిపే ద్విచక్ర వాహనాల వల్ల క్యారేజ్‌వే 40% తగ్గిపోవడం",
      "రాయలం గ్రామం నుండి వచ్చే వ్యవసాయ ట్రాక్టర్లు విద్యార్థుల ట్రాఫిక్‌తో ఢీకొనడం"
    ],
    proposed_interventions: [
      "కాలేజీ ప్రాంగణంలో 350 ECS సామర్థ్యం గల ప్రత్యేక స్టూడెంట్ & స్టాఫ్ పార్కింగ్ బే (PK-08) నిర్మాణం",
      "పీక్ అవర్స్‌లో స్కూల్/కాలేజీ బస్సుల కోసం ప్రత్యేక డ్రాప్-అండ్-గో బేలు ఏర్పాటు చేయడం",
      "కాలేజీ గేటు వద్ద వెబ్‌స్టర్ టైమింగ్స్ కలిగిన స్కూల్-జోన్ వేగ పరిమితి (25 km/h) డిజిటల్ బోర్డులు"
    ]
  },
  {
    id: "HS-06",
    rank: 6,
    name: "Rest House Road & Mavullamma Temple Center",
    nameTe: "రెస్ట్ హౌస్ రోడ్ & శ్రీ మావుళ్ళమ్మ అమ్మవారి గుడి కూడలి",
    ward: 27,
    ward_name: "S.P. Road Strip & R.H. Road East",
    coords: [16.5366, 81.5225],
    road: "Rest House Road (R.H. Road)",
    junction_type: "4-Arm Commercial Crossroad",
    peak_pcu_hr: 3120,
    two_wheelers_pct: 59.4,
    autos_pct: 21.0,
    cars_pct: 12.8,
    heavy_vehicles_pct: 2.2,
    pedestrians_hr: 3200,
    avg_speed_kmh: 11.5,
    queue_length_m: 260,
    avg_delay_sec: 135,
    los: "E",
    severity: "Severe",
    major_causes: [
      "ఆలయ దర్శనార్థుల కార్లు మరియు ద్విచక్ర వాహనాలు రెస్ట్ హౌస్ రోడ్డు పైనే నిలపడం",
      "వస్త్ర దుకాణాలు మరియు హోటళ్ల ముందు క్యారేజ్‌వేను ఆక్రమించి బోర్డులు పెట్టడం",
      "ఆర్టీసీ బస్సులు తిరిగే సమయంలో ఇరుకైన టర్నింగ్ రేడియస్ వల్ల ట్రాఫిక్ నిలిచిపోవడం"
    ],
    proposed_interventions: [
      "మావుళ్ళమ్మ దేవస్థానం వద్ద 180 ECS సామర్థ్యం గల భక్తుల పార్కింగ్ ప్లాట్ (PK-13) కేటాయింపు",
      "రెస్ట్ హౌస్ రోడ్డులో అక్రమ పార్కింగ్‌పై వీల్ క్లాంపింగ్ మరియు స్మార్ట్ కెమెరా ఈ-చలానాలు",
      "కూడలి వద్ద మూలలను 7.5 మీటర్ల రేడియస్‌కు విస్తరించి సులభతర బస్సు మలుపులు కల్పించడం"
    ]
  },
  {
    id: "HS-07",
    rank: 7,
    name: "Undi Road / Nidadavole Road Railway Crossing Junction",
    nameTe: "ఉండి రోడ్ / నిడదవోలు రోడ్ రైల్వే క్రాసింగ్ కూడలి",
    ward: 3,
    ward_name: "Railway Fork & Nidadavole Road",
    coords: [16.5482, 81.5305],
    road: "Undi Road & Nidadavole Railway Link",
    junction_type: "3-Arm Rail Fork Intersection",
    peak_pcu_hr: 2850,
    two_wheelers_pct: 48.0,
    autos_pct: 20.0,
    cars_pct: 16.5,
    heavy_vehicles_pct: 12.0,
    pedestrians_hr: 1650,
    avg_speed_kmh: 12.0,
    queue_length_m: 340,
    avg_delay_sec: 155,
    los: "E",
    severity: "Severe",
    major_causes: [
      "రైల్వే షంటింగ్ మరియు గూడ్స్ రైళ్ల కదలికల సమయంలో అప్రోచ్ రోడ్లలో ట్రాఫిక్ స్తంభించడం",
      "పశ్చిమ గోదావరి గ్రామీణ సరుకు రవాణా లారీల రద్దీ మరియు అస్తవ్యస్త ఓవర్‌టేకింగ్",
      "రహదారి ఉపరితలం గుంతలు పడడం వల్ల వాహనాల వేగం పడిపోవడం"
    ],
    proposed_interventions: [
      "ఈ క్రాసింగ్ వద్ద ట్రాఫిక్ ఒత్తిడి తగ్గించడానికి ప్రతిపాదిత ఆర్‌ఓబీ (ROB) సాధ్యాసాధ్యాల సర్వే",
      "అప్రోచ్ రహదారిని 4-లేన్లుగా వెడల్పు చేసి రబ్బరైజ్డ్ స్పీడ్ కామింగ్ చర్యలు చేపట్టడం",
      "పీక్ అవర్లలో భారీ సరుకు లారీలను ఔటర్ బైపాస్ (NH-165) మీదుగా మళ్లించడం"
    ]
  },
  {
    id: "HS-08",
    rank: 8,
    name: "Juvvalapalem Road (J.P. Road) Commercial Corridor Junction",
    nameTe: "జువ్వలపాలెం రోడ్ (జేపీ రోడ్) వాణిజ్య కారిడార్ కూడలి",
    ward: 34,
    ward_name: "Juvvalapalem Road (J.P. Road)",
    coords: [16.5395, 81.5065],
    road: "Juvvalapalem Road (J.P. Road)",
    junction_type: "4-Arm Major Arterial Gateway",
    peak_pcu_hr: 2950,
    two_wheelers_pct: 55.0,
    autos_pct: 21.5,
    cars_pct: 14.5,
    heavy_vehicles_pct: 5.5,
    pedestrians_hr: 2200,
    avg_speed_kmh: 13.5,
    queue_length_m: 250,
    avg_delay_sec: 125,
    los: "E",
    severity: "Severe",
    major_causes: [
      "రొయ్యల ఫీడ్, ఆక్వాకల్చర్ సప్లై గోదాముల లోడింగ్/అన్‌లోడింగ్ రోడ్డుపై జరగడం",
      "నిర్దేశిత మీడియన్ లేకపోవడం వల్ల ఇష్టారాజ్యంగా యూ-టర్న్‌లు చేయడం",
      "జువ్వలపాలెం గ్రామాల నుండి నగరంలోకి వచ్చే నిరంతర ఆటోల ప్రవాహం"
    ],
    proposed_interventions: [
      "వాణిజ్య లోడింగ్/అన్‌లోడింగ్‌ను రాత్రి 9:00 PM నుండి ఉదయం 7:00 AM వరకే పరిమితం చేయడం",
      "రోడ్డు మధ్యలో కాంక్రీట్ మీడియన్ మరియు యూ-టర్న్ నిర్దేశిత బేలు నిర్మించడం",
      "సరుకు రవాణా వాహనాల కోసం రోడ్డు పక్కన ప్రత్యేక పార్కింగ్ బేల అభివృద్ధి"
    ]
  },
  {
    id: "HS-09",
    rank: 9,
    name: "Gunupudi Wholesale Vegetable & Fish Market Center",
    nameTe: "గునుపూడి హోల్‌సేల్ కూరగాయలు & చేపల మార్కెట్ కూడలి",
    ward: 18,
    ward_name: "Railway South & BT Market East",
    coords: [16.5433, 81.5320],
    road: "Gandhi Road East / B.T. Market Street",
    junction_type: "Market Access Narrow Throat Intersect",
    peak_pcu_hr: 2750,
    two_wheelers_pct: 61.2,
    autos_pct: 22.4,
    cars_pct: 6.8,
    heavy_vehicles_pct: 6.5,
    pedestrians_hr: 3900,
    avg_speed_kmh: 6.8,
    queue_length_m: 280,
    avg_delay_sec: 168,
    los: "F",
    severity: "Critical",
    major_causes: [
      "ఉదయం 5:00 నుండి 9:30 AM వరకు హోల్‌సేల్ వ్యాపారుల బొలేరో పికప్‌లు రోడ్డును బ్లాక్ చేయడం",
      "చేపల మార్కెట్ మురుగునీరు రోడ్డుపై ప్రవహించి జారే పరిస్థితి ఏర్పడడం",
      "పాదచారులు, తోపుడు బండ్లు, కొనుగోలుదారుల బైకులు రోడ్డుపైనే ఉండడం"
    ],
    proposed_interventions: [
      "హోల్‌సేల్ లోడింగ్ కార్యకలాపాలను మార్కెట్ యార్డ్ గ్రౌండ్ (PK-09) లోపలికి తరలించడం",
      "మార్కెట్ అప్రోచ్ రోడ్డులో ఉదయం 6:00 నుండి 10:00 AM వరకు హెవీ వాహనాల ప్రవేశ నిషేధం",
      "డ్రైనేజీ పునర్నిర్మాణం మరియు పాదచారులకు రక్షిత కర్బ్ వే బిల్డింగ్"
    ]
  },
  {
    id: "HS-10",
    rank: 10,
    name: "SRKR Engineering College / Chinna Amiram Road Junction",
    nameTe: "ఎస్.ఆర్.కె.ఆర్ ఇంజనీరింగ్ కాలేజ్ / చైనామిరం రోడ్డు కూడలి",
    ward: 35,
    ward_name: "S.N. Puram & China Amiram Border",
    coords: [16.5460, 81.4990],
    road: "SRKR Engineering College Campus Link Road",
    junction_type: "3-Arm Major Campus Feeder Gate",
    peak_pcu_hr: 2680,
    two_wheelers_pct: 68.5,
    autos_pct: 17.5,
    cars_pct: 9.2,
    heavy_vehicles_pct: 2.8,
    pedestrians_hr: 3100,
    avg_speed_kmh: 14.0,
    queue_length_m: 230,
    avg_delay_sec: 110,
    los: "D",
    severity: "Moderate",
    major_causes: [
      "వేలాది మంది ఇంజనీరింగ్ విద్యార్థులు ఒకేసారి బైకులు మరియు ప్రైవేట్ బస్సుల్లో రావడం",
      "కాలేజ్ బస్సులు రోడ్డుపై మలుపు తిరిగే సమయంలో ఇరువైపులా ట్రాఫిక్ ఆగిపోవడం",
      "రాత్రి వేళల్లో తగినంత స్ట్రీట్ లైటింగ్ లేకపోవడం మరియు పాదచారుల క్రాసింగ్ సమస్యలు"
    ],
    proposed_interventions: [
      "కాలేజీ లోపల బస్సు టెర్మినల్ బేలు కేటాయించి రోడ్డుపై మలుపు తిరగడాన్ని నిషేధించడం",
      "కాలేజీ గేటు వద్ద 400 ECS కెపాసిటీ స్టూడెంట్ పార్కింగ్ కాంప్లెక్స్ (PK-12) నిర్మాణం",
      "సోలార్ పెడెస్ట్రియన్ బ్లింకర్లు మరియు హై-విజిబిలిటీ జీబ్రా క్రాసింగ్ లైన్లు ఏర్పాటు"
    ]
  },
  {
    id: "HS-11",
    rank: 11,
    name: "Tadepalligudem Road / Outer Bypass Junction (NH-165 Connector)",
    nameTe: "తాడేపల్లిగూడెం రోడ్ / ఔటర్ బైపాస్ కూడలి (NH-165 కనెక్టర్)",
    ward: 1,
    ward_name: "Govindarao Nagar North & Kumudavalli Border",
    coords: [16.5665, 81.5310],
    road: "NH-165 Bhimavaram Bypass & SH-42 Intersection",
    junction_type: "4-Arm High-Speed Regional Intersection",
    peak_pcu_hr: 3200,
    two_wheelers_pct: 35.0,
    autos_pct: 12.0,
    cars_pct: 22.0,
    heavy_vehicles_pct: 28.0,
    pedestrians_hr: 450,
    avg_speed_kmh: 18.5,
    queue_length_m: 260,
    avg_delay_sec: 118,
    los: "D",
    severity: "Moderate",
    major_causes: [
      "హైవే వేగంతో వచ్చే భారీ కంటైనర్లు మరియు లోకల్ టూవీలర్ల మధ్య భద్రతా వైరుధ్యం",
      "రాత్రి వేళల్లో చానలైజేషన్ ఐలాండ్స్ స్పష్టంగా కనిపించకపోవడం",
      "తాడేపల్లిగూడెం నుండి భీమవరంలోకి వచ్చే సరుకు లారీల మళ్లింపు సంక్లిష్టత"
    ],
    proposed_interventions: [
      "హైవే కూడలి వద్ద హై-మాస్ట్ లైట్లు మరియు సోలార్ స్టడ్ రిఫ్లెక్టర్లు అమర్చడం",
      "ఫ్రీ లెఫ్ట్ టర్న్ లేన్లను భౌతికంగా వేరుచేసి ప్రమాదాలను నివారించడం",
      "సిగ్నలైజేషన్ మరియు వేగ నియంత్రణ రంబల్ స్ట్రిప్స్ ఏర్పాటు"
    ]
  },
  {
    id: "HS-12",
    rank: 12,
    name: "Balusumoodi 4-Roads Center",
    nameTe: "బలుసుమూడి 4-రోడ్ల కూడలి",
    ward: 30,
    ward_name: "Rayalam Road & DNR North Junction",
    coords: [16.5348, 81.5155],
    road: "Balusumoodi Main Road & Sompeta Crossroads",
    junction_type: "4-Arm Dense Urban Crossroads",
    peak_pcu_hr: 2890,
    two_wheelers_pct: 62.0,
    autos_pct: 22.0,
    cars_pct: 11.5,
    heavy_vehicles_pct: 2.5,
    pedestrians_hr: 2600,
    avg_speed_kmh: 11.0,
    queue_length_m: 240,
    avg_delay_sec: 122,
    los: "E",
    severity: "Severe",
    major_causes: [
      "బలుసుమూడి థియేటర్ల స్ట్రిప్ మరియు రెస్టారెంట్ల ముందు పార్కింగ్ క్యారేజ్‌వేని ఆక్రమించడం",
      "జే.పీ. రోడ్, డి.ఎన్.ఆర్ కాలేజీ మరియు సోంపేట రోడ్ల ట్రాఫిక్ ఒకే చోట కేంద్రీకృతం కావడం",
      "జంక్షన్ వద్ద స్టాప్ లైన్ క్రమశిక్షణ లేకపోవడం వల్ల లాక్‌జామ్ ఏర్పడడం"
    ],
    proposed_interventions: [
      "4 దిశల వెబ్‌స్టర్ ఫిక్స్‌డ్ టైమ్ సిగ్నల్ (80 సెకన్ల సైకిల్) ఏర్పాటు",
      "కూడలికి 30 మీటర్ల పరిధిలో పార్కింగ్ నిషేధం మరియు ఆటో డ్రాపింగ్ పాయింట్ల గుర్తింపు",
      "పాదచారుల సురక్షిత నడక కోసం కార్నర్ బల్బ్‌అవుట్‌లు నిర్మించడం"
    ]
  },
  {
    id: "HS-13",
    rank: 13,
    name: "Palakollu Road / Losari Bridge Approach",
    nameTe: "పాలకొల్లు రోడ్ / లోసరి బ్రిడ్జి అప్రోచ్ కూడలి",
    ward: 12,
    ward_name: "Bridge Peta & Taderu Border",
    coords: [16.5305, 81.5450],
    road: "B.N. Road (To Palakollu / Narsapuram)",
    junction_type: "Narrow Bridgehead Bottleneck",
    peak_pcu_hr: 2540,
    two_wheelers_pct: 46.0,
    autos_pct: 20.0,
    cars_pct: 18.0,
    heavy_vehicles_pct: 14.0,
    pedestrians_hr: 850,
    avg_speed_kmh: 12.5,
    queue_length_m: 290,
    avg_delay_sec: 130,
    los: "E",
    severity: "Severe",
    major_causes: [
      "వంతెన వెడల్పు 2-లేన్లకు పరిమితం కావడం వల్ల 4-లేన్ల ట్రాఫిక్ బాటిల్‌నెక్ అవ్వడం",
      "చేపల పెంపకం మరియు వ్యవసాయ ఉత్పత్తుల రవాణా లారీల రద్దీ",
      "వంతెన అప్రోచ్ వద్ద అక్రమ సైడ్-రోడ్ టిఫిన్ బండ్లు"
    ],
    proposed_interventions: [
      "వంతెనకు సమాంతరంగా అదనపు 2-లేన్ల బ్రిడ్జి నిర్మాణ ప్రతిపాదన (R&B డిపార్ట్‌మెంట్)",
      "అప్రోచ్ వద్ద అడ్డంకులను తొలగించి దృశ్యమానతను (Sight Distance) మెరుగుపరచడం",
      "సరుకు రవాణా వాహనాల కోసం లేన్ క్రమశిక్షణ మార్కింగ్‌లు"
    ]
  },
  {
    id: "HS-14",
    rank: 14,
    name: "Alluri Sitarama Raju (ASR) Hall & Medical Enclave Center",
    nameTe: "అల్లూరి సీతారామరాజు నాట్య కళా పరిషత్ & మెడికల్ ఎన్‌క్లేవ్ కూడలి",
    ward: 33,
    ward_name: "Alluri Sitarama Raju Hall & S.R. Rao Park",
    coords: [16.5416, 81.5155],
    road: "ASR Hall Road & Town Station West Feeder",
    junction_type: "3-Arm Civic Enclave Junction",
    peak_pcu_hr: 2480,
    two_wheelers_pct: 59.0,
    autos_pct: 21.0,
    cars_pct: 15.0,
    heavy_vehicles_pct: 1.0,
    pedestrians_hr: 2100,
    avg_speed_kmh: 12.8,
    queue_length_m: 190,
    avg_delay_sec: 98,
    los: "D",
    severity: "Moderate",
    major_causes: [
      "కళ్యాణ మండపం మరియు సభలు జరిగే వేళల్లో కార్ల పార్కింగ్ రోడ్డుపై జరగడం",
      "ఆసుపత్రుల అంబులెన్సులు ట్రాఫిక్ రద్దీలో చిక్కుకుపోవడం",
      "టౌన్ రైల్వే స్టేషన్ పశ్చిమ వైపు నుండి వచ్చే ఆటోల రద్దీ"
    ],
    proposed_interventions: [
      "అంబులెన్సుల కోసం 24/7 అత్యవసర కారిడార్ మార్కింగ్ (NP-04 అమలు)",
      "కళా పరిషత్ సమీపంలో 120 ECS సందర్శకుల పార్కింగ్ కేంద్రం (PK-11)",
      "నైట్ ఈవెంట్ల సమయంలో ప్రత్యేక మున్సిపల్ ట్రాఫిక్ వార్డెన్ల నియామకం"
    ]
  },
  {
    id: "HS-15",
    rank: 15,
    name: "Bhimavaram Railway Junction (East Gate Entrance)",
    nameTe: "భీమవరం రైల్వే జంక్షన్ (ఈస్ట్ గేట్ ప్రవేశ కూడలి)",
    ward: 10,
    ward_name: "Bhimavaram Railway Junction Area",
    coords: [16.5423, 81.5368],
    road: "Railway Station East Approach & Goods Shed Road",
    junction_type: "Rail Terminal Forecourt Hub",
    peak_pcu_hr: 2620,
    two_wheelers_pct: 52.0,
    autos_pct: 27.0,
    cars_pct: 14.0,
    heavy_vehicles_pct: 5.0,
    pedestrians_hr: 3400,
    avg_speed_kmh: 11.8,
    queue_length_m: 210,
    avg_delay_sec: 105,
    los: "D",
    severity: "Moderate",
    major_causes: [
      "ఎక్స్‌ప్రెస్ రైళ్లు వచ్చినప్పుడు ఒకేసారి ప్రయాణికులు, ఆటోలు, కార్లు నిష్క్రమించడం",
      "గూడ్స్ షెడ్ లోడింగ్ ట్రక్కులు స్టేషన్ రోడ్డుపై నెమ్మదిగా కదలడం",
      "ప్రవేశం వద్ద నిర్దేశిత పిక్-అప్ / డ్రాప్-ఆఫ్ లేన్లు లేకపోవడం"
    ],
    proposed_interventions: [
      "స్టేషన్ ముఖద్వారం వద్ద 280 ECS ప్లాజా పార్కింగ్ (PK-05) మరియు ప్రత్యేక ఆటో బే (AS-03)",
      "గూడ్స్ షెడ్ లారీల రాకపోకలను రాత్రి సమయాలకు మాత్రమే పరిమితం చేయడం",
      "ప్రయాణికుల కోసం వెల్-లిట్ పాదచారుల నడక మార్గాలు మరియు ఈ-బస్సు స్టాప్"
    ]
  },
  {
    id: "HS-16",
    rank: 16,
    name: "Sunday Market (Aadivaaram Santha) & Municipal Ground Environs",
    nameTe: "ఆదివారం సంత (మున్సిపల్ గ్రౌండ్) పరిసరాల కూడలి",
    ward: 21,
    ward_name: "Govt. Hospital & Sunday Santha Grounds",
    coords: [16.5420, 81.5205],
    road: "Sunday Santha Road & Area Hospital South",
    junction_type: "Periodic Market Bottleneck",
    peak_pcu_hr: 3100,
    two_wheelers_pct: 65.0,
    autos_pct: 20.0,
    cars_pct: 8.0,
    heavy_vehicles_pct: 2.0,
    pedestrians_hr: 4800,
    avg_speed_kmh: 6.2,
    queue_length_m: 350,
    avg_delay_sec: 180,
    los: "F",
    severity: "Critical",
    major_causes: [
      "ఆదివారాల్లో వేలాది మంది ప్రజలు, చిరువ్యాపారులు రోడ్డును పూర్తిగా ఆక్రమించడం",
      "ఏరియా ఆసుపత్రికి వెళ్లే రోగుల వాహనాలు, అంబులెన్సులు ఇరుక్కోవడం",
      "పార్కింగ్ సౌకర్యం లేకపోవడంతో బైకులు వందల సంఖ్యలో రోడ్డుపై నిలపడం"
    ],
    proposed_interventions: [
      "ఆదివారాల్లో మున్సిపల్ గ్రౌండ్ లోపలనే 200 ECS సంత పార్కింగ్ (PK-10) తప్పనిసరి చేయడం",
      "ఆసుపత్రి రోడ్డును బారికేడ్లతో వేరుచేసి 'ఎమర్జెన్సీ ఓన్లీ లేన్'గా నిర్వహించడం",
      "తోపుడు బండ్లను మున్సిపల్ నిర్దేశిత హాకింగ్ జోన్లకే పరిమితం చేయడం"
    ]
  },
  {
    id: "HS-17",
    rank: 17,
    name: "KGRL College & Bank Colony Road",
    nameTe: "కె.జి.ఆర్.ఎల్ కాలేజ్ & బ్యాంక్ కాలనీ రోడ్ కూడలి",
    ward: 26,
    ward_name: "KGRL Degree College & Bank Colony",
    coords: [16.5332, 81.5240],
    road: "KGRL College Road & G.V. Canal Link",
    junction_type: "3-Arm Sub-Arterial College Link",
    peak_pcu_hr: 2320,
    two_wheelers_pct: 64.0,
    autos_pct: 18.0,
    cars_pct: 12.0,
    heavy_vehicles_pct: 2.0,
    pedestrians_hr: 2400,
    avg_speed_kmh: 13.2,
    queue_length_m: 180,
    avg_delay_sec: 92,
    los: "C",
    severity: "Moderate",
    major_causes: [
      "కాలేజీ విద్యార్థుల బైకుల వేగం మరియు రోడ్డుపై పార్కింగ్",
      "బ్యాంక్ కాలనీ నివాసితుల కార్ల ప్రవేశ సమయంలో ట్రాఫిక్ ఆటంకం"
    ],
    proposed_interventions: [
      "కాలేజీ సమీపంలో పాదచారుల జీబ్రా క్రాసింగ్ మరియు సైడ్-వాక్ నిర్మాణం",
      "రహదారి ఇరువైపులా డ్రైనేజీలపై కవర్ స్లాబ్‌లు వేసి నడక స్థలాన్ని పెంచడం"
    ]
  },
  {
    id: "HS-18",
    rank: 18,
    name: "Gollavanitippa Road / Aquaculture Processing Hub Junction",
    nameTe: "గొల్లవానితిప్ప రోడ్ / ఆక్వా ప్రాసెసింగ్ హబ్ కూడలి",
    ward: 31,
    ward_name: "Rayalam Border South-West",
    coords: [16.5285, 81.5065],
    road: "Gollavanitippa Agro-Industrial Corridor",
    junction_type: "Agro-Freight Sub-Arterial T-Junction",
    peak_pcu_hr: 2280,
    two_wheelers_pct: 44.0,
    autos_pct: 16.0,
    cars_pct: 12.0,
    heavy_vehicles_pct: 24.0,
    pedestrians_hr: 650,
    avg_speed_kmh: 14.5,
    queue_length_m: 170,
    avg_delay_sec: 88,
    los: "C",
    severity: "Moderate",
    major_causes: [
      "ఐస్ ఫ్యాక్టరీలు, కోల్డ్ స్టోరేజీల నుండి వచ్చే ఇన్సులేటెడ్ వ్యాన్లు మరియు ట్రాక్టర్ల రద్దీ",
      "రోడ్డు మార్జిన్లలో లోడింగ్ చేయడం వల్ల ట్రాఫిక్ ప్రవాహం నెమ్మదించడం"
    ],
    proposed_interventions: [
      "ఆక్వా సరుకు లోడింగ్ కోసం ప్రత్యేక ఆఫ్-స్ట్రీట్ లాజిస్టిక్స్ బేలు ఏర్పాటు",
      "భారీ వాహనాల కోసం రోడ్డు అంచులను మెటలింగ్ చేసి పటిష్టపరచడం"
    ]
  },
  {
    id: "HS-19",
    rank: 19,
    name: "Srirampuram Main Road Crossroads",
    nameTe: "శ్రీరాంపురం మెయిన్ రోడ్డు చౌరస్తా",
    ward: 8,
    ward_name: "Chinna Ranga Palem & Srirampuram",
    coords: [16.5465, 81.5410],
    road: "Srirampuram Main Road & Colony Crossroads",
    junction_type: "4-Arm Residential Collector Crossroads",
    peak_pcu_hr: 2150,
    two_wheelers_pct: 66.0,
    autos_pct: 18.0,
    cars_pct: 12.0,
    heavy_vehicles_pct: 1.5,
    pedestrians_hr: 1950,
    avg_speed_kmh: 13.8,
    queue_length_m: 160,
    avg_delay_sec: 82,
    los: "C",
    severity: "Moderate",
    major_causes: [
      "కాలనీ అంతర్గత వీధుల నుండి వచ్చే వాహనాలకు సైట్ డిస్టెన్స్ తక్కువగా ఉండడం",
      "స్కూల్ వ్యాన్లు, ఆటోలు పిల్లలను ఎక్కించుకునే సమయంలో రోడ్డుపై ట్రాఫిక్ నిలవడం"
    ],
    proposed_interventions: [
      "కూడలి వద్ద కాన్వెక్స్ మిర్రర్లు (Blind Spot Mirrors) అమర్చడం",
      "స్కూల్ జోన్ స్పీడ్ బ్రేకల్స్ మరియు రోడ్ మార్కింగ్స్ పునరుద్ధరణ"
    ]
  },
  {
    id: "HS-20",
    rank: 20,
    name: "Municipal Office & Sub-Court Center Junction",
    nameTe: "మున్సిపల్ కార్యాలయం & సబ్-కోర్టు కూడలి",
    ward: 28,
    ward_name: "Municipal Office & Sub-Court Environs",
    coords: [16.5373, 81.5194],
    road: "Rest House Road & Civic Complex Street",
    junction_type: "Civic Complex 3-Arm T-Junction",
    peak_pcu_hr: 2420,
    two_wheelers_pct: 58.0,
    autos_pct: 20.0,
    cars_pct: 16.0,
    heavy_vehicles_pct: 1.5,
    pedestrians_hr: 2500,
    avg_speed_kmh: 12.0,
    queue_length_m: 180,
    avg_delay_sec: 95,
    los: "D",
    severity: "Moderate",
    major_causes: [
      "కోర్టు రోజుల్లో న్యాయవాదులు, కక్షిదారులు మరియు మున్సిపల్ సందర్శకుల కార్లు రోడ్డుపైనే పార్కింగ్",
      "ప్రభుత్వ గెస్ట్ హౌస్ వైపు వీఐపీ వాహనాల కదలికల సమయంలో ట్రాఫిక్ ఆంక్షలు"
    ],
    proposed_interventions: [
      "మున్సిపల్ కార్యాలయం ఎదురుగా 140 ECS సివిక్ పార్కింగ్ కాంప్లెక్స్ (PK-06) వినియోగాన్ని తప్పనిసరి చేయడం",
      "రోడ్డుపై నో-పార్కింగ్ కఠినంగా అమలు చేసి పాదచారుల కాలిబాటను విస్తరించడం"
    ]
  }
];

const updatedRoadSegments = [
  {
    id: "ROAD-01",
    name: "P.P. Road (Prakasam Road Arterial Spine)",
    nameTe: "పి.పి. రోడ్డు (ప్రకాశం రోడ్డు ప్రధాన ధమని)",
    type: "Major Arterial",
    tier: 1,
    length_km: 3.4,
    carriageway_width_m: 11.5,
    lanes: 4,
    surface: "Asphalt Concrete (Good)",
    operation: "Two-Way (Proposed One-Way in Core under Scenario A)",
    parking: "High On-Street Friction (38% reduction in effective width)",
    encroachment: "Commercial display boards, tea stalls, awnings",
    footpath_pct: 28,
    cycle_infra: "None (Mixed Flow)",
    bus_stops: 8,
    junctions: 7,
    traffic_volume_pcu_hr: 3840,
    capacity_pcu_hr: 2400,
    vc_ratio: 1.60,
    peak_speed_kmh: 8.5,
    bottleneck: "Prakasham Underpass approach, Gandhi statue center",
    coords: [
      [16.5540, 81.5175],
      [16.5510, 81.5192],
      [16.5482, 81.5212],
      [16.5460, 81.5226],
      [16.5448, 81.5235],
      [16.5432, 81.5242],
      [16.5415, 81.5248],
      [16.5395, 81.5255]
    ]
  },
  {
    id: "ROAD-02",
    name: "Gandhi Road & Railway Feeder Parallel Spine",
    nameTe: "గాంధీ రోడ్డు & రైల్వే ఫీడర్ సమాంతర ధమని",
    type: "Major Arterial",
    tier: 1,
    length_km: 2.8,
    carriageway_width_m: 9.8,
    lanes: 2,
    surface: "Bituminous (Fair with patches)",
    operation: "Two-Way (Proposed Clockwise Companion in Scenario A)",
    parking: "Severe unauthorized auto-rickshaw waiting & freight bays",
    encroachment: "Auto workshops, scrap yards, fruit stalls",
    footpath_pct: 15,
    cycle_infra: "None",
    bus_stops: 6,
    junctions: 6,
    traffic_volume_pcu_hr: 3100,
    capacity_pcu_hr: 2100,
    vc_ratio: 1.48,
    peak_speed_kmh: 9.8,
    bottleneck: "Town Station east approach, Gunupudi market crossing",
    coords: [
      [16.5455, 81.5160],
      [16.5452, 81.5195],
      [16.5448, 81.5235],
      [16.5442, 81.5275],
      [16.5433, 81.5320],
      [16.5428, 81.5345],
      [16.5423, 81.5368]
    ]
  },
  {
    id: "ROAD-03",
    name: "Rest House Road Commercial Corridor",
    nameTe: "రెస్ట్ హౌస్ రోడ్డు వాణిజ్య కారిడార్",
    type: "Sub-Arterial",
    tier: 2,
    length_km: 1.9,
    carriageway_width_m: 8.5,
    lanes: 2,
    surface: "Asphalt (Fair)",
    operation: "Two-Way",
    parking: "Severe commercial bike and shopper parking",
    encroachment: "Clothing stores, electronics shops, temporary stalls",
    footpath_pct: 22,
    cycle_infra: "None",
    bus_stops: 5,
    junctions: 5,
    traffic_volume_pcu_hr: 2950,
    capacity_pcu_hr: 1800,
    vc_ratio: 1.64,
    peak_speed_kmh: 11.2,
    bottleneck: "Mavullamma temple center, RTC Bus stand exit",
    coords: [
      [16.5373, 81.5194],
      [16.5370, 81.5210],
      [16.5366, 81.5225],
      [16.5385, 81.5250],
      [16.5402, 81.5268],
      [16.5415, 81.5285]
    ]
  },
  {
    id: "ROAD-04",
    name: "NH-165 Bhimavaram Outer Bypass (National Highway)",
    nameTe: "NH-165 భీమవరం ఔటర్ బైపాస్ (జాతీయ రహదారి)",
    type: "National Highway / Bypass",
    tier: 1,
    length_km: 7.2,
    carriageway_width_m: 14.0,
    lanes: 4,
    surface: "Asphalt Concrete (Very Good)",
    operation: "Four-Lane Divided Highway",
    parking: "Dhaba & truck staging on unpaved shoulders",
    encroachment: "Low (Agrarian & industrial strip)",
    footpath_pct: 5,
    cycle_infra: "Shoulder Shared",
    bus_stops: 6,
    junctions: 8,
    traffic_volume_pcu_hr: 3400,
    capacity_pcu_hr: 4500,
    vc_ratio: 0.76,
    peak_speed_kmh: 46.0,
    bottleneck: "Tadepalligudem road junction (HS-11), Tanuku road fork",
    coords: [
      [16.5720, 81.5350],
      [16.5665, 81.5310],
      [16.5580, 81.5380],
      [16.5511, 81.5500],
      [16.5420, 81.5520],
      [16.5320, 81.5490],
      [16.5240, 81.5420]
    ]
  },
  {
    id: "ROAD-05",
    name: "Juvvalapalem Road Arterial Corridor",
    nameTe: "జువ్వలపాలెం రోడ్డు ప్రధాన ధమని",
    type: "Major Arterial",
    tier: 1,
    length_km: 2.6,
    carriageway_width_m: 10.0,
    lanes: 2,
    surface: "Asphalt (Fair)",
    operation: "Two-Way",
    parking: "Feed trucks, commercial loading, auto stands",
    encroachment: "Welding shops, timber depots, agro-chemical outlets",
    footpath_pct: 12,
    cycle_infra: "None",
    bus_stops: 6,
    junctions: 5,
    traffic_volume_pcu_hr: 2850,
    capacity_pcu_hr: 2000,
    vc_ratio: 1.43,
    peak_speed_kmh: 13.5,
    bottleneck: "Balusumoodi junction, Chinamiram road link",
    coords: [
      [16.5420, 81.4980],
      [16.5408, 81.5030],
      [16.5395, 81.5065],
      [16.5380, 81.5110],
      [16.5355, 81.5145],
      [16.5348, 81.5155]
    ]
  },
  {
    id: "ROAD-06",
    name: "DNR College Educational Access Corridor (Balusumudi to Rayalam)",
    nameTe: "డి.ఎన్.ఆర్. కళాశాల విద్యా కారిడార్",
    type: "Sub-Arterial",
    tier: 2,
    length_km: 1.8,
    carriageway_width_m: 9.0,
    lanes: 2,
    surface: "Bituminous (Fair with broken kerbs)",
    operation: "Two-Way",
    parking: "Extreme 2-wheeler student parking on both flanks",
    encroachment: "Book stalls, fast food corners, xerox centres",
    footpath_pct: 18,
    cycle_infra: "Dedicated paint-marked student cycle bay (Proposed)",
    bus_stops: 4,
    junctions: 4,
    traffic_volume_pcu_hr: 3250,
    capacity_pcu_hr: 1900,
    vc_ratio: 1.71,
    peak_speed_kmh: 10.2,
    bottleneck: "DNR main gate, Stadium intersection",
    coords: [
      [16.5348, 81.5155],
      [16.5330, 81.5158],
      [16.5320, 81.5160],
      [16.5295, 81.5152],
      [16.5270, 81.5130]
    ]
  },
  {
    id: "ROAD-07",
    name: "Someswara Swamy Temple / Main Bazaar Heritage Street",
    nameTe: "శ్రీ సోమేశ్వర స్వామి వారి గుడి / మెయిన్ బజార్ హెరిటేజ్ వీధి",
    type: "Heritage Commercial Street",
    tier: 2,
    length_km: 1.4,
    carriageway_width_m: 6.8,
    lanes: 2,
    surface: "Concrete Paver Blocks / Bitumen (Uneven)",
    operation: "Two-Way (High Pedestrian Conflict)",
    parking: "Disorganized shopper two-wheelers on carriageway",
    encroachment: "Severe flower, pooja articles, jewellery stalls",
    footpath_pct: 8,
    cycle_infra: "Shared Pedestrian Priority Zone (Proposed)",
    bus_stops: 3,
    junctions: 4,
    traffic_volume_pcu_hr: 2980,
    capacity_pcu_hr: 1400,
    vc_ratio: 2.13,
    peak_speed_kmh: 6.5,
    bottleneck: "Chandra Pushkarini curve, Temple gate T-junction",
    coords: [
      [16.5432, 81.5242],
      [16.5420, 81.5265],
      [16.5415, 81.5285],
      [16.5412, 81.5312],
      [16.5410, 81.5340]
    ]
  },
  {
    id: "ROAD-08",
    name: "SH-42 Tadepalligudem - Bhimavaram State Highway",
    nameTe: "SH-42 తాడేపల్లిగూడెం - భీమవరం రాష్ట్ర రహదారి",
    type: "State Highway",
    tier: 1,
    length_km: 3.6,
    carriageway_width_m: 11.0,
    lanes: 4,
    surface: "Asphalt (Good)",
    operation: "Divided Two-Way",
    parking: "Commercial vehicles near godowns",
    encroachment: "Moderate",
    footpath_pct: 15,
    cycle_infra: "None",
    bus_stops: 6,
    junctions: 5,
    traffic_volume_pcu_hr: 3150,
    capacity_pcu_hr: 3200,
    vc_ratio: 0.98,
    peak_speed_kmh: 32.0,
    bottleneck: "Bypass junction (HS-11), Govindarao Nagar entry",
    coords: [
      [16.5750, 81.5280],
      [16.5680, 81.5290],
      [16.5665, 81.5310],
      [16.5580, 81.5270],
      [16.5520, 81.5255],
      [16.5482, 81.5245]
    ]
  },
  {
    id: "ROAD-09",
    name: "Undi - Akividu Regional Connection Road",
    nameTe: "ఉండి - ఆకివీడు ప్రాంతీయ అనుసంధాన రహదారి",
    type: "Regional Highway",
    tier: 2,
    length_km: 2.8,
    carriageway_width_m: 8.0,
    lanes: 2,
    surface: "Bituminous (Fair)",
    operation: "Two-Way",
    parking: "Rural buses and agricultural trailers",
    encroachment: "Low to Moderate",
    footpath_pct: 10,
    cycle_infra: "None",
    bus_stops: 4,
    junctions: 4,
    traffic_volume_pcu_hr: 2200,
    capacity_pcu_hr: 1800,
    vc_ratio: 1.22,
    peak_speed_kmh: 24.0,
    bottleneck: "Kovvada rail link, Town Station entry",
    coords: [
      [16.5600, 81.5050],
      [16.5520, 81.5110],
      [16.5480, 81.5140],
      [16.5455, 81.5160]
    ]
  },
  {
    id: "ROAD-10",
    name: "SRKR College Link Road (Chinna Amiram Corridor)",
    nameTe: "ఎస్.ఆర్.కె.ఆర్ కాలేజ్ లింక్ రోడ్డు (చైనామిరం కారిడార్)",
    type: "Collector / University Link",
    tier: 2,
    length_km: 2.4,
    carriageway_width_m: 8.5,
    lanes: 2,
    surface: "Asphalt (Fair)",
    operation: "Two-Way",
    parking: "College student two-wheelers, auto rickshaws",
    encroachment: "Moderate student canteens and hostels",
    footpath_pct: 20,
    cycle_infra: "Shared Street",
    bus_stops: 4,
    junctions: 4,
    traffic_volume_pcu_hr: 2680,
    capacity_pcu_hr: 1800,
    vc_ratio: 1.49,
    peak_speed_kmh: 14.5,
    bottleneck: "SRKR main entrance, Chinamiram bund junction",
    coords: [
      [16.5460, 81.4950],
      [16.5460, 81.4990],
      [16.5468, 81.5050],
      [16.5472, 81.5096],
      [16.5460, 81.5140],
      [16.5455, 81.5160]
    ]
  },
  {
    id: "ROAD-11",
    name: "Bhimavaram Town Railway Station Approach Road",
    nameTe: "భీమవరం టౌన్ రైల్వే స్టేషన్ అప్రోచ్ రోడ్డు",
    type: "Terminal Connector",
    tier: 2,
    length_km: 1.6,
    carriageway_width_m: 8.5,
    lanes: 2,
    surface: "Asphalt (Fair)",
    operation: "Two-Way",
    parking: "Auto stands and commuter vehicle queues",
    encroachment: "Tea stalls, parcel agencies, hotel frontage",
    footpath_pct: 25,
    cycle_infra: "None",
    bus_stops: 4,
    junctions: 5,
    traffic_volume_pcu_hr: 2850,
    capacity_pcu_hr: 1800,
    vc_ratio: 1.58,
    peak_speed_kmh: 10.5,
    bottleneck: "ASR Hall curve, Sunday market junction",
    coords: [
      [16.5455, 81.5160],
      [16.5435, 81.5170],
      [16.5416, 81.5155],
      [16.5420, 81.5205],
      [16.5432, 81.5242],
      [16.5448, 81.5235]
    ]
  },
  {
    id: "ROAD-12",
    name: "B.N. Road (Bhimavaram - Palakollu / Narsapuram Highway)",
    nameTe: "బి.ఎన్. రోడ్డు (భీమవరం - పాలకొల్లు / నర్సాపురం రహదారి)",
    type: "Major Arterial",
    tier: 1,
    length_km: 3.2,
    carriageway_width_m: 10.5,
    lanes: 2,
    surface: "Asphalt (Good)",
    operation: "Two-Way",
    parking: "Commercial shopfronts and loading vehicles",
    encroachment: "Moderate",
    footpath_pct: 18,
    cycle_infra: "None",
    bus_stops: 6,
    junctions: 6,
    traffic_volume_pcu_hr: 3100,
    capacity_pcu_hr: 2200,
    vc_ratio: 1.41,
    peak_speed_kmh: 18.0,
    bottleneck: "Bridge Peta / Losari bridge approach (HS-13)",
    coords: [
      [16.5432, 81.5242],
      [16.5401, 81.5255],
      [16.5360, 81.5280],
      [16.5332, 81.5300],
      [16.5305, 81.5450],
      [16.5250, 81.5500]
    ]
  },
  {
    id: "ROAD-13",
    name: "KGRL College & Bank Colony Connector Road",
    nameTe: "కె.జి.ఆర్.ఎల్ కాలేజ్ & బ్యాంక్ కాలనీ కనెక్టర్ రోడ్డు",
    type: "Sub-Arterial",
    tier: 2,
    length_km: 1.8,
    carriageway_width_m: 8.0,
    lanes: 2,
    surface: "Asphalt (Fair)",
    operation: "Two-Way",
    parking: "Residential cars, college two-wheelers",
    encroachment: "Low",
    footpath_pct: 20,
    cycle_infra: "Shared Street",
    bus_stops: 4,
    junctions: 4,
    traffic_volume_pcu_hr: 2320,
    capacity_pcu_hr: 1700,
    vc_ratio: 1.36,
    peak_speed_kmh: 15.0,
    bottleneck: "KGRL college gate, Railway Junction approach",
    coords: [
      [16.5360, 81.5280],
      [16.5332, 81.5240],
      [16.5350, 81.5320],
      [16.5390, 81.5350],
      [16.5423, 81.5368]
    ]
  },
  {
    id: "ROAD-14",
    name: "Yenamadurru Canal Bund Green Mobility Corridor (Proposed)",
    nameTe: "ఎనమదుర్రు కాలువ గట్టు హరిత మొబిలిటీ కారిడార్ (ప్రతిపాదిత)",
    type: "Non-Motorized Transit (NMT)",
    tier: 8,
    length_km: 4.8,
    carriageway_width_m: 6.5,
    lanes: 2,
    surface: "Proposed Pervious Asphalt / Concrete Paver",
    operation: "Pedestrian & Electric Feeder Priority",
    parking: "Zero Tolerance (Continuous bollards & railings)",
    encroachment: "Squatters & illegal garbage dumping (To be rehabilitated)",
    footpath_pct: 100,
    cycle_infra: "Continuous 2.5m segregated two-way cycle track",
    bus_stops: 6,
    junctions: 5,
    traffic_volume_pcu_hr: 820,
    capacity_pcu_hr: 1600,
    vc_ratio: 0.51,
    peak_speed_kmh: 22.0,
    bottleneck: "Underpass canal culvert crossing, Someswaram weir",
    coords: [
      [16.5680, 81.5250],
      [16.5610, 81.5248],
      [16.5547, 81.5246],
      [16.5476, 81.5235],
      [16.5420, 81.5225],
      [16.5360, 81.5218],
      [16.5280, 81.5210]
    ]
  },
  {
    id: "ROAD-15",
    name: "Srirampuram & Tanuku Link Road",
    nameTe: "శ్రీరాంపురం & తణుకు లింక్ రోడ్డు",
    type: "Sub-Arterial",
    tier: 2,
    length_km: 2.2,
    carriageway_width_m: 8.5,
    lanes: 2,
    surface: "Asphalt (Fair)",
    operation: "Two-Way",
    parking: "Residential parking, small commercial loading",
    encroachment: "Moderate",
    footpath_pct: 16,
    cycle_infra: "None",
    bus_stops: 4,
    junctions: 4,
    traffic_volume_pcu_hr: 2150,
    capacity_pcu_hr: 1750,
    vc_ratio: 1.23,
    peak_speed_kmh: 18.0,
    bottleneck: "Srirampuram crossroads (HS-19), ARKR school gate",
    coords: [
      [16.5482, 81.5305],
      [16.5472, 81.5350],
      [16.5465, 81.5410],
      [16.5444, 81.5453],
      [16.5420, 81.5520]
    ]
  },
  {
    id: "ROAD-16",
    name: "Rayalam - Gollavanitippa Southern Agro-Corridor",
    nameTe: "రాయలం - గొల్లవానితిప్ప దక్షిణ వ్యవసాయ కారిడార్",
    type: "Collector / Agro-Freight",
    tier: 2,
    length_km: 2.5,
    carriageway_width_m: 7.5,
    lanes: 2,
    surface: "Bituminous (Potholed)",
    operation: "Two-Way",
    parking: "Aquaculture pickups and tractor staging",
    encroachment: "Low",
    footpath_pct: 8,
    cycle_infra: "None",
    bus_stops: 3,
    junctions: 4,
    traffic_volume_pcu_hr: 2280,
    capacity_pcu_hr: 1600,
    vc_ratio: 1.43,
    peak_speed_kmh: 14.5,
    bottleneck: "Gollavanitippa junction (HS-18), Canal bridge",
    coords: [
      [16.5348, 81.5155],
      [16.5320, 81.5120],
      [16.5285, 81.5065],
      [16.5250, 81.5000]
    ]
  }
];

const updatedZones = [
  { id: "Z1", name: "Balusumoodi / West Residential", nameTe: "బలుసుమూడి / పశ్చిమ నివాస ప్రాంతం", coords: [16.5348, 81.5155], trips_gen: 48500, trips_att: 36200 },
  { id: "Z2", name: "Srirampuram / North Residential", nameTe: "శ్రీరాంపురం / ఉత్తర నివాస ప్రాంతం", coords: [16.5465, 81.5410], trips_gen: 52000, trips_att: 41000 },
  { id: "Z3", name: "Main Bazaar & Someswaram Retail", nameTe: "మెయిన్ బజార్ & సోమేశ్వరం వాణిజ్య కేంద్రం", coords: [16.5412, 81.5312], trips_gen: 22000, trips_att: 78500 },
  { id: "Z4", name: "DNR & SRKR Educational Corridor", nameTe: "డి.ఎన్.ఆర్ & ఎస్.ఆర్.కె.ఆర్ విద్యా హబ్", coords: [16.5320, 81.5160], trips_gen: 24500, trips_att: 62000 },
  { id: "Z5", name: "Bhimavaram Town Railway Station", nameTe: "భీమవరం టౌన్ రైల్వే స్టేషన్", coords: [16.5455, 81.5160], trips_gen: 31000, trips_att: 34500 },
  { id: "Z6", name: "APSRTC Regional Bus Station", nameTe: "ఆర్టీసీ బస్ స్టేషన్ కాంప్లెక్స్", coords: [16.5415, 81.5285], trips_gen: 38000, trips_att: 42000 },
  { id: "Z7", name: "Bhimavaram Junction & Industrial", nameTe: "రైల్వే జంక్షన్ & పారిశ్రామిక వాడ", coords: [16.5423, 81.5368], trips_gen: 28500, trips_att: 31000 },
  { id: "Z8", name: "Gunupudi Wholesale Fish & Veg Market", nameTe: "గునుపూడి హోల్‌సేల్ మార్కెట్", coords: [16.5433, 81.5320], trips_gen: 18500, trips_att: 32000 },
  { id: "Z9", name: "Undi / Akividu Gateway (Regional)", nameTe: "ఉండి / ఆకివీడు గేట్‌వే", coords: [16.5600, 81.5050], trips_gen: 26500, trips_att: 21500 },
  { id: "Z10", name: "Tadepalligudem Freight Gateway", nameTe: "తాడేపల్లిగూడెం గేట్‌వే (NH-165)", coords: [16.5665, 81.5310], trips_gen: 34000, trips_att: 29000 },
  { id: "Z11", name: "Palakollu / Narsapuram South Gateway", nameTe: "పాలకొల్లు / నర్సాపురం గేట్‌వే", coords: [16.5305, 81.5450], trips_gen: 29000, trips_att: 25000 },
  { id: "Z12", name: "Govt Hospital & Civic Zone", nameTe: "ప్రభుత్వ ఆసుపత్రి & మున్సిపల్ కార్యాలయం", coords: [16.5373, 81.5194], trips_gen: 15500, trips_att: 28000 }
];

const updatedWebsterJunctions = [
  {
    id: "JN-01",
    name: "Prakasham Chowk & Town Railway Underpass (RuB) Junction",
    coords: [16.5448, 81.5235],
    arms: 5,
    existing_control: "Grade-Separated RuB Underpass with Manual Police / Signal",
    saturation_flow_pcu_hr: 4400,
    peak_volume_pcu_hr: 3840,
    existing_cycle_sec: 120,
    optimal_webster_cycle_sec: 95,
    green_splits_sec: { north_pp_road: 32, south_town_station: 25, east_rest_house: 28, west_kovvada: 15, amber: 10 },
    existing_los: "E",
    improved_los: "B",
    delay_reduction_pct: 48.5,
    turning_movements: { left: 820, thru: 1940, right: 1080 }
  },
  {
    id: "JN-02",
    name: "Old Bus Stand & Gandhi Statue Center",
    coords: [16.5432, 81.5242],
    arms: 4,
    existing_control: "Uncontrolled Rotary",
    saturation_flow_pcu_hr: 4600,
    peak_volume_pcu_hr: 3420,
    existing_cycle_sec: 0,
    optimal_webster_cycle_sec: 95,
    green_splits_sec: { north_market: 28, south_pp_road: 26, east_gandhi_rd: 22, west_balusumoodi: 14, amber: 5 },
    existing_los: "F",
    improved_los: "B",
    delay_reduction_pct: 58.2,
    turning_movements: { left: 910, thru: 1650, right: 860 }
  },
  {
    id: "JN-03",
    name: "APSRTC Bus Complex Entry Junction",
    coords: [16.5415, 81.5285],
    arms: 3,
    existing_control: "Static Signs",
    saturation_flow_pcu_hr: 3800,
    peak_volume_pcu_hr: 3180,
    existing_cycle_sec: 0,
    optimal_webster_cycle_sec: 80,
    green_splits_sec: { arterial_thru: 45, bus_egress: 25, amber: 10 },
    existing_los: "F",
    improved_los: "B",
    delay_reduction_pct: 62.0,
    turning_movements: { left: 620, thru: 2100, right: 460 }
  },
  {
    id: "JN-04",
    name: "DNR College Main Road Junction",
    coords: [16.5320, 81.5160],
    arms: 4,
    existing_control: "Peak Police Assisted",
    saturation_flow_pcu_hr: 4200,
    peak_volume_pcu_hr: 3350,
    existing_cycle_sec: 120,
    optimal_webster_cycle_sec: 90,
    green_splits_sec: { college_arm: 30, town_feeder: 32, rayalam_link: 18, amber: 10 },
    existing_los: "E",
    improved_los: "B",
    delay_reduction_pct: 52.8,
    turning_movements: { left: 740, thru: 1880, right: 730 }
  },
  {
    id: "JN-05",
    name: "Rest House Road & Mavullamma Crossroads",
    coords: [16.5366, 81.5225],
    arms: 4,
    existing_control: "Fixed Time 90s Signal",
    saturation_flow_pcu_hr: 3900,
    peak_volume_pcu_hr: 3120,
    existing_cycle_sec: 90,
    optimal_webster_cycle_sec: 85,
    green_splits_sec: { east_west_rh: 38, north_south_temple: 35, amber: 12 },
    existing_los: "E",
    improved_los: "B",
    delay_reduction_pct: 44.5,
    turning_movements: { left: 680, thru: 1720, right: 720 }
  }
];

const updatedFeederLoops = [
  {
    id: "EB-01",
    name: "Green Loop 1: Town Station - DNR College - S.N. Puram Circular",
    nameTe: "గ్రీన్ లూప్ 1: టౌన్ స్టేషన్ - డి.ఎన్.ఆర్ కాలేజ్ - ఎస్.ఎన్. పురం సర్క్యులర్",
    length_km: 7.2,
    headway_min: 8,
    fleet_ebuses: 6,
    stops: 14,
    color: "#06b6d4",
    route_coords: [
      [16.5455, 81.5160],
      [16.5416, 81.5155],
      [16.5348, 81.5155],
      [16.5320, 81.5160],
      [16.5348, 81.5155],
      [16.5395, 81.5065],
      [16.5460, 81.4990],
      [16.5472, 81.5096],
      [16.5455, 81.5160]
    ]
  },
  {
    id: "EB-02",
    name: "Green Loop 2: Railway Junction - APSRTC Complex - P.P. Road Circular",
    nameTe: "గ్రీన్ లూప్ 2: రైల్వే జంక్షన్ - ఆర్టీసీ కాంప్లెక్స్ - పి.పి. రోడ్ సర్క్యులర్",
    length_km: 6.8,
    headway_min: 10,
    fleet_ebuses: 6,
    stops: 12,
    color: "#10b981",
    route_coords: [
      [16.5423, 81.5368],
      [16.5433, 81.5320],
      [16.5415, 81.5285],
      [16.5366, 81.5225],
      [16.5432, 81.5242],
      [16.5448, 81.5235],
      [16.5442, 81.5275],
      [16.5423, 81.5368]
    ]
  },
  {
    id: "EB-03",
    name: "Green Loop 3: Balusumoodi - SRKR College - J.P. Road Corridor",
    nameTe: "గ్రీన్ లూప్ 3: బలుసుమూడి - ఎస్.ఆర్.కె.ఆర్ కాలేజ్ - జేపీ రోడ్ కారిడార్",
    length_km: 8.5,
    headway_min: 10,
    fleet_ebuses: 6,
    stops: 16,
    color: "#f59e0b",
    route_coords: [
      [16.5348, 81.5155],
      [16.5380, 81.5110],
      [16.5395, 81.5065],
      [16.5408, 81.5030],
      [16.5460, 81.4990],
      [16.5472, 81.5096],
      [16.5455, 81.5160],
      [16.5416, 81.5155],
      [16.5348, 81.5155]
    ]
  },
  {
    id: "EB-04",
    name: "Green Loop 4: Yenamadurru Canal Bund Express Feeder",
    nameTe: "గ్రీన్ లూప్ 4: ఎనమదుర్రు కెనాల్ బండ్ ఎక్స్‌ప్రెస్ ఫీడర్",
    length_km: 5.6,
    headway_min: 12,
    fleet_ebuses: 4,
    stops: 10,
    color: "#8b5cf6",
    route_coords: [
      [16.5680, 81.5250],
      [16.5610, 81.5248],
      [16.5547, 81.5246],
      [16.5476, 81.5235],
      [16.5420, 81.5225],
      [16.5360, 81.5218],
      [16.5280, 81.5210]
    ]
  }
];

const updatedOneWayLoops = [
  {
    id: "LOOP-01",
    name: "Central Commercial One-Way Pair (P.P. Road & Gandhi Road)",
    nameTe: "సెంట్రల్ వన్-వే లూప్ (పి.పి. రోడ్ సౌత్‌బౌండ్ & గాంధీ రోడ్ నార్త్‌బౌండ్)",
    direction_pp_road: "One-Way Southbound (North -> South from Old Bus Stand towards Prakasham Chowk)",
    direction_gandhi_road: "One-Way Northbound (South -> North from Town Station towards Old Bus Stand)",
    length_km: 2.65,
    width_effective_gain_m: 3.2,
    capacity_gain_pct: 42,
    loop_coords: [
      [16.5448, 81.5235],
      [16.5432, 81.5242],
      [16.5420, 81.5265],
      [16.5442, 81.5275],
      [16.5448, 81.5235]
    ],
    entry_points: ["Old Bus Stand Junction (North)", "Rest House Road Intersection", "Kovvada Road Intersection"],
    exit_points: ["Prakasham Chowk (South)", "Town Station Connector", "Tanuku Road Fork"],
    emergency_access: "Dedicated 3.0m contra-flow / prioritized emergency vehicle lane delineated by mountable flexible kerb delineators",
    transit_routing: "City feeder buses follow one-way loop with clockwise bus shelters every 350m",
    congestion_transfer_mitigation: "Parallel lanes on Gandhi Road resurfaced and encroaching parked vehicles relocated to new MLCP"
  },
  {
    id: "LOOP-02",
    name: "Town Railway Station Circulating Loop",
    nameTe: "టౌన్ రైల్వే స్టేషన్ సర్క్యులేషన్ లూప్",
    direction: "Clockwise One-Way Entry via Station Feeder Road -> Egress via Rest House Link",
    capacity_gain_pct: 36.5,
    loop_coords: [
      [16.5455, 81.5160],
      [16.5435, 81.5170],
      [16.5416, 81.5155],
      [16.5420, 81.5205],
      [16.5452, 81.5195],
      [16.5455, 81.5160]
    ],
    emergency_access: "Direct unimpeded 24/7 ambulance lane to Govt Area Hospital"
  }
];

// Read existing file
let trafficFile = fs.readFileSync('assets/bhimavaram_traffic_data.js', 'utf8');

// 1. Replace hotspots
const hsJson = JSON.stringify(updatedHotspots, null, 2);
trafficFile = trafficFile.replace(/hotspots:\s*\[[\s\S]*?\n\s*\],\s*\n\s*\/\/\s*3\.\s*BASELINE ROAD NETWORK SEGMENTS/, `hotspots: ${hsJson},\n\n  // 3. BASELINE ROAD NETWORK SEGMENTS`);

// 2. Replace road_segments
const rsJson = JSON.stringify(updatedRoadSegments, null, 2);
trafficFile = trafficFile.replace(/road_segments:\s*\[[\s\S]*?\n\s*\],\s*\n\s*\/\/\s*4\.\s*ORIGIN-DESTINATION/, `road_segments: ${rsJson},\n\n  // 4. ORIGIN-DESTINATION`);

// 3. Replace od_analysis zones
const zJson = JSON.stringify(updatedZones, null, 6);
trafficFile = trafficFile.replace(/zones:\s*\[[\s\S]*?\n\s*\]\s*,\s*\n\s*trip_distribution:/, `zones: ${zJson},\n    trip_distribution:`);

// 4. Replace junctions_engineering
const jnJson = JSON.stringify(updatedWebsterJunctions, null, 2);
trafficFile = trafficFile.replace(/junctions_engineering:\s*\[[\s\S]*?\n\s*\],\s*\n\s*\/\/\s*6\.\s*THREE ALTERNATIVE TRAFFIC MANAGEMENT SCENARIOS/, `junctions_engineering: ${jnJson},\n\n  // 6. THREE ALTERNATIVE TRAFFIC MANAGEMENT SCENARIOS`);

// 5. Replace one_way_loops
const loopsJson = JSON.stringify(updatedOneWayLoops, null, 4);
trafficFile = trafficFile.replace(/one_way_loops:\s*\[[\s\S]*?\n\s*\]\s*\n\s*\}\s*,\s*\n\s*\/\/\s*8\.\s*PARKING & COMMERCIAL FREIGHT AUDIT/, `one_way_loops: ${loopsJson}\n  },\n\n  // 8. PARKING & COMMERCIAL FREIGHT AUDIT`);

const updatedMultimodalHubs = [
  { name: "Town Station Multimodal Mobility Hub", nameTe: "టౌన్ స్టేషన్ మల్టీమోడల్ మొబిలిటీ హబ్", interchange_type: "Rail-Bus-Auto-EV-Cycle", coords: [16.5455, 81.5160], daily_footfall: 24000 },
  { name: "Bhimavaram Junction Interchange Hub", nameTe: "భీమవరం జంక్షన్ ఇంటర్‌ఛేంజ్ హబ్", interchange_type: "Rail-Express Bus-Auto-Taxi", coords: [16.5423, 81.5368], daily_footfall: 19500 },
  { name: "APSRTC Bus Station Mobility Hub", nameTe: "ఆర్టీసీ బస్ స్టేషన్ మొబిలిటీ హబ్", interchange_type: "Regional Bus-City eBus-Auto", coords: [16.5415, 81.5285], daily_footfall: 31000 }
];

// 6. Replace proposed_electric_feeder_loops & multimodal_mobility_hubs
const ebusJson = JSON.stringify(updatedFeederLoops, null, 4);
const hubsJson = JSON.stringify(updatedMultimodalHubs, null, 4);
trafficFile = trafficFile.replace(/proposed_electric_feeder_loops:\s*\[[\s\S]*?\n\s*\]\s*,\s*\n\s*multimodal_mobility_hubs:\s*\[[\s\S]*?\n\s*\]/, `proposed_electric_feeder_loops: ${ebusJson},\n    multimodal_mobility_hubs: ${hubsJson}`);

fs.writeFileSync('assets/bhimavaram_traffic_data.js', trafficFile, 'utf8');
console.log('Successfully updated assets/bhimavaram_traffic_data.js with exact section headers!');
