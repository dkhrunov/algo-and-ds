
import { QUEUE_EMPTY_ERROR } from "./Exceptions/QueueEmptyError";
import { QUEUE_OVERFLOW_ERROR } from "./Exceptions/QueueOverflowError";
import { QueueBasedOnArray } from "./QueueBasedOnArray"

describe(QueueBasedOnArray, () => {
  let queue: QueueBasedOnArray<number>;

  beforeEach(() => {
    queue = new QueueBasedOnArray<number>(5)
  });

  describe("#constructor", () => {
    it("should create an empty queue", () => {
      expect(queue.peek()).toBeNull();
      expect(queue.isEmpty).toBeTruthy();
      expect(queue.isFull).toBeFalsy();
      
    });
  });

  describe("#isFull", () => {
    it("should return null for empty queue", () => {
      expect(queue.peek()).toBeNull();
    });

    it("should be full", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(4);
      queue.enqueue(5);

      expect(queue.isFull).toBeTruthy();
    });

    it("should be not full", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.isFull).toBeFalsy();      
    });
  });

  describe("#isEmpty", () => {
    it("should be empty", () => {
      expect(queue.isEmpty).toBeTruthy();
    });


    it("should be not empty", () => {
      queue.enqueue(1);
      queue.enqueue(2);

      expect(queue.isEmpty).toBeFalsy();      
    });
  });

  describe("#peek", () => {
    it("should return an element from the top of the queue", () => {
      queue.enqueue(3);
      queue.enqueue(4);
      queue.enqueue(5);

      expect(queue.peek()).toBe(3);
    });

    it("should not remove an element from the queue", () => {
      queue.enqueue(3);
      queue.enqueue(4);
      queue.enqueue(5);
      queue.dequeue();

      expect(queue.peek()).toBe(4);
      expect(queue.peek()).toBe(4);
      expect(queue.peek()).toBe(4);
    });
  });

  describe("#enqueue", () => {
    it("should insert an element", () => {
      queue.enqueue(1);

      expect(queue.peek()).toBe(1);
    });

    it("should throw an error when the queue is full", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.enqueue(4);
      queue.enqueue(5);

      expect(() => queue.enqueue(5)).toThrowError(QUEUE_OVERFLOW_ERROR);
    })
  });

  describe("#dequeue", () => {
    it("should throw an error when the queue is empty", () => {
      expect(() => queue.dequeue()).toThrowError(QUEUE_EMPTY_ERROR);
    })

    it("should remove an element", () => {
      queue.enqueue(1);

      expect(queue.peek()).toBe(1);
      expect(queue.dequeue()).toBe(1);

      expect(queue.peek()).toBeNull();
    });

    it("should remove the elements in the correct order", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);

      queue.enqueue(4);
      queue.enqueue(5);

      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);
      expect(queue.dequeue()).toBe(5);
    });
  });
});