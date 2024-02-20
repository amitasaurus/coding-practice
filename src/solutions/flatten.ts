export default function flatten(arr: any): number[] {
  let newArr: number[] = [];
  arr.forEach((element: any) => {
    if (Array.isArray(element)) {
      newArr = newArr.concat(flatten(element));
    } else {
      newArr.push(element);
    }
  });
  return newArr;
}
/** flatten([1, [2, [3, [4, [5]]]]]) */

export function runFlatten() {
  const array = [1, [2, [3, [4, [5]]]]];
  const flattenedArr = flatten(array);
  // console.log(flattenedArr);
}
