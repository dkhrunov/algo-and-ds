export class Node<T> {
	private _value: T;
	private _next: Node<T> | null;

	public get value(): T {
		return this._value;
	}

	public get next(): Node<T> | null {
		return this._next;
	}

	constructor(value: T, next: Node<T> | null = null) {
		this._value = value;
		this._next = next;
	}

	public linkWith(node: Node<T> | null): void {
		this._next = node;
	}
}