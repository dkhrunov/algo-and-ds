export class Node<T> {
	protected _value: T;
	protected _next: Node<T> | null;

	public get value(): T {
		return this._value;
	}

	public set value(value: T) {
		this._value = value;
	}

	public get next(): Node<T> | null {
		return this._next;
	}

	public set next(node: Node<T> | null) {
		this._next = node;
	}

	public constructor(value: T, next: Node<T> | null = null) {
		this._value = value;
		this._next = next;
	}
}