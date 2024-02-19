function rotation(A: number[], K: number): number[] {
  let rotationCount = 0;
  let array = [...A];
  while (rotationCount < K) {
    const last = array.pop();
    if (typeof last !== 'undefined') array.unshift(last);
    rotationCount++;
  }
  return array;
}
export function runRotation() {
  const A = [1, 2, 3, 4];
  const K = 4;
  rotation(A, K);
  //   console.log(rotation(A, K));
}
