import { Node } from "../Node/Node";

export class Queue<T> {
	private _head: Node<T> | null;
	private _tail: Node<T> | null;
	private _length: number;

	public get head(): T | null {
		return this._head === null ? null : this._head.value;
	}

	public get tail(): T | null {
		return this._tail === null ? null : this._tail.value;
	}

	public get length(): number {
		return this._length;
	}

	public get isEmpty(): boolean {
		return this.length === 0;
	}

	constructor(data?: T[]) {
		this._head = null;
		this._tail = null;
		this._length = 0;

		if (data !== undefined) {
			this.enqueueArray(data);
		}
	}

	public enqueue(item: T): void {
		const node = new Node<T>(item);

		if (this.head === null) {
			this._head = node;
			this._tail = node;
		} else {
			this._tail!.linkWith(node);
			this._tail = node;
		}

		this._length++;
	}

	public dequeue(): T | null {
		if (!this._head) {
			return null;
		}

		const current = this._head;

		this._head = this._head.next;
		this._length--;

		return current.value;
	}

	public peek(): T | null {
		if (this.head === null) {
			return null;
		}

		return this.head;
	}

	public clear(): void {
		this._head = null;
		this._tail = null;
		this._length = 0;
	}

	private enqueueArray(items: T[]): void {
		items.forEach((item) => this.enqueue(item));
	}
}
