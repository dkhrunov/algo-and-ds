import { LinkedList } from "../LinkedList/LinkedList";

export class StackBasedOnLinkedList<T> {
  private readonly _linkedList = new LinkedList<T>();

  // O(1)
  public get isEmpty(): boolean {
    return !this._linkedList.head;
  }

  // O(1)
  public peek(): T | null {
    if (this.isEmpty) return null;

    return this._linkedList.head!.value;
  }

  // O(1)
  public push(value: T): void {
    this._linkedList.prepend(value);
  }

  // O(1)
  public pop(): T | null {
    if (this.isEmpty) return null;

    const head = this._linkedList.deleteHead();

    return head;
  }
}