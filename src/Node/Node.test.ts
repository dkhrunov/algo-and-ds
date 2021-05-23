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
		it('it create the node with this value and link with next node', () => {
			const nextNode = new Node<number>(6);
			const node = new Node<number>(5, nextNode);

			expect(node.value).toBe(5);
			expect(node.next).toEqual(nextNode);
			expect(nextNode.next).toBeNull();
		})
	})
})


describe('#linkWith', () => {
	it('it link the node with other node', () => {
		const node = new Node<number>(5);
		const nextNode = new Node<number>(6);
		node.linkWith(nextNode);

		expect(node.value).toBe(5);
		expect(node.next).toEqual(nextNode);
		expect(nextNode.next).toBeNull();
	})
})