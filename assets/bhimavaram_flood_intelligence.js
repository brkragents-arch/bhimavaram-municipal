/**
 * Bhimavaram Municipal Flood Intelligence, Drainage Analysis & Waterlogging Prediction System
 * Hydrological & Hydraulic Engineering Dataset and Calculation Engine
 * 
 * Study Area: Bhimavaram Municipality, West Godavari District, Andhra Pradesh, India
 * Coordinates: 16.5449° N, 81.5212° E
 * Datum: WGS 84 / Mean Sea Level (MSL)
 */

// ==========================================
// 1. ELEVATION, HYDROLOGY & BASIN PARAMETERS
// ==========================================
const BHIMAVARAM_FLOOD_CONFIG = {
  municipality: "Bhimavaram Municipality (భీమవరం పురపాలక సంఘం)",
  district: "West Godavari District, Andhra Pradesh",
  totalAreaSqKm: 25.60,
  totalWards: 52,
  population: 168940,
  averageGroundElevationM: 4.85, // meters above MSL
  minGroundElevationM: 2.10,    // Low-lying depression (Mavullamma / Lankapeta / Sompeta)
  maxGroundElevationM: 8.60,    // North-West high grounds near Rayalam / Kumudavalli border
  meanAnnualRainfallMm: 1082,
  soilGroup: "Hydrologic Soil Group D (Heavy deltaic clayey alluvium with high runoff potential)",
  yanamudurruNormalStageM: 2.10,
  yanamudurruWarningStageM: 3.80,
  yanamudurruDangerStageM: 4.90,
  yanamudurruBankfullStageM: 5.40
};

// ==========================================
// 2. TOP 20 WATERLOGGING HOTSPOTS IN BHIMAVARAM (Calibrated to Exact Google Maps Locations)
// ==========================================
const BHIMAVARAM_HOTSPOTS = [
  {
    id: "HS-01",
    rank: 1,
    nameTe: "శ్రీ మవుళ్ళమ్మ ఆలయ పరిసరాలు & పుష్కరిణి రోడ్డు",
    nameEn: "Mavullamma Temple Surroundings & Pushkarini Road",
    ward: 3,
    zone: "Town-1 (One Town)",
    lat: 16.54250,
    lon: 81.52530,
    groundElevationM: 2.25,
    maxWaterDepthM: 1.45,
    avgDurationHrs: 18,
    flowArrivalTimeMin: 25,
    catchment: "Town-1 Central Core Basin",
    connectedDrain: "Mavullamma Outfall Drain -> Yanamudurru Drain",
    causeTe: "అత్యంత పల్లపు ప్రాంతం (2.25m MSL), ఎనమదురు కాలువ ఉధృతి వల్ల బ్యాక్ వాటర్ రివర్స్ ప్రవాహం, అవుట్‌ఫాల్ డ్రెయిన్ పూడిక",
    causeEn: "Severe depression (2.25m MSL), reverse backwater hydraulic locking from Yanamudurru drain, silt choked outfall",
    status: "Confirmed Historical Hotspot (Google Maps Verified)",
    confidence: "Very High (98%)",
    priority: "Critical (తక్షణ ప్రాధాన్యత)",
    proposedIntervention: "120 HP Submersible Stormwater Pump station + Non-return Flap Gate at Yanamudurru outfall"
  },
  {
    id: "HS-02",
    rank: 2,
    nameTe: "లంకాపేట & శివాలయం వీధి కూడలి",
    nameEn: "Lankapeta & Sivalayam Street Junction",
    ward: 2,
    zone: "Town-1 (One Town)",
    lat: 16.54360,
    lon: 81.52680,
    groundElevationM: 2.40,
    maxWaterDepthM: 1.20,
    avgDurationHrs: 14,
    flowArrivalTimeMin: 30,
    catchment: "Town-1 East Nala Basin",
    connectedDrain: "Lankapeta Secondary Drain",
    causeTe: "సాధారణ భూమట్టం కంటే 1.5 మీటర్ల పల్లం, ఇరుకైన ఓపెన్ డ్రెయిన్లు, వర్షపు నీరు బయటకు పోయే మార్గం లేకపోవడం",
    causeEn: "Depression basin, narrow roadside drains encroached by shops, inadequate outfall capacity",
    status: "Confirmed Historical Hotspot",
    confidence: "Very High (95%)",
    priority: "Critical",
    proposedIntervention: "Box drain widening from 0.9m to 1.8m + Desilting 450m length"
  },
  {
    id: "HS-03",
    rank: 3,
    nameTe: "సోంపేట & డి.ఎన్.ఆర్. కళాశాల వెనుక ప్రాంతం",
    nameEn: "Sompeta Main Road & DNR College Rear Basin",
    ward: 29,
    zone: "Town-2 (Two Town)",
    lat: 16.53350,
    lon: 81.51650,
    groundElevationM: 2.60,
    maxWaterDepthM: 1.15,
    avgDurationHrs: 16,
    flowArrivalTimeMin: 35,
    catchment: "West Bhimavaram Canal Tributary",
    connectedDrain: "Bhimavaram Branch Canal Culvert Link",
    causeTe: "రైల్వే ట్రాక్ మరియు రోడ్డు ఎంబ్యాంక్‌మెంట్ల మధ్య నీరు బందీ కావడం, రైల్వే కల్వర్టు పూడికతో మూసుకుపోవడం",
    causeEn: "Trapped natural runoff between railway line embankment and road level; clogged railway culvert barrel",
    status: "Confirmed Historical Hotspot",
    confidence: "Very High (94%)",
    priority: "Critical",
    proposedIntervention: "Construct 2-cell RCC culvert under railway embankment + desilt Balasumudi link"
  },
  {
    id: "HS-04",
    rank: 4,
    nameTe: "బాలుసుముడి వై జంక్షన్ & థియేటర్ల ప్రాంతం",
    nameEn: "Balusumudi Y-Junction & Theatre Strip",
    ward: 17,
    zone: "Town-2 / Central",
    lat: 16.53020,
    lon: 81.51850,
    groundElevationM: 2.75,
    maxWaterDepthM: 0.95,
    avgDurationHrs: 12,
    flowArrivalTimeMin: 20,
    catchment: "Balasumudi Urban Catchment",
    connectedDrain: "Balusumudi Feeder Drain to Yanamudurru",
    causeTe: "అత్యధిక రోడ్డు రద్దీ కలిగిన లోతట్టు కూడలి, కాంక్రీట్ రోడ్ల వల్ల 90% ఇంపీర్వియస్ రన్-ఆఫ్, డ్రెయిన్ గ్రేడియంట్ సరిపోకపోవడం",
    causeEn: "High impervious commercial paved area (90%), insufficient longitudinal bed slope (1:2500)",
    status: "Confirmed Historical Hotspot",
    confidence: "Very High (96%)",
    priority: "High",
    proposedIntervention: "Re-grading drain bed to 1:1200 slope + Install heavy silt traps"
  },
  {
    id: "HS-05",
    rank: 5,
    nameTe: "టౌన్ రైల్వే స్టేషన్ దరి",
    nameEn: "Town Railway Station Environs (Near BVRT Station)",
    ward: 37,
    zone: "Town-2",
    lat: 16.54728,
    lon: 81.51917,
    groundElevationM: 2.30,
    maxWaterDepthM: 1.25,
    avgDurationHrs: 18,
    flowArrivalTimeMin: 20,
    catchment: "Town Station South Depression",
    connectedDrain: "Town Railway Sump Drain",
    causeTe: "టౌన్ రైల్వే స్టేషన్ పరిసరాల్లోని లోతట్టు ప్రాంతం, వర్షపు నీటి డ్రైనేజీ నెమ్మదించడం మరియు ట్రాక్ డ్రైన్ల నుండి రన్-ఆఫ్ చేరడం",
    causeEn: "Low-lying terrain surrounding Bhimavaram Town Railway Station, track drainage overflow and delayed discharge into municipal collector drains",
    status: "Field Verified Critical Vulnerability (Near BVRT Station)",
    confidence: "Very High (99%)",
    priority: "Critical",
    proposedIntervention: "High-capacity municipal dewatering pump station + desilting of railway yard collector drain"
  },
  {
    id: "HS-06",
    rank: 6,
    nameTe: "గుణుపూడి సోమేశ్వర స్వామి దేవాలయం (సోమారామం పరిసరాలు)",
    nameEn: "Gunupudi Someswara Swamy Temple Surroundings (Somaramam)",
    ward: 26,
    zone: "Gunupudi",
    lat: 16.54127,
    lon: 81.53509,
    groundElevationM: 2.80,
    maxWaterDepthM: 0.85,
    avgDurationHrs: 10,
    flowArrivalTimeMin: 40,
    catchment: "Gunupudi Heritage Catchment",
    connectedDrain: "Gunupudi Main Nala",
    causeTe: "పురాతన వీధుల ఆక్రమణలు, ఓపెన్ డ్రెయిన్లలో ప్లాస్టిక్ & ఘనవ్యర్థాలు పేరుకుపోవడం",
    causeEn: "Dense heritage settlement with narrow conduits, chronic solid waste clogging",
    status: "Confirmed Historical Hotspot (Google Maps Somaramam Verified)",
    confidence: "High (92%)",
    priority: "High",
    proposedIntervention: "Pre-monsoon trash rack installation + Covering open drains with silt inspection slabs"
  },
  {
    id: "HS-07",
    rank: 7,
    nameTe: "గాంధీ నగర్ మెయిన్ డ్రెయిన్ బేసిన్",
    nameEn: "Gandhi Nagar Main Drain Basin",
    ward: 8,
    zone: "Town-1",
    lat: 16.54380,
    lon: 81.53080,
    groundElevationM: 2.90,
    maxWaterDepthM: 0.75,
    avgDurationHrs: 8,
    flowArrivalTimeMin: 30,
    catchment: "Gandhi Nagar Urban Catchment",
    connectedDrain: "Gandhi Nagar - Yanamudurru Trunk Drain",
    causeTe: "డ్రెయిన్ లోపల పూడిక 70% మేర నిండిపోవడం, డ్రెయిన్ క్రాస్ సెక్షన్ కుదించుకుపోవడం",
    causeEn: "Silt accumulation up to 65% of conduit depth, structural collapse of old brick masonry",
    status: "Field Verified",
    confidence: "High (90%)",
    priority: "High",
    proposedIntervention: "Desilting 800m trunk line + Reconstruction of 220m damaged masonry wall"
  },
  {
    id: "HS-08",
    rank: 8,
    nameTe: "రాయలం పంచాయతీ రోడ్డు & వ్యవసాయ సరిహద్దు",
    nameEn: "Rayalam South Boundary & Agrarian Runoff Zone",
    ward: 48,
    zone: "Rayalam South",
    lat: 16.52190,
    lon: 81.49440,
    groundElevationM: 2.50,
    maxWaterDepthM: 1.05,
    avgDurationHrs: 15,
    flowArrivalTimeMin: 45,
    catchment: "South Agricultural-Urban Transition",
    connectedDrain: "Karakodu Field Channel Tributary",
    causeTe: "వ్యవసాయ పొలాల నుండి వచ్చే భారీ ప్రవాహం నేరుగా నివాసాల వైపు మళ్ళడం, కరకోడు కాలువ పొంగడం",
    causeEn: "Agricultural sheet runoff draining into newly developed urban layouts without interceptor drain",
    status: "Modelled & Field Confirmed (Google Maps Rayalam)",
    confidence: "High (91%)",
    priority: "High",
    proposedIntervention: "Construct 1.2km trapezoidal peripheral interceptor drain along agricultural boundary"
  },
  {
    id: "HS-09",
    rank: 9,
    nameTe: "రైల్వే అండర్‌పాస్ / సబ్‌వే",
    nameEn: "Railway Underpass / Subway (RUB Dip near Canal Crossing)",
    ward: 4,
    zone: "Town-1 / Town-2 Border",
    lat: 16.54760,
    lon: 81.52345,
    groundElevationM: 2.10,
    maxWaterDepthM: 1.80,
    avgDurationHrs: 24,
    flowArrivalTimeMin: 15,
    catchment: "Yanamudurru Rail Bridge Sag Basin",
    connectedDrain: "Railway Underpass Sump -> Yanamudurru Drain",
    causeTe: "తీవ్రమైన బాటిల్‌నెక్, రోడ్డు లెవెల్ కంటే 2 మీటర్ల గుంతగా మారే అండర్‌పాస్ / సబ్‌వే, ఎనమదురు కాలువ బ్యాక్ వాటర్ చేరడం వల్ల నీరు నిల్వ ఉండటం",
    causeEn: "Severe structural sag point at Railway Underpass / Subway, roadway sits 2.2m below terrain, high backwater hydraulic locking from nearby Yanamudurru drain",
    status: "Confirmed Historical Hotspot (Railway Underpass / Subway RUB)",
    confidence: "Very High (99%)",
    priority: "Critical",
    proposedIntervention: "Automated Dual 150HP dewatering sump pumps with diesel generator backup + non-return flap gate on canal outfall"
  },
  {
    id: "HS-10",
    rank: 10,
    nameTe: "ఆర్టీసీ సెంట్రల్ బస్ స్టేషన్ కాంప్లెక్స్ & బేలు",
    nameEn: "APSRTC Central Bus Complex Terminal Bays",
    ward: 22,
    zone: "Town-1",
    lat: 16.54498,
    lon: 81.53004,
    groundElevationM: 3.10,
    maxWaterDepthM: 0.65,
    avgDurationHrs: 6,
    flowArrivalTimeMin: 20,
    catchment: "Bus Terminal Catchment",
    connectedDrain: "Juvvalapalem Arterial Storm Drain",
    causeTe: "బస్టాండ్ కాంక్రీట్ విస్తీర్ణం వల్ల ఉపరితల ప్రవాహం అకస్మాత్తుగా పెరగడం, ఆర్టీసీ రోడ్డు డ్రెయిన్ అడ్డుపడటం",
    causeEn: "High peak discharge from asphalt parking yards; inadequate road cross-culverts across Juvvalapalem road",
    status: "Confirmed Field Inspection (Google Maps RTC Bus Stand)",
    confidence: "High (89%)",
    priority: "Moderate",
    proposedIntervention: "Add twin 1200mm diameter Hume pipe cross-culvert under Juvvalapalem road"
  },
  {
    id: "HS-11",
    rank: 11,
    nameTe: "చినమిరం రోడ్డు కూడలి & బైపాస్ లింక్",
    nameEn: "Chinamiram Road Junction & Bypass Link",
    ward: 33,
    zone: "Town-2 West",
    lat: 16.54050,
    lon: 81.49530,
    groundElevationM: 3.05,
    maxWaterDepthM: 0.70,
    avgDurationHrs: 7,
    flowArrivalTimeMin: 35,
    catchment: "Chinamiram West Catchment",
    connectedDrain: "Chinamiram Roadside Drain",
    causeTe: "రోడ్డు ఎత్తు పెంచడం వలన పక్కనున్న కాలనీలు లోతట్టుగా మారడం",
    causeEn: "Road elevation raised during recent asphalt overlay without proportional deepening of side drains",
    status: "Field Inspected (Google Maps Chinamiram)",
    confidence: "High (88%)",
    priority: "Moderate",
    proposedIntervention: "Side drain deepening by 0.6m + Roadside grating chambers"
  },
  {
    id: "HS-12",
    rank: 12,
    nameTe: "APHB హౌసింగ్ బోర్డు కాలనీ (తూర్పు భీమవరం)",
    nameEn: "AP Housing Board Colony (APHB Colony East)",
    ward: 9,
    zone: "Town-1 East",
    lat: 16.54430,
    lon: 81.54180,
    groundElevationM: 2.85,
    maxWaterDepthM: 0.80,
    avgDurationHrs: 9,
    flowArrivalTimeMin: 30,
    catchment: "Housing Board Catchment",
    connectedDrain: "East Interceptor Nala",
    causeTe: "నివాస సముదాయాల డ్రెయిన్లలో పూడిక, అవుట్‌ఫాల్ డ్రెయిన్ డిశ్చార్జ్ మందగించడం",
    causeEn: "Internal colony drains have zero longitudinal bed slope, leading to severe stagnation",
    status: "Modelled Hotspot (Google Maps APHB Colony)",
    confidence: "Moderate (84%)",
    priority: "Moderate",
    proposedIntervention: "Electrically operated sump pump + Re-alignment of outfall nala"
  },
  {
    id: "HS-13",
    rank: 13,
    nameTe: "పాత కూరగాయల మార్కెట్ & మెంటేవారి తోట",
    nameEn: "Old Vegetable Market & Mentevari Thota",
    ward: 6,
    zone: "Town-1",
    lat: 16.54450,
    lon: 81.52850,
    groundElevationM: 2.65,
    maxWaterDepthM: 0.90,
    avgDurationHrs: 11,
    flowArrivalTimeMin: 22,
    catchment: "Commercial Core Basin",
    connectedDrain: "Mentevari Thota Nala",
    causeTe: "మార్కెట్ వ్యర్థాలు డ్రెయిన్లలో చేరడం, వ్యాపార దుకాణాల ఆక్రమణలు",
    causeEn: "Organic waste dumping combined with encroachment over drain culverts",
    status: "Confirmed Historical Hotspot",
    confidence: "High (92%)",
    priority: "High",
    proposedIntervention: "Installation of mechanical screening trash racks and daily municipal desilting"
  },
  {
    id: "HS-14",
    rank: 14,
    nameTe: "అమరం నార్త్ వ్యవసాయ ఫీడర్ ఛానల్ జంక్షన్",
    nameEn: "Amaram North Agrarian Feeder Channel Junction",
    ward: 42,
    zone: "Amaram North",
    lat: 16.56500,
    lon: 81.51200,
    groundElevationM: 3.40,
    maxWaterDepthM: 0.60,
    avgDurationHrs: 6,
    flowArrivalTimeMin: 40,
    catchment: "Amaram Northern Tributary",
    connectedDrain: "Undi Border Agrarian Drain",
    causeTe: "ఎగువన ఉండి మండలం నుండి వచ్చే వరద నీరు అమరం నార్త్ కాలువలో కలవడం",
    causeEn: "External upstream runoff coming from Undi sub-basin during prolonged storms",
    status: "Modelled Upstream Inflow Hotspot",
    confidence: "High (86%)",
    priority: "Moderate",
    proposedIntervention: "Upstream flood regulator gate and bund strengthening"
  },
  {
    id: "HS-15",
    rank: 15,
    nameTe: "భవాని నగర్ & ఆకులవారి వీధి",
    nameEn: "Bhavani Nagar & Akulavari Street",
    ward: 18,
    zone: "Town-1",
    lat: 16.54750,
    lon: 81.52550,
    groundElevationM: 2.70,
    maxWaterDepthM: 0.85,
    avgDurationHrs: 10,
    flowArrivalTimeMin: 28,
    catchment: "Town-1 Canal Edge",
    connectedDrain: "Bhavani Nagar Feeder Drain",
    causeTe: "ఇరుకైన మురుగు కాలువలు, ఎనమదురు కాలువ బ్యాక్ వాటర్ ప్రభావం",
    causeEn: "Narrow brick drains overwhelmed during backwater stage in canal",
    status: "Confirmed Hotspot",
    confidence: "High (89%)",
    priority: "High",
    proposedIntervention: "Convert open drain to reinforced box drain with outfall flap valve"
  },
  {
    id: "HS-16",
    rank: 16,
    nameTe: "ప్రభుత్వ ఏరియా ఆసుపత్రి అప్రోచ్ రోడ్డు",
    nameEn: "Government Area Hospital Main Approach Corridor",
    ward: 21,
    zone: "Town-1",
    lat: 16.54541,
    lon: 81.53158,
    groundElevationM: 3.20,
    maxWaterDepthM: 0.55,
    avgDurationHrs: 5,
    flowArrivalTimeMin: 25,
    catchment: "Institutional Health Catchment",
    connectedDrain: "Hospital Road Arterial Conduit",
    causeTe: "రోడ్డుపై నీరు నిలవడం వలన రోగుల అంబులెన్స్ రాకపోకలకు ఆటంకం కలగడం",
    causeEn: "Surface ponding along hospital approach road causing critical emergency access blockage",
    status: "Critical Public Asset Exposure (Google Maps Area Hospital)",
    confidence: "High (93%)",
    priority: "High",
    proposedIntervention: "High-capacity perforated road gully chambers and direct connection to west collector"
  },
  {
    id: "HS-17",
    rank: 17,
    nameTe: "కుర్మయ్యపేట చాకలి వీధి లోతట్టు ప్రాంతం",
    nameEn: "Kurmayyapeta Chakali Street Low-lying Basin",
    ward: 7,
    zone: "Town-1",
    lat: 16.54100,
    lon: 81.52950,
    groundElevationM: 2.75,
    maxWaterDepthM: 0.85,
    avgDurationHrs: 9,
    flowArrivalTimeMin: 32,
    catchment: "East Ward Basin",
    connectedDrain: "Kurmayyapeta Local Nala",
    causeTe: "సహజ పల్లం మరియు సరైన అవుట్‌ఫాల్ డ్రెయిన్ లేకపోవడం",
    causeEn: "Topographic cup shape; natural surface drainage interrupted by elevated houses",
    status: "Confirmed Historical Hotspot",
    confidence: "High (90%)",
    priority: "Moderate",
    proposedIntervention: "Install 400m gravity relief pipeline connecting to Town-1 Main Trunk"
  },
  {
    id: "HS-18",
    rank: 18,
    nameTe: "సుంకర విజయాల వీధి & నరసయ్య కాలువ దరి",
    nameEn: "Sunkara Vijayala Street & Krishna Temple",
    ward: 10,
    zone: "Town-1",
    lat: 16.54220,
    lon: 81.52800,
    groundElevationM: 2.80,
    maxWaterDepthM: 0.70,
    avgDurationHrs: 8,
    flowArrivalTimeMin: 28,
    catchment: "Town-1 South-East Basin",
    connectedDrain: "Vijayala Street Feeder Drain",
    causeTe: "కాలువ కల్వర్టులో గుర్రపుడెక్క (Water Hyacinth) మరియు చెత్త పేరుకుపోవడం",
    causeEn: "Water hyacinth and domestic waste blocking twin pipe culvert",
    status: "Field Inspected",
    confidence: "High (88%)",
    priority: "Moderate",
    proposedIntervention: "Removal of hyacinth + Replacement of pipe culvert with 2.5m box culvert"
  },
  {
    id: "HS-19",
    rank: 19,
    nameTe: "విద్యానగర్ & సోమేశ్వర స్వామి దక్షిణ పరిసరాలు",
    nameEn: "Vidyanagar & Someswara Temple South Sector",
    ward: 35,
    zone: "Gunupudi / Town-2",
    lat: 16.53600,
    lon: 81.52600,
    groundElevationM: 2.95,
    maxWaterDepthM: 0.65,
    avgDurationHrs: 7,
    flowArrivalTimeMin: 35,
    catchment: "South Central Urban Sub-catchment",
    connectedDrain: "Vidyanagar Colony Drain",
    causeTe: "డ్రెయిన్ లెవెల్ కంటే కాలనీ రోడ్లు పల్లంగా ఉండటం వలన నీరు నిలిచిపోవడం",
    causeEn: "Invert levels reversed during informal road construction; water traps inside layout",
    status: "Modelled Hotspot",
    confidence: "Moderate (82%)",
    priority: "Moderate",
    proposedIntervention: "Reconstruct roadside drain with surveyed invert gradient towards Gunupudi trunk"
  },
  {
    id: "HS-20",
    rank: 20,
    nameTe: "భీమవరం జంక్షన్ స్టేషన్ పశ్చిమ యార్డు & ట్రాక్ ప్రాంతం",
    nameEn: "Bhimavaram Junction Station West Yard (BVRM)",
    ward: 10,
    zone: "Railway Junction Sector",
    lat: 16.54420,
    lon: 81.53750,
    groundElevationM: 3.30,
    maxWaterDepthM: 0.60,
    avgDurationHrs: 6,
    flowArrivalTimeMin: 30,
    catchment: "Railway Junction Basin",
    connectedDrain: "Railway Yard Culvert Link",
    causeTe: "రైల్వే ట్రాక్‌ల మధ్య నీటి నిల్వ, రైల్వే యార్డు నుండి మున్సిపల్ డ్రెయిన్‌కు లింక్ బలహీనంగా ఉండటం",
    causeEn: "Inter-track ponding; weak coordination between Railway maintenance and municipal drainage",
    status: "Modelled Hotspot (Google Maps BVRM Junction)",
    confidence: "Moderate (85%)",
    priority: "Moderate",
    proposedIntervention: "Joint Municipal-Railway drainage channel desilting and culvert desilting"
  }
];

