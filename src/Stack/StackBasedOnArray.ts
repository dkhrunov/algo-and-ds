export class StackBasedOnArray<T> {
	private readonly items: T[];

	// O(1)
	public get value(): T[] {
		return this.items;
	}

	// O(1)
	public get isEmpty(): boolean {
		return this.items.length === 0;
	}

	// O(1)
	public get length(): number {
		return this.items.length;
	}

	constructor(items: T[] = []) {
		this.items = items;
	}

	// O(1)
	public push(item: T): void {
		this.items.push(item);
	}

	// O(1)
	public pop(): T | null {
		if (this.isEmpty) {
			return null;
		}

		return this.items.pop() as T;
	}

	// O(1)
	public peek(): T | null {
		if (this.isEmpty) {
			return null;
		}

		return this.items[this.items.length - 1];
	}

	// O(1)
	public clear(): void {
		this.items.length = 0;
	}
}
