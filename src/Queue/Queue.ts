import { Node } from "../Node/Node";

export class Queue<T> {
	private _head: Node<T> | null;
	private _tail: Node<T> | null;
	private _length: number;

	// O(1)
	public get last(): T | null {
		return this._tail === null ? null : this._tail.value;
	}

	// O(1)
	public get length(): number {
		return this._length;
	}

	// O(1)
	public get isEmpty(): boolean {
		return this.length === 0;
	}

	constructor() {
		this._head = null;
		this._tail = null;
		this._length = 0;
	}

	// O(1)
	public enqueue(item: T): void {
		const node = new Node<T>(item);

		if ((this._head?.value ?? null) === null) {
			this._head = node;
			this._tail = node;
		} else {
			this._tail!.next = node;
			this._tail = node;
		}

		this._length++;
	}

	// O(1)
	public dequeue(): T | null {
		if (!this._head) {
			return null;
		}

		const current = this._head;

		this._head = this._head.next;
		this._length--;

		return current.value;
	}

	// O(1)
	public peek(): T | null {
		return this._head === null ? null : this._head.value;
	}

	// O(1)
	public clear(): void {
		this._head = null;
		this._tail = null;
		this._length = 0;
	}
}