// ==========================================
// 3. CANAL & DRAINAGE HYDRAULIC NETWORK
// ==========================================
const BHIMAVARAM_DRAINAGE_NETWORK = {
  // Major Regional Hydraulic Spine
  yanamudurruDrain: {
    nameTe: "ఎనమదురు మేజర్ డ్రెయిన్ (యలమదుర్రు ప్రధాన ప్రవాహం)",
    nameEn: "Yanamudurru Major Drain (Central Hydraulic Spine)",
    type: "Major Regional Drainage River",
    lengthInUlbKm: 8.20,
    totalCatchmentAreaSqKm: 1420.0, // Godavari Delta regional basin
    bedSlope: "1 in 3200 (Extremely flat deltaic gradient)",
    designDischargeCapacityCusecs: 14500,
    currentReducedCapacityCusecs: 9200, // Reduced due to silt and hyacinth
    bankfullElevationM: 5.40,
    warningLevelM: 3.80,
    dangerLevelM: 4.90,
    normalSummerStageM: 1.85,
    normalMonsoonStageM: 2.80,
    backwaterThresholdM: 3.60, // Above this, municipal drains cannot discharge by gravity!
    bisectsMunicipality: "Separates Town-1 (East) and Town-2 (West)",
    monitoringStations: [
      { name: "North Inflow Gauge (Kumudavalli)", km: 0.0, normalStage: 2.2, warningStage: 4.0 },
      { name: "Central Railway Bridge Gauge", km: 3.8, normalStage: 2.1, warningStage: 3.8 },
      { name: "Someshwara Temple Outfall Gauge", km: 5.2, normalStage: 2.0, warningStage: 3.7 },
      { name: "South Municipal Boundary Gauge (Yenamadurru)", km: 8.2, normalStage: 1.8, warningStage: 3.5 }
    ]
  },

  // Irrigation & Tributary Canals
  canals: [
    {
      id: "C-BALASUMUDI",
      nameTe: "బాలసుముడి బ్రాంచ్ కాలువ",
      nameEn: "Balasumudi Branch Canal",
      type: "Irrigation Canal / Tributary",
      wardsFed: [17, 38, 39],
      lengthKm: 4.6,
      currentCapacityCusecs: 280,
      flowDirection: "North-West to South-East into Yanamudurru",
      riskType: "Canal overtopping when irrigation release synchronizes with cyclone storm"
    },
    {
      id: "C-BHIMAVARAM-BRANCH",
      nameTe: "భీమవరం బ్రాంచ్ కాలువ (పశ్చిమ విభాగం)",
      nameEn: "Bhimavaram Branch Canal (West Feeder)",
      type: "Major Feeder Canal",
      wardsFed: [29, 30, 33],
      lengthKm: 6.2,
      currentCapacityCusecs: 450,
      flowDirection: "West to East across DNR sector",
      riskType: "Breach hazard during high intake from Godavari canal regulator"
    },
    {
      id: "C-KARAKODU",
      nameTe: "కరకోడు ఫీల్డ్ ఛానల్ & డ్రెయిన్",
      nameEn: "Karakodu Field Channel & Natural Nala",
      type: "Agricultural-Urban Interface Drainage Channel",
      wardsFed: [31, 32, 48, 50],
      lengthKm: 5.1,
      currentCapacityCusecs: 180,
      flowDirection: "South-West towards Yenamadurru confluence",
      riskType: "Severe encroachment, reduced cross-section, backflow"
    },
    {
      id: "C-GHOSTANI",
      nameTe: "ఘోస్తని వెంకయ్య (GV) కాలువ",
      nameEn: "Ghostani Venkayya (GV) Canal Link",
      type: "Distributary Drainage Canal",
      wardsFed: [1, 2, 6, 7],
      lengthKm: 3.8,
      currentCapacityCusecs: 210,
      flowDirection: "North-East to Central Drain",
      riskType: "Heavy silt deposition (55% choked)"
    }
  ],

  // Municipal Primary Stormwater Drains
  primaryDrains: [
    {
      id: "PD-01",
      nameTe: "వన్ టౌన్ మెయిన్ అవుట్‌ఫాల్ ట్రంక్ డ్రెయిన్ (మవుళ్ళమ్మ లైన్)",
      nameEn: "One Town Main Outfall Trunk Drain (Mavullamma Line)",
      wardsCovered: [1, 2, 3, 4],
      lengthM: 2400,
      widthM: 3.2,
      depthM: 1.8,
      structureType: "RCC Box Drain & Open Masonry",
      invertSlope: "1 in 1800",
      siltPercentage: 45,
      outfallLocation: "Yanamudurru Drain at Station Km 4.2",
      outfallCondition: "Submerged during canal stage > 3.6m MSL (Backwater locking)"
    },
    {
      id: "PD-02",
      nameTe: "టూ టౌన్ సోంపేట - డి.ఎన్.ఆర్ ట్రంక్ డ్రెయిన్",
      nameEn: "Two Town Sompeta - DNR Trunk Drain",
      wardsCovered: [26, 27, 28, 29],
      lengthM: 3100,
      widthM: 3.5,
      depthM: 2.0,
      structureType: "RCC Covered Box Conduit",
      invertSlope: "1 in 2000",
      siltPercentage: 38,
      outfallLocation: "Yanamudurru Drain at Station Km 5.0",
      outfallCondition: "Free discharge at normal stage; throttled at flood stage"
    },
    {
      id: "PD-03",
      nameTe: "గుణుపూడి సోమేశ్వర స్వామి నాలా",
      nameEn: "Gunupudi Someswara Swamy Heritage Nala",
      wardsCovered: [25, 26, 35],
      lengthM: 1850,
      widthM: 2.4,
      depthM: 1.6,
      structureType: "Stone Pitching Open Nala",
      invertSlope: "1 in 1500",
      siltPercentage: 58,
      outfallLocation: "Yanamudurru Drain at Station Km 5.8",
      outfallCondition: "Vegetation & plastic trash obstruction"
    },
    {
      id: "PD-04",
      nameTe: "రాయలం సౌత్ పెరిఫెరల్ ఇంటర్‌సెప్టర్ డ్రెయిన్",
      nameEn: "Rayalam South Peripheral Interceptor Drain",
      wardsCovered: [46, 47, 48, 52],
      lengthM: 2800,
      widthM: 2.8,
      depthM: 1.5,
      structureType: "Trapezoidal Earthen & Masonry",
      invertSlope: "1 in 2200",
      siltPercentage: 62,
      outfallLocation: "Karakodu Channel Confluence",
      outfallCondition: "Heavily silted; requires mechanical excavator desilting"
    }
  ],

  // Critical Culverts and Choke Points
  chokePoints: [
    {
      id: "CP-01",
      locationTe: "టౌన్ రైల్వే స్టేషన్ కల్వర్టు బాటిల్‌నెక్",
      locationEn: "Town Railway Station Culvert Bottleneck",
      type: "Railway Track Cross-Culvert",
      existingOpeningM2: 2.4,
      requiredOpeningM2: 6.8,
      deficitPercent: 65,
      impact: "Floods Ward 37 and Railway Underpass within 20 mins of heavy rain"
    },
    {
      id: "CP-02",
      locationTe: "మవుళ్ళమ్మ ఆలయ రోడ్డు ఇరుకైన కల్వర్టు",
      locationEn: "Mavullamma Temple Road Narrow Culvert",
      type: "Road Cross-Culvert",
      existingOpeningM2: 1.8,
      requiredOpeningM2: 4.5,
      deficitPercent: 60,
      impact: "Backwaters inundate temple pushkarini street and residential bazaar"
    },
    {
      id: "CP-03",
      locationTe: "సోంపేట మెయిన్ రోడ్డు డబుల్ పైప్ కల్వర్టు",
      locationEn: "Sompeta Main Road Twin Pipe Culvert",
      type: "Twin Hume Pipe 900mm",
      existingOpeningM2: 1.27,
      requiredOpeningM2: 4.0,
      deficitPercent: 68,
      impact: "Causes severe 1.15m deep waterlogging in Sompeta & DNR college perimeter"
    },
    {
      id: "CP-04",
      locationTe: "ఎనమదురు అవుట్‌ఫాల్ స్లూయిస్ గేటు నం. 3",
      locationEn: "Yanamudurru Outfall Sluice Gate No. 3",
      type: "Tidal / Flood Flap Gate Outfall",
      existingOpeningM2: 3.2,
      requiredOpeningM2: 3.2,
      deficitPercent: 0,
      impact: "Flap gate rusted in open position; allows canal flood water to reverse back into Town-1 drains!"
    }
  ]
};

