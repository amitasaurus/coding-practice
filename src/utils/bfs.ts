export default function bfs(
  graph: Record<string, Array<string>>,
  startNode: string
) {
  const visitedNodes = new Set();
  const queue = new Array();

  //Check if the graph is not empty
  if (Object.keys(graph).length === 0) {
    return [];
  }
  visitedNodes.add(startNode);
  queue.push(startNode);
  while (queue.length > 0) {
    const currentNode: string | undefined = queue.shift(); //currentNode
    const childNodes: Array<string> = graph[currentNode as string]; //childNodes of currentNode
    for (const node of childNodes) {
      if (!visitedNodes.has(node)) {
        visitedNodes.add(node);
        queue.push(node);
      }
    }
  }
  return Array.from(visitedNodes);
}

const graph = {
  A: ['B', 'C', 'D'],
  B: ['E', 'F'],
  C: ['G', 'H'],
  D: ['I', 'J'],
  E: ['D'],
  F: [],
  G: [],
  H: [],
  I: [],
  J: [],
};

bfs(graph, 'A'); // ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
// console.log(bfs({}, 'A')); // []
