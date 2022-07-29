import { DoublyLinkedListNode } from "./DoublyLinkedListNode";

export class DoublyLinkedList<T> {
	private _head: DoublyLinkedListNode<T> | null;
	private _tail: DoublyLinkedListNode<T> | null;
	private _length: number;

	// O(1)
	public get head(): DoublyLinkedListNode<T> | null {
		return this._head;
	}

	// O(1)
	public get tail(): DoublyLinkedListNode<T> | null {
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

	public constructor(array?: T[]) {
		this._head = null;
		this._tail = null;
		this._length = 0;

		if (array) {
			array.forEach((value) => this.append(value));
		}
	}

	// O(1)
	public prepend(value: T): DoublyLinkedList<T> {
		const node = new DoublyLinkedListNode(value, this.head, null);

		if (this.head) {
			this.head.previous = node;
		}

		this._head = node;

		if (!this.tail) {
			this._tail = node;
		}

		this.incrementLength();
		return this;
	}

	// O(1)
	public append(value: T): DoublyLinkedList<T> {
		const node = new DoublyLinkedListNode(value);

		if (!this.head) {
			this._head = node;
			this._tail = node;

			this.incrementLength();
			return this;
		}

		this.tail!.next = node;
		node.previous = this.tail;
		this._tail = node;

		this.incrementLength();
		return this;
	}

	// O(n)
	public delete(value: T): DoublyLinkedList<T> {
		if (!this.head) {
			return this;
		}

		let currentNode: DoublyLinkedListNode<T> | null= this.head;

		while (currentNode) {
			if (currentNode.value === value) {
				if (currentNode === this.head) {
					this._head = currentNode.next;

					if (this.head) {
						this.head.previous = null;
					}

					if (currentNode === this.tail) {
						this._tail = null;
					}
				} else if (currentNode === this.tail) {
					this._tail = currentNode.previous;
					this.tail.next = null;
				} else {
					const previousNode = currentNode.previous;
					const nextNode = currentNode.next;

					previousNode!.next = nextNode;
					nextNode!.previous = previousNode;
				}

				this.decrementLength();
			}

			currentNode = currentNode.next;
		}

		return this;
	}

	// O(n)
	public deleteByIndex(index: number): DoublyLinkedList<T> {
		if (index < 0 || index >= this.length) {
			return this;
		}

		if (this.head && index === 0) {
			this._head = this.head.next;
			this.decrementLength();
			return this;
		}

		let current = this.head;
		let prev: DoublyLinkedListNode<T> | null = null;
		let i = 0;

		while (i < index) {
			prev = current;
			current = current ? current.next : null;
			i++;
		}

		if (prev && current) {
			prev.next = current.next;
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
		predicate: (node: DoublyLinkedListNode<T>, index?: number) => boolean
	): DoublyLinkedListNode<T> | null {
		if (!this.head) {
			return null;
		}

		let current: DoublyLinkedListNode<T> | null = this.head;
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
		predicate: (node: DoublyLinkedListNode<T>) => boolean
	): number {
		if (!this.head) {
			return -1;
		}

		let current: DoublyLinkedListNode<T> | null = this.head;
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
		callback: (node: DoublyLinkedListNode<T>, index?: number) => void
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
	public reverse(): DoublyLinkedList<T> {
		let current = this.head;
		let prev = null;
		let next = null;

		while (current) {
			next = current.next;

			current.next = prev;

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