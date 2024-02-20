export default function depthFirstSearch(
  graph: Record<string, Array<string>>,
  source: string
): string[] | [] {
  // If there are no nodes in the graph, just return an empty array
  if (Object.keys(graph).length === 0) {
    return [];
  }

  // Initialize a set that tracks visited nodes.
  const visitedNodes = new Set();

  function depthTraversal(node: string) {
    if (visitedNodes.has(node)) return;
    visitedNodes.add(node);
    const childNodes = graph[node];
    for (const child of childNodes) {
      depthTraversal(child);
    }
  }
  depthTraversal(source);

  return Array.from(visitedNodes);
}

const graph = { A: ['B'], B: [] };
console.log(depthFirstSearch(graph, 'A'));
