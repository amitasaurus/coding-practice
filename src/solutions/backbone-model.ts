// https://www.greatfrontend.com/questions/javascript/backbone-model
type EventName = 'change' | 'unset';

interface IBackboneModel {
  get(attribute: string): unknown | undefined;
  set(attribute: string, value: unknown): void;
  has(attribute: string): boolean;
  unset(attribute: string): void;
  on(
    eventName: EventName,
    attribute: string,
    callback: Function,
    context?: any
  ): void;
  off(event: EventName, attribute: string, callback: Function): void;
}

export default class BackboneModel implements IBackboneModel {
  private _data: Record<string, unknown> = {};
  private _subscriptions: Record<string, any> = {};
  constructor(initialValues: Record<string, unknown> = {}) {
    this._data = initialValues;
  }

  get(attribute: string): unknown | undefined {
    return this._data[attribute];
  }

  set(attribute: string, value: unknown): void {
    const oldAttr = this._data[attribute];
    const newAttr = value;
    if (newAttr === oldAttr) return;
    this._data[attribute] = value;
    const event = [attribute, 'change'].join(':');
    const subscribers: Array<Function> = this._subscriptions[event];
    if (subscribers && subscribers.length)
      subscribers.forEach((subscriber) =>
        subscriber(attribute, oldAttr, newAttr)
      );
  }

  has(attribute: string): boolean {
    return Boolean(this._data[attribute]);
  }

  unset(attribute: string): void {
    delete this._data[attribute];
    const event = [attribute, 'unset'].join(':');
    const subscribers: Array<Function> = this._subscriptions[event];
    if (subscribers && subscribers.length)
      subscribers.forEach((subscriber) => subscriber(attribute));
  }

  on(
    eventName: EventName,
    attribute: string,
    callback: Function,
    context?: any
  ): void {
    if (!this._data[attribute]) return;
    const eventName_internal = [attribute, eventName].join(':');
    this._subscriptions[eventName_internal] =
      this._subscriptions[eventName_internal] ?? [];
    this._subscriptions[eventName_internal].push(
      callback.bind(context || this)
    );
  }

  off(eventName: EventName, attribute: string, callback: Function): void {
    const eventName_internal = [attribute, eventName].join(':');
    const events: Array<Function> = this._subscriptions[eventName_internal];
    const index = events.findIndex((event) => event === callback);
    events.splice(index, 1);
    this._subscriptions[eventName_internal] = events;
  }
}

/** Test Case */
// Instantiate the BackboneModel.
const person = new BackboneModel({ name: 'John', age: 30 });

// Log initial values.
console.log(person.get('name')); // "John"
console.log(person.get('age')); // 30

// Set new values.
person.set('name', 'Jane');
person.set('age', 25);

// Log updated values.
console.log(person.get('name')); // "Jane"
console.log(person.get('age')); // 25

// Check if the model has a specific attribute.
console.log(person.has('name')); // true
console.log(person.has('gender')); // false

// Unset an attribute.
person.unset('age');
console.log(person.get('age')); // undefined

function nameChangeCallback(attribute, newName, oldName) {
  console.log(`'${attribute}' changed from '${oldName}' to '${newName}'`);
}
// Register an event listener for a change in the `name` field.
person.on('change', 'name', nameChangeCallback);

// Trigger the 'change' event for the 'name' attribute.
person.set('name', 'Bob');
// > "'name' changed from 'Jane' to 'Bob'"

// Remove an event listener for the 'name' attribute.
person.off('name', nameChangeCallback);

// Trigger the 'change' event again.
person.set('name', 'Alice');
// No output because the listener was removed.
