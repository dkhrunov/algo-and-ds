import { QUEUE_EMPTY_ERROR } from "../Exceptions/QueueEmptyError";
import { QUEUE_FULL_ERROR } from "../Exceptions/QueueFullError";
import { CircularQueue } from "./CircularQueue";

describe(CircularQueue, () => {
  let queue: CircularQueue<number>;
  
  beforeEach(() => {
    queue = new CircularQueue<number>(3);
  });

  it("shoud be created the empty queue", () => {
    expect(queue.peek()).toBeNull();
    expect(queue.last).toBeNull();
    expect(queue.isEmpty).toBeTruthy();
    expect(queue.isFull).toBeFalsy();
  });

  it("should insert first element", () => {
    queue.enqueue(1);

    expect(queue.peek()).toBe(1);
    expect(queue.last).toBe(1);
    expect(queue.isEmpty).toBeFalsy();
    expect(queue.isFull).toBeFalsy();
  });

  it("should fill up the queue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    
    expect(queue.peek()).toBe(1);
    expect(queue.last).toBe(3);
    expect(queue.isEmpty).toBeFalsy();
    expect(queue.isFull).toBeTruthy();
  });

  it("should insert the element at the front of the queue after all elements have been removed from the queue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.dequeue();
    queue.dequeue();
    queue.dequeue();
    queue.enqueue(4);

    expect(queue.peek()).toBe(4);
    expect(queue.last).toBe(4);
    expect(queue.isEmpty).toBeFalsy();
    expect(queue.isFull).toBeFalsy();
  });

  it("should insert the next element if there is a space in front of queue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.dequeue();
    queue.enqueue(3);
    queue.enqueue(4);
    queue.dequeue();
    queue.enqueue(5);

    expect(queue.peek()).toBe(3);
    expect(queue.last).toBe(5);
    expect(queue.isEmpty).toBeFalsy();
    expect(queue.isFull).toBeTruthy();
  });

  it("should dequeue elements in right order", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);

    queue.enqueue(4);

    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBe(4);

    queue.enqueue(5);

    expect(queue.peek()).toBe(5);
    expect(queue.last).toBe(5);
    expect(queue.isEmpty).toBeFalsy();
    expect(queue.isFull).toBeFalsy();

    expect(queue.dequeue()).toBe(5);

    expect(queue.peek()).toBeNull();
    expect(queue.last).toBeNull();
    expect(queue.isEmpty).toBeTruthy();
    expect(queue.isFull).toBeFalsy();
  });

  it("should throw an error when trying to insert an element into the full queue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(() => queue.enqueue(4)).toThrowError(QUEUE_FULL_ERROR);
  });

  it("should throw an error when trying to dequeue an element from an empty queue", () => {
    expect(() => queue.dequeue()).toThrowError(QUEUE_EMPTY_ERROR);
  });
});