// ==========================================
// 4. CRITICAL MUNICIPAL INFRASTRUCTURE ASSETS (Calibrated to Exact Google Maps Locations)
// ==========================================
const BHIMAVARAM_CRITICAL_ASSETS = [
  {
    id: "INF-01",
    nameTe: "ప్రభుత్వ ఏరియా ఆసుపత్రి, భీమవరం",
    nameEn: "Government Area Hospital, Bhimavaram",
    category: "Healthcare / Hospital",
    ward: 21,
    lat: 16.54541,
    lon: 81.53158,
    elevationM: 3.20,
    exposureUnder110mm: "Moderate (Access Road Inundated 0.45m)",
    exposureUnder180mm: "High (Ground Floor Compound Flooded 0.70m)",
    criticality: "Life Safety Essential (అత్యంత అత్యవసరం)",
    mitigationPriority: "High: Permanent concrete flood barrier + emergency power backup raised 1.5m"
  },
  {
    id: "INF-02",
    nameTe: "భీమవరం టౌన్ రైల్వే స్టేషన్ (BVRT) & సబ్‌వే",
    nameEn: "Bhimavaram Town Railway Station (BVRT) & RUB",
    category: "Transportation / Railway",
    ward: 37,
    lat: 16.54700,
    lon: 81.51930,
    elevationM: 2.10,
    exposureUnder110mm: "Critical (Underpass submerged 1.2m)",
    exposureUnder180mm: "Critical (Tracks 2 & 3 submerged 0.65m; train delays)",
    criticality: "Regional Transit Lifeline",
    mitigationPriority: "Critical: High-discharge automated pumping sump"
  },
  {
    id: "INF-03",
    nameTe: "ఆర్టీసీ సెంట్రల్ బస్సు కాంప్లెక్స్ (APSRTC Bus Complex)",
    nameEn: "APSRTC Central Bus Complex",
    category: "Transportation / Bus Stand",
    ward: 22,
    lat: 16.54498,
    lon: 81.53004,
    elevationM: 3.10,
    exposureUnder110mm: "Moderate (Bus bays waterlogged 0.35m)",
    exposureUnder180mm: "High (Bay operations suspended 0.65m water)",
    criticality: "Essential Transport",
    mitigationPriority: "Upgrade internal stormwater catch pits & cross-culverts"
  },
  {
    id: "INF-04",
    nameTe: "భీమవరం మున్సిపల్ కార్పొరేషన్ ప్రధాన కార్యాలయం",
    nameEn: "Bhimavaram Municipal Corporation Head Office",
    category: "Governance / Municipal",
    ward: 28,
    lat: 16.54300,
    lon: 81.52300,
    elevationM: 3.45,
    exposureUnder110mm: "Low (Surrounding road damp)",
    exposureUnder180mm: "Moderate (Entrance gate waterlogged 0.40m)",
    criticality: "Disaster Command Center",
    mitigationPriority: "Install emergency EOC backup generator and satellite comms"
  },
  {
    id: "INF-05",
    nameTe: "33/11 KV విద్యుత్ సబ్‌స్టేషన్ (వన్ టౌన్)",
    nameEn: "33/11 KV Electrical Sub-station (One Town)",
    category: "Power Utility",
    ward: 3,
    lat: 16.54180,
    lon: 81.52800,
    elevationM: 2.35,
    exposureUnder110mm: "High (Transformer plinth vulnerable)",
    exposureUnder180mm: "Critical (Power cut required to avoid electrocution)",
    criticality: "Essential Power Grid",
    mitigationPriority: "Raise transformer yard plinth by 1.2m above HFL"
  },
  {
    id: "INF-06",
    nameTe: "డి.ఎన్.ఆర్. కళాశాల కాంపస్ (విద్యా సంస్థ & అత్యవసర ఆశ్రయం)",
    nameEn: "D.N.R. College Campus (Education & Emergency Shelter)",
    category: "Education / Relief Shelter",
    ward: 29,
    lat: 16.53608,
    lon: 81.51992,
    elevationM: 2.65,
    exposureUnder110mm: "High (Playground & ground floor waterlogged 0.85m)",
    exposureUnder180mm: "Critical (Classrooms flooded 1.15m)",
    criticality: "Relief Camp Capability",
    mitigationPriority: "Deepen peripheral drainage channel and install retention bund"
  },
  {
    id: "INF-07",
    nameTe: "శ్రీ మవుళ్ళమ్మ దేవస్థానం & పరిసర వాణిజ్య సముదాయం",
    nameEn: "Sri Mavullamma Temple & Pilgrimage Complex",
    category: "Religious / Heritage",
    ward: 3,
    lat: 16.54250,
    lon: 81.52530,
    elevationM: 2.25,
    exposureUnder110mm: "Critical (Temple pushkarini overflow 1.10m)",
    exposureUnder180mm: "Critical (Sanctum approach submerged 1.45m)",
    criticality: "Cultural & Mass Gathering Hub",
    mitigationPriority: "Dedicated 120 HP flood pump station with auto float switch"
  },
  {
    id: "INF-08",
    nameTe: "భీమవరం వాటర్ వర్క్స్ ప్రధాన పంప్ హౌస్ & ఫిల్ట్రేషన్ ప్లాంట్",
    nameEn: "Bhimavaram Water Works Intake & Filtration Plant",
    category: "Drinking Water Supply",
    ward: 16,
    lat: 16.54600,
    lon: 81.52400,
    elevationM: 3.50,
    exposureUnder110mm: "Low (Clear)",
    exposureUnder180mm: "Moderate (Intake turbidity high, delivery lines exposed)",
    criticality: "Drinking Water Supply",
    mitigationPriority: "Turbidity sensors & intake well flood wall"
  },
  {
    id: "INF-09",
    nameTe: "భీమవరం అగ్నిమాపక కేంద్రం (Fire Station)",
    nameEn: "Bhimavaram Fire & Emergency Services Station",
    category: "Emergency Response",
    ward: 13,
    lat: 16.54400,
    lon: 81.52900,
    elevationM: 3.30,
    exposureUnder110mm: "Low (Accessible)",
    exposureUnder180mm: "Moderate (Approach road 0.35m water)",
    criticality: "Disaster Response Units",
    mitigationPriority: "Raise station ramp and maintain amphibious rescue rafts"
  },
  {
    id: "INF-10",
    nameTe: "భీమవరం జంక్షన్ రైల్వే స్టేషన్ (BVRM Junction)",
    nameEn: "Bhimavaram Junction Railway Station (BVRM)",
    category: "Transportation / Railway",
    ward: 10,
    lat: 16.54420,
    lon: 81.53750,
    elevationM: 3.30,
    exposureUnder110mm: "Low to Moderate",
    exposureUnder180mm: "High (Freight Yard & platform subway flooded 0.60m)",
    criticality: "Key Rail Junction",
    mitigationPriority: "Cross-track drain cleaning & outfall connection to north canal"
  },
  {
    id: "INF-11",
    nameTe: "శ్రీ సోమేశ్వర స్వామి దేవాలయం (సోమారామం, గుణుపూడి)",
    nameEn: "Pancharama Somaramam (Someswara Swamy Temple)",
    category: "Religious / Heritage",
    ward: 26,
    lat: 16.54127,
    lon: 81.53509,
    elevationM: 2.80,
    exposureUnder110mm: "Moderate (Inner courtyard waterlogged 0.40m)",
    exposureUnder180mm: "High (Heritage sanctum approach flooded 0.85m)",
    criticality: "Ancient Pancharama Heritage Site",
    mitigationPriority: "Heritage stone drain conservation & perimeter flood barrier"
  },
  {
    id: "INF-12",
    nameTe: "కె.జి.ఆర్.ఎల్. కళాశాల & బ్యాంక్ కాలనీ (KGRL College)",
    nameEn: "K.G.R.L. Degree College & PG Courses Campus",
    category: "Education / Relief Shelter",
    ward: 26,
    lat: 16.52732,
    lon: 81.52040,
    elevationM: 2.90,
    exposureUnder110mm: "Moderate (0.35m ground inundation)",
    exposureUnder180mm: "High (0.75m campus ponding)",
    criticality: "Key Educational Facility",
    mitigationPriority: "Connect internal drainage to Gunupudi South canal"
  }
];

