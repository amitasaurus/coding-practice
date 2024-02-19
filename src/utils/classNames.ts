export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

export default function classNames(...args: Array<ClassValue>): string {
  const classArr: string[] = [];

  function processClassArgs(classArgs: ClassValue): void {
    if (!classArgs) return;
    if (Array.isArray(classArgs)) {
      classArgs.forEach(processClassArgs);
    } else if (Object.getPrototypeOf(classArgs) === Object.prototype) {
      for (const key in classArgs as ClassDictionary) {
        if (Object.prototype.hasOwnProperty.call(classArgs, key)) {
          if ((classArgs as ClassDictionary)[key]) {
            classArr.push(key);
          }
        }
      }
    } else {
      classArr.push(classArgs as string);
    }
  }
  args.forEach(processClassArgs);
  return classArr.join(' ');
}

// console.log(classNames('a', ['b', { c: true, d: false }])); // 'a b c'
// console.log(classNames('foo', { bar: false, taz: true })); // 'foo taz'
// console.log(classNames({ foo: true }, { bar: true })); // 'foo bar'
// console.log(classNames(null, false, 'bar', undefined, { baz: null }, '')); // 'bar'
// console.log(classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')); // 'bar 1'
// console.log(classNames('foo', 'bar')); // 'foo bar'
// console.log(classNames({ 'foo-bar': true })); // 'foo-bar'
// console.log(classNames({ 'foo-bar': false })); // ''
// console.log(classNames({ foo: true, bar: true })); // 'foo bar'
// console.log(classNames({ foo: true, bar: false, qux: true })); // 'foo qux'
