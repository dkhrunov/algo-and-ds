import { LinkedList } from "../LinkedList/LinkedList";

export class Queue<T> {
	private linkedList = new LinkedList<T>();

	// O(1)
	public get head(): T | null {
		return this.linkedList.head ? this.linkedList.head.value : null;
	}

	// O(1)
	public get tail(): T | null {
		return this.linkedList.tail ? this.linkedList.tail.value : null;
	}

	// O(1)
	public get length(): number {
		return this.linkedList.length;
	}

	// O(1)
	public get isEmpty(): boolean {
		return this.length === 0;
	}

	constructor(data?: T[]) {
		if (data !== undefined) {
			this.enqueueArray(data);
		}
	}

	// O(1)
	public enqueue(item: T): void {
		this.linkedList.append(item);
	}

	// O(1)
	public dequeue(): T | null {
		if (this.head === null) {
			return null;
		}

		const item = this.linkedList.head!.value;
		this.linkedList.deleteByIndex(0);

		return item;
	}

	// O(1)
	public peek(): T | null {
		if (this.head === null) {
			return null;
		}

		return this.linkedList.head!.value;
	}

	// O(1)
	public clear(): void {
		this.linkedList.clear();
	}

	// O(n)
	private enqueueArray(items: T[]): void {
		items.forEach((item) => this.enqueue(item));
	}
}
