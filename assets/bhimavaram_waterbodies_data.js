/**
 * Bhimavaram Urban Local Body (ULB) - Waterbodies & Temporal Changes Dataset
 * Prepared based on Andhra Pradesh Space Applications Centre (APSAC), ITE&C Dept, Govt of AP
 * Data Sources:
 * 1. Urban Local Body Boundary (DMA, Govt of AP)
 * 2. Tank / Lake / Reservoir / Canal digitized from Survey of India Topo-sheet & Cartosat+LISS-IV (2011)
 * 3. 2011 Changes digitized from Cartosat+LISS-IV (2.5m resolution)
 * 4. 2016 Changes digitized from Cartosat+LISS-IV (2.5m resolution)
 * 5. 2024 Changes & Status digitized from Sentinel-2 (10m resolution - April 2024)
 * Coordinate Reference System: WGS84 / UTM Zone 44N
 */

const BHIMAVARAM_WATERBODIES_SUMMARY = {
  titleTe: "భీమవరం పురపాలక సంఘం – చెరువులు, కాలువలు & కాలానుగుణ మార్పుల సమగ్ర సర్వే",
  titleEn: "Mapping of Urban Tanks / Rivers and Changes – Bhimavaram ULB",
  surveyAgency: "Andhra Pradesh Space Applications Centre (APSAC), ITE&C Dept, Govt. of A.P.",
  totalWaterbodiesCount: 15,
  tanksCount: 9,
  canalsCount: 6,
  totalSurveyedAreaAcres: 273.17,
  totalChange2011Acres: 1.42,
  totalRemainingAreaAcres: 271.76,
  retentionRatePercent: 99.48,
  satelliteSensors: [
    { year: 2011, sensor: "Survey of India Toposheet & Cartosat-1 + LISS-IV (2.5m)", note: "మొదటి దశ బేస్‌లైన్ డిజిటైజేషన్" },
    { year: 2016, sensor: "Cartosat-2 + LISS-IV Satellite Data (2.5m)", note: "మధ్యంతర విస్తీర్ణ మార్పుల పరిశీలన" },
    { year: 2024, sensor: "Sentinel-2 Multi-Spectral Satellite (10m, April 2024)", note: "తాజా ప్రస్తుత క్షేత్ర స్థాయి ఉపగ్రహ సమాచారం" }
  ]
};

