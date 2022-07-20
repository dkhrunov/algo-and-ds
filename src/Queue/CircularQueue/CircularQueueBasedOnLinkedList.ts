import { Node } from "../../Node/Node";
import { QUEUE_EMPTY_ERROR } from "../Exceptions/QueueEmptyError";

export class CircularQueueBasedOnLinkedList<T> {
  private _front: Node<T> | null = null;
  private _rear : Node<T> | null = null;

  // O(1)
  public get isEmpty(): boolean {
    return this._front === null;
  }

  // O(1)
  public get last(): T | null {
    if (!this._rear) return null;
    return this._rear.value;
  }

  // O(1)
  public peek(): T | null {
    if (!this._front) return null;
    return this._front.value;
  }

  // O(1)
  public enqueue(element: T): void {
    const node = new Node<T>(element);

    if (this.isEmpty) {
      this._front = node;
    }
    else  {
      this._rear!.next = node;
    }

    this._rear = node;
    this._rear.next = this._front;
  }

  // O(1)
  public dequeue(): T {
    if (this.isEmpty) {
      throw QUEUE_EMPTY_ERROR;
    }

    const value = this._front!.value;

    if (this._front === this._rear) {
      this._front = null;
      this._rear = null;
    }
    else {
      this._front = this._front!.next;
      this._rear!.next = this._front;
    }

    return value;
  }
}
