const fs = require('fs');
const osm = JSON.parse(fs.readFileSync('scratch/bhimavaram_osm_roads.json', 'utf8'));

// Function to find ways whose bounding box or points are close to a line segment
function findWaysNear(lat1, lon1, lat2, lon2, maxDistM = 60) {
  const R = 6371e3;
  function distM(p1Lat, p1Lon, p2Lat, p2Lon) {
    const dLat = (p2Lat - p1Lat) * Math.PI / 180;
    const dLon = (p2Lon - p1Lon) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(p1Lat*Math.PI/180) * Math.cos(p2Lat*Math.PI/180) * Math.sin(dLon/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  }
  function distToSeg(px, py) {
    const l2 = (lat2-lat1)**2 + (lon2-lon1)**2;
    if (l2 === 0) return distM(px, py, lat1, lon1);
    let t = Math.max(0, Math.min(1, ((px-lat1)*(lat2-lat1) + (py-lon1)*(lon2-lon1)) / l2));
    const projX = lat1 + t * (lat2 - lat1);
    const projY = lon1 + t * (lon2 - lon1);
    return distM(px, py, projX, projY);
  }

  return osm.elements.filter(e => {
    if (!e.geometry) return false;
    // Check if any point in the way is near the segment
    return e.geometry.some(p => distToSeg(p.lat, p.lon) < maxDistM);
  });
}

console.log('Rest House Road ways count:', findWaysNear(16.5373, 81.5194, 16.5415, 81.5285, 80).length);
console.log('Gandhi Road ways count:', findWaysNear(16.5455, 81.5160, 16.5423, 81.5368, 80).length);
console.log('Main Bazaar ways count:', findWaysNear(16.5432, 81.5242, 16.5412, 81.5312, 60).length);
console.log('Town Station Approach ways count:', findWaysNear(16.5455, 81.5160, 16.5432, 81.5242, 80).length);
console.log('SRKR Link ways count:', findWaysNear(16.5460, 81.4950, 16.5455, 81.5160, 80).length);
