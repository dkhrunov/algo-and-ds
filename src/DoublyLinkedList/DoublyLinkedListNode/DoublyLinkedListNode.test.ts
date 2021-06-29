import { DoublyLinkedListNode } from "./DoublyLinkedListNode";

describe("#constructor", () => {
	describe('with value', () => {
		it('it create the node with this value', () => {
			const node = new DoublyLinkedListNode<number>(5);

			expect(node.value).toBe(5);
			expect(node.next).toBeNull();
		})
	})

	describe('with value and next node', () => {
		it('it create the node with this value and with next node link', () => {
			const nextNode = new DoublyLinkedListNode<number>(6);
			const node = new DoublyLinkedListNode<number>(5, nextNode);

			expect(node.value).toBe(5);
			expect(node.next).toEqual(nextNode);
		})
	})

	describe('with value, next and previous node', () => {
		it('it create the node with this value, with next and previous node link', () => {
			const prevNode = new DoublyLinkedListNode<number>(4)
			const nextNode = new DoublyLinkedListNode<number>(6);
			const node = new DoublyLinkedListNode<number>(5, nextNode, prevNode);

			expect(node.value).toBe(5);
			expect(node.next).toEqual(nextNode);
			expect(node.previous).toEqual(prevNode);
		})
	})
})

describe('#set next property', () => {
	it("it set the next node", () => {
		const node = new DoublyLinkedListNode<number>(3)
		const nextNode = new DoublyLinkedListNode<number>(4)
		node.next = nextNode;

		expect(node.next).toEqual(nextNode);
	})
})

describe('#set previous property', () => {
	it("it set the previous node", () => {
		const node = new DoublyLinkedListNode<number>(3)
		const prevNode = new DoublyLinkedListNode<number>(4)
		node.previous = prevNode;

		expect(node.previous).toEqual(prevNode);
	})
})