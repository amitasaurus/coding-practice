type IterateeFn<T> = (value: T) => number | string;

export default function countBy<T>(
  array: Array<T>,
  iteratee: IterateeFn<T> | string
): { [key: string]: number } {
  const aggregateObject: Record<string, number> = {};
  for (const value of array) {
    const parsedValue =
      typeof iteratee === 'function'
        ? iteratee(value)
        : (value as any)[iteratee]; // Accessing the property dynamically
    aggregateObject[parsedValue] = (aggregateObject[parsedValue] || 0) + 1;
  }
  return aggregateObject;
}
