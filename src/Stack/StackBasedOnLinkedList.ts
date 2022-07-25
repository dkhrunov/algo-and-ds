import { LinkedList } from "../LinkedList/LinkedList";

export class StackBasedOnLinkedList<T> {
  private readonly _linkedList = new LinkedList<T>();

  // O(0)
  public get isEmpty(): boolean {
    return !this._linkedList.head;
  }

  // O(0)
  public peek(): T | null {
    if (this.isEmpty) return null;

    return this._linkedList.head!.value;
  }

  // O(0)
  public push(value: T): void {
    this._linkedList.prepend(value);
  }

  // O(0)
  public pop(): T | null {
    if (this.isEmpty) return null;

    const head = this._linkedList.deleteHead();

    return head;
  }
}