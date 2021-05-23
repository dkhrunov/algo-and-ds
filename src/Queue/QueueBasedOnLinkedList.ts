import { LinkedList } from "../LinkedList/LinkedList";

export class Queue<T> {
	private linkedList = new LinkedList<T>();

	public get head(): T | null {
		return this.linkedList.head ? this.linkedList.head.value : null;
	}

	public get tail(): T | null {
		return this.linkedList.tail ? this.linkedList.tail.value : null;
	}

	public get length(): number {
		return this.linkedList.length;
	}

	public get isEmpty(): boolean {
		return this.length === 0;
	}

	constructor(data?: T[]) {
		if (data !== undefined) {
			this.enqueueArray(data);
		}
	}

	public enqueue(item: T): void {
		this.linkedList.append(item);
	}

	public dequeue(): T | null {
		if (this.head === null) {
			return null;
		}

		const item = this.linkedList.head!.value;
		this.linkedList.deleteByIndex(0);

		return item;
	}

	public peek(): T | null {
		if (this.head === null) {
			return null;
		}

		return this.linkedList.head!.value;
	}

	public clear(): void {
		this.linkedList.clear();
	}

	private enqueueArray(items: T[]): void {
		items.forEach((item) => this.enqueue(item));
	}
}
