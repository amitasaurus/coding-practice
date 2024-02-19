// DATA
const airports = [
  'DEL',
  'BOM',
  'BLR',
  'MAA',
  'CCU',
  'HYD',
  'AMD',
  'PNQ',
  'GOI',
  'COK',
];
const routes = [
  ['DEL', 'BOM'], // Delhi to Mumbai
  ['DEL', 'BLR'], // Delhi to Bangalore
  ['DEL', 'MAA'], // Delhi to Chennai
  ['DEL', 'CCU'], // Delhi to Kolkata
  ['BOM', 'BLR'], // Mumbai to Bangalore
  ['BOM', 'MAA'], // Mumbai to Chennai
  ['BOM', 'CCU'], // Mumbai to Kolkata
  ['BLR', 'MAA'], // Bangalore to Chennai
  ['BLR', 'HYD'], // Bangalore to Hyderabad
  ['MAA', 'CCU'], // Chennai to Kolkata
  ['MAA', 'HYD'], // Chennai to Hyderabad
  ['CCU', 'HYD'], // Kolkata to Hyderabad
  ['DEL', 'AMD'], // Delhi to Ahmedabad
  ['DEL', 'PNQ'], // Delhi to Pune
  ['DEL', 'GOI'], // Delhi to Goa
  ['BOM', 'AMD'], // Mumbai to Ahmedabad
  ['BOM', 'PNQ'], // Mumbai to Pune
  ['BOM', 'GOI'], // Mumbai to Goa
  ['BLR', 'HYD'], // Bangalore to Hyderabad
  ['BLR', 'COK'], // Bangalore to Kochi
];

// The graph
const adjacencyList = new Map();

// Add node
function addNode(airport: string) {
  adjacencyList.set(airport, []);
}

// Add edge, undirected
function addEdge(origin: string, destination: string) {
  adjacencyList.get(origin).push(destination);
  adjacencyList.get(destination).push(origin);
}
airports.forEach(addNode);
routes.forEach((route: string[]) => addEdge(route[0], route[1])); //alternative syntax addEdge(...route)

//Find if a route exists between Bangalore to Hyderabad
function bfs(start: string) {
  const visited = new Set(); //Visited Nodes
  const queue = [start]; // Queue
  while (queue.length > 0) {
    const airport = queue.shift(); //Current Node
    const destinations = adjacencyList.get(airport); //Child Nodes
    for (const destination of destinations) {
      if (destination === 'HYD') {
        // console.log(`BFS found Hyderabad!`);
      }
      if (!visited.has(destination)) {
        visited.add(destination);
        queue.push(destination);
      }
    }
  }
}
bfs('BLR');
