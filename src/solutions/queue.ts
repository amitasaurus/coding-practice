export default class Queue<T> {
  private _list: Array<T>;
  constructor() {
    this._list = [];
  }

  /**
   * Adds an item to the back of the queue.
   */
  enqueue(item: T): number {
    return this._list.push(item);
  }

  /**
   * Removes an item from the front of the queue.
   */
  dequeue(): T | undefined {
    return this._list.shift();
  }

  /**
   * Determines if the queue is empty.
   */
  isEmpty(): boolean {
    return this.length() === 0;
  }

  /**
   * Returns the item at the front of the queue without removing it from the queue.
   */
  front(): T | undefined {
    return this._list[0];
  }

  /**
   * Returns the item at the back of the queue without removing it from the queue.
   */
  back(): T | undefined {
    return this._list[this.length() - 1];
  }

  /**
   * Returns the number of items in the queue.
   */
  length(): number {
    return this._list.length;
  }
}

const queue = new Queue();
queue.isEmpty(); // true
queue.enqueue(1);
queue.enqueue(2);
queue.length(); // 2
queue.enqueue(3);
queue.front(); // 1
queue.back(); // 3
queue.dequeue(); // 1
queue.isEmpty(); // false
