export default function binaryGap(N: number): number {
  const binaryString: string = N.toString(2);
  let consecutiveZeros: number = 0;
  let longestSequence = 0;
  let binaryDigits: string[] = binaryString.split('');
  binaryDigits.forEach((e) => {
    if (e === '0') {
      consecutiveZeros++;
    } else {
      longestSequence = Math.max(longestSequence, consecutiveZeros);
      consecutiveZeros = 0;
    }
  });
  const binaryGap = `1${new Array(longestSequence).fill(0).join('')}1`;
  return binaryString.includes(binaryGap) ? longestSequence : 0;
}
// binaryGap(529); //15,20
