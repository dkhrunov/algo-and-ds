import { QUEUE_EMPTY_ERROR } from "../Exceptions/QueueEmptyError";
import { QUEUE_OVERFLOW_ERROR } from "../Exceptions/QueueOverflowError";
import { IDeque } from "./IDeque.interface";

export class DequeBasedOnCircularArray<T> implements IDeque<T> {
  private readonly _size: number;
  private _array: (T | null)[];
  private _front: number;
  private _rear: number;
  private _count: number;
  
  constructor(size: number) {
    this._size = size;
    this._array = new Array(size);
    this._front = -1;
    this._rear = 0;
    this._count = 0;
  }

  // O(1)
  public get count(): number {
    return this._count;
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
  public get first(): T {
    if (this.isEmpty) {
      throw QUEUE_EMPTY_ERROR;
    }

    return this._array[this._front]!;
  }

  // O(1)
  public get last(): T {
    if (this.isEmpty) {
      throw QUEUE_EMPTY_ERROR;
    }

    return this._array[this._rear]!;
  }

  // O(1)
  public addFirst(value: T): void {
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

    this._array[this._front] = value;
    this._count++;
  }

  // O(1)
  public addLast(value: T): void {
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

    this._array[this._rear] = value;
    this._count++;
  }

  // O(1)
  public removeFirst(): T {
    if (this.isEmpty) {
      throw QUEUE_EMPTY_ERROR;
    }

    const item = this._array[this._front];
    this._array[this._front] = null;
    this._count--;

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
    this._count--;

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
  public clear(): void {
    this._array = new Array(this._size);
    this._front = -1;
    this._rear = 0;
    this._count = 0;
  }
}