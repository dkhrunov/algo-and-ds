import { QUEUE_UNDERFLOW_ERROR } from "../Exceptions/QueueUnderflowError";
import { DequeBasedOnDoublyLinkedList } from "./DequeBasedOnDoublyLinkedList";

describe(DequeBasedOnDoublyLinkedList, () => {
  let deque: DequeBasedOnDoublyLinkedList<number>;

  beforeEach(() => {
    deque = new DequeBasedOnDoublyLinkedList<number>();
  });

  describe('#isEmpty', () => {
    it('should check if deque is  empty', () => {
      expect(deque.isEmpty).toBeTruthy();

      deque.addFirst(1);

      expect(deque.isEmpty).toBeFalsy();
    });
  });

  describe('#first', () => {
    it('should peek first element', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addFirst(0);
      deque.addLast(3);

      expect(deque.first).toBe(0);

      deque.removeFirst();

      expect(deque.first).toBe(1);

      deque.removeLast();

      expect(deque.first).toBe(1);

      deque.removeFirst();

      expect(deque.first).toBe(2);

      deque.removeFirst();

      expect(() => deque.first).toThrowError(QUEUE_UNDERFLOW_ERROR);
    });
  });

  describe('#last', () => {
    it('should peek first element', () => {
      deque.addFirst(1);
      deque.addFirst(2);
      deque.addLast(0);
      deque.addFirst(3);

      expect(deque.last).toBe(0);

      deque.removeLast();

      expect(deque.last).toBe(1);

      deque.removeFirst();

      expect(deque.last).toBe(1);

      deque.removeLast();

      expect(deque.last).toBe(2);

      deque.removeFirst();

      expect(() => deque.last).toThrowError(QUEUE_UNDERFLOW_ERROR);
    });
  });

  describe('#addFirst', () => {
    it('should add element to the front', () => {
      deque.addFirst(1);

      expect(deque.first).toBe(1);

      deque.addFirst(2);

      expect(deque.first).toBe(2);

      deque.addLast(3);

      expect(deque.first).toBe(2);
    });

    it('should close the queue from the front', () => {
      deque.addFirst(1);
      deque.addFirst(2);
      deque.addFirst(3);
      deque.addFirst(4);
      deque.addFirst(5);

      deque.removeLast();

      deque.addFirst(6);

      expect(deque.removeFirst()).toBe(6);
      expect(deque.removeFirst()).toBe(5);
      expect(deque.removeFirst()).toBe(4);
      expect(deque.removeFirst()).toBe(3);
      expect(deque.removeFirst()).toBe(2);
    });

    it('should increment counter', () => {
      expect(deque.count).toBe(0);
      
      deque.addFirst(1);

      expect(deque.count).toBe(1);
      
      deque.addFirst(2);

      expect(deque.count).toBe(2);
    });
  });

  describe('#addLast', () => {
    it('should add element to the end', () => {
      deque.addLast(1);

      expect(deque.last).toBe(1);

      deque.addLast(2);

      expect(deque.last).toBe(2);

      deque.addFirst(3);

      expect(deque.last).toBe(2);
    });

    it('should close the queue from the end', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addLast(3);
      deque.addLast(4);
      deque.addLast(5);

      deque.removeFirst();

      deque.addLast(6);

      expect(deque.removeFirst()).toBe(2);
      expect(deque.removeFirst()).toBe(3);
      expect(deque.removeFirst()).toBe(4);
      expect(deque.removeFirst()).toBe(5);
      expect(deque.removeFirst()).toBe(6);
    });

    it('should increment counter', () => {
      expect(deque.count).toBe(0);
      
      deque.addLast(1);

      expect(deque.count).toBe(1);
      
      deque.addLast(2);

      expect(deque.count).toBe(2);
    });
  });

  describe('#removeFirst', () => {
    it("should throw an error when the deque is empty", () => {
      expect(() => deque.removeFirst()).toThrowError(QUEUE_UNDERFLOW_ERROR);
    });

    it('should add element to the front', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addFirst(0);
      deque.addLast(3);

      expect(deque.removeFirst()).toBe(0);
      expect(deque.removeFirst()).toBe(1);
      expect(deque.removeFirst()).toBe(2);
      expect(deque.removeFirst()).toBe(3);
    });

    it('should decrement counter', () => {
      expect(deque.count).toBe(0);
      
      deque.addLast(1);
      deque.addLast(2);

      expect(deque.count).toBe(2);

      deque.removeFirst();

      expect(deque.count).toBe(1);

      deque.removeFirst();
      
      expect(deque.count).toBe(0);
    });
  });

  describe('#removeLast', () => {
    it("should throw an error when the deque is empty", () => {
      expect(() => deque.removeLast()).toThrowError(QUEUE_UNDERFLOW_ERROR);
    });

    it('should add element to the front', () => {
      deque.addFirst(1);
      deque.addFirst(2);
      deque.addLast(0);
      deque.addFirst(3);

      expect(deque.removeLast()).toBe(0);
      expect(deque.removeLast()).toBe(1);
      expect(deque.removeLast()).toBe(2);
      expect(deque.removeLast()).toBe(3);
    });

    it('should decrement counter', () => {
      expect(deque.count).toBe(0);
      
      deque.addLast(1);
      deque.addLast(2);

      expect(deque.count).toBe(2);

      deque.removeLast();

      expect(deque.count).toBe(1);

      deque.removeLast();
      
      expect(deque.count).toBe(0);
    });
  });

  describe('Stack implementation', () => {
    it('should implements LIFO rule', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addLast(3);
      deque.addLast(4);

      expect(deque.removeLast()).toBe(4);
      expect(deque.removeLast()).toBe(3);
      expect(deque.removeLast()).toBe(2);
      expect(deque.removeLast()).toBe(1);
    });
  });

  describe('Queue implementation', () => {
    it('should implements FIFO rule', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addLast(3);
      deque.addLast(4);

      expect(deque.removeFirst()).toBe(1);
      expect(deque.removeFirst()).toBe(2);
      expect(deque.removeFirst()).toBe(3);
      expect(deque.removeFirst()).toBe(4);
    });
  });

  describe('#clear', () => {
    it('should clear the deque', () => {
      deque.addLast(1);
      deque.addLast(2);
      deque.addFirst(0);
      deque.addLast(3);

      expect(deque.isEmpty).toBeFalsy();

      deque.clear();

      expect(deque.isEmpty).toBeTruthy();
    });
  });
});