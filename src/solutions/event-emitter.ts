//https://www.greatfrontend.com/questions/javascript/event-emitter-ii?list=data-structures-algorithms
interface IEventEmitter {
  on(eventName: string, listener: Function): { off: () => void };
  emit(eventName: string, ...args: Array<any>): boolean;
}

export default class EventEmitter implements IEventEmitter {
  private _subscriptions: Record<string, Array<Function>> = {};

  on(eventName: string, listener: Function): { off: () => void } {
    const subscriptions = this._subscriptions[eventName] ?? [];
    subscriptions.push(listener);
    this._subscriptions[eventName] = subscriptions;
    return {
      off: () => {
        this.off(eventName, listener);
      },
    };
  }

  off(eventName: string, listener: Function): void {
    const subscriptions = this._subscriptions[eventName] ?? [];
    const index = subscriptions.findIndex(
      (subscription) => subscription === listener
    );
    subscriptions.splice(index, 1);
    this._subscriptions[eventName] = subscriptions;
  }

  emit(eventName: string, ...args: Array<any>): boolean {
    const subscriptions = this._subscriptions[eventName] ?? [];
    if (subscriptions.length > 0) {
      subscriptions.forEach((cb) => cb(...args));
      return true;
    } else {
      return false;
    }
  }
}

/** Test Cases */
const emitter = new EventEmitter();

function addTwoNumbers(a: number, b: number) {
  console.log(`The sum is ${a + b}`);
}

// Returns a subscription object that has an .off() method.
const sub = emitter.on('foo', addTwoNumbers);
emitter.emit('foo', 2, 5);
// > "The sum is 7"

emitter.on('foo', (a: number, b: number) => {
  console.log(`The product is ${a * b}`);
});
emitter.emit('foo', 4, 5);
// > "The sum is 9"
// > "The product is 20"

sub.off(); // This unsubscribes the callback that logs the sum of the numbers.
emitter.emit('foo', -3, 9);
// > "The product is -27"
// (Only the multiply callback is triggered, the first one was unsubscribed.)
