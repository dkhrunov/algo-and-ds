import { Node } from '../../Node/Node';

export class DoublyLinkedListNode<T> extends Node<T> {
	protected _next: DoublyLinkedListNode<T> | null;
	protected _previous: DoublyLinkedListNode<T> | null;

	public get next(): DoublyLinkedListNode<T> | null {
		return this._next;
	}

	public set next(node: DoublyLinkedListNode<T> | null) {
		this._next = node;
	}

	public get previous(): DoublyLinkedListNode<T> | null {
		return this._previous;
	}

	public set previous(node: DoublyLinkedListNode<T> | null) {
		this._previous = node;
	}

	public constructor(value: T, next: DoublyLinkedListNode<T> | null = null, previous: DoublyLinkedListNode<T> | null = null) {
		super(value,next);

		this._next = next;
		this._previous = previous;
	}
}