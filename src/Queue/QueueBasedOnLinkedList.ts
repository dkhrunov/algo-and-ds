import { Node } from "../Node/Node";
import { QUEUE_UNDERFLOW_ERROR } from "./Exceptions/QueueUnderflowError";

export class QueueBasedOnLinkedList<T> {
	private _front: Node<T> | null;
	private _rear: Node<T> | null;
	private _length: number;

	// O(1)
	public get last(): T | null {
		return this._rear === null ? null : this._rear.value;
	}

	// O(1)
	public get length(): number {
		return this._length;
	}

	// O(1)
	public get isEmpty(): boolean {
		return this.length === 0;
	}

	public constructor() {
		this._front = null;
		this._rear = null;
		this._length = 0;
	}

	// O(1)
	public enqueue(item: T): void {
		const node = new Node<T>(item);

		if (this.isEmpty) {
			this._front = node;
		} else {
			this._rear!.next = node;
		}
			
    this._rear = node;
		this._length++;
	}

	// O(1)
	public dequeue(): T {
		if (this.isEmpty) {
      throw QUEUE_UNDERFLOW_ERROR;
    }

		const value = this._front!.value;

    if (this._front === this._rear) {
      this._front = null;
      this._rear = null;
    }
    else {
      this._front = this._front!.next;
    }

		this._length--;

		return value;
	}

	// O(1)
	public peek(): T | null {
		return this._front === null ? null : this._front.value;
	}

	// O(1)
	public clear(): void {
		this._front = null;
		this._rear = null;
		this._length = 0;
	}
}
