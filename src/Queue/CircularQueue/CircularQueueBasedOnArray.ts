import { QUEUE_EMPTY_ERROR } from "../Exceptions/QueueEmptyError";
import { QUEUE_OVERFLOW_ERROR } from "../Exceptions/QueueOverflowError";

export class CircularQueueBasedOnArray<T> {
  private readonly _queue: T[] = [];

  private _size : number;
  private _front: number;
  private _rear : number;

  public constructor(size: number) {
    this._size  = size;
    this._front = -1;
    this._rear  = -1;
  }

  // O(1)
  public get isEmpty(): boolean {
    return this._front === -1;
  }

  // O(1)
  public get isFull(): boolean {
    // if front pointer at the start and rear at the end of the queue.
    if (this._front === 0 && this._rear === this._size - 1) return true;
    // if rear pointer at the end of the queue.
    if (this._rear === (this._front - 1) % (this._size - 1)) return true;
    return false;
  }

  // O(1)
  public get last(): T | null {
    return this._queue[this._rear] ?? null;
  }

  // O(1)
  public peek(): T | null {
    return this._queue[this._front] ?? null;
  }

  // O(1)
  public enqueue(element: T): void {
    if (this.isFull) {
      throw QUEUE_OVERFLOW_ERROR;
    }
    else if (this._front === -1 && this._rear === -1) {
      this._front = 0;
      this._rear = 0;
    }
    // if has empty space at the start of queue
    else if (this._rear === this._size - 1 && this._front !== 0) {
      this._rear = 0;
    }
    else {
      this._rear += 1;
    }

    this._queue[this._rear] = element;
  }

  // O(1)
  public dequeue(): T {
    if (this.isEmpty) {
      throw QUEUE_EMPTY_ERROR;
    }

    const element = this._queue[this._front];

    // if queue has only one element, then reset the queue
    if (this._front === this._rear) {
      this._front = -1;
      this._rear = -1;
    }
    // if the front pointer has reached the end of the queue, then set front to 0 index
    else if (this._front === this._size - 1) {
      this._front = 0;
    } 
    else {
      this._front += 1;
    }

    return element;
  }
}
