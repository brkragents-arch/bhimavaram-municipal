const fs = require('fs');
const osm = JSON.parse(fs.readFileSync('scratch/bhimavaram_osm_roads.json', 'utf8'));

// Helper distance in meters
function distM(p1Lat, p1Lon, p2Lat, p2Lon) {
  const R = 6371e3;
  const dLat = (p2Lat - p1Lat) * Math.PI / 180;
  const dLon = (p2Lon - p1Lon) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(p1Lat*Math.PI/180) * Math.cos(p2Lat*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Stitch a set of ways into a single continuous chain or sorted sequence of points
function stitchWays(ways, startLat, startLon, endLat, endLon) {
  // Extract all segments as [[lat, lon], ...]
  let segments = ways.filter(w => w.geometry && w.geometry.length >= 2).map(w => {
    return w.geometry.map(p => [Number(p.lat.toFixed(6)), Number(p.lon.toFixed(6))]);
  });

  if (segments.length === 0) return [];

  // Sort segments from start to end
  let chain = [];
  
  // Find segment closest to start
  let bestStartIdx = 0;
  let bestStartDist = Infinity;
  let reverseFirst = false;

  segments.forEach((seg, idx) => {
    const dStart = distM(startLat, startLon, seg[0][0], seg[0][1]);
    const dEnd = distM(startLat, startLon, seg[seg.length-1][0], seg[seg.length-1][1]);
    if (dStart < bestStartDist) {
      bestStartDist = dStart;
      bestStartIdx = idx;
      reverseFirst = false;
    }
    if (dEnd < bestStartDist) {
      bestStartDist = dEnd;
      bestStartIdx = idx;
      reverseFirst = true;
    }
  });

  let current = segments.splice(bestStartIdx, 1)[0];
  if (reverseFirst) current.reverse();
  chain.push(...current);

  // Greedily connect remaining segments
  while (segments.length > 0) {
    const lastPt = chain[chain.length - 1];
    let bestNextIdx = -1;
    let bestNextDist = Infinity;
    let reverseNext = false;

    segments.forEach((seg, idx) => {
      const dStart = distM(lastPt[0], lastPt[1], seg[0][0], seg[0][1]);
      const dEnd = distM(lastPt[0], lastPt[1], seg[seg.length-1][0], seg[seg.length-1][1]);
      if (dStart < bestNextDist) {
        bestNextDist = dStart;
        bestNextIdx = idx;
        reverseNext = false;
      }
      if (dEnd < bestNextDist) {
        bestNextDist = dEnd;
        bestNextIdx = idx;
        reverseNext = true;
      }
    });

    // If next segment is within 250m, attach it
    if (bestNextIdx !== -1 && bestNextDist < 250) {
      let nextSeg = segments.splice(bestNextIdx, 1)[0];
      if (reverseNext) nextSeg.reverse();
      // Avoid duplicate consecutive point
      if (distM(lastPt[0], lastPt[1], nextSeg[0][0], nextSeg[0][1]) < 2) {
        chain.push(...nextSeg.slice(1));
      } else {
        chain.push(...nextSeg);
      }
    } else {
      break; // No more connected segments
    }
  }

  return chain;
}

// 1. NH-165 Bypass (trunk)
const trunkWays = osm.elements.filter(e => e.tags && (e.tags.highway === 'trunk' || e.tags.ref === 'NH165'));
const nh165Chain = stitchWays(trunkWays, 16.5720, 81.5350, 16.5240, 81.5420);
console.log('NH-165 chain points:', nh165Chain.length);

// 2. P.P. Road
const ppWays = osm.elements.filter(e => e.tags && (JSON.stringify(e.tags).includes('Pippara') || e.tags.ref === 'MDR054'));
const ppChain = stitchWays(ppWays, 16.5540, 81.5175, 16.5395, 81.5255);
console.log('P.P. Road chain points:', ppChain.length);

// 3. B.N. Road (Narsapuram)
const bnWays = osm.elements.filter(e => e.tags && (JSON.stringify(e.tags).includes('Narsapuram') || e.tags.ref === 'SH248'));
const bnChain = stitchWays(bnWays, 16.5432, 81.5242, 16.5250, 81.5500);
console.log('B.N. Road chain points:', bnChain.length);

// 4. Dongapindi / DNR Road
const dnrWays = osm.elements.filter(e => e.tags && JSON.stringify(e.tags).includes('Dongapindi'));
const dnrChain = stitchWays(dnrWays, 16.5348, 81.5155, 16.5270, 81.5130);
console.log('DNR Road chain points:', dnrChain.length);

// 5. Gudivada / J.P. Road
const jpWays = osm.elements.filter(e => e.tags && JSON.stringify(e.tags).includes('Gudivada'));
const jpChain = stitchWays(jpWays, 16.5420, 81.4980, 16.5348, 81.5155);
console.log('J.P. Road chain points:', jpChain.length);

// 6. Kovada Road
const kovadaWays = osm.elements.filter(e => e.tags && JSON.stringify(e.tags).includes('Kovada'));
const kovadaChain = stitchWays(kovadaWays, 16.5550, 81.5180, 16.5472, 81.5096);
console.log('Kovada Road chain points:', kovadaChain.length);

// 7. Tanuku Road
const tanukuWays = osm.elements.filter(e => e.tags && JSON.stringify(e.tags).includes('Tanuku'));
const tanukuChain = stitchWays(tanukuWays, 16.5750, 81.5280, 16.5482, 81.5305);
console.log('Tanuku Road chain points:', tanukuChain.length);
