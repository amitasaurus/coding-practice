export default function cycle(...values: string[]) {
  let currentPointer = 0;
  return () => {
    const currentValue = values[currentPointer];
    currentPointer =
      currentPointer < values.length - 1 ? currentPointer + 1 : 0;
    return currentValue;
  };
}

/**
 * const fn = cycle('on','off')
 * fn(); // 'on'
 * fn(); // 'off'
 */

export function runCycle() {
  const fn = cycle('on', 'off');
  fn(); // 'on'
  fn(); // 'off'
}
