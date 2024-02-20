/**
 * Implement a stack data structure in JavaScript that contains the following operations:
 * new Stack(): Creates an instance of a Stack class that doesn't contain any items. The constructor does not accept any arguments.
 * push(): Pushes an item onto the top of the stack. Required time complexity: O(1).
 * pop(): Removes an item at the top of the stack and returns that item. Required time complexity: O(1).
 * isEmpty(): Determines if the stack is empty. Required time complexity: O(1).
 * peek(): Returns the item at the top of the stack without removing it from the stack. Required time complexity: O(1).
 * length(): Returns the number of items in the stack. Required time complexity: O(1).
 */

export default class Stack {
  private data: number[] = [];
  length(): number {
    return this.data.length;
  }
  push(value: number): number {
    return this.data.push(value);
  }
  pop(): number {
    return this.data.pop() as number;
  }
  isEmpty(): boolean {
    return this.length() === 0;
  }
  peek(): number {
    return this.data[this.length() - 1];
  }
}

export function runStack() {
  const stack = new Stack();
  /**
  console.log(stack.isEmpty()); // true
  console.log(stack.push(1));
  console.log(stack.push(2));
  console.log(stack.length()); // 2
  console.log(stack.push(3));
  console.log(stack.peek()); // 3
  console.log(stack.pop()); // 3
  console.log(stack.isEmpty()); // false
   */
}
