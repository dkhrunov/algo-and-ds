import { QUEUE_UNDERFLOW_ERROR } from "../Exceptions/QueueUnderflowError";
import { QUEUE_OVERFLOW_ERROR } from "../Exceptions/QueueOverflowError";
import { CircularQueueBasedOnArray } from "./CircularQueueBasedOnArray";

describe(CircularQueueBasedOnArray, () => {
  let queue: CircularQueueBasedOnArray<number>;
  
  beforeEach(() => {
    queue = new CircularQueueBasedOnArray<number>(3);
  });

  describe("#constructor", () => {
    it("should create an empty queue", () => {
      expect(queue.peek()).toBeNull();
      expect(queue.last).toBeNull();
      expect(queue.isEmpty).toBeTruthy();
      expect(queue.isFull).toBeFalsy();
    });
  });

  describe("#enqueue", () => {
    it("should insert an element to first position of the queue", () => {
      queue.enqueue(1);

      expect(queue.peek()).toBe(1);
      expect(queue.last).toBe(1);
      expect(queue.isEmpty).toBeFalsy();
      expect(queue.isFull).toBeFalsy();
    });

    it("should fill a queue of size 3 elements", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.isFull).toBeTruthy();
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

    it("should throw an error when trying to insert more elements than the queue size", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(() => queue.enqueue(4)).toThrowError(QUEUE_OVERFLOW_ERROR);
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
      expect(queue.isFull).toBeFalsy();
    });

    it("should set the front pointer to index 0 when removing an element from the end of the queue", () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.dequeue()).toBe(1);

      queue.enqueue(4);
      expect(queue.isFull).toBeTruthy();

      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
      expect(queue.dequeue()).toBe(4);

    });

    it("should throw an error when trying to dequeue an element from an empty queue", () => {
      expect(() => queue.dequeue()).toThrowError(QUEUE_UNDERFLOW_ERROR);

      queue.enqueue(1);
      queue.enqueue(2);
      queue.dequeue();
      queue.dequeue();

      expect(() => queue.dequeue()).toThrowError(QUEUE_UNDERFLOW_ERROR);
    });
  });
});
