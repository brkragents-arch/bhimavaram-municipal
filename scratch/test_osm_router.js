const fs = require('fs');
const osm = JSON.parse(fs.readFileSync('scratch/bhimavaram_osm_roads.json', 'utf8'));

console.log('Building OSM Node-to-Way Topology Graph...');

// Map node ID -> { lat, lon, ways: [wayId, ...] }
const nodeMap = new Map();
// Map way ID -> way
const wayMap = new Map();

osm.elements.forEach(w => {
  wayMap.set(w.id, w);
  if (w.nodes && w.geometry && w.nodes.length === w.geometry.length) {
    w.nodes.forEach((nId, idx) => {
      const pt = w.geometry[idx];
      if (!nodeMap.has(nId)) {
        nodeMap.set(nId, { lat: pt.lat, lon: pt.lon, ways: [] });
      }
      nodeMap.get(nId).ways.push(w.id);
    });
  }
});

console.log('Total nodes indexed:', nodeMap.size);
console.log('Total ways indexed:', wayMap.size);

// Helper distance in meters
function distM(p1Lat, p1Lon, p2Lat, p2Lon) {
  const R = 6371e3;
  const dLat = (p2Lat - p1Lat) * Math.PI / 180;
  const dLon = (p2Lon - p1Lon) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(p1Lat*Math.PI/180) * Math.cos(p2Lat*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Find closest node to given lat, lon
function findClosestNode(lat, lon, maxDist = 300) {
  let bestId = null;
  let bestDist = Infinity;
  for (let [nId, node] of nodeMap) {
    const d = distM(lat, lon, node.lat, node.lon);
    if (d < bestDist) {
      bestDist = d;
      bestId = nId;
    }
  }
  if (bestDist < maxDist) {
    return { id: bestId, dist: bestDist, lat: nodeMap.get(bestId).lat, lon: nodeMap.get(bestId).lon };
  }
  return null;
}

// Dijkstra shortest path along road network between two nodes
function findPathBetweenNodes(startNodeId, endNodeId) {
  const distances = new Map();
  const previous = new Map();
  const pq = new Set();

  distances.set(startNodeId, 0);
  pq.add(startNodeId);

  // We only search within a reasonable boundary to stay fast
  let visited = 0;
  while (pq.size > 0 && visited < 15000) {
    visited++;
    // Get node in pq with min distance
    let current = null;
    let minD = Infinity;
    for (let n of pq) {
      const d = distances.get(n);
      if (d < minD) {
        minD = d;
        current = n;
      }
    }

    if (!current) break;
    if (current === endNodeId) break;
    pq.delete(current);

    const currNode = nodeMap.get(current);
    if (!currNode) continue;

    // Explore neighbors via ways passing through this node
    for (let wId of currNode.ways) {
      const way = wayMap.get(wId);
      if (!way || !way.nodes) continue;
      const idx = way.nodes.indexOf(current);
      const neighbors = [];
      if (idx > 0) neighbors.push(way.nodes[idx - 1]);
      if (idx < way.nodes.length - 1) neighbors.push(way.nodes[idx + 1]);

      for (let neighbor of neighbors) {
        const nNode = nodeMap.get(neighbor);
        if (!nNode) continue;
        const edgeWeight = distM(currNode.lat, currNode.lon, nNode.lat, nNode.lon);
        const alt = distances.get(current) + edgeWeight;
        if (alt < (distances.get(neighbor) || Infinity)) {
          distances.set(neighbor, alt);
          previous.set(neighbor, current);
          pq.add(neighbor);
        }
      }
    }
  }

  // Reconstruct path
  if (!previous.has(endNodeId) && startNodeId !== endNodeId) {
    return null;
  }

  const path = [];
  let curr = endNodeId;
  while (curr) {
    const node = nodeMap.get(curr);
    path.unshift([Number(node.lat.toFixed(6)), Number(node.lon.toFixed(6))]);
    curr = previous.get(curr);
  }
  return path;
}

// Function to route a corridor through a sequence of waypoints
function routeCorridor(waypoints) {
  const fullPath = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const p1 = waypoints[i];
    const p2 = waypoints[i+1];
    const n1 = findClosestNode(p1[0], p1[1]);
    const n2 = findClosestNode(p2[0], p2[1]);

    if (!n1 || !n2) {
      console.log('Could not find nodes for', p1, p2);
      fullPath.push(p1);
      continue;
    }

    const segPath = findPathBetweenNodes(n1.id, n2.id);
    if (segPath && segPath.length > 0) {
      if (fullPath.length > 0) {
        fullPath.push(...segPath.slice(1));
      } else {
        fullPath.push(...segPath);
      }
    } else {
      console.log('No graph path between', n1.id, n2.id, 'interpolating...');
      fullPath.push(p1);
    }
  }
  fullPath.push(waypoints[waypoints.length - 1]);
  return fullPath;
}

// Test Routing for Corridor 1 (P.P. Road)
console.log('--- Testing P.P. Road Routing ---');
const ppWaypoints = [
  [16.5540, 81.5175],
  [16.5510, 81.5192],
  [16.5482, 81.5212],
  [16.5460, 81.5226],
  [16.5448, 81.5235],
  [16.5432, 81.5242],
  [16.5415, 81.5248],
  [16.5395, 81.5255]
];
const ppRouted = routeCorridor(ppWaypoints);
console.log('P.P. Road routed points count:', ppRouted.length);

// Test Routing for Corridor 3 (Rest House Road)
console.log('--- Testing Rest House Road Routing ---');
const rhWaypoints = [
  [16.5373, 81.5194],
  [16.5370, 81.5210],
  [16.5366, 81.5225],
  [16.5385, 81.5250],
  [16.5402, 81.5268],
  [16.5415, 81.5285]
];
const rhRouted = routeCorridor(rhWaypoints);
console.log('Rest House Road routed points count:', rhRouted.length);
