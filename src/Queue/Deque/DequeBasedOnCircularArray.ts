import { QUEUE_EMPTY_ERROR } from "../Exceptions/QueueEmptyError";
import { QUEUE_OVERFLOW_ERROR } from "../Exceptions/QueueOverflowError";

export class DequeBasedOnCircularArray<T> {
  private readonly _array: (T | null)[];
  private readonly _size: number;

  private _front: number;
  private _rear: number;

  constructor(size: number) {
    this._array = new Array(size);
    this._size = size;
    this._front = -1;
    this._rear = 0;
  }

  // O(1)
  public get isEmpty(): boolean {
    return this._front === -1;
  }

  // O(1)
  public get isFull(): boolean {
    return (this._front === 0 && this._rear === this._size - 1) || this._front === this._rear + 1;
  }

  // O(1)
  public addFirst(item: T): void {
    if (this.isFull) {
      throw QUEUE_OVERFLOW_ERROR;
    }

    if (this.isEmpty) {
      this._front = 0;
      this._rear = 0;
    }
    // front is at first position of queue
    else if (this._front === 0) {
      this._front = this._size - 1;
    }
    else {
      this._front--;
    }

    this._array[this._front] = item;
  }

  // O(1)
  public addLast(item: T): void {
    if (this.isFull) {
      throw QUEUE_OVERFLOW_ERROR;
    }

    if (this.isEmpty) {
      this._front = 0;
      this._rear = 0;
    }
    // rear is at last position of queue
    else if (this._rear === this._size - 1) {
      this._rear = 0;
    }
    else {
      this._rear++;
    }

    this._array[this._rear] = item;
  }

  // O(1)
  public removeFirst(): T {
    if (this.isEmpty) {
      throw QUEUE_EMPTY_ERROR;
    }

    const item = this._array[this._front];
    this._array[this._front] = null;

    // Deque has only one element
    if (this._front === this._rear) {
      this._front = -1;
      this._rear = -1;
    }
    // back to initial position
    else if (this._front === this._size - 1) {
      this._front = 0;

    }
    else {
      this._front++;
    }

    return item!;
  }

  // O(1)
  public removeLast(): T {
    if (this.isEmpty) {
      throw QUEUE_EMPTY_ERROR;
    }

    const item = this._array[this._rear];
    this._array[this._rear] = null;

    // Deque has only one element
    if (this._front === this._rear) {
      this._front = -1;
      this._rear = -1;
    }
    else if (this._rear === 0) {
      this._rear = this._size - 1;
    }
    else {
      this._rear--;
    }

    return item!;
  }

  // O(1)
  public peekFirst(): T | null {
    if (this.isEmpty) {
      return null;
    }

    return this._array[this._front];
  }

  // O(1)
  public peekLast(): T | null {
    if (this.isEmpty) {
      return null;
    }

    return this._array[this._rear];
  }

  // O(1)
  public push(item: T): void {
    this.addFirst(item);
  }
  
  // O(1)
  public pop(): T {
    return this.removeFirst();
  }
}