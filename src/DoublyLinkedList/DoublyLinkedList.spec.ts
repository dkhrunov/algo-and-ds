import { DoublyLinkedList } from "./DoublyLinkedList";

describe("#costructor", () => {
	describe("without arguments", () => {
		it("it create the empty doubly linked list ", () => {
			const list = new DoublyLinkedList<number>();

			expect(list.head).toBeNull();
			expect(list.tail).toBeNull();
			expect(list.length).toBe(0);
			expect(list.isEmpty).toBeTruthy();
		})
	})

	describe("with array of values", () => {
		const list = new DoublyLinkedList<number>([1, 2, 3, 4]);

		expect(list.head?.value).toBe(1);
		expect(list.tail?.value).toBe(4);
		expect(list.length).toBe(4);
		expect(list.isEmpty).toBeFalsy();
	})
})

describe("#prepend", () => {
	it("it adds the element to the beginning of the list", () => {
		const list = new DoublyLinkedList<number>();
		list.prepend(1);

		const oldHead = list.head;
		const oldTail = list.tail;

		list.prepend(2);
		
		expect(oldHead).toEqual(oldTail);
		
		expect(list.head?.value).toBe(2);
		expect(list.head?.next).toEqual(oldHead);
		expect(list.head?.previous).toBeNull();

		expect(list.tail).toEqual(oldTail);
		expect(list.tail?.value).toBe(1);
		expect(list.tail?.next).toBeNull();
		expect(list.tail?.previous).toBe(list.head);

		expect(list.length).toBe(2);
		expect(list.isEmpty).toBeFalsy();
	})
})

describe("#append", () => {
	it("it adds the element to the ending of the list", () => {
		const list = new DoublyLinkedList<number>();
		list.append(1);
		list.append(2);

		expect(list.head).not.toBeNull();
		expect(list.head?.value).toBe(1);
		expect(list.head?.previous).toBeNull();
		expect(list.head?.next?.value).toBe(2);
		expect(list.head?.next?.previous?.value).toBe(1);

		expect(list.tail).not.toBeNull();
		expect(list.tail?.value).toBe(2);
		expect(list.tail?.next).toBeNull();
		expect(list.tail?.previous?.value).toBe(1);
		expect(list.tail?.previous?.next?.value).toBe(2);

		expect(list.length).toBe(2);
		expect(list.isEmpty).toBeFalsy();
	})
})