const fs = require('fs');
const osm = JSON.parse(fs.readFileSync('scratch/bhimavaram_osm_roads.json', 'utf8'));

function distM(p1Lat, p1Lon, p2Lat, p2Lon) {
  const R = 6371e3;
  const dLat = (p2Lat - p1Lat) * Math.PI / 180;
  const dLon = (p2Lon - p1Lon) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(p1Lat*Math.PI/180) * Math.cos(p2Lat*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function distToSeg(px, py, lat1, lon1, lat2, lon2) {
  const l2 = (lat2-lat1)**2 + (lon2-lon1)**2;
  if (l2 === 0) return distM(px, py, lat1, lon1);
  let t = Math.max(0, Math.min(1, ((px-lat1)*(lat2-lat1) + (py-lon1)*(lon2-lon1)) / l2));
  const projX = lat1 + t * (lat2 - lat1);
  const projY = lon1 + t * (lon2 - lon1);
  return distM(px, py, projX, projY);
}

function distToPolyline(px, py, poly) {
  let minD = Infinity;
  for (let i = 0; i < poly.length - 1; i++) {
    const d = distToSeg(px, py, poly[i][0], poly[i][1], poly[i+1][0], poly[i+1][1]);
    if (d < minD) minD = d;
  }
  return minD;
}

// Extract path between landmarks along OSM street segments
function traceStreetAlongWaypoints(waypoints, maxCorridorM = 70) {
  // Find all candidate ways near the polyline formed by waypoints
  let candidateWays = osm.elements.filter(e => {
    if (!e.geometry || e.geometry.length < 2) return false;
    // Check if way's midpoint is within maxCorridorM of the waypoints polyline
    const midPt = e.geometry[Math.floor(e.geometry.length / 2)];
    return distToPolyline(midPt.lat, midPt.lon, waypoints) < maxCorridorM;
  });

  // Extract all points from candidate ways that stay within maxCorridorM of waypoints
  let rawPoints = [];
  candidateWays.forEach(w => {
    w.geometry.forEach(p => {
      const d = distToPolyline(p.lat, p.lon, waypoints);
      if (d < maxCorridorM) {
        rawPoints.push([Number(p.lat.toFixed(6)), Number(p.lon.toFixed(6))]);
      }
    });
  });

  if (rawPoints.length < 5) {
    // If few points found, interpolate waypoints smoothly
    return interpolatePoints(waypoints, 10);
  }

  // Project raw points onto the waypoints polyline to sort them monotonically from start to end
  function getProgression(lat, lon) {
    let bestDist = Infinity;
    let bestParam = 0;
    let accumulatedLen = 0;

    for (let i = 0; i < waypoints.length - 1; i++) {
      const segLen = distM(waypoints[i][0], waypoints[i][1], waypoints[i+1][0], waypoints[i+1][1]);
      const lat1 = waypoints[i][0], lon1 = waypoints[i][1];
      const lat2 = waypoints[i+1][0], lon2 = waypoints[i+1][1];
      const l2 = (lat2-lat1)**2 + (lon2-lon1)**2;
      let t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((lat-lat1)*(lat2-lat1) + (lon-lon1)*(lon2-lon1)) / l2));
      const projX = lat1 + t * (lat2 - lat1);
      const projY = lon1 + t * (lon2 - lon1);
      const d = distM(lat, lon, projX, projY);
      if (d < bestDist) {
        bestDist = d;
        bestParam = accumulatedLen + t * segLen;
      }
      accumulatedLen += segLen;
    }
    return bestParam;
  }

  // Sort raw points by their progression along the corridor
  rawPoints.sort((a, b) => getProgression(a[0], a[1]) - getProgression(b[0], b[1]));

  // Deduplicate and filter out points that jump backward or are too close (< 5m)
  let cleanChain = [waypoints[0]];
  for (let pt of rawPoints) {
    const last = cleanChain[cleanChain.length - 1];
    const d = distM(last[0], last[1], pt[0], pt[1]);
    if (d >= 8 && d < 120) {
      cleanChain.push(pt);
    }
  }
  cleanChain.push(waypoints[waypoints.length - 1]);
  return cleanChain;
}

function interpolatePoints(pts, stepM = 20) {
  let res = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = pts[i], p2 = pts[i+1];
    const totalD = distM(p1[0], p1[1], p2[0], p2[1]);
    const numSteps = Math.max(1, Math.round(totalD / stepM));
    for (let s = 0; s < numSteps; s++) {
      const t = s / numSteps;
      res.push([
        Number((p1[0] + t * (p2[0] - p1[0])).toFixed(6)),
        Number((p1[1] + t * (p2[1] - p1[1])).toFixed(6))
      ]);
    }
  }
  res.push(pts[pts.length - 1]);
  return res;
}

console.log('Testing street trace...');
const rhTrace = traceStreetAlongWaypoints([
  [16.5373, 81.5194],
  [16.5370, 81.5210],
  [16.5366, 81.5225],
  [16.5385, 81.5250],
  [16.5402, 81.5268],
  [16.5415, 81.5285]
], 60);
console.log('Rest House Road traced points:', rhTrace.length);

const gandhiTrace = traceStreetAlongWaypoints([
  [16.5455, 81.5160],
  [16.5452, 81.5195],
  [16.5448, 81.5235],
  [16.5442, 81.5275],
  [16.5433, 81.5320],
  [16.5428, 81.5345],
  [16.5423, 81.5368]
], 70);
console.log('Gandhi Road traced points:', gandhiTrace.length);

const bazaarTrace = traceStreetAlongWaypoints([
  [16.5432, 81.5242],
  [16.5420, 81.5265],
  [16.5415, 81.5285],
  [16.5412, 81.5312],
  [16.5410, 81.5340]
], 60);
console.log('Main Bazaar traced points:', bazaarTrace.length);
