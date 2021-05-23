import { LinkedListNode } from "./LinkedListNode/LinkedListNode";

export class LinkedList<T> {
	private _head: LinkedListNode<T> | null;
	private _tail: LinkedListNode<T> | null;
	private _length: number;

	// O(1)
	public get head(): LinkedListNode<T> | null {
		return this._head;
	}

	// O(1)
	public get tail(): LinkedListNode<T> | null {
		return this._tail;
	}

	// O(1)
	public get isEmpty(): boolean {
		return this.length === 0;
	}

	// O(1)
	public get length(): number {
		return this._length;
	}

	constructor(array?: T[]) {
		this._head = null;
		this._tail = null;
		this._length = 0;

		if (array) {
			array.forEach((value) => this.append(value));
		}
	}

	// O(n)
	public getByIndex(index: number): T | null {
		if (index < 0 || index >= this.length) {
			return null;
		}

		let current = this.head;

		for (let i = 0; i < index; i++) {
			current = current!.next;
		}

		return current!.value;
	}

	// O(1)
	public prepend(value: T): LinkedList<T> {
		const node = new LinkedListNode(value, this.head);

		this._head = node;

		if (!this.tail) {
			this._tail = node;
		}

		this.incrementLength();
		return this;
	}

	// O(1)
	public append(value: T): LinkedList<T> {
		const node = new LinkedListNode(value);

		if (!this.head) {
			this._head = node;
			this._tail = node;

			this.incrementLength();
			return this;
		}

		this.tail!.linkWith(node);
		this._tail = node;

		this.incrementLength();
		return this;
	}

	// O(n)
	public appendByIndex(index: number, value: T): LinkedList<T> {
		if (index < 0 || index >= this.length) {
			return this;
		}

		if (index === 0) {
			return this.prepend(value);
		}

		if (index === this.length - 1) {
			return this.append(value);
		}

		const found = this.find((elem, i) => i === index - 1);

		const node = new LinkedListNode(value, found!.next);
		found!.linkWith(node);
		this.incrementLength();

		return this;
	}

	// O(n)
	public delete(value: T): LinkedList<T> {
		if (!this.head) {
			return this;
		}

		while (this.head && this.head.value === value) {
			this._head = this.head.next;
			this.decrementLength();
		}

		let current = this.head;
		while (current.next) {
			if (current.next.value === value) {
				current.linkWith(current.next.next);
				this.decrementLength();
			} else {
				current = current.next;
			}
		}

		if (this.tail && this.tail.value === value) {
			this._tail = current;
		}

		return this;
	}

	// O(n)
	public deleteByIndex(index: number): LinkedList<T> {
		if (index < 0 || index >= this.length) {
			return this;
		}

		if (this.head && index === 0) {
			this._head = this.head.next;
			this.decrementLength();
			return this;
		}

		let current = this.head;
		let prev: LinkedListNode<T> | null = null;
		let i = 0;

		while (i < index) {
			prev = current;
			current = current ? current.next : null;
			i++;
		}

		if (prev && current) {
			prev.linkWith(current.next);
			this.decrementLength();
		}

		if (current === this.tail) {
			this._tail = prev;
		}

		return this;
	}

	// O(1)
	public clear(): void {
		this._head = null;
		this._tail = null;
		this._length = 0;
	}

	// O(n)
	public find(
		predicate: (node: LinkedListNode<T>, index?: number) => boolean
	): LinkedListNode<T> | null {
		if (!this.head) {
			return null;
		}

		let current: LinkedListNode<T> | null = this.head;
		let index = 0;

		while (current) {
			if (predicate(current, index)) {
				return current;
			}

			current = current.next;
			index++;
		}

		return null;
	}

	// O(n)
	public findIndex(
		predicate: (node: LinkedListNode<T>) => boolean
	): number {
		if (!this.head) {
			return -1;
		}

		let current: LinkedListNode<T> | null = this.head;
		let index = 0;

		while (current) {
			if (predicate(current)) {
				return index;
			}

			current = current.next;
			index++;
		}

		return -1;
	}

	// O(n)
	public toArray(): T[] {
		const result: T[] = [];
		this.traverse((node) => result.push(node.value));

		return result;
	}

	// O(n)
	public traverse(
		callback: (node: LinkedListNode<T>, index?: number) => void
	): void {
		let current = this.head;
		let index = 0;

		while (current) {
			callback(current, index);
			current = current.next;
			index++;
		}
	}

	// O(n)
	public reverse(): LinkedList<T> {
		let current = this.head;
		let prev = null;
		let next = null;

		while (current) {
			next = current.next;

			current.linkWith(prev);

			prev = current;
			current = next;
		}

		this._tail = this.head;
		this._head = prev;

		return this;
	}

	// O(n)
	public print(): void {
		let output = '';
		let current = this.head;

		while (current) {
			output += `${current.value} -> `;
			current = current.next;
		}

		console.log(`${output}null`);
	}

	// O(1)
	private incrementLength(): void {
		this._length++;
	}

	// O(1)
	private decrementLength(): void {
		this._length--;
	}
}
