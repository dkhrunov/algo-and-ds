import { QUEUE_UNDERFLOW_ERROR } from "../Exceptions/QueueUnderflowError";
import { PriorityQueueBasedOnMaxHeap } from "./PriorityQueueBasedOnMaxHeap";

describe(PriorityQueueBasedOnMaxHeap, () => {
  let queue: PriorityQueueBasedOnMaxHeap;
  
  beforeEach(() => {
    queue = new PriorityQueueBasedOnMaxHeap();
  });

  describe("#constructor", () => {
    it("should create an empty queue", () => {
      expect(queue.peek()).toBeNull();
      expect(queue.isEmpty).toBeTruthy();
    });
  });

  describe("#peek", () => {
    it("should return an element from the top of the queue", () => {
      queue.enqueue(3);

      expect(queue.peek()).toBe(3);
      expect(queue.peek()).toBe(3);
      expect(queue.peek()).toBe(3);
      expect(queue.isEmpty).toBeFalsy();
    });

    it("should return the element with highest priority", () => {
      queue.enqueue(5);
      queue.enqueue(3);
      queue.enqueue(1);

      expect(queue.peek()).toBe(5);
      expect(queue.isEmpty).toBeFalsy();
    });
  });

  describe("#enqueue", () => {
    it("should insert an element", () => {
      queue.enqueue(1);

      expect(queue.peek()).toBe(1);
      expect(queue.isEmpty).toBeFalsy();
    });
  });

  describe("#dequeue", () => {
    it("should throw an error when the queue is empty", () => {
      expect(() => queue.dequeue()).toThrowError(QUEUE_UNDERFLOW_ERROR);
    })

    it("should remove an element", () => {
      queue.enqueue(1);

      expect(queue.peek()).toBe(1);
      expect(queue.isEmpty).toBeFalsy();

      expect(queue.dequeue()).toBe(1);
      expect(queue.peek()).toBeNull();
      expect(queue.isEmpty).toBeTruthy();
    });

    it("should remove an element with highest priority", () => {
      queue.enqueue(5);
      queue.enqueue(3);
      queue.enqueue(1);
      queue.enqueue(10);

      expect(queue.dequeue()).toBe(10);
    });

    it("should remove the elements in order by priority", () => {
      queue.enqueue(5);
      queue.enqueue(3);
      queue.enqueue(1);
      queue.enqueue(10);

      expect(queue.dequeue()).toBe(10);
      expect(queue.dequeue()).toBe(5);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(1);
      expect(queue.isEmpty).toBeTruthy();
    });
  });
})