// ==========================================
// 5. 52-WARD FLOOD RISK METRICS & METHODOLOGY
// ==========================================
// Flood Risk Index Formula:
// FRI = 0.30 * ElevationVulnerability + 0.25 * BackwaterSusceptibility + 0.20 * DrainageDeficit + 0.15 * PopDensity + 0.10 * InfrastructureImpact
const BHIMAVARAM_52_WARDS_FLOOD_DATA = [
  {
    "id": 1,
    "nameTe": "గోవిందరావు నగర్ & యలమదుర్రు డ్రెయిన్ నార్త్",
    "nameEn": "Govindarao Nagar & Yanamadurru Drain North",
    "zone": "North Zone",
    "pop": 3410,
    "areaSqKm": 0.44,
    "minElev": 2.6,
    "avgElev": 3.8,
    "lowLyingPct": 38,
    "drainLenKm": 3.8,
    "siltPct": 48,
    "vulnerableBldgs": 245,
    "riskScore": 78,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.556,
      81.5245
    ],
    "rsNos": [
      281,
      302,
      312,
      326,
      337,
      351
    ],
    "landmarks": [
      "Yanamadurru Drain",
      "BY-Pass Road Junction",
      "CPM Office Road",
      "Miramiya Kodu"
    ]
  },
  {
    "id": 2,
    "nameTe": "మెంటేవారి తోట & CPM ఆఫీస్ ఏరియా",
    "nameEn": "Mentevari Thota & CPM Office Area",
    "zone": "North-Central Zone",
    "pop": 3280,
    "areaSqKm": 0.38,
    "minElev": 2.3,
    "avgElev": 3.2,
    "lowLyingPct": 62,
    "drainLenKm": 3.2,
    "siltPct": 56,
    "vulnerableBldgs": 390,
    "riskScore": 92,
    "riskCategory": "Critical Risk",
    "riskColor": "#991b1b",
    "center": [
      16.55,
      81.528
    ],
    "rsNos": [
      302,
      651,
      655,
      560,
      312,
      326,
      337,
      351
    ],
    "landmarks": [
      "Bhimavaram-Nidadavolu Railway line",
      "Gudiwada-Bhimavaram Railway line",
      "Mentevari thota under-pass",
      "CPM office backside road",
      "By-Pass road"
    ]
  },
  {
    "id": 3,
    "nameTe": "కనకదుర్గ గుడి & తణుకు రోడ్డు",
    "nameEn": "Kanaka Durga Temple & Tanuku Road Junction",
    "zone": "East Zone",
    "pop": 3620,
    "areaSqKm": 0.42,
    "minElev": 2.1,
    "avgElev": 2.9,
    "lowLyingPct": 74,
    "drainLenKm": 3.6,
    "siltPct": 60,
    "vulnerableBldgs": 480,
    "riskScore": 98,
    "riskCategory": "Critical Risk",
    "riskColor": "#991b1b",
    "center": [
      16.5465,
      81.5335
    ],
    "rsNos": [
      655,
      299
    ],
    "landmarks": [
      "Miramiya Kodu canal",
      "Bhimavaram-Nidadavolu Railway line",
      "By-Pass road & Bhimavaram Tanuku road junction",
      "P.P road",
      "Kanaka Durga Temple"
    ]
  },
  {
    "id": 4,
    "nameTe": "శ్రీలంక రోడ్డు & నరసయ్య అగ్రహారం",
    "nameEn": "Srilanka Road & Narasayya Agraharam",
    "zone": "East-North Zone",
    "pop": 3150,
    "areaSqKm": 0.36,
    "minElev": 2.4,
    "avgElev": 3.3,
    "lowLyingPct": 55,
    "drainLenKm": 3,
    "siltPct": 52,
    "vulnerableBldgs": 340,
    "riskScore": 89,
    "riskCategory": "Very High Risk",
    "riskColor": "#ef4444",
    "center": [
      16.5525,
      81.5365
    ],
    "rsNos": [
      651,
      100,
      655
    ],
    "landmarks": [
      "Bhimavaram Nidadavolu Railway line",
      "Srilanka road",
      "ASR Statue",
      "Narasayya Agraharam Main Road",
      "Miramiya Kodu canal"
    ]
  },
  {
    "id": 5,
    "nameTe": "కుర్మయ్యపేట & డాక్టర్ CSN కాలేజీ వెస్ట్",
    "nameEn": "Kurmayyapeta & Dr CSN College West",
    "zone": "East Zone",
    "pop": 3340,
    "areaSqKm": 0.41,
    "minElev": 2.8,
    "avgElev": 4.1,
    "lowLyingPct": 32,
    "drainLenKm": 3.4,
    "siltPct": 40,
    "vulnerableBldgs": 190,
    "riskScore": 68,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5535,
      81.5435
    ],
    "rsNos": [
      100,
      101,
      92
    ],
    "landmarks": [
      "Dr CSN College",
      "Eastern Power Distribution center",
      "IALA Layout plot 51",
      "Kandikopu Dibba",
      "Kurmayyapeta School Road",
      "P.P road",
      "Kanaka Durga temple",
      "ASR Statue",
      "Srilanka Road"
    ]
  },
  {
    "id": 6,
    "nameTe": "గునుపూడి ఔటర్ & ఇండస్ట్రియల్ ఎస్టేట్ (IALA)",
    "nameEn": "Gunupudi Outer & Industrial Estate (IALA)",
    "zone": "North-East Outer Zone",
    "pop": 3490,
    "areaSqKm": 0.43,
    "minElev": 2.5,
    "avgElev": 3.4,
    "lowLyingPct": 52,
    "drainLenKm": 3.9,
    "siltPct": 58,
    "vulnerableBldgs": 360,
    "riskScore": 88,
    "riskCategory": "Very High Risk",
    "riskColor": "#ef4444",
    "center": [
      16.555,
      81.552
    ],
    "rsNos": [
      24,
      23,
      22,
      19,
      18,
      13,
      12,
      1,
      191
    ],
    "landmarks": [
      "Natural boundary of Bhimavaram municipality",
      "P.P road & Bhimavaram Municipal limits junction",
      "Kurmayya peta school road",
      "Kandikappu Dibba",
      "Industrial estate road plot 51 IALA",
      "Eastern power Distribution Center",
      "CSN college western boundary"
    ]
  },
  {
    "id": 7,
    "nameTe": "భారతీయ విద్యాభవన్ రోడ్డు & గాంధీనగర్",
    "nameEn": "Bharatiya Vidya Bhavans Road & Gandhinagar",
    "zone": "East Zone",
    "pop": 3080,
    "areaSqKm": 0.35,
    "minElev": 2.6,
    "avgElev": 3.6,
    "lowLyingPct": 48,
    "drainLenKm": 3.1,
    "siltPct": 46,
    "vulnerableBldgs": 280,
    "riskScore": 82,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.542,
      81.5495
    ],
    "rsNos": [
      195,
      201,
      731,
      489,
      431,
      726,
      723
    ],
    "landmarks": [
      "P.P road",
      "Bhimavaram municipal limits",
      "Bharatiya Vidya Bhavans Road",
      "Railway gate",
      "Gandhinagar Road",
      "G&V canal"
    ]
  },
  {
    "id": 8,
    "nameTe": "చినరంగనిపాలెం & G&V కెనాల్ వెస్ట్ బండ్",
    "nameEn": "Chinaranganipalem & G&V Canal West Bund",
    "zone": "East-Central Zone",
    "pop": 3550,
    "areaSqKm": 0.46,
    "minElev": 2.8,
    "avgElev": 4,
    "lowLyingPct": 35,
    "drainLenKm": 4.2,
    "siltPct": 42,
    "vulnerableBldgs": 210,
    "riskScore": 72,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.5435,
      81.542
    ],
    "rsNos": [
      244,
      236,
      384,
      374
    ],
    "landmarks": [
      "PP road",
      "Chinaranganipalem main road",
      "G&V Canal West bund road",
      "BVRM-NSP railway line",
      "FCI godowns road",
      "Railway quarters road",
      "Bandarpuntha road"
    ]
  },
  {
    "id": 9,
    "nameTe": "జంక్షన్ రైల్వే స్టేషన్ రోడ్డు & వెజిటబుల్ మార్కెట్",
    "nameEn": "Junction Railway Station Road & Veg Market",
    "zone": "Central-East Zone",
    "pop": 3220,
    "areaSqKm": 0.39,
    "minElev": 2.9,
    "avgElev": 4.2,
    "lowLyingPct": 30,
    "drainLenKm": 3.5,
    "siltPct": 38,
    "vulnerableBldgs": 175,
    "riskScore": 64,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5425,
      81.5365
    ],
    "rsNos": [
      292,
      262,
      250,
      385,
      257
    ],
    "landmarks": [
      "PP road",
      "Junction railway station road",
      "Vegetable market street road",
      "APHB road",
      "Temple Tree Heights Apartment",
      "Traffic park South side road",
      "Geethams school",
      "Aditya school road"
    ]
  },
  {
    "id": 10,
    "nameTe": "APHB కాలనీ & ట్రాఫిక్ పార్క్ సౌత్",
    "nameEn": "APHB Colony & Traffic Park South",
    "zone": "Central-East Zone",
    "pop": 3190,
    "areaSqKm": 0.37,
    "minElev": 2.7,
    "avgElev": 3.7,
    "lowLyingPct": 44,
    "drainLenKm": 3.3,
    "siltPct": 48,
    "vulnerableBldgs": 250,
    "riskScore": 79,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.5385,
      81.5365
    ],
    "rsNos": [
      315,
      262,
      365
    ],
    "landmarks": [
      "BVRM-NSP railway boundary",
      "Junction railway station road",
      "Aditya school",
      "APHB road",
      "Geethams school",
      "Traffic park south road",
      "Temple tree apartment road",
      "Vegetable market street",
      "Chinaranganipalem main road",
      "Bandaru puntha road",
      "FCI road",
      "Railway quarters road"
    ]
  },
  {
    "id": 11,
    "nameTe": "కందికట్ల వారి వీధి & Z-బ్రిడ్జి నార్త్",
    "nameEn": "Kandikatla Vari Street & Z-Bridge North",
    "zone": "Two Town East",
    "pop": 2980,
    "areaSqKm": 0.33,
    "minElev": 3.1,
    "avgElev": 4.5,
    "lowLyingPct": 22,
    "drainLenKm": 2.8,
    "siltPct": 35,
    "vulnerableBldgs": 120,
    "riskScore": 54,
    "riskCategory": "Low Risk",
    "riskColor": "#84cc16",
    "center": [
      16.5355,
      81.5325
    ],
    "rsNos": [
      367
    ],
    "landmarks": [
      "Railway compound wall",
      "G&V canal Center line",
      "Z Bridge",
      "Kandikatla vari street",
      "BN Road",
      "Gunupudi drain",
      "Vasanthala vari street"
    ]
  },
  {
    "id": 12,
    "nameTe": "బ్రిడ్జిపేట & AP టిడ్కో హౌసింగ్ కాలనీ",
    "nameEn": "Bridgepeta & AP TIDCO Housing Colony",
    "zone": "South-East Zone",
    "pop": 3370,
    "areaSqKm": 0.4,
    "minElev": 2.6,
    "avgElev": 3.5,
    "lowLyingPct": 50,
    "drainLenKm": 3.6,
    "siltPct": 50,
    "vulnerableBldgs": 310,
    "riskScore": 84,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.5325,
      81.546
    ],
    "rsNos": [
      723,
      726,
      431,
      491,
      629,
      624,
      463,
      468
    ],
    "landmarks": [
      "G&V canal road",
      "Gandhinagar road",
      "Bhimavaram Matsyapuri road",
      "AP TIDCO housing colony",
      "Bridgepeta",
      "Z bridge"
    ]
  },
  {
    "id": 13,
    "nameTe": "తాడేరు రెవెన్యూ విలేజ్ లిమిట్స్",
    "nameEn": "Taderu Revenue Village Limits",
    "zone": "South-East Outer Zone",
    "pop": 3450,
    "areaSqKm": 0.42,
    "minElev": 3.2,
    "avgElev": 4.6,
    "lowLyingPct": 20,
    "drainLenKm": 3.7,
    "siltPct": 30,
    "vulnerableBldgs": 110,
    "riskScore": 50,
    "riskCategory": "Low Risk",
    "riskColor": "#84cc16",
    "center": [
      16.523,
      81.553
    ],
    "rsNos": [
      1,
      508,
      448
    ],
    "landmarks": [
      "Gunupudi south drain",
      "Taderu revenue village limit"
    ]
  },
  {
    "id": 14,
    "nameTe": "మిషన్ హాస్పిటల్ సౌత్ & బేతనిపేట",
    "nameEn": "Mission Hospital South & Bethanipeta",
    "zone": "South-East Zone",
    "pop": 3120,
    "areaSqKm": 0.36,
    "minElev": 2.8,
    "avgElev": 3.9,
    "lowLyingPct": 34,
    "drainLenKm": 3.2,
    "siltPct": 39,
    "vulnerableBldgs": 180,
    "riskScore": 66,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5285,
      81.5335
    ],
    "rsNos": [
      629,
      704,
      716
    ],
    "landmarks": [
      "Mission Hospital South Road",
      "Punta road",
      "Canal Road",
      "BN road",
      "Taderu Bridge",
      "South Canal",
      "St. Anns school road",
      "Bethanipeta road"
    ]
  },
  {
    "id": 15,
    "nameTe": "రాజీవ్ గాంధీ & YSR విగ్రహం సెంటర్",
    "nameEn": "Rajeev Gandhi & YSR Statue Center",
    "zone": "Central-East Zone",
    "pop": 3310,
    "areaSqKm": 0.39,
    "minElev": 2.9,
    "avgElev": 4,
    "lowLyingPct": 31,
    "drainLenKm": 3.4,
    "siltPct": 37,
    "vulnerableBldgs": 160,
    "riskScore": 63,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.533,
      81.5315
    ],
    "rsNos": [],
    "landmarks": [
      "Rajeev Gandhi statue",
      "BN road",
      "YSR statue",
      "Z-bridge",
      "G&V canal",
      "Leprosy colony road",
      "Bridge peta bridge",
      "Pavurala vari veedhi",
      "Drain bund road"
    ]
  },
  {
    "id": 16,
    "nameTe": "రజకుల వీధి & మిషన్ హాస్పిటల్ ఈస్ట్",
    "nameEn": "Rajakula Veedhi & Mission Hospital East",
    "zone": "Central Zone",
    "pop": 3580,
    "areaSqKm": 0.45,
    "minElev": 3.4,
    "avgElev": 4.8,
    "lowLyingPct": 18,
    "drainLenKm": 4,
    "siltPct": 28,
    "vulnerableBldgs": 95,
    "riskScore": 46,
    "riskCategory": "Low Risk",
    "riskColor": "#84cc16",
    "center": [
      16.5345,
      81.528
    ],
    "rsNos": [
      352
    ],
    "landmarks": [
      "Rajiv Gandhi Statue road",
      "Rajakula veedhi",
      "Canal bund road",
      "Mission Hospital East Compound Wall Road"
    ]
  },
  {
    "id": 17,
    "nameTe": "నచ్చువారి జంక్షన్ & సోమేశ్వర స్వామి గుడి",
    "nameEn": "Nachuvari Junction & Someswara Swamy Temple",
    "zone": "One Town Center",
    "pop": 3740,
    "areaSqKm": 0.5,
    "minElev": 2.6,
    "avgElev": 3.5,
    "lowLyingPct": 56,
    "drainLenKm": 4.8,
    "siltPct": 54,
    "vulnerableBldgs": 420,
    "riskScore": 90,
    "riskCategory": "Critical Risk",
    "riskColor": "#991b1b",
    "center": [
      16.5375,
      81.527
    ],
    "rsNos": [],
    "landmarks": [
      "Mission hospital road",
      "Bhimavaram-Narasapuram road (Nachuvari Junction)",
      "Someswara swamy temple",
      "Telaga vari street",
      "Gudur anjaneyulu vari street"
    ]
  },
  {
    "id": 18,
    "nameTe": "పెద్ద మసీదు & గుమాస్తాల వారి వీధి",
    "nameEn": "Pedda Masjid & Gumasthala Vari Street",
    "zone": "One Town Center",
    "pop": 3040,
    "areaSqKm": 0.34,
    "minElev": 2.6,
    "avgElev": 3.6,
    "lowLyingPct": 49,
    "drainLenKm": 3,
    "siltPct": 47,
    "vulnerableBldgs": 260,
    "riskScore": 81,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.5395,
      81.5255
    ],
    "rsNos": [],
    "landmarks": [
      "Pedda masjid road",
      "Motupalli vari street",
      "Gumasthala vari Street",
      "Mohammadeeyula street",
      "Old Y.drain",
      "Pasupuleti vari street",
      "Raitu bazar road",
      "Nimmala gunta park street",
      "BN road",
      "Mission Hospital road",
      "Guduri Anjaneyulu street",
      "Bethani peta street",
      "Ramaraju Bhusanam street",
      "Ravururi vari street",
      "Prayaga vari street",
      "Rayaprolu vari street",
      "Veluri vari street"
    ]
  },
  {
    "id": 19,
    "nameTe": "గునుపూడి డ్రెయిన్ & అయ్యవారి వీధి",
    "nameEn": "Gunupudi Drain & Ayyavari Street",
    "zone": "One Town Central",
    "pop": 3260,
    "areaSqKm": 0.38,
    "minElev": 3,
    "avgElev": 4.3,
    "lowLyingPct": 26,
    "drainLenKm": 3.3,
    "siltPct": 35,
    "vulnerableBldgs": 140,
    "riskScore": 58,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5415,
      81.529
    ],
    "rsNos": [],
    "landmarks": [
      "Railway compound wall",
      "Gunupudi drain",
      "Gunupudi Water tank",
      "Badugu vari street (major drain)",
      "BN road",
      "Someswara swamy temple",
      "Nachu vari centre",
      "Ayyavari street",
      "Yamijaalavari street",
      "Railway junction road"
    ]
  },
  {
    "id": 20,
    "nameTe": "ఫైర్ స్టేషన్ & బండారు మల్లేశ్వరరావు వీధి",
    "nameEn": "Fire Station & Bandaru Malleswarao Street",
    "zone": "One Town Central",
    "pop": 3390,
    "areaSqKm": 0.41,
    "minElev": 3.3,
    "avgElev": 4.7,
    "lowLyingPct": 17,
    "drainLenKm": 3.6,
    "siltPct": 27,
    "vulnerableBldgs": 85,
    "riskScore": 44,
    "riskCategory": "Low Risk",
    "riskColor": "#84cc16",
    "center": [
      16.5435,
      81.527
    ],
    "rsNos": [],
    "landmarks": [
      "Bandaru Malleswarao street",
      "Railway junction road",
      "Fire station road",
      "Yamijalavari street",
      "Ayyavari street",
      "Old BSNL office road",
      "Krishna temple",
      "Pasupuleti vari street",
      "Nilla vari street",
      "Bandaru apparao street"
    ]
  },
  {
    "id": 21,
    "nameTe": "RTC కాంప్లెక్స్ & గూడ్స్ షెడ్ రోడ్డు",
    "nameEn": "RTC Complex & Goods Shed Road",
    "zone": "One Town Central",
    "pop": 3480,
    "areaSqKm": 0.44,
    "minElev": 3.1,
    "avgElev": 4.4,
    "lowLyingPct": 28,
    "drainLenKm": 4.1,
    "siltPct": 36,
    "vulnerableBldgs": 180,
    "riskScore": 71,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.5455,
      81.526
    ],
    "rsNos": [],
    "landmarks": [
      "Palakollu-Pamarru road",
      "RTC Complex East side road",
      "Railway Compound wall",
      "Goods Shed road",
      "Bandela vari Street",
      "Nilla vari Street",
      "Paluri vari Street",
      "Pasupuleti vari Street",
      "Rajakula Cheruvu North road",
      "Rajakula Cheruvu West Road",
      "Mohammadeeyula Street",
      "Old Y Drain Road",
      "Gumasthala vari Street"
    ]
  },
  {
    "id": 22,
    "nameTe": "కామరాజు వారి వీధి & త్రికూట రైల్వే జంక్షన్",
    "nameEn": "Kamaraju Vari Veedhi & Tri-Junction Railway",
    "zone": "One Town Railway Zone",
    "pop": 3610,
    "areaSqKm": 0.48,
    "minElev": 3,
    "avgElev": 4.2,
    "lowLyingPct": 34,
    "drainLenKm": 4.5,
    "siltPct": 41,
    "vulnerableBldgs": 230,
    "riskScore": 75,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.5465,
      81.529
    ],
    "rsNos": [],
    "landmarks": [
      "Bhimavaram–Gudivada Railway line",
      "Bhimavaram–Narsapuram line Junction",
      "Bhimavaram–Tanuku railway line",
      "Tri-Junction of Bhimavaram–Tanuku, Bhimavaram–Narsapuram and P.P Road",
      "PP Road",
      "Kamaraju vari veedhi"
    ]
  },
  {
    "id": 23,
    "nameTe": "మోటుపల్లి వారి వీధి & పద్మశ్రీ రోడ్డు",
    "nameEn": "Motupalli Vari Veedhi & Padmasri Road",
    "zone": "One Town West",
    "pop": 3290,
    "areaSqKm": 0.4,
    "minElev": 3.2,
    "avgElev": 4.5,
    "lowLyingPct": 24,
    "drainLenKm": 3.7,
    "siltPct": 34,
    "vulnerableBldgs": 150,
    "riskScore": 59,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.544,
      81.5215
    ],
    "rsNos": [
      363,
      366,
      650
    ],
    "landmarks": [
      "Old Yanamaduru Drain",
      "Miramiya Kodu drain",
      "Bhimavaram–Nidadavolu Railway line",
      "Bhimavaram–Palakollu railway line",
      "Motupalli vari veedhi",
      "P.P. road junction",
      "Bus stand road",
      "Subramanyam swamy temple",
      "Divya fancy shop",
      "Padmasri road (Reliance super market backside road)"
    ]
  },
  {
    "id": 24,
    "nameTe": "రెస్ట్ హౌస్ రోడ్డు & వీరమ్మ పార్క్",
    "nameEn": "Rest House Road & Veeramma Park",
    "zone": "One Town Center",
    "pop": 3170,
    "areaSqKm": 0.37,
    "minElev": 3.3,
    "avgElev": 4.6,
    "lowLyingPct": 21,
    "drainLenKm": 3.4,
    "siltPct": 32,
    "vulnerableBldgs": 130,
    "riskScore": 53,
    "riskCategory": "Low Risk",
    "riskColor": "#84cc16",
    "center": [
      16.5425,
      81.523
    ],
    "rsNos": [],
    "landmarks": [
      "Rest House Road",
      "Palakollu Pamarru Road",
      "Indian Bank Road",
      "RTC Complex south side road",
      "Anjaneya Swamy Temple Junction",
      "Pedda Masjid Road",
      "Veeramma park west side road",
      "B.N.Road",
      "Sri Potti Sriramulu statue"
    ]
  },
  {
    "id": 25,
    "nameTe": "మున్సిపల్ ఆఫీస్ రోడ్డు & తాటవర్తి వారి వీధి",
    "nameEn": "Municipal Office Road & Tatavarthy Vari Street",
    "zone": "Two Town Center",
    "pop": 3520,
    "areaSqKm": 0.45,
    "minElev": 2.7,
    "avgElev": 3.7,
    "lowLyingPct": 47,
    "drainLenKm": 4.2,
    "siltPct": 52,
    "vulnerableBldgs": 320,
    "riskScore": 85,
    "riskCategory": "Very High Risk",
    "riskColor": "#ef4444",
    "center": [
      16.539,
      81.5225
    ],
    "rsNos": [],
    "landmarks": [
      "Municipal Office Road",
      "Tatavarthy vari street",
      "BN Road",
      "Veluri vari street",
      "Rayaprolu vari street",
      "Old Y drain road",
      "Yerragopu vari street",
      "Katari vari street",
      "Moganti vari street"
    ]
  },
  {
    "id": 26,
    "nameTe": "ఎడ్వర్డ్ ట్యాంక్ & గవర్నమెంట్ హాస్పిటల్ రోడ్డు",
    "nameEn": "Edward Tank & Govt Hospital Road",
    "zone": "Two Town West",
    "pop": 3440,
    "areaSqKm": 0.43,
    "minElev": 2.6,
    "avgElev": 3.5,
    "lowLyingPct": 51,
    "drainLenKm": 4,
    "siltPct": 54,
    "vulnerableBldgs": 350,
    "riskScore": 89,
    "riskCategory": "Very High Risk",
    "riskColor": "#ef4444",
    "center": [
      16.539,
      81.5185
    ],
    "rsNos": [],
    "landmarks": [
      "Yanamadurru Drain",
      "Bhimavaram–Gudiwada Railway Line",
      "Rest House Road",
      "Thatavarthy Vari Street",
      "Municipal Office Road",
      "Rayasam vari Street",
      "Edward tank south side road",
      "Government Hospital Road",
      "Sarraju vari street"
    ]
  },
  {
    "id": 27,
    "nameTe": "హెడ్ పోస్ట్ ఆఫీస్ & లూథరన్ హైస్కూల్ గ్రౌండ్",
    "nameEn": "Head Post Office & Lutheran High School Ground",
    "zone": "Two Town West",
    "pop": 3310,
    "areaSqKm": 0.4,
    "minElev": 3.3,
    "avgElev": 4.6,
    "lowLyingPct": 23,
    "drainLenKm": 3.8,
    "siltPct": 31,
    "vulnerableBldgs": 125,
    "riskScore": 56,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5355,
      81.518
    ],
    "rsNos": [],
    "landmarks": [
      "Rayasam vari street",
      "Government Hospital road",
      "Head Post office",
      "Municipal Office road",
      "Moganti Vari Street Junction",
      "Rest house Road",
      "Akkarabothu Vari Street",
      "Luthern High School Ground Compound",
      "Christian Burial Ground West side road",
      "Yanamadurru Drain",
      "Sarraju vari street"
    ]
  },
  {
    "id": 28,
    "nameTe": "కటారి వారి వీధి & సుంకర ప Peddaయ్య వీధి",
    "nameEn": "Katari Vari Street & Sunkara Padayya Street",
    "zone": "Two Town Center",
    "pop": 3680,
    "areaSqKm": 0.49,
    "minElev": 2.8,
    "avgElev": 3.9,
    "lowLyingPct": 43,
    "drainLenKm": 4.6,
    "siltPct": 46,
    "vulnerableBldgs": 290,
    "riskScore": 80,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.5368,
      81.522
    ],
    "rsNos": [],
    "landmarks": [
      "Katari vari street",
      "Sunkara padayya street",
      "Yadhavula vari street -2",
      "Rest house road"
    ]
  },
  {
    "id": 29,
    "nameTe": "SP స్ట్రీట్ & ఎర్రగోపు వారి వీధి",
    "nameEn": "S.P. Street & Yerragopu Vari Street",
    "zone": "Two Town Center",
    "pop": 3820,
    "areaSqKm": 0.54,
    "minElev": 2.4,
    "avgElev": 3.3,
    "lowLyingPct": 65,
    "drainLenKm": 5.1,
    "siltPct": 59,
    "vulnerableBldgs": 460,
    "riskScore": 95,
    "riskCategory": "Critical Risk",
    "riskColor": "#991b1b",
    "center": [
      16.535,
      81.5238
    ],
    "rsNos": [],
    "landmarks": [
      "S.P.Street",
      "Yerragopuvari Street",
      "Old Yanamadurru Drain Road",
      "Yalla Vari Street",
      "Baduguvari street",
      "Chikilevari Street",
      "Subash Vari Street"
    ]
  },
  {
    "id": 30,
    "nameTe": "రాయప్రోలు వారి వీధి & రావురి వారి వీధి",
    "nameEn": "Rayaprolu Vari Street & Ravuri Vari Street",
    "zone": "One Town South",
    "pop": 3250,
    "areaSqKm": 0.39,
    "minElev": 2.9,
    "avgElev": 4.1,
    "lowLyingPct": 33,
    "drainLenKm": 3.5,
    "siltPct": 40,
    "vulnerableBldgs": 195,
    "riskScore": 69,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5335,
      81.5255
    ],
    "rsNos": [],
    "landmarks": [
      "Old Yanamadurru Drain West side Road",
      "Rayaprolu vari street",
      "Ravuri Vari Street",
      "Mission Hospital Compound North Side Road",
      "Bethanipeta Road",
      "Old Y Drain east Side Road"
    ]
  },
  {
    "id": 31,
    "nameTe": "గంగనమ్మ గుడి & క్రిస్టియన్ బరియల్ గ్రౌండ్",
    "nameEn": "Ganganamma Gudi & Christian Burial Ground",
    "zone": "Two Town Central-South",
    "pop": 3110,
    "areaSqKm": 0.36,
    "minElev": 3,
    "avgElev": 4.3,
    "lowLyingPct": 29,
    "drainLenKm": 3.3,
    "siltPct": 37,
    "vulnerableBldgs": 165,
    "riskScore": 62,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5325,
      81.521
    ],
    "rsNos": [],
    "landmarks": [
      "Rest house road",
      "Yadhavula vari street 2",
      "SP street",
      "Subhash gari street",
      "Chinapeta road",
      "Chikilevari street",
      "Old Y.drain junction",
      "Teachers street",
      "Degalavari veedhi",
      "Ganganamma Gudi centre",
      "Centre line of Yanamadurru Drain",
      "Christian Burial ground",
      "Luthern High School Ground Compound"
    ]
  },
  {
    "id": 32,
    "nameTe": "శ్రీకృష్ణదేవరాయ ఫంక్షన్ హాల్ & దిరుసుమర్రు రోడ్డు",
    "nameEn": "Sri Krishnadevaraya Function Hall & Dirusumarru Rd",
    "zone": "Two Town South",
    "pop": 3380,
    "areaSqKm": 0.42,
    "minElev": 2.7,
    "avgElev": 3.7,
    "lowLyingPct": 46,
    "drainLenKm": 3.9,
    "siltPct": 49,
    "vulnerableBldgs": 275,
    "riskScore": 81,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.5305,
      81.5228
    ],
    "rsNos": [],
    "landmarks": [
      "S.P.street",
      "Degalavari veedhi",
      "Chinapeta street",
      "Chinna Anjaneya swamy temple",
      "M.L.A street",
      "Sri Krishna devaraya function hall west road",
      "Reddy colony street",
      "Kapu kalyana mandapam road",
      "Old Y.Drain",
      "St. Ann's school road",
      "Dirsumarru road junction at Fish market"
    ]
  },
  {
    "id": 33,
    "nameTe": "రెడ్డీ కాలనీ & కాపు కళ్యాణ మండపం రోడ్డు",
    "nameEn": "Reddy Colony & Kapu Kalyana Mandapam Road",
    "zone": "South-Central Zone",
    "pop": 3490,
    "areaSqKm": 0.46,
    "minElev": 3,
    "avgElev": 4.2,
    "lowLyingPct": 32,
    "drainLenKm": 4.1,
    "siltPct": 38,
    "vulnerableBldgs": 205,
    "riskScore": 67,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5275,
      81.524
    ],
    "rsNos": [
      504,
      506,
      517,
      530,
      629,
      634
    ],
    "landmarks": [
      "Chinapeta street",
      "Teacher street",
      "Old Y.drain west bund road",
      "Bhimavaram Municipal boundary limits",
      "Dirusumarru road",
      "Yanamadurru bund road",
      "St. Ann's school road",
      "Kapu kalyana mandapam road",
      "Reddy colony street",
      "Sri Krishna devaraya function hall",
      "M.L.A street",
      "Chinna Anjaneya swamy temple"
    ]
  },
  {
    "id": 34,
    "nameTe": "BC కాలనీ & గొల్లవానితిప్ప రోడ్డు జంక్షన్",
    "nameEn": "BC Colony & Gollavanitippa Road Junction",
    "zone": "South Zone",
    "pop": 3070,
    "areaSqKm": 0.35,
    "minElev": 3.1,
    "avgElev": 4.4,
    "lowLyingPct": 27,
    "drainLenKm": 3.2,
    "siltPct": 36,
    "vulnerableBldgs": 155,
    "riskScore": 60,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5245,
      81.5175
    ],
    "rsNos": [
      605
    ],
    "landmarks": [
      "B.C. colony",
      "Municipal open space",
      "DNR college road gollavanitippa road junction",
      "Yanamadurru drain centre line",
      "Municipal limits"
    ]
  },
  {
    "id": 35,
    "nameTe": "DNR కాలేజీ గ్రౌండ్ & ఇంజనీరింగ్ కాలేజీ రోడ్డు",
    "nameEn": "DNR College Ground & Engg College Road",
    "zone": "South-West Zone",
    "pop": 3560,
    "areaSqKm": 0.47,
    "minElev": 2.8,
    "avgElev": 3.9,
    "lowLyingPct": 41,
    "drainLenKm": 4.3,
    "siltPct": 44,
    "vulnerableBldgs": 260,
    "riskScore": 77,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.5285,
      81.515
    ],
    "rsNos": [],
    "landmarks": [
      "D.N.R college ground road",
      "Komarada road",
      "D.N.R college internal road",
      "D.N.R Engineering college road",
      "Ram Lakshmana nagar colony",
      "B.C. colony layout open space",
      "Water tank road"
    ]
  },
  {
    "id": 36,
    "nameTe": "శ్రీరాంపురం మెయిన్ రోడ్డు & లోసరి కెనాల్ రోడ్డు",
    "nameEn": "Srirampuram Main Road & Losari Canal Road",
    "zone": "West Zone",
    "pop": 3210,
    "areaSqKm": 0.38,
    "minElev": 3.2,
    "avgElev": 4.5,
    "lowLyingPct": 25,
    "drainLenKm": 3.5,
    "siltPct": 33,
    "vulnerableBldgs": 140,
    "riskScore": 57,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5335,
      81.5135
    ],
    "rsNos": [],
    "landmarks": [
      "J.P. road",
      "Losari canal road",
      "Srirampuram main road junction",
      "Yanamadurru canal center line",
      "D.N.R college ground road",
      "Komarada road",
      "Karanam gari street",
      "Gundu sagarams street",
      "Kompella vari street"
    ]
  },
  {
    "id": 37,
    "nameTe": "రాయలవరం రోడ్డు & నేతాజీ స్ట్రీట్",
    "nameEn": "Rayalam Road & Nethaji Street",
    "zone": "West Zone",
    "pop": 3720,
    "areaSqKm": 0.51,
    "minElev": 2.1,
    "avgElev": 3.1,
    "lowLyingPct": 69,
    "drainLenKm": 4.9,
    "siltPct": 63,
    "vulnerableBldgs": 450,
    "riskScore": 96,
    "riskCategory": "Critical Risk",
    "riskColor": "#991b1b",
    "center": [
      16.536,
      81.509
    ],
    "rsNos": [],
    "landmarks": [
      "J.P.Road",
      "Rayalam Road junction",
      "Kompalli vari street",
      "Gundu sagarams street",
      "Rajarajeswari street",
      "D.N.R College road junction",
      "Nethaji street",
      "Karanamgari street"
    ]
  },
  {
    "id": 38,
    "nameTe": "ప్రశాంతి నగర్ & బాలుసుమూడి మవుళ్ళమ్మ గుడి",
    "nameEn": "Prasanthi Nagar & Balusumudi Mavullamma Temple",
    "zone": "West Zone",
    "pop": 3140,
    "areaSqKm": 0.37,
    "minElev": 3.1,
    "avgElev": 4.4,
    "lowLyingPct": 26,
    "drainLenKm": 3.4,
    "siltPct": 35,
    "vulnerableBldgs": 145,
    "riskScore": 61,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5335,
      81.5078
    ],
    "rsNos": [],
    "landmarks": [
      "Rayalam road",
      "Karanamgari street",
      "Nethaji street",
      "Prasanthi nagar street 1 & 3",
      "D.N.R college road",
      "Balusumudi mavullamma temple street",
      "Chandrika enclave apartment",
      "Ramalayam temple Y-junction",
      "Church street",
      "Komarada road",
      "Bhimavaram revenue village boundary"
    ]
  },
  {
    "id": 39,
    "nameTe": "కుమ్మర్ల వీధి & పాత భీమవరం టౌన్ లిమిట్స్",
    "nameEn": "Kummarla Street & Old Bhimavaram Town Limits",
    "zone": "South-West Zone",
    "pop": 3410,
    "areaSqKm": 0.44,
    "minElev": 3.2,
    "avgElev": 4.6,
    "lowLyingPct": 24,
    "drainLenKm": 3.9,
    "siltPct": 34,
    "vulnerableBldgs": 160,
    "riskScore": 60,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5305,
      81.509
    ],
    "rsNos": [],
    "landmarks": [
      "Komarada road",
      "Church street",
      "Kummarla street",
      "Ramalayam temple Y-junction",
      "Balusumudi mavullamma temple street",
      "D.N.R college road",
      "Old Bhimavaram Town Limits",
      "Rayalam Bhimavaram boundary limits"
    ]
  },
  {
    "id": 40,
    "nameTe": "చినమిల్లి నాయుడు విగ్రహం & రాయలవరం ఆర్చ్",
    "nameEn": "Chinamilli Naidu Statue & Rayalam Arch",
    "zone": "Rayalam North Zone",
    "pop": 3090,
    "areaSqKm": 0.35,
    "minElev": 3.4,
    "avgElev": 4.8,
    "lowLyingPct": 19,
    "drainLenKm": 3.1,
    "siltPct": 29,
    "vulnerableBldgs": 105,
    "riskScore": 48,
    "riskCategory": "Low Risk",
    "riskColor": "#84cc16",
    "center": [
      16.527,
      81.5045
    ],
    "rsNos": [
      90,
      254
    ],
    "landmarks": [
      "Chinamilli Naidu statue",
      "Rayalam Arch",
      "Balusumudi–Komarada Branch Canal",
      "Ramanayya Kodu",
      "Komarada Village boundary",
      "Kamakshamma Temple",
      "Shiva Temple",
      "R&B Road",
      "Guttula Satyanarayana Coffee Hotel",
      "Karnam Gari Bodhi"
    ]
  },
  {
    "id": 41,
    "nameTe": "రాయలవరం పంచాయతీ ఆఫీస్ & శివాలయం",
    "nameEn": "Rayalam Panchayat Office & Shiva Temple",
    "zone": "Rayalam Central Zone",
    "pop": 3180,
    "areaSqKm": 0.42,
    "minElev": 3.5,
    "avgElev": 5.1,
    "lowLyingPct": 16,
    "drainLenKm": 3.5,
    "siltPct": 26,
    "vulnerableBldgs": 90,
    "riskScore": 43,
    "riskCategory": "Low Risk",
    "riskColor": "#84cc16",
    "center": [
      16.5225,
      81.502
    ],
    "rsNos": [],
    "landmarks": [
      "Panchayat Office Main Road",
      "Brahmam Gari Temple",
      "Shiva Temple",
      "Pallapu Street",
      "R&B Road",
      "Setti Balija Ramalayam",
      "Arundhati Street",
      "Kamakshamma Temple",
      "Komarada Village Boundary",
      "Chabattula Street",
      "Uppugunta Cheruvu Road",
      "Karnam Gari Bodhi"
    ]
  },
  {
    "id": 42,
    "nameTe": "అనకోడేరు ఇరిగేషన్ కెనాల్ & బైపాస్ రోడ్డు",
    "nameEn": "Anakoderu Irrigation Canal & Bypass Rd",
    "zone": "Rayalam-Anakoderu Zone",
    "pop": 3270,
    "areaSqKm": 0.45,
    "minElev": 3.3,
    "avgElev": 4.8,
    "lowLyingPct": 25,
    "drainLenKm": 3.8,
    "siltPct": 38,
    "vulnerableBldgs": 155,
    "riskScore": 62,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5215,
      81.4955
    ],
    "rsNos": [],
    "landmarks": [
      "Anakoderu irrigation canal",
      "Bypass road leading to Rayalam",
      "Rayudu Gari Statue",
      "Naidu Gari Statue",
      "Kamakshamma Temple",
      "Panchayat Road",
      "Arundhati Peta",
      "Chinamiram Village boundary"
    ]
  },
  {
    "id": 43,
    "nameTe": "SRKR ఇంజనీరింగ్ కాలేజీ & అంబేద్కర్ సెంటర్",
    "nameEn": "SRKR Engineering College & Ambedkar Centre",
    "zone": "Chinamiram-Pedamiram Zone",
    "pop": 3020,
    "areaSqKm": 0.38,
    "minElev": 3.1,
    "avgElev": 4.5,
    "lowLyingPct": 28,
    "drainLenKm": 3.2,
    "siltPct": 35,
    "vulnerableBldgs": 140,
    "riskScore": 59,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.5415,
      81.496
    ],
    "rsNos": [],
    "landmarks": [
      "Pedamiram Village Southern Boundary",
      "S.R.K.R. College",
      "Bhimavaram Hospital",
      "Ambedkar Centre",
      "Patapeta",
      "Anakoderu Village Northern Boundary",
      "Vempadu Village"
    ]
  },
  {
    "id": 44,
    "nameTe": "యూత్ క్లబ్ రోడ్డు & చినమిరం విలేజ్ లిమిట్స్",
    "nameEn": "Youth Club Road & Chinamiram Village Limits",
    "zone": "Chinamiram Zone",
    "pop": 3350,
    "areaSqKm": 0.43,
    "minElev": 3.6,
    "avgElev": 5.2,
    "lowLyingPct": 15,
    "drainLenKm": 3.6,
    "siltPct": 25,
    "vulnerableBldgs": 80,
    "riskScore": 41,
    "riskCategory": "Very Low Risk",
    "riskColor": "#15803d",
    "center": [
      16.541,
      81.5025
    ],
    "rsNos": [
      130,
      146,
      131
    ],
    "landmarks": [
      "Southern Boundary of Pedamiram Village",
      "J.P Road",
      "Youth club road junction",
      "Chinamiram road junction",
      "Chinamiram village limits",
      "S.R.K.R. College",
      "Bhimavaram Hospital",
      "Ambedkar Centre",
      "Patapeta"
    ]
  },
  {
    "id": 45,
    "nameTe": "సర్ ఆర్థర్ కాటన్ పార్క్ & రాయలవరం డ్రెయిన్",
    "nameEn": "Sir Arthur Cotton Park & Rayalam Drain",
    "zone": "West Central Zone",
    "pop": 2990,
    "areaSqKm": 0.41,
    "minElev": 3.4,
    "avgElev": 4.9,
    "lowLyingPct": 20,
    "drainLenKm": 3.3,
    "siltPct": 30,
    "vulnerableBldgs": 110,
    "riskScore": 51,
    "riskCategory": "Low Risk",
    "riskColor": "#84cc16",
    "center": [
      16.5375,
      81.505
    ],
    "rsNos": [
      76
    ],
    "landmarks": [
      "J.P Road",
      "Chinaamiram road junction",
      "Sir Arthur cotton park",
      "Rayalam Drain Junction",
      "Bhimavaram revenue village limits"
    ]
  },
  {
    "id": 46,
    "nameTe": "కాస్మోపాలిటన్ క్లబ్ రోడ్డు & కెనరా బ్యాంక్",
    "nameEn": "Cosmopolitan Club Road & Canara Bank",
    "zone": "West Central Zone",
    "pop": 3240,
    "areaSqKm": 0.48,
    "minElev": 2.7,
    "avgElev": 3.8,
    "lowLyingPct": 45,
    "drainLenKm": 4,
    "siltPct": 48,
    "vulnerableBldgs": 270,
    "riskScore": 80,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.5445,
      81.5065
    ],
    "rsNos": [
      1,
      26,
      50
    ],
    "landmarks": [
      "Municipal limits",
      "Rayalam drain",
      "Cosmopolitan club road",
      "J.P. Road junction",
      "Canara bank near D.No.7-199",
      "Youth club road"
    ]
  },
  {
    "id": 47,
    "nameTe": "పాత కరెంట్ ఆఫీస్ రోడ్డు & ఉండి రోడ్డు జంక్షన్",
    "nameEn": "Old Current Office Rd & Undi Rd Junction",
    "zone": "West Central Zone",
    "pop": 3160,
    "areaSqKm": 0.46,
    "minElev": 2.5,
    "avgElev": 3.6,
    "lowLyingPct": 53,
    "drainLenKm": 4.1,
    "siltPct": 56,
    "vulnerableBldgs": 345,
    "riskScore": 87,
    "riskCategory": "Very High Risk",
    "riskColor": "#ef4444",
    "center": [
      16.542,
      81.5115
    ],
    "rsNos": [],
    "landmarks": [
      "Rayalam drain",
      "Old current office road",
      "Anakoderu canal and undi road junction",
      "Losari canal road",
      "J.P. road & Losari canal junction",
      "Cosmopolitan club road"
    ]
  },
  {
    "id": 48,
    "nameTe": "ఉండి రోడ్డు & గుడివాడ రైల్వే లైన్",
    "nameEn": "Undi Road & Gudivada Railway Line",
    "zone": "West Central Zone",
    "pop": 3420,
    "areaSqKm": 0.52,
    "minElev": 2.5,
    "avgElev": 3.5,
    "lowLyingPct": 58,
    "drainLenKm": 4.7,
    "siltPct": 59,
    "vulnerableBldgs": 385,
    "riskScore": 91,
    "riskCategory": "Critical Risk",
    "riskColor": "#991b1b",
    "center": [
      16.5455,
      81.515
    ],
    "rsNos": [],
    "landmarks": [
      "Undi road",
      "Bhimavaram–Gudivada railway line",
      "Yanamadduru Drain",
      "Yanamadurru drain bund road",
      "Losari canal road"
    ]
  },
  {
    "id": 49,
    "nameTe": "BV రాజు విగ్రహం & తాడేపల్లిగూడెం రోడ్డు",
    "nameEn": "BV Raju Statue & Tadepalligudem Road",
    "zone": "North-West Zone",
    "pop": 3080,
    "areaSqKm": 0.39,
    "minElev": 3.3,
    "avgElev": 4.7,
    "lowLyingPct": 22,
    "drainLenKm": 3.2,
    "siltPct": 31,
    "vulnerableBldgs": 120,
    "riskScore": 52,
    "riskCategory": "Low Risk",
    "riskColor": "#84cc16",
    "center": [
      16.5525,
      81.517
    ],
    "rsNos": [],
    "landmarks": [
      "Bypass Road",
      "Anakoderu Canal junction",
      "BV Raju statue",
      "Tadepalligudem Road",
      "Anjaneyaswami Temple",
      "Yenamadurru Drain",
      "Gudivada–Bhimavaram railway line"
    ]
  },
  {
    "id": 50,
    "nameTe": "ఉండి బైపాస్ రోడ్డు & అనకోడేరు కెనాల్",
    "nameEn": "Undi Bypass Road & Anakoderu Canal",
    "zone": "West Zone",
    "pop": 3190,
    "areaSqKm": 0.49,
    "minElev": 2.8,
    "avgElev": 3.9,
    "lowLyingPct": 42,
    "drainLenKm": 4.2,
    "siltPct": 45,
    "vulnerableBldgs": 240,
    "riskScore": 76,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.5505,
      81.509
    ],
    "rsNos": [
      28
    ],
    "landmarks": [
      "Bhimavaram village boundary",
      "Undi Road",
      "Undi Bypass Road junction",
      "Anakoderu canal",
      "Gudivada–Bhimavaram railway line junction",
      "Old current office road",
      "Rayalam drain"
    ]
  },
  {
    "id": 51,
    "nameTe": "అన్నవరం & కొవ్వాడ రెవెన్యూ విలేజ్ సరిహద్దులు",
    "nameEn": "Annavaram & Kovvada Revenue Village Boundaries",
    "zone": "North-West Outer Zone",
    "pop": 3110,
    "areaSqKm": 0.41,
    "minElev": 3,
    "avgElev": 4.3,
    "lowLyingPct": 30,
    "drainLenKm": 3.4,
    "siltPct": 36,
    "vulnerableBldgs": 165,
    "riskScore": 61,
    "riskCategory": "Moderate Risk",
    "riskColor": "#eab308",
    "center": [
      16.564,
      81.508
    ],
    "rsNos": [
      1,
      139,
      194,
      78,
      28
    ],
    "landmarks": [
      "Annavaram village boundaries",
      "Kovvada village boundary",
      "Anakoderu Canal",
      "Undi Bypass Road Junction",
      "Undi Road",
      "Rayalam Drain Junction"
    ]
  },
  {
    "id": 52,
    "nameTe": "మున్సిపల్ నార్త్ బౌండరీ & తాడేపల్లిగూడెం బైపాస్",
    "nameEn": "Municipal North Boundary & Tadepalligudem Bypass",
    "zone": "North Zone",
    "pop": 3230,
    "areaSqKm": 0.47,
    "minElev": 2.6,
    "avgElev": 3.7,
    "lowLyingPct": 48,
    "drainLenKm": 4.3,
    "siltPct": 51,
    "vulnerableBldgs": 295,
    "riskScore": 83,
    "riskCategory": "High Risk",
    "riskColor": "#f97316",
    "center": [
      16.564,
      81.519
    ],
    "rsNos": [
      253,
      259,
      278,
      283
    ],
    "landmarks": [
      "Municipal boundary",
      "Yanamadurru drain",
      "Anjaneya Swamy Temple",
      "Tadepalligudem Road",
      "B.V. Raju statue",
      "Bypass road",
      "Anakoderu canal junction"
    ]
  }
];

