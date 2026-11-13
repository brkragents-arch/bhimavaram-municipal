/**
 * Bhimavaram Smart Traffic & Sustainable Urban Mobility Planning System
 * Comprehensive Urban Transportation Engineering, Traffic Analysis, Simulation & Planning Dataset
 * 
 * Study Area: Bhimavaram Municipality, West Godavari District, Andhra Pradesh, India
 * Geographic Coordinates: 16.5449° N, 81.5212° E
 * Administrative Coverage: 52 Officially Notified Wards / 39 Core Master Wards
 * Standard Codebase: IRC:106-1990 (Urban Roads Capacity), IRC:SP:41 (Traffic Signals Webster Method)
 */

const BHIMAVARAM_TRAFFIC_DATA = {
  metadata: {
    city: "Bhimavaram",
    district: "West Godavari",
    state: "Andhra Pradesh",
    country: "India",
    center: [16.5449, 81.5212],
    bounding_box: {
      north: 16.5750,
      south: 16.5150,
      east: 81.5600,
      west: 81.4900
    },
    study_area_sq_km: 26.14,
    population_municipal: 168940,
    population_urban_agglomeration: 242000,
    total_registered_vehicles: 118450,
    daily_trips_estimated: 342000,
    modal_split: {
      two_wheeler: 54.2,
      auto_rickshaw: 20.8,
      car_taxi: 11.5,
      cycle_pedestrian: 6.8,
      bus_public_transit: 4.2,
      commercial_freight: 2.5
    },
    peak_hours: {
      morning_peak: "08:30 - 10:30 AM",
      school_start: "08:00 - 09:00 AM",
      afternoon_interpeak: "13:00 - 15:00 PM",
      school_end: "15:30 - 17:00 PM",
      evening_peak: "17:30 - 20:30 PM",
      market_surge: "16:00 - 21:00 PM (Wednesdays & Sundays)"
    }
  },

  // 1. VEHICLE CLASSIFICATION & PCU FACTORS (IRC:106-1990 Urban Roads)
  vehicle_classification: [
    { id: "2w", name: "Two-Wheeler (Motorcycles/Scooters)", nameTe: "ద్విచక్ర వాహనాలు", pcu: 0.5, share_pct: 54.2, speed_free_kmh: 40, fuel_consumption_kmpl: 45.0, co2_g_km: 42.5 },
    { id: "3w", name: "Auto-Rickshaws & 3-Wheelers", nameTe: "ఆటో రిక్షాలు & 3-వీలర్స్", pcu: 1.0, share_pct: 20.8, speed_free_kmh: 30, fuel_consumption_kmpl: 22.0, co2_g_km: 88.0 },
    { id: "car", name: "Cars, Taxis & Jeeps", nameTe: "కార్లు & టాక్సీలు", pcu: 1.0, share_pct: 11.5, speed_free_kmh: 45, fuel_consumption_kmpl: 14.5, co2_g_km: 145.0 },
    { id: "lcv", name: "Light Commercial Vehicles (Puv/Mini-trucks)", nameTe: "తేలికపాటి సరుకు రవాణా", pcu: 1.5, share_pct: 3.2, speed_free_kmh: 35, fuel_consumption_kmpl: 10.5, co2_g_km: 210.0 },
    { id: "bus", name: "APSRTC & Private City Buses", nameTe: "ఆర్టీసీ & ప్రైవేట్ బస్సులు", pcu: 3.0, share_pct: 2.1, speed_free_kmh: 30, fuel_consumption_kmpl: 4.2, co2_g_km: 680.0 },
    { id: "hgv", name: "Heavy Goods Vehicles (Aqua/Paddy Lorries)", nameTe: "భారీ సరుకు రవాణా లారీలు", pcu: 3.0, share_pct: 2.4, speed_free_kmh: 28, fuel_consumption_kmpl: 3.5, co2_g_km: 820.0 },
    { id: "agri", name: "Tractors & Agricultural Trailers", nameTe: "ట్రాక్టర్లు & వ్యవసాయ వాహనాలు", pcu: 1.5, share_pct: 1.2, speed_free_kmh: 22, fuel_consumption_kmpl: 6.0, co2_g_km: 340.0 },
    { id: "cycle", name: "Bicycles & Non-Motorised", nameTe: "సైకిళ్లు (నాన్-మోటరైజ్డ్)", pcu: 0.5, share_pct: 3.6, speed_free_kmh: 14, fuel_consumption_kmpl: 0, co2_g_km: 0 },
    { id: "ped", name: "Pedestrians", nameTe: "పాదచారులు", pcu: 0.0, share_pct: 1.0, speed_free_kmh: 4.5, fuel_consumption_kmpl: 0, co2_g_km: 0 }
  ],

  // 2. TOP 20 TRAFFIC CONGESTION HOTSPOTS
  hotspots: [
  {
    "id": "HS-01",
    "rank": 1,
    "name": "Prakasham Chowk & Town Railway Underpass (RuB) Junction",
    "nameTe": "ప్రకాశం చౌక్ & రైల్వే అండర్‌పాస్ (RuB) కూడలి",
    "ward": 20,
    "ward_name": "B.T. Center & Railway West",
    "coords": [
      16.5448,
      81.5235
    ],
    "road": "P.P. Road & Station Road Approach (RuB Underpass Corridor)",
    "junction_type": "5-Arm Grade-Separated Railway Underpass Approach Throats",
    "peak_pcu_hr": 3840,
    "two_wheelers_pct": 54.2,
    "autos_pct": 22.8,
    "cars_pct": 12.5,
    "heavy_vehicles_pct": 4.2,
    "pedestrians_hr": 2850,
    "avg_speed_kmh": 8.2,
    "queue_length_m": 460,
    "avg_delay_sec": 195,
    "los": "F",
    "severity": "Critical",
    "major_causes": [
      "5 వేర్వేరు ప్రధాన రోడ్ల ట్రాఫిక్ ఒకే అండర్‌పాస్ (RuB) అప్రోచ్ వద్ద కలుసుకోవడం",
      "అండర్‌పాస్ ప్రవేశం వద్ద అనధికార ఆటో-రిక్షా నిలపడం మరియు ఇరుకైన గ్రేడియంట్ బాటిల్‌నెక్",
      "పీక్ అవర్స్‌లో పాదచారులకు ప్రత్యేక ఫుట్‌పాత్ లేకపోవడం వల్ల వాహనాల వేగం మందగించడం",
      "వర్షాకాలంలో అండర్‌పాస్ సంపులో నీరు నిలిచినప్పుడు ట్రాఫిక్ నెమ్మదించడం"
    ],
    "proposed_interventions": [
      "అండర్‌పాస్ రెండు వైపులా 50 మీటర్ల పరిధిని స్ట్రిక్ట్ నో-హాకింగ్ & నో-పార్కింగ్ జోన్‌గా అమలు చేయడం",
      "ఆటోల కొరకు అండర్‌పాస్ వెలుపల 30 మీటర్ల దూరంలో ప్రత్యేక 'డ్రాప్-ఆఫ్ బే' ఏర్పాటు",
      "గ్రేడ్-సెపరేటెడ్ ప్రవాహం కొరకు వెబ్‌స్టర్ పద్ధతిలో సెమీ-యాక్చుయేటెడ్ సిగ్నల్ కోఆర్డినేషన్",
      "భారీ వర్షాల సమయంలో ఆటోమేటిక్ సెన్సార్లతో కూడిన హై-కెపాసిటీ డీవాటరింగ్ పంపుల నిర్వహణ"
    ]
  },
  {
    "id": "HS-02",
    "rank": 2,
    "name": "Old Bus Stand & Gandhi Statue Center",
    "nameTe": "పాత బస్టాండ్ & గాంధీ విగ్రహం కూడలి",
    "ward": 20,
    "ward_name": "B.T. Center & Railway West",
    "coords": [
      16.5432,
      81.5242
    ],
    "road": "P.P. Road & B.N. Road Main Commercial Spine",
    "junction_type": "4-Arm Unsignalized Rotary Intersection",
    "peak_pcu_hr": 3420,
    "two_wheelers_pct": 58,
    "autos_pct": 20.5,
    "cars_pct": 11.2,
    "heavy_vehicles_pct": 3.1,
    "pedestrians_hr": 3400,
    "avg_speed_kmh": 9.5,
    "queue_length_m": 390,
    "avg_delay_sec": 172,
    "los": "F",
    "severity": "Critical",
    "major_causes": [
      "రోటరీ చుట్టూ అనియంత్రిత కమర్షియల్ పార్కింగ్ మరియు రోడ్డుపై దుకాణాల ఆక్రమణలు",
      "పీ.పీ. రోడ్ నుండి మెయిన్ బజార్‌లోకి ప్రవేశించే పాదచారుల రద్దీకి జీబ్రా క్రాసింగ్ లేకపోవడం",
      "ఆటోలు రౌండ్‌ఎబౌట్ సర్కిల్ వద్ద ఆగి ప్రయాణికులను ఎక్కించుకోవడం వల్ల ఏర్పడే క్యూలు"
    ],
    "proposed_interventions": [
      "గాంధీ విగ్రహ రోటరీ వ్యాసార్థాన్ని కుదించి ఛానలైజేషన్ ట్రాఫిక్ ఐలాండ్స్ నిర్మించడం",
      "ఆటోల కోసం 50 మీటర్ల అవతల ప్రత్యేక బే కేటాయించి, సర్కిల్ చుట్టూ పెలికాన్ సిగ్నల్ ఏర్పాటు",
      "వన్-వే లూప్ (దృశ్యం A) ద్వారా మెయిన్ బజార్ ట్రాఫిక్‌ను క్రమబద్ధీకరించడం"
    ]
  },
  {
    "id": "HS-03",
    "rank": 3,
    "name": "Sri Someswara Swamy Temple & Somaramam Pancharama Center (Gunupudi)",
    "nameTe": "శ్రీ సోమేశ్వర స్వామి వారి ఆలయం & సోమారామం కూడలి (గునుపూడి)",
    "ward": 16,
    "ward_name": "Sri Someswara Swamy Temple (Somaramam)",
    "coords": [
      16.5412,
      81.5312
    ],
    "road": "Someswara Temple Street & Main Bazaar Corridor",
    "junction_type": "T-Junction with Heritage Narrow Throat",
    "peak_pcu_hr": 2980,
    "two_wheelers_pct": 64,
    "autos_pct": 18.5,
    "cars_pct": 10.5,
    "heavy_vehicles_pct": 1,
    "pedestrians_hr": 4100,
    "avg_speed_kmh": 7.4,
    "queue_length_m": 320,
    "avg_delay_sec": 164,
    "los": "F",
    "severity": "Critical",
    "major_causes": [
      "చంద్ర పుష్కరిణి రోడ్డులో క్యారేజ్‌వే వెడల్పు కేవలం 5.5 మీటర్లు మాత్రమే ఉండడం",
      "సోమవారాలు, మాసశివరాత్రి మరియు ఉత్సవాల రోజుల్లో భక్తుల వాహనాల అడ్డగోలు పార్కింగ్",
      "షాపింగ్ వీధిలో పండ్లు, పూల దుకాణాలు కాలిబాటలను పూర్తిగా ఆక్రమించడం"
    ],
    "proposed_interventions": [
      "ఉత్సవ దినాల్లో ఆలయ వీధిని 'పాదచారుల ప్రాధాన్యతా జోన్ (Pedestrian-Only Zone)'గా ప్రకటించడం",
      "ఆలయానికి 200 మీటర్ల దూరంలో మున్సిపల్ యాత్రికుల పార్కింగ్ స్థలాన్ని (PK-07) అభివృద్ధి చేయడం",
      "గునుపూడి ఆర్టీసీ బస్సులను బైపాస్ ద్వారా మళ్లించి, ఆలయం వద్ద బ్యాటరీ ఫీడర్లను మాత్రమే అనుమతించడం"
    ]
  },
  {
    "id": "HS-04",
    "rank": 4,
    "name": "APSRTC Central Bus Station Complex Junction",
    "nameTe": "ఆర్టీసీ బస్ స్టేషన్ కాంప్లెక్స్ కూడలి",
    "ward": 24,
    "ward_name": "S.P. Road East & RTC Complex",
    "coords": [
      16.5415,
      81.5285
    ],
    "road": "Rest House Road & RTC Depot Approach",
    "junction_type": "3-Arm Major Transit Terminal Intersect",
    "peak_pcu_hr": 3180,
    "two_wheelers_pct": 42.5,
    "autos_pct": 26.5,
    "cars_pct": 14,
    "heavy_vehicles_pct": 14.5,
    "pedestrians_hr": 2900,
    "avg_speed_kmh": 11.2,
    "queue_length_m": 290,
    "avg_delay_sec": 148,
    "los": "E",
    "severity": "Critical",
    "major_causes": [
      "ఆర్టీసీ బస్సులు డిపో నుండి బయటకు వచ్చే సమయంలో రెస్ట్ హౌస్ రోడ్డులో ట్రాఫిక్ స్తంభించడం",
      "బస్టాండ్ గేటు ముందే ప్రైవేట్ ట్రావెల్స్, ఆటోలు గుమిగూడడం",
      "రైల్వే స్టేషన్ - బస్టాండ్ మధ్య ప్రయాణించే పాదచారులకు రక్షిత క్రాసింగ్ లేకపోవడం"
    ],
    "proposed_interventions": [
      "బస్టాండ్ ఎగ్జిట్ వద్ద వెబ్‌స్టర్ సిగ్నల్ (గ్రీన్ స్ప్లిట్ 25 సెకన్లు) అమర్చి బస్సులకు ప్రాధాన్యత కల్పించడం",
      "గేటు వెలుపల ఉన్న ఆటోలను బస్టాండ్ ప్రాంగణంలో నిర్దేశించిన ఆటో బే (AS-02) లోకి తరలించడం",
      "బస్టాండ్ కాంప్లెక్స్ ఎదురుగా స్మార్ట్ ట్రాఫిక్ సెన్సార్లతో కూడిన పెడెస్ట్రియన్ రెఫ్యూజ్ ఐలాండ్ నిర్మించడం"
    ]
  },
  {
    "id": "HS-05",
    "rank": 5,
    "name": "DNR College Main Road Junction",
    "nameTe": "డి.ఎన్.ఆర్. కళాశాల ప్రధాన రోడ్డు కూడలి",
    "ward": 29,
    "ward_name": "D.N.R. College & Balusumudi South",
    "coords": [
      16.532,
      81.516
    ],
    "road": "DNR College Main Road & Sompeta Corridor",
    "junction_type": "4-Arm Institutional Crossroads",
    "peak_pcu_hr": 3350,
    "two_wheelers_pct": 66.5,
    "autos_pct": 18.2,
    "cars_pct": 8.5,
    "heavy_vehicles_pct": 2.5,
    "pedestrians_hr": 3800,
    "avg_speed_kmh": 10.4,
    "queue_length_m": 310,
    "avg_delay_sec": 142,
    "los": "E",
    "severity": "Critical",
    "major_causes": [
      "కాలేజీ తెరిచే (8:45-9:30 AM) మరియు ముగిసే (4:15-5:15 PM) వేళల్లో విద్యార్థుల బైకుల రద్దీ",
      "కాలేజీ ఎదురుగా రోడ్డు ఇరువైపులా నిలిపే ద్విచక్ర వాహనాల వల్ల క్యారేజ్‌వే 40% తగ్గిపోవడం",
      "రాయలం గ్రామం నుండి వచ్చే వ్యవసాయ ట్రాక్టర్లు విద్యార్థుల ట్రాఫిక్‌తో ఢీకొనడం"
    ],
    "proposed_interventions": [
      "కాలేజీ ప్రాంగణంలో 350 ECS సామర్థ్యం గల ప్రత్యేక స్టూడెంట్ & స్టాఫ్ పార్కింగ్ బే (PK-08) నిర్మాణం",
      "పీక్ అవర్స్‌లో స్కూల్/కాలేజీ బస్సుల కోసం ప్రత్యేక డ్రాప్-అండ్-గో బేలు ఏర్పాటు చేయడం",
      "కాలేజీ గేటు వద్ద వెబ్‌స్టర్ టైమింగ్స్ కలిగిన స్కూల్-జోన్ వేగ పరిమితి (25 km/h) డిజిటల్ బోర్డులు"
    ]
  },
  {
    "id": "HS-06",
    "rank": 6,
    "name": "Rest House Road & Mavullamma Temple Center",
    "nameTe": "రెస్ట్ హౌస్ రోడ్ & శ్రీ మావుళ్ళమ్మ అమ్మవారి గుడి కూడలి",
    "ward": 27,
    "ward_name": "S.P. Road Strip & R.H. Road East",
    "coords": [
      16.5366,
      81.5225
    ],
    "road": "Rest House Road (R.H. Road)",
    "junction_type": "4-Arm Commercial Crossroad",
    "peak_pcu_hr": 3120,
    "two_wheelers_pct": 59.4,
    "autos_pct": 21,
    "cars_pct": 12.8,
    "heavy_vehicles_pct": 2.2,
    "pedestrians_hr": 3200,
    "avg_speed_kmh": 11.5,
    "queue_length_m": 260,
    "avg_delay_sec": 135,
    "los": "E",
    "severity": "Severe",
    "major_causes": [
      "ఆలయ దర్శనార్థుల కార్లు మరియు ద్విచక్ర వాహనాలు రెస్ట్ హౌస్ రోడ్డు పైనే నిలపడం",
      "వస్త్ర దుకాణాలు మరియు హోటళ్ల ముందు క్యారేజ్‌వేను ఆక్రమించి బోర్డులు పెట్టడం",
      "ఆర్టీసీ బస్సులు తిరిగే సమయంలో ఇరుకైన టర్నింగ్ రేడియస్ వల్ల ట్రాఫిక్ నిలిచిపోవడం"
    ],
    "proposed_interventions": [
      "మావుళ్ళమ్మ దేవస్థానం వద్ద 180 ECS సామర్థ్యం గల భక్తుల పార్కింగ్ ప్లాట్ (PK-13) కేటాయింపు",
      "రెస్ట్ హౌస్ రోడ్డులో అక్రమ పార్కింగ్‌పై వీల్ క్లాంపింగ్ మరియు స్మార్ట్ కెమెరా ఈ-చలానాలు",
      "కూడలి వద్ద మూలలను 7.5 మీటర్ల రేడియస్‌కు విస్తరించి సులభతర బస్సు మలుపులు కల్పించడం"
    ]
  },
  {
    "id": "HS-07",
    "rank": 7,
    "name": "Undi Road / Nidadavole Road Railway Crossing Junction",
    "nameTe": "ఉండి రోడ్ / నిడదవోలు రోడ్ రైల్వే క్రాసింగ్ కూడలి",
    "ward": 3,
    "ward_name": "Railway Fork & Nidadavole Road",
    "coords": [
      16.5482,
      81.5305
    ],
    "road": "Undi Road & Nidadavole Railway Link",
    "junction_type": "3-Arm Rail Fork Intersection",
    "peak_pcu_hr": 2850,
    "two_wheelers_pct": 48,
    "autos_pct": 20,
    "cars_pct": 16.5,
    "heavy_vehicles_pct": 12,
    "pedestrians_hr": 1650,
    "avg_speed_kmh": 12,
    "queue_length_m": 340,
    "avg_delay_sec": 155,
    "los": "E",
    "severity": "Severe",
    "major_causes": [
      "రైల్వే షంటింగ్ మరియు గూడ్స్ రైళ్ల కదలికల సమయంలో అప్రోచ్ రోడ్లలో ట్రాఫిక్ స్తంభించడం",
      "పశ్చిమ గోదావరి గ్రామీణ సరుకు రవాణా లారీల రద్దీ మరియు అస్తవ్యస్త ఓవర్‌టేకింగ్",
      "రహదారి ఉపరితలం గుంతలు పడడం వల్ల వాహనాల వేగం పడిపోవడం"
    ],
    "proposed_interventions": [
      "ఈ క్రాసింగ్ వద్ద ట్రాఫిక్ ఒత్తిడి తగ్గించడానికి ప్రతిపాదిత ఆర్‌ఓబీ (ROB) సాధ్యాసాధ్యాల సర్వే",
      "అప్రోచ్ రహదారిని 4-లేన్లుగా వెడల్పు చేసి రబ్బరైజ్డ్ స్పీడ్ కామింగ్ చర్యలు చేపట్టడం",
      "పీక్ అవర్లలో భారీ సరుకు లారీలను ఔటర్ బైపాస్ (NH-165) మీదుగా మళ్లించడం"
    ]
  },
  {
    "id": "HS-08",
    "rank": 8,
    "name": "Juvvalapalem Road (J.P. Road) Commercial Corridor Junction",
    "nameTe": "జువ్వలపాలెం రోడ్ (జేపీ రోడ్) వాణిజ్య కారిడార్ కూడలి",
    "ward": 34,
    "ward_name": "Juvvalapalem Road (J.P. Road)",
    "coords": [
      16.5395,
      81.5065
    ],
    "road": "Juvvalapalem Road (J.P. Road)",
    "junction_type": "4-Arm Major Arterial Gateway",
    "peak_pcu_hr": 2950,
    "two_wheelers_pct": 55,
    "autos_pct": 21.5,
    "cars_pct": 14.5,
    "heavy_vehicles_pct": 5.5,
    "pedestrians_hr": 2200,
    "avg_speed_kmh": 13.5,
    "queue_length_m": 250,
    "avg_delay_sec": 125,
    "los": "E",
    "severity": "Severe",
    "major_causes": [
      "రొయ్యల ఫీడ్, ఆక్వాకల్చర్ సప్లై గోదాముల లోడింగ్/అన్‌లోడింగ్ రోడ్డుపై జరగడం",
      "నిర్దేశిత మీడియన్ లేకపోవడం వల్ల ఇష్టారాజ్యంగా యూ-టర్న్‌లు చేయడం",
      "జువ్వలపాలెం గ్రామాల నుండి నగరంలోకి వచ్చే నిరంతర ఆటోల ప్రవాహం"
    ],
    "proposed_interventions": [
      "వాణిజ్య లోడింగ్/అన్‌లోడింగ్‌ను రాత్రి 9:00 PM నుండి ఉదయం 7:00 AM వరకే పరిమితం చేయడం",
      "రోడ్డు మధ్యలో కాంక్రీట్ మీడియన్ మరియు యూ-టర్న్ నిర్దేశిత బేలు నిర్మించడం",
      "సరుకు రవాణా వాహనాల కోసం రోడ్డు పక్కన ప్రత్యేక పార్కింగ్ బేల అభివృద్ధి"
    ]
  },
  {
    "id": "HS-09",
    "rank": 9,
    "name": "Gunupudi Wholesale Vegetable & Fish Market Center",
    "nameTe": "గునుపూడి హోల్‌సేల్ కూరగాయలు & చేపల మార్కెట్ కూడలి",
    "ward": 18,
    "ward_name": "Railway South & BT Market East",
    "coords": [
      16.5433,
      81.532
    ],
    "road": "Gandhi Road East / B.T. Market Street",
    "junction_type": "Market Access Narrow Throat Intersect",
    "peak_pcu_hr": 2750,
    "two_wheelers_pct": 61.2,
    "autos_pct": 22.4,
    "cars_pct": 6.8,
    "heavy_vehicles_pct": 6.5,
    "pedestrians_hr": 3900,
    "avg_speed_kmh": 6.8,
    "queue_length_m": 280,
    "avg_delay_sec": 168,
    "los": "F",
    "severity": "Critical",
    "major_causes": [
      "ఉదయం 5:00 నుండి 9:30 AM వరకు హోల్‌సేల్ వ్యాపారుల బొలేరో పికప్‌లు రోడ్డును బ్లాక్ చేయడం",
      "చేపల మార్కెట్ మురుగునీరు రోడ్డుపై ప్రవహించి జారే పరిస్థితి ఏర్పడడం",
      "పాదచారులు, తోపుడు బండ్లు, కొనుగోలుదారుల బైకులు రోడ్డుపైనే ఉండడం"
    ],
    "proposed_interventions": [
      "హోల్‌సేల్ లోడింగ్ కార్యకలాపాలను మార్కెట్ యార్డ్ గ్రౌండ్ (PK-09) లోపలికి తరలించడం",
      "మార్కెట్ అప్రోచ్ రోడ్డులో ఉదయం 6:00 నుండి 10:00 AM వరకు హెవీ వాహనాల ప్రవేశ నిషేధం",
      "డ్రైనేజీ పునర్నిర్మాణం మరియు పాదచారులకు రక్షిత కర్బ్ వే బిల్డింగ్"
    ]
  },
  {
    "id": "HS-10",
    "rank": 10,
    "name": "SRKR Engineering College / Chinna Amiram Road Junction",
    "nameTe": "ఎస్.ఆర్.కె.ఆర్ ఇంజనీరింగ్ కాలేజ్ / చైనామిరం రోడ్డు కూడలి",
    "ward": 35,
    "ward_name": "S.N. Puram & China Amiram Border",
    "coords": [
      16.546,
      81.499
    ],
    "road": "SRKR Engineering College Campus Link Road",
    "junction_type": "3-Arm Major Campus Feeder Gate",
    "peak_pcu_hr": 2680,
    "two_wheelers_pct": 68.5,
    "autos_pct": 17.5,
    "cars_pct": 9.2,
    "heavy_vehicles_pct": 2.8,
    "pedestrians_hr": 3100,
    "avg_speed_kmh": 14,
    "queue_length_m": 230,
    "avg_delay_sec": 110,
    "los": "D",
    "severity": "Moderate",
    "major_causes": [
      "వేలాది మంది ఇంజనీరింగ్ విద్యార్థులు ఒకేసారి బైకులు మరియు ప్రైవేట్ బస్సుల్లో రావడం",
      "కాలేజ్ బస్సులు రోడ్డుపై మలుపు తిరిగే సమయంలో ఇరువైపులా ట్రాఫిక్ ఆగిపోవడం",
      "రాత్రి వేళల్లో తగినంత స్ట్రీట్ లైటింగ్ లేకపోవడం మరియు పాదచారుల క్రాసింగ్ సమస్యలు"
    ],
    "proposed_interventions": [
      "కాలేజీ లోపల బస్సు టెర్మినల్ బేలు కేటాయించి రోడ్డుపై మలుపు తిరగడాన్ని నిషేధించడం",
      "కాలేజీ గేటు వద్ద 400 ECS కెపాసిటీ స్టూడెంట్ పార్కింగ్ కాంప్లెక్స్ (PK-12) నిర్మాణం",
      "సోలార్ పెడెస్ట్రియన్ బ్లింకర్లు మరియు హై-విజిబిలిటీ జీబ్రా క్రాసింగ్ లైన్లు ఏర్పాటు"
    ]
  },
  {
    "id": "HS-11",
    "rank": 11,
    "name": "Tadepalligudem Road / Outer Bypass Junction (NH-165 Connector)",
    "nameTe": "తాడేపల్లిగూడెం రోడ్ / ఔటర్ బైపాస్ కూడలి (NH-165 కనెక్టర్)",
    "ward": 1,
    "ward_name": "Govindarao Nagar North & Kumudavalli Border",
    "coords": [
      16.5665,
      81.531
    ],
    "road": "NH-165 Bhimavaram Bypass & SH-42 Intersection",
    "junction_type": "4-Arm High-Speed Regional Intersection",
    "peak_pcu_hr": 3200,
    "two_wheelers_pct": 35,
    "autos_pct": 12,
    "cars_pct": 22,
    "heavy_vehicles_pct": 28,
    "pedestrians_hr": 450,
    "avg_speed_kmh": 18.5,
    "queue_length_m": 260,
    "avg_delay_sec": 118,
    "los": "D",
    "severity": "Moderate",
    "major_causes": [
      "హైవే వేగంతో వచ్చే భారీ కంటైనర్లు మరియు లోకల్ టూవీలర్ల మధ్య భద్రతా వైరుధ్యం",
      "రాత్రి వేళల్లో చానలైజేషన్ ఐలాండ్స్ స్పష్టంగా కనిపించకపోవడం",
      "తాడేపల్లిగూడెం నుండి భీమవరంలోకి వచ్చే సరుకు లారీల మళ్లింపు సంక్లిష్టత"
    ],
    "proposed_interventions": [
      "హైవే కూడలి వద్ద హై-మాస్ట్ లైట్లు మరియు సోలార్ స్టడ్ రిఫ్లెక్టర్లు అమర్చడం",
      "ఫ్రీ లెఫ్ట్ టర్న్ లేన్లను భౌతికంగా వేరుచేసి ప్రమాదాలను నివారించడం",
      "సిగ్నలైజేషన్ మరియు వేగ నియంత్రణ రంబల్ స్ట్రిప్స్ ఏర్పాటు"
    ]
  },
  {
    "id": "HS-12",
    "rank": 12,
    "name": "Balusumoodi 4-Roads Center",
    "nameTe": "బలుసుమూడి 4-రోడ్ల కూడలి",
    "ward": 30,
    "ward_name": "Rayalam Road & DNR North Junction",
    "coords": [
      16.5348,
      81.5155
    ],
    "road": "Balusumoodi Main Road & Sompeta Crossroads",
    "junction_type": "4-Arm Dense Urban Crossroads",
    "peak_pcu_hr": 2890,
    "two_wheelers_pct": 62,
    "autos_pct": 22,
    "cars_pct": 11.5,
    "heavy_vehicles_pct": 2.5,
    "pedestrians_hr": 2600,
    "avg_speed_kmh": 11,
    "queue_length_m": 240,
    "avg_delay_sec": 122,
    "los": "E",
    "severity": "Severe",
    "major_causes": [
      "బలుసుమూడి థియేటర్ల స్ట్రిప్ మరియు రెస్టారెంట్ల ముందు పార్కింగ్ క్యారేజ్‌వేని ఆక్రమించడం",
      "జే.పీ. రోడ్, డి.ఎన్.ఆర్ కాలేజీ మరియు సోంపేట రోడ్ల ట్రాఫిక్ ఒకే చోట కేంద్రీకృతం కావడం",
      "జంక్షన్ వద్ద స్టాప్ లైన్ క్రమశిక్షణ లేకపోవడం వల్ల లాక్‌జామ్ ఏర్పడడం"
    ],
    "proposed_interventions": [
      "4 దిశల వెబ్‌స్టర్ ఫిక్స్‌డ్ టైమ్ సిగ్నల్ (80 సెకన్ల సైకిల్) ఏర్పాటు",
      "కూడలికి 30 మీటర్ల పరిధిలో పార్కింగ్ నిషేధం మరియు ఆటో డ్రాపింగ్ పాయింట్ల గుర్తింపు",
      "పాదచారుల సురక్షిత నడక కోసం కార్నర్ బల్బ్‌అవుట్‌లు నిర్మించడం"
    ]
  },
  {
    "id": "HS-13",
    "rank": 13,
    "name": "Palakollu Road / Losari Bridge Approach",
    "nameTe": "పాలకొల్లు రోడ్ / లోసరి బ్రిడ్జి అప్రోచ్ కూడలి",
    "ward": 12,
    "ward_name": "Bridge Peta & Taderu Border",
    "coords": [
      16.5305,
      81.545
    ],
    "road": "B.N. Road (To Palakollu / Narsapuram)",
    "junction_type": "Narrow Bridgehead Bottleneck",
    "peak_pcu_hr": 2540,
    "two_wheelers_pct": 46,
    "autos_pct": 20,
    "cars_pct": 18,
    "heavy_vehicles_pct": 14,
    "pedestrians_hr": 850,
    "avg_speed_kmh": 12.5,
    "queue_length_m": 290,
    "avg_delay_sec": 130,
    "los": "E",
    "severity": "Severe",
    "major_causes": [
      "వంతెన వెడల్పు 2-లేన్లకు పరిమితం కావడం వల్ల 4-లేన్ల ట్రాఫిక్ బాటిల్‌నెక్ అవ్వడం",
      "చేపల పెంపకం మరియు వ్యవసాయ ఉత్పత్తుల రవాణా లారీల రద్దీ",
      "వంతెన అప్రోచ్ వద్ద అక్రమ సైడ్-రోడ్ టిఫిన్ బండ్లు"
    ],
    "proposed_interventions": [
      "వంతెనకు సమాంతరంగా అదనపు 2-లేన్ల బ్రిడ్జి నిర్మాణ ప్రతిపాదన (R&B డిపార్ట్‌మెంట్)",
      "అప్రోచ్ వద్ద అడ్డంకులను తొలగించి దృశ్యమానతను (Sight Distance) మెరుగుపరచడం",
      "సరుకు రవాణా వాహనాల కోసం లేన్ క్రమశిక్షణ మార్కింగ్‌లు"
    ]
  },
  {
    "id": "HS-14",
    "rank": 14,
    "name": "Alluri Sitarama Raju (ASR) Hall & Medical Enclave Center",
    "nameTe": "అల్లూరి సీతారామరాజు నాట్య కళా పరిషత్ & మెడికల్ ఎన్‌క్లేవ్ కూడలి",
    "ward": 33,
    "ward_name": "Alluri Sitarama Raju Hall & S.R. Rao Park",
    "coords": [
      16.5416,
      81.5155
    ],
    "road": "ASR Hall Road & Town Station West Feeder",
    "junction_type": "3-Arm Civic Enclave Junction",
    "peak_pcu_hr": 2480,
    "two_wheelers_pct": 59,
    "autos_pct": 21,
    "cars_pct": 15,
    "heavy_vehicles_pct": 1,
    "pedestrians_hr": 2100,
    "avg_speed_kmh": 12.8,
    "queue_length_m": 190,
    "avg_delay_sec": 98,
    "los": "D",
    "severity": "Moderate",
    "major_causes": [
      "కళ్యాణ మండపం మరియు సభలు జరిగే వేళల్లో కార్ల పార్కింగ్ రోడ్డుపై జరగడం",
      "ఆసుపత్రుల అంబులెన్సులు ట్రాఫిక్ రద్దీలో చిక్కుకుపోవడం",
      "టౌన్ రైల్వే స్టేషన్ పశ్చిమ వైపు నుండి వచ్చే ఆటోల రద్దీ"
    ],
    "proposed_interventions": [
      "అంబులెన్సుల కోసం 24/7 అత్యవసర కారిడార్ మార్కింగ్ (NP-04 అమలు)",
      "కళా పరిషత్ సమీపంలో 120 ECS సందర్శకుల పార్కింగ్ కేంద్రం (PK-11)",
      "నైట్ ఈవెంట్ల సమయంలో ప్రత్యేక మున్సిపల్ ట్రాఫిక్ వార్డెన్ల నియామకం"
    ]
  },
  {
    "id": "HS-15",
    "rank": 15,
    "name": "Bhimavaram Railway Junction (East Gate Entrance)",
    "nameTe": "భీమవరం రైల్వే జంక్షన్ (ఈస్ట్ గేట్ ప్రవేశ కూడలి)",
    "ward": 10,
    "ward_name": "Bhimavaram Railway Junction Area",
    "coords": [
      16.5423,
      81.5368
    ],
    "road": "Railway Station East Approach & Goods Shed Road",
    "junction_type": "Rail Terminal Forecourt Hub",
    "peak_pcu_hr": 2620,
    "two_wheelers_pct": 52,
    "autos_pct": 27,
    "cars_pct": 14,
    "heavy_vehicles_pct": 5,
    "pedestrians_hr": 3400,
    "avg_speed_kmh": 11.8,
    "queue_length_m": 210,
    "avg_delay_sec": 105,
    "los": "D",
    "severity": "Moderate",
    "major_causes": [
      "ఎక్స్‌ప్రెస్ రైళ్లు వచ్చినప్పుడు ఒకేసారి ప్రయాణికులు, ఆటోలు, కార్లు నిష్క్రమించడం",
      "గూడ్స్ షెడ్ లోడింగ్ ట్రక్కులు స్టేషన్ రోడ్డుపై నెమ్మదిగా కదలడం",
      "ప్రవేశం వద్ద నిర్దేశిత పిక్-అప్ / డ్రాప్-ఆఫ్ లేన్లు లేకపోవడం"
    ],
    "proposed_interventions": [
      "స్టేషన్ ముఖద్వారం వద్ద 280 ECS ప్లాజా పార్కింగ్ (PK-05) మరియు ప్రత్యేక ఆటో బే (AS-03)",
      "గూడ్స్ షెడ్ లారీల రాకపోకలను రాత్రి సమయాలకు మాత్రమే పరిమితం చేయడం",
      "ప్రయాణికుల కోసం వెల్-లిట్ పాదచారుల నడక మార్గాలు మరియు ఈ-బస్సు స్టాప్"
    ]
  },
  {
    "id": "HS-16",
    "rank": 16,
    "name": "Sunday Market (Aadivaaram Santha) & Municipal Ground Environs",
    "nameTe": "ఆదివారం సంత (మున్సిపల్ గ్రౌండ్) పరిసరాల కూడలి",
    "ward": 21,
    "ward_name": "Govt. Hospital & Sunday Santha Grounds",
    "coords": [
      16.542,
      81.5205
    ],
    "road": "Sunday Santha Road & Area Hospital South",
    "junction_type": "Periodic Market Bottleneck",
    "peak_pcu_hr": 3100,
    "two_wheelers_pct": 65,
    "autos_pct": 20,
    "cars_pct": 8,
    "heavy_vehicles_pct": 2,
    "pedestrians_hr": 4800,
    "avg_speed_kmh": 6.2,
    "queue_length_m": 350,
    "avg_delay_sec": 180,
    "los": "F",
    "severity": "Critical",
    "major_causes": [
      "ఆదివారాల్లో వేలాది మంది ప్రజలు, చిరువ్యాపారులు రోడ్డును పూర్తిగా ఆక్రమించడం",
      "ఏరియా ఆసుపత్రికి వెళ్లే రోగుల వాహనాలు, అంబులెన్సులు ఇరుక్కోవడం",
      "పార్కింగ్ సౌకర్యం లేకపోవడంతో బైకులు వందల సంఖ్యలో రోడ్డుపై నిలపడం"
    ],
    "proposed_interventions": [
      "ఆదివారాల్లో మున్సిపల్ గ్రౌండ్ లోపలనే 200 ECS సంత పార్కింగ్ (PK-10) తప్పనిసరి చేయడం",
      "ఆసుపత్రి రోడ్డును బారికేడ్లతో వేరుచేసి 'ఎమర్జెన్సీ ఓన్లీ లేన్'గా నిర్వహించడం",
      "తోపుడు బండ్లను మున్సిపల్ నిర్దేశిత హాకింగ్ జోన్లకే పరిమితం చేయడం"
    ]
  },
  {
    "id": "HS-17",
    "rank": 17,
    "name": "KGRL College & Bank Colony Road",
    "nameTe": "కె.జి.ఆర్.ఎల్ కాలేజ్ & బ్యాంక్ కాలనీ రోడ్ కూడలి",
    "ward": 26,
    "ward_name": "KGRL Degree College & Bank Colony",
    "coords": [
      16.5332,
      81.524
    ],
    "road": "KGRL College Road & G.V. Canal Link",
    "junction_type": "3-Arm Sub-Arterial College Link",
    "peak_pcu_hr": 2320,
    "two_wheelers_pct": 64,
    "autos_pct": 18,
    "cars_pct": 12,
    "heavy_vehicles_pct": 2,
    "pedestrians_hr": 2400,
    "avg_speed_kmh": 13.2,
    "queue_length_m": 180,
    "avg_delay_sec": 92,
    "los": "C",
    "severity": "Moderate",
    "major_causes": [
      "కాలేజీ విద్యార్థుల బైకుల వేగం మరియు రోడ్డుపై పార్కింగ్",
      "బ్యాంక్ కాలనీ నివాసితుల కార్ల ప్రవేశ సమయంలో ట్రాఫిక్ ఆటంకం"
    ],
    "proposed_interventions": [
      "కాలేజీ సమీపంలో పాదచారుల జీబ్రా క్రాసింగ్ మరియు సైడ్-వాక్ నిర్మాణం",
      "రహదారి ఇరువైపులా డ్రైనేజీలపై కవర్ స్లాబ్‌లు వేసి నడక స్థలాన్ని పెంచడం"
    ]
  },
  {
    "id": "HS-18",
    "rank": 18,
    "name": "Gollavanitippa Road / Aquaculture Processing Hub Junction",
    "nameTe": "గొల్లవానితిప్ప రోడ్ / ఆక్వా ప్రాసెసింగ్ హబ్ కూడలి",
    "ward": 31,
    "ward_name": "Rayalam Border South-West",
    "coords": [
      16.5285,
      81.5065
    ],
    "road": "Gollavanitippa Agro-Industrial Corridor",
    "junction_type": "Agro-Freight Sub-Arterial T-Junction",
    "peak_pcu_hr": 2280,
    "two_wheelers_pct": 44,
    "autos_pct": 16,
    "cars_pct": 12,
    "heavy_vehicles_pct": 24,
    "pedestrians_hr": 650,
    "avg_speed_kmh": 14.5,
    "queue_length_m": 170,
    "avg_delay_sec": 88,
    "los": "C",
    "severity": "Moderate",
    "major_causes": [
      "ఐస్ ఫ్యాక్టరీలు, కోల్డ్ స్టోరేజీల నుండి వచ్చే ఇన్సులేటెడ్ వ్యాన్లు మరియు ట్రాక్టర్ల రద్దీ",
      "రోడ్డు మార్జిన్లలో లోడింగ్ చేయడం వల్ల ట్రాఫిక్ ప్రవాహం నెమ్మదించడం"
    ],
    "proposed_interventions": [
      "ఆక్వా సరుకు లోడింగ్ కోసం ప్రత్యేక ఆఫ్-స్ట్రీట్ లాజిస్టిక్స్ బేలు ఏర్పాటు",
      "భారీ వాహనాల కోసం రోడ్డు అంచులను మెటలింగ్ చేసి పటిష్టపరచడం"
    ]
  },
  {
    "id": "HS-19",
    "rank": 19,
    "name": "Srirampuram Main Road Crossroads",
    "nameTe": "శ్రీరాంపురం మెయిన్ రోడ్డు చౌరస్తా",
    "ward": 8,
    "ward_name": "Chinna Ranga Palem & Srirampuram",
    "coords": [
      16.5465,
      81.541
    ],
    "road": "Srirampuram Main Road & Colony Crossroads",
    "junction_type": "4-Arm Residential Collector Crossroads",
    "peak_pcu_hr": 2150,
    "two_wheelers_pct": 66,
    "autos_pct": 18,
    "cars_pct": 12,
    "heavy_vehicles_pct": 1.5,
    "pedestrians_hr": 1950,
    "avg_speed_kmh": 13.8,
    "queue_length_m": 160,
    "avg_delay_sec": 82,
    "los": "C",
    "severity": "Moderate",
    "major_causes": [
      "కాలనీ అంతర్గత వీధుల నుండి వచ్చే వాహనాలకు సైట్ డిస్టెన్స్ తక్కువగా ఉండడం",
      "స్కూల్ వ్యాన్లు, ఆటోలు పిల్లలను ఎక్కించుకునే సమయంలో రోడ్డుపై ట్రాఫిక్ నిలవడం"
    ],
    "proposed_interventions": [
      "కూడలి వద్ద కాన్వెక్స్ మిర్రర్లు (Blind Spot Mirrors) అమర్చడం",
      "స్కూల్ జోన్ స్పీడ్ బ్రేకల్స్ మరియు రోడ్ మార్కింగ్స్ పునరుద్ధరణ"
    ]
  },
  {
    "id": "HS-20",
    "rank": 20,
    "name": "Municipal Office & Sub-Court Center Junction",
    "nameTe": "మున్సిపల్ కార్యాలయం & సబ్-కోర్టు కూడలి",
    "ward": 28,
    "ward_name": "Municipal Office & Sub-Court Environs",
    "coords": [
      16.5373,
      81.5194
    ],
    "road": "Rest House Road & Civic Complex Street",
    "junction_type": "Civic Complex 3-Arm T-Junction",
    "peak_pcu_hr": 2420,
    "two_wheelers_pct": 58,
    "autos_pct": 20,
    "cars_pct": 16,
    "heavy_vehicles_pct": 1.5,
    "pedestrians_hr": 2500,
    "avg_speed_kmh": 12,
    "queue_length_m": 180,
    "avg_delay_sec": 95,
    "los": "D",
    "severity": "Moderate",
    "major_causes": [
      "కోర్టు రోజుల్లో న్యాయవాదులు, కక్షిదారులు మరియు మున్సిపల్ సందర్శకుల కార్లు రోడ్డుపైనే పార్కింగ్",
      "ప్రభుత్వ గెస్ట్ హౌస్ వైపు వీఐపీ వాహనాల కదలికల సమయంలో ట్రాఫిక్ ఆంక్షలు"
    ],
    "proposed_interventions": [
      "మున్సిపల్ కార్యాలయం ఎదురుగా 140 ECS సివిక్ పార్కింగ్ కాంప్లెక్స్ (PK-06) వినియోగాన్ని తప్పనిసరి చేయడం",
      "రోడ్డుపై నో-పార్కింగ్ కఠినంగా అమలు చేసి పాదచారుల కాలిబాటను విస్తరించడం"
    ]
  }
],

  // 3. BASELINE ROAD NETWORK SEGMENTS
  road_segments: [
  {
    "id": "ROAD-01",
    "name": "P.P. Road (Prakasam Road Arterial Spine)",
    "nameTe": "పి.పి. రోడ్డు (ప్రకాశం రోడ్డు ప్రధాన ధమని)",
    "type": "Major Arterial",
    "tier": 1,
    "length_km": 3.4,
    "carriageway_width_m": 11.5,
    "lanes": 4,
    "surface": "Asphalt Concrete (Good)",
    "operation": "Two-Way (Proposed One-Way in Core under Scenario A)",
    "parking": "High On-Street Friction (38% reduction in effective width)",
    "encroachment": "Commercial display boards, tea stalls, awnings",
    "footpath_pct": 28,
    "cycle_infra": "None (Mixed Flow)",
    "bus_stops": 8,
    "junctions": 7,
    "traffic_volume_pcu_hr": 3840,
    "capacity_pcu_hr": 2400,
    "vc_ratio": 1.6,
    "peak_speed_kmh": 8.5,
    "bottleneck": "Prakasham Underpass approach, Gandhi statue center",
    "coords": [
      [
        16.554,
        81.5175
      ],
      [
        16.551,
        81.5192
      ],
      [
        16.5482,
        81.5212
      ],
      [
        16.546,
        81.5226
      ],
      [
        16.5448,
        81.5235
      ],
      [
        16.5432,
        81.5242
      ],
      [
        16.5415,
        81.5248
      ],
      [
        16.5395,
        81.5255
      ]
    ]
  },
  {
    "id": "ROAD-02",
    "name": "Gandhi Road & Railway Feeder Parallel Spine",
    "nameTe": "గాంధీ రోడ్డు & రైల్వే ఫీడర్ సమాంతర ధమని",
    "type": "Major Arterial",
    "tier": 1,
    "length_km": 2.8,
    "carriageway_width_m": 9.8,
    "lanes": 2,
    "surface": "Bituminous (Fair with patches)",
    "operation": "Two-Way (Proposed Clockwise Companion in Scenario A)",
    "parking": "Severe unauthorized auto-rickshaw waiting & freight bays",
    "encroachment": "Auto workshops, scrap yards, fruit stalls",
    "footpath_pct": 15,
    "cycle_infra": "None",
    "bus_stops": 6,
    "junctions": 6,
    "traffic_volume_pcu_hr": 3100,
    "capacity_pcu_hr": 2100,
    "vc_ratio": 1.48,
    "peak_speed_kmh": 9.8,
    "bottleneck": "Town Station east approach, Gunupudi market crossing",
    "coords": [
      [
        16.5455,
        81.516
      ],
      [
        16.5452,
        81.5195
      ],
      [
        16.5448,
        81.5235
      ],
      [
        16.5442,
        81.5275
      ],
      [
        16.5433,
        81.532
      ],
      [
        16.5428,
        81.5345
      ],
      [
        16.5423,
        81.5368
      ]
    ]
  },
  {
    "id": "ROAD-03",
    "name": "Rest House Road Commercial Corridor",
    "nameTe": "రెస్ట్ హౌస్ రోడ్డు వాణిజ్య కారిడార్",
    "type": "Sub-Arterial",
    "tier": 2,
    "length_km": 1.9,
    "carriageway_width_m": 8.5,
    "lanes": 2,
    "surface": "Asphalt (Fair)",
    "operation": "Two-Way",
    "parking": "Severe commercial bike and shopper parking",
    "encroachment": "Clothing stores, electronics shops, temporary stalls",
    "footpath_pct": 22,
    "cycle_infra": "None",
    "bus_stops": 5,
    "junctions": 5,
    "traffic_volume_pcu_hr": 2950,
    "capacity_pcu_hr": 1800,
    "vc_ratio": 1.64,
    "peak_speed_kmh": 11.2,
    "bottleneck": "Mavullamma temple center, RTC Bus stand exit",
    "coords": [
      [
        16.5373,
        81.5194
      ],
      [
        16.537,
        81.521
      ],
      [
        16.5366,
        81.5225
      ],
      [
        16.5385,
        81.525
      ],
      [
        16.5402,
        81.5268
      ],
      [
        16.5415,
        81.5285
      ]
    ]
  },
  {
    "id": "ROAD-04",
    "name": "NH-165 Bhimavaram Outer Bypass (National Highway)",
    "nameTe": "NH-165 భీమవరం ఔటర్ బైపాస్ (జాతీయ రహదారి)",
    "type": "National Highway / Bypass",
    "tier": 1,
    "length_km": 7.2,
    "carriageway_width_m": 14,
    "lanes": 4,
    "surface": "Asphalt Concrete (Very Good)",
    "operation": "Four-Lane Divided Highway",
    "parking": "Dhaba & truck staging on unpaved shoulders",
    "encroachment": "Low (Agrarian & industrial strip)",
    "footpath_pct": 5,
    "cycle_infra": "Shoulder Shared",
    "bus_stops": 6,
    "junctions": 8,
    "traffic_volume_pcu_hr": 3400,
    "capacity_pcu_hr": 4500,
    "vc_ratio": 0.76,
    "peak_speed_kmh": 46,
    "bottleneck": "Tadepalligudem road junction (HS-11), Tanuku road fork",
    "coords": [
      [
        16.572,
        81.535
      ],
      [
        16.5665,
        81.531
      ],
      [
        16.558,
        81.538
      ],
      [
        16.5511,
        81.55
      ],
      [
        16.542,
        81.552
      ],
      [
        16.532,
        81.549
      ],
      [
        16.524,
        81.542
      ]
    ]
  },
  {
    "id": "ROAD-05",
    "name": "Juvvalapalem Road Arterial Corridor",
    "nameTe": "జువ్వలపాలెం రోడ్డు ప్రధాన ధమని",
    "type": "Major Arterial",
    "tier": 1,
    "length_km": 2.6,
    "carriageway_width_m": 10,
    "lanes": 2,
    "surface": "Asphalt (Fair)",
    "operation": "Two-Way",
    "parking": "Feed trucks, commercial loading, auto stands",
    "encroachment": "Welding shops, timber depots, agro-chemical outlets",
    "footpath_pct": 12,
    "cycle_infra": "None",
    "bus_stops": 6,
    "junctions": 5,
    "traffic_volume_pcu_hr": 2850,
    "capacity_pcu_hr": 2000,
    "vc_ratio": 1.43,
    "peak_speed_kmh": 13.5,
    "bottleneck": "Balusumoodi junction, Chinamiram road link",
    "coords": [
      [
        16.542,
        81.498
      ],
      [
        16.5408,
        81.503
      ],
      [
        16.5395,
        81.5065
      ],
      [
        16.538,
        81.511
      ],
      [
        16.5355,
        81.5145
      ],
      [
        16.5348,
        81.5155
      ]
    ]
  },
  {
    "id": "ROAD-06",
    "name": "DNR College Educational Access Corridor (Balusumudi to Rayalam)",
    "nameTe": "డి.ఎన్.ఆర్. కళాశాల విద్యా కారిడార్",
    "type": "Sub-Arterial",
    "tier": 2,
    "length_km": 1.8,
    "carriageway_width_m": 9,
    "lanes": 2,
    "surface": "Bituminous (Fair with broken kerbs)",
    "operation": "Two-Way",
    "parking": "Extreme 2-wheeler student parking on both flanks",
    "encroachment": "Book stalls, fast food corners, xerox centres",
    "footpath_pct": 18,
    "cycle_infra": "Dedicated paint-marked student cycle bay (Proposed)",
    "bus_stops": 4,
    "junctions": 4,
    "traffic_volume_pcu_hr": 3250,
    "capacity_pcu_hr": 1900,
    "vc_ratio": 1.71,
    "peak_speed_kmh": 10.2,
    "bottleneck": "DNR main gate, Stadium intersection",
    "coords": [
      [
        16.5348,
        81.5155
      ],
      [
        16.533,
        81.5158
      ],
      [
        16.532,
        81.516
      ],
      [
        16.5295,
        81.5152
      ],
      [
        16.527,
        81.513
      ]
    ]
  },
  {
    "id": "ROAD-07",
    "name": "Someswara Swamy Temple / Main Bazaar Heritage Street",
    "nameTe": "శ్రీ సోమేశ్వర స్వామి వారి గుడి / మెయిన్ బజార్ హెరిటేజ్ వీధి",
    "type": "Heritage Commercial Street",
    "tier": 2,
    "length_km": 1.4,
    "carriageway_width_m": 6.8,
    "lanes": 2,
    "surface": "Concrete Paver Blocks / Bitumen (Uneven)",
    "operation": "Two-Way (High Pedestrian Conflict)",
    "parking": "Disorganized shopper two-wheelers on carriageway",
    "encroachment": "Severe flower, pooja articles, jewellery stalls",
    "footpath_pct": 8,
    "cycle_infra": "Shared Pedestrian Priority Zone (Proposed)",
    "bus_stops": 3,
    "junctions": 4,
    "traffic_volume_pcu_hr": 2980,
    "capacity_pcu_hr": 1400,
    "vc_ratio": 2.13,
    "peak_speed_kmh": 6.5,
    "bottleneck": "Chandra Pushkarini curve, Temple gate T-junction",
    "coords": [
      [
        16.5432,
        81.5242
      ],
      [
        16.542,
        81.5265
      ],
      [
        16.5415,
        81.5285
      ],
      [
        16.5412,
        81.5312
      ],
      [
        16.541,
        81.534
      ]
    ]
  },
  {
    "id": "ROAD-08",
    "name": "SH-42 Tadepalligudem - Bhimavaram State Highway",
    "nameTe": "SH-42 తాడేపల్లిగూడెం - భీమవరం రాష్ట్ర రహదారి",
    "type": "State Highway",
    "tier": 1,
    "length_km": 3.6,
    "carriageway_width_m": 11,
    "lanes": 4,
    "surface": "Asphalt (Good)",
    "operation": "Divided Two-Way",
    "parking": "Commercial vehicles near godowns",
    "encroachment": "Moderate",
    "footpath_pct": 15,
    "cycle_infra": "None",
    "bus_stops": 6,
    "junctions": 5,
    "traffic_volume_pcu_hr": 3150,
    "capacity_pcu_hr": 3200,
    "vc_ratio": 0.98,
    "peak_speed_kmh": 32,
    "bottleneck": "Bypass junction (HS-11), Govindarao Nagar entry",
    "coords": [
      [
        16.575,
        81.528
      ],
      [
        16.568,
        81.529
      ],
      [
        16.5665,
        81.531
      ],
      [
        16.558,
        81.527
      ],
      [
        16.552,
        81.5255
      ],
      [
        16.5482,
        81.5245
      ]
    ]
  },
  {
    "id": "ROAD-09",
    "name": "Undi - Akividu Regional Connection Road",
    "nameTe": "ఉండి - ఆకివీడు ప్రాంతీయ అనుసంధాన రహదారి",
    "type": "Regional Highway",
    "tier": 2,
    "length_km": 2.8,
    "carriageway_width_m": 8,
    "lanes": 2,
    "surface": "Bituminous (Fair)",
    "operation": "Two-Way",
    "parking": "Rural buses and agricultural trailers",
    "encroachment": "Low to Moderate",
    "footpath_pct": 10,
    "cycle_infra": "None",
    "bus_stops": 4,
    "junctions": 4,
    "traffic_volume_pcu_hr": 2200,
    "capacity_pcu_hr": 1800,
    "vc_ratio": 1.22,
    "peak_speed_kmh": 24,
    "bottleneck": "Kovvada rail link, Town Station entry",
    "coords": [
      [
        16.56,
        81.505
      ],
      [
        16.552,
        81.511
      ],
      [
        16.548,
        81.514
      ],
      [
        16.5455,
        81.516
      ]
    ]
  },
  {
    "id": "ROAD-10",
    "name": "SRKR College Link Road (Chinna Amiram Corridor)",
    "nameTe": "ఎస్.ఆర్.కె.ఆర్ కాలేజ్ లింక్ రోడ్డు (చైనామిరం కారిడార్)",
    "type": "Collector / University Link",
    "tier": 2,
    "length_km": 2.4,
    "carriageway_width_m": 8.5,
    "lanes": 2,
    "surface": "Asphalt (Fair)",
    "operation": "Two-Way",
    "parking": "College student two-wheelers, auto rickshaws",
    "encroachment": "Moderate student canteens and hostels",
    "footpath_pct": 20,
    "cycle_infra": "Shared Street",
    "bus_stops": 4,
    "junctions": 4,
    "traffic_volume_pcu_hr": 2680,
    "capacity_pcu_hr": 1800,
    "vc_ratio": 1.49,
    "peak_speed_kmh": 14.5,
    "bottleneck": "SRKR main entrance, Chinamiram bund junction",
    "coords": [
      [
        16.546,
        81.495
      ],
      [
        16.546,
        81.499
      ],
      [
        16.5468,
        81.505
      ],
      [
        16.5472,
        81.5096
      ],
      [
        16.546,
        81.514
      ],
      [
        16.5455,
        81.516
      ]
    ]
  },
  {
    "id": "ROAD-11",
    "name": "Bhimavaram Town Railway Station Approach Road",
    "nameTe": "భీమవరం టౌన్ రైల్వే స్టేషన్ అప్రోచ్ రోడ్డు",
    "type": "Terminal Connector",
    "tier": 2,
    "length_km": 1.6,
    "carriageway_width_m": 8.5,
    "lanes": 2,
    "surface": "Asphalt (Fair)",
    "operation": "Two-Way",
    "parking": "Auto stands and commuter vehicle queues",
    "encroachment": "Tea stalls, parcel agencies, hotel frontage",
    "footpath_pct": 25,
    "cycle_infra": "None",
    "bus_stops": 4,
    "junctions": 5,
    "traffic_volume_pcu_hr": 2850,
    "capacity_pcu_hr": 1800,
    "vc_ratio": 1.58,
    "peak_speed_kmh": 10.5,
    "bottleneck": "ASR Hall curve, Sunday market junction",
    "coords": [
      [
        16.5455,
        81.516
      ],
      [
        16.5435,
        81.517
      ],
      [
        16.5416,
        81.5155
      ],
      [
        16.542,
        81.5205
      ],
      [
        16.5432,
        81.5242
      ],
      [
        16.5448,
        81.5235
      ]
    ]
  },
  {
    "id": "ROAD-12",
    "name": "B.N. Road (Bhimavaram - Palakollu / Narsapuram Highway)",
    "nameTe": "బి.ఎన్. రోడ్డు (భీమవరం - పాలకొల్లు / నర్సాపురం రహదారి)",
    "type": "Major Arterial",
    "tier": 1,
    "length_km": 3.2,
    "carriageway_width_m": 10.5,
    "lanes": 2,
    "surface": "Asphalt (Good)",
    "operation": "Two-Way",
    "parking": "Commercial shopfronts and loading vehicles",
    "encroachment": "Moderate",
    "footpath_pct": 18,
    "cycle_infra": "None",
    "bus_stops": 6,
    "junctions": 6,
    "traffic_volume_pcu_hr": 3100,
    "capacity_pcu_hr": 2200,
    "vc_ratio": 1.41,
    "peak_speed_kmh": 18,
    "bottleneck": "Bridge Peta / Losari bridge approach (HS-13)",
    "coords": [
      [
        16.5432,
        81.5242
      ],
      [
        16.5401,
        81.5255
      ],
      [
        16.536,
        81.528
      ],
      [
        16.5332,
        81.53
      ],
      [
        16.5305,
        81.545
      ],
      [
        16.525,
        81.55
      ]
    ]
  },
  {
    "id": "ROAD-13",
    "name": "KGRL College & Bank Colony Connector Road",
    "nameTe": "కె.జి.ఆర్.ఎల్ కాలేజ్ & బ్యాంక్ కాలనీ కనెక్టర్ రోడ్డు",
    "type": "Sub-Arterial",
    "tier": 2,
    "length_km": 1.8,
    "carriageway_width_m": 8,
    "lanes": 2,
    "surface": "Asphalt (Fair)",
    "operation": "Two-Way",
    "parking": "Residential cars, college two-wheelers",
    "encroachment": "Low",
    "footpath_pct": 20,
    "cycle_infra": "Shared Street",
    "bus_stops": 4,
    "junctions": 4,
    "traffic_volume_pcu_hr": 2320,
    "capacity_pcu_hr": 1700,
    "vc_ratio": 1.36,
    "peak_speed_kmh": 15,
    "bottleneck": "KGRL college gate, Railway Junction approach",
    "coords": [
      [
        16.536,
        81.528
      ],
      [
        16.5332,
        81.524
      ],
      [
        16.535,
        81.532
      ],
      [
        16.539,
        81.535
      ],
      [
        16.5423,
        81.5368
      ]
    ]
  },
  {
    "id": "ROAD-14",
    "name": "Yenamadurru Canal Bund Green Mobility Corridor (Proposed)",
    "nameTe": "ఎనమదుర్రు కాలువ గట్టు హరిత మొబిలిటీ కారిడార్ (ప్రతిపాదిత)",
    "type": "Non-Motorized Transit (NMT)",
    "tier": 8,
    "length_km": 4.8,
    "carriageway_width_m": 6.5,
    "lanes": 2,
    "surface": "Proposed Pervious Asphalt / Concrete Paver",
    "operation": "Pedestrian & Electric Feeder Priority",
    "parking": "Zero Tolerance (Continuous bollards & railings)",
    "encroachment": "Squatters & illegal garbage dumping (To be rehabilitated)",
    "footpath_pct": 100,
    "cycle_infra": "Continuous 2.5m segregated two-way cycle track",
    "bus_stops": 6,
    "junctions": 5,
    "traffic_volume_pcu_hr": 820,
    "capacity_pcu_hr": 1600,
    "vc_ratio": 0.51,
    "peak_speed_kmh": 22,
    "bottleneck": "Underpass canal culvert crossing, Someswaram weir",
    "coords": [
      [
        16.568,
        81.525
      ],
      [
        16.561,
        81.5248
      ],
      [
        16.5547,
        81.5246
      ],
      [
        16.5476,
        81.5235
      ],
      [
        16.542,
        81.5225
      ],
      [
        16.536,
        81.5218
      ],
      [
        16.528,
        81.521
      ]
    ]
  },
  {
    "id": "ROAD-15",
    "name": "Srirampuram & Tanuku Link Road",
    "nameTe": "శ్రీరాంపురం & తణుకు లింక్ రోడ్డు",
    "type": "Sub-Arterial",
    "tier": 2,
    "length_km": 2.2,
    "carriageway_width_m": 8.5,
    "lanes": 2,
    "surface": "Asphalt (Fair)",
    "operation": "Two-Way",
    "parking": "Residential parking, small commercial loading",
    "encroachment": "Moderate",
    "footpath_pct": 16,
    "cycle_infra": "None",
    "bus_stops": 4,
    "junctions": 4,
    "traffic_volume_pcu_hr": 2150,
    "capacity_pcu_hr": 1750,
    "vc_ratio": 1.23,
    "peak_speed_kmh": 18,
    "bottleneck": "Srirampuram crossroads (HS-19), ARKR school gate",
    "coords": [
      [
        16.5482,
        81.5305
      ],
      [
        16.5472,
        81.535
      ],
      [
        16.5465,
        81.541
      ],
      [
        16.5444,
        81.5453
      ],
      [
        16.542,
        81.552
      ]
    ]
  },
  {
    "id": "ROAD-16",
    "name": "Rayalam - Gollavanitippa Southern Agro-Corridor",
    "nameTe": "రాయలం - గొల్లవానితిప్ప దక్షిణ వ్యవసాయ కారిడార్",
    "type": "Collector / Agro-Freight",
    "tier": 2,
    "length_km": 2.5,
    "carriageway_width_m": 7.5,
    "lanes": 2,
    "surface": "Bituminous (Potholed)",
    "operation": "Two-Way",
    "parking": "Aquaculture pickups and tractor staging",
    "encroachment": "Low",
    "footpath_pct": 8,
    "cycle_infra": "None",
    "bus_stops": 3,
    "junctions": 4,
    "traffic_volume_pcu_hr": 2280,
    "capacity_pcu_hr": 1600,
    "vc_ratio": 1.43,
    "peak_speed_kmh": 14.5,
    "bottleneck": "Gollavanitippa junction (HS-18), Canal bridge",
    "coords": [
      [
        16.5348,
        81.5155
      ],
      [
        16.532,
        81.512
      ],
      [
        16.5285,
        81.5065
      ],
      [
        16.525,
        81.5
      ]
    ]
  }
],

  // 4. ORIGIN-DESTINATION (O-D) ANALYSIS & MATRICES
  od_analysis: {
    zones: [
      {
            "id": "Z1",
            "name": "Balusumoodi / West Residential",
            "nameTe": "బలుసుమూడి / పశ్చిమ నివాస ప్రాంతం",
            "coords": [
                  16.5348,
                  81.5155
            ],
            "trips_gen": 48500,
            "trips_att": 36200
      },
      {
            "id": "Z2",
            "name": "Srirampuram / North Residential",
            "nameTe": "శ్రీరాంపురం / ఉత్తర నివాస ప్రాంతం",
            "coords": [
                  16.5465,
                  81.541
            ],
            "trips_gen": 52000,
            "trips_att": 41000
      },
      {
            "id": "Z3",
            "name": "Main Bazaar & Someswaram Retail",
            "nameTe": "మెయిన్ బజార్ & సోమేశ్వరం వాణిజ్య కేంద్రం",
            "coords": [
                  16.5412,
                  81.5312
            ],
            "trips_gen": 22000,
            "trips_att": 78500
      },
      {
            "id": "Z4",
            "name": "DNR & SRKR Educational Corridor",
            "nameTe": "డి.ఎన్.ఆర్ & ఎస్.ఆర్.కె.ఆర్ విద్యా హబ్",
            "coords": [
                  16.532,
                  81.516
            ],
            "trips_gen": 24500,
            "trips_att": 62000
      },
      {
            "id": "Z5",
            "name": "Bhimavaram Town Railway Station",
            "nameTe": "భీమవరం టౌన్ రైల్వే స్టేషన్",
            "coords": [
                  16.5455,
                  81.516
            ],
            "trips_gen": 31000,
            "trips_att": 34500
      },
      {
            "id": "Z6",
            "name": "APSRTC Regional Bus Station",
            "nameTe": "ఆర్టీసీ బస్ స్టేషన్ కాంప్లెక్స్",
            "coords": [
                  16.5415,
                  81.5285
            ],
            "trips_gen": 38000,
            "trips_att": 42000
      },
      {
            "id": "Z7",
            "name": "Bhimavaram Junction & Industrial",
            "nameTe": "రైల్వే జంక్షన్ & పారిశ్రామిక వాడ",
            "coords": [
                  16.5423,
                  81.5368
            ],
            "trips_gen": 28500,
            "trips_att": 31000
      },
      {
            "id": "Z8",
            "name": "Gunupudi Wholesale Fish & Veg Market",
            "nameTe": "గునుపూడి హోల్‌సేల్ మార్కెట్",
            "coords": [
                  16.5433,
                  81.532
            ],
            "trips_gen": 18500,
            "trips_att": 32000
      },
      {
            "id": "Z9",
            "name": "Undi / Akividu Gateway (Regional)",
            "nameTe": "ఉండి / ఆకివీడు గేట్‌వే",
            "coords": [
                  16.56,
                  81.505
            ],
            "trips_gen": 26500,
            "trips_att": 21500
      },
      {
            "id": "Z10",
            "name": "Tadepalligudem Freight Gateway",
            "nameTe": "తాడేపల్లిగూడెం గేట్‌వే (NH-165)",
            "coords": [
                  16.5665,
                  81.531
            ],
            "trips_gen": 34000,
            "trips_att": 29000
      },
      {
            "id": "Z11",
            "name": "Palakollu / Narsapuram South Gateway",
            "nameTe": "పాలకొల్లు / నర్సాపురం గేట్‌వే",
            "coords": [
                  16.5305,
                  81.545
            ],
            "trips_gen": 29000,
            "trips_att": 25000
      },
      {
            "id": "Z12",
            "name": "Govt Hospital & Civic Zone",
            "nameTe": "ప్రభుత్వ ఆసుపత్రి & మున్సిపల్ కార్యాలయం",
            "coords": [
                  16.5373,
                  81.5194
            ],
            "trips_gen": 15500,
            "trips_att": 28000
      }
],
    trip_distribution: {
      internal_internal_pct: 38.5,
      external_internal_pct: 34.2,
      through_traffic_pct: 27.3
    },
    peak_od_sample_matrix: [
      // From Z1 to Z12 [trips/hr in peak morning]
      [0, 420, 1850, 2100, 780, 890, 450, 920, 310, 380, 240, 680],
      [510, 0, 2400, 1850, 960, 1100, 620, 1150, 420, 750, 380, 710],
      [950, 1150, 0, 420, 1680, 1920, 850, 620, 210, 490, 580, 890],
      [1450, 1200, 680, 0, 520, 640, 310, 410, 180, 310, 190, 280],
      [680, 720, 1420, 410, 0, 650, 380, 390, 140, 220, 180, 340],
      [780, 890, 1650, 580, 610, 0, 450, 440, 210, 340, 320, 410],
      [420, 560, 920, 310, 350, 420, 0, 310, 120, 260, 240, 310],
      [820, 950, 850, 210, 390, 480, 340, 0, 190, 280, 220, 390],
      [890, 920, 1680, 1450, 520, 610, 280, 710, 0, 620, 310, 410],
      [1120, 1340, 1890, 1100, 710, 820, 540, 840, 380, 0, 460, 520],
      [740, 810, 1450, 890, 540, 690, 420, 610, 210, 490, 0, 380],
      [580, 640, 720, 240, 310, 360, 220, 280, 110, 180, 150, 0]
    ]
  },

  // 5. JUNCTION CAPACITY & WEBSTER SIGNAL TIMING ENGINEERING
  junctions_engineering: [
  {
    "id": "JN-01",
    "name": "Prakasham Chowk & Town Railway Underpass (RuB) Junction",
    "coords": [
      16.5448,
      81.5235
    ],
    "arms": 5,
    "existing_control": "Grade-Separated RuB Underpass with Manual Police / Signal",
    "saturation_flow_pcu_hr": 4400,
    "peak_volume_pcu_hr": 3840,
    "existing_cycle_sec": 120,
    "optimal_webster_cycle_sec": 95,
    "green_splits_sec": {
      "north_pp_road": 32,
      "south_town_station": 25,
      "east_rest_house": 28,
      "west_kovvada": 15,
      "amber": 10
    },
    "existing_los": "E",
    "improved_los": "B",
    "delay_reduction_pct": 48.5,
    "turning_movements": {
      "left": 820,
      "thru": 1940,
      "right": 1080
    }
  },
  {
    "id": "JN-02",
    "name": "Old Bus Stand & Gandhi Statue Center",
    "coords": [
      16.5432,
      81.5242
    ],
    "arms": 4,
    "existing_control": "Uncontrolled Rotary",
    "saturation_flow_pcu_hr": 4600,
    "peak_volume_pcu_hr": 3420,
    "existing_cycle_sec": 0,
    "optimal_webster_cycle_sec": 95,
    "green_splits_sec": {
      "north_market": 28,
      "south_pp_road": 26,
      "east_gandhi_rd": 22,
      "west_balusumoodi": 14,
      "amber": 5
    },
    "existing_los": "F",
    "improved_los": "B",
    "delay_reduction_pct": 58.2,
    "turning_movements": {
      "left": 910,
      "thru": 1650,
      "right": 860
    }
  },
  {
    "id": "JN-03",
    "name": "APSRTC Bus Complex Entry Junction",
    "coords": [
      16.5415,
      81.5285
    ],
    "arms": 3,
    "existing_control": "Static Signs",
    "saturation_flow_pcu_hr": 3800,
    "peak_volume_pcu_hr": 3180,
    "existing_cycle_sec": 0,
    "optimal_webster_cycle_sec": 80,
    "green_splits_sec": {
      "arterial_thru": 45,
      "bus_egress": 25,
      "amber": 10
    },
    "existing_los": "F",
    "improved_los": "B",
    "delay_reduction_pct": 62,
    "turning_movements": {
      "left": 620,
      "thru": 2100,
      "right": 460
    }
  },
  {
    "id": "JN-04",
    "name": "DNR College Main Road Junction",
    "coords": [
      16.532,
      81.516
    ],
    "arms": 4,
    "existing_control": "Peak Police Assisted",
    "saturation_flow_pcu_hr": 4200,
    "peak_volume_pcu_hr": 3350,
    "existing_cycle_sec": 120,
    "optimal_webster_cycle_sec": 90,
    "green_splits_sec": {
      "college_arm": 30,
      "town_feeder": 32,
      "rayalam_link": 18,
      "amber": 10
    },
    "existing_los": "E",
    "improved_los": "B",
    "delay_reduction_pct": 52.8,
    "turning_movements": {
      "left": 740,
      "thru": 1880,
      "right": 730
    }
  },
  {
    "id": "JN-05",
    "name": "Rest House Road & Mavullamma Crossroads",
    "coords": [
      16.5366,
      81.5225
    ],
    "arms": 4,
    "existing_control": "Fixed Time 90s Signal",
    "saturation_flow_pcu_hr": 3900,
    "peak_volume_pcu_hr": 3120,
    "existing_cycle_sec": 90,
    "optimal_webster_cycle_sec": 85,
    "green_splits_sec": {
      "east_west_rh": 38,
      "north_south_temple": 35,
      "amber": 12
    },
    "existing_los": "E",
    "improved_los": "B",
    "delay_reduction_pct": 44.5,
    "turning_movements": {
      "left": 680,
      "thru": 1720,
      "right": 720
    }
  }
],

  // 6. THREE ALTERNATIVE TRAFFIC MANAGEMENT SCENARIOS
  scenarios: [
    {
      id: "baseline",
      code: "Baseline",
      name: "Existing Conditions (Do-Nothing Scenario)",
      nameTe: "ప్రస్తుత ట్రాఫిక్ స్థితి (బేస్‌లైన్)",
      capex_cr: 0.0,
      opex_annual_cr: 1.2,
      implementation_time_months: 0,
      indicators: {
        avg_travel_time_min: 24.8,
        avg_speed_kmh: 10.4,
        junction_delay_sec: 148,
        peak_queue_length_m: 410,
        throughput_pcu_hr: 14200,
        network_congestion_index: 82, // 0-100
        transit_mode_share_pct: 4.2,
        active_mobility_share_pct: 6.8,
        co2_emissions_tonnes_day: 48.6,
        fuel_consumption_kl_day: 22.8,
        annual_fatalities: 18,
        serious_injuries: 64,
        los_distribution: { A: 2, B: 8, C: 18, D: 28, E: 24, F: 20 }
      },
      description: "Severe bottlenecks at railway underpass approaches, uncontrolled commercial parking, pedestrian conflicts in bazaar, high tailpipe emissions."
    },
    {
      id: "scenario_a",
      code: "Scenario A",
      name: "Minimum-Infrastructure Operational Improvement",
      nameTe: "కనిష్ట-మౌలిక వసతుల నిర్వహణ మెరుగుదల",
      capex_cr: 5.4,
      opex_annual_cr: 2.1,
      implementation_time_months: 6,
      focus: "Operational low-cost interventions: Webster signal retiming, one-way loops, on-street parking pricing, physical medians, auto bays.",
      interventions: [
        "Implementation of Clockwise One-Way Circulation: P.P. Road (Southbound) & Gandhi Road (Northbound)",
        "Webster-optimized signal synchronization at top 8 junctions with green-wave corridor on Rest House Road",
        "Enforce strict 45-min on-street paid parking regulations and remove street encroachments",
        "Demarcated off-street Auto-Rickshaw pick-up zones at Bus Stand, Railway Stations, and Old Bus Stand",
        "Freight time-window restrictions: Ban HGVs on town arterials from 08:00 - 12:00 & 16:30 - 20:30",
        "Thermoplastic lane marking, retro-reflective signage, and school-zone tabletop crossings"
      ],
      indicators: {
        avg_travel_time_min: 17.5,
        avg_speed_kmh: 15.8,
        junction_delay_sec: 84,
        peak_queue_length_m: 230,
        throughput_pcu_hr: 18400,
        network_congestion_index: 54,
        transit_mode_share_pct: 5.8,
        active_mobility_share_pct: 8.2,
        co2_emissions_tonnes_day: 39.8,
        fuel_consumption_kl_day: 18.6,
        annual_fatalities: 11,
        serious_injuries: 38,
        los_distribution: { A: 8, B: 24, C: 36, D: 20, E: 10, F: 2 }
      },
      benefits: "30% travel time reduction, 38% fuel and emissions reduction, rapid 6-month delivery with minimal budget."
    },
    {
      id: "scenario_b",
      code: "Scenario B",
      name: "Integrated Road Network Optimization",
      nameTe: "సమీకృత రహదారి నెట్‌వర్క్ ఆప్టిమైజేషన్",
      capex_cr: 28.6,
      opex_annual_cr: 3.5,
      implementation_time_months: 18,
      focus: "Network restructuring: Junction geometric redesign, channelization islands, 2-lane Railway Overbridge (RoB) approach, bypass freight diversion, multi-level parking.",
      interventions: [
        "All Scenario A measures plus complete geometric redesign of Prakasham Chowk, Old Bus Stand, and APSRTC Junction",
        "Construction of 2 Multi-Level Car Parking (MLCP) facilities (Prakasham Chowk & Main Bazaar edge - 450 car & 1200 bike capacity)",
        "Dedicated Freight Bypass connecting NH-165 directly to Industrial Estate & Aquaculture Cold Chain hub",
        "Bridge duplication across canal bottlenecks (Losari Bridge & Chinna Amiram canal choke)",
        "Grade-separated pedestrian skywalk / underpass connecting Bhimavaram Town Station forecourt to P.P. Road",
        "Smart Parking Guidance System (SPGS) with dynamic LED occupancy display boards at city entries"
      ],
      indicators: {
        avg_travel_time_min: 13.8,
        avg_speed_kmh: 21.2,
        junction_delay_sec: 52,
        peak_queue_length_m: 140,
        throughput_pcu_hr: 22600,
        network_congestion_index: 38,
        transit_mode_share_pct: 8.5,
        active_mobility_share_pct: 12.0,
        co2_emissions_tonnes_day: 33.2,
        fuel_consumption_kl_day: 15.4,
        annual_fatalities: 6,
        serious_injuries: 22,
        los_distribution: { A: 22, B: 42, C: 26, D: 8, E: 2, F: 0 }
      },
      benefits: "44% travel time cut, eliminated F-level junction service, dedicated freight bypass saving municipal roads."
    },
    {
      id: "scenario_c",
      code: "Scenario C",
      name: "Smart & Sustainable Urban Mobility (ITMS + Green Transit)",
      nameTe: "స్మార్ట్ & స్థిరమైన మొబిలిటీ వ్యవస్థ (ITMS & గ్రీన్ ట్రాన్స్‌పోర్ట్)",
      capex_cr: 64.5,
      opex_annual_cr: 5.8,
      implementation_time_months: 36,
      focus: "Intelligent Transportation Systems (ITMS), adaptive AI camera signal control, 100% electric municipal transit mini-buses, segregated cycle tracks, complete pedestrian streets.",
      interventions: [
        "All Scenario A & B measures plus Centralized Smart Traffic Command Center (ITMS) with AI adaptive signals",
        "Deployment of 24 Electric Mini-Buses (9m e-Buses) operating 4 high-frequency circular feeder routes every 8-10 mins",
        "Yenamadurru Canal Bund 5.4 km Segregated Green Mobility Corridor (paved cycle tracks, e-rickshaw lane, pedestrian promenade)",
        "Pedestrianization of Main Bazaar / Someswaram Heritage Street with automated bollards and zero-emission delivery buggies",
        "Integrated Multimodal Mobility Hubs at Bhimavaram Town Station and Railway Junction with EV charging plazas",
        "Automated Number Plate Recognition (ANPR) red-light and speed enforcement network across 18 municipal crossroads",
        "Real-Time Passenger Information System (PIS) with mobile transit app and QR ticketing"
      ],
      indicators: {
        avg_travel_time_min: 10.5,
        avg_speed_kmh: 26.5,
        junction_delay_sec: 32,
        peak_queue_length_m: 85,
        throughput_pcu_hr: 26800,
        network_congestion_index: 22,
        transit_mode_share_pct: 19.4,
        active_mobility_share_pct: 18.5,
        co2_emissions_tonnes_day: 22.4,
        fuel_consumption_kl_day: 10.2,
        annual_fatalities: 2,
        serious_injuries: 8,
        los_distribution: { A: 48, B: 38, C: 12, D: 2, E: 0, F: 0 }
      },
      benefits: "58% travel time cut, 54% CO2 reduction, zero road fatalities vision, world-class smart city mobility standards."
    }
  ],

  // 7. ONE-WAY SYSTEM & CIRCULATION SCHEME (Before vs After)
  circulation_plan: {
    one_way_loops: [
    {
        "id": "LOOP-01",
        "name": "Central Commercial One-Way Pair (P.P. Road & Gandhi Road)",
        "nameTe": "సెంట్రల్ వన్-వే లూప్ (పి.పి. రోడ్ సౌత్‌బౌండ్ & గాంధీ రోడ్ నార్త్‌బౌండ్)",
        "direction_pp_road": "One-Way Southbound (North -> South from Old Bus Stand towards Prakasham Chowk)",
        "direction_gandhi_road": "One-Way Northbound (South -> North from Town Station towards Old Bus Stand)",
        "length_km": 2.65,
        "width_effective_gain_m": 3.2,
        "capacity_gain_pct": 42,
        "loop_coords": [
            [
                16.5448,
                81.5235
            ],
            [
                16.5432,
                81.5242
            ],
            [
                16.542,
                81.5265
            ],
            [
                16.5442,
                81.5275
            ],
            [
                16.5448,
                81.5235
            ]
        ],
        "entry_points": [
            "Old Bus Stand Junction (North)",
            "Rest House Road Intersection",
            "Kovvada Road Intersection"
        ],
        "exit_points": [
            "Prakasham Chowk (South)",
            "Town Station Connector",
            "Tanuku Road Fork"
        ],
        "emergency_access": "Dedicated 3.0m contra-flow / prioritized emergency vehicle lane delineated by mountable flexible kerb delineators",
        "transit_routing": "City feeder buses follow one-way loop with clockwise bus shelters every 350m",
        "congestion_transfer_mitigation": "Parallel lanes on Gandhi Road resurfaced and encroaching parked vehicles relocated to new MLCP"
    },
    {
        "id": "LOOP-02",
        "name": "Town Railway Station Circulating Loop",
        "nameTe": "టౌన్ రైల్వే స్టేషన్ సర్క్యులేషన్ లూప్",
        "direction": "Clockwise One-Way Entry via Station Feeder Road -> Egress via Rest House Link",
        "capacity_gain_pct": 36.5,
        "loop_coords": [
            [
                16.5455,
                81.516
            ],
            [
                16.5435,
                81.517
            ],
            [
                16.5416,
                81.5155
            ],
            [
                16.542,
                81.5205
            ],
            [
                16.5452,
                81.5195
            ],
            [
                16.5455,
                81.516
            ]
        ],
        "emergency_access": "Direct unimpeded 24/7 ambulance lane to Govt Area Hospital"
    }
]
  },

  // 8. PARKING & COMMERCIAL FREIGHT AUDIT
  parking_logistics: {
    total_on_street_spaces_current: 2450,
    illegal_parking_rate_pct: 62.4,
    parking_demand_pcu_peak: 4820,
    parking_supply_deficit_pct: 48.5,
    auto_rickshaw_stands_unauthorized: 28,
    authorized_auto_stands: 6,
    proposed_facilities: [
      {
        id: "PK-01",
        name: "Prakasham Chowk & Underpass South Municipal Multi-Level Parking (MLCP)",
        nameTe: "ప్రకాశం చౌక్ & అండర్‌పాస్ సౌత్ మల్టీ లెవల్ కార్ పార్కింగ్ (G+4)",
        ward: 20,
        ward_name: "B.T. Center & Railway West",
        coords: [16.5428, 81.5245],
        category: "mlcp",
        type: "Multi-Level Automated & Ramp Facility (G+4)",
        capacity_cars: 250,
        capacity_tw: 800,
        ev_chargers: 16,
        cost_cr: 11.2,
        fee_structure: "Pay & Park (₹10/hr 2W, ₹20/hr Car)",
        pay_and_park: true,
        smart_sensors: true
      },
      {
        id: "PK-02",
        name: "Old Bus Stand & B.T. Market Municipal Commercial Parking Complex",
        nameTe: "పాత బస్టాండ్ & బి.టి. మార్కెట్ మున్సిపల్ కమర్షియల్ పార్కింగ్",
        ward: 20,
        ward_name: "B.T. Center & Railway West",
        coords: [16.5424, 81.5253],
        category: "commercial",
        type: "Basement + Multi-Tier Surface Lot",
        capacity_cars: 180,
        capacity_tw: 650,
        ev_chargers: 12,
        cost_cr: 7.8,
        fee_structure: "Pay & Park (₹10/hr 2W, ₹20/hr Car)",
        pay_and_park: true,
        smart_sensors: true
      },
      {
        id: "PK-03",
        name: "Bhimavaram Town Railway Station Commuter Parking Yard",
        nameTe: "భీమవరం టౌన్ రైల్వే స్టేషన్ కమ్యూటర్ పార్కింగ్ యార్డ్",
        ward: 37,
        ward_name: "Bhimavaram Town Railway Station Environs",
        coords: [16.5450, 81.5165],
        category: "railway",
        type: "SCR Railway Station Commuter Surface Parking",
        capacity_cars: 90,
        capacity_tw: 750,
        ev_chargers: 8,
        cost_cr: 2.1,
        fee_structure: "Railway Regulated (Daily/Monthly Passes)",
        pay_and_park: true,
        smart_sensors: true
      },
      {
        id: "PK-04",
        name: "APSRTC Regional Bus Station Public Parking Complex",
        nameTe: "ఆర్టీసీ బస్ స్టేషన్ కాంప్లెక్స్ పబ్లిక్ పార్కింగ్ భవనం",
        ward: 24,
        ward_name: "S.P. Road East & Mission Compound West",
        coords: [16.5382, 81.5258],
        category: "transit",
        type: "APSRTC Sheltered 24x7 Intermodal Parking",
        capacity_cars: 120,
        capacity_tw: 900,
        ev_chargers: 14,
        cost_cr: 3.5,
        fee_structure: "APSRTC Transit Tariffs",
        pay_and_park: true,
        smart_sensors: true
      },
      {
        id: "PK-05",
        name: "Bhimavaram Railway Junction (East & West Forecourt) Parking Plazas",
        nameTe: "భీమవరం రైల్వే జంక్షన్ ఫోర్‌కోర్ట్ కార్ & బైక్ పార్కింగ్ ప్లాజా",
        ward: 10,
        ward_name: "Bhimavaram Railway Junction Area",
        coords: [16.5423, 81.5368],
        category: "railway",
        type: "SCR Railway Junction Forecourt Parking",
        capacity_cars: 150,
        capacity_tw: 850,
        ev_chargers: 10,
        cost_cr: 2.8,
        fee_structure: "Railway Tariffs",
        pay_and_park: true,
        smart_sensors: true
      },
      {
        id: "PK-06",
        name: "Bhimavaram Municipal Office & Sub-Court Civic Parking Complex",
        nameTe: "మున్సిపల్ కార్యాలయం & కోర్టు కాంప్లెక్స్ సివిక్ పార్కింగ్",
        ward: 28,
        ward_name: "Municipal Office & Rest House Road",
        coords: [16.5373, 81.5194],
        category: "civic",
        type: "Civic Administration Staff & Public Parking Yard",
        capacity_cars: 85,
        capacity_tw: 420,
        ev_chargers: 6,
        cost_cr: 1.8,
        fee_structure: "Free Civic / Public Access",
        pay_and_park: false,
        smart_sensors: false
      },
      {
        id: "PK-07",
        name: "Sri Someswara Swamy (Somaramam) Pancharama Temple Pilgrim Parking",
        nameTe: "శ్రీ సోమేశ్వర స్వామి పంచారామ దేవస్థానం యాత్రికుల పార్కింగ్",
        ward: 16,
        ward_name: "Sri Someswara Swamy Temple (Somaramam)",
        coords: [16.5408, 81.5309],
        category: "pilgrim",
        type: "Devasthanam Mandapam Open Pilgrim Parking Lot",
        capacity_cars: 110,
        capacity_tw: 600,
        ev_chargers: 6,
        cost_cr: 2.2,
        fee_structure: "Free Pilgrim / Devasthanam Managed",
        pay_and_park: false,
        smart_sensors: false
      },
      {
        id: "PK-08",
        name: "DNR College Educational Zone Student & Staff Parking Bay",
        nameTe: "డి.ఎన్.ఆర్ కళాశాల విద్యా జోన్ విద్యార్థి & సిబ్బంది పార్కింగ్",
        ward: 29,
        ward_name: "D.N.R. College & Rayalam Border",
        coords: [16.5295, 81.5152],
        category: "institutional",
        type: "Campus Internal & Off-Street Two-Wheeler Bay",
        capacity_cars: 60,
        capacity_tw: 1200,
        ev_chargers: 8,
        cost_cr: 1.5,
        fee_structure: "Institutional Permit",
        pay_and_park: false,
        smart_sensors: false
      },
      {
        id: "PK-09",
        name: "Gunupudi Wholesale Vegetable & Fish Market Yard Parking",
        nameTe: "గునుపూడి హోల్‌సేల్ మార్కెట్ సరుకు వాహనాలు & కొనుగోలుదారుల పార్కింగ్",
        ward: 18,
        ward_name: "Railway South & BT Market East",
        coords: [16.5433, 81.5315],
        category: "market",
        type: "Market Freight & Commercial Buyer Loading/Parking Yard",
        capacity_cars: 50,
        capacity_tw: 450,
        ev_chargers: 4,
        cost_cr: 2.4,
        fee_structure: "Market Committee Tariffs",
        pay_and_park: true,
        smart_sensors: false
      },
      {
        id: "PK-10",
        name: "Sunday Santha (Weekly Market) Municipal Ground Parking",
        nameTe: "ఆదివారం సంత మైదానం మున్సిపల్ పార్కింగ్",
        ward: 21,
        ward_name: "Govt. Hospital & Town Station South",
        coords: [16.5423, 81.5204],
        category: "market",
        type: "Municipal Open Santha Ground Parking",
        capacity_cars: 70,
        capacity_tw: 700,
        ev_chargers: 4,
        cost_cr: 1.2,
        fee_structure: "Weekly Market Fee",
        pay_and_park: true,
        smart_sensors: false
      },
      {
        id: "PK-11",
        name: "Alluri Sitarama Raju Hall & Medical Enclave Visitor Parking",
        nameTe: "అల్లూరి సీతారామరాజు హాల్ & ఆసుపత్రి సందర్శకుల పార్కింగ్",
        ward: 33,
        ward_name: "Alluri Sitarama Raju Hall (ASR Hall)",
        coords: [16.5416, 81.5155],
        category: "hospital",
        type: "Hospital & Community Hall Off-Street Parking",
        capacity_cars: 80,
        capacity_tw: 350,
        ev_chargers: 6,
        cost_cr: 1.6,
        fee_structure: "Pay & Park (Hospital Concessional)",
        pay_and_park: true,
        smart_sensors: false
      },
      {
        id: "PK-12",
        name: "SRKR Engineering College / Chinna Amiram Student Parking Lot",
        nameTe: "ఎస్.ఆర్.కె.ఆర్ ఇంజనీరింగ్ కాలేజ్ విద్యార్థుల పార్కింగ్ యార్డ్",
        ward: 35,
        ward_name: "S.N. Puram & China Amiram Border",
        coords: [16.5479, 81.5021],
        category: "institutional",
        type: "Technical Campus Multi-Bay Parking",
        capacity_cars: 100,
        capacity_tw: 1400,
        ev_chargers: 10,
        cost_cr: 2.0,
        fee_structure: "Campus Pass",
        pay_and_park: false,
        smart_sensors: false
      },
      {
        id: "PK-13",
        name: "Sri Mavullamma Ammavari Temple Pilgrim Parking Lot",
        nameTe: "శ్రీ మావుళ్ళమ్మ అమ్మవారి దేవస్థానం యాత్రికుల పార్కింగ్ లాట్",
        ward: 27,
        ward_name: "S.P. Road Strip & R.H. Road East",
        coords: [16.5366, 81.5225],
        category: "pilgrim",
        type: "Devasthanam Pilgrim & Festival Parking Grounds",
        capacity_cars: 120,
        capacity_tw: 850,
        ev_chargers: 8,
        cost_cr: 2.5,
        fee_structure: "Temple Devasthanam Free Lot",
        pay_and_park: false,
        smart_sensors: false
      },
      {
        id: "PK-14",
        name: "P.P. Road North & Kovvada Link Collector Parking Bay",
        nameTe: "పి.పి. రోడ్ నార్త్ & కొవ్వాడ లింక్ కలెక్టర్ పార్కింగ్ బే",
        ward: 36,
        ward_name: "P.P. Road North & Kovvada Border West",
        coords: [16.5472, 81.5096],
        category: "commercial",
        type: "Collector Road Standardized Diagonal Parking Bay",
        capacity_cars: 40,
        capacity_tw: 280,
        ev_chargers: 4,
        cost_cr: 0.9,
        fee_structure: "Municipal Regulated Pay & Park",
        pay_and_park: true,
        smart_sensors: false
      }
    ],

    // Designated Sheltered Auto-Rickshaw Stands
    designated_auto_stands: [
      {
        id: "AS-01",
        name: "Town Railway Station Sheltered Auto Terminal",
        nameTe: "టౌన్ రైల్వే స్టేషన్ ఆటో పిక్-అప్ టెర్మినల్ (షెల్టర్డ్)",
        ward: 37,
        coords: [16.5452, 81.5162],
        capacity_autos: 40,
        bays: 4,
        passenger_queues: true
      },
      {
        id: "AS-02",
        name: "APSRTC Complex In-Depot Auto Terminal",
        nameTe: "ఆర్టీసీ బస్టాండ్ కాంప్లెక్స్ ఇంటర్నల్ ఆటో బేలు",
        ward: 24,
        coords: [16.5385, 81.5262],
        capacity_autos: 60,
        bays: 5,
        passenger_queues: true
      },
      {
        id: "AS-03",
        name: "Bhimavaram Railway Junction Forecourt Auto Stand",
        nameTe: "రైల్వే జంక్షన్ స్టేషన్ ఫోర్‌కోర్ట్ ఆటో స్టాండ్",
        ward: 10,
        coords: [16.5425, 81.5372],
        capacity_autos: 50,
        bays: 4,
        passenger_queues: true
      },
      {
        id: "AS-04",
        name: "Old Bus Stand Gandhi Statue Organized Auto Bay",
        nameTe: "పాత బస్టాండ్ గాంధీ విగ్రహం ఆటో బే",
        ward: 20,
        coords: [16.5420, 81.5250],
        capacity_autos: 35,
        bays: 3,
        passenger_queues: true
      },
      {
        id: "AS-05",
        name: "DNR College Main Gate Student Auto Bay",
        nameTe: "డి.ఎన్.ఆర్ కళాశాల ముఖద్వారం ఆటో డ్రాప్ బే",
        ward: 29,
        coords: [16.5300, 81.5150],
        capacity_autos: 30,
        bays: 3,
        passenger_queues: false
      },
      {
        id: "AS-06",
        name: "Sri Someswara Swamy Temple Pilgrim Auto Stand",
        nameTe: "సోమేశ్వర స్వామి దేవస్థానం యాత్రికుల ఆటో స్టాండ్",
        ward: 16,
        coords: [16.5412, 81.5305],
        capacity_autos: 25,
        bays: 2,
        passenger_queues: false
      }
    ],

    // Strict No-Parking Corridors (Tow-Away Zones)
    enforced_no_parking_corridors: [
      {
        id: "NP-01",
        name: "Main Bazaar Heritage Retail Corridor (Somaramam to BT Center)",
        nameTe: "మెయిన్ బజార్ హెరిటేజ్ వీధి (నో-పార్కింగ్ / టో-అవే జోన్)",
        ward: 16,
        coords: [16.5415, 81.5290],
        length_m: 650,
        regulation: "100% Pedestrian Priority - All Motorized Parking Banned 09:00 - 21:00"
      },
      {
        id: "NP-02",
        name: "Prakasham Underpass 50m Approach Throat on all 5 arms",
        nameTe: "ప్రకాశం చౌక్ అండర్‌పాస్ 50 మీ. అప్రోచ్ (నో-స్టాపింగ్ జోన్)",
        ward: 20,
        coords: [16.5428, 81.5238],
        length_m: 100,
        regulation: "Strict Zero Stopping / Clear Flow for Underpass Vehicles"
      },
      {
        id: "NP-03",
        name: "Rest House Road Commercial Curve & Bank Zone",
        nameTe: "రెస్ట్ హౌస్ రోడ్ వాణిజ్య మలుపు (నో-కెర్బ్‌సైడ్ పార్కింగ్)",
        ward: 28,
        coords: [16.5370, 81.5215],
        length_m: 250,
        regulation: "No Double Parking; Divert to Municipal Compound Lot"
      },
      {
        id: "NP-04",
        name: "Alluri Hospital Emergency Ambulance Access Corridor",
        nameTe: "అల్లూరి ఆసుపత్రి ఎమర్జెన్సీ అంబులెన్స్ కారిడార్",
        ward: 33,
        coords: [16.5418, 81.5158],
        length_m: 200,
        regulation: "24x7 Silent / Zero Obstruction Emergency Green Corridor"
      }
    ],
    freight_corridors: {
      heavy_truck_curfew_hours: "08:00 - 12:00 AM & 16:30 - 20:30 PM",
      designated_bypass_corridor: "NH-165 Outer Bypass to Gollavanitippa / Industrial Estate via Digamarru Spur",
      consolidation_hubs: [
        { name: "Tadepalligudem Road Logistics Park", area_acres: 12.5, coords: [16.5680, 81.5450] },
        { name: "South Aquaculture Cold-Chain Freight Terminal", area_acres: 8.0, coords: [16.5250, 81.5200] }
      ]
    }
  },

  // 9. PUBLIC TRANSPORT & MULTIMODAL MOBILITY
  public_transport: {
    existing_apsrtc_routes: [
      { id: "AP-01", name: "Bhimavaram Bus Stand - Palakollu", trips_day: 48, fleet: 8 },
      { id: "AP-02", name: "Bhimavaram Bus Stand - Tadepalligudem", trips_day: 56, fleet: 10 },
      { id: "AP-03", name: "Bhimavaram Bus Stand - Narsapuram", trips_day: 36, fleet: 6 },
      { id: "AP-04", name: "Bhimavaram Bus Stand - Undi / Akividu", trips_day: 32, fleet: 5 }
    ],
    proposed_electric_feeder_loops: [
    {
        "id": "EB-01",
        "name": "Green Loop 1: Town Station - DNR College - S.N. Puram Circular",
        "nameTe": "గ్రీన్ లూప్ 1: టౌన్ స్టేషన్ - డి.ఎన్.ఆర్ కాలేజ్ - ఎస్.ఎన్. పురం సర్క్యులర్",
        "length_km": 7.2,
        "headway_min": 8,
        "fleet_ebuses": 6,
        "stops": 14,
        "color": "#06b6d4",
        "route_coords": [
            [
                16.5455,
                81.516
            ],
            [
                16.5416,
                81.5155
            ],
            [
                16.5348,
                81.5155
            ],
            [
                16.532,
                81.516
            ],
            [
                16.5348,
                81.5155
            ],
            [
                16.5395,
                81.5065
            ],
            [
                16.546,
                81.499
            ],
            [
                16.5472,
                81.5096
            ],
            [
                16.5455,
                81.516
            ]
        ]
    },
    {
        "id": "EB-02",
        "name": "Green Loop 2: Railway Junction - APSRTC Complex - P.P. Road Circular",
        "nameTe": "గ్రీన్ లూప్ 2: రైల్వే జంక్షన్ - ఆర్టీసీ కాంప్లెక్స్ - పి.పి. రోడ్ సర్క్యులర్",
        "length_km": 6.8,
        "headway_min": 10,
        "fleet_ebuses": 6,
        "stops": 12,
        "color": "#10b981",
        "route_coords": [
            [
                16.5423,
                81.5368
            ],
            [
                16.5433,
                81.532
            ],
            [
                16.5415,
                81.5285
            ],
            [
                16.5366,
                81.5225
            ],
            [
                16.5432,
                81.5242
            ],
            [
                16.5448,
                81.5235
            ],
            [
                16.5442,
                81.5275
            ],
            [
                16.5423,
                81.5368
            ]
        ]
    },
    {
        "id": "EB-03",
        "name": "Green Loop 3: Balusumoodi - SRKR College - J.P. Road Corridor",
        "nameTe": "గ్రీన్ లూప్ 3: బలుసుమూడి - ఎస్.ఆర్.కె.ఆర్ కాలేజ్ - జేపీ రోడ్ కారిడార్",
        "length_km": 8.5,
        "headway_min": 10,
        "fleet_ebuses": 6,
        "stops": 16,
        "color": "#f59e0b",
        "route_coords": [
            [
                16.5348,
                81.5155
            ],
            [
                16.538,
                81.511
            ],
            [
                16.5395,
                81.5065
            ],
            [
                16.5408,
                81.503
            ],
            [
                16.546,
                81.499
            ],
            [
                16.5472,
                81.5096
            ],
            [
                16.5455,
                81.516
            ],
            [
                16.5416,
                81.5155
            ],
            [
                16.5348,
                81.5155
            ]
        ]
    },
    {
        "id": "EB-04",
        "name": "Green Loop 4: Yenamadurru Canal Bund Express Feeder",
        "nameTe": "గ్రీన్ లూప్ 4: ఎనమదుర్రు కెనాల్ బండ్ ఎక్స్‌ప్రెస్ ఫీడర్",
        "length_km": 5.6,
        "headway_min": 12,
        "fleet_ebuses": 4,
        "stops": 10,
        "color": "#8b5cf6",
        "route_coords": [
            [
                16.568,
                81.525
            ],
            [
                16.561,
                81.5248
            ],
            [
                16.5547,
                81.5246
            ],
            [
                16.5476,
                81.5235
            ],
            [
                16.542,
                81.5225
            ],
            [
                16.536,
                81.5218
            ],
            [
                16.528,
                81.521
            ]
        ]
    }
],
    multimodal_mobility_hubs: [
    {
        "name": "Town Station Multimodal Mobility Hub",
        "nameTe": "టౌన్ స్టేషన్ మల్టీమోడల్ మొబిలిటీ హబ్",
        "interchange_type": "Rail-Bus-Auto-EV-Cycle",
        "coords": [
            16.5455,
            81.516
        ],
        "daily_footfall": 24000
    },
    {
        "name": "Bhimavaram Junction Interchange Hub",
        "nameTe": "భీమవరం జంక్షన్ ఇంటర్‌ఛేంజ్ హబ్",
        "interchange_type": "Rail-Express Bus-Auto-Taxi",
        "coords": [
            16.5423,
            81.5368
        ],
        "daily_footfall": 19500
    },
    {
        "name": "APSRTC Bus Station Mobility Hub",
        "nameTe": "ఆర్టీసీ బస్ స్టేషన్ మొబిలిటీ హబ్",
        "interchange_type": "Regional Bus-City eBus-Auto",
        "coords": [
            16.5415,
            81.5285
        ],
        "daily_footfall": 31000
    }
]
  },

  // 10. ENVIRONMENTAL EMISSIONS & AIR QUALITY ASSESSMENT
  environmental_impact: {
    pollutant_factors: {
      co2: { tw: 42.5, auto: 88.0, car: 145.0, bus: 680.0, hgv: 820.0, lcv: 210.0 }, // g/km
      nox: { tw: 0.18, auto: 0.42, car: 0.35, bus: 4.80, hgv: 6.50, lcv: 0.95 },      // g/km
      pm25: { tw: 0.015, auto: 0.045, car: 0.025, bus: 0.38, hgv: 0.52, lcv: 0.08 },   // g/km
      pm10: { tw: 0.035, auto: 0.095, car: 0.055, bus: 0.72, hgv: 0.98, lcv: 0.16 },   // g/km
      idling_co2_g_per_min: { tw: 8.5, auto: 18.0, car: 28.0, bus: 95.0, hgv: 110.0 }
    },
    scenario_comparison: [
      { scenario: "Baseline (Current)", co2_tonnes_yr: 17739, nox_tonnes_yr: 114.2, pm25_tonnes_yr: 7.82, pm10_tonnes_yr: 14.65, fuel_kl_yr: 8322, economic_loss_delay_cr_yr: 48.5 },
      { scenario: "Scenario A (Operational)", co2_tonnes_yr: 14527, nox_tonnes_yr: 91.5, pm25_tonnes_yr: 6.12, pm10_tonnes_yr: 11.48, fuel_kl_yr: 6789, economic_loss_delay_cr_yr: 28.2 },
      { scenario: "Scenario B (Network)", co2_tonnes_yr: 12118, nox_tonnes_yr: 74.8, pm25_tonnes_yr: 4.95, pm10_tonnes_yr: 9.22, fuel_kl_yr: 5621, economic_loss_delay_cr_yr: 16.5 },
      { scenario: "Scenario C (Smart/Green)", co2_tonnes_yr: 8176, nox_tonnes_yr: 46.2, pm25_tonnes_yr: 2.85, pm10_tonnes_yr: 5.38, fuel_kl_yr: 3723, economic_loss_delay_cr_yr: 7.2 }
    ]
  },

  // 11. WARD-WISE TRAFFIC CONGESTION RANKING (Across all wards)
  ward_congestion_ranking: [
    { ward: 37, rank: 1, score: 94, category: "Extreme", nameEn: "Bhimavaram Town Railway Station Environs", nameTe: "భీమవరం టౌన్ రైల్వే స్టేషన్ పరిసరాలు", road_km: 4.8, hotspots: 2, avg_speed: 7.5, parking_deficit: "Severe", safety_risk: "High", priority: "Immediate Tier-1" },
    { ward: 16, rank: 2, score: 91, category: "Extreme", nameEn: "Sri Someswara Swamy Temple (Somaramam)", nameTe: "శ్రీ సోమేశ్వర స్వామి దేవస్థానం", road_km: 3.9, hotspots: 1, avg_speed: 6.2, parking_deficit: "Severe", safety_risk: "High", priority: "Immediate Tier-1" },
    { ward: 20, rank: 3, score: 88, category: "Extreme", nameEn: "B.T. Center & Railway West", nameTe: "బి.టి. సెంటర్ & రైల్వే వెస్ట్", road_km: 4.2, hotspots: 2, avg_speed: 8.8, parking_deficit: "Severe", safety_risk: "High", priority: "Immediate Tier-1" },
    { ward: 28, rank: 4, score: 85, category: "High", nameEn: "Municipal Office & Rest House Road", nameTe: "మున్సిపల్ కార్యాలయం & రెస్ట్ హౌస్ రోడ్", road_km: 5.1, hotspots: 2, avg_speed: 10.0, parking_deficit: "High", safety_risk: "Moderate", priority: "Immediate Tier-1" },
    { ward: 29, rank: 5, score: 82, category: "High", nameEn: "D.N.R. College & Rayalam Border", nameTe: "డి.ఎన్.ఆర్ కళాశాల & రాయలం సరిహద్దు", road_km: 6.2, hotspots: 1, avg_speed: 11.5, parking_deficit: "High", safety_risk: "High", priority: "Tier-2" },
    { ward: 34, rank: 6, score: 79, category: "High", nameEn: "Juvvalapalem Road (J.P. Road)", nameTe: "జువ్వలపాలెం రోడ్ (జేపీ రోడ్)", road_km: 5.8, hotspots: 1, avg_speed: 12.8, parking_deficit: "Moderate", safety_risk: "Moderate", priority: "Tier-2" },
    { ward: 3, rank: 7, score: 77, category: "High", nameEn: "Railway Fork & Nidadavole Road", nameTe: "రైల్వే ఫోర్క్ & నిడదవోలు రోడ్", road_km: 4.5, hotspots: 1, avg_speed: 8.5, parking_deficit: "Moderate", safety_risk: "High", priority: "Tier-2" },
    { ward: 18, rank: 8, score: 76, category: "High", nameEn: "Railway South & BT Market East", nameTe: "రైల్వే సౌత్ & బిటి మార్కెట్ ఈస్ట్", road_km: 3.8, hotspots: 1, avg_speed: 7.2, parking_deficit: "Severe", safety_risk: "Moderate", priority: "Tier-2" },
    { ward: 1, rank: 9, score: 72, category: "Moderate", nameEn: "Govindarao Nagar North & Yanamadurru Drain East", nameTe: "గోవిందరావు నగర్ నార్త్ & ఎనమదుర్రు డ్రెయిన్", road_km: 7.1, hotspots: 1, avg_speed: 18.0, parking_deficit: "Low", safety_risk: "Moderate", priority: "Tier-3" },
    { ward: 10, rank: 10, score: 70, category: "Moderate", nameEn: "Bhimavaram Railway Junction Area", nameTe: "భీమవరం రైల్వే జంక్షన్ ప్రాంతం", road_km: 5.4, hotspots: 1, avg_speed: 12.5, parking_deficit: "High", safety_risk: "Moderate", priority: "Tier-2" },
    { ward: 35, rank: 11, score: 68, category: "Moderate", nameEn: "S.N. Puram & China Amiram Border", nameTe: "ఎస్.ఎన్. పురం & చిన అమిరం", road_km: 6.5, hotspots: 1, avg_speed: 15.2, parking_deficit: "Moderate", safety_risk: "Moderate", priority: "Tier-3" },
    { ward: 6, rank: 12, score: 67, category: "Moderate", nameEn: "Industrial Estate & Palakollu Road", nameTe: "ఇండస్ట్రియల్ ఎస్టేట్ & పాలకొల్లు రోడ్", road_km: 6.9, hotspots: 1, avg_speed: 11.8, parking_deficit: "Low", safety_risk: "High", priority: "Tier-2" },
    { ward: 21, rank: 13, score: 65, category: "Moderate", nameEn: "Govt. Hospital & Town Station South", nameTe: "ప్రభుత్వ ఆసుపత్రి & టౌన్ స్టేషన్ సౌత్", road_km: 4.1, hotspots: 1, avg_speed: 8.2, parking_deficit: "Severe", safety_risk: "Moderate", priority: "Tier-2" },
    { ward: 32, rank: 14, score: 63, category: "Moderate", nameEn: "Rayalam Road North & Juvvalapalem Road South", nameTe: "రాయలం రోడ్ నార్త్ & జేపీ రోడ్", road_km: 4.8, hotspots: 1, avg_speed: 13.5, parking_deficit: "Moderate", safety_risk: "Low", priority: "Tier-3" },
    { ward: 33, rank: 15, score: 61, category: "Moderate", nameEn: "Alluri Sitarama Raju Hall (ASR Hall)", nameTe: "అల్లూరి సీతారామరాజు హాల్ ప్రాంతం", road_km: 4.2, hotspots: 1, avg_speed: 14.8, parking_deficit: "Moderate", safety_risk: "Moderate", priority: "Tier-3" },
    { ward: 26, rank: 16, score: 59, category: "Low-Moderate", nameEn: "Bank Colony & K.G.R.L. College", nameTe: "బ్యాంక్ కాలనీ & కె.జి.ఆర్.ఎల్ కాలేజ్", road_km: 4.7, hotspots: 1, avg_speed: 14.5, parking_deficit: "Moderate", safety_risk: "Low", priority: "Tier-3" },
    { ward: 12, rank: 17, score: 58, category: "Low-Moderate", nameEn: "Bridge Peta & Taderu Border", nameTe: "బ్రిడ్జి పేట & తాడేరు సరిహద్దు", road_km: 5.2, hotspots: 1, avg_speed: 13.8, parking_deficit: "Low", safety_risk: "Moderate", priority: "Tier-3" },
    { ward: 4, rank: 18, score: 56, category: "Low-Moderate", nameEn: "ARKR High School & Tanuku Road West", nameTe: "ఎ.ఆర్.కె.ఆర్ ఉన్నత పాఠశాల పరిసరాలు", road_km: 4.9, hotspots: 1, avg_speed: 14.5, parking_deficit: "Moderate", safety_risk: "Low", priority: "Tier-3" },
    { ward: 27, rank: 19, score: 55, category: "Low-Moderate", nameEn: "S.P. Road Strip & R.H. Road East", nameTe: "ఎస్.పి. రోడ్ & ఆర్.హెచ్. రోడ్ తూర్పు", road_km: 3.5, hotspots: 1, avg_speed: 11.2, parking_deficit: "High", safety_risk: "Moderate", priority: "Tier-2" },
    { ward: 19, rank: 20, score: 54, category: "Low-Moderate", nameEn: "B.N. Road Central & Cloth Market", nameTe: "బి.ఎన్. రోడ్ & క్లాత్ మార్కెట్", road_km: 3.2, hotspots: 0, avg_speed: 9.5, parking_deficit: "Severe", safety_risk: "Low", priority: "Tier-3" },
    { ward: 2, rank: 21, score: 51, category: "Low", nameEn: "Govindarao Nagar & M. Thota", nameTe: "గోవిందరావు నగర్ & ఎం. తోట", road_km: 4.4, hotspots: 0, avg_speed: 16.2, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 5, rank: 22, score: 49, category: "Low", nameEn: "Ag. Market & Narasayya Agraharam", nameTe: "అగ్రికల్చరల్ మార్కెట్ & నరసయ్య అగ్రహారం", road_km: 5.6, hotspots: 0, avg_speed: 17.5, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 7, rank: 23, score: 47, category: "Low", nameEn: "Maruthi Nagar & Ashramam", nameTe: "మారుతీ నగర్ & ఆశ్రమం", road_km: 4.8, hotspots: 0, avg_speed: 18.2, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 8, rank: 24, score: 45, category: "Low", nameEn: "Chinna Ranga Palem (CH.R. Palem)", nameTe: "చిన రంగా పాలెం", road_km: 4.2, hotspots: 0, avg_speed: 18.5, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 9, rank: 25, score: 44, category: "Low", nameEn: "A.P. Housing Board Colony (APHB Colony)", nameTe: "ఎ.పి. హౌసింగ్ బోర్డు కాలనీ", road_km: 5.5, hotspots: 0, avg_speed: 19.0, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 11, rank: 26, score: 43, category: "Low", nameEn: "Vasantala vari Veedhi & Gandhinagar", nameTe: "వసంతాల వారి వీధి & గాంధీనగర్", road_km: 3.8, hotspots: 0, avg_speed: 16.8, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 13, rank: 27, score: 42, category: "Low", nameEn: "Amminaju Thota Channel & South Central", nameTe: "అమ్మినాజు తోట ఛానల్ ప్రాంతం", road_km: 4.0, hotspots: 0, avg_speed: 17.0, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 14, rank: 28, score: 41, category: "Low", nameEn: "Mission Hospital North Environs", nameTe: "మిషన్ హాస్పిటల్ ఉత్తర పరిసరాలు", road_km: 3.7, hotspots: 0, avg_speed: 17.2, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 15, rank: 29, score: 40, category: "Low", nameEn: "Mission Hospital & Amminaju Thota North", nameTe: "మిషన్ హాస్పిటల్ & అమ్మినాజు తోట నార్త్", road_km: 3.9, hotspots: 0, avg_speed: 17.5, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 17, rank: 30, score: 39, category: "Low", nameEn: "Siva Temple East & Junction Road", nameTe: "శివాలయం తూర్పు & జంక్షన్ రోడ్", road_km: 3.6, hotspots: 0, avg_speed: 17.0, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 22, rank: 31, score: 38, category: "Low", nameEn: "Govt Hospital South & B.N. Road Link", nameTe: "ప్రభుత్వ ఆసుపత్రి దక్షిణ భాగం", road_km: 3.4, hotspots: 0, avg_speed: 16.5, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 23, rank: 32, score: 37, category: "Low", nameEn: "B.N. Road & S.P. Road Junction", nameTe: "బి.ఎన్. రోడ్ & ఎస్.పి. రోడ్ జంక్షన్", road_km: 3.5, hotspots: 0, avg_speed: 17.2, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 24, rank: 33, score: 36, category: "Low", nameEn: "S.P. Road East & Mission Compound West", nameTe: "ఎస్.పి. రోడ్ తూర్పు & మిషన్ కాంపౌండ్", road_km: 3.6, hotspots: 0, avg_speed: 17.8, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 25, rank: 34, score: 35, category: "Low", nameEn: "S.P. Road South & Mission Hospital SW", nameTe: "ఎస్.పి. రోడ్ దక్షిణ & మిషన్ ఆసుపత్రి నైరుతి", road_km: 3.8, hotspots: 0, avg_speed: 18.0, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 30, rank: 35, score: 34, category: "Low", nameEn: "Rayalam Road & DNR College North", nameTe: "రాయలం రోడ్ & డి.ఎన్.ఆర్ ఉత్తరం", road_km: 4.1, hotspots: 0, avg_speed: 18.5, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 31, rank: 36, score: 33, category: "Low", nameEn: "Rayalam Border South-West", nameTe: "రాయలం బోర్డర్ నైరుతి ప్రాంతం", road_km: 4.5, hotspots: 0, avg_speed: 19.0, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 36, rank: 37, score: 32, category: "Low", nameEn: "P.P. Road North & Kovvada Border West", nameTe: "పి.పి. రోడ్ నార్త్ & కొవ్వాడ సరిహద్దు", road_km: 4.6, hotspots: 0, avg_speed: 19.2, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 38, rank: 38, score: 31, category: "Low", nameEn: "Bypass Road South & Town Station North", nameTe: "బైపాస్ రోడ్ సౌత్ & టౌన్ స్టేషన్ ఉత్తరం", road_km: 5.0, hotspots: 0, avg_speed: 21.0, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" },
    { ward: 39, rank: 39, score: 30, category: "Low", nameEn: "Kovvada Border & T.P. Gudem Rail Line", nameTe: "కొవ్వాడ సరిహద్దు & తాడేపల్లిగూడెం రైలు లైన్", road_km: 5.2, hotspots: 0, avg_speed: 22.5, parking_deficit: "Low", safety_risk: "Low", priority: "Tier-4" }
  ],

  // 12. 5-YEAR INVESTMENT ROADMAP & IMPLEMENTATION TRACKER
  investment_roadmap: [
    {
      phase: "Immediate: 0-6 Months",
      phaseTe: "తక్షణ చర్యలు (0-6 నెలలు)",
      project_code: "PH1-01",
      name: "P.P. Road - Gandhi Road One-Way Circulation Pilot & Markings",
      nameTe: "పి.పి. రోడ్ - గాంధీ రోడ్ వన్-వే సర్క్యులేషన్ పైలట్ ప్రాజెక్ట్",
      dept: "Bhimavaram Municipality & Traffic Police",
      capex_cr: 1.20,
      opex_cr: 0.25,
      timeline: "M1 - M4",
      status: "Approved for Pilot",
      expected_impact: "Immediate 28% reduction in bazaar choke and 35% speed improvement"
    },
    {
      phase: "Immediate: 0-6 Months",
      phaseTe: "తక్షణ చర్యలు (0-6 నెలలు)",
      project_code: "PH1-02",
      name: "Webster Signal Optimization & Underpass Approach Channelization at Prakasham Chowk",
      nameTe: "ప్రకాశం చౌక్ అండర్‌పాస్ వద్ద వెబ్‌స్టర్ సిగ్నల్ & అప్రోచ్ ఛానలైజేషన్",
      dept: "AP Police & Bhimavaram Municipality",
      capex_cr: 0.85,
      opex_cr: 0.15,
      timeline: "M2 - M5",
      status: "Tender Ready",
      expected_impact: "Cuts underpass approach merge queues from 280m to 85m"
    },
    {
      phase: "Immediate: 0-6 Months",
      phaseTe: "తక్షణ చర్యలు (0-6 నెలలు)",
      project_code: "PH1-03",
      name: "Auto-Rickshaw Organized Stands & Freight Time-Window Enforcement",
      nameTe: "నిర్దేశిత ఆటో స్టాండ్లు & సరుకు రవాణా సమయాల నియంత్రణ",
      dept: "Municipality & Transport Dept",
      capex_cr: 0.95,
      opex_cr: 0.20,
      timeline: "M1 - M3",
      status: "Gazette Notification Drafted",
      expected_impact: "Removes 650 roadside vehicle encroachments from carriageways"
    },
    {
      phase: "Immediate: 0-6 Months",
      phaseTe: "తక్షణ చర్యలు (0-6 నెలలు)",
      project_code: "PH1-04",
      name: "School & Hospital Zone Traffic Calming & Tabletop Crossings",
      nameTe: "పాఠశాల & ఆసుపత్రి జోన్ల ట్రాఫిక్ శాంతపరిచే చర్యలు",
      dept: "Bhimavaram Municipality",
      capex_cr: 1.10,
      opex_cr: 0.10,
      timeline: "M3 - M6",
      status: "Site Surveys Complete",
      expected_impact: "Eliminates vulnerable pedestrian conflicts at DNR, KGRL, Alluri Hospital"
    },
    {
      phase: "Short Term: 6-18 Months",
      phaseTe: "స్వల్పకాలిక పనులు (6-18 నెలలు)",
      project_code: "PH2-01",
      name: "Prakasham Chowk Automated Multi-Level Car Parking (MLCP)",
      nameTe: "ప్రకాశం చౌక్ ఆటోమేటెడ్ మల్టీ లెవల్ పార్కింగ్ భవనం",
      dept: "Municipality & AP Urban Infra (APUIAML)",
      capex_cr: 11.20,
      opex_cr: 0.60,
      timeline: "M7 - M18",
      status: "DPR Prepared",
      expected_impact: "Absorbs 250 cars and 800 two-wheelers off congested streets"
    },
    {
      phase: "Short Term: 6-18 Months",
      phaseTe: "స్వల్పకాలిక పనులు (6-18 నెలలు)",
      project_code: "PH2-02",
      name: "Major Intersections Geometric Redesign & Channelization (5 Junctions)",
      nameTe: "5 ప్రధాన కూడళ్ల రీడిజైనింగ్ & ఛానలైజింగ్ ఐలాండ్స్",
      dept: "R&B Department & Municipality",
      capex_cr: 6.80,
      opex_cr: 0.30,
      timeline: "M8 - M16",
      status: "Engineering Designs Vetted",
      expected_impact: "Level of Service jumps from E/F to B/C across all 5 intersections"
    },
    {
      phase: "Short Term: 6-18 Months",
      phaseTe: "స్వల్పకాలిక పనులు (6-18 నెలలు)",
      project_code: "PH2-03",
      name: "Bridge Chokepoint Duplication at Losari & Chinna Amiram",
      nameTe: "లోసరి & చిన అమిరం కాలువ వంతెనల డబ్లింగ్ పనులు",
      dept: "Irrigation & R&B Department",
      capex_cr: 8.50,
      opex_cr: 0.20,
      timeline: "M9 - M18",
      status: "Hydraulic Cleared",
      expected_impact: "Eliminates bottle-neck queues entering and leaving southern municipal bounds"
    },
    {
      phase: "Medium Term: 18-36 Months",
      phaseTe: "మధ్యస్థ కాలిక ప్రణాళిక (18-36 నెలలు)",
      project_code: "PH3-01",
      name: "Bhimavaram Smart ITMS Traffic Control Center & AI Adaptive Signals",
      nameTe: "స్మార్ట్ ITMS ట్రాఫిక్ కంట్రోల్ సెంటర్ & AI అడాప్టివ్ సిగ్నల్స్",
      dept: "Smart Cities Mission / AP Police",
      capex_cr: 18.50,
      opex_cr: 1.80,
      timeline: "M19 - M32",
      status: "Concept DPR Cleared",
      expected_impact: "Automated real-time green wave synchronization across 18 municipal signals"
    },
    {
      phase: "Medium Term: 18-36 Months",
      phaseTe: "మధ్యస్థ కాలిక ప్రణాళిక (18-36 నెలలు)",
      project_code: "PH3-02",
      name: "Electric Feeder Mini-Bus System (24 e-Buses & 4 Circular Routes)",
      nameTe: "ఎలక్ట్రిక్ ఫీడర్ మినీ బస్ వ్యవస్థ (24 ఈ-బస్సులు & 4 రూట్లు)",
      dept: "APSRTC & Municipal Partnership",
      capex_cr: 19.80,
      opex_cr: 2.20,
      timeline: "M20 - M34",
      status: "Under E-Mobility Grant Scheme",
      expected_impact: "Triples public transit share from 4.2% to 14.5%, reducing two-wheeler trips"
    },
    {
      phase: "Medium Term: 18-36 Months",
      phaseTe: "మధ్యస్థ కాలిక ప్రణాళిక (18-36 నెలలు)",
      project_code: "PH3-03",
      name: "Yenamadurru Canal Bund 5.4 km Green Mobility Corridor & Cycle Track",
      nameTe: "ఎనమదుర్రు కెనాల్ బండ్ 5.4 కి.మీ గ్రీన్ మొబిలిటీ & సైకిల్ ట్రాక్",
      dept: "Municipality & Tourism / Water Resources",
      capex_cr: 9.20,
      opex_cr: 0.40,
      timeline: "M18 - M30",
      status: "Feasibility Ready",
      expected_impact: "Creates non-motorised transit arterial removing 12,000 trips from P.P. Road"
    },
    {
      phase: "Long Term: 3-5 Years",
      phaseTe: "దీర్ఘకాలిక విజన్ (3-5 సంవత్సరాలు)",
      project_code: "PH4-01",
      name: "Bhimavaram Town Railway Underpass Capacity Expansion & Multi-Cell Subway Widening",
      nameTe: "భీమవరం టౌన్ రైల్వే అండర్‌పాస్ సామర్థ్య పెంపు & మల్టీ-సెల్ సబ్‌వే విస్తరణ",
      dept: "Ministry of Railways & AP Govt (50:50 Cost Share)",
      capex_cr: 24.00,
      opex_cr: 0.50,
      timeline: "M36 - M52",
      status: "Sanctioned in Modernization Masterplan",
      expected_impact: "Doubles underpass carriageway width with separate non-motorised transit cell"
    },
    {
      phase: "Long Term: 3-5 Years",
      phaseTe: "దీర్ఘకాలిక విజన్ (3-5 సంవత్సరాలు)",
      project_code: "PH4-02",
      name: "Dedicated Heavy Freight Logistics Consolidation Park (NH-165)",
      nameTe: "NH-165 వద్ద భారీ సరుకు రవాణా లాజిస్టిక్స్ పార్క్",
      dept: "AP Industrial Infrastructure Corp (APIIC)",
      capex_cr: 22.50,
      opex_cr: 1.10,
      timeline: "M36 - M52",
      status: "Land Bank Identified",
      expected_impact: "Diverts 100% of aquaculture and paddy inter-state trucks out of town center"
    }
  ],

  // 13. PERFORMANCE INDICATOR BENCHMARKS & EVALUATION MATRIX
  kpi_benchmarks: [
    { indicator: "Average Peak Travel Time Across City", unit: "minutes/trip", baseline: 24.8, scenario_a: 17.5, scenario_b: 13.8, scenario_c: 10.5, target: "< 12.0" },
    { indicator: "Average Journey Speed in City Core", unit: "km/h", baseline: 10.4, scenario_a: 15.8, scenario_b: 21.2, scenario_c: 26.5, target: "> 22.0" },
    { indicator: "Average Junction Stopped Delay", unit: "seconds/vehicle", baseline: 148, scenario_a: 84, scenario_b: 52, scenario_c: 32, target: "< 45" },
    { indicator: "Average Peak Queue Length at Chokepoints", unit: "metres", baseline: 410, scenario_a: 230, scenario_b: 140, scenario_c: 85, target: "< 100" },
    { indicator: "Total Vehicular Throughput", unit: "PCU/hour", baseline: 14200, scenario_a: 18400, scenario_b: 22600, scenario_c: 26800, target: "> 24000" },
    { indicator: "Public Transport Modal Share", unit: "% of trips", baseline: 4.2, scenario_a: 5.8, scenario_b: 8.5, scenario_c: 19.4, target: "> 18.0" },
    { indicator: "Active Mobility (Walk/Cycle) Share", unit: "% of trips", baseline: 6.8, scenario_a: 8.2, scenario_b: 12.0, scenario_c: 18.5, target: "> 16.0" },
    { indicator: "Daily Transport CO2 Emissions", unit: "tonnes/day", baseline: 48.6, scenario_a: 39.8, scenario_b: 33.2, scenario_c: 22.4, target: "< 25.0" },
    { indicator: "Daily Municipal Transport Fuel Use", unit: "kL/day", baseline: 22.8, scenario_a: 18.6, scenario_b: 15.4, scenario_c: 10.2, target: "< 12.0" },
    { indicator: "Annual Road Fatalities", unit: "fatalities/year", baseline: 18, scenario_a: 11, scenario_b: 6, scenario_c: 2, target: "< 3" },
    { indicator: "On-Street Parking Compliance Rate", unit: "% compliant", baseline: 37.6, scenario_a: 72.0, scenario_b: 86.5, scenario_c: 94.0, target: "> 90.0" }
  ]
};

// Export for node test environment if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BHIMAVARAM_TRAFFIC_DATA;
}
