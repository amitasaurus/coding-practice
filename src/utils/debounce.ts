export default function debounce(func: Function, wait: number): Function {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Array<any>): void {
    clearTimeout(timeoutId);
    const context = this;
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