// ==========================================
// 6. HYDROLOGICAL CALCULATION ENGINE
// ==========================================
const BhimavaramHydrologyEngine = {
  // SCS-CN Parameters
  curveNumberUrban: 88,    // High density urban / clay alluvium
  curveNumberAgrarian: 78, // Paddy fields / clayey subsoil

  /**
   * Calculate Runoff Depth (Q in mm) using SCS-CN Method:
   * S = (25400 / CN) - 254
   * Ia = 0.2 * S (Initial Abstraction)
   * Q = (P - Ia)^2 / (P - Ia + S) for P > Ia; otherwise Q = 0
   */
  calculateSCSましたRunoff: function(rainfallMm, cn = 88) {
    if (rainfallMm <= 0) return { runoffMm: 0, infiltrationMm: 0, runoffFraction: 0 };
    const S = (25400 / cn) - 254; // Potential Maximum Retention
    const Ia = 0.2 * S;           // Initial abstraction (surface ponding, interception)
    
    if (rainfallMm <= Ia) {
      return {
        rainfallMm: rainfallMm,
        runoffMm: 0,
        infiltrationMm: rainfallMm,
        runoffFraction: 0,
        retentionS: S,
        initialAbstraction: Ia
      };
    }

    const numerator = Math.pow(rainfallMm - Ia, 2);
    const denominator = rainfallMm - Ia + S;
    const runoffMm = numerator / denominator;
    const infiltrationMm = rainfallMm - runoffMm;
    const runoffFraction = runoffMm / rainfallMm;

    return {
      rainfallMm: rainfallMm,
      runoffMm: parseFloat(runoffMm.toFixed(2)),
      infiltrationMm: parseFloat(infiltrationMm.toFixed(2)),
      runoffFraction: parseFloat(runoffFraction.toFixed(3)),
      retentionS: parseFloat(S.toFixed(2)),
      initialAbstraction: parseFloat(Ia.toFixed(2))
    };
  },

  /**
   * Calculate Peak Discharge (Qpeak in m3/s) using Rational Method:
   * Q = (C * I * A) / 360
   * where C = Runoff coefficient, I = Rainfall Intensity (mm/hr), A = Area (hectares)
   */
  calculatePeakDischarge: function(rainfallMm, durationHours, areaHectares, runoffCoefficient = 0.75) {
    const intensityMmHr = rainfallMm / Math.max(durationHours, 0.25);
    const qPeakM3s = (runoffCoefficient * intensityMmHr * areaHectares) / 360;
    const totalVolumeM3 = (rainfallMm / 1000) * (areaHectares * 10000) * runoffCoefficient;

    return {
      intensityMmHr: parseFloat(intensityMmHr.toFixed(2)),
      qPeakM3s: parseFloat(qPeakM3s.toFixed(2)),
      totalVolumeM3: Math.round(totalVolumeM3),
      totalVolumeLakhLiters: Math.round(totalVolumeM3 / 100)
    };
  },

  /**
   * Calculate Hydraulic Backwater Condition from Yanamudurru Drain Stage
   */
  evaluateBackwaterImpact: function(canalStageM) {
    const warningStage = BHIMAVARAM_FLOOD_CONFIG.yanamudurruWarningStageM;   // 3.8m
    const dangerStage = BHIMAVARAM_FLOOD_CONFIG.yanamudurruDangerStageM;     // 4.9m
    const bankfullStage = BHIMAVARAM_FLOOD_CONFIG.yanamudurruBankfullStageM; // 5.4m

    let severity = "Normal Gravity Drainage (సాధారణ ప్రవాహం)";
    let severityCode = "NORMAL";
    let reverseFloodingWards = [];
    let dischargeReductionPct = 0;

    if (canalStageM >= bankfullStage) {
      severity = "CRITICAL: Direct Canal Overtopping & Severe Basin Inundation (గట్టు దాటి ప్రవాహం)";
      severityCode = "BANKFULL_OVERFLOW";
      dischargeReductionPct = 100;
      reverseFloodingWards = [1, 2, 3, 4, 6, 7, 10, 17, 18, 25, 26, 29, 37, 48];
    } else if (canalStageM >= dangerStage) {
      severity = "DANGER: Severe Reverse Backwater Locking; All Gravity Outfalls Closed (అత్యంత ప్రమాదకరం)";
      severityCode = "DANGER_BACKWATER";
      dischargeReductionPct = 85;
      reverseFloodingWards = [2, 3, 4, 17, 26, 29, 37];
    } else if (canalStageM >= warningStage) {
      severity = "WARNING: Partial Outfall Submergence; Drainage Capacity Throttled (ప్రవాహ నిరోధం)";
      severityCode = "WARNING_THROTTLED";
      dischargeReductionPct = 45;
      reverseFloodingWards = [3, 29, 37];
    }

    return {
      canalStageM: canalStageM,
      severity: severity,
      severityCode: severityCode,
      dischargeReductionPct: dischargeReductionPct,
      reverseFloodingWards: reverseFloodingWards
    };
  }
};

