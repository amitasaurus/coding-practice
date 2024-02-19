export default function binarySearch(
  arr: Array<number>,
  target: number
): number {
  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (rightIndex >= leftIndex) {
    let middleIndex = Math.floor((leftIndex + rightIndex) / 2);
    let middleElement = arr[middleIndex];
    if (target === middleElement) {
      return middleIndex;
    } else if (target > middleElement) {
      leftIndex = middleIndex + 1;
    } else {
      rightIndex = middleIndex - 1;
    }
  }

  return -1;
}
