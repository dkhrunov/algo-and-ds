export class Stack<T> {
	private readonly items: T[];

	public get value(): T[] {
		return this.items;
	}

	public get isEmpty(): boolean {
		return this.items.length === 0;
	}

	public get length(): number {
		return this.items.length;
	}

	constructor(items: T[] = []) {
		this.items = items;
	}

	public push(item: T): void {
		this.items.push(item);
	}

	public pop(): T | null {
		if (this.isEmpty) {
			return null;
		}

		return this.items.pop() as T;
	}

	public peek(): T | null {
		if (this.isEmpty) {
			return null;
		}

		return this.items[this.items.length - 1];
	}

	public clear(): void {
		this.items.length = 0;
	}
}