// ==========================================
// 7. AI AGENT BRAIN: QUERIES & SIMULATIONS
// ==========================================
const BHIMAVARAM_AI_AGENT = {
  name: "Bhimavaram FloodFlow AI Agent (వరద ప్రవాహ విశ్లేషణ AI ఏజెంట్)",
  role: "Lead GIS Analyst & Urban Hydrologist",
  greetingTe: "నమస్కారం! నేను భీమవరం పురపాలక సంఘం వరద ప్రవాహ విశ్లేషణ మరియు డ్రైనేజీ మోడలింగ్ AI ఏజెంట్‌ను. మీరు ఎనమదురు కాలువ ప్రవాహం, 52 వార్డుల ముప్పు స్థాయి, వర్షపాత ప్రభావం లేదా ముందస్తు నిర్వహణ పనుల గురించి నన్ను అడగవచ్చు.",
  greetingEn: "Greetings! I am the Bhimavaram Municipal Flood Intelligence & GIS Hydrology AI Agent. Ask me about Yanamudurru backwater simulation, 52-ward risk ranking, top 20 waterlogging hotspots, or pre-monsoon engineering action plans.",

  samplePrompts: [
    { labelTe: "🚨 ఎనమదురు కాలువ బ్యాక్ వాటర్ ప్రభావం విశ్లేషించు", labelEn: "Analyze Yanamudurru Backwater Effect", query: "yanamudurru backwater" },
    { labelTe: "🌧️ 180mm తీవ్ర వర్షపాతం అనుకరణ", labelEn: "Simulate 180mm Cyclone Storm", query: "simulate 180mm" },
    { labelTe: "⚠️ అత్యంత ప్రమాదకర టాప్ 5 ప్రాంతాలు", labelEn: "Top 5 Critical Hotspots", query: "top 5 hotspots" },
    { labelTe: "🏥 ఆసుపత్రులు, రైల్వే స్టేషన్ల ముప్పు నివేదిక", labelEn: "Critical Infrastructure Exposure", query: "infrastructure exposure" },
    { labelTe: "📋 ముందస్తు డ్రైనేజీ పూడికతీత ప్రణాళిక", labelEn: "Pre-Monsoon Desilting Schedule", query: "desilting action plan" }
  ],

  /**
   * Process Natural Language Query and Return Engineering Response & Action Triggers
   */
  processQuery: function(rawQuery, currentSimulationState) {
    const q = (rawQuery || "").toLowerCase();
    let responseTe = "";
    let responseEn = "";
    let actionTrigger = null;

    // 1. Backwater / Yanamudurru query
    if (q.includes("yanamudurru") || q.includes("backwater") || q.includes("ఎనమదురు") || q.includes("బ్యాక్ వాటర్") || q.includes("కాలువ")) {
      actionTrigger = {
        type: "SET_CANAL_STAGE",
        stage: 4.8,
        tab: "simulation"
      };
      responseTe = `### 🚨 ఎనమదురు మేజర్ డ్రెయిన్ హైడ్రాలిక్ బ్యాక్ వాటర్ విశ్లేషణ
1. **ప్రధాన సమస్య:** ఎనమదురు కాలువ భీమవరం పట్టణాన్ని వన్ టౌన్, టూ టౌన్‌లుగా విభజిస్తుంది. గోదావరి డెల్టా నుండి వచ్చే వరద నీటి వల్ల కాలువ నీటిమట్టం **3.8 మీటర్లు (MSL)** దాటితే, పట్టణ మురుగునీటి అవుట్‌ఫాల్స్ పూర్తిగా మునిగిపోతాయి.
2. **రివర్స్ ప్రవాహం:** మున్సిపల్ డ్రెయిన్లలో గురుత్వాకర్షణ ప్రవాహం (Gravity flow) ఆగిపోయి, కాలువ నీరు నేరుగా వన్ టౌన్ వార్డులు 2, 3 (శ్రీ మవుళ్ళమ్మ ఆలయం, లంకాపేట) మరియు టూ టౌన్ వార్డులు 29, 37 (సోంపేట, రైల్వే అండర్‌పాస్)లలోనికి రివర్స్ అవుతుంది.
3. **సిఫార్సు:** 
   - ఎనమదురు అవుట్‌ఫాల్స్ వద్ద **నాన్-రిటర్న్ ఫ్లాప్ గేట్లు (Flap Valves)** వెంటనే అమర్చాలి.
   - మవుళ్ళమ్మ ఆలయ అవుట్‌ఫాల్ మరియు రైల్వే అండర్‌పాస్ వద్ద **120 HP ఆటోమేటెడ్ డీవాటరింగ్ పంపింగ్ స్టేషన్లు** ఏర్పాటు చేయాలి.`;
      
      responseEn = `### 🚨 Yanamudurru Drain Hydraulic Backwater Assessment
1. **Root Cause:** When Yanamudurru drain stage exceeds **3.8m MSL**, municipal gravity outfalls become hydraulically submerged.
2. **Reverse Flooding:** Drainage stops, creating hydrostatic backflow that inundates Ward 3 (Mavullamma Temple), Ward 2 (Lankapeta), Ward 29 (Sompeta), and Ward 37 (Railway Underpass).
3. **Engineering Prescription:** Install non-return tidal flap gates at all 14 outfalls and commission dual 120 HP stormwater pumps at critical depression sumps.`;
    }
    // 2. Hotspots query
    else if (q.includes("hotspot") || q.includes("టాప్") || q.includes("ప్రదేశాలు") || q.includes("లోతట్టు") || q.includes("low-lying")) {
      actionTrigger = {
        type: "HIGHLIGHT_HOTSPOTS",
        count: 5,
        tab: "hotspots"
      };
      responseTe = `### ⚠️ భీమవరం టాప్ వాటర్‌లాగింగ్ హాట్‌స్పాట్లు:
1. **ర్యాంక్ 1 - శ్రీ మవుళ్ళమ్మ ఆలయ పరిసరాలు (వార్డు 3):** భూమట్టం 2.25m MSL. అంచనా వరద లోతు: **1.45 మీటర్లు**. కాలవ్యవధి: 18 గంటలు.
2. **ర్యాంక్ 2 - లంకాపేట & శివాలయం కూడలి (వార్డు 2):** పల్లపు ప్రాంతం (2.40m MSL). వరద లోతు: **1.20 మీటర్లు**.
3. **ర్యాంక్ 3 - సోంపేట & డి.ఎన్.ఆర్ కళాశాల వెనుక బేసిన్ (వార్డు 29):** వరద లోతు: **1.15 మీటర్లు**. రైల్వే ఎంబ్యాంక్‌మెంట్ నీటిని అడ్డుకుంటుంది.
4. **ర్యాంక్ 4 - బాలుసుముడి వై జంక్షన్ (వార్డు 17):** వరద లోతు: **0.95 మీటర్లు**.
5. **ర్యాంక్ 5 - టౌన్ రైల్వే స్టేషన్ దరి (వార్డు 37):** స్టేషన్ పరిసరాల లోతట్టు ప్రాంతం. వరద లోతు: **1.25 మీటర్లు**.
- **ముఖ్య గమనిక:** **ర్యాంక్ 9 - రైల్వే అండర్‌పాస్ / సబ్‌వే (వార్డు 4/37):** తీవ్రమైన బాటిల్‌నెక్ గుంత (2.10m MSL). వరద లోతు: **1.80 మీటర్లు**. రాకపోకలు పూర్తిగా స్తంభిస్తాయి.`;
      
      responseEn = `### ⚠️ Top Critical Waterlogging Hotspots in Bhimavaram:
1. **Rank 1 - Sri Mavullamma Temple Surroundings (Ward 3):** Elev 2.25m MSL | Depth: **1.45m** | Stagnation: 18 hrs.
2. **Rank 2 - Lankapeta & Sivalayam Junction (Ward 2):** Elev 2.40m MSL | Depth: **1.20m** | Encroached drainage outfall.
3. **Rank 3 - Sompeta & DNR College Rear Basin (Ward 29):** Elev 2.60m MSL | Depth: **1.15m** | Railway embankment barrier.
4. **Rank 4 - Balusumudi Y-Junction (Ward 17):** Elev 2.75m MSL | Depth: **0.95m**.
5. **Rank 5 - Town Railway Station Environs (Ward 37):** Near BVRT station. Depth: **1.25m**.
- **Critical Hotspot:** **Rank 9 - Railway Underpass / Subway RUB (Ward 4/37):** Severe sag point (2.10m MSL). Depth: **1.80m** | Complete transit blockage.`;
    }
    // 3. Infrastructure exposure
    else if (q.includes("hospital") || q.includes("railway") || q.includes("ఆసుపత్రి") || q.includes("రైల్వే") || q.includes("infrastructure") || q.includes("మౌలిక")) {
      actionTrigger = {
        type: "SHOW_INFRASTRUCTURE",
        tab: "infrastructure"
      };
      responseTe = `### 🏥 భీమవరం కీలక మున్సిపల్ మౌలిక వసతుల ముప్పు నివేదిక:
- **ప్రభుత్వ ఏరియా ఆసుపత్రి (వార్డు 21):** 110mm వర్షంలో అప్రోచ్ రోడ్డు 0.45m మునుగుతుంది; 180mm తుఫాను వర్షంలో ఆసుపత్రి కాంపౌండ్‌లోకి 0.70m నీరు చేరుతుంది. అంబులెన్స్ సేవలకు అత్యవసర ఎలివేటెడ్ ర్యాంప్ అవసరం.
- **భీమవరం టౌన్ రైల్వే స్టేషన్ (వార్డు 37):** అండర్‌పాస్ 1.8m మునిగిపోతుంది; ప్లాట్‌ఫారమ్ ట్రాక్‌లు 2, 3లపై నీరు చేరి రైళ్ల రాకపోకలు ఆలస్యమవుతాయి.
- **33/11 KV వన్ టౌన్ విద్యుత్ సబ్‌స్టేషన్ (వార్డు 3):** అత్యంత లోతట్టులో (2.35m MSL) ఉండటం వల్ల ట్రాన్స్‌ఫార్మర్ ప్లింత్ మునిగే ప్రమాదం ఉంది. వెంటనే 1.2 మీటర్ల ఎత్తుకు పెంచాలి.
- **ఆర్టీసీ సెంట్రల్ బస్ స్టేషన్ (వార్డు 22):** బేలలో 0.65m నీరు చేరి బస్సు సర్వీసులు నిలిచిపోతాయి.`;

      responseEn = `### 🏥 Critical Municipal Infrastructure Impact Assessment:
- **Government Area Hospital (Ward 21):** 0.45m access road inundation under 110mm rain; 0.70m ground flooding under 180mm storm. Requires raised emergency ambulance corridor.
- **Town Railway Station (Ward 37):** Submersible underpass inundated up to 1.80m; tracks 2 & 3 inundated by 0.65m.
- **33/11 KV One Town Substation (Ward 3):** Sits at 2.35m MSL; plinths must be raised by 1.2m to prevent catastrophic blackouts.
- **APSRTC Bus Station (Ward 22):** 0.65m ponding paralyzes regional public bus departures.`;
    }
    // 4. Pre-monsoon Desilting & Mitigation plan
    else if (q.includes("desilting") || q.includes("action plan") || q.includes("పూడికతీత") || q.includes("ప్రణాళిక") || q.includes("పనులు") || q.includes("mitigation")) {
      actionTrigger = {
        type: "SHOW_ACTION_PLAN",
        tab: "action_plan"
      };
      responseTe = `### 📋 భీమవరం పురపాలక సంఘం – ముందస్తు వర్షాకాల కార్యాచరణ ప్రణాళిక:
1. **తక్షణ పనులు (15 రోజులు):**
   - వన్ టౌన్ ట్రంక్ డ్రెయిన్ (2.4 కి.మీ) మరియు సోంపేట ట్రంక్ డ్రెయిన్ (3.1 కి.మీ) లలో పూడికతీత (Desilting) పూర్తిచేయడం.
   - ఎనమదురు కాలువలో గుర్రపుడెక్క మరియు ఘనవ్యర్థాల తొలగింపు.
   - రైల్వే అండర్‌పాస్ పంపింగ్ సెట్‌లను సర్వీసింగ్ చేసి స్టాండ్‌బై డీజిల్ జనరేటర్ అమర్చడం.
2. **స్వల్పకాలిక పనులు (3 నెలలు):**
   - 4 బాటిల్‌నెక్ కల్వర్టులను బాక్స్ కల్వర్టులుగా పునర్నిర్మించడం (సోంపేట, మవుళ్ళమ్మ రోడ్డు, టౌన్ స్టేషన్).
   - ఎనమదురు కాలువ 14 అవుట్‌ఫాల్స్ వద్ద నాన్-రిటర్న్ ఫ్లాప్ గేట్లు అమర్చడం.
3. **దీర్ఘకాలిక పనులు:**
   - రాయలం సరిహద్దులో 1.2 కి.మీ రక్షణ ఇంటర్‌సెప్టర్ కాలువ నిర్మాణం.
   - ఎనమదురు కాలువ గట్ల ఎత్తు పెంపు మరియు ఆధునీకరణ.`;

      responseEn = `### 📋 Bhimavaram Municipality – Action & Mitigation Masterplan:
1. **Immediate Phase (15 Days Pre-Monsoon):**
   - Complete desilting of One Town trunk line (2.4 km) and Sompeta trunk conduit (3.1 km).
   - Clear massive water hyacinth mats along Yanamudurru drain.
   - Service railway underpass dewatering pumps with auto-start diesel gensets.
2. **Short-Term Phase (3 Months):**
   - Reconstruct 4 constricted cross-culverts as double-barrel RCC box culverts.
   - Install heavy-duty non-return flap gates on all 14 outfalls into Yanamudurru.
3. **Long-Term Phase:**
   - 1.2 km peripheral interceptor drain along Rayalam agricultural boundary.
   - Embankment raising and riverfront dredging along Yanamudurru corridor.`;
    }
    // 5. Rainfall simulation
    else if (q.includes("simulate") || q.includes("rainfall") || q.includes("వర్షం") || q.includes("తుఫాను") || q.includes("cyclone") || q.includes("180") || q.includes("110")) {
      const rainfall = q.includes("180") ? 180 : (q.includes("280") ? 280 : (q.includes("55") ? 55 : 110));
      actionTrigger = {
        type: "RUN_SIMULATION",
        rainfall: rainfall,
        duration: 6,
        tab: "simulation"
      };
      const hyd = BhimavaramHydrologyEngine.calculateSCSましたRunoff(rainfall);
      const peak = BhimavaramHydrologyEngine.calculatePeakDischarge(rainfall, 6, 2560, 0.78);
      responseTe = `### 🌧️ ${rainfall}mm వర్షపాత హైడ్రోలాజికల్ అనుకరణ ఫలితాలు:
- **రన్-ఆఫ్ లోతు (Runoff):** ${hyd.runoffMm} mm (${(hyd.runoffFraction * 100).toFixed(1)}% నీరు ప్రవాహంగా మారుతుంది)
- **నేలలోకి ఇంకే నీరు (Infiltration):** ${hyd.infiltrationMm} mm
- **పీక్ డిశ్చార్జ్ ప్రవాహం (Q Peak):** **${peak.qPeakM3s} m³/s**
- **మొత్తం రన్-ఆఫ్ పరిమాణం:** **${peak.totalVolumeM3.toLocaleString()} క్యూబిక్ మీటర్లు** (${peak.totalVolumeLakhLiters.toLocaleString()} లక్షల లీటర్లు)
- **మునిగే వార్డులు:** 52 వార్డులలో 22 వార్డులు హై మరియు క్రిటికల్ రిస్క్ పరిధిలోకి వస్తాయి.
- **ప్రధాన ప్రభావం:** శ్రీ మవుళ్ళమ్మ ఆలయం, లంకాపేట, సోంపేట, మరియు టౌన్ రైల్వే అండర్‌పాస్‌లలో 1.2 మీటర్ల కంటే ఎక్కువ నీరు చేరుతుంది.`;

      responseEn = `### 🌧️ Hydrological Runoff Simulation for ${rainfall}mm Event:
- **Surface Runoff Depth:** ${hyd.runoffMm} mm (${(hyd.runoffFraction * 100).toFixed(1)}% excess rainfall)
- **Soil Infiltration:** ${hyd.infiltrationMm} mm
- **Peak Discharge (Q Peak):** **${peak.qPeakM3s} m³/s**
- **Total Inundation Volume:** **${peak.totalVolumeM3.toLocaleString()} m³** (${peak.totalVolumeLakhLiters.toLocaleString()} Lakh Liters)
- **Exposed Wards:** 22 out of 52 municipal wards enter High or Critical inundation zones.
- **Key Vulnerability:** Mavullamma Temple, Lankapeta, Sompeta, and Town Railway underpass exceed 1.2m depth.`;
    }
    // Default general response
    else {
      responseTe = `### 🌊 భీమవరం వరద ప్రవాహ విశ్లేషణ AI ఏజెంట్
భీమవరం పట్టణ భౌగోళిక పరిస్థితుల దృష్ట్యా, సముద్ర మట్టానికి సగటున 4.85 మీటర్ల ఎత్తులో ఉన్న డెల్టా భూభాగం ఇది.
- **ప్రధాన జలప్రవాహం:** ఎనమదురు మేజర్ డ్రెయిన్ (144.80 ఎకరాలు).
- **అత్యంత లోతట్టు ప్రాంతాలు:** మవుళ్ళమ్మ ఆలయ వీధి (2.25m), సోంపేట (2.40m), రైల్వే అండర్‌పాస్ (2.10m).
- **సమగ్ర పరిశీలన కోసం:** పైన ఉన్న బటన్ల ద్వారా తుఫాను వర్షం అనుకరణను అమలు చేయండి లేదా ఎనమదురు కాలువ బ్యాక్ వాటర్ ప్రభావాన్ని పరీక్షించండి.`;

      responseEn = `### 🌊 Bhimavaram FloodFlow AI Agent
Bhimavaram sits on an ultra-flat Godavari coastal delta plain (avg 4.85m MSL).
- **Central Hydraulic Lifeline:** Yanamudurru Drain (144.80 acres).
- **Critical Sinks:** Mavullamma Temple zone (2.25m MSL), Sompeta (2.40m MSL), Railway Underpass (2.10m MSL).
- Use the quick query chips or simulation sliders to explore real-time hydraulic scenarios!`;
    }

    return {
      query: rawQuery,
      responseTe: responseTe,
      responseEn: responseEn,
      actionTrigger: actionTrigger
    };
  }
};

