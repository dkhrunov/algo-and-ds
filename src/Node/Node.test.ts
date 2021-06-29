import { Node } from './Node';

describe('#constructor', () => {
	describe('with value', () => {
		it('it create the node with this value', () => {
			const node = new Node<number>(5);

			expect(node.value).toBe(5);
			expect(node.next).toBeNull();
		})
	})

	describe('with value and next node', () => {
		it('it create the node with this value and with next node link', () => {
			const nextNode = new Node<number>(6);
			const node = new Node<number>(5, nextNode);

			expect(node.value).toBe(5);
			expect(node.next).toEqual(nextNode);
		})
	})
})

describe('#set value property', () => {
	it("it set the value", () => {
		const node = new Node<number>(3)
		node.value = 99;

		expect(node.value).toBe(99);
	})
})

describe('#set next property', () => {
	it("it set the next node", () => {
		const node = new Node<number>(3)
		const nextNode = new Node<number>(4)
		node.next = nextNode;

		expect(node.next).toEqual(nextNode);
	})
})