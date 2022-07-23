import { QUEUE_EMPTY_ERROR } from "./Exceptions/QueueEmptyError";
import { Queue } from "./Queue"

describe("#constructor", () => {
		it("it create the empty queue", () => {
			const queue = new Queue<number>();
			
			expect(queue.last).toBeNull();
			expect(queue.length).toBe(0);
			expect(queue.isEmpty).toBeTruthy();
	})
})

describe("#enqueue", () => {
	describe("when the queue is empty", () => {
		it("it enqueue the value at the head and tail", () => {
			const queue = new Queue<number>();
			queue.enqueue(1);

			expect(queue.last).toBe(1);
			expect(queue.length).toBe(1);
		})
	})

	describe("when the queue isnt empty", () => {
		it("it enqueue the value at the tail", () => {
			const queue = new Queue<number>();
			queue.enqueue(1);
			queue.enqueue(2);
			queue.enqueue(3);
			queue.enqueue(4);
			queue.enqueue(5);

			expect(queue.last).toBe(5);
			expect(queue.length).toBe(5);
		})
	})
})

describe("#dequeue", () => {
	describe("when the queue is empty", () => {
		it("should throw an error", () => {
			const queue = new Queue<number>();

      expect(() => queue.dequeue()).toThrowError(QUEUE_EMPTY_ERROR);
			expect(queue.length).toBe(0);
		})
	})

	describe("when the queue isnt empty", () => {
		it("it returns the first element in the queue", () => {
			const queue = new Queue<number>();
			queue.enqueue(1);
			queue.enqueue(2);
			queue.enqueue(3);
			queue.enqueue(4);
			const item = queue.dequeue();

			expect(item).toBe(1);
			expect(queue.length).toBe(3);
		})
	})

  describe("when the front equal to rear", () => {
		it("it reset the queue", () => {
			const queue = new Queue<number>();
			queue.enqueue(1);
			queue.enqueue(2);

			expect(queue.dequeue()).toBe(1);
			expect(queue.dequeue()).toBe(2);
			expect(queue.length).toBe(0);
			expect(queue.last).toBeNull();
			expect(queue.isEmpty).toBeTruthy();
		})
	})
})

describe("#peek", () => {
	describe("whith an empty queue", () => {
		it("it return null", () => {
			const queue = new Queue<number>();
			const item = queue.peek();

			expect(item).toBeNull();
		})
	})

	describe("with an non-empty queue", () => {
		it("it returns the top element of the queue", () => {
			const queue = new Queue<number>();
			queue.enqueue(1);
			queue.enqueue(2);
			queue.enqueue(3);
			queue.enqueue(4);
			const item = queue.peek();

			expect(item).toBe(1);
			expect(queue.length).toBe(4);
		})
	})
})

describe("#clear", () => {
	it("it cear the stack", () => {
		const queue = new Queue<number>();
		queue.clear();

		expect(queue.last).toBeNull();
		expect(queue.length).toBe(0);
	})
})