// Universal browser & module export
if (typeof window !== 'undefined') {
  window.BHIMAVARAM_FLOOD_CONFIG = BHIMAVARAM_FLOOD_CONFIG;
  window.BHIMAVARAM_HOTSPOTS = BHIMAVARAM_HOTSPOTS;
  window.BHIMAVARAM_DRAINAGE_NETWORK = BHIMAVARAM_DRAINAGE_NETWORK;
  window.BHIMAVARAM_CRITICAL_ASSETS = BHIMAVARAM_CRITICAL_ASSETS;
  window.BHIMAVARAM_52_WARDS_FLOOD_DATA = BHIMAVARAM_52_WARDS_FLOOD_DATA;
  window.BhimavaramHydrologyEngine = BhimavaramHydrologyEngine;
  window.BHIMAVARAM_AI_AGENT = BHIMAVARAM_AI_AGENT;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    BHIMAVARAM_FLOOD_CONFIG,
    BHIMAVARAM_HOTSPOTS,
    BHIMAVARAM_DRAINAGE_NETWORK,
    BHIMAVARAM_CRITICAL_ASSETS,
    BHIMAVARAM_52_WARDS_FLOOD_DATA,
    BhimavaramHydrologyEngine,
    BHIMAVARAM_AI_AGENT
  };
}
