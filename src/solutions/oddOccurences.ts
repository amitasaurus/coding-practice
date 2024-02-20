// function oddOccurences(A: number[]): number {
//   const arrClone = [...A];
//   const repeatMap: { [key: string]: number } = {};
//   let oddOccurence: string = '';
//   arrClone.forEach((e) => {
//     if (repeatMap[e]) {
//       repeatMap[e] = repeatMap[e] + 1;
//     } else {
//       repeatMap[e] = 1;
//     }
//   });
//   Object.keys(repeatMap).forEach((key: string, index: number) => {
//     if (repeatMap[key] === 1) oddOccurence = key;
//   });
//   return Number(oddOccurence);
// }
export function runOddOccurences() {
  // console.log(oddOccurences([9, 3, 9, 3, 9, 7, 9]));
}
function oddOccurences(A: number[]): number {
  let result = 0;
  A.forEach((e) => {
    result = result ^ e;
  });
  return result;
}
