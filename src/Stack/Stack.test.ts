import { Stack } from './Stack';

describe("#constructor", () => {
	describe("without argument", () => {
		it("it create the empty stack", () => {
			const stack = new Stack<number>();

			expect(stack.value).toEqual([]);
			expect(stack.isEmpty).toBeTruthy();
		})
	})

	describe("with array of values", () => {
		it("it create the stack from that values", () => {
			const stack = new Stack<number>([1, 2, 3, 4]);

			expect(stack.value).toEqual([1, 2, 3, 4]);
			expect(stack.isEmpty).toBeFalsy();
		})
	})
})

describe("#push", () => {
	it("it pushes the item to the top of the stack", () => {
		const stack = new Stack<number>([1, 2, 3, 4]);
		stack.push(5);

		expect(stack.value[stack.length - 1]).toBe(5);
	})
})

describe("#pop", () => {
	describe("whith an empty stack", () => {
		it("it return null", () => {
			const stack = new Stack<number>();
			const item = stack.pop();

			expect(item).toBeNull();
		})
	})

	describe("with an non-empty stack", () => {
		it("it return and remove the toppest element of the stack", () => {
			const stack = new Stack<number>([1, 2, 3, 4]);
			const item = stack.pop();

			expect(item).toBe(4);
			expect(stack.length).toBe(3);
			expect(stack.value).toEqual([1, 2, 3]);
		})
	})
})

describe("#peek", () => {
	describe("whith an empty stack", () => {
		it("it return null", () => {
			const stack = new Stack<number>();
			const item = stack.peek();

			expect(item).toBeNull();
		})
	})

	describe("with an non-empty stack", () => {
		it("it returns the top element of the stack", () => {
			const stack = new Stack<number>([1, 2, 3, 4]);
			const item = stack.peek();

			expect(item).toBe(4);
			expect(stack.length).toBe(4);
			expect(stack.value).toEqual([1, 2, 3, 4]);
		})
	})
})

describe("#clear", () => {
	it("it cear the stack", () => {
		const stack = new Stack<number>([1, 2, 3, 4]);
		stack.clear();

		expect(stack.length).toBe(0);
		expect(stack.value).toEqual([]);
	})
})