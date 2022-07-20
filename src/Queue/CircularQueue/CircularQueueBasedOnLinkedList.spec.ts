import { QUEUE_EMPTY_ERROR } from "../Exceptions/QueueEmptyError";
import { CircularQueueBasedOnLinkedList } from "./CircularQueueBasedOnLinkedList";

describe(CircularQueueBasedOnLinkedList, () => {
  let queue: CircularQueueBasedOnLinkedList<number>;
  
  beforeEach(() => {
    queue = new CircularQueueBasedOnLinkedList<number>();
  });

  describe("#constructor", () => {
    it("should create an empty queue", () => {
      expect(queue.peek()).toBeNull();
      expect(queue.last).toBeNull();
      expect(queue.isEmpty).toBeTruthy();
    });
  });

  describe("#enqueue", () => {
    it("should insert an element to first position of the queue", () => {
      queue.enqueue(1);

      expect(queue.peek()).toBe(1);
      expect(queue.last).toBe(1);
      expect(queue.isEmpty).toBeFalsy();
    });

    it("should insert the element into the vacated space at the head of the queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      queue.dequeue();
      queue.enqueue(4);
  
      expect(queue.peek()).toBe(2);
      expect(queue.last).toBe(4);
    });
  });

  describe("#dequeue", () => {
    it("should flush the queue when the last element has been removed from the queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.dequeue();
      queue.dequeue();

      expect(queue.peek()).toBeNull();
      expect(queue.last).toBeNull();
      expect(queue.isEmpty).toBeTruthy();
    });

    it("should set the front pointer to index 0 when removing an element from the end of the queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.dequeue()).toBe(1);

      queue.enqueue(4);

      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);

    });

    it("should throw an error when trying to dequeue an element from an empty queue", () => {
      expect(() => queue.dequeue()).toThrowError(QUEUE_EMPTY_ERROR);

      queue.enqueue(1);
      queue.enqueue(2);
      queue.dequeue();
      queue.dequeue();

      expect(() => queue.dequeue()).toThrowError(QUEUE_EMPTY_ERROR);
    });
  });
});
