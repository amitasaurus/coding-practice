export function isArray(value: number[]): boolean {
  return Array.isArray(value);
}

export function isFunction(value: Function): boolean {
  return typeof value === 'function';
}

export function isObject(value: Object): boolean {
  return (
    value != null &&
    (typeof value === 'object' ||
      Object.prototype.toString.call(value) === '[object Function]')
  );
}

export function isPlainObject(value: Object): boolean {
  return (
    value != null &&
    (Object.getPrototypeOf(value) === Object.prototype ||
      Object.getPrototypeOf(value) === null)
  );
}

export function runTypes() {
  // console.log(isPlainObject(Object.create(null)));
}