const BHIMAVARAM_WATERBODIES_DATA = [
  // ===================== TANKS (T1 to T9) =====================
  {
    id: "T1",
    sno: 1,
    type: "tank",
    code: "Tank (1)",
    nameTe: "భీమవరం ఈశాన్య చెరువు (కుముదవల్లి సరిహద్దు)",
    nameEn: "Bhimavaram North-East Tank (Kumudavalli Border)",
    localName: "Bhimavaram",
    totalAreaAcres: 2.03,
    change2011Acres: 0.00,
    remainingAreaAcres: 2.03,
    statusTe: "సజీవంగా ఉన్న జలాశయం (Active Waterbody)",
    statusEn: "Active / Retained",
    statusColor: "#0284c7",
    lat: 16.55885,
    lon: 81.54848,
    wards: [1, 2],
    descriptionTe: "భీమవరం పట్టణ ఈశాన్య సరిహద్దులో కుముదవల్లి వైపు గల సహజసిద్ధమైన మంచినీటి చెరువు. వ్యవసాయ మరియు భూగర్భ జలాల పునరుద్ధరణకు కీలకం.",
    descriptionEn: "Freshwater tank located in the north-eastern periphery near Kumudavalli boundary. Maintained without encroachment.",
    polygon: [
      [16.5601, 81.5476],
      [16.5602, 81.5494],
      [16.5576, 81.5495],
      [16.5575, 81.5475]
    ]
  },
  {
    id: "T2",
    sno: 2,
    type: "tank",
    code: "Tank (2)",
    nameTe: "గునుపూడి నార్త్ చెరువు 1 (రైల్వే లైన్ సమీపం)",
    nameEn: "Gunupudi North Tank 1 (Near Railway Line)",
    localName: "Bhimavaram",
    totalAreaAcres: 3.21,
    change2011Acres: 0.00,
    remainingAreaAcres: 3.21,
    statusTe: "సజీవంగా ఉన్న జలాశయం (Active Waterbody)",
    statusEn: "Active / Retained",
    statusColor: "#0284c7",
    lat: 16.54447,
    lon: 81.54333,
    wards: [9, 10],
    descriptionTe: "భీమవరం జంక్షన్ నుండి గుడువాడ వైపు రైల్వే లైన్ సమీపంలో ఉన్న పెద్ద చెరువు. 3.21 ఎకరాల విస్తీర్ణంతో సురక్షితంగా ఉంది.",
    descriptionEn: "Large urban tank near the railway line in east Bhimavaram / Gunupudi north with 3.21 acres intact water spread.",
    polygon: [
      [16.5455, 81.5423],
      [16.5456, 81.5445],
      [16.5434, 81.5444],
      [16.5433, 81.5422]
    ]
  },
  {
    id: "T3",
    sno: 3,
    type: "tank",
    code: "Tank (3)",
    nameTe: "గునుపూడి నార్త్ చెరువు 2",
    nameEn: "Gunupudi North Tank 2",
    localName: "Bhimavaram",
    totalAreaAcres: 1.22,
    change2011Acres: 0.00,
    remainingAreaAcres: 1.22,
    statusTe: "సజీవంగా ఉన్న జలాశయం (Active Waterbody)",
    statusEn: "Active / Retained",
    statusColor: "#0284c7",
    lat: 16.54250,
    lon: 81.54162,
    wards: [10, 11],
    descriptionTe: "గునుపూడి ఉత్తర ప్రాంతంలో రైల్వే ట్రాక్ సమీపంలో గల జలాశయం. చుట్టుపక్కల ఆవాసాలకు భూగర్భ జలాల మూలం.",
    descriptionEn: "Perennial municipal water pond in northern Gunupudi adjacent to railway track.",
    polygon: [
      [16.5432, 81.5408],
      [16.5433, 81.5424],
      [16.5417, 81.5425],
      [16.5416, 81.5409]
    ]
  },
  {
    id: "T4",
    sno: 4,
    type: "tank",
    code: "Tank (4)",
    nameTe: "గునుపూడి తూర్పు ఆవాస చెరువు",
    nameEn: "Gunupudi East Settlement Tank",
    localName: "Bhimavaram",
    totalAreaAcres: 1.57,
    change2011Acres: 0.00,
    remainingAreaAcres: 1.57,
    statusTe: "సజీవంగా ఉన్న జలాశయం (Active Waterbody)",
    statusEn: "Active / Retained",
    statusColor: "#0284c7",
    lat: 16.54092,
    lon: 81.53879,
    wards: [11, 14],
    descriptionTe: "గునుపూడి ఆవాసాల మధ్య ఉన్న చెరువు. మున్సిపల్ పరిరక్షణలో ఉన్న జలవనరు.",
    descriptionEn: "Neighborhood settlement tank in Gunupudi zone with 1.57 acres preserved area.",
    polygon: [
      [16.5417, 81.5379],
      [16.5418, 81.5397],
      [16.5401, 81.5397],
      [16.5400, 81.5379]
    ]
  },
  {
    id: "T5",
    sno: 5,
    type: "tank",
    code: "Tank (5)",
    nameTe: "భీమవరం టౌన్ పెద్ద చెరువు (5.21 ఎకరాలు)",
    nameEn: "Bhimavaram Town Major Tank",
    localName: "Bhimavaram",
    totalAreaAcres: 5.21,
    change2011Acres: 0.00,
    remainingAreaAcres: 5.21,
    statusTe: "సజీవంగా ఉన్న ప్రధాన జలాశయం (Major Retained Lake)",
    statusEn: "Active Major Waterbody",
    statusColor: "#0284c7",
    lat: 16.54352,
    lon: 81.53616,
    wards: [15, 16],
    descriptionTe: "పట్టణంలోని 9 చెరువులలో కెల్లా అత్యంత పెద్దది (5.21 ఎకరాలు). శ్రీ సోమేశ్వర స్వామి దేవాలయ ప్రాంతానికి సమీపంలో ఉంది.",
    descriptionEn: "The largest freshwater tank among the 9 municipal tanks (5.21 acres), located in central-east Bhimavaram near Someswara temple precinct.",
    polygon: [
      [16.5452, 81.5348],
      [16.5453, 81.5376],
      [16.5418, 81.5375],
      [16.5417, 81.5347]
    ]
  },
  {
    id: "T6",
    sno: 6,
    type: "tank",
    code: "Tank (6)",
    nameTe: "భీమవరం మున్సిపల్ సెంట్రల్ చెరువు",
    nameEn: "Bhimavaram Municipal Central Tank",
    localName: "Bhimavaram",
    totalAreaAcres: 4.59,
    change2011Acres: 0.00,
    remainingAreaAcres: 4.59,
    statusTe: "సజీవంగా ఉన్న జలాశయం (Active Waterbody)",
    statusEn: "Active / Retained",
    statusColor: "#0284c7",
    lat: 16.54305,
    lon: 81.53000,
    wards: [19, 20],
    descriptionTe: "సెంట్రల్ భీమవరం ఆవాసాల నడిబొడ్డున ఉన్న 4.59 ఎకరాల రక్షిత చెరువు. పట్టణ వర్షపు నీటి నిల్వకు ప్రధాన ఆధారం.",
    descriptionEn: "4.59 acres prime urban storage pond in central municipal core, serving storm drainage and groundwater recharge.",
    polygon: [
      [16.5444, 81.5287],
      [16.5445, 81.5314],
      [16.5416, 81.5313],
      [16.5415, 81.5286]
    ]
  },
  {
    id: "T7",
    sno: 7,
    type: "tank_changed",
    code: "Tank (7)",
    nameTe: "భీమవరం రైల్వే జంక్షన్ సమీప చెరువు (2011లో కనుమరుగైనది / ఆక్రమణ)",
    nameEn: "Tank 7 - Encroached / Changed Urban Land (2011 Loss)",
    localName: "Bhimavaram",
    totalAreaAcres: 1.42,
    change2011Acres: 1.42,
    remainingAreaAcres: 0.00,
    statusTe: "⚠️ 2011లో పూర్తిగా కనుమరుగైంది (100% Changed / Built-up)",
    statusEn: "Lost / Encroached in 2011 Survey",
    statusColor: "#ec4899",
    lat: 16.54613,
    lon: 81.53040,
    wards: [20, 21],
    descriptionTe: "⚠️ అధికారిక APSAC సర్వేలో 2011 నాటికి ఈ 1.42 ఎకరాల చెరువు పూర్తిగా పట్టణ నిర్మాణాలు / ఆక్రమణల వల్ల కనుమరుగైనట్లు (0.00 ఎకరాలు మిగిలింది) నమోదు చేయబడింది. పటంలో పింక్ రంగుతో చూపబడింది.",
    descriptionEn: "CRITICAL FINDING: Recorded by APSAC satellite survey as 100% loss (1.42 acres converted to urban built-up area between 2001 and 2011). Highlighted in pink on official maps.",
    polygon: [
      [16.5471, 81.5294],
      [16.5472, 81.5314],
      [16.5451, 81.5313],
      [16.5450, 81.5293]
    ]
  },
  {
    id: "T8",
    sno: 8,
    type: "tank",
    code: "Tank (8)",
    nameTe: "ఎనమదురు కాలువ పశ్చిమ ఒడ్డు చెరువు",
    nameEn: "Enamaduru Canal West Bank Tank",
    localName: "Bhimavaram",
    totalAreaAcres: 1.52,
    change2011Acres: 0.00,
    remainingAreaAcres: 1.52,
    statusTe: "సజీవంగా ఉన్న జలాశయం (Active Waterbody)",
    statusEn: "Active / Retained",
    statusColor: "#0284c7",
    lat: 16.54289,
    lon: 81.52273,
    wards: [27, 28],
    descriptionTe: "ఎనమదురు కాలువ పశ్చిమ గట్టున భీమవరం రూరల్ సరిహద్దు సమీపంలో ఉన్న సహజ సిద్ధమైన చెరువు.",
    descriptionEn: "Water tank situated west of Yenamadurru drain near municipal office and commercial market sector.",
    polygon: [
      [16.5438, 81.5218],
      [16.5439, 81.5237],
      [16.5420, 81.5236],
      [16.5419, 81.5217]
    ]
  },
  {
    id: "T9",
    sno: 9,
    type: "tank",
    code: "Tank (9)",
    nameTe: "భీమవరం దక్షిణ గ్రామీణ సరిహద్దు చెరువు",
    nameEn: "Bhimavaram South Periphery Tank",
    localName: "Bhimavaram",
    totalAreaAcres: 2.07,
    change2011Acres: 0.00,
    remainingAreaAcres: 2.07,
    statusTe: "సజీవంగా ఉన్న జలాశయం (Active Waterbody)",
    statusEn: "Active / Retained",
    statusColor: "#0284c7",
    lat: 16.52654,
    lon: 81.52909,
    wards: [34, 35],
    descriptionTe: "దక్షిణ భీమవరంలో వ్యవసాయ పొలాలు మరియు నివాసాల మధ్య విస్తరించిన 2.07 ఎకరాల చెరువు.",
    descriptionEn: "South Bhimavaram rural-urban transition tank covering 2.07 acres intact water area.",
    polygon: [
      [16.5276, 81.5281],
      [16.5277, 81.5301],
      [16.5255, 81.5300],
      [16.5254, 81.5280]
    ]
  },

  // ===================== CANALS (C1 to C6) =====================
  {
    id: "C1",
    sno: 10,
    type: "canal",
    code: "Canal (1)",
    nameTe: "బాలసుముడి బ్రాంచ్ కాలువ (Balasumudi Branch)",
    nameEn: "Balasumudi Branch Canal",
    localName: "Balasumudi Branch",
    totalAreaAcres: 10.34,
    change2011Acres: 0.00,
    remainingAreaAcres: 10.34,
    statusTe: "ప్రవహిస్తున్న నీటిపారుదల కాలువ (Active Irrigation Canal)",
    statusEn: "Flowing / Maintained",
    statusColor: "#06b6d4",
    lat: 16.55403,
    lon: 81.50838,
    wards: [38, 39],
    descriptionTe: "వాయువ్య భీమవరంలో నరసింహపురం నుండి పట్టణంలోనికి ప్రవేశించే కీలకమైన బ్రాంచ్ కాలువ. 10.34 ఎకరాల విస్తీర్ణంతో వ్యవసాయ అవసరాలు తీరుస్తుంది.",
    descriptionEn: "10.34 acre tributary canal entering from north-west (Narasimhapuram) feeding northern wards.",
    polyline: [
      [16.5580, 81.5030], // Tipsy Topsy / Anakoderu along Undi Road (SH 165)
      [16.5540, 81.5075], // Following SH 165 highway corridor
      [16.5510, 81.5115], // Along SH 165 towards bypass junction
      [16.5495, 81.5145], // Bypass Road corridor north of Town Station
      [16.5485, 81.5185], // North of Town Station tracks corridor
      [16.5480, 81.5215], // Approaching railway underpass & canal
      [16.5475, 81.5230]  // Confluence at Yenamudurru canal near bridge
    ]
  },
  {
    id: "C2",
    sno: 11,
    type: "canal",
    code: "Canal (2)",
    nameTe: "కరకోడు ఫీల్డ్ ఛానల్ (దక్షిణ సరిహద్దు నాలా)",
    nameEn: "Karakodu Field Channel (South Agrarian Boundary Nala)",
    localName: "Karakodu Channel",
    totalAreaAcres: 3.07,
    change2011Acres: 0.00,
    remainingAreaAcres: 3.07,
    statusTe: "సహజ ప్రవాహం (Active Canal)",
    statusEn: "Flowing / Maintained",
    statusColor: "#06b6d4",
    lat: 16.5185,
    lon: 81.5110,
    wards: [31, 32, 48],
    descriptionTe: "కొమరద మరియు రాయలం దక్షిణ సరిహద్దు వెంట నైరుతి నుండి తూర్పున ఎనమదురు కాలువ వైపు ప్రవహించే దక్షిణ సరిహద్దు నాలా.",
    descriptionEn: "South-western agrarian boundary nala running along Komarada and Rayalam agrarian boundaries into Yenamadurru drain.",
    polyline: [
      [16.5200, 81.4980], // Komarada / Rayalam southern agrarian field boundary
      [16.5195, 81.5040], // Along east-west agricultural drain bund
      [16.5188, 81.5100], // Field bund drainage channel
      [16.5182, 81.5160], // Southern drainage culvert line
      [16.5175, 81.5200], // Komarada agrarian sluice outfall
      [16.5170, 81.5232]  // Confluence into Yenamudurru drain
    ]
  },
  {
    id: "C3",
    sno: 12,
    type: "canal",
    code: "Canal (3)",
    nameTe: "చినమిరం రోడ్డు కూడలి & బైపాస్ లింక్ కాలువ (పశ్చిమ విభాగం)",
    nameEn: "Chinamiram Road & Bypass Canal (West Feeder)",
    localName: "Chinamiram Bypass Canal",
    totalAreaAcres: 24.42,
    change2011Acres: 0.00,
    remainingAreaAcres: 24.42,
    statusTe: "ప్రధాన నీటిపారుదల కాలువ (Major Feeder Canal)",
    statusEn: "Flowing / Maintained",
    statusColor: "#06b6d4",
    lat: 16.5372,
    lon: 81.5080,
    wards: [29, 30, 33],
    descriptionTe: "చినమిరం రోడ్డు కూడలి నుండి బైపాస్ వెంబడి SRKR కళాశాల మరియు ASR నగర్ దక్షిణ సరిహద్దుగా డి.ఎన్.ఆర్. కళాశాల మీదుగా ఎనమదురు కాలువలో కలిసే ప్రధాన కాలువ.",
    descriptionEn: "24.42-acre feeder canal flowing along Chinamiram bypass road south of SRKR college and ASR Nagar across DNR college sector into Yenamadurru drain.",
    polyline: [
      [16.5405, 81.4953], // Chinamiram Road Junction (Marker 11)
      [16.5398, 81.4980], // South edge of SRKR campus along boundary road
      [16.5385, 81.5030], // South of SRKR & Chinamiram bypass road
      [16.5375, 81.5075], // Southern boundary road of ASR Nagar
      [16.5365, 81.5110], // Rayalam North canal road corridor
      [16.5350, 81.5150], // North of DNR College / Sompeta
      [16.5342, 81.5190], // Sompeta / Balusumudi south canal link
      [16.5340, 81.5228]  // Confluence at Yenamudurru drain
    ]
  },
  {
    id: "C4",
    sno: 13,
    type: "canal_main",
    code: "Canal (4)",
    nameTe: "యలమదుర్రు డ్రెయిన్ / ఎనమదురు కాలువ (ప్రధాన నదీ ప్రవాహం)",
    nameEn: "Yenamadurru Drain (Enamaduru Major Canal)",
    localName: "Yenamadurru Drain",
    totalAreaAcres: 144.80,
    change2011Acres: 0.00,
    remainingAreaAcres: 144.80,
    statusTe: "భీమవరం జీవనాడుల ప్రధాన ప్రవాహం (Lifeline Drainage & River Channel)",
    statusEn: "Major Lifeline Waterway",
    statusColor: "#2563eb",
    lat: 16.54937,
    lon: 81.52313,
    wards: [4, 5, 17, 18, 22, 23, 27, 28, 35, 36],
    descriptionTe: "భీమవరం నగరాన్ని నిలువునా రెండుగా విభజిస్తూ ఉత్తరాన గొల్లలకోడేరు నుండి దక్షిణాన యలమదుర్రు వరకు ప్రవహించే అత్యంత పెద్ద జలప్రవాహం (144.80 ఎకరాలు). గోదావరి డెల్టా వరద నీటిని సముద్రానికి చేర్చే ప్రధాన కాలువ.",
    descriptionEn: "The 144.80-acre central spine of Bhimavaram water system, originating from Gollalakoderu north, bisecting the city core, and exiting south at Yenamadurru.",
    polyline: [
      [16.5775, 81.5242],
      [16.5695, 81.5222],
      [16.5608, 81.5204],
      [16.5518, 81.5228],
      [16.5462, 81.5205],
      [16.5412, 81.5195],
      [16.5348, 81.5218],
      [16.5242, 81.5238],
      [16.5120, 81.5229],
      [16.5015, 81.5214]
    ]
  },
  {
    id: "C5",
    sno: 14,
    type: "canal",
    code: "Canal (5)",
    nameTe: "గోస్తనది & వేల్పురు కాలువ (తూర్పు కాలువ)",
    nameEn: "Gostanadi & Velpuru Canal",
    localName: "Gostanadi & Velpuru Canal",
    totalAreaAcres: 48.45,
    change2011Acres: 0.00,
    remainingAreaAcres: 48.45,
    statusTe: "కీలకమైన తూర్పు జలరవాణా & డెల్టా కాలువ (Major Eastern Delta Canal)",
    statusEn: "Major Eastern Canal",
    statusColor: "#06b6d4",
    lat: 16.54281,
    lon: 81.54707,
    wards: [6, 7, 8, 12, 13],
    descriptionTe: "భీమవరం తూర్పు సరిహద్దు వెంట విస్సాకోడేరు మరియు తాడేరు వైపు ప్రవహించే 48.45 ఎకరాల ప్రసిద్ధ గోస్తనది & వేల్పురు కాలువ. వ్యవసాయానికి మరియు పడవ రవాణాకు చారిత్రక ప్రాధాన్యం కలది.",
    descriptionEn: "48.45 acres major eastern canal network flowing along Vissakoderu boundary, connecting Gostanadi river basin with Velpuru irrigation channels.",
    polyline: [
      [16.5615, 81.5478],
      [16.5528, 81.5470],
      [16.5448, 81.5462],
      [16.5375, 81.5492],
      [16.5310, 81.5542]
    ]
  },
  {
    id: "C6",
    sno: 15,
    type: "canal",
    code: "Canal (6)",
    nameTe: "గునుపూడి నార్త్ కాలువ (ఆగ్నేయ ప్రవాహం)",
    nameEn: "Gunpudi North Canal",
    localName: "Gunpudi North",
    totalAreaAcres: 19.26,
    change2011Acres: 0.00,
    remainingAreaAcres: 19.26,
    statusTe: "నీటిపారుదల కాలువ (Active Canal)",
    statusEn: "Flowing / Maintained",
    statusColor: "#06b6d4",
    lat: 16.52449,
    lon: 81.53909,
    wards: [13, 14, 25],
    descriptionTe: "గునుపూడి దక్షిణ ప్రాంతం నుండి తాడేరు వైపు ప్రవహించే 19.26 ఎకరాల నీటిపారుదల కాలువ.",
    descriptionEn: "19.26 acre irrigation channel traversing southern Gunupudi toward Taderu agricultural tracts.",
    polyline: [
      [16.5345, 81.5362],
      [16.5290, 81.5378],
      [16.5235, 81.5396],
      [16.5168, 81.5438]
    ]
  }
];

// Calibration bounds for APSAC Waterbodies Map Overlay on Leaflet
const APSAC_MAP_BOUNDS = [
  [16.50028, 81.48333], // Southwest [lat, lon]
  [16.58120, 81.56091]  // Northeast [lat, lon]
];

// Universal browser & module export
if (typeof window !== 'undefined') {
  window.BHIMAVARAM_WATERBODIES_SUMMARY = BHIMAVARAM_WATERBODIES_SUMMARY;
  window.BHIMAVARAM_WATERBODIES_DATA = BHIMAVARAM_WATERBODIES_DATA;
  window.APSAC_MAP_BOUNDS = APSAC_MAP_BOUNDS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BHIMAVARAM_WATERBODIES_SUMMARY,
    BHIMAVARAM_WATERBODIES_DATA,
    APSAC_MAP_BOUNDS
  };
}
