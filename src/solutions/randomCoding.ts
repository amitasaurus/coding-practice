export function FrogJmp(X: number, Y: number, D: number): number {
  return Math.ceil((Y - X) / D);
}
export function PermMissingElem(A: number[]): number {
  let missingElem = 1;
  const elemMap = new Map();
  A.map((e) => {
    elemMap.set(e, true);
  });
  for (let i = 0; i <= A.length; i++) {
    if (i === 0) continue;
    if (!elemMap.get(i)) missingElem = i;
  }
  return missingElem;
}
// console.log('FrogJmp', FrogJmp(10, 85, 30));
// console.log('PermMissingElem', PermMissingElem([]));
