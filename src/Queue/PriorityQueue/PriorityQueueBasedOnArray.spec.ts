import { PriorityQueueBasedOnArray } from "./PriorityQueueBasedOnArray";

describe(PriorityQueueBasedOnArray, () => {
  let queue: PriorityQueueBasedOnArray<number>;
  
  beforeEach(() => {
    queue = new PriorityQueueBasedOnArray<number>();
  });

  describe("#constructor", () => {
    it("should create an empty queue", () => {
      expect(queue.peek()).toBeNull();
      expect(queue.isEmpty).toBeTruthy();
    });
  });

  describe("#enqueue", () => {
    it("should insert an element", () => {
      queue.enqueue(1, 0);

      expect(queue.peek()).toBe(1);
      expect(queue.isEmpty).toBeFalsy();
    });
  });

  describe("#dequeue", () => {
    it("should remove an element", () => {
      queue.enqueue(1, 0);

      expect(queue.peek()).toBe(1);
      expect(queue.isEmpty).toBeFalsy();

      expect(queue.dequeue()).toBe(1);
      expect(queue.peek()).toBeNull();
      expect(queue.isEmpty).toBeTruthy();
    });

    it("should remove an element with highest priority", () => {
      queue.enqueue(5, 10);
      queue.enqueue(3, 1000);
      queue.enqueue(1, 100);

      expect(queue.dequeue()).toBe(3);
    });

    it("should remove an element with highest value, if elements has same priority", () => {
      queue.enqueue(3, 1000);
      queue.enqueue(5, 1000);
      queue.enqueue(1, 100);

      expect(queue.dequeue()).toBe(5);
    });
  });
})