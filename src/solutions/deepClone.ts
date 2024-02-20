export default function deepClone(value: object): object {
  const valueStringified = JSON.stringify(value);
  const valueCloned = valueStringified.slice();
  const valueParsed = JSON.parse(valueCloned);

  /** Alternate method
   * 1. JSON.parse(JSON.stringify(value))
   * 2. structuredClone(value)
   */
  return valueParsed;
}
export function runDeepClone() {
  // console.log(deepClone({ user: { role: 'admin' } }));
}
