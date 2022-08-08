import { QUEUE_UNDERFLOW_ERROR } from "../Exceptions/QueueUnderflowError";
import { PriorityQueueBasedOnLinkedList } from "./PriorityQueueBasedOnLinkedList";

describe(PriorityQueueBasedOnLinkedList, () => {
  let queue: PriorityQueueBasedOnLinkedList<number>;
  
  beforeEach(() => {
    queue = new PriorityQueueBasedOnLinkedList<number>();
  });

  describe("#constructor", () => {
    it("should create an empty queue", () => {
      expect(queue.peek()).toBeNull();
      expect(queue.isEmpty).toBeTruthy();
    });
  });

  describe("#peek", () => {
    it("should return an element from the top of the queue", () => {
      queue.enqueue(3, 1000);

      expect(queue.peek()).toBe(3);
      expect(queue.peek()).toBe(3);
      expect(queue.peek()).toBe(3);
      expect(queue.isEmpty).toBeFalsy();
    });

    it("should return the element with highest priority", () => {
      queue.enqueue(5, 10);
      queue.enqueue(3, 1000);
      queue.enqueue(1, 100);

      expect(queue.peek()).toBe(3);
      expect(queue.isEmpty).toBeFalsy();
    });

    it("should return an element with highest value, if elements has same priority", () => {
      queue.enqueue(3, 1000);
      queue.enqueue(5, 1000);
      queue.enqueue(1, 100);


      expect(queue.peek()).toBe(5);
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
    it("should throw an error when the queue is empty", () => {
      expect(() => queue.dequeue()).toThrowError(QUEUE_UNDERFLOW_ERROR);
    })

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

    it("should remove the elements in order by priority", () => {
      queue.enqueue(5, 10);
      queue.enqueue(3, 1000);
      queue.enqueue(1, 100);

      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(5);
      expect(queue.isEmpty).toBeTruthy();
    });
  });
})