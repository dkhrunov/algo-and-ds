import { Node } from "../Node/Node";

export class LinkedList<T> {
	private _head: Node<T> | null;
	private _tail: Node<T> | null;
	private _length: number;

	// O(1)
	public get head(): Node<T> | null {
		return this._head;
	}

	// O(1)
	public get tail(): Node<T> | null {
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
	public prepend(value: T): void {
		const node = new Node(value, this.head);

		this._head = node;

		if (!this.tail) {
			this._tail = node;
		}

		this._length++;
	}

	// O(1)
	public append(value: T): void {
		const node = new Node(value);

		if (!this.head) {
			this._head = node;
			this._tail = node;

      this._length++;
			return;
		}

		this.tail!.next = node;
		this._tail = node;

		this._length++;
	}

	// O(n)
	public appendByIndex(index: number, value: T): void {
		if (index < 0 || index >= this.length) {
			return;
		}

		if (index === 0) {
			return this.prepend(value);
		}

		if (index === this.length - 1) {
			return this.append(value);
		}

		const found = this.find((elem, i) => i === index - 1);

		const node = new Node(value, found!.next);
		found!.next = node;
		this._length++;

	}

  // O(n)
  public deleteHead(): T | null {
    if (!this._head) return null;

    const head = this._head;

    if (this._head.next) {
      this._head = this._head.next;
    } else {
      this._head = null;
      this._tail = null;
    }

    this._length--;

    return head.value;
  }

	// O(n)
	public delete(value: T): void {
		if (!this.head) {
			return;
		}

		while (this.head && this.head.value === value) {
			this._head = this.head.next;
      this._length--;
		}

		let current = this.head;
		while (current.next) {
			if (current.next.value === value) {
				current.next = current.next.next;
        this._length--;
			} else {
				current = current.next;
			}
		}

		if (this.tail && this.tail.value === value) {
			this._tail = current;
		}

		return;
	}

	// O(n)
	public deleteByIndex(index: number): void {
		if (index < 0 || index >= this.length) {
			return;
		}

		if (this.head && index === 0) {
			this._head = this.head.next;
      this._length--;
			return;
		}

		let current = this.head;
		let prev: Node<T> | null = null;
		let i = 0;

		while (i < index) {
			prev = current;
			current = current ? current.next : null;
			i++;
		}

		if (prev && current) {
			prev.next = current.next;
      this._length--;
		}

		if (current === this.tail) {
			this._tail = prev;
		}
	}

	// O(1)
	public clear(): void {
		this._head = null;
		this._tail = null;
		this._length = 0;
	}

	// O(n)
	public find(
		predicate: (node: Node<T>, index?: number) => boolean
	): Node<T> | null {
		if (!this.head) {
			return null;
		}

		let current: Node<T> | null = this.head;
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
		predicate: (node: Node<T>) => boolean
	): number {
		if (!this.head) {
			return -1;
		}

		let current: Node<T> | null = this.head;
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
		callback: (node: Node<T>, index: number) => void
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
	public reverse(): void {
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
}
