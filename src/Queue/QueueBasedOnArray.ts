import { QUEUE_UNDERFLOW_ERROR } from "./Exceptions/QueueUnderflowError";
import { QUEUE_OVERFLOW_ERROR } from "./Exceptions/QueueOverflowError";

export class QueueBasedOnArray<T> {
  private readonly _queue: T[];
  private readonly _size: number;

  private _front: number;
  private _rear: number;

  public constructor(size: number) {
    this._queue = new Array(size);
    this._size = size;
    this._front = 0;
    this._rear = -1;
  }

  // O(1)
  public get isEmpty(): boolean {
    return this._front === this._rear + 1;
  }

  // O(1)
  public get isFull(): boolean {
    return this._rear === this._size - 1;
  }

  // O(1)
  public enqueue(item: T): void {
    if (this.isFull) {
      throw QUEUE_OVERFLOW_ERROR;
    }

    this._queue[++this._rear] = item;
  }

  // O(1)
  public dequeue(): T {
    if (this.isEmpty) {
      throw QUEUE_UNDERFLOW_ERROR;
    }

    const item = this._queue[this._front++];

    return item;
  }

  public peek(): T | null {
    return this._queue[this._front] ?? null;
  }
}