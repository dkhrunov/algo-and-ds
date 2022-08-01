import { DoublyLinkedListNode } from "../../LinkedList/DoublyLinkedList/DoublyLinkedListNode";
import { QUEUE_EMPTY_ERROR } from "../Exceptions/QueueEmptyError";
import { IDeque } from "./IDeque.interface";

export class DequeBasedOnDoublyLinkedList<T>  implements IDeque<T> {
  private _front: DoublyLinkedListNode<T> | null;
  private _rear: DoublyLinkedListNode<T> | null;
  private _count: number;

  constructor() {
    this._front = null;
    this._rear = null;
    this._count = 0;
  }

  // O(1)
  public get count(): number {
    return this._count;
  }

  // O(1)
  public get isEmpty(): boolean {
    return this._front === null;
  }

  // O(1)
  public get first(): T {
    if (this._front === null) {
      throw QUEUE_EMPTY_ERROR;
    }

    return this._front.value;
  }

  // O(1)
  public get last(): T {
    if (this._rear === null) {
      throw QUEUE_EMPTY_ERROR;
    }

    return this._rear.value;
  }

  // O(1)
  public addFirst(value: T): void {
    const node = new DoublyLinkedListNode(value);

    // is empty
    if (this._front === null) {
      this._front = node;
      this._rear = node;
    }
    else {
      node.next = this._front;
      this._front.previous = node;
      this._front = node;
    }

    this._count++;
  }

  // O(1)
  public addLast(value: T): void {
    const node = new DoublyLinkedListNode(value);

    // is empty
    if (this._rear === null) {
      this._front = node;
      this._rear = node;
    }
    else {
      node.previous = this._rear;
      this._rear.next = node;
      this._rear = node;
    }

    this._count++;
  }

  // O(1)
  public removeFirst(): T {
     // is empty
     if (this._front === null) {
      throw QUEUE_EMPTY_ERROR;
    }

    const node = this._front;

    this._front = node.next;
    node.next = null;

    if (this._front === null) {
      this._rear = null;
    }
    else {
      this._front.previous = null;
    }

    this._count--;

    return node.value;
  }

  // O(1)
  public removeLast(): T {
     // is empty
     if (this._rear === null) {
      throw QUEUE_EMPTY_ERROR;
    }

    const node = this._rear;

    this._rear = node.previous;
    node.previous = null;

    if (this._rear === null) {
      this._front = null;
    }
    else {
      this._rear.next = null;
    }

    this._count--;

    return node.value;
  }

  // O(1)
  public push(value: T): void {
    this.addFirst(value);
  }
  
  // O(1)
  public pop(): T {
    return this.removeFirst();
  }

  // O(1)
  public clear(): void {
    this._front = null;
    this._rear = null;
    this._count = 0;
  }
}